Vue.component('cart', {
    data() {
        return {
        isVisibleCart: false,
        isVisibleCartPage: false,
        goodsCart: [],
       
        }
    },

    methods: {
        addItem(product) {
            let find = this.goodsCart.find(el => el.id_product === product.id_product);
                if (find) {
                    this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity:1});
                    find.quantity++;
                } else {
                    let prod = Object.assign({quantity: 1}, product);
                    this.$parent.postJson('/api/cart', prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.goodsCart.push(prod);
                        }
                    });
                }
            }, 
               
        removeItem(product) {
            
            let find = this.goodsCart.find(item => item.id_product === product.id_product);
                if (find.quantity > 1) {
                    this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity:-1});
                    find.quantity--;
                } else {

                this.$parent.deleteJson(`/api/cart/${find.id_product}`)
                    .then(data => {
                        if (data.result === 1) {
                        this.goodsCart.splice(this.goodsCart.indexOf(find), 1);
                    }
                            
                    });
                }
        },

       

},


mounted(){
    
    this.$parent.getJson('/api/cart')
        .then(data => {
            for(let el of data.contents){
                this.goodsCart.push(el);
            }
        });

        console.log(this.goodsCart);
},

    template: `
        <div>
            <button class="cart-btn header__cart" type="button" v-on:click="isVisibleCart = !isVisibleCart"><img class="header__cart" src="img/cart.svg" alt=""></button>
            
            <div class="cart__products" v-show="isVisibleCart">
        
                <cart-item 
                v-for="item of goodsCart" 
                :data-id="item.id_product" 
                :key="item.id_product"
                :cart-item="item"
                @remove="removeItem">
                
                </cart-item>

                <a href="shopping_cart.html" class="cart__link cart__button" v-on:click="isVisibleCartPage">Перейти в корзину</a>
            </div>
         </div>` 

});

Vue.component('cart-item', {
    props: ['cartItem'],
    template: `
    <div class="cart__item">
                <div class="cart__item_bio">
                <h3>{{ cartItem.product_name }}</h3>
                <p>Price: $ {{ (cartItem.price * cartItem.quantity).toFixed(2) }}</p>
                <p>Quantity: {{ cartItem.quantity }}</p>
                </div>
                <button class="cart__button delete" @click="$root.$refs.cart.removeItem(cartItem)">Удалить</button>
            </div>
    `
});

