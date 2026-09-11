<img width="1919" height="877" alt="Screenshot 2026-05-07 231650" src="https://github.com/user-attachments/assets/e2b3755b-07b7-4ec5-b529-60dc9c2732f2" /># 🔗 ShortLink — Smart URL Shortener with Analysis

<p align="center">
  <strong>Shorten Your Links. Expand Your Reach.</strong>
</p>

<p align="center">
  A fast, secure, and analytics-powered URL shortening platform for creating, managing, and analyzing short links.
</p>

<p align="center">

![Python](https://img.shields.io/badge/Python-3.x-blue?style=for-the-badge\&logo=python)
![Flask](https://img.shields.io/badge/Flask-Backend-black?style=for-the-badge\&logo=flask)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?style=for-the-badge\&logo=mongodb)
![HTML](https://img.shields.io/badge/HTML5-orange?style=for-the-badge\&logo=html5)
![CSS](https://img.shields.io/badge/CSS3-blue?style=for-the-badge\&logo=css3)
![JavaScript](https://img.shields.io/badge/JavaScript-yellow?style=for-the-badge\&logo=javascript)

</p>

---

## 🚀 Live Demo

🌐 **Live Application:**
[Live Demo](https://shortlink-six-beta.vercel.app/)

---

## 📌 Table of Contents

* [About the Project](#-about-the-project)
* [Problem Statement](#-problem-statement)
* [Objectives](#-objectives)
* [Features](#-features)
* [System Workflow](#-system-workflow)
* [System Modules](#-system-modules)
* [Technology Stack](#-technology-stack)
* [Project Architecture](#-project-architecture)
* [Project Structure](#-project-structure)
* [Screenshots](#-screenshots)
* [Analytics](#-analytics)
* [Installation](#-installation)
* [Environment Variables](#-environment-variables)
* [API Endpoints](#-api-endpoints)
* [Example](#-example)
* [Security](#-security)
* [Advantages](#-advantages)
* [Future Enhancements](#-future-enhancements)
* [Use Cases](#-use-cases)
* [Conclusion](#-conclusion)
* [Author](#-author)

---

# 📖 About the Project

**ShortLink** is a Smart URL Shortener with Analysis designed to convert long and complex URLs into short, easy-to-share links.

The system provides more than basic URL shortening. It allows users to create custom aliases, manage their shortened URLs, track clicks, and analyze visitor information through an interactive analytics dashboard.

The project combines **URL shortening, user authentication, link management, redirection, and analytics** into a single web-based platform.

---

# ❗ Problem Statement

Long URLs containing multiple parameters, tracking codes, filters, and nested paths are difficult to share and manage.

Traditional URL shorteners mainly focus on generating shorter links, but users may also require information about how their links are performing.

Therefore, the proposed system provides:

* Short and manageable URLs
* Custom aliases
* Link management
* Click tracking
* Visitor analysis
* Referrer analysis
* Geographic insights

---

# 🎯 Objectives

The main objectives of the project are:

1. To convert long URLs into short and easy-to-share URLs.
2. To generate unique short links.
3. To provide optional custom URL aliases.
4. To provide secure user authentication.
5. To allow users to manage their shortened URLs.
6. To track clicks and visitor activity.
7. To provide analytics through charts and visualizations.
8. To provide fast redirection to the original URL.
9. To create a simple and user-friendly interface.

---

# ✨ Features

### 🔗 URL Shortening

Convert long URLs into compact and shareable short links.

### ✨ Custom Alias

Users can create personalized short URLs using custom aliases.

Example:

```text
https://shortlink-ahkx.onrender.com/GPT1
```

### 👤 User Authentication

Users can log in and access their own URL dashboard.

### 📊 Analytics Dashboard

Track the performance of shortened URLs.

### 📈 Click Tracking

Monitor the total number of clicks received by a shortened link.

### 🌍 Country Analysis

View geographic information related to link visitors.

### 🔎 Referrer Tracking

Identify sources from which users access the shortened URL.

### 📋 Link Management

Users can view their created links and access analytics for individual links.

### ⚡ Fast Redirection

Short URLs redirect visitors to the original destination quickly.

### 🔐 Secure URL Handling

The system validates and securely handles URLs and user requests.

---

# 🔄 System Workflow

```text
                    ┌─────────────────┐
                    │      User       │
                    └────────┬────────┘
                             │
                             ▼
                 ┌───────────────────────┐
                 │   Enter Long URL      │
                 └───────────┬───────────┘
                             │
                             ▼
                 ┌───────────────────────┐
                 │    Validate URL       │
                 └───────────┬───────────┘
                             │
                             ▼
                 ┌───────────────────────┐
                 │ Generate Short Code   │
                 │   / Custom Alias      │
                 └───────────┬───────────┘
                             │
                             ▼
                 ┌───────────────────────┐
                 │    Store in Database  │
                 └───────────┬───────────┘
                             │
                             ▼
                 ┌───────────────────────┐
                 │     Short URL         │
                 └───────────┬───────────┘
                             │
                             ▼
                 ┌───────────────────────┐
                 │ User Opens Short URL  │
                 └───────────┬───────────┘
                             │
                             ▼
                 ┌───────────────────────┐
                 │ Record Click & Data   │
                 └───────────┬───────────┘
                             │
                             ▼
                 ┌───────────────────────┐
                 │ Redirect to Original  │
                 │        URL            │
                 └───────────────────────┘
```

---

# 🧩 System Modules

## 1. Home Module

The home page provides the main interface for entering a long URL and generating a shortened link.

---

## 2. Authentication Module

This module provides:

* User login
* User registration
* Session management
* Secure access to user links

---

## 3. URL Shortening Module

This module:

1. Accepts the original URL.
2. Validates the URL.
3. Generates a unique short code.
4. Stores the URL mapping.
5. Returns the shortened URL.

---

## 4. Custom Alias Module

Users can optionally enter their own alias.

Example:

```text
Original:
https://www.example.com/products/product123

Custom Alias:
product123

Short URL:
https://shortlink-ahkx.onrender.com/product123
```

---

## 5. Dashboard Module

The dashboard allows users to:

* Create new links
* Add custom aliases
* View existing links
* Copy short URLs
* Access analytics
* Manage their links

---

## 6. Analytics Module

The analytics module provides:

* Total clicks
* Clicks over time
* Top countries
* Referrers
* Link performance

---

## 7. Redirection Module

When a visitor opens a shortened URL, the system:

```text
Short URL
    ↓
Find Short Code
    ↓
Retrieve Original URL
    ↓
Record Visitor Data
    ↓
Redirect Visitor
```

---

# 🛠️ Technology Stack

| Technology           | Purpose                   |
| -------------------- | ------------------------- |
| HTML5                | Web page structure        |
| CSS3                 | UI design and styling     |
| JavaScript           | Client-side functionality |
| Python               | Backend development       |
| Flask                | Web framework             |
| MongoDB              | Database                  |
| Chart.js / JS Charts | Analytics visualization   |
| Git                  | Version control           |
| GitHub               | Source code management    |
| Render               | Application deployment    |

---

# 🏗️ Project Architecture

```text
                 ┌──────────────────┐
                 │      Client      │
                 │ Browser / User    │
                 └────────┬─────────┘
                          │
                          ▼
                 ┌──────────────────┐
                 │    Frontend      │
                 │ HTML/CSS/JS      │
                 └────────┬─────────┘
                          │
                          ▼
                 ┌──────────────────┐
                 │ Flask Backend    │
                 │ REST/API Routes  │
                 └────────┬─────────┘
                          │
             ┌────────────┴────────────┐
             │                         │
             ▼                         ▼
    ┌─────────────────┐       ┌─────────────────┐
    │ URL Processing  │       │ Analytics Engine│
    │ & Redirection   │       │ Click Tracking  │
    └────────┬────────┘       └────────┬────────┘
             │                         │
             └────────────┬────────────┘
                          ▼
                 ┌──────────────────┐
                 │     MongoDB      │
                 │    Database      │
                 └──────────────────┘
```

---

# 📁 Project Structure

```text
ShortLink/
│
├── static/
│   ├── css/
│   │   └── style.css
│   │
│   ├── js/
│   │   └── script.js
│   │
│   └── images/
│
├── templates/
│   ├── index.html
│   ├── login.html
│   ├── signup.html
│   ├── dashboard.html
│   └── analytics.html
│
├── app.py
├── database.py
├── models.py
├── routes.py
├── requirements.txt
├── .env
├── .gitignore
└── README.md
```

> Modify the structure according to your actual project files.

---

### Metrics

| Metric           | Description                              |
| ---------------- | ---------------------------------------- |
| Total Clicks     | Total number of visits to a short link   |
| Clicks Over Time | Shows link activity over a period        |
| Top Countries    | Displays visitor geographic information  |
| Referrers        | Shows traffic sources                    |
| Link Performance | Helps measure individual link engagement |

Example dashboard:

```text
Total Clicks
     ↓
   2 Clicks

Clicks Over Time
     ↓
  ┌─────────────┐
  │      •      │
  │             │
  │─────────────│
  └─────────────┘

Top Countries
     ↓
  Visitor Distribution

Referrers
     ↓
  Direct / Search / Other
```

---

# ⚙️ Installation

## 1. Clone the Repository

```bash
git clone https://github.com/your-username/shortlink.git
```

---

## 2. Open the Project

```bash
cd shortlink
```

---

## 3. Create Virtual Environment

```bash
python -m venv venv
```

---

## 4. Activate Virtual Environment

### Windows

```bash
venv\Scripts\activate
```

### Linux / macOS

```bash
source venv/bin/activate
```

---

## 5. Install Dependencies

```bash
pip install -r requirements.txt
```

---

## 6. Configure Environment Variables

Create a `.env` file in the root directory.

```env
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_secret_key
BASE_URL=http://localhost:5000
```

---

## 7. Run the Application

```bash
python app.py
```

The application will run at:

```text
http://localhost:5000
```

---

# 🔐 Environment Variables

| Variable     | Description                              |
| ------------ | ---------------------------------------- |
| `MONGO_URI`  | MongoDB database connection string       |
| `SECRET_KEY` | Secret key used for application security |
| `BASE_URL`   | Base URL of the application              |

**Do not upload your `.env` file or database credentials to GitHub.**

Add it to `.gitignore`:

```gitignore
.env
venv/
__pycache__/
*.pyc
```

---

# 🔌 API Endpoints

The following is a suggested API structure for the project.

| Method | Endpoint                      | Description              |
| ------ | ----------------------------- | ------------------------ |
| `POST` | `/api/shorten`                | Create a short URL       |
| `GET`  | `/<short_code>`               | Redirect to original URL |
| `GET`  | `/api/analytics/<short_code>` | Get link analytics       |
| `POST` | `/api/login`                  | User login               |
| `POST` | `/api/signup`                 | User registration        |
| `GET`  | `/api/links`                  | Get user's links         |

### Example Request

```json
{
  "url": "https://www.example.com/very/long/url"
}
```

### Example Response

```json
{
  "short_url": "https://shortlink-ahkx.onrender.com/GPT1"
}
```

---

# 🧪 Example

### Original URL

```text
https://www.example.com/products/category/electronics/product?id=12345&sort=price&source=campaign
```

### Generated Short URL

```text
https://shortlink-ahkx.onrender.com/GPT1
```

When the visitor opens the short URL:

```text
Short URL
    ↓
ShortLink Server
    ↓
Record Click
    ↓
Retrieve Original URL
    ↓
Redirect
```

---

# 🔐 Security

The application considers the following security practices:

* URL validation
* User authentication
* Secure session management
* Unique short-code generation
* Database validation
* Input validation
* Protected environment variables
* Controlled access to user-specific links

---

# ⚡ Performance

The system is designed to provide:

* Fast URL generation
* Quick redirection
* Efficient database operations
* Lightweight frontend
* Scalable link management

---

# ✅ Advantages

* Simple and user-friendly interface
* Generates short and memorable URLs
* Supports custom aliases
* Provides link analytics
* Tracks click activity
* Helps understand visitor sources
* Centralized link management
* Fast redirection
* Suitable for personal and business use

---

# 🌐 Use Cases

ShortLink can be useful for:

### 👨‍💻 Developers

Sharing APIs, documentation, GitHub repositories, and project links.

### 📢 Digital Marketing

Tracking marketing campaign links.

### 📱 Social Media

Sharing long URLs in a compact format.

### 🏢 Businesses

Managing promotional and campaign URLs.

### 🎓 Students

Sharing project demonstrations, portfolios, assignments, and resources.

### 📊 Content Creators

Tracking audience engagement with shared links.

---

# 🔮 Future Enhancements

Future versions of ShortLink can include:

* 📱 QR Code Generation
* 📊 Real-Time Analytics
* 🌍 Advanced Geographic Analytics
* 💻 Device Analytics
* 🌐 Browser Analytics
* ⏳ Link Expiration
* 🔒 Password-Protected Links
* 🌐 Branded Domains
* 🔌 Public REST API
* 📥 CSV Analytics Export
* 📄 PDF Analytics Reports
* 🤖 AI-Based Click Prediction
* 🚨 Malicious URL Detection
* 🛡️ Spam Detection
* 📧 Email Notifications
* 🔔 Link Activity Alerts

---

# 📈 Future Scope

The project can be expanded into a complete link-management and marketing analytics platform.

AI-based analytics could be introduced to predict link performance, identify unusual traffic patterns, detect suspicious URLs, and provide recommendations for improving audience engagement.

---

# 🏆 Conclusion

**ShortLink — Smart URL Shortener with Analysis** provides an efficient solution for converting long URLs into short, manageable, and shareable links.

Unlike a basic URL shortener, the system combines **URL shortening, custom aliases, authentication, link management, redirection, click tracking, and analytics** in a single platform.

The project demonstrates the practical application of **web development, backend programming, database management, and data analytics** to solve a real-world problem.

---

# 👨‍💻 Author

### Sahil Patil

**Computer Engineering Student**

---

# ⭐ Support

If you find this project useful, please consider giving the repository a ⭐ on GitHub.

---

<p align="center">

<strong>🔗 ShortLink — Shorten Your Links. Expand Your Reach.</strong>

</p>

<p align="center">
Built with ❤️ for learning, development, and real-world applications.
</p>
