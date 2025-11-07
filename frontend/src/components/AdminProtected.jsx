import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";


function AdminProtected({children}){
    const {user} = useSelector((state) => state.auth);

    if (!user) {
        return <Navigate to='/' replace/>
    }

    if (!user.role === "admin") {
        return <Navigate to='/' replace />
    }

    return children;
}

export default AdminProtected;