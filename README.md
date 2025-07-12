# Silent Alert

Silent Alert is a secure and scalable web application designed for confidential and effective crime reporting. It empowers public users to report incidents securely and enables authorities to manage and respond to these reports efficiently. The platform supports role-based access for public users, inspectors, admins, and super admins, ensuring both security and functionality at each level.

---

## 🌐 Features

### 🧑‍💻 Public Users

- **Sign Up / Login**
  - Email & Password Authentication
  - Google OAuth Integration

- **Report Creation & Management**
  - Create new reports with:
    - Title, Description
    - File Uploads (evidence, documents, media)
  - View, **edit**, and **delete** own reports

- **Profile Management**
  - View and edit personal profile

- **Support**
  - Submit support requests (e.g., if blocked)

---

### 🕵️‍♂️ Inspector

- **Read-Only Access**
  - View reports submitted by users
  - View profiles of users who submitted reports
  - No access to logs
  - No editing or administrative actions allowed

---

### 🛡️ Admin

- **Dashboard Access**
  - View all reports (submitted by users)
  - Change report status (e.g., Pending → In Progress → Resolved)
  - Access and monitor system logs
  - Block or unblock users
  - View support queries from users
  - Access own profile information

---

### 🦸 SuperAdmin

- **All Admin Privileges**
  - Full access to dashboard, logs, user blocking, and reports

- **Settings Panel**
  - Search users by ID
  - Assign or change roles:
    - `admin`, `superAdmin`, `inspector`, `user`
  - Block users from the system

---

## 🔐 Role-Based Access Summary

| Role        | Create Report | View Reports                  | Edit/Delete Own Report | Change Report Status | Access Logs | Block Users | Role Assignment | Support View | Profile Access     |
|-------------|----------------|-------------------------------|-------------------------|-----------------------|-------------|-------------|------------------|---------------|---------------------|
| User        | ✅             | ✅ (own)                      | ✅                      | ❌                    | ❌          | ❌          | ❌               | ✅            | ✅                  |
| Inspector   | ❌             | ✅ (submitted by users)       | ❌                      | ❌                    | ❌          | ❌          | ❌               | ❌            | ✅ (view only)      |
| Admin       | ❌             | ✅                            | ❌                      | ✅                    | ✅          | ✅          | ❌               | ✅            | ✅                  |
| SuperAdmin  | ❌             | ✅                            | ❌                      | ✅                    | ✅          | ✅          | ✅               | ✅            | ✅                  |

---

## 🚀 Tech Stack (Suggested)

- **Frontend:** React / Next.js / Vue.js
- **Backend:** Node.js / Express / NestJS
- **Database:** MongoDB / PostgreSQL
- **Auth:** Firebase Auth / OAuth 2.0
- **Deployment:** Vercel / Heroku / AWS / Docker
- **File Storage:** AWS S3 / Cloudinary

---

## 📁 Project Structure (Example)

> *(Add example folder structure here as needed)*
