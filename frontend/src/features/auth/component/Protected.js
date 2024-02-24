import { Navigate } from "react-router-dom";
import { selectUser } from "../authSice";
import { useSelector } from "react-redux";

function Protected({children}){
  const user = useSelector(selectUser);

  if (!user){
    return <Navigate to="/login" replace={true}></Navigate>
  }
    return children;
}
export default Protected