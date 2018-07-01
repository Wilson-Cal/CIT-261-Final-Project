function getFooter() {
	return document.getElementById('footer');
}

function setFooter(html) {
	document.getElementById('footer').appendChild(html);
}

function getContent() {
    return document.getElementById('content');
}

function setContent(html) {
    document.getElementById('content').appendChild(html)
}

function createH1Tag(text) {
	var h1 = document.createElement('h1');
	text = document.createTextNode(text);
	h1.appendChild(text);
	return h1;
}

function createH2Tag(text) {
	var h2= document.createElement('h2');
	text = document.createTextNode(text);
	h2.appendChild(text);
	return h2;
}

function createH3Tag(text) {
	var h3 = document.createElement('h3');
	text = document.createTextNode(text);
	h3.appendChild(text);
	return h3;
}

function createH4Tag(text) {
	var h4 = document.createElement('h4');
	text = document.createTextNode(text);
	h4.appendChild(text);
	return h4;
}

function createPTag(text) {
	var para = document.createElement('p');
	text = document.createTextNode(text);
	para.appendChild(text);
	return para;
}

function createDiv() {
	return document.createElement('div');
}

function writeLocal(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function readLocal(key) {
    return JSON.parse(localStorage.getItem(key))
}

async function getProducts() {
    function getJSON() {
        return new Promise(resolve => {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    resolve(JSON.parse(this.responseText));
                }
            };
            xhttp.open('GET', 'https://raw.githubusercontent.com/Wilson-Cal/CIT-261-Final-Project/master/store.json', true);
            xhttp.send();
        });
    }
    var data = await getJSON();
    return(data);
}