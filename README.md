# 🚀 NexFolio – AI-Powered Portfolio & Resume Builder

NexFolio is a full-stack MERN application that helps users **create professional portfolios**, **generate AI-enhanced resumes**, and **verify their identity through email OTPs**.  
It combines a modern UI, powerful backend APIs, and AI-driven PDF generation to deliver a seamless experience for developers, students, and job seekers.

---

## 🌟 Features

### 🔐 User Authentication
- Login / Signup (JWT-based)
- Secure cookies using `cookie-parser`
- Protected routes for dashboard and resume features

### 📄 AI Resume Builder
- Users enter resume details once
- AI processes the data and generates a **professionally formatted PDF**
- Uses Puppeteer + Handlebars templates
- Multiple template support (expandable)

### 📧 Email Verification (Brevo)
- Sends a verification code to user email
- User must verify before accessing protected features
- Beautifully designed HTML email templates

### 🖥️ Portfolio Builder
- Users can build a dynamic online portfolio
- Supports About, Skills, Projects, Experience, Contact pages

### ☁️ Cloud-Hosted Resume PDFs
- Automatically generated & stored for user download

### 🎨 Modern UI
- TailwindCSS  
- Responsive, smooth animations  
- Dark mode support  

### 🛡️ Backend + Client-Side Validations
Ensures secure and clean user input.

---

## 🛠️ Tech Stack

### Frontend
- React.js  
- TailwindCSS  
- Axios  
- React Router  
- Context API

### Backend
- Node.js  
- Express.js  
- JWT Authentication  
- Puppeteer (PDF Generation)  
- Handlebars (Resume Templates)

### Database
- MongoDB (Mongoose)

### Email Service
- Brevo (Sendinblue) API

---

## 📂 Project Folder Structure

```
NexFolio/
│
├── client/                 
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   └── Routes/
│   └── tailwind.config.js
│
├── server/                 
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── middleware/
│   │   ├── DB/
│   │   └── templates/   
│   |   └──utils/  
|   |   └──validations/           
│   └── .env
│
└── Server.js
└── README.md

```

---

## ⚙️ Environment Variables

Create a `.env` file inside **/server/src**:

```
MONGO_URI=YOUR_MONGO_CONNECTION_STRING
JWT_SECRET=YOUR_SECRET_KEY
BREVO_API_KEY=YOUR_BREVO_KEY
GOOGLE_GEMINI_API_KEY=YOUR_API_KEY
CLIENT_URL=http://localhost:5173
PORT=3000
//FRONTEND_API_URI -> FOR PRODUCTION
```

---

## 🚀 Installation & Setup

### Clone the project
```bash
git clone https://github.com/your-username/nexfolio.git
cd nexfolio
```

### Install Backend Dependencies
```bash
cd server
npm install
npm run dev
```

### Install Frontend Dependencies
```bash
cd client
npm install
npm run dev
```

---

## 🌐 Running the Project

Frontend → **http://localhost:5173**  
Backend API → **http://localhost:3000**

---

## 🧠 AI Resume Generation Workflow
1. User fills resume form  
2. Data saved in MongoDB  
3. User clicks "Generate Resume"  
4. Backend loads Handlebars template  
5. Puppeteer converts template → PDF  
6. PDF returned or stored for download  

---

## 📬 Email Verification Workflow
1. User signs up  
2. System sends OTP email via Brevo  
3. User enters OTP  
4. Account activated  

---

<!-- ## 🖼️ Screenshots (Add Later)

```
![Homepage](./screenshots/home.png)
![Resume Form](./screenshots/resume-form.png)
![Generated PDF](./screenshots/resume-pdf.png)
``` -->

<!-- --- -->

## 🤝 Contributing
Pull requests are welcome.  
For major changes, please open an issue first to discuss what you’d like to change.

---

## 📄 License
This project is licensed under the **MIT License**.
