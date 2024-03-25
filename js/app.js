const cardsFlowers = document.querySelector('.list_flowers');
const tableCart = document.querySelector('#cart_list tbody');

let arrCart = [];

eventListeners();
function eventListeners() {
    cardsFlowers.addEventListener('click', addCart);
}

// Función agregar carrito
function addCart(e) {

    removeDuplicates();

    if (e.target.classList.contains('add')) {
        const cardSelected = e.target.parentElement;
        readData(cardSelected);
        cartHtml();
    }

}

// Leer datos de la tarjeta
function readData(card) {
    const infoCard = {
        img: card.querySelector('img').src,
        price: card.querySelector('.price').textContent,
        title: card.querySelector('h6').textContent,
        id: card.querySelector('.add').getAttribute('data-id'),
        quantity: 1
    }

    // Método some para verificar si alguna tarjeta existe, si sí existe, actualizamos cantidad
    const flowerExists = arrCart.some(fl => fl.id === infoCard.id);

    if (flowerExists) {
        const updateCart = arrCart.map(fl => {
            if (fl.id === infoCard.id) {
                fl.quantity++;
                return fl;
            } else {
                return fl;
            }
        });
        arrCart = [...updateCart];
    } else {
        arrCart = [...arrCart, infoCard];
    }



}

// Agregar información al carrito
function cartHtml() {
    arrCart.forEach(cr => {
        const { img, price, title, id, quantity } = cr;
        // Crear renglon
        const row = document.createElement('tr');
        row.innerHTML = `
        <td><img src="${img}" width="50px"> </td>
        <td>${price}</td>
        <td>${title}</td>
        <td>${quantity}</td>
        <td><a href="#" class="btn btn-danger" data-id="${id}">X</a></td>
        `;

        tableCart.appendChild(row);
    });
}

// Eliminar duplicados de la lista de compras.
function removeDuplicates() {
    while (tableCart.firstChild) {
        tableCart.removeChild(tableCart.firstChild);
    }
}