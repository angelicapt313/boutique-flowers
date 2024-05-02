const cardsFlowers = document.querySelector('.list_flowers');
const tableCart = document.querySelector('#cart_list tbody');
const cart = document.querySelector('#cart');
const emptyList = document.querySelector('.empty');
const priceParr = document.querySelector('.price')
const totalAmount = document.querySelector('.totalAmout');

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


let total = 0;
let totalProducts = 0;

// Leer datos de la tarjeta
function informationArticle(article) {
    const contentArticle = {
        img: article.querySelector('img').src,
        price: article.querySelector('.price').textContent,
        title: article.querySelector('h6').textContent,
        id: article.querySelector('.add').getAttribute('data-id'),
        quantity: 1
    }

    verificateExisteArticle(contentArticle);
}

// Verificar si existe algún ID en nuestro objeto para agregar cantidad y actualizar el total
function verificateExisteArticle(article) {

    // Método some para verificar si alguna tarjeta existe, si sí existe, actualizamos cantidad
    const articleExists = arrCart.some(fl => fl.id === article.id);

    if (articleExists) {
        const updateCart = arrCart.map(fl => {
            if (fl.id === article.id) {
                fl.quantity++;
                addPrices(fl);
                return fl;
            } else {
                return fl;
            }
        });
        arrCart = [...updateCart];
    } else {
        arrCart = [...arrCart, article];

    }
}

function addPrices(article) {
    total = Number.parseFloat(article.price) * article.quantity;
    article.price = Number.parseFloat(total).toFixed(2);

}


// Agregar información al carrito
function cartHtml() {

    removeDuplicates();



    arrCart.forEach(cr => {
        const { img, price, title, id, quantity } = cr;
        // Crear renglon
        const row = document.createElement('tr');
        row.classList.add('text-center')
        row.innerHTML = `
        <td class="align-middle text-center p-0"><img src="${img}" width="65px"> </td>
        <td class="align-middle text-center p-0  ">$${price}</td>
        <td class="align-middle text-center p-0  ">${title}</td>
        <td class="align-middle p-0 ">${quantity}</td>
        <td class="align-middle p-0 "><a href="#" class="delete btn btn-danger my-3" data-id="${id}" >X</a></td>
       
        `;

        tableCart.appendChild(row);

        totalProducts = total + Number.parseFloat(cr.quantity * cr.price);
        
    });

    

}

// Eliminar duplicados de la lista de compras.
function removeDuplicates() {
    while (tableCart.firstChild) {
        tableCart.removeChild(tableCart.firstChild);
    }
}

function deleteFlower(e) {
    e.preventDefault();
    if (e.target.classList.contains('delete')) {
        const flowerId = e.target.getAttribute('data-id');

        arrCart = arrCart.filter(fl => fl.id !== flowerId);
    }
    cartHtml();
}


