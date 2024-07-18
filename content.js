function editContent(node) {
    if (node.nodeType === Node.TEXT_NODE) {
        let word = node.nodeValue.split(' ');

        word = word.map(words => {
            let half = Math.floor(words.length / 2);
            let firstHalf = words.slice(0, half);
            let secondHalf = words.slice(half);

            return `<span class="edited">${firstHalf}</span>${secondHalf}`;
        });

        let editedText = word.join(' ');

        let span = document.createElement('span');
        span.innerHTML = editedText;
        node.replaceWith(span);
    }
}

function moveInDOM(node) {
    editContent(node);
    node.childNodes.forEach(child => {
        moveInDOM(child);
    });
}
moveInDOM(document.body);