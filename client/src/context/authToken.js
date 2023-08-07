import { createContext, useState } from "react";
import { Cookies } from "react-cookie";

const AuthTokenContext = createContext();

function Provider({ children }){
  const cookies = new Cookies();
  const [authToken, setAuthToken] = useState(cookies.get('connect.sid'));

    const fetchAuthToken = setInterval(() => {
      const presenceCookie = cookies.get('connect.sid');
      if (authToken !== presenceCookie ) {
        setAuthToken(presenceCookie);
      }
    }, 1000);


    const valueToShare = {
        authToken,
        fetchAuthToken,
    }

    return (
        <AuthTokenContext.Provider value={valueToShare}>{children}</AuthTokenContext.Provider>
    )
}

export {Provider};
export default AuthTokenContext;