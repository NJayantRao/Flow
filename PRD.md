# Product Requirements Document (PRD)

## Product Context

| Attribute           | Details                                                        |
| :------------------ | :------------------------------------------------------------- |
| **Product Name**    | Flow                                                           |
| **Product Type**    | Full-stack Q&A Community Platform for College Coding Community |
| **Target Audience** | College Students, Coding Enthusiasts, Peer Mentors             |
| **Platform**        | Web Application (Responsive)                                   |

## 1. Product Overview

### 1.1 Problem Statement

College students often struggle with coding doubts and lack a centralized platform to seek help from their peers. Existing general-purpose platforms like StackOverflow can be intimidating or too broad. There is a need for a dedicated, college-specific community where students can ask questions, share knowledge, and build a reputation within their campus.

### 1.2 Solution Description

**Flow** is a StackOverflow-like platform built to establish a centralized coding community for students of a college. The platform allows students to ask coding doubts with a single image attachment and receive help from the entire community. The goal is to create a long-term knowledge archive, motivate contributors through reputation points, and highlight top contributors through a leaderboard.

### 1.3 Value Proposition

- **Localized Community:** tailored for the specific college curriculum and peer group.
- **Gamified Learning:** Flow XP system incentivizes helpful contributions.
- **Anonymous Interaction:** customizable user IDs encourage participation without fear of judgment.
- **Knowledge Archive:** builds a searchable repository of solved problems for future students.

## 2. Target Users

- **Question Askers:** Students who encounter coding errors or conceptual doubts and need assistance.
- **Contributors (Answerers):** Skilled students who want to help peers, validate their knowledge, and earn reputation.
- **Lurkers/Learners:** Students who browse existing questions and answers to learn.
- **Administrators:** Faculty or student leads who manage the platform, moderation, and users.

## 3. Core Features

### 3.1 Authentication & Security

- **User Registration & Login:** Secure email/password authentication.
- **Email Verification:** Ensure valid college email addresses.
- **Password Reset:** Secure flow for recovering lost accounts.
- **Refresh Token System:** robust session management using Redis to store refresh tokens.
- **JWT Authentication:** Stateless authentication for API requests.
- **Anonymous Public Profiles:** Users can customize their display names to remain anonymous while building reputation.

### 3.2 Question & Answer System

- **Ask Questions:** Users can post questions with a title, detailed description, and a single image attachment (e.g., screenshot of code/error).
- **Post Answers:** Community members can provide solutions.
- **Accept Answer:** The question author can mark one answer as "Accepted" (Solved), indicating the correct solution.
- **Comments:** Threaded discussions on answers for clarification.
- **Voting System:** Upvote/downvote mechanism for both questions and answers to bubble up quality content.

### 3.3 Reputation & Gamification

**Flow XP** is the core reputation currency.

**Definition:** Reputation is a community-driven trust score that reflects how valuable and helpful a user’s contributions are on the platform. Every new user starts with 0 XP.

**XP System Table:**
| Action | XP Impact |
| :--- | :--- |
| Question upvoted | +5 XP |
| Answer upvoted | +10 XP |
| Answer accepted | +15 XP |
| First answer to question | +2 XP |
| Daily login streak (Future) | +1 XP |
| Answer downvoted | -2 XP |
| Question downvoted | -2 XP |
| Downvoting someone | -1 XP |

- **Reputation Ledger:** A dedicated system to track all reputation transactions (credits/debits) for auditing and transparency. Stores transactions for up to 7 days.
- **Leaderboard (Elites):** A real-time ranking of top contributors based on Total Flow XP.

## 4. Technical Specifications

### 4.1 Architecture

**High-Level Flow:**
`Next.js Frontend` → `Express.js REST API` → `PostgreSQL Database` + `Redis Cache`

- **Frontend:** Server-side rendered React application for SEO and performance.
- **Backend:** RESTful API handles business logic, auth, and database interactions.
- **Database:** Relational data storage for structured content.
- **Cache/Session:** In-memory store for high-speed access to tokens and rate limiting.

### 4.2 Tech Stack

#### Frontend

- **Framework:** Next.js (React)
- **Data Fetching:** TanStack Query (React Query)
- **Styling:** CSS Modules / Tailwind CSS (as per project standards)
- **State Management:** React Context / Zustand (if needed)

#### Backend

- **Framework:** Express.js (Node.js)
- **Database:** PostgreSQL
- **Caching/Session:** Redis (for refresh tokens, rate limiting)
- **Authentication:** JWT (JSON Web Tokens)
- **File Storage:** Local/Cloud (for image attachments)

## 5. Database Entities

The following high-level data models will be implemented in PostgreSQL:

1.  **Users:** Stores user credentials, profile info, current XP, and settings.
2.  **Admins:** Role-based extension of users with moderation privileges.
3.  **Questions:** Stores code doubts, image URLs, and status (open/solved).
4.  **Answers:** Stores solutions linked to questions.
5.  **Comments:** Discussion threads on answers.
6.  **Votes:** Tracks upvotes/downvotes on Questions and Answers to prevent duplicate voting.
7.  **Reputation Transactions (Ledger):** Records every XP change (User ID, Amount, Reason, Timestamp) for audit trails.
8.  **Tags (Future):** Categories for questions (e.g., Java, React).
9.  **QuestionTags (Future):** Mapping between Questions and Tags.
10. **Notifications (Future):** Stores alerts for user interactions.
11. **Bookmarks (Future):** Saved questions for users.

## 6. Security Features

- **JWT + Redis Strategy:** Short-lived Access Tokens (JWT) and Reference Refresh Tokens stored in Redis. This allows immediate revocation of sessions (e.g., on logout or breach) by deleting the token from Redis.
- **Input Validation:** Strict validation of all user inputs to prevent SQL Injection and XSS.
- **Rate Limiting:** Redis-based rate limiting on API endpoints to prevent abuse.
- **Password Hashing:** Strong hashing algorithms (e.g., bcrypt/argon2) for storing passwords.

## 7. File Management

- **Image Attachments:**
  - Questions support a single image upload.
  - Images should be optimized/compressed before storage.
  - Served via a dedicated static file route or CDN.

## 8. Future Scope

The following features are planned for subsequent phases:

- **Tagging & Search:**
  - Tagging questions by topics (Java, React, DSA, etc.).
  - Full-text search to find questions by keywords.
  - "Trending Tags" section.
- **Notifications System:**
  - Real-time alerts for: Answer received, Comment received, Answer accepted, Upvotes.
- **Bookmarks:** Ability to save questions for later reference.
- **Real-time Capabilities:**
  - WebSockets (Socket.io) for live notifications and reputation updates.
  - Redis Pub/Sub for scaling real-time events.

## 9. Success Criteria

- **Engagement:** High number of daily active users and questions asked/answered.
- **Response Time:** Low average time for a question to receive a first answer.
- **Solution Rate:** High percentage of questions marked as "Accepted".
- **System Stability:** 99.9% uptime with sub-200ms API response times.
