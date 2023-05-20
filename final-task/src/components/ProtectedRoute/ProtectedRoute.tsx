import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({redirect, condition, children}:{redirect:string, condition:boolean, children:React.ReactNode}) => {
  if (condition) {
    return <>{children}</>
  } else {
    return <Navigate to={redirect} replace/>
  }
};

export { ProtectedRoute };
