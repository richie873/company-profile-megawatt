#!/usr/bin/env bash
# Mengunduh foto portofolio dari situs WordPress lama ke public/images/portofolio/.
# Jalankan SEKALI dari root proyek (Git Bash di Windows juga bisa):
#   bash scripts/download-portfolio-images.sh
# Lakukan sebelum domain dipindahkan ke situs baru — setelah itu URL lama tidak bisa diakses.
set -e
BASE="https://megawattpowerlistrindo.com/wp-content/uploads/2026/04"
DEST="public/images/portofolio"
mkdir -p "$DEST"

get() { echo "↓ $2"; curl -fsSL "$BASE/$1" -o "$DEST/$2"; }

get "WhatsApp-Image-2026-04-26-at-08.01.42.jpeg" "rewinding-motor-1900kw.jpg"
get "WhatsApp-Image-2026-04-26-at-08.01.36.jpeg" "rewinding-dc-motor-300kw.jpg"
get "WhatsApp-Image-2026-04-26-at-08.01.32.jpeg" "rewinding-trafo-2800kva.jpg"
get "WhatsApp-Image-2026-04-26-at-08.01.27.jpeg" "rewinding-trafo-1250kva.jpg"
get "WhatsApp-Image-2026-04-26-at-08.01.23.jpeg" "rewinding-motor-slipring-2800kw.jpg"
get "WhatsApp-Image-2026-04-26-at-08.01.18.jpeg" "overhaul-id-fan-2500kw-pltu-babelan.jpg"
get "WhatsApp-Image-2026-04-26-at-08.01.13.jpeg" "balancing-shaft-rotor-110kw.jpg"
get "WhatsApp-Image-2026-04-26-at-08.01.09.jpeg" "penggantian-shaft-rotor-250kw.jpg"
get "WhatsApp-Image-2026-04-26-at-08.01.03.jpeg" "balancing-screw.jpg"
get "WhatsApp-Image-2026-04-26-at-08.00.55.jpeg" "overhaul-generator-55mw-bontang.jpg"
get "WhatsApp-Image-2026-04-26-at-08.00.50.jpeg" "overhaul-slipring-motor-1550kw-timah.jpg"
get "WhatsApp-Image-2026-04-26-at-08.00.46.jpeg" "overhaul-steam-turbine-1mw-dumai.jpg"
# Halaman 2
get "WhatsApp-Image-2026-04-26-at-08.00.41.jpeg" "overhaul-steam-turbine-7-5mw-pks-dumai.jpg"
get "WhatsApp-Image-2026-04-26-at-08.00.36.jpeg" "rekondisi-steam-turbine-tanker-pertamina.jpg"
get "WhatsApp-Image-2026-04-26-at-08.00.31.jpeg" "overhaul-generator-5mw-pks-dumai.jpg"
get "WhatsApp-Image-2026-04-26-at-08.00.22.jpeg" "alignment-laser-2850kw.jpg"
get "WhatsApp-Image-2026-04-26-at-08.00.15.jpeg" "alignment-laser-2860kw.jpg"
get "Overhaul-motor-1100-kw.webp" "overhaul-motor-1100kw.webp"
get "Overhaul-motor-1200-kw.webp" "overhaul-motor-1200kw.webp"
get "Repairing-Rotor-Commutator-250KW.webp" "repairing-rotor-commutator-250kw.webp"
get "Rekondisi-turbine-steam-kapal.webp" "rekondisi-turbine-steam-kapal.webp"
get "Overhaul-turbine-75-mw.webp" "overhaul-turbine-7-5mw.webp"
get "Overhaul-generator-5-mw.webp" "overhaul-generator-5mw.webp"
get "Overhaul-Motor-2500-kW.webp" "overhaul-motor-2500kw.webp"
# Halaman 3
get "Rewinding-trafo-500-kva.webp" "rewinding-trafo-500kva.webp"
get "Balancing-on-site-blower.webp" "balancing-on-site-blower.webp"
get "Rewinding-motor-400-kw.webp" "rewinding-motor-400kw.webp"
get "Skimming-undercutting.webp" "skimming-undercutting.webp"
get "Rewinding-lifting-magnet.webp" "rewinding-lifting-magnet.webp"
get "Overhaul-genset-225-kva.webp" "overhaul-genset-225kva.webp"
get "Overhaul-slip-ring-motor.webp" "overhaul-slip-ring-motor.webp"

# Foto berita (2 foto berita lain memakai foto portofolio di atas)
NEWS_DEST="public/images/berita"
mkdir -p "$NEWS_DEST"
getn() { echo "↓ $2"; curl -fsSL "$BASE/$1" -o "$NEWS_DEST/$2"; }
getn "transformer-maintenance-4_11zon-1.webp" "perawatan-transformator.webp"
getn "transformer-maintenance-colorize.webp" "jenis-transformator.webp"
getn "about-hero.webp" "motor-ac-dc.webp"
getn "electrical-rewinding-colorize.webp" "apa-itu-rewinding.webp"

echo "Selesai. $(ls "$DEST" | grep -v gitkeep | wc -l) foto di $DEST (seharusnya 31), $(ls "$NEWS_DEST" | wc -l) foto di $NEWS_DEST (seharusnya 4)"
