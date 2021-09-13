express = require('express');
const dotenv = require('dotenv');
const productRouters = require ('./controllers/product_list/productRouters');
const cartRouters = require ('./controllers/cart/cartRouters');
const cors = require('cors');

dotenv.config();
app = express();

app.use(productRouters);
app.use(cartRouters);

app.use(cors());

app.listen(process.env.APP_PORT || 3000, () =>
  console.log('Example app listening on port ' + process.env.APP_PORT),
);