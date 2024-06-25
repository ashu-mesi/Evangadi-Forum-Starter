import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axiosConfig";
// import Footer from "../../components/Footer/Footer";

function Login({ setCurrentPage }) {
    const emailDom = useRef();
    const passwordDom = useRef();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault(); 
    
        if (!emailDom.current.value || !passwordDom.current.value) {
            alert("Please provide all the required information");
            return;
        }
        const emailValue = emailDom.current.value;
        const passwordValue = passwordDom.current.value;

        try {
            let result  = await axios.post("/users/login", {
                email: emailValue,
                password: passwordValue,
            });
            localStorage.setItem("token", result?.data?.token);
            alert("Login successful.");
            navigate("/");
        } catch (error) {
            alert("Something went wrong. Please try again later.");
            console.log(error.response.data);
        }
    }
    return (
        <div className="col card p-5 mt-5 text-center">
            <h3 className="m-1">Login to your account</h3>
            <div className="m-5">
                <p>
                    Don’t have an account?{" "}
                    <a
                        href="#"
                        onClick={() => setCurrentPage("signup")}
                        className="fw-semibold text-decoration-none"
                        style={{ color: "#fe8402" }}
                    >
                        Create a new account
                    </a>
                </p>
            </div>
            <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                <div>
                    <input
                        ref={emailDom}
                        type="email"
                        className="form-control p-3"
                        placeholder="Email Address"
                    />
                </div>
                <div>
                    <input
                        ref={passwordDom}
                        type="password"
                        className="form-control p-3"
                        placeholder="Password"
                    />
                </div>
                <div className="mt-3">
                    <p className="d-flex justify-content-end">
                        <a
                            href="#"
                            className="fw-semibold text-decoration-none"
                            style={{ color: "#fe8402" }}
                        >
                            Forgot your password?
                        </a>
                    </p>
                </div>
                <div className="d-grid">
                    <button
                        type="submit"
                        className="button btn btn-primary action-btn fw-bold form-control text-white p-2"
                    >
                        Log In
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;