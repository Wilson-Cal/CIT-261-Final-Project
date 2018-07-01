let content = getContent(),
    footer = getFooter();
let storeData;

window.addEventListener('load', () => {
    // Make the homepage

    // First load the store from local store or GET it from Github
    
    if(!localStorage.getItem('store')) {
        console.log('hello');
        getProducts().then(data => {
            writeLocal('store', data);
            storeData = data;
        });
    } else {
        storeData = readLocal('store');
    }
    content.appendChild(createH2Tag('Products'));
    for(let category in storeData.products) {
        content.appendChild(createPTag(storeData.products[category]));
    }
	
});