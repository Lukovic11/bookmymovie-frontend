import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext.js";
import api from "../Api.js";
import Alert from '../modals/AlertModal.js';


const LogIn = () => {
  const { user, setUser, saveUserToLocalStorage } = useContext(UserContext);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [triggerEffect, setTriggerEffect] = useState(false);
  const [warning, setWarning] = useState(false);
  const [noSuchUser, setNoSuchUser] = useState(false);
  const[myAlert,setMyAlert]=useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();

    setCurrentUser({
      email: email,
      password: password
    });
    setTriggerEffect(true);
  };

  useEffect(() => {
    if (user && user.id) {
      saveUserToLocalStorage(user);
    }
  }, [user, saveUserToLocalStorage]);
  
  useEffect(() => {
    if (triggerEffect) {
      if (email === '' || password === '') {
        setWarning(true);
        return;
      }
      setWarning(false);
      const getUser = async () => {
        try {
          const response = await api.post("/api/login", currentUser);

          if (response.status === 200) {
            const headers = {
              Authorization: `Bearer ${response.data.token}`
            };
            const response2 = await api.get("/api/users/byEmail/" + email, { headers });
            if (response2.status === 200) {
              setUser({
                id: response2.data.id,
                firstname: response2.data.firstname,
                lastname: response2.data.lastname,
                email: response2.data.email,
                role: response2.data.role,
                token: response.data.token
              })
              navigate("/");
              // saveUserToLocalStorage(user);
            }
          }
        } catch (err) {
          if (err.response) {
            if(err.response.status===404){
              setNoSuchUser(true);
              return;
            }
            setMyAlert(true);
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
          } else {
            console.log(`Error: ${err.message}`);
          }
        }
      };

      getUser();

      setTriggerEffect(false);
    }
  }, [triggerEffect, currentUser, setUser, navigate, email]);

  return (
    <div className="sign-up jumbotron">
      <div className="modal modal-sheet position-static d-block" tabIndex="-1" role="dialog" id="modalSignin">
        <div className={`modal-dialog ${myAlert ? 'blur-background': ''}`} role="document">
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
                {noSuchUser && <p style={{ color: "red", marginBottom: "-24px", paddingBottom: 0 }}>Incorrect username or password</p>}
                {warning && <p style={{ color: "red", marginBottom: "-24px", paddingBottom: 0 }}>Please fill out all the fields</p>}
              </form>
            </div>
          </div>
        </div>
        {myAlert && <Alert message={"Sorry, the system could not log in the user."} />}

      </div>
    </div>
  );
}

export default LogIn;
