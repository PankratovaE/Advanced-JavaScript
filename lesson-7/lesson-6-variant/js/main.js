const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    
    methods: {
       
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    // console.log('зашли в ошибку main');
                    this.$refs.error.showError(error);
                })
        },
    },
    
});
