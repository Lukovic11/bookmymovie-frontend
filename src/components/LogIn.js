import { useContext, useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import api from "../Api.js";

const LogIn = () => {
  const { setUser } = useContext(UserContext);
  const [currentUser,setCurrentUser]=useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [triggerEffect, setTriggerEffect] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); 

    setCurrentUser({
      email: email,
      password: password
    });
    setTriggerEffect(true);
  };

  useEffect(() => {
    const getUser=async()=>{
      try {
        const response=await api.post("/api/login",currentUser);
        setUser(response.data);
        console.log(response.data);
      } catch (err) {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    }
    setTriggerEffect(false);
    getUser();
  }, [triggerEffect,currentUser])

  return (
    <div className="sign-up jumbotron">
      <div className="modal modal-sheet position-static d-block" tabIndex="-1" role="dialog" id="modalSignin">
        <div className="modal-dialog" role="document">
          <div className="modal-content rounded-4 shadow">
            <div className="modal-header p-5 pt-4 pb-4 border-bottom-0">
              <h1 className="signuptext fw-bold mb-0 fs-2">Log in</h1>
            </div>

            <div className="c p-5 pt-0">
              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control rounded-3"
                    id="floatingInput"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label htmlFor="floatingInput">Email</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control rounded-3"
                    id="floatingPassword"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label htmlFor="floatingPassword">Password</label>
                </div>
                <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit">Log in</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
