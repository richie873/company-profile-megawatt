import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center bg-paper pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <p className="font-data text-sm text-blue">404</p>
        <h1 className="mt-4 max-w-2xl font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          Halaman tidak ditemukan.
        </h1>
        <p className="mt-4 max-w-lg text-base text-muted">
          Halaman yang Anda cari mungkin sudah dipindahkan atau alamatnya salah ketik.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center bg-blue px-5 py-2.5 text-[13px] sm:mt-10 sm:px-7 sm:py-3.5 sm:text-sm font-semibold text-white transition-colors hover:bg-navy"
        >
          Kembali ke beranda
        </Link>
      </div>
    </section>
  );
}
