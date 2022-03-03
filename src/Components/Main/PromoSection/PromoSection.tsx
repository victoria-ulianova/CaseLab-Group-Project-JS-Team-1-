import * as React from "react";
import { Product } from "../../../typescript/main";
import ProductCard from "../../ProductCard/ProductCard";
import "./promoSection.css";

function PromoSection({
  title,
  products,
}: {
  title: string;
  products: Product[];
}) {
  const promoSectionProducts = products.map(function (product, index) {
    return (
      <>
        <ProductCard key={index} product={product} mainPage={true} />
      </>
    );
  });
  return (
    <div className="promoSection">
      <h2>{title}</h2>
      <div className="promoSectionProducts">{promoSectionProducts}</div>
    </div>
  );
}

export default PromoSection;
