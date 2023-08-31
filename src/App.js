import { useState } from "react";
import "./App.css";
import heart from "./assets/heart.svg";
import heartWhite from "./assets/heart-white.svg";
import check from "./assets/check.svg";
import product from "./mock/product.js";

const App = () => {
  const [wish, setWish] = useState(null);
  const [addCart, setAddCart] = useState(null);

  const handleWishlist = id => {
    setWish(id);
  };

  const handleAddToCart = product => {
    setAddCart(product);
  };

  const formatInReais = number => {
    return new Intl.NumberFormat("pt-br", {
      style: "currency",
      currency: "BRL"
    }).format(number);
  };

  const listItems = product.map((item, index) => {
    const {
      productId,
      productLink,
      productImage,
      productName,
      productListPrice,
      productBestPrice,
      productinstallmentsquantity,
      productInstallmentsValue
    } = item;
    return (
      <div key={index + productId} className={`card-product ${index + 1}`}>
        <span
          className={`wishlist ${productId === wish ? "active" : "inactive "}`}
          onClick={() => handleWishlist(productId)}
        >
          {productId === wish
            ? <img src={heartWhite} alt="heart white" />
            : <img src={heart} alt="heart" />}
        </span>
        <a className="product-link" href={productLink} title={productName}>
          <img className="product-image" src={productImage} alt={productName} />
          <div className="detail-product">
            <h2 className="product-name">
              {productName}
            </h2>
            <div className="product-price">
              <span className="list-price">
                {formatInReais(productListPrice / 100)}
              </span>
              <span className="best-price">
                {formatInReais(productBestPrice / 100)}
              </span>
              <span className="installments">
                em até{" "}
                <span className="number-installment">
                  {productinstallmentsquantity}x de{" "}
                </span>
                <span className="number-installment">
                  {formatInReais(productInstallmentsValue / 100)}
                </span>{" "}
                sem juros
              </span>
            </div>
          </div>
        </a>

        {productId === addCart
          ? <button className="add-to-cart active">
              <img src={check} alt="check" />adicionado
            </button>
          : <button
              key={index + productId}
              className="add-to-cart default"
              onClick={() => handleAddToCart(productId)}
            >
              adicionar
            </button>}
      </div>
    );
  });

  return (
    <div className="App">
      <div className="status-products">
        <span>
          {wish && `lista de desejos: ${wish}`}
        </span>
        <span>
          {addCart && `produto ${addCart} adicionado`}
        </span>
      </div>
      <div className="list-cards">
        {listItems}
      </div>
    </div>
  );
};

export default App;
