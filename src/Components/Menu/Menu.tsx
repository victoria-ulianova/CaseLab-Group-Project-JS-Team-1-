import React, { useState, useEffect } from "react";
import MenuSection from "./MenuSection/MenuSection";
import "./Menu.css";

function Menu() {
  const [productArray, setProductArray] = useState<any>(null);
  useEffect(() => {
    async function getProducts() {
      let response = await fetch(
        "https://caselab-group-1.herokuapp.com/getProducts"
      );
      response = await response.json();
      setProductArray(response);
    }
    getProducts();
  }, []);

  const sections = ["Шаурма", "Напитки", "Соусы"];
  const setSection =
    productArray == undefined ? (
      <> </>
    ) : (
      sections.map(function (section, index) {
        const filterProduct = productArray.filter(
          //@ts-expect-error
          (type) => type.type === section.toLowerCase()
        );
        return (
          <>
            <MenuSection key={index} title={section} products={filterProduct} />
            {index === sections.length - 1 ? null : <hr></hr>}
          </>
        );
      })
    );
  return (
    <div className="Menu">
      <h1>Меню</h1>
      {productArray && setSection}
    </div>
  );
}

export default Menu;
