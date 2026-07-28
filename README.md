<head>
    <link rel="stylesheet" href="https://unpkg.com/aos@2.3.4/dist/aos.css">
<link rel="stylesheet" href="edit1.css"></head>
<div class="petals">
</div>
<div class="guest-box">

    <p>Kepada Yth.</p>

    <h2 id="guestName">
        Tamu Undangan
    </h2>

    <small>Mohon maaf apabila ada kesalahan penulisan nama.</small>

</div>
<section class="hero">
    <div class="hero-content" data-aos="zoom-in" data-aos-duration="1200">
        <h4>The Wedding Of</h4>
        <h1>Jidan dan Wulan</h1>
        <p>12 Desember 2026</p>

        <a href="#mempelai" class="btn" onclick="openInvitation()">
    Buka Undangan
</a>
    </div>
</section>

<section id="mempelai" class="section">

    <h2 data-aos="fade-up">Assalamu'alaikum WR. WB</h2>

    <p data-aos="fade-up" data-aos-delay="200">
        Dengan memohon rahmat Allah SWT kami mengundang
        Bapak/Ibu/Saudara/i untuk hadir pada acara
        pernikahan kami.
    </p>

    <div class="couple">

        <div class="card"
             data-aos="fade-right"
             data-aos-duration="1000">

            <img src="jidan kacamata.jpeg">
            <h3>Zidhan Rhamadhan</h3>
            <p>Putra Bapak Wawan Setiawan dan Ibu Dini Hernawati</p>

        </div>

        <div class="love"
             data-aos="zoom-in"
             data-aos-delay="400">
             ❤
        </div>

        <div class="card"
             data-aos="fade-left"
             data-aos-duration="1000">

            <img src="wulan kacamata.jpeg">
            <h3>Wulanjani Santoso</h3>
            <p>Putri Bapak Widodo dan Ibu Rukmini</p>

        </div>

    </div>

</section>
<section class="love-story" id="story">

    <h2 data-aos="fade-up">Kisah Cinta Kami</h2>
    <p class="story-subtitle" data-aos="fade-up">
        "Tidak ada yang kebetulan di dunia ini. Semua telah tersusun rapi oleh Sang Pencipta."
    </p>

    <div class="timeline">

        <div class="timeline-item" data-aos="fade-right">
            <div class="timeline-date">2020</div>

            <div class="timeline-content">
                <h3>Pertama Bertemu</h3>
                <p>
                    Kami dipertemukan untuk pertama kalinya dalam sebuah acara.
                    Dari pertemuan sederhana itulah kisah kami dimulai.
                </p> 
            </div>
        </div>

        <div class="timeline-item" data-aos="fade-left">
            <div class="timeline-date">2021</div>

            <div class="timeline-content">
                <h3>Mulai Menjalin Hubungan</h3>
                <p>
                    Setelah saling mengenal lebih dekat,
                    kami memutuskan untuk berjalan bersama
                    dalam suka maupun duka.
                </p>
            </div>
        </div>

        <div class="timeline-item" data-aos="fade-right">
            <div class="timeline-date">2026</div>

            <div class="timeline-content">
                <h3>Lamaran</h3>
                <p>
                    Dengan restu kedua keluarga,
                    kami melangkah ke tahap yang lebih serius
                    melalui acara lamaran.
                </p>
            </div>
        </div>

        <div class="timeline-item" data-aos="fade-left">
            <div class="timeline-date">2027</div>

            <div class="timeline-content">
                <h3>Hari Bahagia</h3>
                <p>
                    InsyaAllah kami akan mengikat janji suci
                    dalam pernikahan dan memulai perjalanan hidup baru.
                </p>
            </div>
        </div>

    </div>

</section>
<section class="gallery">

    <h2 data-aos="fade-up">Galeri Foto</h2>

    <div class="gallery-grid">

        <img src="foto1.jpeg" onclick="openLightbox(this.src)">
        <img src="foto2.jpeg" onclick="openLightbox(this.src)">
        <img src="foto3.jpeg" onclick="openLightbox(this.src)">
        <img src="foto4.jpeg" onclick="openLightbox(this.src)">
        <img src="foto5.jpeg" onclick="openLightbox(this.src)">
        <img src="foto6.jpeg" onclick="openLightbox(this.src)">

    </div>

</section>

<!-- LIGHTBOX -->

<div id="lightbox" class="lightbox">

    <span class="close" onclick="closeLightbox()">&times;</span>

    <img id="lightbox-img">

</div>
<section class="section">

    <h2 data-aos="zoom-in">
        Akad Nikah
    </h2>

    <p data-aos="fade-up">
        Sabtu, 12 Desember 2026
        <br>
        09.00 WIB
    </p>

</section>

<section class="section">

    <h2 data-aos="zoom-in">
        Resepsi
    </h2>

    <p data-aos="fade-up">
        11.00 WIB
    </p>
<section class="section">

    <h2 data-aos="fade-up">
        Lokasi
    </h2>

    <a href="https://maps.app.goo.gl/YezKFnh4LYkeBRxS7"
       target="_blank"
       class="btn"
       data-aos="zoom-in">
        Google Maps
    </a>
</section>
<section class="gift" id="gift">

    <h2 data-aos="fade-up">🎁 Amplop Digital</h2>

    <p data-aos="fade-up">
        Doa restu Anda merupakan hadiah terindah bagi kami.
        Namun jika ingin memberikan tanda kasih,
        dapat melalui rekening berikut.
    </p>

    <div class="gift-container">

        <!-- BCA -->
        <div class="gift-card" data-aos="zoom-in">

            <h3>BCA</h3>

            <h4>7772245656</h4>

            <p>a.n. Zidhan Rhamadhan</p>

            <button onclick="copyText('7772245656')">
                Salin Nomor Rekening
            </button>

        </div>

        <!-- Aladin -->
        <div class="gift-card" data-aos="zoom-in" data-aos-delay="200">

            <h3>Aladin</h3>

            <h4>50287046454</h4>

            <p>a.n. Zidhan Rhamadhan</p>

            <button onclick="copyText('50287046454')">
                Salin Nomor Rekening
            </button>

        </div>

    </div>

    <!-- QRIS -->

    <div class="qris" data-aos="fade-up">

        <img src="qris dana.jpeg" alt="QRIS">

        <p>Scan QRIS untuk memberikan hadiah.</p>

    </div>

</section>

<section class="countdown-section">
    <h2>Menuju Hari Bahagia</h2>

    <div class="countdown">

        <div class="box">
            <span id="days">00</span>
            <small>Hari</small>
        </div>

        <div class="box">
            <span id="hours">00</span>
            <small>Jam</small>
        </div>

        <div class="box">
            <span id="minutes">00</span>
            <small>Menit</small>
        </div>

        <div class="box">
            <span id="seconds">00</span>
            <small>Detik</small>
        </div>

    </div>

</section>
<script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>

<audio id="bgMusic" loop>
    <source src="Assets/Music/audio weeding.mp3" type="audio/mpeg">
</audio>
<script src="AOS.js"></script>
</body>


