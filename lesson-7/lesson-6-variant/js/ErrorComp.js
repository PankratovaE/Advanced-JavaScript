Vue.component('error', {
    data() {
        return { 
            text: '', 
        }
    },

    methods: {
        showError(error) {
           this.text = error
            
        },
      

    },

   computed: {
	isVisible(){
		return this.text !== ''
	}
    },

    template: `<div class="center error" v-if="isVisible">
                <p>
			<button @click="showError('')">&times;</button>
			{{ text }}		
		</p>
                </div>`

});
