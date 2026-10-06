import { useEffect, useState } from "react";
import "./SkillGap.css";

function SkillGap() {

  const [profile, setProfile] = useState(null);
  const [currentSkills, setCurrentSkills] = useState([]);
  const [missingSkills, setMissingSkills] = useState([]);

  useEffect(() => {

    const savedProfile =
      localStorage.getItem("studentProfile");

    if (savedProfile) {

      const data = JSON.parse(savedProfile);

      setProfile(data);

      const skills = data.skills
        .toLowerCase()
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill !== "");

      setCurrentSkills(skills);

      const requiredSkills = [
        "python",
        "machine learning",
        "numpy",
        "pandas",
        "tensorflow"
      ];

      const missing = requiredSkills.filter(
        (skill) => !skills.includes(skill)
      );

      setMissingSkills(missing);
    }

  }, []);

  return (
    <div className="skill-gap-page">

      <div className="skill-gap-container">

        <h1>📚 Skill Gap Analysis</h1>

        {profile && (
          <div className="skill-profile">

            <h2>
              Skill Analysis for {profile.name}
            </h2>

            <p>
              <strong>Education:</strong>{" "}
              {profile.education}
            </p>

            <p>
              <strong>Target Career:</strong>{" "}
              {profile.jobRole}
            </p>

          </div>
        )}

        <div className="skills-box">

          <h2>✅ Your Current Skills</h2>

          <div className="skill-list">

            {currentSkills.map((skill) => (
              <span
                className="current-skill"
                key={skill}
              >
                ✓ {skill}
              </span>
            ))}

          </div>

        </div>

        <div className="skills-box">

          <h2>⚠️ Skills You Should Learn</h2>

          <div className="skill-list">

            {missingSkills.map((skill) => (
              <span
                className="missing-skill"
                key={skill}
              >
                ⚠ {skill}
              </span>
            ))}

          </div>

        </div>

        <div className="learning-box">

          <h2>🎯 Recommended Learning Path</h2>

          <ol>

            <li>Strengthen Advanced Python</li>

            <li>Learn NumPy and Pandas</li>

            <li>Learn Machine Learning</li>

            <li>Practice Data Analysis</li>

            <li>Learn TensorFlow</li>

          </ol>

        </div>

      </div>

    </div>
  );
}

export default SkillGap;