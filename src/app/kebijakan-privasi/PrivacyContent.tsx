"use client";

import { useTranslation } from "@/components/TranslationProvider";
import { openCookieSettings } from "@/lib/consent";

// CATATAN: ini template dasar. Sesuaikan isinya dengan praktik perusahaan
// dan minta tinjauan pihak legal sebelum dipublikasikan.
const SECTIONS = [
  {
    title: "Informasi yang kami kumpulkan",
    body: "Situs ini tidak meminta Anda membuat akun. Kami hanya menerima data pribadi yang Anda kirimkan sendiri, misalnya saat menghubungi kami melalui WhatsApp, telepon, atau email. Jika Anda menyetujui cookie analitik, kami juga mengumpulkan statistik kunjungan yang bersifat anonim.",
  },
  {
    title: "Penggunaan cookie",
    body: "Kami menggunakan cookie wajib agar situs berfungsi, cookie fungsional untuk menyimpan hasil terjemahan halaman, dan cookie analitik untuk memahami penggunaan situs. Cookie fungsional dan analitik hanya aktif setelah Anda menyetujuinya, dan Anda dapat mengubah pilihan kapan saja.",
  },
  {
    title: "Layanan pihak ketiga",
    body: "Fitur terjemahan situs mengirimkan teks halaman (bukan data pribadi Anda) ke layanan MyMemory. Jika cookie analitik disetujui, data kunjungan anonim diproses oleh Google Analytics.",
  },
  {
    title: "Hak Anda",
    body: "Sesuai Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi, Anda berhak meminta akses, perbaikan, atau penghapusan data pribadi yang Anda berikan kepada kami, serta menarik persetujuan yang telah diberikan.",
  },
  {
    title: "Hubungi kami",
    body: "Untuk pertanyaan tentang kebijakan ini, hubungi PT. Megawatt Power Listrindo melalui megawattpower.listrindo@yahoo.com atau 0813 8855 605.",
  },
];

export default function PrivacyContent() {
  const { t } = useTranslation();
  return (
    <article className="mx-auto max-w-3xl px-6 lg:px-10">
      <h1 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
        {t("Kebijakan Privasi")}
      </h1>
      <p className="mt-4 text-sm text-muted">
        {t("Terakhir diperbarui: September 2026")}
      </p>

      <div className="mt-12 space-y-10">
        {SECTIONS.map((s) => (
          <section key={s.title}>
            <h2 className="font-display text-xl font-semibold text-ink">
              {t(s.title)}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted">
              {t(s.body)}
            </p>
          </section>
        ))}
      </div>

      <button
        onClick={openCookieSettings}
        className="mt-12 border border-ink/15 px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-blue hover:text-blue"
      >
        {t("Ubah pengaturan cookie")}
      </button>
    </article>
  );
}
