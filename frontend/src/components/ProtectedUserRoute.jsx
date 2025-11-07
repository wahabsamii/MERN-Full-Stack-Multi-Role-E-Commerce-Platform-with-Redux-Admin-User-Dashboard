import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";


function ProtectedUserRoute(){
    const {user} = useSelector((state) => state.auth);

    if (!user) {
        return <Navigate to='/' replace/>
    }

    if (!user.role === "user") {
        return <Navigate to='/' replace />
    }

    return <Outlet />
}

export default ProtectedUserRoute;