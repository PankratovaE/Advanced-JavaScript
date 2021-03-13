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
        
        this.$parent.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
               //console.log(this.products);
            });
    },

    template: `
            <div class="products">
            <product
                v-for="item of filtered"
                :key="item.id_product"
                :img="imgCatalog"
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
                <div class="product-item">
                    <img :src="img" alt="Some img">
                    <h3>{{ product.product_name }}</h3>
                    <p>{{ product.price }}</p>
                    <button class="by-btn" @click="$root.$refs.cart.addItem(product)">Купить</button>
                </div>`
});

