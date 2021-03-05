const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        imgCatalog: 'https://placehold.it/200x150',
        addToBasketUrl: '/addToBasket.json',
        deleteFromBasketUrl: '/deleteFromBasket.json',
        products: [],
        goodsCart: [],
        isHiddenProducts: false,
        isVisibleCart: false,
        notFound: false,
        search: '',
        filtered: [],
    },
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        addItem(product) {
           
            this.getJson(`${API + this.addToBasketUrl}`)
            .then(data => {
                if (data.result === 1) {
                    let productId = product.id_product;
                    let find = this.goodsCart.find(product => product.id_product === productId);
                    if (find) {
                        find.quantity++;
                       
                    } else {
                    let productCart = {
                            id_product: productId,
                            price: product.price,
                            product_name: product.product_name,
                            quantity: 1
                    };
    
                        this.goodsCart.push(productCart);
                       
                    }
                            
                }
            })
        },

       
        removeItem(product) {

            
            this.getJson(`${API + this.deleteFromBasketUrl}`)
            .then(data => {
                if (data.result === 1) {
                    let productId = product.id_product;
                    let find = this.goodsCart.find(product => product.id_product === productId);
                    if (find.quantity > 1) {
                        find.quantity--;
                        
                    } else {
                        this.goodsCart.splice(this.goodsCart.indexOf(find), 1);
                    }
                            
                }
            })

        },

        filter(value) {

            this.isHiddenProducts = true;

            let str = value.search;
            const regexp = new RegExp(str, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
           

            if (this.filtered.length == 0) { 
                this.notFound = true;
            } else { this.notFound = false;}

        },

    },
    beforeCreate() {
        console.log('beforeCreate');
    },
    created() {
        console.log(this.filtered.length);
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                }
            });
    }
    // beforeMount() {
    //     console.log('beforeMount');
    // },
    // mounted() {
    //     console.log('mounted');
    // },
    // beforeUpdate() {
    //     console.log('beforeUpdate');
    // },
    // updated() {
    //     console.log('updated');
    // },
    // beforeDestroy() {
    //     console.log('beforeDestroy');
    // },
    // destroyed() {
    //     console.log('beforeDestroy');
    // }
});