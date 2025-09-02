# ✨ Wanderlust - Airbnb Clone  

![Banner](/Assets/banner.png)

---

## 📖 Overview  
**Wanderlust** is a full-stack **Airbnb Clone** built with the **Node.js, Express, MongoDB, and EJS templates**  using the **MVC (Model-View-Controller) architecture**.  
Users can **sign up, list their homes, explore other listings, view them on a map, and leave reviews** with star ratings.  

🔗 **Live Demo**: [Wanderlust on Render](https://delta-project-z9jy.onrender.com)  

---

## 🚀 Features  

### 🏡 Listings  
- Create a new listing with: **Title, Description, Price, Country, Location, Category**  
- Categories include:  
  `Trending`, `Rooms`, `Iconic Cities`, `Mountains`, `Castles`, `Amazing Pools`, `Camping`, `Farms`  
- Each listing automatically **generates a map** of the location  
- Owners can **Edit** or **Delete** their own listings  

### 🗺️ Maps  
- Map integration shows the exact **location of a listing**  
- When details are updated → the map also updates automatically  

### ⭐ Reviews  
- Users can add reviews with a **star rating + comment**  
- Users can **delete only their own reviews**, not others  

### 🔍 Search  
- Global **search bar** at the top → search by **Title, Description, Country, Location**  

### 👤 Authentication & Authorization  
- Secure **signup/login** system  
- Only authorized users can edit/delete their listings or reviews  

---

## 🖼️ Screenshots  

### 🎨 Banner  
![Banner](/Assets/banner.png)

### ➕ Create Listing  
![Create Listing](/Assets/CreateListing.png)

### 🏠 Home Page  
![Home Page](/Assets/home.png)

### 🗺️ Map Integration  
![Map](/Assets/map.png)

### ⭐ Reviews  
![Reviews](/Assets/review.png)

---

## 🛠️ Tech Stack  

- **Frontend**: EJS, CSS  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB (Mongoose)  
- **Authentication**: Passport.js  
- **Image Uploads**: Cloudinary + Multer  
- **Deployment**: Render  

---

## 🧩 Project Structure  

```bash
Wanderlust/
├── controllers/       # Business logic
├── models/            # Database schemas (Mongoose)
├── public/            # Static assets (CSS, JS, images)
├── routes/            # Application routes
├── seeds/             # Seed data for testing
├── utils/             # Helper functions
├── views/             # EJS templates (frontend)
├── app.js             # Main app entry point
├── cloudConfig.js     # Cloudinary config
├── middleware.js      # Middleware for auth, validation
├── schema.js          # Joi validation schema
└── README.md
```


---

## ⚡ Deployment  

Deployed with [Render](https://render.com) 🚀  

1. Render auto-builds the app from GitHub  
2. Runs `npm install` & deploys the app  
3. Assigns a unique `.onrender.com` subdomain  

---

## 📌 How to Run Locally  

```bash
# Clone repo
git clone https://github.com/yourusername/wanderlust.git

# Go inside
cd wanderlust

# Install dependencies
npm install

# Setup environment variables (.env)
MONGO_URI=your_mongo_db
CLOUDINARY_KEY=your_key
CLOUDINARY_SECRET=your_secret
SESSION_SECRET=your_session_secret

# Start the app
npm start
App will run on http://localhost:8080/ 🎉

👨‍💻 Author
Ronik Bajakke

💼 Aspiring MERN Stack Developer

🌐 Live Demo