const wheel = document.getElementById("wheel");
const result = document.getElementById("result");

let rotation = 0;
let spinning = false;

const DEMO_PRIZE = "5 SOL";


/* =========================
   КОЛЕСО
========================= */

function spin() {
    if (spinning) return;

    spinning = true;

    if (result) {
        result.textContent = "पहिया घूम रहा है...";
    }

    rotation += 2160;

    if (wheel) {
        wheel.style.transition =
            "transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)";

        wheel.style.transform = `rotate(${rotation}deg)`;
    }

    setTimeout(() => {

        if (result) {
            result.innerHTML = `
                🎉 बधाई! आपने <strong>${DEMO_PRIZE}</strong> जीते!
            `;
        }

        spinning = false;

        /*
         * ВАЖНО:
         * Здесь больше НЕТ openModal().
         *
         * После выигрыша никакое окно
         * автоматически не открывается.
         */

    }, 4000);
}


/* =========================
   МОДАЛЬНОЕ ОКНО
   Открывается только если
   пользователь сам нажмёт
   кнопку onclick="openModal()"
========================= */

function openModal() {
    const modal = document.getElementById("walletModal");

    if (modal) {
        modal.style.display = "flex";
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }
}


function closeModal() {
    const modal = document.getElementById("walletModal");

    if (modal) {
        modal.style.display = "none";
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }
}


function closeWalletModal() {
    closeModal();
}


/* =========================
   WALLET CHOOSER
========================= */

function openWalletChooser() {
    const chooser = document.getElementById("walletChooser");

    if (chooser) {
        chooser.style.display = "flex";
        chooser.setAttribute("aria-hidden", "false");
    }
}


function closeWalletChooser() {
    const chooser = document.getElementById("walletChooser");

    if (chooser) {
        chooser.style.display = "none";
        chooser.setAttribute("aria-hidden", "true");
    }
}


/* =========================
   ВЫБОР КОШЕЛЬКА 
========================= */

function connectSelectedWallet(walletName) {

    const status =
        document.getElementById("walletChooserStatus");

    if (status) {
        status.innerHTML = `
            <strong>${walletName}</strong><br>
            डेमो मोड में चुना गया।
        `;
    }
}


/* =========================
   КНОПКА "ВАЛЕТ КОННЕКТ"
========================= */

function connectWallet() {
    openWalletChooser();
}


/* =========================
   КЛИК ПО ФОНУ
========================= */

document.addEventListener("click", function(event) {

    const modal = document.getElementById("walletModal");

    if (modal && event.target === modal) {
        closeModal();
    }

});


/* =========================
   ПРОКРУТКА К КОЛЕСУ
========================= */

function scrollToWheel() {

    const wheelArea =
        document.getElementById("wheelArea");

    if (wheelArea) {
        wheelArea.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }
}