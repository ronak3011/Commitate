# Commitate

> Where unfinished projects find new contributors.

Most developers have abandoned projects sitting in a repository somewhere. Commitate helps developers share those projects instead of letting them go to waste, making it easier for others to discover, adopt, and continue building them.

---

🌐 **Live Demo:** https://commitate.onrender.com/

## Features

- **Browse Projects** – Discover unfinished projects and filter them by technology stack.
- **Share Projects** – List abandoned projects and describe what's left to build.
- **AI Project Analysis** – Get AI-generated insights, complexity estimates, and suggested next steps.
- **Project Adoption** – Request to take over projects and continue development.

---

## Tech Stack

| Layer | Tech |
|--------|--------|
| Frontend | React.js, Vite, Tailwind CSS, React Router |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JWT |
| AI | Google Gemini API |

---

## Running Locally

### Clone the Repository

```bash
git clone https://github.com/your-username/commitate.git
cd commitate
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

Start the backend server:

```bash
npm run dev
```

### Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The application will run at:

```text
http://localhost:5173
```

---

## Future Improvements

- Project recommendation system
- Team collaboration features
- Contribution tracking
- Advanced AI project evaluation

---

## Why I Built This

While learning development, I noticed that many interesting projects never get completed. At the same time, developers looking for real-world projects often struggle to find something meaningful to work on.

Commitate was built to connect those two groups and give unfinished projects a second chance.