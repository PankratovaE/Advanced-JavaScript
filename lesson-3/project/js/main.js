const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const getRequest = (url, callBack) => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status !== 200) {
                    reject('Error');
                } else {
                    resolve(callBack(xhr.responseText));
                }
            }
        }
        xhr.send();

    });
}


class ProductList {
    goods;
    allProducts;

    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this.allProducts = [];

        this.fetchGoods();
        this._init();
        //this.#render();
        // this.#getProducts()
        //     .then((data) => {
        //         this.#goods = [...data];
        //         this.#render();
        //     });
    }

    _init() {
        document.querySelector(this.container).addEventListener('click', (event) => {
          
            if (event.target.classList.contains('by-btn')) {
                const div = event.target.parentNode;
                cartList.addItem(productList.getItem(div.getAttribute('data-id')));
            }
        });

        document.querySelector('.search-form').addEventListener('submit', (event) => {
            event.preventDefault();
            this.filter(document.querySelector('.search-field').value);
          });
    }


    fetchGoods() {

        getRequest(`${API}/catalogData.json`, (data) => {

            let items = JSON.parse(data);

            this.goods = [...items];
           
            this.render();
            
        });
    }
    // #fetchGoods() {
    //     this.#goods = [
    //         {id: 1, title: 'Notebook', price: 20000, imageUrl: "https://picsum.photos/seed/4/200"},
    //         {id: 2, title: 'Mouse', price: 1500, imageUrl: "https://picsum.photos/seed/5/200"},
    //         {id: 3, title: 'Keyboard', price: 5000, imageUrl: "https://picsum.photos/seed/6/200"},
    //         {id: 4, title: 'Gamepad', price: 4500, imageUrl: "https://picsum.photos/seed/7/200"},
    //     ];
    // }

    // #getProducts() {
    //     return fetch(`${API}/catalogData.json`)
    //         .then((response) => response.json())
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }

    render() {
        const block = document.querySelector(this.container);

        this.goods.forEach((product) => {
            const productObject = new ProductItem(product);
            this.allProducts.push(productObject);

            let html = `<div class="product-item" data-id="${productObject.id_product}">
                        <h3 class="heading">${productObject.product_name}</h3>
                        <img src = 'https://placehold.it/200x150'>
                        <p class="price-text">${productObject.price}</p>
                        <button class="by-btn">Добавить в корзину</button>
                        </div>`;
            block.insertAdjacentHTML('beforeend', html);
        });
    }
    
    
    calcTotalPrice() {
        let totalPrice = 0;
        this.allProducts.forEach((product) => totalPrice += product.price);
        return totalPrice;
    }

    getTotalPriceWithDiscount(discount = 1) {
        return this.calcTotalPrice() * discount;
    }
    getItem(id) { 
        let a;
        this.allProducts.forEach((item) => {

            if (item.id_product == id) {
                a = item;
                return item;
            }

        });
        
        return a;
    }

    filter(value){
        const regexp = new RegExp(value, 'i');
        this.filtered = this.allProducts.filter(product => regexp.test(product.product_name));
        this.allProducts.forEach(elem => {
          const block = document.querySelector(`.product-item[data-id="${elem.id_product}"]`);
          
          if(!this.filtered.includes(elem)){
            block.classList.add('invisible');
          } else {
            block.classList.remove('invisible');
          }
        })
      }

    

}

class ProductItem {
    constructor(product, img = 'https://placehold.it/200x150') {
        this.product_name = product.product_name;
        this.price = product.price;
        this.id_product = product.id_product;
        this.img = img;
    }

}


class CartList {
    constructor(container = '.cart-products') {
        this.isEmpty = true;
        this.goodsCart = [];
        this.container = container;
        this._init();
    }

    _init() {

        document.querySelector('.cart-btn').addEventListener('click', () => {
            document.querySelector(this.container).classList.toggle('invisible');
          });

        document.querySelector(this.container).addEventListener('click', (event) => {
          
            if (event.target.classList.contains('delete')) {
                const div = event.target.parentNode;
                
                cartList.removeItem(productList.getItem(div.parentNode.getAttribute('data-id')));
                
            }
        });
    }

    //добавить товар в корзину
    addItem(item) {

      let response = getRequest(`${API}/addToBasket.json`, (data) => {

           return JSON.parse(data).result;
             
            
        }); 
        
        response.then((result) => {
            if (result === 1) {
                let productId = item.id_product;
                let find = this.goodsCart.find(product => product.id_product === productId);
                if (find) {
                    find.quantity++;
                    this.updateCart(find);
                } else {
                let product = {
                        id_product: productId,
                        price: item.price,
                        product_name: item.product_name,
                        quantity: 1
                };

                    const cartObject = new CartItem(product);
                    this.goodsCart.push(cartObject);

                    this.render();
                }
                        
            }
        });
                      
    } 

    //удалить товар
    removeItem(item) {
        let response = getRequest(`${API}/deleteFromBasket.json`, (data) => {

            return JSON.parse(data).result;
                  
         }); 

         response.then((result) => {
            if (result === 1) {

                let productId = item.id_product;
                let find = this.goodsCart.find(product => product.id_product === productId);
                if (find.quantity > 1) {
                    find.quantity--;
                    this.updateCart(find);

                } else {
                    this.goodsCart.splice(this.goodsCart.indexOf(find), 1);
                    document.querySelector(`.cart-item[data-id="${productId}"]`).remove();
                }

            }
        
            });
        
    }
    
     

    render() {
        const block = document.querySelector(this.container);
        block.innerHTML = '';
        
        this.goodsCart.forEach((product) => {
         
            let html = `<div class="cart-item" data-id="${product.id_product}">
            <div class="desc">
            <h3>${product.product_name}</h3>
            <p>${product.price} \u20bd</p>
           <p class="product-quantity">Количество: ${product.quantity}</p>
            <button onclick="cartList.removeItem(productList.getItem(${product.id_product}));"  class="by-btn">Удалить из корзины</button>
             </div>
        </div>`;
            block.insertAdjacentHTML('beforeend', html);
        });

    }

    //сумма всех товаров в корзине
    calcSumPrice() {
        let totalPrice = 0;
        this.goodsCart.forEach((product) => totalPrice += product.price);
        return totalPrice;
    }
   
    updateCart(product) {
        let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
        block.querySelector('.product-quantity').textContent = `Количество: ${product.quantity}`;
    } //обновить корзину
}

class CartItem {
    constructor(product) {
        this.product_name = product.product_name;
        this.price = product.price;
        this.id_product = product.id_product;
        this.quantity = product.quantity;

    }

}


const productList = new ProductList();
const cartList = new CartList();
