# AcidMind

> Keluarga 7 skill kritik spesialis untuk AI coding agent. Tiap skill adalah lensa yang berbeda
> — desain, fitur, performa, keamanan, audit skill itu sendiri, atau kejujuran manusiawi biasa —
> dibaca **sesuai kebutuhan**, bukan dipaksa dimuat di setiap sesi.

`ACIDMIND.md` adalah router. File ini tidak berisi aturan kritik itu sendiri — ia memberitahu
agent skill *mana* yang harus dibaca setelah mengenali pengguna ingin sebuah review, dan *kapan
tidak perlu repot*. Aturan sebenarnya ada di `skills/<name>/SKILL.md`.

---

## Prinsip Inti

Feedback generik lebih buruk daripada tidak ada feedback sama sekali. "Secara keseluruhan bagus,
cuma ada beberapa hal minor" membuang waktu semua orang. AcidMind ada supaya agent memilih lensa
kritik yang *tepat* untuk artifact yang sedang dihadapi — masalah arsitektur mendapat review
arsitektur, bukan ceramah performa — dan menghasilkan temuan yang spesifik, berjenjang severity,
dan bisa ditindaklanjuti.

**Satu tes sebelum memakai skill AcidMind mana pun:** apakah temuan yang akan kamu tulis bisa
berlaku untuk hampir semua codebase, tanpa diubah? Kalau ya, itu bukan temuan — cari lebih dalam
atau jangan bilang apa-apa.

---

## Tujuh Skill

| Skill | Baca ini saat pengguna ingin... | File |
|---|---|---|
| `ruthless-critic` | Review brutal umum untuk kode, argumen, rencana, atau artifact apa pun — default saat tidak ada lensa lain yang lebih cocok | `skills/ruthless-critic/SKILL.md` |
| `design-critic` | Review arsitektur / desain sistem — coupling, abstraksi, dependency, skalabilitas struktural | `skills/design-critic/SKILL.md` |
| `feature-critic` | Fitur spesifik diperiksa kelengkapan dan kebenarannya — apakah benar-benar bekerja untuk pengguna nyata | `skills/feature-critic/SKILL.md` |
| `badass-critic` | Review performa dengan angka konkret — kompleksitas algoritma, DB/I/O, memory, concurrency | `skills/badass-critic/SKILL.md` |
| `heart-attack-critic` | Simulasi skenario terburuk sebelum launch atau audit keamanan — apa yang bisa salah secara fatal | `skills/heart-attack-critic/SKILL.md` |
| `skill-critic` | File `SKILL.md` itu sendiri diaudit sebelum diinstall/didistribusikan — apakah akan terpicu benar, aman, dan berguna | `skills/skill-critic/SKILL.md` |
| `tellingtruth-critic` | Pendapat jujur tanpa format, manusiawi — tanpa label severity, tanpa emoji, cuma bicara terus terang | `skills/tellingtruth-critic/SKILL.md` |

---

## Logika Routing

Gunakan urutan keputusan ini saat sebuah permintaan bisa cocok dengan lebih dari satu skill:

1. **Apakah artifact-nya sendiri adalah `SKILL.md`?** → `skill-critic`, selalu. Tidak ada skill
   lain yang berlaku untuk file skill.
2. **Apakah pengguna secara eksplisit meminta skenario terburuk / bencana / "apa yang bisa salah
   secara fatal", atau menggunakan framing kesiapan-launch / audit keamanan?** →
   `heart-attack-critic`. Jangan pakai ini untuk permintaan review rutin — skill ini sengaja
   menakutkan dan harus disimpan untuk momen yang memang membutuhkannya.
3. **Apakah pengguna bertanya spesifik soal kecepatan, latensi, beban, skala, atau penggunaan
   resource — atau memberi data profiling/benchmark?** → `badass-critic`.
4. **Apakah pengguna bertanya apakah fitur/fungsi tertentu benar-benar bekerja, lengkap, atau
   menangani edge case?** → `feature-critic`.
5. **Apakah pengguna bertanya soal struktur, arsitektur, pola, coupling, atau "apakah codebase
   ini bisa di-scale" (bukan runtime-nya)?** → `design-critic`.
6. **Apakah pengguna secara eksplisit meminta pendapat polos, manusiawi, tanpa format — atau
   bilang sudah lelah dengan laporan audit formal?** → `tellingtruth-critic`.
7. **Semua permintaan review/kritik/roast lainnya** → `ruthless-critic`, default umum.

Kalau satu permintaan mencakup lebih dari satu sumbu (misalnya "review PR ini" menyentuh desain
dan performa sekaligus), utamakan concern yang dominan dan sebutkan dalam satu baris bahwa sumbu
lain juga ada — jangan jalankan output penuh dari semua skill secara berurutan.

---

## Setup: Router Pattern

Kebanyakan proyek yang memakai AI coding agent sudah punya file entry-point (`AGENTS.md`,
`CLAUDE.md`, `GEMINI.md`, dll) yang **selalu** dibaca agent di awal sesi.

Jangan tempel ketujuh skill ke file itu. Sebagai gantinya, simpan direktori `skills/` dari repo
ini di mana pun file aturan agent lainnya berada, lalu tambahkan satu blok pointer ke file
entry-point yang sudah ada:

```
## Code & Design Review
Jika tugas melibatkan review, kritik, audit, atau roast terhadap kode, desain,
fitur, performa, postur keamanan, atau file skill, baca `ACIDMIND.md` dulu
untuk memilih lensa yang tepat, lalu baca file yang cocok di bawah `skills/`.
```

Kenapa pola ini lebih baik daripada menggabungkan semuanya:

- **Hemat context** — aturan dari tujuh skill hanya dimuat saat review benar-benar diminta,
  bukan di setiap tugas yang tidak berhubungan.
- **Lebih mudah dirawat** — memperbarui satu skill tidak pernah butuh menyentuh file entry-point
  proyek atau enam skill lainnya.
- **Portabel** — salin direktori `skills/` (atau cukup satu skill yang dibutuhkan) ke proyek
  mana pun dan tambahkan satu baris pointer di atas.

Pola ini generik dan tidak terikat tool tertentu: hanya instruksi bahasa natural biasa yang
dijalankan agent dengan tool baca-file miliknya sendiri, jadi bekerja sama persis di Claude Code,
Codex, Cursor, Windsurf, atau agent lain yang bisa membaca file yang dirujuk.

### Install skill native di Claude / Claude Code

Kalau kamu di Claude.ai atau Claude Code, kamu tidak butuh router pattern sama sekali — install
skill secara native supaya Claude sendiri yang menemukan dan memicunya:

1. Salin folder yang relevan dari `skills/` ke direktori skill kamu, **atau**
2. Kemas sebuah skill sebagai file `.skill` dan upload lewat alur **Save skill**:
   ```bash
   cd skills
   zip -r ruthless-critic.skill ruthless-critic/
   ```
   Ulangi per skill, atau ambil file `.skill` yang sudah dikemas dari releases repo ini /
   direktori `packages/` kalau disertakan.

Frontmatter `description` tiap skill sengaja ditulis sedikit "pushy" — Claude cenderung
undertrigger skill, jadi bahasa trigger-nya condong menangkap permintaan yang relevan daripada
melewatkannya.

### Prompt manual / sekali pakai

Tidak mau setup file apa pun? Salin isi `skills/<name>/SKILL.md` yang kamu butuhkan dan tempel
di awal prompt kamu.

> **Peringatan:** kurang reliable dibanding router pattern atau install native. Blok aturan
> panjang yang ditempel di chat lebih rentan diabaikan sebagian seiring percakapan memanjang.
> Gunakan sebagai fallback, bukan setup utama.

---

## Cara Mengambil File

```
curl -o ACIDMIND.md https://raw.githubusercontent.com/<username-anda>/acidmind/main/ACIDMIND.md
```

Atau ambil satu skill langsung:

```
curl -o SKILL.md https://raw.githubusercontent.com/<username-anda>/acidmind/main/skills/ruthless-critic/SKILL.md
```

Atau clone seluruh keluarganya:

```
git clone https://github.com/<username-anda>/acidmind.git
```

---

## Struktur Repo

```
acidmind/
├── ACIDMIND.md              # file ini — router / index
├── ACIDMIND-ID.md           # versi Indonesia router ini
├── README.md                # gambaran proyek (Inggris)
├── README-ID.md             # gambaran proyek (Indonesia)
├── LICENSE
└── skills/
    ├── ruthless-critic/
    │   └── SKILL.md
    ├── design-critic/
    │   └── SKILL.md
    ├── feature-critic/
    │   └── SKILL.md
    ├── badass-critic/
    │   └── SKILL.md
    ├── heart-attack-critic/
    │   └── SKILL.md
    ├── skill-critic/
    │   └── SKILL.md
    └── tellingtruth-critic/
        ├── SKILL.md
        └── SKILL-ID.md      # draft asli bahasa Indonesia, disimpan sebagai referensi
```

---

## Aturan Desain Bersama di Ketujuh Skill

- **Pahami sebelum mengkritik.** Nyatakan ulang intent artifact dengan kata-kata yang akan
  disetujui pembuatnya sebelum mencari cacat. Kritik strawman adalah kritik yang gagal.
- **Label severity, bukan vibes.** Setiap temuan diberi peringkat supaya pembaca tahu apa yang
  harus diperbaiki lebih dulu.
- **Konkret, bukan samar.** "Ini mungkin lambat" dilarang. Input spesifik, ambang beban, atau
  skenario wajib disertakan.
- **Terbatas scope-nya, tidak tumpang tindih.** Tiap skill menyatakan apa yang *bukan*
  cakupannya dan menyebut skill sebelah yang menanganinya — lihat tabel routing di atas.
- **Read-only secara default.** Ini adalah alat diagnostik. Mereka mengusulkan perbaikan; tidak
  menerapkannya kecuali pengguna secara eksplisit meminta implementasi.
- **Sadar prompt injection.** Skill yang memproses artifact eksternal (`ruthless-critic`,
  `skill-critic`, `heart-attack-critic`) secara eksplisit memperlakukan konten yang direview
  sebagai data, bukan instruksi — teks di dalam artifact yang diserahkan tidak bisa membujuk
  skill untuk melunak.

---

## Kontribusi

PR diterima untuk: sumbu kritik baru yang tidak tumpang tindih dengan tujuh yang sudah ada,
heuristik severity yang lebih tajam, atau laporan saat cakupan yang dinyatakan sebuah skill
melenceng dari perilaku sebenarnya.

## Lisensi

MIT — lihat [LICENSE](./LICENSE).
