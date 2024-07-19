document.addEventListener('DOMContentLoaded', function() {

    const toggleSwitch = document.getElementById('toggleSwitch');

    toggleSwitch.addEventListener('change', function() {
        const isActive = toggleSwitch.checked;

        console.log('switch:', isActive);

        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            const activeTabId = tabs[0].id;
            if (isActive) {
                chrome.scripting.executeScript({
                    target: { tabId: activeTabId },
                    files: ['content.js']
                }, () => {
                    if (chrome.runtime.lastError) {
                        console.error(chrome.runtime.lastError);
                    } else {
                        console.log('content script executed');
                    }
                });
            } else {
                chrome.scripting.executeScript({
                    target: { tabId: activeTabId },
                    function: () => {
                        const editedElements = document.querySelectorAll('.edited');
                        editedElements.forEach(element => {
                            element.classList.remove('edited');
                        });
                    }
                }, () => {
                    if (chrome.runtime.lastError) {
                        console.error(chrome.runtime.lastError);
                    } else {
                        console.log('removal script executed');
                    }
                });
            }
        });
    });
});