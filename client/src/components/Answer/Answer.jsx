import React, { useRef, useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../axiosConfig.js";
import { AppState } from "../../App.jsx";
import Header from "../Header/Header.jsx";
import { PiUserCircleDuotone } from "react-icons/pi";
import Footer from "../Footer/Footer.jsx";

const Answer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const title = queryParams.get("title");
  const description = queryParams.get("description");
  const questionid = queryParams.get("questionid");

  const { user } = useContext(AppState);

  const [data, setData] = useState({});

  const token = localStorage.getItem("token");

  const answerDom = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const answerValue = answerDom.current.value;
    const userid = user.userid;

    if (!questionid || !userid || !answerValue) {
      alert("please provide all required fields");
      return;
    }

    try {
      // Post the answer to the server
      await axios.post(
        "/answers/add-answers",
        {
          userid: userid,
          questionid: questionid,
          answer: answerValue,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      answerDom.current.value = "";
      getAnswer();
      alert("answer added succesfully");
    } catch (error) {
      alert(" something went wrong");
      console.log(error.response);
    }
  }
  async function getAnswer() {
    try {
      const response = await axios.get("/answers/all-answers", {
        headers: {
          Authorization: "Bearer " + token,
          questionid: questionid,
        },
      });
  
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error.response);
    }
  }

  useEffect(() => {
    getAnswer();
  }, []);

  return (
    <section>
      <Header />
      <div className="landing bg-body-tertiary  pt-3">
        <div className="container   pt-3">
          <div className="">
            <span className="fw-semibold fs-2 ">Question</span> <br />
            <span className="fw-semibold fs-5">{title}</span>
            <span>
              <p>{description} </p>
            </span>
          </div>

          <div>
            <hr />
            <span className="fw-semibold fs-3">Answer from the Community</span>
          </div>

          <div>
            {data.allanswer &&
              data.allanswer.map((item, index) => (
                <div key={index} className="text-decoration-none text-black">
                  <hr />
                  <div className="d-md-flex align-items-center">
                    <div className="d-flex flex-column align-items-center gap-3">
                      <div>
                        <PiUserCircleDuotone size={100} />
                      </div>
                      <div>{user.username}</div>
                    </div>
                    <div>
                      <p>{item.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="d-flex flex-column align-items-center container  shadow-sm p-2 mb-5 bg-body rounded">
          <div className="mt-5 pt-4">
            <div>
              <h3>Answer the Top Question </h3>
            </div>
            <div className="align-items-center mt-2">
              <p>Go to Question page</p>
            </div>
          </div>

          <div className="container">
            <form action="" className="" onSubmit={handleSubmit}>
              <div>
                <textarea
                  class="form-control p-4"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="Answer"
                  ref={answerDom}
                  required
                ></textarea>
              </div>

              <div className=" mt-2">
                <button
                  className="btn btn-primary fw-bold px-5 action_btn"
                  type="Submit"
                >
                  Post your Answer
                </button>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </section>
  );
};

export default Answer;
