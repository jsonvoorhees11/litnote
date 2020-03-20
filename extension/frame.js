let url = 'https://github.com';

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        const message = request.content?.length > 0
            ? request.content[0] : '';
        if (message) {
            updateFrameContent(message);
            chrome.runtime.sendMessage({ populated: true });
        }
        chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
            url = tabs[0].url;
        });
    });

let updateFrameContent = (message) => {
    var content = document.getElementById('content');
    if (content.firstChild) {
        content.removeChild(content.firstChild);
    }
    content.appendChild(document.createTextNode(message));
}


let closeButton = document.getElementById('close');
closeButton.addEventListener('click', function() {
    document.getElementById('description').value = '';
    chrome.runtime.sendMessage({ closeFrame: true });
});

let saveButton = document.getElementById('save');
saveButton.addEventListener('click', function() {
    const content = document.getElementById('content').innerHTML;
    const description = document.getElementById('description').value;
    const creator = 'jsonvoorhees11';
    const language = document.getElementById('lang').value;

    pushData('https://localhost:5001/api/notes',{content,description,creator,language,url});
    chrome.runtime.sendMessage({ closeFrame: true });
})

let pushData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return await response.json();
}