javascript:(function () {

  function getArticleText() {
    function textNodesUnder(node) {
      var all = [];
      for (node = node.firstChild; node; node = node.nextSibling) {
        if (node.nodeType == 3) all.push(node);
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

  let textToSummarize = getArticleText();


/*  submitFORM(serverUrl, 'POST',
    {'text': textToSummarize});

  function submitFORM(path, params, method) {
    method = method || "post";

    let form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    //Move the submit function to another variable
    //so that it doesn't get overwritten.
    form._submit_function_ = form.submit;

    for (var key in params) {
      if (params.hasOwnProperty(key)) {
        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", key);
        hiddenField.setAttribute("value", params[key]);

        form.appendChild(hiddenField);
      }
    }

    document.body.appendChild(form);
    form._submit_function_();
  }*/

  const serverUrl = "http://127.0.0.1:8000/summarize";

  var request = new XMLHttpRequest();
  request.open("GET", serverUrl+'?text='+textToSummarize, true);
  request.onreadystatechange = function () {
    var done = 4, ok = 200;
    if (request.readyState == done && request.status == ok) {
      if (request.responseText) {
        alert(request.responseText);
      }
    }
  };
  console.log(textToSummarize);
  request.send();
})();
