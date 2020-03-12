chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        const message = request.content?.length > 0
            ? request.content[0] : '';
        if (message){
            updateFrameContent(message);
            chrome.runtime.sendMessage({populated:true});
        }
    });

let updateFrameContent = (message) => {
    var content = document.getElementById('content');
    if(content.firstChild){
        content.removeChild(content.firstChild);
    }
    content.appendChild(document.createTextNode(message));
}