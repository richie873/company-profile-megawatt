// src/lib/site-images.ts
// Semua foto di halaman depan dikumpulkan di sini supaya mudah diganti.
//
// SEMENTARA: foto dari Pexels (gratis untuk komersial, tanpa atribusi).
// Ganti dengan foto asli workshop Megawatt: simpan di /public/images/...
// lalu ubah nilainya, mis. "/images/rewinding.jpg".
// Nilai null = belum ada foto; komponen akan menampilkan panel navy sebagai pengganti.

const pexels = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1600`;

export const IMAGES = {
  // Teknisi menguji kabel motor — idealnya: tim Megawatt di workshop
  about: pexels(33531832) as string | null,
  services: {
    // Idealnya: gulungan tembaga / stator yang sedang di-rewind
    rewinding: pexels(34194564) as string | null,
    // Idealnya: pekerjaan bearing, shaft, balancing, atau machining
    mechanical: null as string | null,
    // Gardu dengan transformator — idealnya: trafo yang sedang dirawat tim Anda
    transformer: pexels(236089) as string | null,
  },
  // Tambang terbuka — idealnya: foto di lokasi pelanggan (dengan izin)
  industries: pexels(2566850) as string | null,
};
