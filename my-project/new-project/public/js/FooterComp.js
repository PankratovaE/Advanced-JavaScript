Vue.component('myfooter', {
    template: `
    <div>
<div class="footer__top center">
    
</div>
<div class="subscribe center">
    <div class="subscribe__photo">
        <img src="img/photo.png" alt="photo">
        <p class="subscribe__phrase">“Vestibulum quis porttitor dui! Quisque viverra nunc mi, a pulvinar
           purus condimentum“</p>
    </div>
    <div class="subscribe__form">
        <p class="subscribe__heading">SUBSCRIBE</p>
        <p class="subscribe__text">FOR OUR NEWLETTER AND PROMOTION</p>
        <form class="subscribe__submit" action="#">

            <input class="input__email" type="email" placeholder="Enter Your Email" required
                pattern="\S+@[a-z]+.[a-z]+">
            <button class="subscribe__button footer__top_text" type="submit">Subscribe</button>
        </form>

    </div>
</div>
<div class="footer__bottom center">
    <div class="footer__bottom_left">
        <p class="footer__bottom_text">© 2021 Brand All Rights Reserved.</p>
    </div>

    <div class="footer__bottom_right">

        <a class="facebook" href="#">
            <div class="icon facebook__img"></div>
        </a>
        <a class="instagram" href="#">
            <div class="icon instagram__img"></div>
        </a>
        <a class="pinterest" href="#">
            <div class="icon pinterest__img"></div>
        </a>
        <a class="twitter" href="#">
            <div class="icon twitter__img"></div>
        </a>
    </div>

</div>
</div>
    
    `
})




