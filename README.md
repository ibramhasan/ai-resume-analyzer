# AI Career Toolkit

## 📖 Overview

AI Career Toolkit is a web application designed to help job seekers improve their career documents using Artificial Intelligence.

The application currently provides AI-powered tools to analyze and optimize resumes, helping candidates create more ATS-friendly applications.

---

## ✨ Features

### 📄 Resume Analyzer

Upload your resume in PDF format and receive:

- ATS Compatibility Score
- Resume Strengths
- Areas for Improvement
- Actionable Recommendations

#### Resume Analyzer Workflow

![Resume Analyzer Workflow](Assets/IMG_20260714_103500.jpg)

#### Upload Resume

![Upload Resume](Assets/Screenshot_2026-07-14-10-31-31-453_com.brave.browser.jpg)

#### ATS Analysis Result

![ATS Analysis](Assets/Screenshot_2026-07-20-10-59-21-591_com.brave.browser.jpg)

---

### 🚀 Resume Optimizer

Automatically improves your resume while preserving factual information.

Generated outputs include:

- Professional Summary
- Optimized Work Experience
- Optimized Skills
- AI-Generated Cover Letter

#### Optimized Resume

![Optimized Resume](Assets/Screenshot_2026-07-20-10-59-42-307_com.brave.browser.jpg)

#### AI-generated Cover Letter

![Cover Letter](Assets/Screenshot_2026-07-20-10-59-47-637_com.brave.browser.jpg)

#### Resume Optimizer Workflow

![Resume Optimizer Workflow](Assets/Screenshot_2026-07-20-11-02-03-196_com.brave.browser.jpg)

---

## 🛠️ Tech Stack

### Frontend

- HTML5
- CSS3
- JavaScript

### Backend

- n8n
- OpenAI API
- PDF Text Extraction

### Deployment

- GitHub Pages

---

## ⚙️ System Architecture

```text
User
   │
   ▼
GitHub Pages
   │
   ▼
n8n Webhook
   │
   ▼
Extract PDF Text
   │
   ▼
OpenAI
   │
   ▼
JSON Response
   │
   ▼
Frontend
```

---

## 🎯 Roadmap

Planned future enhancements:

- AI Interview Preparation
- LinkedIn Profile Optimizer
- Career Roadmap Generator
- Portfolio Review
- Job Description Match Analysis

---

## 🌐 Live Demo

https://ibrahamhasan.github.io/ai-resume-analyzer/

---

## 📄 License

This project is intended for educational and portfolio purposes.
