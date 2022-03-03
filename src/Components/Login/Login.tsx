import "./Login.css";
import "../Modal/Modal.css";
import { useDispatch } from "react-redux";
import { setMenuAction } from "../../store/menuReducer";
import { useEffect, useRef } from "react";

function Login() {
  const dispatch = useDispatch();

  const modal_auth = useRef<HTMLDivElement>(null);
  const form = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (modal_auth.current && form.current) {
      modal_auth.current.onclick = event => {
        if (event.target === modal_auth.current)
          dispatch(setMenuAction("main"))
      };
      form.current.onsubmit = (event) => {
        event.preventDefault();
        modal_auth.current?.style.removeProperty("display");
        console.log(Object.fromEntries(new FormData(form.current!))); 
      };
      form.current.querySelectorAll('input').forEach(input => Object.assign(input, {
        oninvalid(this: HTMLInputElement, event) {
          this.setCustomValidity('');
          if (!this.validity.valid && this.dataset.validationError)
            this.setCustomValidity(this.dataset.validationError);
        },
        oninput(this: HTMLInputElement, event) {
          this.setCustomValidity('');
        }
      } as GlobalEventHandlers));
    }
  }, []);

  return <>
    <div className="Login">
      <form className="wrap" ref={form}>
        <fieldset className="field_login">
          <h2>Авторизация</h2>
          <fieldset>
            <input
              type="text" id="login" name="login" placeholder="Логин"
              required={true} pattern="[a-zA-Zа-яА-Я]+" data-validation-error="Только киррилица"/>
            </fieldset>
          <fieldset className="field_password">
            <input
              type="password" id="password" name="password" placeholder="Пароль"
              required={true} pattern="[a-zA-Zа-яА-Я]+" data-validation-error="Только киррилица"/>
          </fieldset>
          <button className="loginBtn">Войти</button>
        </fieldset>
      </form>
    </div>
    
  </>;
}

export default Login;