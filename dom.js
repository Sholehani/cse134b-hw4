/* dom.js */
let numCopy = 0;
function init() {
    let element = document.getElementById('walkBtn');
    element.addEventListener('click', function () {
        walk();
    });

    element = document.getElementById('advWalkBtn');
    element.addEventListener('click', function () {
        advWalk();
    });

    element = document.getElementById('modifyBtn');
    element.addEventListener('click', function () {
        modify();
    });

    element = document.getElementById('advModifyBtn');
    element.addEventListener('click', function () {
        advModify();
    });

    element = document.getElementById('addBtn');
    element.addEventListener('click', function () {
        add();
    });

    element = document.getElementById("select-add");
    element.addEventListener('change', function() {
        changeText();
    });

    element = document.getElementById('removeBtn');
    element.addEventListener('click', function () {
        remove();
    });

    element = document.getElementById('safeRemoveBtn');
    element.addEventListener('click', function () {
        safeRemove();
    });

    element = document.getElementById('selectRemoveBtn');
    element.addEventListener('click', function () {
        selectorRemove();
    });

    element = document.getElementById('basicClone');
    element.addEventListener('click', function () {
        basicClone();
    });

    element = document.getElementById('advClone');
    element.addEventListener('click', function () {
        advClone();
    });
}

function walk() {
    let el;

    el = document.getElementById('p1');
    showNode(el);
 
    el = el.firstChild;
    showNode(el);
 
    el = el.nextSibling;
    showNode(el);
 
    el = el.lastChild;
    showNode(el);
 
    el = el.parentNode.parentNode.parentNode;
    showNode(el);
 
    el = el.querySelector('section > *');
    showNode(el);
}

function advWalk() {
    let el;
    let newText = document.querySelectorAll("textarea");

    el = document.querySelector("html");
    newText[0].value += `HTML\n`;

    el = el.childNodes;

    advWalkRe(el);
 
 }

 let count = 0;
 function advWalkRe(el){
    let newText = document.querySelectorAll("textarea");
    
    for(let node of el){
        let childSet = node.childNodes;
        
        if(node.nodeName != "#text" && node.nodeName != "#comment"){
            for(let i=0; i<count; i++){
                newText[0].value += `  `
            }

            newText[0].value += `| `;
            showAdvNode(node);
        }
        count++;
        advWalkRe(childSet);
        count--;
    }
 }

function showNode(el) {
    let nodeType = el.nodeType;
    let nodeName = el.nodeName;
    let nodeValue = el.nodeValue;

    let newText = document.querySelectorAll("textarea");
    newText[0].value += `Node type: ${nodeType}\nNode name: ${nodeName}\nNode value: ${nodeValue}\n\n`;
}

function showAdvNode(el) {
    if(el.nodeName == "#text" || el.nodeName == "#comment"){return;}
    let nodeName = el.nodeName;

    let newText = document.querySelectorAll("textarea");
    newText[0].value += `|-- ${nodeName}\n`;
}

function modify() {
    let el = document.getElementById('p1');

    // You can do all the properties one by one if you know them in HTML
    el.title = 'I was changed by JS';

    // you can also update the class list
    el.classList.add('fancy');

    // you can also update the dataset which change data-* attributes
    el.dataset.cool = 'true';       // data-cool="true"
    el.dataset.coolFactor = '9000'; //data-cool-factor="9000"

}

function advModify() {
    let pEl = document.getElementById("p1");

    if(!(pEl.classList.contains("shmancy"))){
        pEl.classList.add("shmancy");
    }
    else{
        pEl.classList.remove("shmancy")
    }

    let el = document.querySelector("h1");
    el.innerText = 'DOM Manipulation is Fun!';

    const num = Math.floor(Math.random() * 5) + 1;
    switch(num){
        case 2: 
            el.style = "color : var(--darkcolor2);" ;
            break;
        case 3: 
            el.style = "color : var(--darkcolor3);" ;
            break;
        case 4: 
            el.style = "color : var(--darkcolor4);" ;
            break;
        case 5: 
            el.style = "color : var(--darkcolor5);" ;
            break;
        case 6: 
            el.style = "color : var(--darkcolor6);" ;
            break;
        default: 
            el.style = "color : var(--darkcolor1);" ;
            break;
    }

}

function add() {
    let newElem;

    let selectVal = document.getElementById("select-add").value;
    let addText = document.getElementById("add-text").value;
    let oldP = document.getElementById('p1');

    let newDiv = document.createElement("div");
    newDiv.classList.add("added-node");

    let newDate = new Date();
    let dateText = newDate.toLocaleString();

    switch(selectVal){
        case "comment":
                newElem = document.createComment(`${addText} ${dateText}`);
                newDiv.appendChild(newElem);
                newElem = document.createTextNode(`Comment Added - ${dateText}`);
                newDiv.appendChild(newElem);
                break;
        case "text":
                newElem = document.createTextNode(`${addText} ${dateText}`);
                newDiv.appendChild(newElem);
                break;
        case "element":
                if(!(isHTML(`${addText}`))){
                    alert(`Invalid Element. Follow valid HTML format.`);
                    break;
                }
                newElem = addText;
                newDiv.insertAdjacentHTML("beforeend", newElem);
                
                newDiv.appendChild(document.createTextNode(` ${dateText}`));
                break;

        default: 
            let em, txt1, txt2, txt3;
            newElem = document.createElement('p'); // <p></p>
            em = document.createElement('em'); // <em></em>
            txt1 = document.createTextNode('This is a '); // "This is a"
            txt2 = document.createTextNode('test'); // "test"
            txt3 = document.createTextNode(' of the DOM'); // " of the DOM"
    
            newElem.appendChild(txt1); // <p>This is a</p>
            em.appendChild(txt2); // <em>test</em>
            newElem.appendChild(em); // <p>This is a<em>test</em></p>
            newElem.appendChild(txt3); // <p>This is a<em>test</em> of the DOM</p>
            newDiv.appendChild(newElem);
            break;
    }

    oldP.parentNode.insertBefore(newDiv, oldP.nextSibling);
}

function changeText(){
    let selectVal = document.getElementById("select-add").value;
    let addText = document.getElementById("add-text");

    switch(selectVal){
        case "text":
            addText.textContent = "New Text Node";
            break;
        case "comment":
            addText.textContent = "New Comment";
            break;
        case "element":
            addText.textContent = "<p>New Element</p>";
            break;
        default: 
            addText.textContent = "";
            break;
    }
}

// Source: https://stackoverflow.com/questions/15458876/check-if-a-string-is-html-or-not
function isHTML(str) {
    let a = document.createElement('div');
    a.innerHTML = str;
  
    for (var c = a.childNodes, i = c.length; i--; ) {
      if (c[i].nodeType == 1){ return true; }
    }
  
    return false;
  }

function remove() {
  document.body.removeChild(document.body.lastChild);
}

function safeRemove() {
    let bodyElem = document.querySelector("body");
  
    let childList = bodyElem.childNodes;
  
    while(childList.length > 3){
    for(let node of childList){        
        if(node.nodeName != "SECTION" && node.nodeName != "SCRIPT"){
          document.body.removeChild(node);
        }
    }
    }
  }

function selectorRemove() {
    let removeText = document.getElementById("remove-text").value;

    let selectorList = document.querySelectorAll(`${removeText}`);
    for(let i=0; i<selectorList.length; i++){
        selectorList[i].remove();
    }

}

function basicClone(){
    let pElem = document.getElementById("p1");
    let pClone = pElem.cloneNode(true);

    pElem.parentNode.insertBefore(pClone, pElem.nextSibling);
}

function advClone(){
    let pElem = document.getElementById("p1");
    let tempCard = document.querySelector("template");
    let cardClone = tempCard.content.cloneNode(true)

    numCopy++;
    cardClone.querySelector("h2").textContent += ` #${numCopy}`;

    pElem.parentNode.insertBefore(cardClone, pElem.nextSibling);
}

window.addEventListener('DOMContentLoaded', init);