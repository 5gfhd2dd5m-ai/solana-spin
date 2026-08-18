const wheel = document.getElementById("wheel");
const result = document.getElementById("result");

let rotation = 0;
let spinning = false;

const DEMO_PRIZE = "5 SOL";


/* =========================
   ПРОКРУТКА К КОЛЕСУ
========================= */

function scrollToWheel() {
    const wheelArea = document.getElementById("wheelArea");

    if (wheelArea) {
        wheelArea.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }
}


/* =========================
   ВРАЩЕНИЕ КОЛЕСА
========================= */

function spin() {
    if (spinning) return;

    if (!wheel) {
        console.error("Элемент #wheel не найден");
        return;
    }

    spinning = true;

    if (result) {
        result.textContent = "पहिया घूम रहा है...";
    }

    rotation += 2160;

    wheel.style.transition =
        "transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)";

    wheel.style.transform =
        `rotate(${rotation}deg)`;

    setTimeout(function () {

        if (result) {
            result.innerHTML =
                `🎉 बधाई! आपने <strong>${DEMO_PRIZE}</strong> जीते!`;
        }

        spinning = false;

        setTimeout(function () {
            openModal();
        }, 500);

    }, 4000);
}


/* =========================
   ОКНО КОШЕЛЬКА
========================= */

function openModal() {
    const modal = document.getElementById("walletModal");

    if (!modal) return;

    modal.style.display = "flex";
    modal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";
}


function closeModal() {
    closeWalletModal();
}


function closeWalletModal() {
    const modal = document.getElementById("walletModal");

    if (!modal) return;

    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";
}


/* =========================
   ОКНО ПОБЕДЫ
========================= */

function openPrizeModal() {
    const modal = document.getElementById("prizeModal");

    if (!modal) return;

    modal.style.display = "flex";
    modal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";
}


function closePrizeModal() {
    const modal = document.getElementById("prizeModal");

    if (!modal) return;

    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";
}


/* =========================
   ВЫБОР КОШЕЛЬКА
========================= */

function openWalletChooser() {
    const chooser = document.getElementById("walletChooser");

    if (!chooser) return;

    chooser.style.display = "flex";
    chooser.setAttribute("aria-hidden", "false");
}


function closeWalletChooser() {
    const chooser = document.getElementById("walletChooser");

    if (!chooser) return;

    chooser.style.display = "none";
    chooser.setAttribute("aria-hidden", "true");
}


/* =========================
   ВЫБРАННЫЙ КОШЕЛЁК
========================= */

function connectSelectedWallet(walletName) {

    const status =
        document.getElementById("walletChooserStatus");

    if (status) {
        status.innerHTML =
            `<strong>${walletName}</strong><br>
             Демо: подключение имитируется.`;
    }

    setTimeout(function () {
        closeWalletChooser();

        const walletStatus =
            document.getElementById("walletStatus");

        if (walletStatus) {
            walletStatus.innerHTML =
                `✓ Выбран кошелёк: <strong>${walletName}</strong>`;
        }
    }, 800);
}


/* =========================
   ЗАКРЫТИЕ ПО ESC
========================= */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {
        closePrizeModal();
        closeWalletModal();
        closeWalletChooser();
    }

});