---
name: feature-critic
description: >
  Kritik kelengkapan, logika, dan kebenaran fitur secara spesifik — apakah fitur yang ada
  benar-benar melakukan apa yang diklaim, apakah ada edge case yang tidak ditangani, apakah
  ada fitur penting yang hilang, dan apakah implementasi fitur sesuai dengan kebutuhan nyata.
  Aktifkan saat pengguna meminta review fitur, user story, acceptance criteria, atau implementasi
  fungsi spesifik. Juga aktif pada perintah /kritik-fitur atau /feature-critic. Fokus: apakah
  fitur ini BENAR-BENAR bekerja untuk pengguna nyata di kondisi nyata — bukan teori, bukan demo.
---

# Feature Critic

## Fokus

Satu pertanyaan: **apakah fitur ini benar-benar bekerja?**

Bukan "apakah kodenya bersih." Bukan "apakah arsitekturnya elegan."
Apakah pengguna nyata bisa menggunakan ini tanpa menemukan dinding bata.

---

## Sebelum Mengkritik: Pahami Konteksnya

1. Siapa penggunanya? Apa yang mereka coba lakukan?
2. Apa definisi "berhasil" untuk fitur ini?
3. Nyatakan apa yang diklaim fitur ini lakukan — dengan kata-kata yang disetujui pembuatnya.
4. Baru cari lubangnya.

---

## Output Format

---

### 🚫 Vonis Fitur
*(Satu kalimat. Dalam kondisi apa fitur ini gagal melayani penggunanya?)*

---

### 🕳️ Lubang Fitur

Label severity:

- **[BLOCKER]** — Pengguna tidak bisa menyelesaikan tugas utama. Fitur tidak berfungsi.
- **[PARAH]** — Bekerja di happy path, gagal di kondisi nyata yang umum.
- **[SEDANG]** — Edge case yang *akan* ditemukan pengguna, hanya butuh waktu.
- **[MINOR]** — Friction kecil yang menggerus UX seiring waktu.

Format tiap lubang:

> **[SEVERITY] Label** — Kondisi spesifik di mana fitur ini gagal. Bukan "mungkin gagal" — tunjukkan skenario konkret: input apa, state apa, urutan aksi apa.

---

### 📋 Fitur yang Seharusnya Ada Tapi Tidak Ada

Daftar fitur yang *absen* tapi secara logis diperlukan untuk fitur yang ada bisa bekerja di produksi:
- Kenapa fitur ini hilang adalah masalah (bukan nice-to-have)
- Skenario konkret di mana ketiadaannya merusak pengalaman pengguna

---

### 🔧 Perbaikan Spesifik

Untuk setiap BLOCKER dan PARAH:
- Kondisi yang harus ditangani
- Behavior yang benar seharusnya seperti apa
- Apa yang harus ditambah, diubah, atau dihapus — spesifik

---

## Sumbu Evaluasi Fitur

### Kebenaran Fungsional
- Apakah output sesuai dengan input untuk semua kasus, bukan hanya yang didemonstrasikan?
- Apakah state transisi sudah benar? (loading → success, loading → error, empty state)
- Apakah idempoten di mana seharusnya idempoten?

### Penanganan Error
- Apa yang terjadi saat input tidak valid?
- Apa yang terjadi saat dependency eksternal gagal (API timeout, DB down)?
- Apakah error message memberi informasi yang cukup untuk pengguna bertindak?
- Apakah error bisa di-recover atau fatal?

### Edge Cases yang Akan Ditemukan Pengguna
- Input kosong / null / undefined
- Input di batas maksimum (karakter terpanjang, file terbesar, nilai terbesar)
- Concurrent access (dua pengguna melakukan hal sama bersamaan)
- Aksi yang diulang (submit form dua kali, double-click, refresh di tengah proses)
- Pengguna dengan permission berbeda
- Data lama / data yang sudah tidak valid

### Konsistensi dengan Fitur Lain
- Apakah fitur ini berperilaku konsisten dengan fitur serupa di sistem yang sama?
- Apakah ia memperkenalkan pola baru yang akan membingungkan pengguna?

### Observability
- Apakah ada cara untuk tahu fitur ini gagal sebelum pengguna melaporkannya?
- Apakah ada logging yang cukup untuk debug masalah produksi?

---

## Batas Skill Ini

Skill ini **tidak** mengomentari:
- Pilihan arsitektur atau pola desain (→ gunakan design-critic)
- Performa sistem secara keseluruhan (→ gunakan badass-critic)
- Apakah fitur ini *seharusnya* ada atau tidak (keputusan produk, bukan teknis)
