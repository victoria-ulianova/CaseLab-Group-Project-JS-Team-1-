import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import OrderItem from "../OrderItem/OrderItem";
import "./OrderList.css";

function OrderList() {
  const orderListValue = useSelector((state: RootState) => state.orderList);
  let setOrderList;
  let sumOrderList: number = 0;
  //@ts-expect-error
  if (orderListValue.length === 0) {
    setOrderList = (
      <div className="emptyCart">
        Ваша корзина пуста. Добавьте в нее что-нибудь!
      </div>
    );
  } else {
    //@ts-expect-error
    setOrderList = orderListValue.map(function (item) {
      sumOrderList +=
        Number(item.orderItem.price) * item.orderItem.productQuantity;
      return <OrderItem {...item} />;
    });
  }
  return (
    <div className="OrderList">
      {setOrderList}
      <div className="summary">
        <div className="summaryText">Итого:</div>
        <div className="summaryOrder">{sumOrderList} руб</div>
      </div>
    </div>
  );
}

export default OrderList;
