export const showModalReducer = (
  state: boolean = false,
  action: {
    type: string;
  }
) => {
  switch (action.type) {
    case "showModal":
      return true;
    case "hideModal":
      return false;
    default:
      return state;
  }
};

export const showModalAction = () => ({type: "showModal"});
export const hideModalAction = () => ({type: "hideModal"});
