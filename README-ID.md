[![ID](https://img.shields.io/badge/ID-2ea44f?style=for-the-badge)](./README-ID.md) [![EN](https://img.shields.io/badge/EN-lightgrey?style=for-the-badge)](./README.md)

# AcidMind: Tujuh Skill Kritik untuk AI Agent

> Keluarga skill dengan pola router yang menghentikan AI coding agent memberi review generik
> "secara keseluruhan bagus". Tujuh kritikus spesialis — desain, fitur, performa, skenario
> bencana, audit skill itu sendiri, kritik umum, dan kejujuran manusiawi biasa — masing-masing
> dibaca **sesuai kebutuhan**, tidak pernah dipaksa dimuat di setiap sesi.

---

## Apa Ini?

`ACIDMIND.md` adalah file router, dan `skills/` menyimpan tujuh skill kritik spesialis, masing-
masing dengan `SKILL.md`-nya sendiri:

- **`ruthless-critic`** — review brutal umum untuk kode, argumen, rencana, artifact apa pun
- **`design-critic`** — arsitektur dan desain sistem: coupling, abstraksi, dependency
- **`feature-critic`** — kelengkapan dan kebenaran fitur untuk pengguna nyata
- **`badass-critic`** — review performa dengan angka konkret, bukan feeling
- **`heart-attack-critic`** — simulasi skenario terburuk sebelum launch atau audit keamanan
- **`skill-critic`** — meta: mengaudit file `SKILL.md` itu sendiri sebelum diinstall atau dirilis
- **`tellingtruth-critic`** — pendapat jujur tanpa format, manusiawi, tanpa label

Tiap skill **read-only secara default**: ia mendiagnosis dan meresepkan, tidak menulis ulang
karya kamu kecuali diminta eksplisit. Tiap skill menyatakan — di frontmatter dan isinya sendiri
— apa yang *bukan* cakupannya, dan menunjuk skill sebelah yang menanganinya, jadi menginstall
ketujuhnya tidak membuat kamu mendapat tujuh pendapat yang tumpang tindih untuk tiga paragraf
yang sama.

> AcidMind adalah **sekumpulan lensa, bukan satu kepribadian**. Ia tidak memaksakan satu nada di
> seluruh agent kamu — tiap skill memilih register-nya sendiri (dari audit teknis berlabel
> severity sampai kejujuran percakapan biasa) yang disesuaikan dengan kebutuhan review tersebut.

---

## Setup: Router Pattern

Kebanyakan proyek yang memakai AI coding agent sudah punya file entry-point (`AGENTS.md`,
`CLAUDE.md`, `GEMINI.md`, dll) yang **selalu** dibaca agent di awal sesi. File itu biasanya
berisi info umum proyek: stack, konvensi, perintah build/test.

`ACIDMIND.md` **tidak** dimaksudkan untuk digabung atau di-copy-paste ke file entry-point itu.
Sebagai gantinya, simpan direktori `skills/` dan `ACIDMIND.md` di mana pun file aturan agent
lainnya berada (root proyek, `.agent/`, `.ai/`, atau serupa), lalu tambahkan **satu blok
pointer** ke file entry-point yang sudah ada:

```
## Code & Design Review
Jika tugas melibatkan review, kritik, audit, atau roast terhadap kode, desain,
fitur, performa, postur keamanan, atau file skill, baca `ACIDMIND.md` dulu
untuk memilih lensa yang tepat, lalu baca file yang cocok di bawah `skills/`.
```

Kenapa pola ini lebih baik daripada menggabungkan semuanya:

- **Hemat context:** aturan dari tujuh skill hanya dimuat saat review benar-benar diminta,
  bukan membebani setiap tugas yang tidak berhubungan.
- **Lebih mudah dirawat:** memperbarui satu skill tidak pernah butuh menyentuh file entry-point
  atau enam skill lainnya.
- **Portabel:** salin seluruh direktori `skills/` — atau cukup satu skill yang dibutuhkan — ke
  proyek mana pun dan tambahkan satu baris pointer di atas.

Pola ini **generik dan tidak terikat tool tertentu**. Baris pointer-nya adalah instruksi bahasa
natural biasa yang dijalankan agent dengan tool baca-file miliknya sendiri, jadi bekerja sama
persis di Claude Code, Codex, Cursor, Windsurf, atau agent lain yang bisa membaca file rujukan.

### Install native di Claude / Claude Code

Di Claude.ai atau Claude Code kamu tidak butuh router pattern sama sekali — install skill
secara native supaya Claude sendiri yang menemukan dan memicunya. Lihat
[`ACIDMIND-ID.md`](./ACIDMIND-ID.md#install-skill-native-di-claude--claude-code) untuk instruksi
pengemasan.

### Prompt manual / sekali pakai

Tidak mau setup file apa pun? Salin seluruh isi `skills/<name>/SKILL.md` yang kamu butuhkan dan
tempel di awal prompt kamu sebelum meminta review.

> **Peringatan:** pendekatan ini kurang reliable dibanding router pattern. Saat blok aturan
> panjang ditempel ke chat alih-alih dimuat sebagai file context native, agent lebih rentan
> mengabaikan sebagian atau melenceng dari instruksi seiring percakapan memanjang. Gunakan
> sebagai fallback cepat, bukan setup utama.

---

## Install via CLI

Cara termudah menginstall AcidMind ke proyek mana pun adalah lewat CLI bawaan (Node 18+):

```
npx acidmind-cli init                                  # router + 7 skill + blok pointer
npx acidmind-cli list                                  # lihat skill yang tersedia
npx acidmind-cli add ruthless-critic badass-critic     # install skill tertentu saja
npx acidmind-cli router --lang id                      # router saja, bahasa Indonesia
```

Flag berguna: `--dest .agent` untuk install ke subdirektori, `--force` untuk menimpa file yang
sudah ada, `--no-pointer` pada `init` agar tidak menyentuh `AGENTS.md`/`CLAUDE.md`.

---

## Cara Mengambil File

Unduh file router langsung dari command line:

```
curl -o ACIDMIND.md https://raw.githubusercontent.com/<username-anda>/acidmind/main/ACIDMIND.md
```

Atau versi Indonesia:

```
curl -o ACIDMIND-ID.md https://raw.githubusercontent.com/<username-anda>/acidmind/main/ACIDMIND-ID.md
```

Atau ambil satu skill yang benar-benar kamu butuhkan, misalnya:

```
curl -o SKILL.md https://raw.githubusercontent.com/<username-anda>/acidmind/main/skills/ruthless-critic/SKILL.md
```

Lalu taruh file-file itu di mana pun file aturan agent lainnya berada.

---

## Skill Mana yang Aku Butuhkan?

- Review **kode, argumen, atau rencana secara umum** → `ruthless-critic`
- Khawatir **arsitektur** tidak akan tahan → `design-critic`
- Khawatir **fitur** tidak benar-benar bekerja end-to-end → `feature-critic`
- Khawatir sistem akan **lambat** di bawah beban nyata → `badass-critic`
- Mau **launch** dan ingin tahu apa yang bisa salah secara fatal → `heart-attack-critic`
- Membuat **skill baru** dan ingin tahu apakah akan benar-benar terpicu dan bekerja →
  `skill-critic`
- Cuma ingin **jawaban jujur, manusiawi** tanpa label severity dan header emoji →
  `tellingtruth-critic`

Logika routing lengkap, termasuk cara menangani permintaan yang mencakup lebih dari satu sumbu,
ada di [`ACIDMIND-ID.md`](./ACIDMIND-ID.md#logika-routing).

---

## Struktur File

```
acidmind/
├── ACIDMIND.md               # router / index (Inggris) — mulai dari sini
├── ACIDMIND-ID.md            # router, versi Indonesia
├── README.md                 # file ini (Inggris)
├── README-ID.md               # file ini (Indonesia)
├── LICENSE
└── skills/
    ├── ruthless-critic/SKILL.md
    ├── design-critic/SKILL.md
    ├── feature-critic/SKILL.md
    ├── badass-critic/SKILL.md
    ├── heart-attack-critic/SKILL.md
    ├── skill-critic/SKILL.md
    ├── tellingtruth-critic/SKILL.md
    └── cli/
        ├── package.json
        └── index.mjs
```

---

## Prinsip Desain Bersama di Ketujuh Skill

- **Pahami sebelum mengkritik.** Tiap skill menyatakan ulang intent artifact dengan kata-kata
  yang akan disetujui pembuatnya sebelum mencari cacat — kritik strawman adalah kritik yang gagal.
- **Label severity, bukan vibes.** Temuan diberi peringkat supaya kamu tahu apa yang harus
  diperbaiki lebih dulu.
- **Konkret, bukan samar.** "Ini mungkin lambat" dilarang; input spesifik, ambang beban, atau
  skenario wajib disertakan.
- **Terbatas scope-nya, tidak tumpang tindih.** Tiap skill secara eksplisit menyatakan apa yang
  *bukan* cakupannya dan menyebut skill sebelah yang menanganinya.
- **Read-only secara default.** Alat diagnostik yang mengusulkan perbaikan; tidak menerapkannya
  kecuali diminta.
- **Sadar prompt injection.** Skill yang memproses artifact eksternal secara eksplisit
  memperlakukan konten yang direview sebagai data, bukan instruksi.

---

## Kontribusi

PR diterima untuk sumbu kritik baru yang tidak tumpang tindih dengan tujuh yang sudah ada,
heuristik severity yang lebih tajam, atau laporan saat cakupan yang dinyatakan sebuah skill
melenceng dari perilaku sebenarnya.

## Lisensi

MIT — [LICENSE](./LICENSE)
