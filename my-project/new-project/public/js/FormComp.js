Vue.component('cart-form', {
    data() {
        return {
            errors: [],
            users: [],
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            isUserExist: false,
            
        }
        },
    methods: {
        checkForm(e) {
                this.errors = [];

            if (!this.firstName) {
                this.errors.push('Укажите имя.');
              } else if (!this.validName(this.firstName)) {
                  this.errors.push('Имя должно состоять только из букв.')
              };

            if (!this.lastName) {
            this.errors.push('Укажите фамилию.');
            } else if (!this.validName(this.lastName)) {
                this.errors.push('Фамилия должна состоять только из букв.')
            };

            if (!this.email) {
            this.errors.push('Укажите электронную почту.');
            } else if  (!this.validEmail(this.email)) {
                this.errors.push('Укажите корректный адрес электронной почты.');
            }

            if (!this.phone) {
                this.errors.push('Укажите номер телефона.');
                } else if  (!this.validPhone(this.phone)) {
                    this.errors.push('Укажите корректный номер телефона.');
                }

            if (!this.errors.length) {
                this.addUser(this.firstName, this.lastName, this.email, this.phone);
              }

              e.preventDefault();
        
        },

        validEmail(email) {
            let regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return regExp.test(email);
        },

        validName(name) {
            let regExp = /[a-zA-Z]/;
            return regExp.test(name);
        },
        
        validPhone(phone) {
            let regExp = /\+\d\(\d{3}\)\d{3}\-\d{4}/;
            return regExp.test(phone);
        },

        addUser(firstName, lastName, email, phone) {
            this.isUserExist = false;
            this.findUser(this.email, this.phone).then(data => {
                
                
                if (data.result) {
                    //console.log('зашли в if' + find);
                    let user = {
                        "firstName": firstName,
                        "lastName": lastName,
                        "email": email,
                        "phone": phone
                    };
    
                    this.$parent.postJson('/api/users', user)
                    .then(data => {
                        if (data.result === 1) {
                            this.users.push(user);
                            //console.log('User has been created');
                        }
                    })
                   
                } else {
                    this.isUserExist = true;
                    //console.log(this.isUserExist); //true
                }
            }) ;
            
            
           
            
        },

        findUser(email, phone) {
            //console.log('зашли в поиск польз' );
            return this.$parent.putJson(`/api/users/${email}/${phone}`);
            
        },

       
    },

    template: `
            <form class="cart__form cart__form-ml"
            @submit="checkForm"
            novalidate="true">
                
            <p class="content__text">Your name</p>
            <input class="cart__form__input  cart__form__input-mtb" type="text" placeholder="First Name" v-model="firstName" name="firstName" id="firstName">
            <input class="cart__form__input cart__form__input-mtb" type="text" placeholder="Last Name" v-model="lastName" name="lastName" id="lastName">
           
            <p class="content__text">Login details</p>
            <input class="cart__form__input cart__form__input-mtb" type="text" placeholder="Email" v-model="email" name="email" id="email">
            <input class="cart__form__input cart__form__input-mtb" type="text" placeholder="+7(000)000-0000" v-model="phone" name="phone" id="phone">
            
                <p class="form__error" v-if="errors.length">
                    Пожалуйста, исправьте ошибки:
                    <ul>
                        <li v-for="error in errors">{{ error }}</li>
                    </ul>
                </p>
                <p class="form__error" v-if="isUserExist">
                Пользователь с таким телефоном (или почтой) уже существует
                </p>

            <input type="submit" value="JOIN NOW" class="cart__button cart__form__join-now">

        
            </form>`
})