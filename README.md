# 🎓 FAST NUCES - Premium University Management System
> **The Future of Academic Infrastructure**

![Version](https://img.shields.io/badge/Version-1.2.0-b37042?style=for-the-badge)
![Database](https://img.shields.io/badge/Database-Oracle_21c-orange?style=for-the-badge&logo=oracle)
![Environment](https://img.shields.io/badge/Platform-Cloudflare_Pages-F38020?style=for-the-badge&logo=cloudflare)
![UI](https://img.shields.io/badge/UI-Glassmorphism-blue?style=for-the-badge)

---

## 🌟 Overview
The **FAST NUCES Premium UMS** is a high-performance, full-stack web application designed to bridge the gap between complex database management and intuitive user experience. Built with a **Glassmorphic 3D Interface**, it provides a seamless portal for Admins, Instructors, and Students.

### 🎭 Key Personas
*   **Admins:** Manage the core infrastructure (Departments, Programs, Courses, and Staff).
*   **Instructors:** Manage course-specific grading and student performance tracking.
*   **Students:** Access real-time academic progress, marks, and official transcripts.

---

## 🛠️ Tech Stack
| Layer | Technologies |
| :--- | :--- |
| **Frontend** | HTML5, CSS3 (Glassmorphism), Vanilla JavaScript (ES6+) |
| **Backend** | Cloudflare Pages Functions (Serverless Node.js) |
| **Database** | Cloudflare D1 (SQL-based Edge Database) |
| **Communications** | EmailJS (Dynamic SMTP-less Mailing) |
| **Design** | Adobe Photoshop/Canva (Assets), Google Fonts (Poppins) |

---

## 📂 Project Architecture (File Structure)

### 🖥️ Frontend
*   `index.html`: The core Single Page Application (SPA). Includes the **3D Flip Login**, **Premium Preloader**, and the dynamic **Glass Shell** dashboard.

### ⚙️ Backend (Cloudflare Functions)
Located in the `/functions/api/` directory:
*   `auth.js`: Handles secure login and role-based session initialization.
*   `students.js`: Main endpoint for student directory management.
*   `students/[id].js`: Handles dynamic routing for deleting specific students.
*   `instructors.js`: Manages faculty data and login creation.
*   `instructors/[id].js`: Handles dynamic faculty removal and dependency cleanup.
*   `departments.js`: Fetches and adds university departments.
*   `courses.js`: Manages the course catalog and credit hour definitions.
*   `enrollments.js`: Handles the many-to-many relationship between students and courses.
*   `transcript.js`: Executes complex SQL joins to calculate SGPA and aggregate grades.

---

## 🚀 Key Features

### 💎 Ultra-Modern UI/UX
*   **3D Flip Card Login:** Interactive mouse-tracking login interface.
*   **Glassmorphism:** High-end transparency effects with `backdrop-filter` and soft highlights.
*   **Custom Notifications:** Replaced default browser alerts with **Pure Glassy Pop-ups** for a native software feel.

### 📧 Intelligent Mailing System
*   **Automated Onboarding:** When an Admin adds a student or instructor, the system automatically triggers a personalized "Welcome" email via EmailJS.
*   **Dynamic Credentials:** Emails securely include the generated Username and Password.

### 📊 Academic Engine
*   **Role-Based Access Control (RBAC):** Sidebar links and actions change dynamically based on the logged-in user.
*   **SGPA Calculator:** A sophisticated logic engine that converts numerical marks to letter grades (A+, A-, B, etc.) and calculates SGPAs based on credit hours.
*   **Global Exam Control:** Admins can set a global "Exam Session" (Midterm/Final) which instantly updates the entire system's grading focus.

---

## ⚙️ How It Works

1.  **System Initialization:** On load, the preloader synchronizes with the D1 database to ensure all departments and configurations are ready.
2.  **Data Persistence:** Every action (Add/Delete/Enroll) is executed via a `fetch` request to a serverless function, which interacts with the **SQL Edge Database**.
3.  **Cross-Table Integrity:** The system uses a **Parent-Child Deletion Protocol**. For example, deleting an instructor automatically cleans up their course assignments to prevent database "orphaning."
4.  **Transcript Generation:** When a transcript is requested, the system performs a real-time aggregation of all `exam` records linked to a `studentId`, joins them with `course` credits, and renders a professional PDF-style view.

---

## 📝 Installation & Deployment

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/your-username/fast-ums-premium.git](https://github.com/your-username/fast-ums-premium.git)
    ```
2.  **Database Setup:** Run the provided SQL seeding scripts in your **Cloudflare D1 Console**.
3.  **Environment Variables:** Configure your `EmailJS` Service ID and Template ID.
4.  **Deploy:**
    ```bash
    npx wrangler pages deploy .
    ```

---

<p align="center">
  <br>
  <b>Developed with ❤️ for FAST-NUCES AI Department</b><br>
  <i>"Empowering Education through Artificial Intelligence"</i>
</p>
