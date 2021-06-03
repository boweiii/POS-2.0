// 3.變數宣告
const menu = document.getElementById('menu')
const cart = document.getElementById('cart')
const totalAmount = document.getElementById('total-amount')
const button = document.getElementById('submit-button')

let productData = []
let cartItems = []
let total = 0

// 4.GET API 菜單產品資料
axios.get('https://ac-w3-dom-pos.firebaseio.com/products.json')
  .then(response => {
    console.log(response.data)
    productData.push(...response.data)
    renderProduct(productData)
  })





// 5.將產品資料加入菜單區塊
function renderProduct(products) {
  let productList = ''
  products.forEach(product => {
    productList += `
    <div class="col-3">
      <div class="card">
        <img src=${product.imgUrl} class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">${product.price}</p>
          <a href="#" class="btn btn-primary" data-id="${product.id}">加入購物車</a>
        </div>
      </div>
    </div>`
  })
  menu.innerHTML = productList
}
// 6.加入購物車
function addToCart(event) {

  if (event.target.matches('.btn-primary')) {
    // 找到觸發event的node元素，並得到其產品id
    const id = event.target.dataset.id
    // 在productData的資料裡，找到點擊的產品資訊 name, price
    const price = productData.find(product => product.id === id).price
    const name = productData.find(product => product.id === id).name
    console.log(id)
    console.log(price)
    // 加入購物車變數cartItems 分：有按過、沒按過
    if (cartItems.find(product => product.id === id)) {
      let productIndex = cartItems.findIndex(product => product.id === id)
      cartItems[productIndex].count += 1
    } else {
      cartItems.push({
        id,
        price,
        name,
        count: 1
      })
    }
    console.log(cartItems)
    // 畫面顯示購物車清單
    let cartList = ''
    cartItems.forEach(item => {
      cartList += `<li class="list-group-item">${item.name} X ${item.count} 小計：${item.price}</li>`
    })
    cart.innerHTML = cartList
    // 7.計算總金額
    // 計算總金額
    let totalPrice = 0
    cartItems.forEach(product => {
      totalPrice += product.count * product.price
    })
    totalAmount.innerText = totalPrice
  }

}



// 8.送出訂單
function submit() {
  let list = ''
  cartItems.forEach(product => {
    list += `${product.name}X${product.count}\n`
    console.log(list)
  })
  console.log(list)
  alert(`您訂購的商品有 : \n${list}\n 總共是 : ${totalAmount.innerText}元`)
}

// 9.重置資料
function reset() {
}

// 10. 加入事件監聽

menu.addEventListener('click', addToCart)
button.addEventListener('click', submit)