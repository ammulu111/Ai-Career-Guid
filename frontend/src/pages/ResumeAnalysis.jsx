import { useState } from "react";
import "./ResumeAnalysis.css";

function ResumeAnalysis() {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
      setAnalysis(null);
    }
  };

  const analyzeResume = () => {
    if (!file) {
      alert("Please upload your resume first.");
      return;
    }

    const result = {
      match: 78,
      matchingSkills: [
        "Python",
        "Java",
        "SQL"
      ],
      missingSkills: [
        "Machine Learning",
        "NumPy",
        "Pandas",
        "TensorFlow"
      ],
      suggestions: [
        "Learn Machine Learning fundamentals",
        "Practice NumPy and Pandas",
        "Build an AI/ML project",
        "Learn TensorFlow",
        "Add projects and certifications to your resume"
      ]
    };

    setAnalysis(result);
  };

  return (
    <div className="resume-page">

      <div className="resume-container">

        <h1>📄 Resume Analysis</h1>

        <p className="resume-intro">
          Upload your resume to analyze your skills,
          identify skill gaps and get career improvement
          suggestions.
        </p>


        {/* Upload Section */}

        <div className="upload-box">

          <h2>Upload Your Resume</h2>

          <p>
            Supported formats: PDF, DOC, DOCX
          </p>

          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
          />

          {file && (
            <p className="file-name">
              📎 Selected File: {file.name}
            </p>
          )}

          <button
            onClick={analyzeResume}
          >
            🤖 Analyze Resume
          </button>

        </div>


        {/* Analysis Result */}

        {analysis && (

          <div className="analysis-section">

            <h2>
              📊 Resume Analysis Result
            </h2>


            {/* Match Score */}

            <div className="match-box">

              <h3>
                Resume Match Score
              </h3>

              <div className="match-score">
                {analysis.match}%
              </div>

              <p>
                Your resume has a good match with
                the selected career path.
              </p>

            </div>


            {/* Matching Skills */}

            <div className="analysis-box">

              <h3>
                ✅ Matching Skills
              </h3>

              <div className="skill-list">

                {analysis.matchingSkills.map(
                  (skill) => (
                    <span
                      className="matching-skill"
                      key={skill}
                    >
                      ✓ {skill}
                    </span>
                  )
                )}

              </div>

            </div>


            {/* Missing Skills */}

            <div className="analysis-box">

              <h3>
                ⚠️ Skills to Improve
              </h3>

              <div className="skill-list">

                {analysis.missingSkills.map(
                  (skill) => (
                    <span
                      className="missing-skill"
                      key={skill}
                    >
                      ⚠ {skill}
                    </span>
                  )
                )}

              </div>

            </div>


            {/* Suggestions */}

            <div className="suggestions-box">

              <h3>
                💡 Improvement Suggestions
              </h3>

              <ul>

                {analysis.suggestions.map(
                  (suggestion, index) => (
                    <li key={index}>
                      {suggestion}
                    </li>
                  )
                )}

              </ul>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}

export default ResumeAnalysis;
