document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const method = urlParams.get('method');

  const cardUI = document.getElementById('card-ui');
  const paypalUI = document.getElementById('paypal-ui');
  const btnSubmit = document.getElementById('btn-submit');
  const btnBack = document.getElementById('btn-back'); // Ambil tombol back

  // Logika tombol back
  btnBack.addEventListener('click', () => {
    window.location.href = 'paywall.html';
  });

  if (method === 'paypal') {
    paypalUI.classList.add('active');
    btnSubmit.innerText = 'Continue with PayPal';
    btnSubmit.style.backgroundColor = '#ffc439';
    btnSubmit.style.color = '#003087';
  } else {
    cardUI.classList.add('active');
  }

  btnSubmit.addEventListener('click', () => {
    btnSubmit.innerHTML = `
      <svg class="spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle opacity="0.25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path opacity="0.75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Processing...
    `;
    btnSubmit.disabled = true;
    btnSubmit.style.opacity = '0.7';

    setTimeout(() => {
      alert("DECLINED: Insufficient Funds or Demo Mode Active.");
      window.location.href = 'paywall.html';
    }, 2500);
  });
});