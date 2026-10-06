import { useEffect, useState } from "react";
import "./SkillGap.css";

function SkillGapPage() {

  const [profile, setProfile] = useState(null);

  const [currentSkills, setCurrentSkills] = useState([]);

  const [missingSkills, setMissingSkills] = useState([]);

  const [learningPath, setLearningPath] = useState([]);

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

    getSkillGap(data);

  }, []);


  // ==========================================
  // CALL FASTAPI
  // ==========================================

  const getSkillGap = async (data) => {

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/api/skill-gap",
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
          "Failed to get skill gap analysis"
        );

      }


      const result = await response.json();


      console.log(
        "Skill Gap API Response:",
        result
      );


      setCurrentSkills(
        result.current_skills
      );


      setMissingSkills(
        result.missing_skills
      );


      setLearningPath(
        result.learning_path
      );

    }

    catch (error) {

      console.error(
        "Skill Gap API Error:",
        error
      );

      setError(
        "Could not connect to the skill gap service."
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

      <div className="skill-gap-page">

        <div className="skill-gap-container">

          <h1>
            📚 Skill Gap Analysis
          </h1>

          <p
            style={{
              textAlign: "center",
              color: "#666",
              fontSize: "18px"
            }}
          >
            🤖 AI is analyzing your skills...
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

      <div className="skill-gap-page">

        <div className="skill-gap-container">

          <h1>
            📚 Skill Gap Analysis
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

    <div className="skill-gap-page">

      <div className="skill-gap-container">


        {/* PAGE TITLE */}

        <h1>
          📚 Skill Gap Analysis
        </h1>


        {/* PROFILE */}

        {profile && (

          <div className="skill-profile">

            <h2>
              Skill Analysis for {profile.name}
            </h2>

            <p>
              <strong>
                Education:
              </strong>{" "}
              {profile.education}
            </p>

            <p>
              <strong>
                Target Career:
              </strong>{" "}
              {profile.jobRole}
            </p>

          </div>

        )}


        {/* CURRENT SKILLS */}

        <div className="skills-box">

          <h2>
            ✅ Your Current Skills
          </h2>


          <div className="skill-list">

            {currentSkills.length > 0 ? (

              currentSkills.map(
                (skill) => (

                  <span
                    className="current-skill"
                    key={skill}
                  >
                    ✓ {skill}
                  </span>

                )
              )

            ) : (

              <p>
                No matching skills found.
              </p>

            )}

          </div>

        </div>


        {/* MISSING SKILLS */}

        <div className="skills-box">

          <h2>
            ⚠️ Skills You Should Learn
          </h2>


          <div className="skill-list">

            {missingSkills.length > 0 ? (

              missingSkills.map(
                (skill) => (

                  <span
                    className="missing-skill"
                    key={skill}
                  >
                    ⚠ {skill}
                  </span>

                )
              )

            ) : (

              <p>
                🎉 You already have all the
                recommended skills!
              </p>

            )}

          </div>

        </div>


        {/* LEARNING PATH */}

        <div className="learning-box">

          <h2>
            🎯 Recommended Learning Path
          </h2>


          <ol>

            {learningPath.map(
              (item, index) => (

                <li key={index}>
                  {item}
                </li>

              )
            )}

          </ol>

        </div>


      </div>

    </div>

  );

}

export default SkillGapPage;