import React, { useEffect, useState } from "react";
import "./Main.css";
import PromoSection from "./PromoSection/PromoSection";
import { useDispatch } from "react-redux";
import { setMenuAction } from "../../store/menuReducer";

function Main() {
  const dispatch = useDispatch();
  const [productArray, setProductArray] = useState<any>(null);
  useEffect(() => {
    async function getPromo() {
      let response = await fetch(
        "https://caselab-group-1.herokuapp.com/getPromo"
      );
      response = await response.json();
      setProductArray(response);
    }
    getPromo();
  }, []);
  return (
    <div className="Main">
      <div className="welcomeSection">
        <div className="welcomeWords">
          <p>Неважно, что ты ешь шаверму, </p>
          <p>шаварму или шаурму,</p>
          <p>состав везде один и тот же,</p>
          <p>муму</p>
        </div>
        <div className="welcomePicture">
          <img
            src="https://caselab-group-1.herokuapp.com/images/welcomeImage.png"
            alt="Картинка с шаурмой"
            className="welcomePicture"
          />
        </div>
      </div>
      {productArray && (
        <PromoSection
          title="Акция дня (успей полакомиться)"
          products={productArray}
        ></PromoSection>
      )}
      <div className="menuButton">
        <a onClick={() => dispatch(setMenuAction("menu"))}>Меню</a>
      </div>
      <div className="aboutUS">
        <p className="aboutUsTitle">О нас</p>
        <p className="aboutUsText">
          Кафе “Шаурма № 1” предлагает своим клиентам вкуснейшую шаурму,
          приготовленную по классическим и адаптированным к европейской
          аудитории рецептам, а также по собственным наработкам наших поваров.
          Сочное мясо и правильные соусы - это то, чем мы по праву можем
          гордиться.
        </p>
        <p className="aboutUsText">
          В своих блюдах мы используем только натуральные продукты, которые
          поставляют нам проверенные поставщики. Именно поэтому наша шаурма
          отличается свежестью, превосходным качеством и вкусом.
        </p>
      </div>
    </div>
  );
}

export default Main;
