import { useContext, useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import { UserContext } from "./UserContext";
import api from "../Api.js";

const SignUp = () => {

  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [triggerEffect, setTriggerEffect] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setCurrentUser({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      role: "customer"
    });
    setTriggerEffect(true);
  };

  useEffect(() => {
    if (triggerEffect) {
      const getUser = async () => {
        try {
          const response = await api.post("/api/signup", currentUser);

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
                token: response.data.token
              })
              navigate("/");
            }



          }
        } catch (err) {
          if (err.response) {
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
  }, [triggerEffect, currentUser, setUser]);


  return (
    <div className="sign-up jumbotron">
      <div className="smaller-height modal modal-sheet position-static d-block" tabIndex="-1" role="dialog" id="modalSignin">
        <div className="modal-dialog" role="document">
          <div className="less-padding modal-content rounded-4 shadow">
            <div className="modal-header p-5 pt-4 pb-4 border-bottom-0">
              <h1 className="signuptext fw-bold mb-0 fs-2">Sign up</h1>
            </div>

            <div className=" c p-5 pt-0">
              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input type="text" className="form-control rounded-3" id="floatingInput" placeholder="John" value={firstname}
                    onChange={(e) => setFirstname(e.target.value)} />
                  <label htmlFor="floatingInput">First name</label>
                </div>
                <div className="form-floating mb-3">
                  <input type="text" className="form-control rounded-3" id="floatingInput" placeholder="Doe" value={lastname}
                    onChange={(e) => setLastname(e.target.value)} />
                  <label htmlFor="floatingInput">Last name</label>
                </div>
                <div className="form-floating mb-3">
                  <input type="email" className="form-control rounded-3" id="floatingInput" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                  <label htmlFor="floatingInput">Email</label>
                </div>
                <div className="form-floating mb-3">
                  <input type="password" className="form-control rounded-3" id="floatingPassword" placeholder="Password" value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                  <label htmlFor="floatingPassword">Password</label>
                </div>
                <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit">Sign up</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;