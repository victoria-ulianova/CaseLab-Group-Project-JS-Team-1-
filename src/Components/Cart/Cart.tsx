import "./Cart.css";
import "../Modal/Modal.css";
import { useDispatch, useSelector } from "react-redux";
import { setMenuAction } from "../../store/menuReducer";
import { store } from "../../store/store";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import OrderList from "../OrderList/OrderList";
import {RootState} from '../../store/store';
import {clearOrderItemAction} from '../../store/orderListReducer'


function Cart() {
  const dispatch = useDispatch();
  const [modalContent, setModalContent] = useState<ReactNode>();

  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const clientOrder = useSelector((state: RootState) => state.orderList)

  const modal_backdrop = useCallback((div: HTMLDivElement) => {
    if (div === null)
      return;
    div.onclick = event => {
      if (event.target !== div)
        return;
      //@ts-expect-error
      if (store.getState().orderList.length)
        dispatch(setMenuAction("main"))
      setModalContent(undefined);
    };
  }, []);

  const form = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (!form.current)
      return;
    form.current.onsubmit = (event) => {
      event.preventDefault();
      //@ts-expect-error
      if (store.getState().orderList.length) {
        setModalContent(<h2>Спасибо за заказ!</h2>);
        console.log(Object.fromEntries(new FormData(form.current!)));
      } else {
        setModalContent(<p><h2>Корзина пуста. Заказ не оформлен.</h2></p>);
      }
    };
    form.current.querySelectorAll('input').forEach(input => Object.assign(input, {
      oninvalid(this: HTMLInputElement) {
        this.setCustomValidity('');
        if (!this.validity.valid && this.dataset.validationError)
          this.setCustomValidity(this.dataset.validationError);
      },
      oninput(this: HTMLInputElement) {
        this.setCustomValidity('');
      }
    }));
  }, []);

  function handleSubmit(event: any){
    event.preventDefault();
    //@ts-expect-error
    if(clientOrder.length === 0) {
      return
    }
    const newOrder = {
      clientName: clientName,
      clientPhone: clientPhone,
      clientOrder: []
    };
    //@ts-expect-error
    clientOrder.forEach(item => {
      //@ts-expect-error
      newOrder.clientOrder = [...newOrder.clientOrder, JSON.stringify(item.orderItem)]
    })
      fetch('https://caselab-group-1.herokuapp.com/newOrder', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newOrder),
      });
      dispatch(clearOrderItemAction());
  }

  return <>
    <div className="Cart">
      <div className="orderItem">
        <OrderList/>
      </div>
      <form className="wrap" ref={form} onSubmit={(event) => handleSubmit(event)}>
        <fieldset className="field-area1">
          <h2>Ваши данные:</h2>
          <fieldset>
            <input
              type="text" id="name" name="name" placeholder="Имя"
              required={true} pattern="[a-zA-Zа-яА-Я]+" data-validation-error="Только буквы" value={clientName} onChange={(event) => setClientName(event.target.value)}/>
            </fieldset>
          <fieldset className="field-area2">
            <input
              type="tel" id="telephone" name="telephone" placeholder="Телефон"
              required={true} pattern="\+?[0-9]{1,12}" data-validation-error="Только цифры, не больше 12, можно с плюсом в начале" value={clientPhone} onChange={(event) => setClientPhone(event.target.value)}/>
          </fieldset>
          <button className="submitBtn">Оформить заказ</button>
        </fieldset>
      </form>
    </div>
    {modalContent &&
      <div className="Modal cart_modal" ref={modal_backdrop}>
        <div className="modalCard">
          {modalContent}
        </div>
      </div>
    }
  </>;
}

export default Cart;
