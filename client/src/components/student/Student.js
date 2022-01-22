import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./student.css";

const Student = () => {
  let { id } = useParams();
  let [student, setStudent] = useState({});

  const getStudent = async (id) => {
    try {
      const response = await axios.get(`/api/students/${id}`);
      setStudent(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStudent(id);
  }, []);

  console.log(student);

  return (
    <div className="student-page">
      {student && (
        <div>
          <div className="flex-div">
            <div
              className="cover"
              style={{ backgroundImage: `url(${student.image})` }}
            ></div>

            <div className="info-wrapper">
              <h1>{student.name}</h1>
              <p className="points">Points: {student.points}</p>
              <div>
                <h3>About</h3>
                <p className="desc">
                  orem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Student;
