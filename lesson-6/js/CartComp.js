Vue.component('cart', {
    data() {
        return {
        isVisibleCart: false,
        goodsCart: [],
        cartUrl: '/getBasket.json',
        addToBasketUrl: '/addToBasket.json',
        deleteFromBasketUrl: '/deleteFromBasket.json',
        imgCart: 'https://placehold.it/50x100',
        }
    },

    methods: {
        addItem(product) {
            
            this.$parent.getJson(`${API + this.addToBasketUrl}`)
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

            this.$parent.getJson(`${API + this.deleteFromBasketUrl}`)
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

       

},


mounted(){
    
    this.$parent.getJson(`${API + this.cartUrl}`)
        .then(data => {
            for(let el of data.contents){
                this.goodsCart.push(el);
            }
        });
},

    template: `
    <div>
    <button class="cart-btn" type="button" v-on:click="isVisibleCart = !isVisibleCart">Корзина</button>

      
        <div class="cart-products" v-show="isVisibleCart">
    
            <cart-item 
            v-for="item of goodsCart" 
            :data-id="item.id_product" 
            :key="item.id_product"
            :cart-item="item"
            @remove="removeItem">
               
            </cart-item>
        </div>
        </div>`

});

Vue.component('cart-item', {
    props: ['cartItem'],
    template: `
    <div class="cart-item">
                <h3>{{ cartItem.product_name }}</h3>
                <p>{{ cartItem.price }}</p>
                <p>{{ cartItem.quantity }}</p>
                <button class="by-btn delete" @click="$root.$refs.cart.removeItem(cartItem)">Удалить из корзины</button>
            </div>
    `
});