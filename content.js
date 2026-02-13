// Runs in the MAIN world (page context)
(function () {
  console.log("[Temu Filter] 🚀 Script loaded in MAIN world");

  // Read filter status from localStorage
  function isFilterEnabled() {
    try {
      const enabled = localStorage.getItem('temuFilterEnabled');
      // First run: default to true
      if (enabled === null) {
        localStorage.setItem('temuFilterEnabled', 'true');
        return true;
      }
      return enabled === 'true';
    } catch (e) {
      return true;
    }
  }

  function handleSSR() {
    // Pages where we do SSR-handling
    const ssrHandlingPages = [
      'search_result.html',
      // Can be added later:
      // '/category',
      // '/products',
      // 'listing.html'
    ];

    // Check whether current page is in the handled list
    const isHandledPage = ssrHandlingPages.some(page =>
      window.location.pathname.includes(page) ||
      window.location.search.includes(page)
    );

    if (!isHandledPage) {
      console.log("[Temu Filter] ℹ️ Not a handled page, skipping SSR handling");
      return;
    }

    console.log("[Temu Filter] 🔄 Handled page detected, will trigger search after page loads...");

    window.addEventListener('DOMContentLoaded', function () {
      console.log("[Temu Filter] 🔍 Page loaded");

      showFilterPopup();

      // Find the search input and simulate Enter
      setTimeout(() => {
        const searchInput = document.getElementById('searchInput');

        if (searchInput) {
          console.log("[Temu Filter] 🎯 Found search input, triggering search...");

          // Simulate Enter keypress
          const enterEvent = new KeyboardEvent('keydown', {
            key: 'Enter',
            code: 'Enter',
            keyCode: 13,
            which: 13,
            bubbles: true,
            cancelable: true
          });

          searchInput.dispatchEvent(enterEvent);

          console.log("[Temu Filter] ✅ Search triggered");
          console.log("[Temu Filter] ⏳ Waiting for filtered results...");
        } else {
          console.log("[Temu Filter] ⚠️ Search input not found");
          // If input isn't found, close the popup
          hideFilterPopup();
        }
      }, 1000); // 1s after DOM is ready
    });
  }

  let filterEnabled = isFilterEnabled();
  console.log("[Temu Filter] Filter status:", filterEnabled);

  // Global popup reference
  let filterPopup = null;

  // Show popup
  function showFilterPopup() {
    if (filterPopup) return; // Don't add twice

    filterPopup = document.createElement('div');
    filterPopup.id = 'temu-filter-popup';
    filterPopup.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(8px);
      z-index: 999999;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: fadeIn 0.3s ease-in-out;
    `;

    filterPopup.innerHTML = `
      <div style="
        background: white;
        padding: 40px 50px;
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 25px;
        animation: slideIn 0.4s ease-out;
      ">
        <div style="
          width: 70px;
          height: 70px;
          border: 6px solid #f3f3f3;
          border-top: 6px solid #fa7803;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        "></div>
        <div style="
          color: #333;
          font-size: 20px;
          font-weight: 600;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        ">Loading Global Products Only</div>
        <div style="
          color: #666;
          font-size: 14px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        ">Filtering local products...</div>
      </div>
      <style>
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        @keyframes slideIn {
          from { transform: translateY(-30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      </style>
    `;

    document.body.appendChild(filterPopup);
    console.log("[Temu Filter] 🎨 Popup modal added");
  }

  // Hide popup
  function hideFilterPopup() {
    if (filterPopup && filterPopup.parentNode) {
      filterPopup.style.animation = 'fadeOut 0.3s ease-out';
      setTimeout(() => {
        if (filterPopup && filterPopup.parentNode) {
          filterPopup.remove();
          filterPopup = null;
          console.log("[Temu Filter] ✅ Popup modal closed");
        }
      }, 300);
    }
  }

  // XMLHttpRequest intercept - apply immediately
  const origOpen = XMLHttpRequest.prototype.open;
  const origSend = XMLHttpRequest.prototype.send;

  XMLHttpRequest.prototype.open = function (method, url) {
    this._url = url;
    return origOpen.apply(this, arguments);
  };

  XMLHttpRequest.prototype.send = function (body) {
    // Check current enabled status on each request
    const currentEnabled = isFilterEnabled();

    if (currentEnabled && this._url?.includes("/api/poppy/v1/search") && body) {
      console.log("[Temu Filter] 🎯 Caught search API request!");
      try {
        let data = JSON.parse(body);
        console.log("[Temu Filter] Original data:", data);

        // Force global-only results
        data.semiManaged = false;

        body = JSON.stringify(data);
        console.log("[Temu Filter] ✨ Modified data:", data);

        // Close the popup when the request completes successfully
        this.addEventListener('load', function () {
          if (this.status === 200) {
            console.log("[Temu Filter] 🎉 Filtered results loaded successfully");
            setTimeout(() => hideFilterPopup(), 500); // close after 500ms (smooth)
          }
        });

      } catch (e) {
        console.log("[Temu Filter] ⚠️ Parse error:", e);
      }
    }

    return origSend.call(this, body);
  };

  if (filterEnabled) {
    handleSSR()
  }
})();