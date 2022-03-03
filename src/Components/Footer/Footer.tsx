import React from "react";
import "./Footer.css";
import { useDispatch } from "react-redux";
import { setMenuAction } from "../../store/menuReducer";

function Footer() {
  const dispatch = useDispatch();
  return (
    <section className="Footer">
      <ul className="footerContacts">
        <li>Тел.: +996 705 188 955</li>
        <li>Тел.: +996 555 188 955</li>
        <li>Адрес: Комсомольский просп., 28</li>
        <li>
          <a onClick={() => dispatch(setMenuAction("login"))}>Авторизация для сотрудников</a>
        </li>
      </ul>
    </section>
  );
}

export default Footer;
