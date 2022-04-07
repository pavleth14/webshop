$(document).ready(function() {

    let products;

    let ukupnaCena = 0;

    let korpaStorage = JSON.parse(localStorage.getItem('shoppingCart'));
    console.log(korpaStorage);

    getFile().then(function(response) {
        products = response;
        for(let item in korpaStorage) {
            let deleteBtn = $('<button></button>')
                .text('Delete')
                .addClass('btn btn-danger ms-3 deleteBtn')
                .attr('data-product-name', item);
            let data = $('<p></p>').text(item + ': ' + korpaStorage[item] + ', cena: ' + getCigarettesPrice(item) * korpaStorage[item] + ' dinara')
                .append(deleteBtn)
                .addClass('m-0')
            let element = $('<article></article>')
                .append(data)
                .addClass('border mb-2 d-flex align-items-center p-2')
            $('#korpa').append(element);
            ukupnaCena += getCigarettesPrice(item) * korpaStorage[item];
        }
        $('#ukupnaCena').text(ukupnaCena + ' dinara');
    });

    $(document).on('click', '.deleteBtn', function() {
        let imeProizvoda = $(this).attr('data-product-name');        
        
        for(let item in korpaStorage) {
            if(item == imeProizvoda) {
                ukupnaCena -= getCigarettesPrice(item) * korpaStorage[item];
            }
        }

        $('#ukupnaCena').text(ukupnaCena + ' dinara');

        delete korpaStorage[imeProizvoda];

        console.log(korpaStorage);

        localStorage.setItem('shoppingCart', JSON.stringify(korpaStorage));

        $(this).parent().remove();

    })

})