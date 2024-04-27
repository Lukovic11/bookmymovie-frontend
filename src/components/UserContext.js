import { createContext, useState } from "react";


export const UserContext = createContext(null);

export const UserContextProvider = (props) => {

  const [user, setUser] = useState({
    id: null,
    firstname: '',
    lastname: '',
    email: '',
    role: '',
    token:''
  })

  const resetUser = () => {
    setUser({
      id: null,
      firstname: '',
      lastname: '',
      email: '',
      role: '',
      token:''
    })
  }



  return (<UserContext.Provider
    value={{
      user,
      setUser,
      resetUser
    }}
  >
    {props.children}
  </UserContext.Provider>);
}
