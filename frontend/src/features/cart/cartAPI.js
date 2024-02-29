export function addToCart(item) {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8080/cart',{
      method:"POST",
      body:JSON.stringify(item),
      headers:{"content-type":"application/json"}
    });

    const data = await response.json()
    //TODO: on server it will only return some info of user (not password)
    resolve({data})
  }
  );
}


export function fetchItemsByUserId(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart?user="+userId);
    const data = await response.json();
    resolve({ data });
  });
}

export function updateCart(update) {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8080/cart/'+update.id,{
      method:"PATCH",
      body:JSON.stringify(update),
      headers:{"content-type":"application/json"}
    });

    const data = await response.json()
    //TODO: on server it will only return some info of user (not password)
    resolve({data})
  }
  );
}


export function deleteItemFromCart(itemId) {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8080/cart/'+itemId,{
      method:"DELETE",
      body:JSON.stringify(itemId),
      headers:{"content-type":"application/json"}
    });

    const data = await response.json()
    //TODO: on server it will only return some info of user (not password)
    resolve({data:{id:itemId}})
  }
  );
}


export  function resetCart(userId) {
  return new Promise(async (resolve) =>{
  const response=await fetchItemsByUserId(userId)
  const items=response.data 
  console.log("order items:- ",items);
  // for (let item in items){
  //   console.log("before delete",item.id);
  //   await deleteItemFromCart(item.id)
  //   console.log("after delete",item);
  // }
  items.map((item)=>{
    console.log("before delete ",item.id);
    deleteItemFromCart(item.id)
  })
  resolve({status:"Success"})
});
}