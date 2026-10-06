import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Career.css";

function Career() {

  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // ==========================================
  // GET SAVED PROFILE
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

    getCareerRecommendations(data);

  }, []);


  // ==========================================
  // CALL FASTAPI CAREER API
  // ==========================================

  const getCareerRecommendations = async (data) => {

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/api/career",
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
          "Failed to get career recommendations"
        );

      }


      const result = await response.json();


      console.log(
        "Career API Response:",
        result
      );


      setCareers(result.careers);

    }

    catch (error) {

      console.error(
        "Career API Error:",
        error
      );

      setError(
        "Could not connect to the career recommendation service."
      );

    }

    finally {

      setLoading(false);

    }

  };


  // ==========================================
  // LOADING SCREEN
  // ==========================================

  if (loading) {

    return (

      <div className="career-page">

        <div className="career-container">

          <h1>
            🎯 Career Recommendations
          </h1>

          <p
            style={{
              textAlign: "center",
              color: "#666",
              fontSize: "18px"
            }}
          >
            🤖 AI is analyzing your profile...
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

      <div className="career-page">

        <div className="career-container">

          <h1>
            🎯 Career Recommendations
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
                fontSize: "18px",
                marginBottom: "20px"
              }}
            >
              ❌ {error}
            </p>

            <button
              className="jobs-button"
              onClick={() => navigate("/profile")}
            >
              Go to Profile
            </button>

          </div>

        </div>

      </div>

    );

  }


  // ==========================================
  // MAIN PAGE
  // ==========================================

  return (

    <div className="career-page">

      <div className="career-container">


        {/* Heading */}

        <h1>
          🎯 Career Recommendations
        </h1>


        {/* Student Information */}

        {profile && (

          <div className="student-info">

            <h2>
              Welcome, {profile.name}!
            </h2>

            <p>
              <strong>
                Education:
              </strong>{" "}
              {profile.education}
            </p>

            <p>
              <strong>
                Skills:
              </strong>{" "}
              {profile.skills}
            </p>

            <p>
              <strong>
                Interests:
              </strong>{" "}
              {profile.interests}
            </p>

            <p>
              <strong>
                Preferred Role:
              </strong>{" "}
              {profile.jobRole}
            </p>

            <p>
              <strong>
                Preferred Location:
              </strong>{" "}
              {profile.location}
            </p>

          </div>

        )}


        {/* Introduction */}

        <p className="career-intro">

          Based on your skills, interests and preferred
          job role, our backend recommendation system
          has generated the following career matches.

        </p>


        {/* Career Cards */}

        <div className="career-cards">

          {careers.map(
            (career, index) => (

              <div
                className="career-card"
                key={career.title}
              >

                <h2>
                  {career.title}
                </h2>


                <div className="score">

                  {career.score}%

                </div>


                <p>
                  {career.description}
                </p>


                {index === 0 && (

                  <strong>
                    ⭐ Best Match
                  </strong>

                )}

              </div>

            )
          )}

        </div>


        {/* Recommended Skills */}

        <div className="skills-section">

          <h2>
            📚 Recommended Skills to Learn
          </h2>

          <ul>

            <li>
              Machine Learning
            </li>

            <li>
              Pandas and NumPy
            </li>

            <li>
              TensorFlow
            </li>

            <li>
              Data Analysis
            </li>

            <li>
              Advanced Python
            </li>

          </ul>

        </div>


        {/* Navigation Buttons */}

        <div className="jobs-button-section">

          <button
            className="jobs-button"
            onClick={() =>
              navigate("/jobs")
            }
          >
            💼 View Recommended Jobs
          </button>


          <button
            className="jobs-button"
            onClick={() =>
              navigate("/skill-gap")
            }
          >
            📚 Check Skill Gap
          </button>


          <button
            className="jobs-button"
            onClick={() =>
              navigate("/learning")
            }
          >
            🎓 Recommended Courses
          </button>


          <button
            className="jobs-button"
            onClick={() =>
              navigate("/resume-analysis")
            }
          >
            📄 Analyze My Resume
          </button>

        </div>

      </div>

    </div>

  );

}

export default Career;