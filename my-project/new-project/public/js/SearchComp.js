Vue.component('search', {
    
    data() {
        return {
            search: '',
            img: 'img/search.svg',         
        }
    },
    
    template: `
            <div class="search">
            <form action="#" class="search-form" @submit.prevent="$root.$refs.products.filter(search)">
                <input type="text" class="search-field"  v-model="search">
                <button class="btn-search" type="submit">
                   <img class="header__img_search" :src='img' alt='search image'>
                </button>
            </form>
            </div>`
});
