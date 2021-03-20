Vue.component('products', {
    data() {
        return {
            catalogUrl: '/catalogData.json',
            imgCatalog: 'https://placehold.it/200x150',
            products: [],
            filtered: [],


        }
    },

    methods: {
        filter(search) {

            const regexp = new RegExp(search, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));

        },

    },

    mounted() {

        this.$parent.getJson('/api/products')
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
                //console.log(this.products);
            });
    },

    template: `
            <div class="center featured__catalog">
            <product
                v-for="item of filtered"
                :key="item.id_product"
                :img="item.image"
                :product="item"
                
                >
            </product>
            </div> `

});

Vue.component('product', {
    props: ['product', 'img'],
    data() {
        return {
            cartAPI: this.$root.$refs.cart,
        }
    },
    template: `
            <div class="featured__item">
                <img class="featured__img" :src="img" alt="photo">
                                    
                    <button class="item__add item__add_text" @click="$root.$refs.cart.addItem(product)">Add to Cart</button>
                            
                <div class="featured__describe">
                    <a class="featured__heading_mini" href="#">{{ product.product_name }}</a>
                    <p class="featured__text_mini">{{ product.text }}</p>
                    <h4 class="featured__price">$ {{ product.price }}</h4>
                </div>
            </div>`
});