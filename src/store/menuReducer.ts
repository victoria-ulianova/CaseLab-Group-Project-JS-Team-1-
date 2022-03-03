import { Product } from "../typescript/main";

export const menuReducer = (
  state: string = "main",
  action: {
    type: string;
    payload: string;
  }
) => {
  switch (action.type) {
    case "setMenu":
      return action.payload;
    default:
      return state;
  }
};

export const setMenuAction = (payload: string) => ({
  type: "setMenu",
  payload,
});
