const prefersReducedMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (window.AOS){
    AOS.init({
        duration: 900,
        once: true,
        easing: "ease-in-out",
        offset: 60,
        disable: prefersReducedMotion
    });
}

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

    setTimeout(() => { if (window.AOS) AOS.refresh(); }, 300);
}
/* ==========================================================
   SLIDE TO OPEN
========================================================== */
const sliderWrap = document.getElementById("openSlider");
const sliderTrack = sliderWrap ? sliderWrap.querySelector(".slider-track") : null;
const sliderThumb = document.getElementById("sliderThumb");
const sliderFill = document.getElementById("sliderFill");

if (sliderWrap && sliderTrack && sliderThumb && sliderFill){
    let maxX = 0;
    let currentX = 0;
    let dragging = false;
    let opened = false;
    let activePointerId = null;
    let dragOffsetX = 0;

    function setThumbX(x){
        currentX = Math.max(0, Math.min(maxX, x));
        sliderThumb.style.transform = `translateX(${currentX}px)`;
        sliderFill.style.width = (currentX + sliderThumb.offsetWidth) + "px";
        sliderWrap.classList.toggle("is-unlocked", maxX > 0 && currentX >= maxX * 0.7);
    }

    function computeMaxX(){
        maxX = Math.max(0, sliderTrack.clientWidth - sliderThumb.offsetWidth - 8);
        setThumbX(currentX);
    }

    function openAfterSlide(){
        if (opened) return;
        opened = true;
        dragging = false;
        sliderThumb.style.transition = "transform .25s var(--ease, ease)";
        sliderFill.style.transition = "width .25s var(--ease, ease)";
        setThumbX(maxX);
        setTimeout(openInvitation, 220);
    }

    sliderTrack.addEventListener("pointerdown", (e) => {
        if (opened || (e.button !== undefined && e.button !== 0)) return;
        computeMaxX();
        dragging = true;
        activePointerId = e.pointerId;
        const trackRect = sliderTrack.getBoundingClientRect();
        const thumbRect = sliderThumb.getBoundingClientRect();
        const startedOnThumb = e.target === sliderThumb || sliderThumb.contains(e.target);
        dragOffsetX = startedOnThumb ? e.clientX - thumbRect.left : sliderThumb.offsetWidth / 2;
        if (!startedOnThumb) setThumbX(e.clientX - trackRect.left - dragOffsetX - 4);
        sliderThumb.style.transition = "";
        sliderFill.style.transition = "";
        e.preventDefault();
        try { sliderTrack.setPointerCapture(e.pointerId); } catch (_) {}
    });

    sliderTrack.addEventListener("pointermove", (e) => {
        if (!dragging || e.pointerId !== activePointerId || opened) return;
        const trackRect = sliderTrack.getBoundingClientRect();
        setThumbX(e.clientX - trackRect.left - dragOffsetX - 4);
        e.preventDefault();
    });

    function finishSlide(e){
        if (!dragging || e.pointerId !== activePointerId) return;
        dragging = false;
        activePointerId = null;
        if (maxX > 0 && currentX >= maxX * 0.7){
            openAfterSlide();
        } else {
            sliderThumb.style.transition = "transform .3s var(--ease, ease)";
            sliderFill.style.transition = "width .3s var(--ease, ease)";
            setThumbX(0);
            setTimeout(() => {
                sliderThumb.style.transition = "";
                sliderFill.style.transition = "";
            }, 300);
        }
    }

    sliderTrack.addEventListener("pointerup", finishSlide);
    sliderTrack.addEventListener("pointercancel", finishSlide);

    // Fallback for older mobile browsers that do not support Pointer Events.
    if (!("PointerEvent" in window)){
        let activeTouchIdentifier = null;

        sliderTrack.addEventListener("touchstart", (e) => {
            if (opened || !e.changedTouches.length) return;
            computeMaxX();
            const touch = e.changedTouches[0];
            const trackRect = sliderTrack.getBoundingClientRect();
            const thumbRect = sliderThumb.getBoundingClientRect();
            const startedOnThumb = e.target === sliderThumb || sliderThumb.contains(e.target);
            activeTouchIdentifier = touch.identifier;
            activePointerId = `touch-${touch.identifier}`;
            dragOffsetX = startedOnThumb
                ? touch.clientX - thumbRect.left
                : sliderThumb.offsetWidth / 2;
            if (!startedOnThumb){
                setThumbX(touch.clientX - trackRect.left - dragOffsetX - 4);
            }
            dragging = true;
            sliderThumb.style.transition = "";
            sliderFill.style.transition = "";
            e.preventDefault();
        }, { passive:false });

        sliderTrack.addEventListener("touchmove", (e) => {
            if (!dragging || activeTouchIdentifier === null) return;
            const touch = Array.from(e.touches).find(item => item.identifier === activeTouchIdentifier);
            if (!touch) return;
            const trackRect = sliderTrack.getBoundingClientRect();
            setThumbX(touch.clientX - trackRect.left - dragOffsetX - 4);
            e.preventDefault();
        }, { passive:false });

        function finishTouch(e){
            if (activeTouchIdentifier === null) return;
            const ended = Array.from(e.changedTouches).some(item => item.identifier === activeTouchIdentifier);
            if (!ended) return;
            const pointerId = activePointerId;
            activeTouchIdentifier = null;
            finishSlide({ pointerId });
        }

        sliderTrack.addEventListener("touchend", finishTouch, { passive:false });
        sliderTrack.addEventListener("touchcancel", finishTouch, { passive:false });
    }

    window.addEventListener("resize", computeMaxX);
    sliderThumb.addEventListener("keydown", (e) => {
        if (!opened && ["Enter", " ", "ArrowRight"].includes(e.key)){
            e.preventDefault();
            openAfterSlide();
        }
    });
    requestAnimationFrame(computeMaxX);
}
/* ==========================================================
   FRIEND WISHES API
========================================================== */
const wishesApiUrl = "https://script.google.com/macros/s/AKfycbwVSB0vXA_L8mZMI5WSPMGIpF1dIAuaGdnMPCk3zNlpCw1anrIEEYCiTiolokBqahXm/exec";
const wishForm = document.getElementById("wishForm");
const wishList = document.getElementById("wishList");
const wishStatus = document.getElementById("wishStatus");

function renderWishes(wishes){
    if (!wishList) return;
    while (wishList.children.length > 1) wishList.removeChild(wishList.lastElementChild);
    if (!wishes.length){
        const empty = document.createElement("p");
        empty.className = "wish-empty";
        empty.textContent = "Belum ada ucapan. Jadilah yang pertama mengirim ucapan!";
        wishList.appendChild(empty);
        return;
    }
    wishes.forEach((wish) => {
        const item = document.createElement("article");
        item.className = "wish-item";
        const name = document.createElement("strong");
        name.textContent = wish.name;
        const message = document.createElement("p");
        message.textContent = wish.message;
        item.append(name, message);
        wishList.appendChild(item);
    });
}

function requestWishesApi(parameters){
    return new Promise((resolve, reject) => {
        const callbackName = "receiveFriendWishes_" + Date.now() + "_" + Math.floor(Math.random() * 10000);
        const script = document.createElement("script");
        const separator = wishesApiUrl.includes("?") ? "&" : "?";
        const query = new URLSearchParams({ ...parameters, callback:callbackName, _:String(Date.now()) });
        const timeout = setTimeout(() => finish(new Error("Waktu tunggu Apps Script habis.")), 12000);
        let completed = false;
        function finish(error, result){
            if (completed) return;
            completed = true;
            clearTimeout(timeout);
            delete window[callbackName];
            script.remove();
            if (error) reject(error);
            else resolve(result);
        }
        window[callbackName] = (result) => {
            if (!result || result.ok !== true) finish(new Error("Apps Script menolak permintaan."));
            else finish(null, result);
        };
        script.onerror = () => finish(new Error("Apps Script tidak dapat diakses."));
        script.src = wishesApiUrl + separator + query.toString();
        document.head.appendChild(script);
    });
}

async function loadFriendWishes(){
    try{
        const result = await requestWishesApi({ action:"list" });
        const wishes = Array.isArray(result.wishes) ? result.wishes : [];
        renderWishes(wishes);
        return wishes;
    } catch (error){
        if (wishStatus) wishStatus.textContent = "Ucapan belum dapat dimuat. Periksa deployment Apps Script.";
        return null;
    }
}

if (wishForm){
    wishForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (wishForm.dataset.sending === "true") return;
        const payload = {
            name:document.getElementById("wishName").value.trim(),
            message:document.getElementById("wishMessage").value.trim()
        };
        if (!payload.name || !payload.message) return;

        const submitButton = wishForm.querySelector('[type="submit"]');
        wishForm.dataset.sending = "true";
        submitButton.disabled = true;
        wishStatus.textContent = "Mengirim ucapan…";

        const frame = document.createElement("iframe");
        const frameName = "wishSubmitFrame_" + Date.now();
        frame.name = frameName;
        frame.hidden = true;
        const frameReady = new Promise((resolve) => frame.addEventListener("load", resolve, { once:true }));
        document.body.appendChild(frame);
        await frameReady;

        const transport = document.createElement("form");
        transport.method = "POST";
        transport.action = wishesApiUrl;
        transport.target = frameName;
        transport.hidden = true;
        const field = document.createElement("input");
        field.type = "hidden";
        field.name = "payload";
        field.value = JSON.stringify(payload);
        transport.appendChild(field);
        document.body.appendChild(transport);

        let completed = false;
        const finish = (message, resetForm) => {
            if (completed) return;
            completed = true;
            frame.remove();
            transport.remove();
            wishForm.dataset.sending = "false";
            submitButton.disabled = false;
            if (resetForm) wishForm.reset();
            wishStatus.textContent = message;
        };

        frame.addEventListener("load", async () => {
            const wishes = await loadFriendWishes();
            const wasSaved = wishes && wishes.some(wish => wish.name === payload.name && wish.message === payload.message);
            if (wasSaved){
                finish("Terima kasih, ucapan Anda sudah tersimpan.", true);
            } else {
                finish("Ucapan belum tersimpan. Pastikan doGet dan doPost sudah ada di deployment Apps Script.", false);
            }
        }, { once:true });
        transport.submit();
        setTimeout(() => finish("Pengiriman belum terkonfirmasi. Periksa deployment Apps Script lalu coba lagi.", false), 20000);
    });
}

loadFriendWishes();