const wheel = document.getElementById("wheel");
const result = document.getElementById("result");

let rotation = 0;
let spinning = false;


/*
  ДЕМО-РЕЗУЛЬТАТ

  Для демонстрации результат всегда одинаковый.
*/
const DEMO_PRIZE = "1 SOL";


/* SPIN */

function spin() {

  if (spinning) {
    return;
  }

  spinning = true;


  if (result) {
    result.textContent = "पहिया घूम रहा है…";
  }


  /*
    6 полных оборотов.
    Результат демо при этом всегда 1 SOL.
  */

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


/* SCROLL */

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


/* WIN MODAL */

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


/* WALLET MODAL */

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


/* PHANTOM */

async function connectWallet() {

  const status =
    document.getElementById("walletStatus");


  try {

    if (
      !window.solana ||
      !window.solana.isPhantom
    ) {

      if (status) {

        status.textContent =
          "Phantom Wallet उपलब्ध नहीं है।";
      }

      return;
    }


    const response =
      await window.solana.connect();


    const address =
      response.publicKey.toString();


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

    console.error(error);


    if (status) {

      status.textContent =
        "वॉलेट कनेक्ट नहीं हो सका।";

    }

  }

}


/* ESC KEY */

document.addEventListener(
  "keydown",
  function(event) {

    if (event.key === "Escape") {

      closePrizeModal();

      closeWalletModal();

    }

  }
);