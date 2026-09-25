# Company Profile — PT. Megawatt Power Listrindo

Situs company profile berbasis Next.js (App Router), Tailwind CSS v4, dan TypeScript.

## Menjalankan di laptop

```bash
npm install
npm run dev     # buka http://localhost:3000
npm run build   # cek sebelum push
```

## Di mana mengubah isi situs

| Yang ingin diubah | File |
| --- | --- |
| Layanan, industri, keunggulan, kontak, alamat workshop, portofolio, berita, fasilitas | `src/content/site.ts` |
| Foto di halaman depan & halaman lain | `src/lib/site-images.ts` (simpan foto di `public/images/`) |
| Video hero | `public/hero/hero.mp4` (lihat komentar di `src/components/Hero.tsx`) |
| Warna & font | `src/app/globals.css`, `src/app/layout.tsx` |

## Halaman

`/` · `/tentang-kami` · `/layanan` · `/layanan/[slug]` · `/industri` · `/fasilitas` · `/portofolio` · `/berita` · `/kontak` · `/kebijakan-privasi`

Menu Portofolio dan Berita otomatis muncul setelah datanya diisi di `src/content/site.ts`.

## Belum diisi

- [ ] Alamat workshop (`WORKSHOP` di `src/content/site.ts`) — selama kosong, muncul kotak pengingat saat `npm run dev`
- [ ] Portofolio, berita, dan daftar peralatan fasilitas
- [ ] Periksa teks bertanda `DRAFT` di `src/content/site.ts`
- [ ] Ganti foto Pexels sementara dengan foto asli workshop
- [ ] Video hero tanpa watermark

## Environment variables (Vercel)

- `NEXT_PUBLIC_SITE_URL` — domain final, mis. `https://megawattpowerlistrindo.com`
- `NEXT_PUBLIC_GA_ID` — opsional, ID Google Analytics (hanya dimuat jika pengunjung menyetujui cookie analitik)
