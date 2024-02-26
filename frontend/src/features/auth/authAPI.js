export function createUser(userData) {
    return new Promise(async (resolve) =>{
      const response = await fetch('http://localhost:8080/users',{
        method:"POST",
        body:JSON.stringify(userData),
        headers:{"content-type":"application/json"}
      }) 
      const data = await response.json()
      //TODO: on server it will only return some info of user (not password)
      resolve({data})
    }
    );
  }


  export function checkUser(loginInfo) {
    return new Promise(async (resolve,reject) =>{
      const email=loginInfo.email
      const password=loginInfo.password
      const response = await fetch('http://localhost:8080/users?email='+email+"&password="+password) 
      const data = await response.json()
      console.log("return user:- ",data);
      //TODO: on server it will only return some info of user (not password)

      if (data.length) {
        if(password===data[0].password){
          console.log("yep now you are logged in");
          resolve({data})
        }else{
          reject({message:"Wrong Password"})
        }
      } else {
        reject({message:"User Not Found"})
      }
    }
    );
  }