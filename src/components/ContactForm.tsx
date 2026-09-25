"use client";

import { useState } from "react";
import { useTranslation } from "@/components/TranslationProvider";
import ArrowIcon from "@/components/ArrowIcon";
import { SERVICES, waLink } from "@/content/site";

/**
 * Form tanpa server: isian disusun menjadi pesan WhatsApp,
 * lalu membuka WhatsApp dengan pesan tersebut siap dikirim.
 */
export default function ContactForm() {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    service: "",
    message: "",
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const valid = form.name.trim() && form.message.trim();

  const send = () => {
    if (!valid) return;
    const details = [
      `Nama: ${form.name}`,
      form.company ? `Perusahaan: ${form.company}` : "",
      form.phone ? `Telepon: ${form.phone}` : "",
      form.service ? `Layanan: ${form.service}` : "",
    ].filter(Boolean);
    const text = ["Halo Megawatt, saya ingin berkonsultasi.", "", ...details, "", form.message].join("\n");
    window.open(waLink(text), "_blank", "noopener,noreferrer");
  };

  const field =
    "mt-2 w-full border border-line bg-paper px-4 py-3 text-base text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-blue";
  const label = "text-sm font-medium text-ink";

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <label className="block">
        <span className={label}>
          {t("Nama")} <span className="text-blue">*</span>
        </span>
        <input className={field} value={form.name} onChange={set("name")} autoComplete="name" />
      </label>
      <label className="block">
        <span className={label}>{t("Perusahaan")}</span>
        <input className={field} value={form.company} onChange={set("company")} autoComplete="organization" />
      </label>
      <label className="block">
        <span className={label}>{t("Nomor telepon")}</span>
        <input className={field} value={form.phone} onChange={set("phone")} autoComplete="tel" inputMode="tel" />
      </label>
      <label className="block">
        <span className={label}>{t("Layanan yang dibutuhkan")}</span>
        <select className={field} value={form.service} onChange={set("service")}>
          <option value="">{t("Pilih layanan")}</option>
          {SERVICES.map((s) => (
            <option key={s.slug} value={s.title}>
              {t(s.title)}
            </option>
          ))}
          <option value="Lainnya">{t("Lainnya")}</option>
        </select>
      </label>
      <label className="block sm:col-span-2">
        <span className={label}>
          {t("Ceritakan kondisi motor atau kebutuhan Anda")} <span className="text-blue">*</span>
        </span>
        <textarea
          className={`${field} min-h-36 resize-y`}
          value={form.message}
          onChange={set("message")}
          placeholder={t("Contoh: motor 75 kW berbunyi keras dan panas setelah 2 jam beroperasi.")}
        />
      </label>
      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-muted">
          {t("Pesan akan dibuka di WhatsApp dan dikirim langsung ke tim kami.")}
        </p>
        <button
          type="button"
          onClick={send}
          disabled={!valid}
          className="group inline-flex shrink-0 items-center justify-center gap-2 bg-blue px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-navy disabled:cursor-not-allowed disabled:bg-ink/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
        >
          {t("Kirim via WhatsApp")}
          <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}
