import axios from "axios";

const API_URL = "http://localhost:5000";

const addProduct = (name,price) => {
  let data = {
    product_name: name,
    price: price
  }
  return axios.post(API_URL + "/add/product", data);
};

const editProduct = (name,price, id) => {
  let data = {
    product_name: name,
    price: price,
    id: id
  }
  return axios.post(API_URL + "/edit/product", data);
};


const deleteProduct = (id) => {
  
  return axios.delete(API_URL + "/delete/product/"+id);
};

const addToCart = (id) => {
  
  return axios.get(API_URL + "/add/product/"+id+"/cart");
};


const getProductsInCart = (id) => {
  
  return axios.get(API_URL + "/find/products/cart/" + id);
};

const findAllProduct = () => {
  return axios.get(API_URL + "/find/all/products");
};

export default {
  addProduct,
  editProduct,
  deleteProduct,
  addToCart,
  getProductsInCart,
  findAllProduct
};
