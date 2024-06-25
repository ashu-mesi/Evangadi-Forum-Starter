import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { PiUserCircleDuotone } from "react-icons/pi";
import { FaAngleRight } from "react-icons/fa6";
import { AppState } from "../../App";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";


const Home = () => {
  const { user, question } = useContext(AppState);

  const navigate = useNavigate();

  const handleAskQuestionClick = () => {
     // Navigates to the "/questions" route
    navigate("/questions");
  };

  return (
    <>
      <Header />
      <section className="bg-body-tertiary">
        <div className="d-flex justify-content-around pt-5 ">
          <button
            onClick={() => {
              localStorage.setItem("reloaded", "true");
              navigate("/questions");
            }}
            className="btn btn-primary fw-bold px-5 action_btn"
          >
            Ask Question
          </button>
          <p className="fw-semibold" style={{  color: "red", fontWeight: "bold" }} >
            <span className="text-warning" >Welcome:</span> {user?.username} </p>
        </div>
        <div className="container mt-5">
          <h2>Questions</h2>

          {question.allquestion &&
            question.allquestion.map((item, index) => (
              <Link
                onClick={handleAskQuestionClick}
                className="text-decoration-none text-black"
                key={index}
                to={`/answer?title=${encodeURIComponent(
                  item.title
                )}&description=${encodeURIComponent(
                  item.description
                )}&questionid=${encodeURIComponent(
                  item.questionid
                )}&reload=true`}
              >
                <hr />
                <div className="d-flex justify-content-between align-items-center ">
                  <div class="d-flex flex-column flex-md-row gap-md-5">
                    <div className="d-flex flex-column gap-2">
                      {/* user */}
                      <div
                        className="user-icon"
                        style={{
                          width: "100px",
                          height: "100px",
                          size: "100px",
                        }}
                      >
                        <PiUserCircleDuotone style={{ fontSize: "100px" }} />
                      </div>
                      <div>{item.username}</div>
                    </div>
                    <div className="">
                      <p className="text-start mt-4">{item.title}</p>
                    </div>
                  </div>

                  <div>
                    <FaAngleRight />
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home
