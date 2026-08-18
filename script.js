const wheel = document.getElementById("wheel");
const result = document.getElementById("result");

let rotation = 0;
let spinning = false;

// Результат демо всегда 5 SOL
const DEMO_PRIZE = "5 SOL";


/* =========================
   SPIN
========================= */

function spin() {

  if (spinning) {
    return;
  }

  spinning = true;

  if (result) {
    result.textContent = "पहिया घूम रहा है…";
  }

  // 6 полных оборотов
  rotation += 2160;

  if (wheel) {
    wheel.style.transform =
      `rotate(${rotation}deg)`;
  }

  setTimeout(() => {

    if (result) {

      result.innerHTML = `
        🎉 बधाई! आपने
        <strong>${DEMO_PRIZE}</strong>
        जीता!
        <br><br>

        <button
          class="claim-btn"
          onclick="openModal()"
        >
          प्राप्त करें SOL →
        </button>
      `;
    }

    spinning = false;

  }, 4700);
}


/* =========================
   SCROLL TO WHEEL
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


/* =========================
   PRIZE MODAL
========================= */

function openPrizeModal() {

  const modal =
    document.getElementById("prizeModal");

  if (modal) {

    modal.classList.add("show");

    modal.setAttribute(
      "aria-hidden",
      "false"
    );

  }
}


function closePrizeModal() {

  const modal =
    document.getElementById("prizeModal");

  if (modal) {

    modal.classList.remove("show");

    modal.setAttribute(
      "aria-hidden",
      "true"
    );

  }
}


/* =========================
   WALLET MODAL
========================= */

function openModal() {

  const modal =
    document.getElementById("walletModal");

  const amount =
    document.getElementById("prizeAmount");

  if (amount) {
    amount.textContent = DEMO_PRIZE;
  }

  if (modal) {

    modal.classList.add("show");

    modal.setAttribute(
      "aria-hidden",
      "false"
    );

  }
}


function closeWalletModal() {

  const modal =
    document.getElementById("walletModal");

  if (modal) {

    modal.classList.remove("show");

    modal.setAttribute(
      "aria-hidden",
      "true"
    );

  }
}


/* =========================
   PHANTOM WALLET
========================= */

async function connectWallet() {

  const status =
    document.getElementById("walletStatus");

  try {

    // Ищем Phantom
    const provider =
      window.phantom?.solana ||
      window.solana;

    // Phantom не найден
    if (!provider || !provider.isPhantom) {

      if (status) {

        status.innerHTML = `
          <div>
            Phantom Wallet не найден.
            <br><br>
            Открой этот сайт через приложение
            Phantom и нажми кнопку подключения ещё раз.
          </div>
        `;

      }

      return;
    }


    // Показываем статус
    if (status) {
      status.textContent =
        "Подключение кошелька…";
    }


    // Подключение Phantom
    const response =
      await provider.connect();


    // Получаем публичный адрес
    const address =
      response.publicKey.toString();


    // Показываем подключённый кошелёк
    if (status) {

      status.innerHTML = `
        <div class="wallet-connected">

          वॉलेट कनेक्ट हो गया ✅

          <br>

          <small>
            ${address.slice(0, 6)}
            ...
            ${address.slice(-4)}
          </small>

        </div>
      `;

    }

  } catch (error) {

    console.error(
      "Wallet connection error:",
      error
    );

    if (status) {

      status.textContent =
        "Подключение отменено или не удалось.";

    }

  }
}


/* =========================
   ESC — CLOSE MODALS
========================= */

document.addEventListener(
  "keydown",
  function(event) {

    if (event.key === "Escape") {

      closePrizeModal();

      closeWalletModal();

    }

  }
);