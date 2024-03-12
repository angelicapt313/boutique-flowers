const cardsFlowers = document.querySelector('.list_flowers');



eventListeners();
function eventListeners(){
    cardsFlowers.addEventListener('click', addCart)
}

// Función agregar carrito
function addCart(e){
    if(e.target.classList.contains('add')){
        const cardSelected = e.target.parentElement;
        readData(cardSelected);
    }
}

// Leer datos de la tarjeta
function readData(card){
    const infoCard = {
        img: card.querySelector('img').src,
        price: card.querySelector('.price').textContent,
        title: card.querySelector('h6').textContent,
        id: card.querySelector('.add').getAttribute('data-id'),
        quantity: 1
    }
}

