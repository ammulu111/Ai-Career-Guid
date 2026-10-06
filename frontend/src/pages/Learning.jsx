import { useEffect, useState } from "react";
import "./Learning.css";

function Learning() {

  const [profile, setProfile] = useState(null);

  const [courses, setCourses] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  // ==========================================
  // GET PROFILE
  // ==========================================

  useEffect(() => {

    const savedProfile =
      localStorage.getItem("studentProfile");


    if (!savedProfile) {

      setError(
        "Student profile not found. Please complete your profile first."
      );

      setLoading(false);

      return;
    }


    const data = JSON.parse(savedProfile);

    setProfile(data);

    getLearningRecommendations(data);

  }, []);


  // ==========================================
  // CALL FASTAPI
  // ==========================================

  const getLearningRecommendations = async (data) => {

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/api/learning",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(data)
        }
      );


      if (!response.ok) {

        throw new Error(
          "Failed to get learning recommendations"
        );

      }


      const result = await response.json();


      console.log(
        "Learning API Response:",
        result
      );


      setCourses(result.courses);

    }

    catch (error) {

      console.error(
        "Learning API Error:",
        error
      );

      setError(
        "Could not connect to the learning recommendation service."
      );

    }

    finally {

      setLoading(false);

    }

  };


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <div className="learning-page">

        <div className="learning-container">

          <h1>
            🎓 Learning & Course Recommendations
          </h1>

          <p
            style={{
              textAlign: "center",
              color: "#666",
              fontSize: "18px"
            }}
          >
            🤖 Finding the best courses for you...
          </p>

        </div>

      </div>

    );

  }


  // ==========================================
  // ERROR
  // ==========================================

  if (error) {

    return (

      <div className="learning-page">

        <div className="learning-container">

          <h1>
            🎓 Learning & Course Recommendations
          </h1>

          <div
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "12px",
              textAlign: "center",
              boxShadow:
                "0 5px 20px rgba(0,0,0,0.08)"
            }}
          >

            <p
              style={{
                color: "#dc2626",
                fontSize: "18px"
              }}
            >
              ❌ {error}
            </p>

          </div>

        </div>

      </div>

    );

  }


  // ==========================================
  // MAIN PAGE
  // ==========================================

  return (

    <div className="learning-page">

      <div className="learning-container">


        {/* PAGE TITLE */}

        <h1>
          🎓 Learning & Course Recommendations
        </h1>


        {/* PROFILE */}

        {profile && (

          <div className="learning-profile">

            <h2>
              Recommended Learning for {profile.name}
            </h2>

            <p>
              <strong>
                Target Career:
              </strong>{" "}
              {profile.jobRole}
            </p>

            <p>
              <strong>
                Your Skills:
              </strong>{" "}
              {profile.skills}
            </p>

          </div>

        )}


        {/* INTRODUCTION */}

        <p className="learning-intro">

          Based on your skills and career goal,
          here are recommended courses to improve
          your knowledge.

        </p>


        {/* COURSE CARDS */}

        <div className="course-cards">

          {courses.map(
            (course) => (

              <div
                className="course-card"
                key={course.title}
              >

                <h2>
                  {course.title}
                </h2>


                <h3>
                  📖 {course.platform}
                </h3>


                <p>
                  <strong>
                    Level:
                  </strong>{" "}
                  {course.level}
                </p>


                <p>
                  {course.reason}
                </p>


                <div className="course-match">

                  ⭐ {course.match}% Match

                </div>


                <button>
                  View Course
                </button>

              </div>

            )
          )}

        </div>

      </div>

    </div>

  );

}

export default Learning;