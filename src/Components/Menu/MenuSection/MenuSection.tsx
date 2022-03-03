import * as React from "react";
import { Product } from "../../../typescript/main";
import ProductCard from "../../ProductCard/ProductCard";
import "./MenuSection.css";

function MenuSection({
  title,
  products,
}: {
  title: string;
  products: Product[];
}) {
  const MenuSectionProducts = products.map(function (product, index) {
    return (
      <>
        <ProductCard key={index} product={product} mainPage={false} />
      </>
    );
  });
  return (
    <div className="MenuSection">
      <h2>{title}</h2>
      <div className="MenuSectionProducts">{MenuSectionProducts}</div>
    </div>
  );
}

export default MenuSection;
