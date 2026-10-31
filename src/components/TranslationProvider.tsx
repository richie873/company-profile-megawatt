"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { getConsent } from "@/lib/consent";

type TranslationContextType = {
  lang: string;
  loading: boolean;
  setLang: (lang: string) => void;
  prefetch: (lang: string) => void;
  t: (text: string) => string;
};

const TranslationContext = createContext<TranslationContextType | null>(null);

// Module-level cache so translations persist across component remounts
// within the same page session. Key: `${lang}::${originalText}`.
const cache = new Map<string, string>();
// v2: menaikkan versi supaya cache lama yang berisi terjemahan salah
// (mis. teks Arab pada menu "Tentang Kami") otomatis dibuang di browser pengunjung.
const STORAGE_KEY = "mp-translation-cache-v2";

// Terjemahan manual untuk teks pendek (menu/tombol). MyMemory berbasis
// kontribusi pengguna sehingga teks pendek sering dapat hasil ngawur.
// Pakai ini juga membuat menu langsung berganti tanpa menunggu API.
const GLOSSARY: Record<string, Record<string, string>> = {
  en: {
    "Tentang Kami": "About Us",
    Layanan: "Services",
    Industri: "Industries",
    Fasilitas: "Facilities",
    Portofolio: "Portfolio",
    Berita: "News",
    Kontak: "Contact",
    "Request Konsultasi": "Request a Consultation",
    "Lihat Layanan Kami": "View Our Services",
    Beranda: "Home",
  },
  "zh-CN": {
    "Tentang Kami": "关于我们",
    Layanan: "服务",
    Industri: "行业",
    Fasilitas: "设施",
    Portofolio: "案例",
    Berita: "新闻",
    Kontak: "联系我们",
    "Request Konsultasi": "咨询申请",
    "Lihat Layanan Kami": "查看我们的服务",
    Beranda: "首页",
  },
};

// Teks pendek lain (judul/eyebrow/tombol) yang sering salah diterjemahkan API.
// Hasil di sini selalu menimpa terjemahan API.
const GLOSSARY_EXTRA: Record<string, Record<string, string>> = {
  en: {
    "Siapa kami.": "Who we are.",
    "Profil Perusahaan": "Company Profile",
    "Nilai Kami": "Our Values",
    "Workshop kami.": "Our workshop.",
    "Lokasi": "Location",
    "Lokasi Workshop": "Workshop Location",
    "Workshop": "Workshop",
    "Alat Uji": "Testing Equipment",
    "Peralatan": "Equipment",
    "Cara Kami Bekerja": "How We Work",
    "Industri yang Kami Layani": "Industries We Serve",
    "Keunggulan": "Our Strengths",
    "Layanan Kami": "Our Services",
    "Proyek Terpilih": "Featured Projects",
    "Anggota": "Member",
    "Artikel lainnya": "More articles",
    "Baca selengkapnya": "Read more",
    "Butuh layanan ini?": "Need this service?",
    "Chat via WhatsApp": "Chat via WhatsApp",
    "Hubungi kami": "Contact us",
    "Hubungi langsung": "Contact us directly",
    "Kembali ke semua berita": "Back to all news",
    "Kirim pesan": "Send message",
    "Kirim via WhatsApp": "Send via WhatsApp",
    "Konsultasi via WhatsApp": "Consult via WhatsApp",
    "Lebih Detail": "Learn More",
    "Lihat detail layanan": "View service details",
    "Lihat di Google Maps": "View on Google Maps",
    "Lihat foto": "View photo",
    "Lihat semua industri": "View all industries",
    "Lihat semua portofolio": "View all portfolio",
    "Lingkup pekerjaan": "Scope of work",
    "Megawatt dalam angka": "Megawatt in numbers",
    "Menjaga motor industri tetap berputar.": "Keeping industrial motors running.",
    "Nama": "Name",
    "Nomor telepon": "Phone number",
    "Telepon": "Phone",
    "Selengkapnya tentang kami": "More about us",
    "Semua layanan": "All services",
    "Layanan lainnya": "Other services",
    "Tutup": "Close",
    "Tutup menu": "Close menu",
    "Buka menu": "Open menu",
    "Kebijakan Privasi": "Privacy Policy",
    "Pengaturan Cookie": "Cookie Settings",
    "Ubah pengaturan cookie": "Change cookie settings",
    "Perusahaan": "Company",
    "Pilih layanan": "Select a service",
    "Layanan yang dibutuhkan": "Service needed",
    "Putar video": "Play video",
    "Jeda video": "Pause video",
    "Tampilkan lebih banyak": "Show more",
    "Layanan darurat tersedia 24 jam": "Emergency service available 24 hours",
    "Industri Anda tidak tercantum di sini?": "Your industry isn't listed here?",
    "Filter layanan": "Filter services",
    "Lainnya": "Other",
    "Menampilkan": "Showing",
    "dari": "of",
  },
  "zh-CN": {
    "Siapa kami.": "我们是谁。",
    "Profil Perusahaan": "企业简介",
    "Nilai Kami": "我们的价值观",
    "Workshop kami.": "我们的车间。",
    "Lokasi": "地点",
    "Lokasi Workshop": "车间位置",
    "Workshop": "车间",
    "Alat Uji": "检测设备",
    "Peralatan": "设备",
    "Cara Kami Bekerja": "我们的工作方式",
    "Industri yang Kami Layani": "我们服务的行业",
    "Keunggulan": "我们的优势",
    "Layanan Kami": "我们的服务",
    "Proyek Terpilih": "精选项目",
    "Anggota": "会员",
    "Artikel lainnya": "更多文章",
    "Baca selengkapnya": "阅读全文",
    "Butuh layanan ini?": "需要此服务？",
    "Chat via WhatsApp": "通过 WhatsApp 聊天",
    "Hubungi kami": "联系我们",
    "Hubungi langsung": "直接联系",
    "Kembali ke semua berita": "返回全部新闻",
    "Kirim pesan": "发送消息",
    "Kirim via WhatsApp": "通过 WhatsApp 发送",
    "Konsultasi via WhatsApp": "通过 WhatsApp 咨询",
    "Lebih Detail": "了解详情",
    "Lihat detail layanan": "查看服务详情",
    "Lihat di Google Maps": "在谷歌地图查看",
    "Lihat foto": "查看照片",
    "Lihat semua industri": "查看全部行业",
    "Lihat semua portofolio": "查看全部案例",
    "Lingkup pekerjaan": "工作范围",
    "Megawatt dalam angka": "数字看 Megawatt",
    "Menjaga motor industri tetap berputar.": "让工业电机持续运转。",
    "Nama": "姓名",
    "Nomor telepon": "电话号码",
    "Telepon": "电话",
    "Selengkapnya tentang kami": "进一步了解我们",
    "Semua layanan": "全部服务",
    "Layanan lainnya": "其他服务",
    "Tutup": "关闭",
    "Tutup menu": "关闭菜单",
    "Buka menu": "打开菜单",
    "Kebijakan Privasi": "隐私政策",
    "Pengaturan Cookie": "Cookie 设置",
    "Ubah pengaturan cookie": "更改 Cookie 设置",
    "Perusahaan": "公司",
    "Pilih layanan": "选择服务",
    "Layanan yang dibutuhkan": "所需服务",
    "Putar video": "播放视频",
    "Jeda video": "暂停视频",
    "Tampilkan lebih banyak": "显示更多",
    "Layanan darurat tersedia 24 jam": "24 小时紧急服务",
    "Industri Anda tidak tercantum di sini?": "没有找到您的行业？",
    "Filter layanan": "筛选服务",
    "Lainnya": "其他",
    "Menampilkan": "显示",
    "dari": "共",
  },
};

const ARABIC_RE = /[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/;
const CJK_RE = /[\u3400-\u9FFF]/;

// Tolak hasil API yang skripnya tidak cocok dengan bahasa tujuan
// (MyMemory kadang mengembalikan teks Arab/bahasa lain untuk teks pendek).
function isPlausibleTranslation(result: string, target: string) {
  if (ARABIC_RE.test(result)) return false;
  if (target === "zh-CN" && !CJK_RE.test(result)) {
    // boleh tanpa CJK hanya jika hasilnya angka/simbol/nama (tanpa huruf Latin panjang)
    return !/[A-Za-z]{4,}/.test(result);
  }
  return true;
}

function loadPersistedCache() {
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed: Record<string, string> = JSON.parse(raw);
    Object.entries(parsed).forEach(([key, value]) => cache.set(key, value));
  } catch {
    // corrupted cache — ignore and start fresh
  }
}

function persistCache() {
  if (typeof window === "undefined") return;
  // Cache terjemahan hanya disimpan permanen jika pengunjung menyetujui cookie fungsional
  if (!getConsent()?.functional) return;
  try {
    const obj = Object.fromEntries(cache);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
  } catch {
    // storage full or unavailable — translations still work, just not cached
  }
}

loadPersistedCache();

// Providing a contact email bumps MyMemory's free daily limit
// from 5,000 to 50,000 characters — no signup required.
const CONTACT_EMAIL = "megawattpower.listrindo@yahoo.com";

// Request yang sedang berjalan dipakai bersama, supaya teks yang sama
// tidak dikirim dua kali (mis. saat hover lalu klik).
const inflightRequests = new Map<string, Promise<string>>();

function translateOne(text: string, target: string): Promise<string> {
  const key = `${target}::${text}`;
  const manual =
    GLOSSARY_EXTRA[target]?.[text.trim()] ?? GLOSSARY[target]?.[text.trim()];
  if (manual) {
    cache.set(key, manual);
    return Promise.resolve(manual);
  }
  const cached = cache.get(key);
  if (cached && isPlausibleTranslation(cached, target)) return Promise.resolve(cached);
  if (!text.trim()) return Promise.resolve(text);
  const running = inflightRequests.get(key);
  if (running) return running;

  const request = (async () => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    try {
      const res = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
          text
        )}&langpair=id|${target}&de=${encodeURIComponent(CONTACT_EMAIL)}`,
        { signal: controller.signal }
      );
      const data = await res.json();
      const translated: unknown = data?.responseData?.translatedText;
      const isQuotaWarning =
        typeof translated === "string" &&
        (translated.includes("MYMEMORY WARNING") ||
          translated.includes("QUERY LENGTH LIMIT") ||
          data?.responseStatus === 403);

      if (
        typeof translated === "string" &&
        translated.trim() &&
        !isQuotaWarning &&
        isPlausibleTranslation(translated, target)
      ) {
        cache.set(key, translated);
        return translated;
      }
    } catch {
      // network hiccup / timeout — fall back to original text below
    } finally {
      clearTimeout(timer);
      inflightRequests.delete(key);
    }
    return text;
  })();

  inflightRequests.set(key, request);
  return request;
}

// Worker pool: selalu ada beberapa request berjalan bersamaan. Tidak ada
// lagi "tunggu 5 selesai semua baru lanjut", jadi jauh lebih cepat.
const CONCURRENCY = 10;
// Render ulang paling sering tiap 150ms agar teks muncul bertahap tanpa
// membuat halaman patah-patah.
const PROGRESS_INTERVAL_MS = 150;

async function translateBatch(
  texts: string[],
  target: string,
  onProgress?: () => void
) {
  const pending = Array.from(new Set(texts)).filter(
    (t) => t.trim() && !cache.has(`${target}::${t}`)
  );
  if (pending.length === 0) return;

  let next = 0;
  let lastNotify = 0;
  let dirty = false;

  const notify = (force = false) => {
    if (!onProgress) return;
    const now = Date.now();
    if (force || now - lastNotify >= PROGRESS_INTERVAL_MS) {
      lastNotify = now;
      dirty = false;
      onProgress();
    } else {
      dirty = true;
    }
  };

  const worker = async () => {
    while (next < pending.length) {
      const text = pending[next++];
      await translateOne(text, target);
      notify();
    }
  };

  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, pending.length) }, worker)
  );
  persistCache();
  if (dirty) notify(true);
}

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState("id");
  const [loading, setLoading] = useState(false);
  const [, bump] = useState(0);
  const registered = useRef<Set<string>>(new Set());

  const setLang = useCallback(async (newLang: string) => {
    if (newLang === "id") {
      setLangState("id");
      return;
    }
    setLangState(newLang);
    setLoading(true);
    await translateBatch(Array.from(registered.current), newLang, () =>
      bump((n) => n + 1)
    );
    setLoading(false);
    bump((n) => n + 1);
  }, []);

  // Dipanggil saat pengunjung mengarahkan kursor ke tombol bahasa, sehingga
  // terjemahan sudah mulai diunduh sebelum tombol diklik.
  const prefetch = useCallback((target: string) => {
    if (target === "id") return;
    translateBatch(Array.from(registered.current), target);
  }, []);

  // Teks yang baru muncul setelah bahasa diganti (mis. saat pindah halaman)
  // dikumpulkan di sini lalu diterjemahkan setelah render.
  const pending = useRef<Set<string>>(new Set());
  const attempted = useRef<Set<string>>(new Set());
  const inflight = useRef(false);

  const t = useCallback(
    (text: string) => {
      registered.current.add(text);
      if (lang === "id") return text;
      const key = `${lang}::${text}`;
      const hit = cache.get(key);
      if (hit) return hit;
      if (!attempted.current.has(key)) pending.current.add(text);
      return text;
    },
    [lang]
  );

  useEffect(() => {
    if (lang === "id" || loading || inflight.current || pending.current.size === 0) return;
    const batch = Array.from(pending.current);
    pending.current.clear();
    batch.forEach((text) => attempted.current.add(`${lang}::${text}`));
    inflight.current = true;
    translateBatch(batch, lang, () => bump((n) => n + 1)).then(() => {
      inflight.current = false;
      bump((n) => n + 1);
    });
  });

  return (
    <TranslationContext.Provider value={{ lang, loading, setLang, prefetch, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const ctx = useContext(TranslationContext);
  if (!ctx) {
    throw new Error("useTranslation must be used within TranslationProvider");
  }
  return ctx;
}
