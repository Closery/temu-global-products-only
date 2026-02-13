// Temu Global Products Only - Popup Script

document.addEventListener('DOMContentLoaded', function () {
  const filterToggle = document.getElementById('filterToggle');
  const statusIndicator = document.getElementById('statusIndicator');
  const statusText = document.getElementById('statusText');

  // Load current status
  chrome.storage.sync.get(['enabled'], function (result) {
    const isEnabled = result.enabled !== undefined ? result.enabled : true;
    filterToggle.checked = isEnabled;
    updateStatus(isEnabled);
  });

  // Listen for toggle changes
  filterToggle.addEventListener('change', function () {
    const isEnabled = this.checked;

    // Persist to chrome.storage (sync)
    chrome.storage.sync.set({ enabled: isEnabled }, function () {
      console.log('Filter status saved to chrome.storage:', isEnabled);
      updateStatus(isEnabled);

      // Write to localStorage in all Temu tabs and reload them
      chrome.tabs.query({ url: '*://*.temu.com/*' }, function (tabs) {
        tabs.forEach(tab => {
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: function (enabled) {
              localStorage.setItem('temuFilterEnabled', enabled.toString());
              console.log('[Temu Filter] localStorage updated:', enabled);
              // Reload the page
              location.reload();
            },
            args: [isEnabled]
          });
        });
      });
    });
  });

  function updateStatus(isEnabled) {
    if (isEnabled) {
      statusIndicator.className = 'status-indicator active';
      statusText.textContent = 'Aktif';
    } else {
      statusIndicator.className = 'status-indicator inactive';
      statusText.textContent = 'Pasif';
    }
  }
});

