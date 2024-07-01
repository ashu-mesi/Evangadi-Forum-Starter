import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Login from "../../components/Login/Login";
import SignUp from "../../components/SignUp/Register";
import bg from "../../assets/bg-svg-f.svg";
import Footer from "../../components/Footer/Footer";

function LandingLayout() {
  const [currentPage, setCurrentPage] = useState("login");
  return (
    <div>
      <Header />
      <main
        className="landing bg-body-tertiary"
        style={{
          background: `url(${bg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <section className="container d-md-flex pt-5 gap-5">
          {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
          {currentPage === "signup" && (
            <SignUp setCurrentPage={setCurrentPage} />
          )}

          <div className="col mt-5">
            <p className="abt my-3 fw-semibold">About</p>
            <h2>Evangadi Networks Q&A</h2>
            <div className="d-flex flex-column gap-4 fs-8 font-family-sans-serif">
              <p style={{fontFamily: "sans-serif", textAlign: "justify"}}>
              Evangadi Networks is all about creating a network of people who believe in the power of collaboration with a common goal of transforming their life through the power of learning how to code.   We believe no matter what stage of life you are in, whether you’re just starting elementary school or being promoted to CEO of a Fortune 500 company, you have much to offer to those who are trying to follow in your footsteps. 
              </p>
          
            </div>
            <div>
              <button
                className="button btn btn-warning fw-bold py-2 px-4 text-white"
                style={{ background: "#fe8402" }}
              >
                HOW IT WORKS
              </button>
            </div>
          </div>
        </section>
      <Footer />
      </main>
    </div>
  );
}

export default LandingLayout;
