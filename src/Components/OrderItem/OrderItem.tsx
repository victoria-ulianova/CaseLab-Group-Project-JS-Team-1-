import React from "react";
import { useDispatch } from "react-redux";
import { OrderList } from "../../typescript/main";
import { removeOrderItemAction } from "../../store/orderListReducer";
import "./OrderItem.css";
import {
  increaseOrderItemAction,
  decreaseOrderItemAction,
} from "../../store/orderListReducer";

function OrderItem({
  idOrderItem,
  orderItem,
}: {
  idOrderItem: number;
  orderItem: OrderList;
}) {
  const dispatch = useDispatch();
  const counter = +orderItem.productQuantity;

  const price = +orderItem.price;

  const sum = price * counter;

  function increaseOrderItem() {
    dispatch(increaseOrderItemAction(idOrderItem));
  }

  function decreaseOrderItem() {
    dispatch(decreaseOrderItemAction(idOrderItem));
  }

  function deleteFromCart() {
    dispatch(removeOrderItemAction(idOrderItem));
  }
  const ingredientChanged = orderItem.ingrediantList?.map((item) => {
    return (
      <span className="ingredientTitleQty">
        {item.ingredTitle}: {item.newIngredQuantity}
      </span>
    );
  });
  return (
    <div className="OrderItem">
      <div className="productDescription">
        <p className="productName">{orderItem.title}</p>
        <p className="ingredientName">{ingredientChanged}</p>
      </div>
      <div className="actionMenu">
        <div className="addDeleteButton">
          <a onClick={decreaseOrderItem}> - </a>
        </div>
        <div className="productQuantity">{counter}</div>
        <div className="addDeleteButton">
          <a onClick={increaseOrderItem}> + </a>
        </div>
        <div className="totalPrice">{sum} руб</div>
        <div className="deleteButton" onClick={deleteFromCart}>
          <img
            src={require("./deleteImage.png")}
            alt="удалить товар"
            className="deleteButton"
            onClick={deleteFromCart}
          />
        </div>
      </div>
    </div>
  );
}

export default OrderItem;
