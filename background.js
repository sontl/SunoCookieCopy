let hasIntercepted = false;

chrome.declarativeNetRequest.onRuleMatchedDebug.addListener((info) => {
  if (info.request.url.includes('clerk.suno.com/v1/client')) {
    console.log('Intercepting request:', info.request);
    chrome.cookies.getAll({ url: 'https://clerk.suno.com' }, (cookies) => {
      let cookieString = cookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ');
      console.log('Intercepted Cookie:', cookieString);
      
      // Add timestamp to the stored data
      const timestamp = new Date().toISOString();
      chrome.storage.local.set({ 
        interceptedCookie: cookieString,
        lastInterceptTime: timestamp
      });
      
      console.log('Cookie updated at:', timestamp);
      hasIntercepted = true;
    });
  }
});

function setupRule() {
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [1],
    addRules: [{
      id: 1,
      priority: 1,
      action: { type: 'allow' },
      condition: {
        urlFilter: 'https://clerk.suno.com/v1/client*',
        resourceTypes: ['xmlhttprequest']
      }
    }]
  });
}

// Set up the rule initially
setupRule();

// Reset the interception when the tab is updated
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'loading' && tab.url.includes('suno.com')) {
    hasIntercepted = false;
    setupRule();
  }
});

// Listen for when the extension is installed or updated
chrome.runtime.onInstalled.addListener(() => {
  hasIntercepted = false;
  setupRule();
});
