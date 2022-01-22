import React, { useEffect, useRef, useState } from "react";
import "./modify.css";
import trash from "../../assets/icons/delete.png";
import search from "../../assets/icons/search.png";
import edit from "../../assets/icons/edit.png";
import add from "../../assets/icons/more-white.png";
import axios from "axios";

const ModifyPage = ({ data }) => {
  let students = data || [];
  let [state, setState] = useState({ name: "", points: 0, errorMessage: null });
  let [searchTerm, setSearchTerm] = useState("");
  let [reload, setReload] = useState(false);
  let [selectedStudent, setSelected] = useState("");

  const defaultImage = "/images/default.jpg";
  let modal = useRef();
  let nameInput = useRef();
  let pointInput = useRef();
  let successButton = useRef();

  if (searchTerm) {
    students = data.filter((student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const handleModalDisplay = (displayOption) => {
    displayOption === "show"
      ? modal.current.classList.add(displayOption)
      : modal.current.classList.remove("show");
  };

  const submitNewStudent = async (e) => {
    try {
      const response = await axios.post("/api/students/create", {
        name: state.name.toLocaleLowerCase(),
        points: state.points,
        image: defaultImage,
      });

      data.push(response.data);

      nameInput.current.value = "";
      pointInput.current.value = 0;
      successButton.current.classList.add("show");

      setState({
        name: "",
        points: 0,
        errorMessagem: null,
      });

      setTimeout(() => {
        successButton.current.classList.remove("show");
      }, 2000);
    } catch (error) {
      if (error.response) {
        let { message } = error.response.data;
        setState({ ...state, errorMessage: message });
      }
    }
  };

  const deleteStudent = async (_id) => {
    try {
      const response = await axios.delete(`/api/students/delete/${_id}`, {
        name: state.name.toLocaleLowerCase(),
        points: state.points,
        image: defaultImage,
      });
      let removeDataIndex = data.indexOf(
        data.find((student) => student._id === _id)
      );
      data.splice(removeDataIndex, 1);
      setReload(!reload);
    } catch (error) {
      if (error.response) {
        console.error(error.response.data.message);
      }
    }
  };

  const updateStudent = async (id, index) => {
    try {
      const response = await axios.put(`/api/students/update/${id}`, {
        name: state.name.toLocaleLowerCase(),
        points: state.points,
        image: defaultImage,
      });

      let updatedIndex = data.indexOf(
        data.find((student) => student._id === id)
      );

      data[updatedIndex] = response.data;
      setSelected("");
    } catch (error) {
      if (error.response) {
        console.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="modify-page">
      <div className="leaderboard">
        <div className="filters">
          <input
            onInput={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            type="text"
          />
          <img className="search-icon" src={search} />
        </div>
        <table>
          <thead className="category">
            <tr>
              <td>Student</td>
              <td>Name</td>
              <td>Points</td>
              <td>Edit</td>
              <td>Remove</td>
            </tr>
          </thead>
          <tbody className="rows">
            {students &&
              students.map((student, index) => {
                return (
                  <tr key={index}>
                    <td className="student">
                      <div
                        style={{ backgroundImage: `url(${student.image})` }}
                        className="img-wrapper"
                      ></div>
                    </td>
                    <td>
                      {selectedStudent && selectedStudent === student._id ? (
                        <input
                          type="text"
                          defaultValue={student.name}
                          onChange={(e) => {
                            setState({
                              ...state,
                              name: e.target.value,
                            });
                          }}
                        />
                      ) : (
                        student.name
                      )}
                    </td>
                    <td>
                      {selectedStudent && selectedStudent === student._id ? (
                        <input
                          onChange={(e) => {
                            setState({
                              ...state,
                              points: e.target.value,
                            });
                          }}
                          type="number"
                          defaultValue={student.points}
                        />
                      ) : (
                        student.points
                      )}
                    </td>
                    <td>
                      {selectedStudent && selectedStudent === student._id ? (
                        <div className="buttons">
                          <button
                            className="btn"
                            onClick={(e) =>
                              updateStudent(selectedStudent, index)
                            }
                          >
                            Save
                          </button>
                          <button
                            className="btn cancel"
                            onClick={(e) => setSelected("")}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <img
                          onClick={(e) => {
                            setSelected(student._id);
                          }}
                          src={edit}
                        />
                      )}
                    </td>
                    <td className="trash">
                      <img
                        src={trash}
                        onClick={(e) => deleteStudent(student._id)}
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <div>
        <button onClick={() => handleModalDisplay("show")} className="add">
          <img src={add}></img>Add New Student
        </button>
      </div>
      <div ref={modal} className="modal-wrapper">
        <div className="modal">
          <form onSubmit={(e) => e.preventDefault()}>
            <h3>Add Student</h3>
            <button ref={successButton} className="success">
              Student is Successfully added{" "}
            </button>
            <input
              onChange={(e) => {
                setState({
                  ...state,
                  errorMessage: null,
                  name: e.target.value,
                });
              }}
              type="text"
              placeholder="Name"
              ref={nameInput}
            ></input>
            {state.errorMessage && (
              <p className="error-message">{state.errorMessage}</p>
            )}
            <input
              ref={pointInput}
              onChange={(e) => {
                setState({ ...state, points: e.target.value });
              }}
              type="number"
              min={0}
              placeholder="Points"
            ></input>

            <button
              className="btn"
              disabled={!state.name && !state.points}
              onClick={(e) => submitNewStudent(e)}
            >
              Submit
            </button>
            <button
              className="btn"
              className="cancel"
              onClick={() => handleModalDisplay("")}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModifyPage;
