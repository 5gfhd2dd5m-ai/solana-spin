const wheel = document.getElementById("wheel");
const result = document.getElementById("result");

let rotation = 0;
let spinning = false;

const DEMO_PRIZE = "5 SOL";

/* =========================
   SPIN
========================= */

function spin() {
    if (spinning) return;

    spinning = true;

    if (result) {
        result.textContent = "पहिया घूम रहा है...";
    }

    /*
     * DEMO ONLY:
     * Колесо всегда показывает 5 SOL.
     */
    rotation += 2160;

    if (wheel) {
        wheel.style.transition =
            "transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)";

        wheel.style.transform = `rotate(${rotation}deg)`;
    }

    setTimeout(() => {
        if (result) {
            result.innerHTML = `
                🎉 बधाई! आपने <strong>${DEMO_PRIZE}</strong>
                जीते! <small>(DEMO)</small>
            `;
        }

        spinning = false;

        // После остановки открываем демо-окно
        setTimeout(() => {
            openPrizeModal();
        }, 500);

    }, 4000);
}


/* =========================
   PRIZE MODAL
========================= */

function openPrizeModal() {
    const modal = document.getElementById("prizeModal");
    const amount = document.getElementById("prizeAmount");

    if (amount) {
        amount.textContent = DEMO_PRIZE;
    }

    if (modal) {
        modal.style.display = "flex";
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }
}


function closePrizeModal() {
    const modal = document.getElementById("prizeModal");

    if (modal) {
        modal.style.display = "none";
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }
}


/* =========================
   WALLET MODAL
========================= */

function openModal() {
    closePrizeModal();

    const modal = document.getElementById("walletModal");

    if (modal) {
        modal.style.display = "flex";
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }
}


function closeWalletModal() {
    const modal = document.getElementById("walletModal");

    if (modal) {
        modal.style.display = "none";
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }
}


/* =========================
   WALLET CHOOSER
========================= */

function connectWallet() {
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
   DEMO WALLET SELECTION
========================= */

function connectSelectedWallet(walletName) {
    const status =
        document.getElementById("walletChooserStatus");

    if (status) {
        status.innerHTML = `
            <strong>${walletName}</strong><br>
            यह एक डेमो है। वास्तविक wallet connection नहीं किया गया।
        `;
    }
}


/* =========================
   SCROLL
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
   CLOSE MODALS
========================= */

document.addEventListener("click", function(event) {

    const prizeModal =
        document.getElementById("prizeModal");

    const walletModal =
        document.getElementById("walletModal");

    if (
        prizeModal &&
        event.target === prizeModal
    ) {
        closePrizeModal();
    }

    if (
        walletModal &&
        event.target === walletModal
    ) {
        closeWalletModal();
    }

});


/* =========================
   ESC KEY
========================= */

document.addEventListener("keydown", function(event) {

    if (event.key !== "Escape") return;

    closePrizeModal();
    closeWalletModal();
    closeWalletChooser();

});