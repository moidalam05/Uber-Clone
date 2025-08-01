import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CaptainProtectedWrapper = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (!token) {
      navigate("/captain-login");
    }
  }, [token, navigate]);

  return token ? <>{children}</> : null;
};

export default CaptainProtectedWrapper;
