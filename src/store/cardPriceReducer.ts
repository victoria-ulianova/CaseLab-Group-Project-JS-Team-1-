export const cardPriceReducer = (state:number = 0, action: {type: string, payload: number}) => {
  switch (action.type) {
    case 'setPrice':
      return action.payload;
    case 'increasePrice':
      return state + action.payload;
    case 'decreasePrice':
      return state - action.payload;
    case 'clearCardPrice':
      return state - state;
    default:
      return state
  }
}

export const increasePriceAction = (payload: number) => ({type: 'increasePrice', payload});
export const decreasePriceAction = (payload: number) => ({type: 'decreasePrice', payload});
export const setPriceAction = (payload: number) => ({type: 'setPrice', payload});
export const clearCardAction = () => ({type: 'clearCardPrice'});
