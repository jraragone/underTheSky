import axios from "axios"
import {ORDER,ORDER_IN_PROCESS,ID_FOR_ORDERS,USER_ORDERS} from "../constans"

export const orderInProcess = orderInProcess => ({
    type: ORDER_IN_PROCESS,
    orderInProcess
  });

  export const newOrder = order => ({
    type: ORDER,
    order
  });
  
export const IdsForOrders=idsForOrders=>({
  type:ID_FOR_ORDERS,
  idsForOrders
})
export const userOrders=userOrders=>({
  type:USER_ORDERS,
  userOrders
})

export const addNewOrder = (dataOrder) => dispatch =>
  axios.post("/api/orders/addOrder",dataOrder)
  .then(order => {
    dispatch(newOrder(order.data))
    return order.data;
    }
  );

export const getOrderUser =()=>dispatch=>{
  axios.get("/api/orders/userOrders")
  .then(orders=>dispatch(userOrders(orders.data)))
} 