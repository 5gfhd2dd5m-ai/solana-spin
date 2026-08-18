const wheel = document.getElementById("wheel");
const result = document.getElementById("result");

let rotation = 0;
let spinning = false;

const DEMO_PRIZE = "5 SOL";

function spin() {
    if (spinning) return;

    spinning = true;

    if (result) {
        result.textContent = "पहिया घूम रहा है...";
    }

    /*
     * ДЕМО:
     * Результат всегда 5 SOL.
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
                🎉 बधाई! आपने <strong>${DEMO_PRIZE}</strong> जीते!
            `;
        }

        spinning = false;

        // Показываем демо-окно после остановки
        setTimeout(() => {
            openModal();
        }, 500);

    }, 4000);
}


/* =========================
   ДЕМО-ОКНО
========================= */

function openModal() {
    const modal = document.getElementById("walletModal");

    if (modal) {
        modal.style.display = "flex";
        document.body.style.overflow = "hidden";
    }
}


function closeModal() {
    const modal = document.getElementById("walletModal");

    if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = "";
    }
}


/* Закрытие по клику вне окна */
document.addEventListener("click", function(event) {
    const modal = document.getElementById("walletModal");

    if (modal && event.target === modal) {
        closeModal();
    }
});