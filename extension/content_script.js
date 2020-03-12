chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.contentPopulated) {
            displayModal();
        }
    });

let displayModal = () =>{
    let frame = document.getElementById('note-frame');
    frame.style.display = 'block';
}


let createModal = (text) => {
    let frame = document.createElement('iframe');

    frame.setAttribute('frameborder', '0');
    frame.setAttribute('style', 'display:none; height: 250px; margin: 0px; padding: 0px; position: fixed; right: 5px; top: 5px; width: 500px; z-index: 2147483647;');
    frame.setAttribute('id', 'note-frame');
    frame.setAttribute('src', chrome.extension.getURL('add_note.html'));
    document.body.appendChild(frame);
}

createModal();