import { Link, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/profile";
import Dashboard from "./pages/Dashboard";
import Career from "./pages/Career";
import Jobs from "./pages/Jobs";
import SkillGapPage from "./pages/SkillGapPage";
import Learning from "./pages/Learning";
import ResumeAnalysis from "./pages/ResumeAnalysis";

import "./App.css";


/* =========================
   HOME PAGE
========================= */

function Home() {
  return (
    <div className="app">

      {/* Navbar */}

      <nav className="navbar">

        <h2>AI Career Guide</h2>

        <div className="nav-links">

          <a href="#home">Home</a>

          <a href="#about">About</a>

          <Link to="/login">
            <button>Login</button>
          </Link>

        </div>

      </nav>


      {/* Hero Section */}

      <section className="hero" id="home">

        <div className="hero-content">

          <h1>
            Discover Your
            <span> Perfect Career </span>
            with AI
          </h1>

          <p>
            Get personalized career guidance and job
            recommendations based on your skills,
            education and interests.
          </p>

          <Link to="/login">
            <button className="start-button">
              Get Started
            </button>
          </Link>

        </div>

      </section>


      {/* Features Section */}

      <section className="features" id="about">

        <h2>What Our System Provides</h2>

        <div className="feature-container">

          <div className="feature-card">

            <h3>🎯 Career Guidance</h3>

            <p>
              Get career recommendations based on
              your skills and interests.
            </p>

          </div>


          <div className="feature-card">

            <h3>💼 Job Recommendations</h3>

            <p>
              Find job roles that match your skills
              and qualifications.
            </p>

          </div>


          <div className="feature-card">

            <h3>📚 Skill Gap Analysis</h3>

            <p>
              Discover which skills you need to learn
              for your target career.
            </p>

          </div>

        </div>

      </section>

    </div>
  );
}


/* =========================
   BACKEND CONNECTION TEST
========================= */

function BackendTest() {

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {

    fetch("http://127.0.0.1:8000/hello")

      .then((response) => {

        if (!response.ok) {
          throw new Error("Backend request failed");
        }

        return response.json();

      })

      .then((data) => {

        setMessage(data.message);

      })

      .catch((error) => {

        console.error(
          "Backend connection error:",
          error
        );

        setError(
          "Backend connection failed"
        );

      });

  }, []);


  return (

    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f8ff"
      }}
    >

      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "12px",
          boxShadow:
            "0 5px 25px rgba(0,0,0,0.1)",
          textAlign: "center"
        }}
      >

        <h1
          style={{
            color: "#172554",
            marginBottom: "20px"
          }}
        >
          Backend Connection Test
        </h1>


        {message && (

          <p
            style={{
              color: "#16a34a",
              fontSize: "20px",
              fontWeight: "bold"
            }}
          >
            ✅ {message}
          </p>

        )}


        {error && (

          <p
            style={{
              color: "#dc2626",
              fontSize: "18px"
            }}
          >
            ❌ {error}
          </p>

        )}

      </div>

    </div>

  );
}


/* =========================
   APP ROUTES
========================= */

function App() {

  return (

    <Routes>

      {/* Home */}

      <Route
        path="/"
        element={<Home />}
      />


      {/* Backend Test */}

      <Route
        path="/backend-test"
        element={<BackendTest />}
      />


      {/* Login */}

      <Route
        path="/login"
        element={<Login />}
      />


      {/* Register */}

      <Route
        path="/register"
        element={<Register />}
      />


      {/* Student Profile */}

      <Route
        path="/profile"
        element={<Profile />}
      />


      {/* Dashboard */}

      <Route
        path="/dashboard"
        element={<Dashboard />}
      />


      {/* Career Recommendations */}

      <Route
        path="/career"
        element={<Career />}
      />


      {/* Job Recommendations */}

      <Route
        path="/jobs"
        element={<Jobs />}
      />


      {/* Skill Gap */}

      <Route
        path="/skill-gap"
        element={<SkillGapPage />}
      />


      {/* Learning */}

      <Route
        path="/learning"
        element={<Learning />}
      />


      {/* Resume Analysis */}

      <Route
        path="/resume-analysis"
        element={<ResumeAnalysis />}
      />

    </Routes>

  );
}


export default App;