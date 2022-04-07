let products;

function getFile() {
    return new Promise(resolve => {
        $.ajax({
            'url': 'products/cigarettes.json',
            method: 'get',
            success: function(data) {
                products = data;
                resolve(data);
            }
        })
    })
}

function getCigarettesPrice(name) {
    for(let product in products) {
        if(products[product].name == name) {
            return products[product].price;
        }
    }
    return 0;
}