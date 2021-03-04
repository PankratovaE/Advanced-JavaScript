/*Дан большой текст, в котором для оформления прямой речи используются одинарные кавычки.
 Придумать шаблон, который заменяет одинарные кавычки на двойные.*/


const text = `One: 'Hi Mary.' Two: 'Oh, hi.'
One: 'How are you doing?'
Two: 'I'm doing alright. How about you?'
One: 'Not too bad. The weather is great isn't it?'
Two: 'Yes. It's absolutely beautiful today.'
One: 'I wish it was like this more frequently.'
Two: 'Me too.'
One: 'So where are you going now?'
Two: 'I'm going to meet a friend of mine at the department store'
One: 'Going to do a little shopping?'
Two: 'Yeah, I have to buy some presents for my parents.'
One: 'What's the occasion?'
Two: 'It's their anniversary.'
One: 'That's great. Well, you better get going. You don't want to be late.'
Two: 'I'll see you next time.'
One: 'Sure.' Bye.'`;

let text2 = text.replace(/'/g, '"');

console.log(text2);

//Улучшить шаблон так, чтобы в конструкциях типа aren't одинарная кавычка не заменялась на двойную.

let text3 = text.replace(/\B'/g, '"');
console.log(text3);

/** Создать форму обратной связи с полями: Имя, Телефон, E-mail, текст, кнопка Отправить. При нажатии на кнопку Отправить произвести валидацию полей следующим образом:
a.  Имя содержит только буквы. 
b.  Телефон имеет вид +7(000)000-0000. 
c.  E-mail имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru. 
d.  Текст произвольный.
e.  Если одно из полей не прошло валидацию, необходимо выделить это поле красной рамкой и сообщить пользователю об ошибке.*/

const nameRegExp = /[a-zA-Z]/;
const phoneRegExp = /\+\d\(\d{3}\)\d{3}\-\d{4}/;
const emailRegExp = /^([a-z]+[.-]?[a-z]+)@([a-z]+)\.([a-z]{2,4})$/;

function isValidData(field, regExp) {
    let value = field.value;
    
    if (regExp.test(value)) {
       return;
        
    } else {
        field.classList.add('notValid');
        const block = document.querySelector('.message');       
        block.insertAdjacentHTML
        ('afterbegin',`Неверный формат данных в поле ${field.name} <br>`);
    }

}

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    isValidData(document.querySelector('#name'), nameRegExp);
    isValidData(document.querySelector('#phone'), phoneRegExp);
    isValidData(document.querySelector('#email'), emailRegExp);
   
});