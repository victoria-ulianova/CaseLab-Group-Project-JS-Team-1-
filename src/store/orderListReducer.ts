import { OrderList } from "../typescript/main";

export const orderListReducer = (
  state: { idOrderItem: number; orderItem: OrderList }[] = [],
  action: {
    type: string;
    payload: { idOrderItem: number; orderItem: OrderList } | number;
  }
) => {
  switch (action.type) {
    case "addOrderItem":
      if (state.length === 0) {
        return [action.payload];
      } else {
        let checkOrderItemID = state.filter(
          (val) =>
            //@ts-expect-error
            val.orderItem.idProduct === action.payload.orderItem.idProduct
        );
        if (checkOrderItemID.length === 0) {
          return [...state, action.payload];
        } else {
          return state.map((item) => {
            if (
              //@ts-expect-error
              item.orderItem.idProduct === action.payload.orderItem.idProduct &&
              //@ts-expect-error
              action.payload.orderItem.ingrediantList == undefined
            ) {
              return {
                idOrderItem: item.idOrderItem,
                orderItem: {
                  ...item.orderItem,
                  productQuantity: item.orderItem.productQuantity + 1,
                },
              };
            } else {
              return item;
            }
          });
        }
      }
    case "increaseOrderItem":
      return state.map((item) => {
        if (item.idOrderItem === action.payload) {
          return {
            idOrderItem: item.idOrderItem,
            orderItem: {
              ...item.orderItem,
              productQuantity: item.orderItem.productQuantity + 1,
            },
          };
        } else {
          return item;
        }
      });
    case "decreaseOrderItem":
      return state.map((item) => {
        if (item.idOrderItem === action.payload) {
          return {
            idOrderItem: item.idOrderItem,
            orderItem: {
              ...item.orderItem,
              productQuantity: (item.orderItem.productQuantity === 1) ? 1 : item.orderItem.productQuantity - 1,
            },
          };
        } else {
          return item;
        }
      });
    case "removeOrderItem":
      return state.filter((item) => item.idOrderItem !== action.payload);
    case "clearOrderItem":
      return [];
    default:
      return state;
  }
};

export const addOrderItemAction = (payload: {
  idOrderItem: number;
  orderItem: OrderList;
}) => ({
  type: "addOrderItem",
  payload,
});

export const removeOrderItemAction = (payload: number) => ({
  type: "removeOrderItem",
  payload,
});

export const increaseOrderItemAction = (payload: number) => ({
  type: "increaseOrderItem",
  payload,
});

export const decreaseOrderItemAction = (payload: number) => ({
  type: "decreaseOrderItem",
  payload,
});
export const clearOrderItemAction = () => ({
  type: "clearOrderItem"
});
