// Merapikan foto portofolio berlatar putih supaya ukurannya seragam di website.
//
// Cara pakai (dari folder proyek):
//   node scripts/rapikan-foto-putih.mjs nama-foto.jpg [nama-foto-lain.webp ...]
//
// Untuk setiap foto di public/images/portofolio/, script ini:
//   1. memangkas tepi putih kosong di sekeliling objek,
//   2. menyimpan ulang dengan format yang sesuai ekstensinya (.jpg / .webp / .png),
//   3. menambahkan  fit: "contain"  pada proyek yang memakai foto itu di src/content/site.ts.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const DIR = "public/images/portofolio";
const SITE = "src/content/site.ts";

const files = process.argv.slice(2).map((f) => path.basename(f));
if (files.length === 0) {
  console.log("Contoh: node scripts/rapikan-foto-putih.mjs balancing-screw.jpg overhaul-motor-400kw.webp");
  process.exit(1);
}

let site = fs.readFileSync(SITE, "utf8");

for (const name of files) {
  const file = path.join(DIR, name);
  if (!fs.existsSync(file)) {
    console.log(`✗ ${name}: tidak ditemukan di ${DIR}`);
    continue;
  }
  const before = await sharp(file).metadata();
  // threshold: seberapa "hampir putih" yang dianggap latar (0–255). Naikkan jika masih ada sisa abu-abu muda.
  let img = sharp(file).flatten({ background: "#ffffff" }).trim({ background: "#ffffff", threshold: 20 });
  const ext = path.extname(name).toLowerCase();
  if (ext === ".webp") img = img.webp({ quality: 90 });
  else if (ext === ".png") img = img.png();
  else img = img.jpeg({ quality: 90, mozjpeg: true });
  const buf = await img.toBuffer();
  fs.writeFileSync(file, buf);
  const after = await sharp(buf).metadata();
  console.log(`✓ ${name}: ${before.width}x${before.height} → ${after.width}x${after.height}`);

  // Tandai proyek di site.ts sebagai foto latar putih
  const re = new RegExp(`(\\{[^\\n]*image: "/images/portofolio/${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"[^\\n]*?)\\s*\\}`, "g");
  site = site.replace(re, (line, body) => (line.includes("fit:") ? line : `${body}, fit: "contain" }`));
}

fs.writeFileSync(SITE, site);
console.log("\nSelesai. Cek hasilnya dengan npm run dev → halaman Portofolio.");
