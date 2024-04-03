const cardsFlowers = document.querySelector('.list_flowers');
const tableCart = document.querySelector('#cart_list tbody');
const cart = document.querySelector('#cart');
const emptyList = document.querySelector('.empty');

let arrCart = [];

eventListeners();
function eventListeners() {
    cardsFlowers.addEventListener('click', addCart);

    cart.addEventListener('click', deleteFlower);

    emptyList.addEventListener('click', () => {

        arrCart = [];

        removeDuplicates();
    });
}

// Función agregar carrito
function addCart(e) {

    removeDuplicates();

    if (e.target.classList.contains('add')) {
        const selectedArticle = e.target.parentElement;
        informationArticle(selectedArticle);
        cartHtml();
    }

}

let total = '';

// Leer datos de la tarjeta
function informationArticle(article) {
    const contentArticle = {
        img: article.querySelector('img').src,
        price: article.querySelector('.price').textContent,
        title: article.querySelector('h6').textContent,
        id: article.querySelector('.add').getAttribute('data-id'),
        quantity: 1
    }

    // Método some para verificar si alguna tarjeta existe, si sí existe, actualizamos cantidad
    const articleExists = arrCart.some(fl => fl.id === contentArticle.id);

    if (articleExists) {
        const updateCart = arrCart.map(fl => {
            if (fl.id === contentArticle.id) {
                fl.quantity++;
                total = parseFloat(fl.price) * fl.quantity;
                console.log(total);
                return fl;
            } else {
                return fl;
            }
        });
        arrCart = [...updateCart];
    } else {
        arrCart = [...arrCart, contentArticle];
    }
}

// Agregar información al carrito
function cartHtml() {

    removeDuplicates();



    arrCart.forEach(cr => {
        const { img, price, title, id, quantity } = cr;
        // Crear renglon
        const row = document.createElement('tr');
        row.innerHTML = `
        <td><img src="${img}" width="50px"> </td>
        <td>$${total}</td>
        <td>${title}</td>
        <td>${quantity}</td>
        <td><a href="#" class="delete btn btn-danger" data-id="${id}">X</a></td>
       
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

function deleteFlower(e){
    e.preventDefault();
    if(e.target.classList.contains('delete')){
        const flowerId = e.target.getAttribute('data-id');

        arrCart = arrCart.filter(fl => fl.id !== flowerId);
    }
   cartHtml();
}