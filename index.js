import { menuArray } from '/data.js'

const listOfProducts = document.getElementById('list-of-products')

let htmlElements = ''

menuArray.forEach(function(product){
  
  htmlElements += `
  <li>
    <span class="product-icon">${product.emoji}</span>
    <div class="product-details">
        <h2>${product.name}</h2>
        <p>${product.ingredients}</p>
        <h4>$${product.price}</h4>
    </div>
    <i class="fa-sharp fa-solid fa-circle-plus add-btn"></i>
  </li>  
  `
});

listOfProducts.innerHTML = htmlElements


