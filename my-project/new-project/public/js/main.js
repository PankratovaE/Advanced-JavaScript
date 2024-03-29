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

        postJson(url, data) {
            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(result => result.json())
            .catch(error => {
                this.$refs.error.showError(error);
            });
        },

        putJson(url, data) {
            return fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(result => result.json())
            .catch(error => {
                this.$refs.error.showError(error);
            });
        },

        deleteJson(url) {
            return fetch(url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                },
            }).then(result => result.json())
              .catch(error => {
                  this.$refs.error.showError(error);
              });
        },

    },
    
});
