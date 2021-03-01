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
    #goods;
    #allProducts;

    constructor(container = '.products') {
        this.container = container;
        this.#goods = [];
        this.#allProducts = [];

        this.#fetchGoods();
        //this.#render();
        // this.#getProducts()
        //     .then((data) => {
        //         this.#goods = [...data];
        //         this.#render();
        //     });
    }


    #fetchGoods() {

        getRequest(`${API}/catalogData.json`, (data) => {

            this.#goods = JSON.parse(data);
            this.#render();
            
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

    #render() {
        const block = document.querySelector(this.container);

        this.#goods.forEach((product) => {
            const productObject = new ProductItem(product);
            this.#allProducts.push(productObject);
            let html = `<div class="product-item" data-id="${productObject.id}">
                        <h3 class="heading">${productObject.title}</h3>
                        <img src = 'https://placehold.it/200x150'>
                        <p class="price-text">${productObject.price}</p>
                        <button onclick="cartList.addItem(productList.getItem(${productObject.id}));" class="by-btn">Добавить в корзину</button>
                        </div>`;
            block.insertAdjacentHTML('beforeend', html);
        });
    }
    
    
    calcTotalPrice() {
        let totalPrice = 0;
        this.#allProducts.forEach((product) => totalPrice += product.price);
        return totalPrice;
    }

    getTotalPriceWithDiscount(discount = 1) {
        return this.calcTotalPrice() * discount;
    }
    getItem(id) { 
        let a;
        this.#allProducts.forEach((item) => {

            if (item.id == id) {
                a = item;
                return item;
            }

        });
        
        return a;
    }

}

class ProductItem {
    constructor(product, img = 'https://placehold.it/200x150') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }

}

const productList = new ProductList();



class CartList {
    constructor(container = '.cart-products') {
        this.isEmpty = true;
        this.goods = [];
        this.container = container;
    }




    //добавить товар в корзину
    addItem(item) {

      let response = getRequest(`${API}/addToBasket.json`, (data) => {

           return JSON.parse(data).result;
             
            
        }); 
        
        response.then((result) => {
            if (result == 1) {
            this.goods.push(item);
            this.render();
            }
        });
                      
    } 

    //удалить товар
    removeItem(item) {
        let response = getRequest(`${API}/deleteFromBasket.json`, (data) => {

            return JSON.parse(data).result;
            
           
         }); 

         response.then((result) => {
            if (result == 1) {

            let done = false;
            this.goods.forEach((goods) => {
           
            if (goods.id == item.id && !done) {
                let index = this.goods.indexOf(goods);
                this.goods.splice(index, 1);
                 
                done = true;
            }
        
            });
        this.render();
    }
    });
    } 

    render() {
        const block = document.querySelector(this.container);
        block.innerHTML = '';
        
        this.goods.forEach((product) => {
         
            let html = `<div class="cart-item" data-id="${product.id}">
            <div class="desc">
            <h3>${product.title}</h3>
            <p>${product.price} \u20bd</p>
           
            <button onclick="cartList.removeItem(productList.getItem(${product.id}));"  class="by-btn">Удалить из корзины</button>
             </div>
        </div>`;
            block.insertAdjacentHTML('beforeend', html);
        });

    }

    //сумма всех товаров в корзине
    calcSumPrice() {
        let totalPrice = 0;
        this.goods.forEach((product) => totalPrice += product.price);
        return totalPrice;
    }
    clearCart() {} //очистить корзину
    updateCart() {} //обновить корзину
}

// class CartItem {
//     constructor(product, quantity = 1) {
//         this.title = product.title;
//         this.price = product.price;
//         this.id = product.id;
//         this.quantity = quantity;

//     }



//     render() {
//         return `<div class="cart-item" data-id="${this.id}">
//         <div class="desc">
//         <h3>${this.title}</h3>
//         <p>${this.price} \u20bd</p>
//         <p>${this.quantity} шт.</p>
//         <button onclick="cartList.removeItem(productList.getItem(${this.id}));"  class="by-btn">Удалить из корзины</button>
//          </div>
//     </div>`; 
//     }

//     //quantityChange() {} //изменить количество заказанного товара
//     //getPrice() {} //получить цену товара с учетом количества

// }
const cartList = new CartList();


document.querySelectorAll('.by-btn').forEach((item) => {
    item.addEventListener('click', function (event) {
        const elemId = event.target.closest('.product-item').getAttribute('data-id');
        console.log(elemId);

    });
});