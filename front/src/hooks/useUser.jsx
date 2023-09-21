import {useContext} from "react";
import UserContext from "../context/userContext";

function useUser() {
    return useContext(UserContext)
}

export default useUser;