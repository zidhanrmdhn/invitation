AOS.init({
    duration: 1200,
    once: true,
    easing: "ease-in-out"
});
const petals = document.querySelector(".petals");

function createPetal(){

    const petal = document.createElement("div");

    petal.classList.add("petal");

    // Emoji bunga
   const flowers = ["💍","🌙","🌻","⭐","✨"];

petal.innerHTML =
flowers[Math.floor(Math.random()*flowers.length)];

    petal.style.left = Math.random()*100 + "vw";

    petal.style.fontSize =
        (15 + Math.random()*20) + "px";

    petal.style.animationDuration =
        (5 + Math.random()*5) + "s";

    petal.style.opacity = Math.random();

    petals.appendChild(petal);

    setTimeout(()=>{
        petal.remove();
    },10000);

}
setInterval(createPetal,300);
// Tanggal Pernikahan
const weddingDate = new Date("2026-12-12T09:00:00").getTime();

function updateCountdown(){

    const now = new Date().getTime();

    const distance = weddingDate - now;

    if(distance <= 0){

        document.querySelector(".countdown").innerHTML =
        "<h2>🎉 Selamat Menempuh Hidup Baru 🎉</h2>";

        return;
    }

    const days = Math.floor(distance / (1000*60*60*24));

    const hours = Math.floor(
        (distance % (1000*60*60*24))
        /(1000*60*60)
    );

    const minutes = Math.floor(
        (distance % (1000*60*60))
        /(1000*60)
    );

    const seconds = Math.floor(
        (distance % (1000*60))
        /1000
    );

    document.getElementById("days").innerHTML =
        String(days).padStart(2,"0");

    document.getElementById("hours").innerHTML =
        String(hours).padStart(2,"0");

    document.getElementById("minutes").innerHTML =
        String(minutes).padStart(2,"0");

    document.getElementById("seconds").innerHTML =
        String(seconds).padStart(2,"0");
}

updateCountdown();
setInterval(updateCountdown,1000);
// Mengambil parameter dari URL
const params = new URLSearchParams(window.location.search);

const guest = params.get("to");

if(guest){

    document.getElementById("guestName").innerHTML =
        decodeURIComponent(guest);

}else{

    document.getElementById("guestName").innerHTML =
        "Tamu Undangan";

}
const lightbox = document.getElementById("lightbox");

const lightboxImg = document.getElementById("lightbox-img");

function openLightbox(src){

    lightbox.style.display="flex";

    lightboxImg.src=src;

}

function closeLightbox(){

    lightbox.style.display="none";

}
lightbox.addEventListener("click",function(e){

    if(e.target===lightbox){

        closeLightbox();

    }

});
function copyText(text){

    navigator.clipboard.writeText(text);

    alert("Nomor rekening berhasil disalin.");

}
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

let isPlaying = false;

musicBtn.addEventListener("click", function(){

    if(isPlaying){
        music.pause();
        musicBtn.innerHTML = "▶";
    }else{
        music.play();
        musicBtn.innerHTML = "⏸";
    }

    isPlaying = !isPlaying;

});
async function openInvitation(){

    document.querySelector("#mempelai").scrollIntoView({
        behavior:"smooth"
    });

    try{

        await music.play();

        musicBtn.classList.add("playing");

        musicIcon.innerHTML = "⏸";

        isPlaying = true;

    }catch(err){

        console.log(err);

    }
}
async function openInvitation() {
    try {
        await music.play();
        isPlaying = true;
    } catch (err) {
        console.log(err);
    }
}