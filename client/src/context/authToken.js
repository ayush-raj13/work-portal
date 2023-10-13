import { createContext, useState, useEffect } from "react";
import { Cookies } from "react-cookie";

const AuthTokenContext = createContext();
const cookies = new Cookies();

function Provider({ children }) {
  const [authToken, setAuthToken] = useState(cookies.get('user'));

  useEffect(() => {
    const interval = setInterval(() => {
      const presenceCookie = cookies.get('user');
      if (JSON.stringify(authToken) !== JSON.stringify(presenceCookie)) {
        setAuthToken(presenceCookie);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [authToken]);

  const valueToShare = {
    authToken,
  };

  return (
    <AuthTokenContext.Provider value={valueToShare}>
      {children}
    </AuthTokenContext.Provider>
  );
}

export { Provider };
export default AuthTokenContext;
