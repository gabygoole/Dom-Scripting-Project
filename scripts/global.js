/**
 * Created by Gaby on 3/29/2017.
 */
function addLoadEvent(func) {
    var  oldonload = window.onload;
    if(typeof  window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function () {
            oldonload();
            func();
        }
    }
}

function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if(parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

function addClass(element, value) {
    if(element.className) {
        var tmpClass = element.className;
        tmpClass += " ";
        tmpClass += value;
        element.className = tmpClass;
    } else {
        element.className = value;
    }
}

function highlightPage() {
    if(!document.getElementsByTagName){
        return false;
    }

    var headerEle = document.getElementsByTagName('header');
    var linkList = headerEle[0].getElementsByTagName('a');
    var linkUrl;
    for (var i = 0 ; i < linkList.length; i++) {
        linkUrl = linkList[i].getAttribute("href");
        if (window.location.href.indexOf(linkUrl) != -1) {
            addClass(linkList[i],"here");
            var text = linkList[i].lastChild.nodeValue.toLowerCase();
            document.body.setAttribute("id",text);
        }
    }
}

addLoadEvent(highlightPage);

function prepareSlideShow() {
    if(!document.getElementsByTagName) {
        return false;
    }

    if(!document.getElementById) {
        return false;
    }

    if (!document.getElementById("intro")) {
        return false
    }
    var intro = document.getElementById("intro");
    var preview = document.createElement("img");
    preview.setAttribute("id","preview");
    preview.setAttribute("src","../img/slide.jpg");
    preview.setAttribute("alt","slide show img");

    var slideshow = document.createElement("div");
    slideshow.setAttribute("id","slideshow");

    slideshow.appendChild(preview);
    insertAfter(slideshow,intro);

    var links = intro.getElementsByTagName("a");
    links[0].onmouseover = function () {
        moveElement("preview",0,0,5);
    }

    links[1].onmouseover = function () {
        moveElement("preview",-150,0,5);
    }

    links[2].onmouseover = function () {
        moveElement("preview",-300,0,5);
    }
}

addLoadEvent(prepareSlideShow);

function moveElement(elementId,final_x,final_y,interval) {

    if(!document.getElementById){
        return false;
    }

    if(!document.getElementById(elementId)) {
        return false;
    }

    var elem = document.getElementById(elementId);
//表示以下三行代码待理解
    if(elem.movement) {
        clearTimeout(elem.movement);
    }

    if(!elem.style.left) {
        elem.style.left = "0px";
    }

    if(!elem.style.top) {
        elem.style.top = "0px";
    }

    var xpos = parseInt(elem.style.left);
    var ypos = parseInt(elem.style.top);

    if(xpos == final_x && ypos == final_y) {
        return true;
    }

    if(xpos < final_x) {
        var dist = Math.ceil((final_x - xpos)/10);
        xpos += dist;
    }

    if(xpos > final_x) {
        var dist = Math.ceil((xpos - final_x)/10);
        xpos -= dist;
    }

    if(ypos > final_y) {
        var dist = Math.ceil((ypos - final_y)/10);
        ypos -= dist;
    }

    if(ypos < final_y) {
        var dist = Math.ceil((ypos - final_y)/10);
        ypos += dist;
    }

    elem.style.left = xpos + "px";
    elem.style.top = ypos + "px";

    var tmp = "moveElement('" + elementId + "'," + final_x + "," + final_y + "," + interval+")";
    elem.movement = setTimeout(tmp,interval);
}