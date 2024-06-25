import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axiosConfig";

const Register = ({ setCurrentPage }) => {
  const navigate = useNavigate();
  const userNameDom = useRef()
  const firstnameDom = useRef()
  const lastnameDom = useRef()
  const emailDom = useRef()
  const passwordDom = useRef()

  async function handleSubmit(e) {
    e.preventDefault();

    const usernameValue = userNameDom.current.value;
    const firstValue = firstnameDom.current.value;
    const lastValue = lastnameDom.current.value;
    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;
    if(
      !usernameValue ||
      !firstValue ||
      !lastValue ||
      !emailValue ||
      !passwordValue
    ){
      alert ('please provide all required information')
      return;
    }
    try {
      await axios.post('/users/register', {
        username:usernameValue,
        firstname:firstValue,
        lastname:lastValue,
        email:emailValue,
        password:passwordValue,
      });
      alert("register successfull. please login")
      navigate('/login')
    } catch (error) {
      alert('something went wrong')
      console.log(error.response)
      
    }

  }

  return (
    <div className="col card p-5 m-5 text-center">
      <h3 className="m-3">Join the network</h3>
      <div>
        <p>
          Already have an account{" "}
          <a
            href="/"
            onClick={() => setCurrentPage("login")}
            className="fw-semibold text-decoration-none"
            style={{ color: "#fe8402" }}
          >
            Sign in
          </a>
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        action=""
        className="d-flex flex-column gap-3"
      >
        <div>
          <input
            ref={userNameDom}
            type="text"
            className="form-control p-3"
            placeholder="Username"
            required
          />
        </div>
        <div className="d-flex gap-4">
          <input
            ref={firstnameDom}
            type="text"
            className="form-control p-3"
            placeholder="First Name"
            required
          />
          <input
            ref={lastnameDom}
            type="text"
            className="form-control p-3"
            placeholder="Last Name"
            required
          />
        </div>
        <div>
          <input
            ref={emailDom}
            type="email"
            className="form-control p-3"
            placeholder="Email Address"
            required
          />
        </div>
        <div>
          <input
            ref={passwordDom}
            type="password"
            className="form-control p-3"
            placeholder="Password"
            required
          />
        </div>
        <div className="p-2">
          <form action="" >
              <input type="checkbox" id="agreement"
              />
              <small> I agree to the privacy policy and terms of service</small>
            </form>
        </div>
        <div className="d-grid">
          <button
            type="submit"
            className="button btn btn-primary action-btn fw-bold form-control text-white"
          >
            Agree and Join
          </button>
        </div>
        <div className="p-2">
          <p className="d-flex justify-content-center">
            <a
              href="/"
              className="fw-semibold text-decoration-none"
              style={{ color: "#fe8402" }}
            >
              Already have an account?
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
