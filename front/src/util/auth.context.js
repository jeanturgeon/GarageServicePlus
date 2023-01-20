import { createContext, useState, useEffect } from "react";

import { onAuthStateChangedListener } from "./firebase.utils";
import { getEmployeebyFirebaseId } from "./routes";


export const AuthContext = createContext({
    currentUser:null,
    setCurrentUser:()=>null,    
    isAdmin: 0,
    setIsAdmin:()=>null,
    employeeId:null,
    setEmployeeId:()=>null

});

export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState();    
    const [isAdmin, setIsAdmin] = useState();
    const [employeeId, setEmployeeId] = useState();
    const value = {currentUser, setCurrentUser, isAdmin, setIsAdmin,employeeId, setEmployeeId};

    useEffect(()=>{        
        const unsubsribe =  onAuthStateChangedListener(async (user) => {
            setCurrentUser(user);            
            const response =  await getEmployeebyFirebaseId(user.uid);
            setIsAdmin(response[0].estAdmin)
            setEmployeeId(response[0].idEmploye)
        }) ;
        return unsubsribe;
    },[])

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}