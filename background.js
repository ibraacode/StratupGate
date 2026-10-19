let isPaywallActive = false;

// Mendeteksi setiap kali ada jendela Chrome BARU yang dibuka
chrome.windows.onCreated.addListener((win) => {
  // PENTING: Abaikan kalau yang kebuka adalah jendela 'popup' (biar popup kita sendiri gak ikut ketutup)
  if (win.type === 'popup') return;

  // Kalau paywall belum aktif, kita tembak popup-nya!
  if (!isPaywallActive) {
    isPaywallActive = true; 

    chrome.windows.create({
      url: 'paywall.html',
      type: 'popup',
      width: 450,
      height: 650,
      focused: true
    }, (paywallWin) => {
      // Langsung bunuh/tutup jendela normal yang baru aja si user buka
      chrome.windows.remove(win.id);
    });
  }
});

// Mendengarkan sinyal password "ibra" yang benar
chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.action === 'unlock_chrome') {
    // Buka jendela Chrome yang normal (gak bakal keblokir lagi karena isPaywallActive masih true)
    chrome.windows.create({ focused: true }, () => {
      // Tutup jendela popup paywall-nya
      chrome.windows.remove(sender.tab.windowId);
    });
  }
});

// RESET SISTEM: Kalau SEMUA jendela Chrome benar-benar ditutup, reset paywall-nya.
// Biar pas profilnya diklik lagi nanti, dia kekunci lagi!
chrome.windows.onRemoved.addListener(() => {
  chrome.windows.getAll({}, (windows) => {
    if (windows.length === 0) {
      isPaywallActive = false;
    }
  });
});