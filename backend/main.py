from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


# ==========================================
# CREATE FASTAPI APPLICATION
# ==========================================

app = FastAPI()


# ==========================================
# CORS CONFIGURATION
# ==========================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==========================================
# STUDENT PROFILE MODEL
# ==========================================

class StudentProfile(BaseModel):

    name: str
    education: str
    skills: str
    interests: str
    jobRole: str
    location: str


# ==========================================
# HOME API
# ==========================================

@app.get("/")
def home():

    return {
        "message": "AI Career Guide Backend is Working!"
    }


# ==========================================
# TEST API
# ==========================================

@app.get("/hello")
def hello():

    return {
        "message": "Hello from FastAPI!"
    }


# ==========================================
# STUDENT PROFILE API
# ==========================================

@app.post("/api/profile")
def create_profile(profile: StudentProfile):

    return {
        "message": "Student profile received successfully!",
        "profile": profile
    }


# ==========================================
# CAREER RECOMMENDATION API
# ==========================================

@app.post("/api/career")
def career_recommendation(profile: StudentProfile):

    skills = profile.skills.lower()
    interests = profile.interests.lower()
    job_role = profile.jobRole.lower()

    ai_score = 50
    data_score = 50
    software_score = 50


    # ---------- AI / ML ----------

    if "python" in skills:
        ai_score += 15

    if "machine learning" in skills:
        ai_score += 15

    if "tensorflow" in skills:
        ai_score += 10

    if "numpy" in skills:
        ai_score += 5

    if "pandas" in skills:
        ai_score += 5

    if (
        "ai" in interests
        or "artificial intelligence" in interests
        or "machine learning" in interests
    ):
        ai_score += 15

    if "ai/ml" in job_role:
        ai_score += 10


    # ---------- DATA ANALYST ----------

    if "sql" in skills:
        data_score += 15

    if "excel" in skills:
        data_score += 10

    if "python" in skills:
        data_score += 10

    if "pandas" in skills:
        data_score += 10

    if (
        "data" in interests
        or "analytics" in interests
        or "analysis" in interests
    ):
        data_score += 15

    if "data analyst" in job_role:
        data_score += 10


    # ---------- SOFTWARE DEVELOPER ----------

    if "java" in skills:
        software_score += 15

    if "javascript" in skills:
        software_score += 10

    if "react" in skills:
        software_score += 10

    if "python" in skills:
        software_score += 5

    if (
        "software" in interests
        or "programming" in interests
        or "web development" in interests
    ):
        software_score += 15

    if "software developer" in job_role:
        software_score += 10


    # ---------- LIMIT SCORE ----------

    ai_score = min(ai_score, 100)
    data_score = min(data_score, 100)
    software_score = min(software_score, 100)


    # ---------- RESULTS ----------

    results = [

        {
            "title": "AI/ML Engineer",
            "score": ai_score,
            "description":
                "A strong career option for students interested in Artificial Intelligence, Machine Learning and programming."
        },

        {
            "title": "Data Analyst",
            "score": data_score,
            "description":
                "A good career option for students interested in SQL, data analysis and problem solving."
        },

        {
            "title": "Software Developer",
            "score": software_score,
            "description":
                "A suitable career for students interested in programming, software development and application building."
        }

    ]


    # Sort highest score first

    results.sort(
        key=lambda career: career["score"],
        reverse=True
    )


    return {

        "message":
            "Career recommendations generated successfully!",

        "student":
            profile.name,

        "careers":
            results

    }


# ==========================================
# JOB RECOMMENDATION API
# ==========================================

@app.post("/api/jobs")
def job_recommendations(profile: StudentProfile):

    skills = profile.skills.lower()
    role = profile.jobRole.lower()
    location = profile.location


    jobs = [

        {
            "title": "AI/ML Intern",

            "company": "Tech Solutions",

            "location": location,

            "skills":
                "Python, Machine Learning, NumPy",

            "score":
                (
                    92
                    if "python" in skills
                    and (
                        "machine learning" in skills
                        or "ai/ml" in role
                    )
                    else 70
                )
        },


        {
            "title": "Data Analyst Intern",

            "company": "Data Analytics Company",

            "location": location,

            "skills":
                "Python, SQL, Excel, Pandas",

            "score":
                (
                    85
                    if "sql" in skills
                    and "python" in skills
                    else 68
                )
        },


        {
            "title": "Python Developer",

            "company": "Software Technologies",

            "location": location,

            "skills":
                "Python, SQL, Git",

            "score":
                (
                    80
                    if "python" in skills
                    else 65
                )
        },


        {
            "title": "Software Developer Intern",

            "company": "IT Solutions",

            "location": location,

            "skills":
                "Java, C, Python",

            "score":
                (
                    78
                    if "java" in skills
                    or "c" in skills
                    else 65
                )
        }

    ]


    # Sort jobs by match score

    jobs.sort(
        key=lambda job: job["score"],
        reverse=True
    )


    return {

        "message":
            "Job recommendations generated successfully!",

        "student":
            profile.name,

        "jobs":
            jobs

    }


# ==========================================
# SKILL GAP ANALYSIS API
# ==========================================

@app.post("/api/skill-gap")
def skill_gap_analysis(profile: StudentProfile):

    skills = profile.skills.lower()


    # Skills required for the recommended career

    required_skills = [

        "python",
        "machine learning",
        "numpy",
        "pandas",
        "tensorflow"

    ]


    # Find current skills

    current_skills = []


    for skill in required_skills:

        if skill in skills:

            current_skills.append(skill)


    # Find missing skills

    missing_skills = [

        skill

        for skill in required_skills

        if skill not in current_skills

    ]


    # Learning path

    learning_path = [

        "Strengthen Advanced Python",

        "Learn NumPy and Pandas",

        "Learn Machine Learning",

        "Practice Data Analysis",

        "Learn TensorFlow"

    ]


    return {

        "message":
            "Skill gap analysis completed successfully!",

        "student":
            profile.name,

        "current_skills":
            current_skills,

        "missing_skills":
            missing_skills,

        "learning_path":
            learning_path

    }
    # ==========================================
# LEARNING / COURSE RECOMMENDATION API
# ==========================================

@app.post("/api/learning")
def learning_recommendations(profile: StudentProfile):

    skills = profile.skills.lower()

    courses = [

        {
            "title": "Advanced Python Programming",
            "platform": "Coursera",
            "level": "Beginner to Intermediate",
            "reason": "Improve your Python programming skills.",
            "match": 95 if "python" in skills else 75
        },

        {
            "title": "Machine Learning Fundamentals",
            "platform": "Coursera",
            "level": "Intermediate",
            "reason": "Build a strong foundation in Machine Learning.",
            "match": 95
            if "machine learning" in skills
            else 80
        },

        {
            "title": "Python for Data Analysis",
            "platform": "Udemy",
            "level": "Intermediate",
            "reason": "Learn Pandas, NumPy and data analysis.",
            "match":
                90
                if "python" in skills or "sql" in skills
                else 75
        },

        {
            "title": "NumPy and Pandas",
            "platform": "YouTube",
            "level": "Beginner",
            "reason": "Learn important Python libraries for data science.",
            "match":
                95
                if "numpy" in skills or "pandas" in skills
                else 85
        },

        {
            "title": "TensorFlow for Beginners",
            "platform": "Coursera",
            "level": "Intermediate",
            "reason": "Learn how to build Machine Learning models using TensorFlow.",
            "match":
                95
                if "tensorflow" in skills
                else 80
        }

    ]

    courses.sort(
        key=lambda course: course["match"],
        reverse=True
    )

    return {
        "message":
            "Learning recommendations generated successfully!",
        "student":
            profile.name,
        "courses":
            courses
    }