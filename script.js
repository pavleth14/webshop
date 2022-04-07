$(document).ready(function() {

    let korpa = {};

    let products;

    let storageKorpa = JSON.parse(localStorage.getItem('shoppingCart'));

    if(storageKorpa !== null) {
        korpa = storageKorpa;
    }

    getFile().then(function(data) {
        // console.log(data); 
        products = data;
        for(let obj in data) {
            let name = $('<p></p>').text(data[obj].name);
            let price = $('<p></p>').text(data[obj].price + ' dinara');
            let img = $('<img/>')
                .attr('src', data[obj].img)
                .addClass('col-6');
            let btn = $('<button></button>')
                .text('Dodaj u korpu')
                .addClass('btn btn-primary addToCart')
                .attr('data-product-name', data[obj].name);
            let input = $('<input>')
                .addClass('mb-2 cigarettesAmount');

            let element = $('<article></article>')
                .append(input, img, name, price, btn)
                .addClass('col-4 border d-flex flex-column align-items-center justify-content-between p-2')
                

            $('#productHolder').append(element)
                .addClass('d-flex flex-wrap')
        }        

        getTotal();

    });

    $(document).on('click', '.addToCart', function() {
        let imeProizvoda = $(this).attr('data-product-name');
        console.log(imeProizvoda);
        let inputValue = $(this).parent().find('.cigarettesAmount').val();
        inputValue = parseInt(inputValue);
        console.log(inputValue, typeof inputValue);

        if(isNaN(inputValue)) {
            inputValue = 1;
        }

        korpa[imeProizvoda] = korpa[imeProizvoda] + inputValue || inputValue;
        console.log(korpa);

        localStorage.setItem('shoppingCart', JSON.stringify(korpa));

        getTotal();

    });

    // ovde
    function getTotal() {
        let totalProducts = 0;
        let totalPrice = 0;
        for(let item in korpa) {
            totalProducts += korpa[item];
            totalPrice += getCigarettesPrice(item) * korpa[item];
        }
        $('.totalProducts').text(totalProducts);
        $('#totalPrice').text(totalPrice);
    }

    // function getCigarettesPrice(name) {
    //     for(let product in products) {
    //         if(products[product].name == name) {
    //             return products[product].price;
    //         }
    //     }
    //     return 0;
    // }

})