Hi guys, mengenai website Angkatan, aku ada suggestions.

Kemaren-kemaren, aku sempet minta repository karena kepikiran mau otak atik setelah melihat hasil deployment terakhir di https://zenith.csui.dev/  mungkin emang belum sempet lanjut didevelop (idk), akhirnya aku coba otak-atik sendiri. 

Ini hasilnya. Aku deploy di https://zenith-csui.web.app/ pake firebase.

Perubahan yang aku suggest ada di situ, sebenernya banyak sih yang masih pengen ku tambah/ubah, tapi so far yaaa segitu dulu di https://zenith-csui.web.app/

1. Universally:
Navbar ku perkecil karena gede banget, jadi segitu, dan di ujung aku voluntarily design logonya Zenith.

Kalo misalnya kalian suka, mungkin bisa di omongin juga keangatan buat branding/merch hahahah, mungkin logonya bisa lebih diseriusin soalnya ini sesuai sketsa iseng kemaren wkwkwk

Ohiya, max-page-width nya ku gedein, jadi orang yang make monitor panjang atau di desktop view nya zoom out around like dibawah 80% bisa lebih muat banyak content, especially the Members page.

I added support for mobile but kyknya ini ga jauh beda, maybe yang home page nya aja kurang optimized? textnya gede gede semua sih across website untuk mobile

2. Home page:
Setelah di pikir-pikir, floating scroll 'jump-to-section' menurutku better diilangin aja deh, i think it's not that necessary, yang lorem ipsum paragraph depan mascots nya juga (walaupun i think im one of the people yg bikin di figma wkwkkw)

"Our Activities" juga aku ubah, jadinya kayak bisa pencet < > instead of carousel karena agak janggal gimana gitu setelah di liat liat sekarang.

"Our Peeps" tbh yang warna merah biru ngejreng menurut aku kurang enak diliat, jadi aku ubah putih aja. Like, I know kita pacil tp better jangan semuanya di biru-merahkan :(

3. untuk Gallery gaada kepikiran perubahan, mungkin next di characternya maybe

4. Academic:
Ini frontnya aku bikin kayak gitu biar enak cuz kemaren gede bgt font buat option jurusannya, dan di dalemnya yang daftar matkul aku ubah dari yang list warna biru merah kemaren jadi disimplify ga ngejreng.

Buat pilihan angka semester, ku bikinin jadi kayak ala ala navbar biar lebih compact.

6. Members:
Ini udah okay see haha, ini aku bikin biar bisa nampilin orang lebih dari 4 dalam satu baris ketika screen lebih besar.

Di detailednya, aku tambah lagi karena pas ngedesign UI nya gakepikiran. Ini untuk socials nya ku tambahin logo globe buat website portfolio, which kalo kalian mau liat contohnya liat page aku, terus disitu ada email dan nama lengkap juga, mengingat banyak nama panggilan yang mirip wkwkkw jadi ada pembeda lah ya dengan nama lengkap. Sama itu aja sih, paling yang similar people, aku gatau mekanisme sebelumnya gimana tp aku makesure lagi biar dia match Niche/interestnya sesuai yang lagi dibuka.

Also, aku udah bikin generalized niches, yang dimana niche-niche inputtan murni dari temen temen kita kemaren kita koreksi dan grup (perbedaan typing dan bahasa) buat mempermudah filtering dan searching buat user kalo mau liat temen temen dengan niche tertentu. Di gallery, tiap 5 detik bakal animatedly switch to another generalized niches of each of our friends. 

6. Database / Crud (or whatever it's called):
Untuk database aku liat masih pake json, dari awal i thought yall would use like online database or firebase. Ini aku coba pake firebase, dan ada web https://cruda-lumping.web.app/ buat otak atik isinya live and dynamic langsung keganti di website kita. Iya, web crudnya slop banget but maybe untuk UI nya bisa nanti aja cuz ini juga ga public paling yaa buat kita kita doang.
