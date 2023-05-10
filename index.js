import { menuArray } from '/data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

const orderOverview = document.getElementById('order-overview')
const cartContent = document.getElementById('list-of-orders')
const checkOutForm = document.getElementById('checkout-card-form')
const checkoutMessage = document.getElementById('checkout-message')
let userCart = []

const form = checkOutForm.firstElementChild

form.addEventListener('submit', function (e) {
  e.preventDefault()

  const checkoutFormData = new FormData(form)
  const name = checkoutFormData.get('fullName')

  checkOutForm.classList.add('hidden')
  orderOverview.classList.add('hidden')

  checkoutMessage.classList.remove('hidden')

  checkoutMessage.querySelector('span').innerText =  name

})

document.getElementById('complete-order-btn').addEventListener('click', function (e) {
  checkOutForm.classList.remove('hidden')
})

document.addEventListener('click', function(e) {
  if (e.target.dataset.add) {
    orderOverview.classList.remove('hidden')
    AddProductToCart(e.target.dataset.add)      
  } else if (e.target.dataset.remove) {
    removeProductFromCart(e.target.dataset.remove)
  }
})

function removeProductFromCart(productId) {
  userCart = userCart.filter(function (product) {
    return product.id !== productId
  })
  renderOrder()
}

function AddProductToCart(productId) {
  const product = menuArray.filter(function(product){
    return product.id == productId
  })[0]
  const uniqueProduct = {
    name: product.name,
    price: product.price,
    id: uuidv4()
  }
  userCart.push(uniqueProduct)
  renderOrder()
}

function renderOrder() {
  renderContentOfCart()
}

function renderContentOfCart () {
  let html = ''
  if(userCart.length > 0) {
    userCart.forEach(function (product) {
      html += `
      <li class="product-order">
        <h2>${product.name}</h2>
        <button class="remove-product" data-remove="${product.id}">remove</button>
        <h4 class="total-price-product">$${product.price}</h4>
      </li>
      `
    })
    cartContent.innerHTML = html
    renderTotalPrice()
  } else {
    orderOverview.classList.add('hidden')
  }
}

function renderTotalPrice() {
  let totalprice = calculateTotalPrice()
  document.getElementById('total-price-order').textContent = totalprice
}

function calculateTotalPrice() {
  return userCart.reduce(function(a, b){
    return a + b.price
  },0)
}

function renderProducts() {
  const listOfProducts = document.getElementById('list-of-products')

  let htmlElements = ''

  menuArray.forEach(function(product){
    
    htmlElements += `
    <li class="card">
      <span class="product-icon">${product.emoji}</span>
      <div class="product-details">
          <h2>${product.name}</h2>
          <p>${product.ingredients}</p>
          <h4>$${product.price}</h4>
      </div>
      <i class="fa-sharp fa-solid fa-circle-plus add-btn" data-add="${product.id}"></i>
    </li>  
    `
  });

  listOfProducts.innerHTML = htmlElements
}

renderProducts()
