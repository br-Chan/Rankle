import { useContext } from "react";
import { AuthContext } from "../components/authProvider";

export const useAuth = () => {
    return useContext(AuthContext);
};
