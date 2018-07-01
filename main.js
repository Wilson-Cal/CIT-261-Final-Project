let content = getContent(),
    footer = getFooter();
let storeData;

window.addEventListener('load', () => {
    // Make the homepage

    // First load the store from Github
    getProducts().then(data => {
        storeData = data;
        content.appendChild(createH2Tag('Products'));
        for(let category in storeData.products) {
            content.appendChild(createPTag(storeData.products[category][0].name));
            content.appendChild(createPTag('$' + storeData.products[category][0].price[0]));
        }
    });
});