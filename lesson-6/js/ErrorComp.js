Vue.component('error', {
    data() {
        return { 
            isVisibleError: false, 
        }
    },

    methods: {
        showError() {
            //console.log('зашли в ошибку error');
            isVisibleError = true;
            //console.log(isVisibleError);
            return isVisibleError;
            
        },
      

    },

    beforeDestroy() {
        isVisibleError = false;
            },

    template: `<div class="center error" v-show="{isVisibleError}">
                <p>Нет соединения с сервером</p>
                </div>`

});