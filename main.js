let pageHeader, navigation, content, footer;

window.addEventListener('load', () => {
	footer = getFooter();
	var footerDiv = createDiv();
	footerDiv.appendChild(createPTag('Hello There'));
	setFooter(footerDiv);
});