function getFooter() {
	return document.getElementById('footer');
}

function setFooter(html) {
	document.getElementById('footer').appendChild(html);
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