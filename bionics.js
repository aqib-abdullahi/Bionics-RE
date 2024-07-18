document.addEventListener('DOMContentLoaded', function() {
    console.log('Bionics RE extension loaded');
    document.querySelector('.activate').addEventListener('click', function() {
        console.log('clicked');
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                // target: { tabId: getTabId() },
                files: ['content.js']
            });
        });
    });

    document.querySelector('.deactivate').addEventListener('click', function() {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                // target: { tabId: getTabId() },
                func: () => {
                    const editedElements = document.querySelectorAll('.edited');
                    editedElements.forEach(element => {
                        element.classList.remove('edited');
                    });
                }
            });
        });
    });
});