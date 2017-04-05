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

function prepareInternalNav() {
    if(!document.getElementsByTagName){
        return false
    }

    if(!document.getElementById){
        return false;
    }

    var article = document.getElementsByTagName("article")[0];
    var links = article.getElementsByTagName("a");
    for(var i = 0; i < links.length; i++){
        var sectionId = links[i].getAttribute("href").split("#")[1];
        if(!document.getElementById(sectionId)) continue;
        // var section = document.getElementById(sectionId);
        // section.style.display = "none";
        links[i].destination = sectionId;
        links[i].onclick  = function(){
            showSection(this.destination);
            return false;
        }
    }
}

function showSection(Id){
    if(!document.getElementsByTagName){
        return false;
    }

    var sections = document.getElementsByTagName("section");
    for(var i = 0; i < sections.length; i++){
        if(sections[i].getAttribute("id") != Id){
            sections[i].style.display = "none";
        } else {
            sections[i].style.display = "block";
        }
    }
}

addLoadEvent(prepareInternalNav);

/*准备图片库*/
function preparePlaceholder() {
    if(!document.getElementById) {
        return false;
    }

    if(!document.createElement) {
        return false;
    }

    if(!document.createTextNode) {
        return false;
    }

    if(!document.getElementsByClassName("thumbnails")[0]){
        return false;
    }
    var placeholder = document.createElement("img");
    placeholder.setAttribute("id","placeholder");
    placeholder.setAttribute("src","../img/placeholder.gif");
    placeholder.setAttribute("alt","choose a image");
    var description = document.createElement("p");
    var text = document.createTextNode("选择一张图片");
    description.appendChild(text);
    description.setAttribute("id","descriptionText")
    var gallery = document.getElementsByClassName("thumbnails")[0];//这个返回的是数组
    insertAfter(description,gallery);
    insertAfter(placeholder,description);
}

addLoadEvent(preparePlaceholder);

function prepareGallerryEffect() {
    if(!document.getElementsByClassName) return false;
    if(!document.getElementsByTagName) return false;
    if(!document.getElementsByClassName("thumbnails")[0]) return false;//一定要加数组的索引
    var gallery = document.getElementsByClassName("thumbnails")[0];
    var links = gallery.getElementsByTagName("a");
    for(var i = 0; i < links.length; i++) {
        links[i].onclick = function () {
            return showPic(this);
        }
    }
}

function showPic(whichLink) {
    if (!document.getElementById("placeholder")) return true;
    var source = whichLink.getAttribute("href");
    var placeholder = document.getElementById("placeholder");
    placeholder.setAttribute("src",source);

    var description = document.getElementById("descriptionText");
    if (whichLink.getAttribute("title")) {
        description.firstChild.nodeValue = whichLink.getAttribute("title");
    } else {
        description.firstChild.nodeValue = "";
    }

    return false;
}

addLoadEvent(prepareGallerryEffect);

function stripeTables() {
    if (!document.getElementById) return false;
    if(!document.getElementById("games-table")) {
        return false;
    }

    var gameTable = document.getElementById("games-table");
    var lines = gameTable.getElementsByTagName("tr");
    var odd = false;
    for(var i = 0; i < lines.length; i++){
        if(odd == false) {
            odd = true;
        } else {
            addClass(lines[i],"stripe");
            odd = false;
        }
    }
}

addLoadEvent(stripeTables);

function highlightRows() {
    if(!document.getElementsByTagName) return false;
    var tbody = document.getElementsByTagName("tbody")[0];
    var rows = tbody.getElementsByTagName("tr");
    for (var i = 0 ; i < rows.length; i++) {
        rows[i].oldClassName = rows[i].className;
        rows[i].onmouseover = function () {
            addClass(this,"highlight");
        }

        rows[i].onmouseout = function () {
            this.className = this.oldClassName;
        }
    }

}

addLoadEvent(highlightRows);