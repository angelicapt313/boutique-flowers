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

