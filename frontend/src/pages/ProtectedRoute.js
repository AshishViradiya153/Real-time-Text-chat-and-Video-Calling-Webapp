import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { setSocketGlobal } from "../features/user/friendSlice";
import { connectionWithSocketServer } from "../real-time_Communication/ioClientConnection";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const effectRan = useRef(false);

  useEffect(() => {
    const userDetails = localStorage.getItem("user");
    let socket = null;
    if (!effectRan.current) {
      if (userDetails) {
        console.log("a123");
        socket = connectionWithSocketServer(JSON.parse(userDetails));
        dispatch(setSocketGlobal(socket));
      }
    }
    return () => {
      effectRan.current = true;
    };
  }, [dispatch]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
export default ProtectedRoute;
