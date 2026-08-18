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
    result.textContent = "पहिया घूम रहा है…";
  }

  /*
    Визуальное демо.
    Результат всегда 5 SOL.
    Реальной выплаты здесь нет.
  */

  rotation += 2160;

  if (wheel) {
    wheel.style.transform = `rotate(${rotation}deg)`;
  }

  setTimeout(() => {
    if (result) {
      result.innerHTML = `
        🎉 बधाई! आपने
        <strong>${DEMO_PRIZE}</strong>
        जीता!
        <br>

        <small style="
          display:block;
          margin-top:7px;
          font-size:11px;
          color:#8a7465;
        ">
          DEMO — वास्तविक SOL भुगतान नहीं किया जाता।
        </small>

        <button
          class="claim-btn"
          onclick="openWalletChooser()"
        >
          वॉलेट कनेक्ट करें →
        </button>
      `;
    }

    spinning = false;

    /*
      Сразу после выигрыша открываем
      окно выбора кошелька.
    */
    setTimeout(() => {
      openWalletChooser();
    }, 500);

  }, 4700);
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
   WALLET CHOOSER
========================= */

function openWalletChooser() {
  const modal = document.getElementById("walletChooser");

  if (!modal) return;

  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
}


function closeWalletChooser() {
  const modal = document.getElementById("walletChooser");

  if (!modal) return;

  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
}


/* =========================
   WALLET CONNECTION
========================= */

async function connectSelectedWallet(walletName) {

  const status =
    document.getElementById("walletChooserStatus");

  if (status) {
    status.textContent =
      `${walletName} से कनेक्ट हो रहा है…`;
  }

  try {

    /*
      Phantom
    */

    if (
      walletName === "Phantom" &&
      window.solana &&
      window.solana.isPhantom
    ) {

      const response =
        await window.solana.connect();

      showConnected(
        response.publicKey.toString(),
        walletName
      );

      return;
    }


    /*
      Solflare
    */

    if (
      walletName === "Solflare" &&
      window.solflare
    ) {

      const response =
        await window.solflare.connect();

      const publicKey =
        response.publicKey ||
        window.solflare.publicKey;

      showConnected(
        publicKey.toString(),
        walletName
      );

      return;
    }


    /*
      Другие кошельки:
      если они установлены через Wallet Standard,
      пробуем найти их через window.navigator.wallets.
    */

    const wallets =
      window.navigator.wallets?.get?.();

    if (wallets && wallets.length) {

      const wallet =
        wallets.find((item) =>
          item.name
            ?.toLowerCase()
            .includes(walletName.toLowerCase())
        );

      if (wallet) {

        const accounts =
          await wallet.features[
            "standard:connect"
          ].connect();

        if (
          accounts &&
          accounts.accounts &&
          accounts.accounts.length
        ) {

          showConnected(
            accounts.accounts[0].address,
            walletName
          );

          return;
        }
      }
    }


    if (status) {
      status.innerHTML = `
        <div class="wallet-error">
          ${walletName} अभी उपलब्ध नहीं है।
          <br>
          कृपया यह wallet अपने डिवाइस पर खोलें।
        </div>
      `;
    }

  } catch (error) {

    console.error(error);

    if (status) {
      status.textContent =
        "वॉलेट कनेक्शन रद्द या असफल हुआ।";
    }
  }
}


/* =========================
   CONNECTED
========================= */

function showConnected(address, walletName) {

  const status =
    document.getElementById("walletChooserStatus");

  if (!status) return;

  status.innerHTML = `
    <div class="wallet-connected">
      ✅ ${walletName} कनेक्ट हो गया
      <br>

      <small>
        ${address.slice(0, 6)}
        ...
        ${address.slice(-4)}
      </small>

      <br>

      <small style="
        color:#8a7465;
        font-weight:400;
      ">
        DEMO — कोई SOL ट्रांसफर नहीं किया गया।
      </small>
    </div>
  `;
}


/* =========================
   ESC
========================= */

document.addEventListener("keydown", (event) => {

  if (event.key === "Escape") {
    closeWalletChooser();
  }

});