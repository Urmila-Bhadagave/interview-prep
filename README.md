This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
# 🎯 AI Powered Interview Preparation Platform

An AI-powered interview preparation platform that helps students, job seekers, and professionals practice interviews through AI-generated questions, automated evaluation, and personalized feedback.

## 🚀 Features

### 🔐 Authentication & User Management
- Secure Login & Registration
- Google Authentication
- GitHub Authentication
- Role-Based Access (User/Admin)
- Profile Management
- Password Update

### 🤖 AI-Powered Interview Generation
- Industry-Based Interview Creation
- Topic-Based Questions
- Job Role Selection
- Difficulty Levels (Beginner, Intermediate, Advanced)
- Custom Interview Duration
- Dynamic AI Question Generation

### 🎤 Multiple Interview Modes
- Text-Based Interview
- Voice-Based Interview (Speech-to-Text)
- Video-Based Interview
- Real-Time Timer
- Auto Save Responses

### 📊 AI Evaluation & Analytics
- Automated Answer Evaluation
- Clarity Analysis
- Relevance Scoring
- Completeness Assessment
- Personalized Feedback
- Improvement Suggestions
- Performance Tracking
- Interview History

### 👨‍💼 Admin Features
- Admin Dashboard
- User Management
- Interview Monitoring
- Platform Analytics

---

## 🛠 Tech Stack

### Frontend
- Next.js 14
- React.js
- TypeScript
- Tailwind CSS
- HeroUI

### Backend
- Next.js API Routes
- Node.js
- NextAuth

### Database
- MongoDB Atlas
- Mongoose

### AI & Cloud Services
- OpenRouter API
- Mistral-7B-Instruct
- Llama-3-70B-Instruct
- Cloudinary

### Additional Technologies
- Web Speech API
- TensorFlow.js
- MediaPipe

---

## 📋 Workflow

1. User Login/Register
2. Select Industry, Topic, Role & Difficulty
3. AI Generates Interview Questions
4. User Answers via Text, Voice, or Video
5. AI Evaluates Responses
6. Detailed Feedback & Scores Generated
7. Results Stored in Database
8. Analytics Displayed on Dashboard

---

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/Urmila-Bhadagave/interview-prep.git
cd interview-prep
```

Install dependencies:

```bash
npm install
```

Create a `.env.local` file:

```env
MONGODB_URI=your_mongodb_uri

NEXTAUTH_SECRET=your_secret

NEXTAUTH_URL=http://localhost:3000

OPENROUTER_API_KEY=your_openrouter_api_key

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret
```

Run the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 🌟 Future Enhancements

- Facial Expression Analysis
- Emotion Detection
- Body Language Analysis
- Adaptive Interview Difficulty
- Company-Specific Interview Preparation
- Advanced Video Interview Evaluation

---

## 🎯 Use Cases

- Campus Placements
- Internship Preparation
- Technical Interviews
- HR Interviews
- Career Switching
- Mock Interview Practice

---

## 👩‍💻 Author

**Urmila Uttam Bhadagave**

Computer Science & Engineering

KLE College of Engineering & Technology, Chikodi

GitHub: https://github.com/Urmila-Bhadagave

---

## 📄 License

This project is licensed under the MIT License.

---

⭐ If you found this project useful, consider giving it a star!
