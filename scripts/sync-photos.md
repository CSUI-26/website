# Foto Profil Angkatan 2026

Foto profil anggota pada `src/data.json` bersumber dari Google Photos (`lh3.googleusercontent.com`). Memuat gambar langsung dari server Google dapat menyebabkan kendala *Too Many Requests* (HTTP 429) karena pembatasan *rate limit* dari server Google saat ratusan foto dimuat sekaligus.

Untuk mengatasi ini, foto di-cache secara lokal di bawah direktori `public/photos/`:
* `scripts/sync-photos.ts` harus dijalan secara manual (melalui `bun run sync:photos`) sebelum `bun run dev` dan `bun run build`.
* Foto diunduh secara satu per satu dengan jeda antar request dan *exponential backoff* jika terkena *rate limit*.
* File yang sudah tersimpan di `public/photos/` akan dilewati (*cache hit*), sehingga proses berikutnya berjalan instan (~15ms).
* Link asli Google di `src/data.json` tetap dipertahankan; aplikasi menggunakan helper `getMemberPhotoUrl` untuk memprioritaskan aset lokal dan fallback ke link remote jika belum tersedia.
* Untuk refresh cache foto secara manual, hapus isi direktori `public/photos/` (`rm -rf public/photos/*`) dan jalankan kembali `bun run sync:photos`.

`public/photos/` diignore oleh `.gitignore` untuk tidak mempolusi remote repositorinya.