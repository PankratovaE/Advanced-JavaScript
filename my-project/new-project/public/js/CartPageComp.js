Vue.component('cart-page', {
 
    data() {
        return {
           productCart: [],
        }
    },

    methods: {
        quantityAdd(product) {
            let find = this.productCart.find(item => item.id_product === product.id_product);
            this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity:1});
            find.quantity++;
        },
        quantitySub(product) {
            let find = this.productCart.find(item => item.id_product === product.id_product);
             if (find.quantity > 1) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity:-1});
                find.quantity--;
            } else {
                this.$parent.deleteJson(`/api/cart/${find.id_product}`)
                    .then(data => {
                        if (data.result === 1) {
                        this.productCart.splice(this.productCart.indexOf(find), 1);
                    }
                            
                    });
                
            }
            
        },
        deleteItem(product) {
            let find = this.productCart.find(item => item.id_product === product.id_product);
            this.$parent.deleteJson(`/api/cart/${find.id_product}`)
                    .then(data => {
                        if (data.result === 1) {
                        this.productCart.splice(this.productCart.indexOf(find), 1);
                    }
                            
                    });
                
        },
        clearCart() {
            
            
                this.$parent.deleteJson(`/api/cart`)
                    .then(data => {
                        if (data.result === 1) {
                        this.productCart.splice(0, this.productCart.length);
                    }
                            
                    });
           
                            
        },
    },

    mounted() {

        this.productCart = this.$root.$refs.cart.goodsCart;
    },

    template: `
    <div>
      
        
            <div class="page-cart__products">
                <cart-page-item
                v-for="item of productCart"
                :data-id="item.id_product"
                :key="item.id_product"
                :img="item.image"
                :cart-page-item="item"
                @deleteItem="deleteItem"
                @quantityAdd="quantityAdd"
                @quantitySub="quantitySub"
                @clearCart="clearCart">
                
                </cart-page-item>
            </div>
            <div class="cart__products__item empty-cart__text" v-if="productCart.length == 0"> Корзина пуста </div>
            <div class="cart__buttons">
                <a href="#" class="cart__button cart__buttons-mr" @click="clearCart()">CLEAR SHOPPING CART</a>
                <a href="index.html" class="cart__button">CONTINUE SHOPPING</a>
            </div>
        
    </div>` 

});


Vue.component('cart-page-item', {
    props: ['cartPageItem', 'img'],
    template:`
    <div class="cart__products__item">
                    <img :src="img" alt="photo" class="cart__item__img">
                    <div class="cart__item__info">
                        <div class="info__heading">
                            <a href="index.html" class="info__heading_text">{{ cartPageItem.product_name }}</a>
                            <button class="button__close" type="button">
                                <img class="button__img" src="img/close.svg" alt="close" @click="$emit('deleteItem', cartPageItem)">
                            </button>
                        </div>
                        <div class="info__param">
                            <p>Price: <span class="info__param-color">$ {{ (cartPageItem.price * cartPageItem.quantity).toFixed(2) }}</span></p>
                            <p>Color: {{ cartPageItem.color }}</p>
                            <div class="quantity">
                            <p>Quantity: {{ cartPageItem.quantity }}</p>
                            <div class="quantity__buttons">
                            <button class="ch-quantity__button" @click="$emit('quantitySub', cartPageItem)"> - </button>
                            <button class="ch-quantity__button" @click="$emit('quantityAdd', cartPageItem)"> + </button>
                            </div>
                            </div>
                         
                        </div>
                    </div>
    </div>
    `
});