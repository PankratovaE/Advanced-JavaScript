class ProductList {
       #goods;
       #allProducts;

    constructor(container = '.products') {
        this.container = container;
        this.#goods = [];
        this.#allProducts = [];

        this.#fetchGoods();
        this.#render();
    }

    #fetchGoods() {
        this.#goods = [
            {id: 1, title: 'Notebook', price: 20000, imageUrl: "https://picsum.photos/seed/4/200"},
            {id: 2, title: 'Mouse', price: 1500, imageUrl: "https://picsum.photos/seed/5/200"},
            {id: 3, title: 'Keyboard', price: 5000, imageUrl: "https://picsum.photos/seed/6/200"},
            {id: 4, title: 'Gamepad', price: 4500, imageUrl: "https://picsum.photos/seed/7/200"},
        ];
    }

    #render() {
        const block = document.querySelector(this.container);

        this.#goods.forEach((product) => {
            const productObject = new ProductItem(product);
            this.#allProducts.push(productObject);
            block.insertAdjacentHTML('beforeend', productObject.render());
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
}

class ProductItem {
    constructor(product) {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.imageUrl = product.imageUrl; 
    }

    render() {
        return `<div class="product-item" data-id="${this.id}">
                <h3 class="heading">${this.title}</h3>
                <img src = ${this.imageUrl}>
                <p class="price-text">${this.price}</p>
                <button class="by-btn">Добавить в корзину</button>
              </div>`;
    }
}

const productList = new ProductList();
console.log(productList.getTotalPriceWithDiscount());


class Cart {
    constructor() {
        this.isEmpty = true;
        this.goods = [];
    }
    getItem() {} //Получить товар, который нужно добавить в корзину
    addItem() {} //добавить товар в корзину
    removeItem() {} //удалить товар
    render() {} 
    calcSumPrice() {} //сумма всех товаров в корзине
    clearCart() {} //очистить корзину
    updateCart() {} //обновить корзину
}

class CartItem {
    constructor (title, price) {
        this.title = title;
        this.price = price;
        this.quantity = 1;
    }
    
    render() {}
    quantityChange() {} //изменить количество заказанного товара
    getPrice() {} //получить цену товара с учетом количества
    
}