import { createContext } from "react";
import UseUserProvider from "../hooks/useUserProvider";

const UserContext = createContext({});

export function UserProvider(props) {
  const userProvider = UseUserProvider();

  return (
    <UserContext.Provider value={userProvider}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;
