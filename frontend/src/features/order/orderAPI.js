export function createOrder(order) {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8080/orders',{
      method:"POST",
      body:JSON.stringify(order),
      headers:{"content-type":"application/json"}
    });

    const data = await response.json()
    //TODO: on server it will only return some info of user (not password)
    resolve({data})
  }
  );
}


export function updateOrder(order) {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8080/orders/'+order.id,{
      method:"PATCH",
      body:JSON.stringify(order),
      headers:{"content-type":"application/json"}
    });

    const data = await response.json()
    resolve({data})
  }
  );
}






export function fetchAllOrders(sort,pagination) {

  let queryString = "";

  console.log("pagination in api:-", pagination);
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8080/orders?" + queryString,
    );
    const data = await response.json();
    const totalOrderHeader = response.headers.get("X-Total-Count");
    const totalOrders = totalOrderHeader ? parseInt(totalOrderHeader, 10) : 0;
    console.log("total items headeer:-", totalOrderHeader);
    console.log("total items:-", totalOrders);
    
    resolve({
      data: {
        orders: data,
        totalOrders: +totalOrders,
      },
    });
  });
}

