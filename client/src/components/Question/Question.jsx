import React, { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import axios from "../../axiosConfig";
import { v4 as uuidv4 } from "uuid";
import { AppState } from "../../App";
import { FaArrowAltCircleRight } from "react-icons/fa";
// footer
import Footer from "../Footer/Footer";

const Question = () => {
  const navigate = useNavigate();
  const { user } = useContext(AppState);
  const token = localStorage.getItem("token");

  console.log(user);

  const titleDom = useRef(null);
  const descriptionDom = useRef(null);
  const tagDom = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const titleValue = titleDom.current.value;
    const descriptionValue = descriptionDom.current.value;
    const tagValue = tagDom.current.value;
    const questionid = uuidv4();
    const userid = user.userid;

    console.log(titleValue);
    console.log(descriptionValue);
    console.log(tagValue);
    console.log(questionid);
    console.log(userid);

    if (!questionid || !titleValue || !descriptionValue || !tagValue) {
      alert("please provide all required fields");
      return;
    }

    try {
      const response = await axios.post(
        "/questions/add-questions",
        {
          questionid: questionid,
          userid: userid,
          title: titleValue,
          description: descriptionValue,
          tag: tagValue,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      titleDom.current.value = "";
      descriptionDom.current.value = "";
      tagDom.current.value = "";
      console.log(response, "response");

      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 2000);
    } catch (error) {
      alert("something went wrong");
      console.log(error.response);
    }
  }
  return (
    <section>
      <Header />
      <div className="container d-flex flex-column align-items-center mt-4 ">
        <div className="justify-content-around ">
          <h2>Steps to Write a good questions </h2>
        </div>

        <div>

          <ul>
            <li>
              <FaArrowAltCircleRight /> Summarise you problem in one-line title
            </li>
            <li>
              <FaArrowAltCircleRight /> Describe your problem in more detail
            </li>
            <li>
              <FaArrowAltCircleRight /> Describe what you tried and What you
              expected to happen{" "}
            </li>
            <li>
              <FaArrowAltCircleRight /> Review your question and post it to the
              site{" "}
            </li>
          </ul>
        </div>
      </div>

      <div className="d-flex flex-column align-items-center container  shadow-sm p-3 mb-5 bg-body rounded">
        <div className="mt-5 pt-4">
          <div>
            <h3>Ask a Public question </h3>
          </div>
          <div className="align-items-center">
            <p>Go to Question page</p>
          </div>
        </div>

        <div className="container">
          <form action="" onSubmit={handleSubmit}>
            <div className="mb-2">
              <input
                type="text"
                placeholder="Title"
                className="form-control "
                ref={titleDom}
                required
              />
            </div>

            <div>
              <textarea
                class="form-control p-4"
                id="exampleFormControlTextarea1"
                rows="3"
                placeholder="Question Description "
                ref={descriptionDom}
                required
              ></textarea>
            </div>

            <div>
              <input
                type="text"
                placeholder="tag"
                className="form-control mt-2 "
                ref={tagDom}
                required
              />
            </div>
            <div className=" mt-2">
              <button
                className="btn btn-primary fw-bold px-5 action_btn"
                type="Submit"
              >
                Post your Question
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Question;
