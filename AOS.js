const prefersReducedMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

AOS.init({
    duration: 900,
    once: true,
    easing: "ease-in-out",
    offset: 60,
    disable: prefersReducedMotion
});

/* ==========================================================
   PETALS (ambient, paused once reduced motion is preferred)
========================================================== */
const petals = document.querySelector(".petals");
const flowers = ["🤍", "✨", "🌙"];
let petalTimer = null;

function createPetal(){
    const petal = document.createElement("div");
    petal.classList.add("petal");

    petal.innerHTML = flowers[Math.floor(Math.random() * flowers.length)];
    petal.style.left = Math.random() * 100 + "vw";
    petal.style.fontSize = (14 + Math.random() * 14) + "px";
    petal.style.animationDuration = (6 + Math.random() * 5) + "s";

    petals.appendChild(petal);

    setTimeout(() => petal.remove(), 12000);
}

function startPetals(){
    if (prefersReducedMotion || petalTimer) return;
    petalTimer = setInterval(createPetal, 450);
}

/* ==========================================================
   COUNTDOWN
========================================================== */
const weddingDate = new Date("2026-12-12T09:00:00").getTime();

function updateCountdown(){
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance <= 0){
        document.querySelector(".countdown").innerHTML =
            "<h2>🎉 Selamat Menempuh Hidup Baru 🎉</h2>";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = String(days).padStart(2, "0");
    document.getElementById("hours").innerHTML = String(hours).padStart(2, "0");
    document.getElementById("minutes").innerHTML = String(minutes).padStart(2, "0");
    document.getElementById("seconds").innerHTML = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

/* ==========================================================
   GUEST NAME FROM URL (?to=Nama%20Tamu)
========================================================== */
const params = new URLSearchParams(window.location.search);
const guest = params.get("to");

document.getElementById("guestName").innerHTML =
    guest ? decodeURIComponent(guest) : "Tamu Undangan";

/* ==========================================================
   LIGHTBOX
========================================================== */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

function openLightbox(src){
    lightbox.style.display = "flex";
    lightboxImg.src = src;
}

function closeLightbox(){
    lightbox.style.display = "none";
}

lightbox.addEventListener("click", function (e){
    if (e.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", function (e){
    if (e.key === "Escape") closeLightbox();
});

/* ==========================================================
   COPY GIFT ACCOUNT NUMBER
========================================================== */
function copyText(text){
    navigator.clipboard.writeText(text);
    alert("Nomor rekening berhasil disalin.");
}

/* ==========================================================
   ADD TO CALENDAR
========================================================== */
function addToCalendar(type){
    const isAkad = type === "akad";

    // Times are WIB (UTC+7), written out below in UTC for the .ics file.
    const summary = isAkad
        ? "Akad Nikah - Jidan & Wulan"
        : "Resepsi Pernikahan - Jidan & Wulan";
    const start = isAkad ? "20261212T020000Z" : "20261212T040000Z";
    const end = isAkad ? "20261212T030000Z" : "20261212T070000Z";
    const description = isAkad
        ? "Akad Nikah Jidan & Wulan. Detail lokasi lengkap ada di undangan."
        : "Resepsi Pernikahan Jidan & Wulan. Detail lokasi lengkap ada di undangan.";

    const ics = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "BEGIN:VEVENT",
        `SUMMARY:${summary}`,
        `DTSTART:${start}`,
        `DTEND:${end}`,
        `DESCRIPTION:${description}`,
        "END:VEVENT",
        "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([ics], { type: "text/calendar" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = isAkad ? "akad-nikah.ics" : "resepsi.ics";
    document.body.appendChild(link);
    link.click();
    link.remove();
}

/* ==========================================================
   MUSIC
========================================================== */
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
let isPlaying = false;

function setMusicIcon(){
    musicBtn.innerHTML = isPlaying ? "⏸" : "🎵";
    musicBtn.classList.toggle("playing", isPlaying);
}

musicBtn.addEventListener("click", function (){
    if (isPlaying){
        music.pause();
        isPlaying = false;
    } else {
        music.play().then(() => { isPlaying = true; }).catch(() => {});
    }
    setMusicIcon();
});

/* ==========================================================
   OPENING COVER
========================================================== */
const cover = document.getElementById("cover");
const mainContent = document.getElementById("mainContent");

function openInvitation(){
    cover.classList.add("is-open");
    document.body.classList.remove("lock-scroll");
    mainContent.classList.add("is-visible");

    startPetals();

    music.play()
        .then(() => {
            isPlaying = true;
            setMusicIcon();
        })
        .catch(() => {
            // Autoplay was blocked; the visitor can start music from the button.
        });

    window.scrollTo({ top: 0, behavior: "auto" });

    setTimeout(() => AOS.refresh(), 300);
}
