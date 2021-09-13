import React, { useState, useRef, useEffect } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/product.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const vname = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The product must be between 3 and 20 characters.
      </div>
    );
  }
};

const vprice = value => {
  if (value == undefined || value == null || value == "" || value <= 0) {
    return (
      <div className="alert alert-danger" role="alert">
        Invalid Price
      </div>
    );
  }
};


const Product = props => {
  const form = useRef();
  const checkBtn = useRef();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [itemId, setItemId] = useState(-1);
  const [cartList, setCartList] = useState([]);
  const [total, setTotal] = useState(0);
  const [productList, setProductList] = useState([]);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeName = e => {
    setName(e.target.value);
  };

  const onChangePrice = e => {
    setPrice(e.target.value);
  };
  useEffect(() => {
    findAll();

  }, []);

  const findAll = () => {
    AuthService.findAllProduct().then((res) => {

      setProductList(res.data);
    })
      .catch(() => {
        setProductList([]);
      });


  }

  const cartProduct = id => {
    AuthService.addToCart(id).then((res) => {
      alert(res.data.message);
      let product = productList.filter(p => {
        return p.id == id;
      });
      setCartList([...cartList, product[0]])
      var sum = 0;
      for (let list of cartList) {
        sum += list.price;
      }
      setTotal(sum)
    }).catch(() => {
      alert("Unable to add Product to cart");
    })
  }
  //DARK #96c7ff
  //Light #c7dcff

  const editProduct = id => {

    let product = productList.filter(p => {
      return p.id == id;
    });

    setName(product[0].product_name);
    setPrice(product[0].price);
    setItemId(product[0].id);
  }
  const deleteProduct = id => {
    AuthService.deleteProduct(id).then((res) => {
      alert(res.data.message);
      findAll();
    }).catch(() => {
      alert("Unable to Delete Product");
    })
  }
  const handleRegister = e => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      if (itemId == -1) {
        AuthService.addProduct(name, price).then(
          response => {
            setMessage(response.data.message);
            setSuccessful(true);
          },
          error => {
            setMessage("Error registering product!");
            setSuccessful(false);
          }
        );
      } else {
        AuthService.editProduct(name, price, itemId).then(
          response => {
            setMessage(response.data.message);
            setSuccessful(true);
            findAll()
            setItemId(-1)
          },
          error => {
            setMessage("Error updating product!");
            setSuccessful(false);
          }
        );
      }

    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <h3>Register/Update Product Here!</h3>
        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div className="container">
              <div className="row">
                <div className="col-md-4 form-group">
                  <label htmlFor="name" class="left">Product Name:</label>
                  <Input
                    type="text"
                    placeholder="Enter Name"
                    className="form-control"
                    name="name"
                    value={name}
                    onChange={onChangeName}
                    validations={[required, vname]}
                  />
                </div>

                <div className="col-md-4 form-group">
                  <label htmlFor="price" class="left">Price:</label>
                  <Input
                    type="number"
                    className="form-control"
                    placeholder="Enter Price"
                    name="price"
                    value={price}
                    onChange={onChangePrice}
                    validations={[required, vprice]}
                  />
                </div>
                <div className="col-md-4 mt-5 form-group">
                  <button className="btn btn-primary btn-block">Add</button>
                </div>

              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
      <div>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              productList.map((product, i) => {
                return <tr key={product.id}>
                  <td>{product.product_name}</td>
                  <td>{product.price}$</td>
                  <td>
                    <button className="btn btn-primary mr-1" onClick={() => editProduct(product.id)}>Edit</button>
                    <button className="btn btn-primary mr-1" onClick={() => deleteProduct(product.id)}>Delete</button>
                    <button className="btn btn-primary mr-1" onClick={() => cartProduct(product.id)}>Add to Cart</button>
                  </td>
                </tr>
              })
            }

          </tbody>
        </table>
      </div>
      <hr />
      <h3>Your Cart</h3>
      <div>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {
              cartList.map((cart, i) => {
                return <tr key={i}>
                  <td>{cart.product_name}</td>
                  <td>{cart.price}$</td>
                </tr>
              })
            }
            <tr>
              <td>Total</td>
              <td>{total}</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Product;
