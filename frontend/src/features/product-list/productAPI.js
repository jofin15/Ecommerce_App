export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    console.log("recieved id at api",id);
    const response = await fetch("http://localhost:8080/products?id="+id);
    const data = await response.json();

    resolve({ data });
  });
}

export function createProduct(product) {
  return new Promise(async (resolve) => {
    // console.log("recieved id at api",id);
    const response = await fetch("http://localhost:8080/products",{
      method:"POST",
      body:JSON.stringify(product),
      headers:{"content-type":"application/json"}
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function updateProduct(update) {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8080/products/'+update.id,{
      method:"PATCH",
      body:JSON.stringify(update),
      headers:{"content-type":"application/json"}
    });
  })}

export function fetchProductsByFilters(filter, sort, pagination) {
  //filter data={"category":["smartphone","laptops"]}
  //sort={_sort:"price",_order:"desc"}
  //pagination:-{_page:1,_limit:10}   _page=1&_limit=10

  console.log("the api filter that i am recieving:- ", filter);
  let queryString = "";

  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length > 0) {
      const lastCategoryValue = categoryValues[categoryValues.length - 1];
      console.log("lastcategoryvalue:-", lastCategoryValue);
      queryString += `${key}=${lastCategoryValue}&`;
    }
  }

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  console.log("pagination in api:-", pagination);
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8080/products?" + queryString,
    );
    const data = await response.json();
    const totalItemsHeader = response.headers.get("X-Total-Count");
    const totalItems = totalItemsHeader ? parseInt(totalItemsHeader, 10) : 0;
    console.log("total items headeer:-", totalItemsHeader);
    console.log("total items:-", totalItems);
    
    resolve({
      data: {
        products: data,
        totalItems: +totalItems,
      },
    });
  });
}

export function fetchCategories() {
  return new Promise(async (resolve, reject) => {
    const response = await fetch("http://localhost:8080/category?");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchBrands() {
  return new Promise(async (resolve, reject) => {
    const response = await fetch("http://localhost:8080/brands?");
    const data = await response.json();
    resolve({ data });
  });
}
 