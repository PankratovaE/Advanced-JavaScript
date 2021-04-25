const express = require('express');
const fs = require('fs');

const app = express();

/**
 * Активируем мидлвары
 */
app.use(express.json()); // Даем знать приложению, что работаем с json'ом
app.use('/', express.static('./public/')); // запросы в корень нашего сайт отдают содержимое public

/**
 * API Каталога
 */
app.get('/api/products', (req, res) => {
  fs.readFile('./server/db/products.json', 'utf-8', (err, data) => {
    if (err) {
      res.send(JSON.stringify({result: 0, text: err}));
    } else {
      res.send(data);
    }
  });
});

/**
 * API Корзины
 */
app.get('/api/cart', (req, res) => {
  fs.readFile('./server/db/userCart.json', 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({result: 0, text: err}));
    } else {
      res.send(data);
    }
  });
});

// Добавление нового товара в корзине
app.post('/api/cart', (req, res) => {
  fs.readFile('./server/db/userCart.json', 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({result: 0, text: err}));
    } else {
      // парсим текущую корзину
      const cart = JSON.parse(data);
      // добавляем новый товар
      cart.contents.push(req.body);
      // пишем обратно
      fs.writeFile('./server/db/userCart.json', JSON.stringify(cart), (err) => {
        if (err) {
          res.send('{"result": 0}');
        } else {
          res.send('{"result": 1}');
        }
      })
    }
  });
});

// Добавление нового пользователя
app.post('/api/users', (req, res) => {
  fs.readFile('./server/db/users.json', 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({result: 0, text: err}));
    } else {
      // парсим текущих пользователей
      const users = JSON.parse(data);
      // добавляем нового покупателя
      users.push(req.body);
      // пишем обратно
      fs.writeFile('./server/db/users.json', JSON.stringify(users), (err) => {
        if (err) {
          res.send('{"result": 0}');
        } else {
          res.send('{"result": 1}');
        }
      })
    }
  });
});

// Изменяем количество товара
app.put('/api/cart/:id', (req, res) => {
  fs.readFile('./server/db/userCart.json', 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({result: 0, text: err}));
    } else {
      // парсим текущую корзину
      const cart = JSON.parse(data);
      // ищем товар по id
      const find = cart.contents.find(el => el.id_product === +req.params.id);
      // изменяем количество
      find.quantity += req.body.quantity;
      // пишем обратно
      fs.writeFile('./server/db/userCart.json', JSON.stringify(cart), (err) => {
        if (err) {
          res.send('{"result": 0}');
        } else {
          res.send('{"result": 1}');
        }
      })
    }
  });
});


// Ищем пользователя
app.put('/api/users/:email/:phone', (req, res) => {
  fs.readFile('./server/db/users.json', 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({result: 0, text: err}));
    } else {
      // парсим users
      const users = JSON.parse(data);
      // ищем пользователя по телефону или почте
      const findEmail = users.find(el => el.email === req.params.email);
      const findPhone = users.find(el => el.phone === req.params.phone);
        //console.log(findEmail);
        //console.log(findPhone);
      
        if (findEmail || findPhone) {
          res.send('{"result": 0}');
          //console.log('найдено');
        } else {
          res.send('{"result": 1}');
          //console.log('ничего не найдено');
        }
      
    }
  });
});

// Удаление товара из корзины
app.delete('/api/cart/:id', (req, res) => {

  fs.readFile('./server/db/userCart.json', 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({result: 0, text: err}));
    } else {
      // парсим текущую корзину
      const cart = JSON.parse(data);
      
      // ищем товар по id
       const find = cart.contents.find(el => el.id_product === +req.params.id);
      // удаляем товар
     
       cart.contents.splice(cart.contents.indexOf(find), 1);
      
      //пишем обратно
      fs.writeFile('./server/db/userCart.json', JSON.stringify(cart), (err) => {
        if (err) {
          res.send('{"result": 0}');
        } else {
          res.send('{"result": 1}');
        }
      })
    }
  });
});

app.delete('/api/cart', (req, res) => {

  fs.readFile('./server/db/userCart.json', 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({result: 0, text: err}));
    } else {
      // парсим текущую корзину
      const cart = JSON.parse(data);
      
      
      // удаляем товар
     
       cart.contents.splice(0, cart.contents.length);
     
      //пишем обратно
      fs.writeFile('./server/db/userCart.json', JSON.stringify(cart), (err) => {
        if (err) {
          res.send('{"result": 0}');
        } else {
          res.send('{"result": 1}');
        }
      })
    }
  });
});



/**
 * Запуск сервера
 * @type {string|number}
 */
// const port = process.env.PORT || 3000;
const port = 3000; // чтобы не смущало process.env.PORT (если не стартует на 3000, то меняем на другой 8080 или 8888)
  app.listen(port, () => {
  console.log(`Listening ${port} port`);
});
