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
let modal = document.getElementById('myModal');

function Get(url) {
    return new Promise((resolve) => {
        let xhttp = new XMLHttpRequest();
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
    let categories = document.querySelector('[id=categories]');
    computerComponents.forEach(component => {
        let option = document.createElement('option');
        option.setAttribute('value', component.name);
        option.appendChild(document.createTextNode(component.name));
        categories.appendChild(option);
    });
}

function setCategoryTitle(category = document.querySelector('select').value) {
    document.querySelector('h2').textContent = category;
}

function getFilteredComponents(category, q) {
    let categoryTitle = document.getElementById('categoryTitle');
    let resultsMsg = document.createElement('p');
    let loader = document.getElementById('loader');
    let filteredComponents = [];
    let i, j;
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
        loader.style.display = 'block';
        window.setTimeout(() => {
            createTable(getFilteredComponents(category, q));
        }, 150);
    } else {
        // Get the correct items to put into the table
        loader.style.display = 'none';
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
                                    break;
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
        if (document.getElementById('resultsMsg') !== null) {
            categoryTitle.removeChild(document.getElementById('resultsMsg'));
        }
        resultsMsg.textContent = `${filteredComponents.length} results found`;
        resultsMsg.setAttribute('id', 'resultsMsg');
        categoryTitle.appendChild(resultsMsg);
        return filteredComponents;
    }
}

function makeModal(itemName, item) {
    let amazonLink = document.getElementById('amazon-link');
    let neweggLink = document.getElementById('newegg-link');
    let table = document.getElementById('modal-table-body');
    let tr = document.createElement('tr');
    let keys = Object.keys(item);
    let th;
    let td;

    // First make the modal header
    document.getElementById('item-name').textContent = itemName;

    // Second, make the column headers
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }

    keys.forEach(key => {
        th = document.createElement('th');
        th.textContent = key;
        tr.appendChild(th);
    });
    table.appendChild(tr);

    // Third, add the data.
    tr = document.createElement('tr');
    keys.forEach(key => {
        td = document.createElement('td');
        if (key === 'price') {
            td.textContent = '$' + item[key];
        } else {
            td.textContent = item[key];
        }
        tr.appendChild(td);
    });
    table.appendChild(tr);

    amazonLink.setAttribute('href', `https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Dcomputers&field-keywords=${itemName}`);
    amazonLink.textContent = itemName;

    neweggLink.setAttribute('href', `https://www.newegg.com/Product/ProductList.aspx?Submit=ENE&DEPA=0&Order=BESTMATCH&Description=${itemName}`);
    neweggLink.textContent = itemName;

    // Finally, display the modal to the user.
    modal.style.display = 'block';
}

function createTable(filteredComponents) {
    let content = document.querySelector('[class=content]');
    let footer = document.getElementsByTagName('footer')[0];
    let table = document.querySelector('tbody');
    let tr = document.createElement('tr');
    let name = document.createElement('th');
    let category = document.createElement('th');
    let price = document.createElement('th');
    let btn = document.createElement('button');
    let span = document.createElement('span');
    let i;

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

    name.addEventListener('click', () => {
        sortTable(0);
    });

    category.addEventListener('click', () => {
        sortTable(1);
    });

    price.addEventListener('click', () => {
        sortTable(2);
    });

    name.setAttribute('class', 'sort-by');
    category.setAttribute('class', 'sort-by');
    price.setAttribute('class', 'sort-by');

    tr.appendChild(name);
    tr.appendChild(category);
    tr.appendChild(price);
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
        tr.addEventListener('click', (item) => {
            let itemName = item.target.parentNode.children[0].textContent;
            let itemIndex = filteredComponents.findIndex(component => {
                return component.name.toLowerCase() === itemName.toLowerCase();
            });
            if (itemIndex !== -1) {
                makeModal(itemName, filteredComponents[itemIndex]);
            }

        });
        table.appendChild(tr);
    }
    footer.style.display = 'block';
}

function sortTable(n) {
    let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0,
        xNum, yNum;
    table = document.getElementById('components');
    switching = true;
    //Set the sorting direction to ascending:
    dir = 'asc';
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = table.getElementsByTagName('TR');
        /*Loop through all table rows (except the
        first, which contains table headers):*/
        for (i = 1; i < rows.length - 1; i++) {
            //start by saying there should be no switching:
            shouldSwitch = false;
            /*Get the two elements you want to compare,
            one from current row and one from the next:*/
            x = rows[i].getElementsByTagName('TD')[n];
            y = rows[i + 1].getElementsByTagName('TD')[n];
            /*check if the two rows should switch place,
            based on the direction, asc or desc:*/
            if (dir === 'asc') {
                if (n !== 2) {
                    if (x.textContent.toLowerCase() > y.textContent.toLowerCase()) {
                        //if so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                } else {
                    xNum = Number(x.textContent.substr(1));
                    yNum = Number(y.textContent.substr(1));
                    if (isNaN(xNum))
                        xNum = 0;
                    if (isNaN(yNum))
                        yNum = 0;
                    if (xNum > yNum) {
                        //if so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                }
            } else if (dir === 'desc') {
                if (n !== 2) {
                    if (x.textContent.toLowerCase() < y.textContent.toLowerCase()) {
                        //if so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                } else {
                    xNum = Number(x.textContent.substr(1));
                    yNum = Number(y.textContent.substr(1));
                    if (isNaN(xNum))
                        xNum = 0;
                    if (isNaN(yNum))
                        yNum = 0;
                    if (xNum < yNum) {
                        //if so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                }
            }
        }
        if (shouldSwitch) {
            /*If a switch has been marked, make the switch
            and mark that a switch has been done:*/
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            //Each time a switch is done, increase this count by 1:
            switchcount++;
        } else {
            /*If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again.*/
            if (switchcount === 0 && dir === 'asc') {
                dir = 'desc';
                switching = true;
            }
        }
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

window.onclick = event => {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};

document.getElementsByClassName('close')[0].onclick = () => {
    modal.style.display = 'none';
};

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

document.querySelector('input').addEventListener('change', () => {
    rowCount = 0;
    createTable(getFilteredComponents(document.querySelector('select').value, document.querySelector('input').value.toLowerCase()));
});