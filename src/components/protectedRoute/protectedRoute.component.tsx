import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../../utils/authentication/authentication.utils";

const ProtectedRoute = ({ children }: any) => {
  
  if (!isAuthenticated()) {
    // Redirect to the sign-in page if not authenticated
    return <Navigate to="/auth" />;
  }
  return children;
};

export default ProtectedRoute;