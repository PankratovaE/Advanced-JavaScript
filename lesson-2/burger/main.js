class Burger {
    constructor(size, filling, topping) {
        this.size = size;
        this.filling = filling;
        this.topping = topping;

    }

    getSize() {
        return this.size;
    } // Узнать размер гамбургера
    getFilling() {
        return this.filling;
    } // Узнать начинку гамбургера
    getToppingPrice() {
        let toppingPrice = 0;
        this.topping.forEach((item) => toppingPrice += item.getPrice());
        return toppingPrice;
    }
    getToppingEnergy() {
        let toppingEnergy = 0;
        this.topping.forEach((item) => toppingEnergy += item.getEnergy());
        return toppingEnergy;
    }
    getPrice() {

        return this.size.getPrice() + this.filling.getPrice() + this.getToppingPrice();
    } // Узнать цену
    getEnergy() {

        return this.size.getEnergy() + this.filling.getEnergy() + this.getToppingEnergy();
    } // Узнать калорийность

}


class Param {
    constructor(price, energy) {
        this.price = price;
        this.energy = energy;
    }
    getPrice() {
        return +(this.price);
    }
    getEnergy() {
        return +(this.energy);
    }
}

function clearField(field) {
    return document.querySelector(field).innerHTML = '';
}

document.querySelector('.button').addEventListener('click', function (event) {

    clearField('.totalPrice');
    clearField('.totalEnergy');

    const size = new Param(document.querySelector('input[name="size"]:checked').getAttribute("data-price"),
        document.querySelector('input[name="size"]:checked').getAttribute("data-energy"));

    const filling = new Param(document.querySelector('input[name="filling"]:checked').getAttribute("data-price"),
        document.querySelector('input[name="filling"]:checked').getAttribute("data-energy"));

    const topping = Array.from(document.querySelectorAll('input[name="topping"]:checked'))
        .map((item) => new Param(item.getAttribute('data-price'), item.getAttribute('data-energy')));

    const burger = new Burger(size, filling, topping);

    document.querySelector('.totalPrice').insertAdjacentHTML('afterbegin', burger.getPrice());
    document.querySelector('.totalEnergy').insertAdjacentHTML('afterbegin', burger.getEnergy());

});