import React, { useEffect, useRef, useState } from "react";
import { useDispachCart,useCart } from "./ContextReducer";
export default function Card(props) {
  let dispach = useDispachCart();
  let data = useCart()
  const priceRef =useRef();
  let options = props.options;
  let priceOptions = Object.keys(options) 
  const[qty,setQty] = useState(1);
  const[size,setSize] = useState("");

  const handleAddToCart = async ()=>{
    let food = []
    for(const item of data){
      if(item.id === props.foodData._id){
        food = item;
        break;
      }
    }
    if(food !== []){
      if(food.size === size){
        await dispach({type:"UPDATE", id: props.foodData._id, price:finalPrice, qty: qty})
        return
    }
    else if(food.size !== size){
    await dispach({type:"ADD", id: props.foodData._id, name: props.foodData.name, img: props.foodData.img, price:finalPrice, qty:qty, size:size})
    return
    }// await console.log(data);
    return
  }
    await dispach({type:"ADD", id: props.foodData._id, name: props.foodData.name, img: props.foodData.img, price:finalPrice, qty:qty, size:size})
  }
  let finalPrice = qty*parseInt(options[size])
  useEffect(()=>{
    setSize(priceRef.current.value)
  },[])
  return (
    <div>
      <div>
        <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
          <img src={props.foodData.img} className="card-img-top" alt="..."  style={{height:"180px",objectFit:"fill"}}/>
          <div className="card-body">
            <h5 className="card-title">{props.foodData.name}</h5>
            {/* <p className="card-text">{props.fooddisc}</p> */}
            <div className="cointainer w-100">
              <select className="m-2 h-100 bg-success rounded" onChange={(e)=> setQty(e.target.value)}>
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })}
              </select>
              <select className="m-2 h-100 bg-success rounded" ref={priceRef} onChange={(e)=> setSize(e.target.value)}>
                {priceOptions.map((data)=>{
                  return <option key={data} value={data}>{data}</option>
                })}
              </select>
              <div className="d-inline h-100 fs-5">Rs{finalPrice}/-</div>
            </div>
            <hr>
            </hr>
                <button className={`btn btn-success justify-center ms-1`} onClick={handleAddToCart}> Add To Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
