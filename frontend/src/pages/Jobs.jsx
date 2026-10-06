import { useEffect, useState } from "react";
import "./Jobs.css";

function Jobs() {

  const [profile, setProfile] = useState(null);
  const [jobs, setJobs] = useState([]);

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

    getJobRecommendations(data);

  }, []);


  // ==========================================
  // CALL FASTAPI JOB API
  // ==========================================

  const getJobRecommendations = async (data) => {

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/api/jobs",
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
          "Failed to get job recommendations"
        );

      }


      const result = await response.json();


      console.log(
        "Jobs API Response:",
        result
      );


      setJobs(result.jobs);

    }

    catch (error) {

      console.error(
        "Jobs API Error:",
        error
      );

      setError(
        "Could not connect to the job recommendation service."
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

      <div className="jobs-page">

        <div className="jobs-container">

          <h1>
            💼 Job Recommendations
          </h1>

          <p
            style={{
              textAlign: "center",
              color: "#666",
              fontSize: "18px"
            }}
          >
            🤖 Finding jobs that match your profile...
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

      <div className="jobs-page">

        <div className="jobs-container">

          <h1>
            💼 Job Recommendations
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

    <div className="jobs-page">

      <div className="jobs-container">


        {/* Heading */}

        <h1>
          💼 Job Recommendations
        </h1>


        {/* Profile */}

        {profile && (

          <div className="job-profile">

            <h2>
              Jobs for {profile.name}
            </h2>

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

            <p>
              <strong>
                Your Skills:
              </strong>{" "}
              {profile.skills}
            </p>

          </div>

        )}


        {/* Introduction */}

        <p className="jobs-intro">

          Based on your skills, preferred role and
          location, here are some recommended jobs.

        </p>


        {/* Job Cards */}

        <div className="job-cards">

          {jobs.map(
            (job) => (

              <div
                className="job-card"
                key={job.title}
              >

                <h2>
                  {job.title}
                </h2>


                <h3>
                  {job.company}
                </h3>


                <p>
                  📍 {job.location}
                </p>


                <p>
                  🛠 <strong>
                    Required Skills:
                  </strong>{" "}
                  {job.skills}
                </p>


                <div className="job-score">

                  ⭐ {job.score}% Match

                </div>


                <button>
                  View Job
                </button>

              </div>

            )
          )}

        </div>

      </div>

    </div>

  );

}

export default Jobs;