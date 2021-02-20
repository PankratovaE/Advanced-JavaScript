const products = [
    {id: 1, title: 'Notebook', price: 20000, imageUrl: "https://picsum.photos/seed/4/200"},
    {id: 2, title: 'Mouse', price: 1500, imageUrl: "https://picsum.photos/seed/5/200"},
    {id: 3, title: 'Keyboard', price: 5000, imageUrl: "https://picsum.photos/seed/6/200"},
    {id: 4, title: 'Gamepad', price: 4500, imageUrl: "https://picsum.photos/seed/7/200"},
];




const renderProduct = (title = 'Some product', price = 1000, imageUrl = 'no image') => {
    
    return `<div class="product-item">
                <h3 class="heading">${title}</h3>
                <img src = ${imageUrl}>
                <p class="price-text">${price}</p>
                <button class="by-btn">Добавить в корзину</button>
              </div>`;
             
}

const renderProducts = (list) => {
    let str = '';
    const productList = list.forEach((item) => {
        //console.log(item.title, item.price);
        return str += renderProduct(item.title, item.price, item.imageUrl);
    });
    document.querySelector('.products').innerHTML = str;
    //console.log(productList);
    //document.querySelector('.products').innerHTML = productList;
}

renderProducts(products);
/* 3.  Запятые были потому, что на экран выводились элементы массива productList, который
получился в результате работы метода map. Чтобы сделать вывод без запятых, можно использовать
метод forEach и собирать все  в одну строку.*/