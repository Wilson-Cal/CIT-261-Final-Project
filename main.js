let computerComponents = [{
    name: 'All Items'
},
{
    name: 'Cases',
    url: 'https://raw.githubusercontent.com/Wilson-Cal/CIT-261-Final-Project/master/components/cases.json',
    data: []
},
{
    name: 'Coolers',
    url: 'https://raw.githubusercontent.com/Wilson-Cal/CIT-261-Final-Project/master/components/coolers.json',
    data: []
},
{
    name: 'Graphics Cards',
    url: 'https://raw.githubusercontent.com/Wilson-Cal/CIT-261-Final-Project/master/components/GPUs.json',
    data: []
},
{
    name: 'Memory',
    url: 'https://raw.githubusercontent.com/Wilson-Cal/CIT-261-Final-Project/master/components/memory.json',
    data: []
},
{
    name: 'Motherboards',
    url: 'https://raw.githubusercontent.com/Wilson-Cal/CIT-261-Final-Project/master/components/motherboards.json',
    data: []
},
{
    name: 'Power Supply Units',
    url: 'https://raw.githubusercontent.com/Wilson-Cal/CIT-261-Final-Project/master/components/PSUs.json',
    data: []
},
{
    name: 'Processors',
    url: 'https://raw.githubusercontent.com/Wilson-Cal/CIT-261-Final-Project/master/components/CPUs.json',
    data: []
},
{
    name: 'Storage',
    url: 'https://raw.githubusercontent.com/Wilson-Cal/CIT-261-Final-Project/master/components/storage.json',
    data: []
}
];

let rowCount = 0;

function Get(url) {
    return new Promise((resolve) => {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                resolve(this.responseText);
            }
        };
        xhttp.open('GET', url, true);
        xhttp.send();
    });
}

function setCategoriesDropdown() {
    var categories = document.querySelector('[id=categories]');
    computerComponents.forEach(component => {
        var option = document.createElement('option');
        option.setAttribute('value', component.name);
        option.appendChild(document.createTextNode(component.name));
        categories.appendChild(option);
    });
}

function setCategoryTitle(category = document.querySelector('select').value) {
    document.querySelector('h2').textContent = category;
}

function getFilteredComponents(category, q) {
    var filteredComponents = [];
    var i, j;
    let partValues;

    // Set category to undefined if 'All Items' is selected
    if (category === 'All Items') {
        category = undefined;
    }

    // Set q to undefined if it is a blank string
    if (q === '') {
        q = undefined;
    }

    // Check to see if the data is there
    if (computerComponents[8].data.length === 0) {
        window.setTimeout(() => {
            createTable(getFilteredComponents(category, q));
        }, 100);
    } else {
        // Get the correct items to put into the table
        if (q !== undefined && category !== undefined) {
            // The user has defined a category and a search parameter
            i = computerComponents.findIndex(component => {
                return component.name === category;
            });
            filteredComponents = computerComponents[i].data.filter((part, index) => {
                partValues = Object.values(part);
                for (j = 0; j < partValues.length; j++) {
                    if (partValues[j] !== null) {
                        if (partValues[j].toString().toLowerCase().includes(q)) {
                            computerComponents[i].data[index].category = computerComponents[i].name;
                            return true;
                        }
                    }
                }
            });
        } else if (category !== undefined) {
            // A category other than 'All Items' has been selected
            i = computerComponents.findIndex(component => {
                return component.name === category;
            });
            computerComponents[i].data.forEach((part, index) => {
                computerComponents[i].data[index].category = computerComponents[i].name;
            });
            filteredComponents = computerComponents[i].data;
        } else if (q !== undefined) {
            // Only a query is given, run it against all items
            computerComponents.forEach((component, index) => {
                if (component.name !== 'All Items') {
                    component.data.forEach((item, iIndex) => {
                        partValues = Object.values(item);
                        for (j = 0; j < partValues.length; j++) {
                            if (partValues[j] !== null) {
                                if (partValues[j].toString().toLowerCase().includes(q)) {
                                    computerComponents[index].data[iIndex].category = component.name;
                                    filteredComponents.push(item);
                                }
                            }
                        }
                    });
                }
            });
        } else {
            // Get all items
            computerComponents.forEach((component, index) => {
                if (component.name !== 'All Items') {
                    component.data.forEach((item, iIndex) => {
                        computerComponents[index].data[iIndex].category = component.name;
                        filteredComponents.push(item);
                    });
                }
            });
        }
        return filteredComponents;
    }
}

function createTable(filteredComponents) {
    var content = document.querySelector('[class=content]');
    var table = document.querySelector('tbody');
    var tr = document.createElement('tr');
    var name = document.createElement('th');
    var category = document.createElement('th');
    var price = document.createElement('th');
    var btn = document.createElement('button');
    var span = document.createElement('span');
    var i;

    if (document.querySelector('button') !== null) {
        content.removeChild(document.querySelector('button'));
    }

    // Reset the table
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
    if (filteredComponents === undefined) {
        return;
    }
    if (filteredComponents.length === 0) {
        return;
    }

    name.textContent = 'Name';
    category.textContent = 'Category';
    price.textContent = 'Price';

    tr.appendChild(name);
    tr.appendChild(category);
    tr.appendChild(price);
    //tr.setAttribute('id', 'header');
    table.appendChild(tr);
    if (filteredComponents.length < rowCount + 20) {
        rowCount = filteredComponents.length;
    } else {
        rowCount += 20;
        span.textContent = 'Show More ';
        btn.setAttribute('class', 'showMore');
        btn.appendChild(span);
        btn.addEventListener('click', () => {
            createTable(filteredComponents);
        });
        content.appendChild(btn);
    }
    // Now generate the Table 20 rows at a time
    for (i = 0; i < rowCount; i++) {
        tr = document.createElement('tr');
        name = document.createElement('td');
        category = document.createElement('td');
        price = document.createElement('td');
        name.textContent = filteredComponents[i].name;
        category.textContent = filteredComponents[i].category;
        if (filteredComponents[i].price !== 'N/A') {
            price.textContent = '$' + filteredComponents[i].price;
        } else {
            price.textContent = filteredComponents[i].price;
        }
        tr.appendChild(name);
        tr.appendChild(category);
        tr.appendChild(price);
        tr.addEventListener('click', () => {
            //TODO: Add the ability to open a modul to show all product detail.
            console.log(filteredComponents);
        });
        table.appendChild(tr);
    }
}


window.addEventListener('load', () => {
    // Get the data for each component
    computerComponents.forEach(component => {
        if (component.name !== 'All Items') {
            Get(component.url).then(rawData => {
                component.data = JSON.parse(rawData);
            }).catch(console.error);
        }
    });
    setCategoriesDropdown();
    setCategoryTitle();
    createTable(getFilteredComponents(this.value, document.querySelector('input').value.toLowerCase()));
});

document.querySelector('select').addEventListener('change', () => {
    rowCount = 0;
    document.querySelector('input').value = '';
    setCategoryTitle(this.value);
    createTable(getFilteredComponents(document.querySelector('select').value, document.querySelector('input').value.toLowerCase()));
});

document.querySelector('input').addEventListener('keyup', () => {
    rowCount = 0;
    createTable(getFilteredComponents(document.querySelector('select').value, document.querySelector('input').value.toLowerCase()));
});