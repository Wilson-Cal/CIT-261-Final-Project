let computerComponents = [{
    name: 'cases',
    url: 'https://raw.githubusercontent.com/Wilson-Cal/CIT-261-Final-Project/master/components/cases.json',
    data: []
},
{
    name: 'coolers',
    url: 'https://raw.githubusercontent.com/Wilson-Cal/CIT-261-Final-Project/master/components/coolers.json',
    data: []
},
{
    name: 'cpus',
    url: 'https://raw.githubusercontent.com/Wilson-Cal/CIT-261-Final-Project/master/components/CPUs.json',
    data: []
},
{
    name: 'gpus',
    url: 'https://raw.githubusercontent.com/Wilson-Cal/CIT-261-Final-Project/master/components/GPUs.json',
    data: []
},
{
    name: 'memory',
    url: 'https://raw.githubusercontent.com/Wilson-Cal/CIT-261-Final-Project/master/components/memory.json',
    data: []
},
{
    name: 'motherboards',
    url: 'https://raw.githubusercontent.com/Wilson-Cal/CIT-261-Final-Project/master/components/motherboards.json',
    data: []
},
{
    name: 'psus',
    url: 'https://raw.githubusercontent.com/Wilson-Cal/CIT-261-Final-Project/master/components/PSUs.json',
    data: []
},
{
    name: 'storage',
    url: 'https://raw.githubusercontent.com/Wilson-Cal/CIT-261-Final-Project/master/components/storage.json'
}
];

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


window.addEventListener('load', () => {
    // Get the data for each component
    computerComponents.forEach(component => {
        Get(component.url).then(rawData => {
            component.data = JSON.parse(rawData);
        }).catch(console.error);
    });
});