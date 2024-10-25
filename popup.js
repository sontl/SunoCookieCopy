document.addEventListener('DOMContentLoaded', function() {
  // Display the intercepted cookie and last update time if available
  updateCookieDisplay();
});

document.getElementById('copyCookie').addEventListener('click', async () => {
  try {
    let cookieString = await getCookieString();

    // Copy to clipboard
    await navigator.clipboard.writeText(cookieString);

    // Show success message
    const status = document.getElementById('status');
    status.style.display = 'block';
    setTimeout(() => {
      status.style.display = 'none';
    }, 2000);

    // Update the displayed cookie
    updateCookieDisplay();
  } catch (error) {
    console.error('Error:', error);
  }
});

function updateCookieDisplay() {
  chrome.storage.local.get(['interceptedCookie', 'lastInterceptTime'], function(result) {
    const cookieValue = document.getElementById('cookieValue');
    const lastUpdateTime = document.getElementById('lastUpdateTime');
    
    if (result.interceptedCookie) {
      cookieValue.textContent = `Cookie: ${result.interceptedCookie}`;
      if (result.lastInterceptTime) {
        const formattedTime = new Date(result.lastInterceptTime).toLocaleString();
        lastUpdateTime.textContent = `Last updated: ${formattedTime}`;
      } else {
        lastUpdateTime.textContent = 'Last updated: Unknown';
      }
    } else {
      cookieValue.textContent = 'No cookie intercepted yet.';
      lastUpdateTime.textContent = '';
    }
  });
}

async function getCookieString() {
  // Try to get the intercepted cookie
  const result = await chrome.storage.local.get(['interceptedCookie']);
  if (result.interceptedCookie) {
    return result.interceptedCookie;
  }

  // If no intercepted cookie, fall back to the original method
  const cookies = await chrome.cookies.getAll({
    domain: "suno.com"
  });
  const gaCookie = cookies.find(cookie => cookie.name === '_ga');
  const cfCookie = cookies.find(cookie => cookie.name === '_cf_bm');

  return `_ga=${gaCookie?.value}; _cf_bm=${cfCookie?.value}`;
}
