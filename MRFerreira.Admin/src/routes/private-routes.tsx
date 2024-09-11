import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthValidation, useAuthCheck } from "../hooks/use-auth-check";
import toast from "react-hot-toast";

interface Props {
  children: React.ReactNode;
}

export default function PrivateRoute({ children }: Props) {
  const navigate = useNavigate();
  const authValidation: AuthValidation = useAuthCheck();

  useEffect(() => {
    if (!authValidation.hasToken) {
      navigate("/login");
    } else if (authValidation.expired) {
      navigate("/login");
      toast.error("Sua sessão expirou entre novamente");
    }
  }, [authValidation, navigate]);

  return (
    <>
      {!authValidation.hasToken && <Navigate to="/login" replace />}
      {authValidation.hasToken && children}
    </>
  );
}
