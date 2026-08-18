const wheel = document.getElementById("wheel");
const result = document.getElementById("result");

let rotation = 0;
let spinning = false;

// Для демо результат всегда одинаковый
const DEMO_PRIZE = "5 SOL";

function spin() {
  if (spinning) return;

  spinning = true;

  if (result) {
    result.textContent = "पहिया घूम रहा है…";
  }

  // Каждый раз крутим колесо на 6 полных оборотов
  rotation += 2160;

  if (wheel) {
    wheel.style.transform = `rotate(${rotation}deg)`;
  }

  setTimeout(() => {
    if (result) {
      result.innerHTML = `
        🎉 बधाई! आपने <strong>${DEMO_PRIZE}</strong> जीता!
        <br>
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


// Кнопка «अभी स्पिन करें»
function scrollToWheel() {
  const wheelArea = document.getElementById("wheelArea");

  if (wheelArea) {
    wheelArea.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }

  setTimeout(spin, 500);
}


// Открытие окна
function openModal() {
  const modal = document.getElementById("walletModal");

  if (modal) {
    modal.classList.add("show");
  }
}


// Закрытие окна
function closeWalletModal() {
  const modal = document.getElementById("walletModal");

  if (modal) {
    modal.classList.remove("show");
  }
}


// Подключение Phantom
async function connectWallet() {
  const status = document.getElementById("walletStatus");

  try {
    if (!window.solana || !window.solana.isPhantom) {
      if (status) {
        status.textContent =
          "Phantom Wallet उपलब्ध नहीं है।";
      }
      return;
    }

    const response = await window.solana.connect();

    const address = response.publicKey.toString();

    if (status) {
      status.innerHTML = `
        <div class="wallet-connected">
          वॉलेट कनेक्ट हो गया ✅
          <br>
          <small>${address.slice(0, 6)}...${address.slice(-4)}</small>
        </div>
      `;
    }

  } catch (error) {
    console.error(error);

    if (status) {
      status.textContent =
        "वॉलेट कनेक्ट नहीं हो सका।";
    }
  }
}