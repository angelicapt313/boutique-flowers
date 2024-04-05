const cardsFlowers = document.querySelector('.list_flowers');
const productCard = document.querySelector('#cart_list tbody');
const cart = document.querySelector('#cart');
const emptyList = document.querySelector('.empty');
const priceParr = document.querySelector('.price')

let arrCart = [];


class Article{
    imagenProducto = '';
    precioProducto = '';
    nombreProducto = '';
    constructor(){
        
    }
}

// Función agregar carrito
function addToCart(imagenProducto,nombreProducto, precioProducto) {
    debugger
    productCard.innerHTML = `
    <td><img src="${imagenProducto.src}" width="100px"></td>
    <td>${nombreProducto.textContent}</td>
    <td>${precioProducto.textContent}</td>
    `;
}
   

