import React, { useEffect, useState } from 'react';
import { ingrediantList, Product } from '../../typescript/main';
import { useDispatch, useSelector } from 'react-redux';
import IngredientList from './IngredientList/IngredientList';
import {setPriceAction} from '../../store/cardPriceReducer';
import { RootState } from '../../store/store';
import { hideModalAction } from '../../store/showModalReducer';
import {addOrderItemAction} from '../../store/orderListReducer';
import './Modal.css';


function Modal({product}:{product:Product}) {
  useEffect(() => {
    dispatch(setPriceAction(+product.price));
  }, [])
  const dispatch = useDispatch();
  const id = useSelector((state: RootState) => state.orderList);
  const price = useSelector((state: RootState) => state.cardPrice);
  const [newIngredQuantity, changeIngredQuantity] = useState([])

  function changeIngred(newQuantity: ingrediantList) {
    if(newIngredQuantity.length === 0) {
      //@ts-expect-error
      changeIngredQuantity([newQuantity]);
      return;
    }
    newIngredQuantity.forEach(function(item: ingrediantList, index: number){
      if(item.idIngredient == newQuantity.idIngredient) {
        //@ts-expect-error
        changeIngredQuantity([...newIngredQuantity.slice(0, index), newQuantity, ...newIngredQuantity.slice(index+1)])
      } else {
        //@ts-expect-error
        changeIngredQuantity([...newIngredQuantity, newQuantity])
      }
    })
  }

  let promoCondition;
  if(product.promo) {
    promoCondition = <>
      <div className='promoPrice'>
        <span>{`${price} `}<b>руб</b></span>
        <span>{`${Math.ceil(price * 0.85)} `}<b>руб</b></span>
      </div>
    </>;
  } else {
    promoCondition = <div className='modalCardPriceValue'>{`${price} р`}</div>;
  }
  const ingredientsList = product.ingredients?.map(function(ingredient, index){
    return <IngredientList key={index} ingredient={ingredient} changeIngred={changeIngred}/>
  })
  function handleAddCardBtn(){
    dispatch(addOrderItemAction(
      {
        //@ts-expect-error
        idOrderItem: (id.length > 0) ? id.length : 0,
        orderItem: {
          idProduct: product.idProduct,
          title: product.title,
          price: `${price}`,
          productQuantity: 1,
          ingrediantList: (newIngredQuantity.length === 0) ? null : newIngredQuantity
        }
      }
    ))
    dispatch(hideModalAction());
  }
  return ( 
    <div className={`Modal`}>
      <div className='modalCard'>
        <img onClick={() => dispatch(hideModalAction())} className='iconClose' src='https://caselab-group-1.herokuapp.com/images/iconClose.svg'></img>
        <img className='modalCardImage' src={product.imagePath} alt={`Фото ${product.title}`}></img>
        <h3 className='modalCardTitle'>{product.title}</h3>
        <hr></hr>
        {ingredientsList}
        <h4 className='modalCardPrice'>Цена</h4>
        {promoCondition}
        <button className='addToCardModalBtn' onClick={handleAddCardBtn}>Добавить в корзину</button>
      </div>
    </div>
  );
}

export default Modal;