function getArticleText() {
    function textNodesUnder(node){
      var all = [];
      for (node=node.firstChild;node;node=node.nextSibling){
        if (node.nodeType==3) all.push(node);
        else all = all.concat(textNodesUnder(node));
      }
      return all;
    }
    let textNodes = textNodesUnder(document);
    textNodes = textNodes.filter(t => t.parentElement.tagName !== 'STYLE' && t.parentElement.tagName !== 'SCRIPT' && window.getComputedStyle(t.parentElement, null).getPropertyValue('visibility') === 'visible');

    let textByStyle = {};
    for (let i = 0; i < textNodes.length; i++) {
        let style = window.getComputedStyle(textNodes[i].parentElement, null).getPropertyValue('font-size') + window.getComputedStyle(textNodes[i].parentElement, null).getPropertyValue('font-family') + window.getComputedStyle(textNodes[i].parentElement, null).getPropertyValue('font-weight');
        if (!textByStyle[style]) {
    		textByStyle[style] = '';
        }
        textByStyle[style] = textByStyle[style].trim() + ' ' + textNodes[i].textContent.trim();
    }

    let maxLength = -1;
    let bestText = '';

    for (let style of Object.keys(textByStyle)) {
        let length = textByStyle[style].length;
        if (length > maxLength) {
            maxLength = length;
            bestText = textByStyle[style];
        }
    }

    return bestText;
}
