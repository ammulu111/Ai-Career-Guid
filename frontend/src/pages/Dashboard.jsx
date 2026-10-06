import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const savedProfile = localStorage.getItem("studentProfile");

    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  return (
    <div className="dashboard-page">

      <div className="dashboard-container">

        {/* Header */}

        <div className="dashboard-header">

          <div>
            <h1>📊 Student Dashboard</h1>

            {profile ? (
              <p>
                Welcome back, <strong>{profile.name}</strong>!
              </p>
            ) : (
              <p>
                Welcome to your AI Career Dashboard.
              </p>
            )}
          </div>

          <button
            className="profile-button"
            onClick={() => navigate("/profile")}
          >
            👤 My Profile
          </button>

        </div>


        {/* Profile Summary */}

        {profile && (
          <div className="dashboard-profile">

            <h2>👤 Profile Summary</h2>

            <div className="profile-details">

              <p>
                <strong>Education:</strong>{" "}
                {profile.education}
              </p>

              <p>
                <strong>Skills:</strong>{" "}
                {profile.skills}
              </p>

              <p>
                <strong>Interests:</strong>{" "}
                {profile.interests}
              </p>

              <p>
                <strong>Target Role:</strong>{" "}
                {profile.jobRole}
              </p>

              <p>
                <strong>Location:</strong>{" "}
                {profile.location}
              </p>

            </div>

          </div>
        )}


        {/* Feature Cards */}

        <div className="dashboard-grid">

          {/* Career */}

          <div className="dashboard-card">

            <div className="card-icon">
              🎯
            </div>

            <h2>Career Guidance</h2>

            <p>
              Get personalized career recommendations
              based on your skills and interests.
            </p>

            <button
              onClick={() => navigate("/career")}
            >
              View Careers
            </button>

          </div>


          {/* Jobs */}

          <div className="dashboard-card">

            <div className="card-icon">
              💼
            </div>

            <h2>Job Recommendations</h2>

            <p>
              Find job opportunities that match
              your skills and preferred role.
            </p>

            <button
              onClick={() => navigate("/jobs")}
            >
              View Jobs
            </button>

          </div>


          {/* Skill Gap */}

          <div className="dashboard-card">

            <div className="card-icon">
              📚
            </div>

            <h2>Skill Gap Analysis</h2>

            <p>
              Identify missing skills and understand
              what you need to learn.
            </p>

            <button
              onClick={() => navigate("/skill-gap")}
            >
              Check Skill Gap
            </button>

          </div>


          {/* Learning */}

          <div className="dashboard-card">

            <div className="card-icon">
              🎓
            </div>

            <h2>Learning & Courses</h2>

            <p>
              Discover courses and learning resources
              to improve your career skills.
            </p>

            <button
              onClick={() => navigate("/learning")}
            >
              View Courses
            </button>

          </div>


          {/* Resume */}

          <div className="dashboard-card">

            <div className="card-icon">
              📄
            </div>

            <h2>Resume Analysis</h2>

            <p>
              Upload your resume and identify
              strengths and areas for improvement.
            </p>

            <button
              onClick={() => navigate("/resume-analysis")}
            >
              Analyze Resume
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;