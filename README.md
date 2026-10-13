# <div align="center">Zenith</div>

Repositori ini menyimpan source code dari website Zenith CSUI (angkatan 2026).

## Developing

Proyek ini menggunakan:

* Bun, package manager dan runtime
* Astro, generator
* React, UI framework
* Biome, linting (`bun lint`) dan formatting (`bun format`)

### Local development

1. Clone repositori
1. Install dependencies (`bun i`)
1. Run `bun run sync` untuk melakukan pre-generasi type dan definisi khusus Astro (lihat baris 4 [tsconfig.json](tsconfig.json))
1. Run `bun run sync:photos` untuk mendownload foto-foto profil angkatan 2026 (lihat [scripts/sync-photos.md](./scripts/sync-photos.md))
1. Run `bun run dev` untuk menjalankan server development lokal

### Kontribusi

wip
