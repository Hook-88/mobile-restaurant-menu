import { menuArray } from '/data.js'

const orderOverview = document.getElementById('order-overview')
const cartContent = document.getElementById('list-of-orders')
const userCart = []

document.addEventListener('click', function(e) {
  if (e.target.dataset.add) {
    orderOverview.classList.remove('hidden')
    AddProductToCart(e.target.dataset.add)      
  }
})

function AddProductToCart(productId) {
  userCart.push(menuArray.filter(function(product){
    return product.id == productId
  })[0])
  renderContentOfCart()


  let totalprice = userCart.reduce(function(a, b){
    return a + b.price
  },0)

  console.log(totalprice)

}

function renderContentOfCart () {
  let html = ''
  if(userCart.length > 0) {
    userCart.forEach(function (product) {
      html += `
      <li class="product-order">
        <h2>${product.name}</h2>
        <button class="remove-product" id="remove-product-btn-${product.id}">remove</button>
        <h4 class="total-price-product">$${product.price}</h4>
      </li>
      `
    })
    cartContent.innerHTML = html
  }
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


