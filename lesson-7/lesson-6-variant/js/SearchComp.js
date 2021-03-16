Vue.component('search', {
    
    data() {
        return {
            search: '',
                      
        }
    },
    
    template: `
            <div>
            <form action="#" class="search-form" @submit.prevent="$root.$refs.products.filter(search)">
                <input type="text" class="search-field"  v-model="search">
                <button class="btn-search" type="submit">
                   Найти
                </button>
            </form>
            </div>`
});
