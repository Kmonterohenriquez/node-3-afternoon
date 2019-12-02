require('dotenv').config();
const   express = require('express'),
        massive = require('massive'),
        products_ctrl = require('./products_ctrl');

const app = express();

const { SERVER_PORT, CONNECTION_STRING } = process.env;
app.use(express.json());

massive(CONNECTION_STRING)
    .then( res =>{
        app.set('db', res);
    })
    .catch( err => console.log(err))

app.post('/api/products', products_ctrl.create);
app.get('/api/products/', products_ctrl.getAll);
app.get('/api/products/:id', products_ctrl.getOne);
app.put('/api/products/:id', products_ctrl.update);
app.delete("/api/products/:id", products_ctrl.delete);

app.listen(SERVER_PORT, () => {
    console.log(`Server listening on port ${SERVER_PORT}`)
});

