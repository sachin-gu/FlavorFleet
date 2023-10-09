import React, { createContext, useContext, useReducer } from 'react'

const CartStateContext = createContext();
const CartDispachContext = createContext();

const reducer = (state, action) => {
    switch(action.type){
        case "ADD":
            return[...state,{id:action.id, name:action.name, price:action.price, qty:action.qty, size:action.size, img:action.img}]
        case "REMOVE":
            let newArr = [...state]
            newArr.splice(action.index, 1)
            return newArr;
        case "UPDATE":
            let arr = [...state]
            arr.find((food, index) =>{
                if(food.id === action.id){
                    console.log(food.qty,parseInt(action.qty), action.price + food.price)
                    arr[index] = {...food, qty:parseInt(action.qty) + food.qty, price: action.price + food.price }
                }
                return arr
            })
            return arr
        default:
                console.log("Error in Reducer");
    }

}
export const CartProvider = ({children})=>{

    const [state,dispach] = useReducer(reducer,[]);
return(
<CartDispachContext.Provider value={dispach}>
    <CartStateContext.Provider value={state}>
        {children}
    </CartStateContext.Provider>
</CartDispachContext.Provider>
)
}

export const useCart = ()=> useContext(CartStateContext);
export const useDispachCart = ()=> useContext(CartDispachContext);