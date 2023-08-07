import { useContext } from "react";
import AuthTokenContext from "../context/authToken";

function useAuthTokenContext() {
    return useContext(AuthTokenContext);
}

export default useAuthTokenContext;