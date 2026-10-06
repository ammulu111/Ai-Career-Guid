import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Profile.css";

function Profile() {

  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "",
    education: "",
    skills: "",
    interests: "",
    jobRole: "",
    location: ""
  });

  const [loading, setLoading] = useState(false);


  // Handle input changes
  const handleChange = (e) => {

    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });

  };


  // Send profile to FastAPI
  const handleCareerRecommendations = async () => {

    // Check required fields
    if (
      !profile.name ||
      !profile.education ||
      !profile.skills ||
      !profile.interests ||
      !profile.jobRole ||
      !profile.location
    ) {

      alert("Please fill all the fields.");

      return;
    }


    setLoading(true);


    try {

      const response = await fetch(
        "http://127.0.0.1:8000/api/profile",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(profile)
        }
      );


      if (!response.ok) {

        throw new Error(
          "Failed to send profile to backend"
        );

      }


      const data = await response.json();


      console.log(
        "Backend Response:",
        data
      );


      // Save profile locally also
      localStorage.setItem(
        "studentProfile",
        JSON.stringify(profile)
      );


      alert(
        "Profile submitted successfully!"
      );


      // Go to Career Recommendations
      navigate("/career");


    } catch (error) {

      console.error(
        "Backend Error:",
        error
      );

      alert(
        "Could not connect to backend. Please make sure FastAPI is running."
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="profile-page">

      <div className="profile-box">

        <h1>Student Profile</h1>

        <p>
          Tell us about yourself to get personalized
          career guidance.
        </p>


        <form>


          {/* Full Name */}

          <label>
            Full Name
          </label>

          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={profile.name}
            onChange={handleChange}
            required
          />


          {/* Education */}

          <label>
            Education
          </label>

          <input
            type="text"
            name="education"
            placeholder="Example: B.Tech CSE"
            value={profile.education}
            onChange={handleChange}
            required
          />


          {/* Skills */}

          <label>
            Skills
          </label>

          <input
            type="text"
            name="skills"
            placeholder="Example: Python, Java, SQL"
            value={profile.skills}
            onChange={handleChange}
            required
          />


          {/* Interests */}

          <label>
            Interests
          </label>

          <input
            type="text"
            name="interests"
            placeholder="Example: AI, Web Development"
            value={profile.interests}
            onChange={handleChange}
            required
          />


          {/* Job Role */}

          <label>
            Preferred Job Role
          </label>

          <select
            name="jobRole"
            value={profile.jobRole}
            onChange={handleChange}
            required
          >

            <option value="">
              Select a job role
            </option>

            <option value="AI/ML Engineer">
              AI/ML Engineer
            </option>

            <option value="Data Analyst">
              Data Analyst
            </option>

            <option value="Software Developer">
              Software Developer
            </option>

            <option value="Web Developer">
              Web Developer
            </option>

            <option value="Data Scientist">
              Data Scientist
            </option>

            <option value="Cybersecurity Analyst">
              Cybersecurity Analyst
            </option>

          </select>


          {/* Location */}

          <label>
            Preferred Location
          </label>

          <input
            type="text"
            name="location"
            placeholder="Example: Hyderabad"
            value={profile.location}
            onChange={handleChange}
            required
          />


          {/* Submit Button */}

          <button
            type="button"
            onClick={handleCareerRecommendations}
            disabled={loading}
          >

            {loading
              ? "Sending..."
              : "Get Career Recommendations"}

          </button>


        </form>

      </div>

    </div>

  );
}

export default Profile;