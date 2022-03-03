import {Product} from '../typescript/main'

export const modalReducer = (state:null|{product: Product, styleModal: string} = null, action: {type: string, payload: {product: Product}}) => {
  switch (action.type) {
    case 'setModal':
      return (state) ? {...state, ...action.payload} : {...action.payload};
    default:
      return state
  }
}

export const setModalAction = (payload: {product: Product}) => ({type: 'setModal', payload});
