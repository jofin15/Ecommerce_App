import { Navigate } from "react-router-dom";
import { selectUser } from "../authSice";
import { useSelector } from "react-redux";

function ProtectedAdmin({children}){
  const user = useSelector(selectUser);
const user1=user[0]

  if (!user){
    return <Navigate to="/login" replace={true}></Navigate>
  }
  if (user &&user1.role!=="admin"){
    return <Navigate to="/" replace={true}></Navigate>
  }
    return children;
}
export default ProtectedAdmin