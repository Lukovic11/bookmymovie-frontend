import { createContext, useState } from "react";


export const UserContext = createContext(null);

export const UserContextProvider = (props) => {

  const [user, setUser] = useState({
    id: null,
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    role: ''
  })

  const resetUser = () => {
    setUser({
      id: null,
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      role: ''
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
