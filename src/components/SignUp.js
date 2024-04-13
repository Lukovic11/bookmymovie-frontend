const SignUp = () => {
  return (
    <div className="sign-up jumbotron">
      <div className="smaller-height modal modal-sheet position-static d-block" tabIndex="-1" role="dialog" id="modalSignin">
        <div className="modal-dialog" role="document">
          <div className="less-padding modal-content rounded-4 shadow">
            <div className="modal-header p-5 pt-4 pb-4 border-bottom-0">
              <h1 className="signuptext fw-bold mb-0 fs-2">Sign up</h1>
            </div>

            <div className=" c p-5 pt-0">
              <form>
                <div className="form-floating mb-3">
                  <input type="text" className="form-control rounded-3" id="floatingInput" placeholder="John" />
                  <label htmlFor="floatingInput">First name</label>
                </div>
                <div className="form-floating mb-3">
                  <input type="text" className="form-control rounded-3" id="floatingInput" placeholder="Doe" />
                  <label htmlFor="floatingInput">Last name</label>
                </div>
                <div className="form-floating mb-3">
                  <input type="email" className="form-control rounded-3" id="floatingInput" placeholder="name@example.com" />
                  <label htmlFor="floatingInput">Email</label>
                </div>
                <div className="form-floating mb-3">
                  <input type="password" className="form-control rounded-3" id="floatingPassword" placeholder="Password" />
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