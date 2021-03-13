Vue.component('cart', {
    data() {
        return {
        isVisibleCart: false,
        goodsCart: [],
        cartUrl: '/getBasket.json',
        imgCart: 'https://placehold.it/50x100',
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