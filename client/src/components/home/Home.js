import React, { useState, useEffect } from "react";
import "./home.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import sortDesc from "../../assets/icons/sort-descending.png";
import sortAsc from "../../assets/icons/sort-ascending.png";
import search from "../../assets/icons/search.png";
import { Link } from "react-router-dom";

const Home = ({ data }) => {
  let sortedData = [];
  let totalStudents = data.length;
  let totalPoints = 0;
  let [loading, setLoading] = useState(true);
  let [sortOption, setSortOption] = useState("desc");
  let [searchTerm, setSearchTerm] = useState("");

  if (data.length) {
    //adding ranks
    data = data
      .sort((a, b) => b.points - a.points)
      .map((student, index) => {
        return {
          ...student,
          rank: index + 1,
        };
      });
    totalPoints = data.reduce((previous, b) => previous + b.points, 0);

    sortedData =
      sortOption === "desc"
        ? data.sort((a, b) => b.points - a.points)
        : data.sort((a, b) => a.points - b.points);
  }

  if (searchTerm) {
    sortedData = sortedData.filter((student) =>
      student.name.toLowerCase().includes(searchTerm)
    );
  }

  useEffect(() => {
    setTimeout(() => setLoading((loading) => !loading), 100);
  }, []);

  const handleSortClick = () => {
    let sort = sortOption === "desc" ? "asc" : "desc";
    setSortOption(sort);
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  return (
    <main>
      {loading ? (
        <div className="loader">
          <Loader
            type="BallTriangle"
            color="black"
            height={100}
            width={100}
            timeout={1000}
          />
        </div>
      ) : (
        <>
          {" "}
          <h3>Student Leaderboard</h3>
          <div className="flex-wrapper">
            <div className="leaderboard">
              <div className="filters">
                <input
                  onInput={(e) => handleSearch(e.target.value)}
                  placeholder="Search..."
                  type="text"
                />
                <img className="search-icon" src={search} />

                <button onClick={(e) => handleSortClick()}>
                  {" "}
                  Sort
                  {sortOption === "desc" ? (
                    <img src={sortDesc} />
                  ) : (
                    <img src={sortAsc} />
                  )}
                </button>
              </div>
              <table>
                <thead className="category">
                  <tr>
                    <td>Student</td>
                    <td>Name</td>
                    <td>Points</td>
                    <td>Rank</td>
                  </tr>
                </thead>
                <tbody className="rows">
                  {sortedData.map((student, index) => {
                    return (
                      <tr key={index}>
                        <td className="student">
                          <div
                            style={{ backgroundImage: `url(${student.image})` }}
                            className="img-wrapper"
                          ></div>
                        </td>
                        <td>
                          {" "}
                          <Link
                            style={{
                              color: "black",
                              fontWeight: "500",
                              textDecoration: "underline",
                              display: "block",
                            }}
                            to={`/student/${student._id}`}
                          >
                            {student.name}
                          </Link>{" "}
                        </td>
                        <td>{student.points}</td>
                        <td>#{student.rank}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="container">
              <div className="total-wrapper students">
                <div>
                  <p>Total Students</p>
                  {totalStudents && <p>{totalStudents}</p>}
                </div>
              </div>
              <div className="total-wrapper">
                <div>
                  <p>Total Points</p>
                  {totalPoints && <p>{totalPoints}</p>}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default Home;
