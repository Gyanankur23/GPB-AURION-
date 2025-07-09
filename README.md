# 💬 GPB Aurion — Academic & Career Chatbot

GPB Aurion is a Streamlit-powered conversational AI designed to assist students with academic queries, career guidance, and project support. Built using LangChain and Gemini API, it offers a clean UI, typewriter-style responses, and persistent conversation history.

---

[![Streamlit App](https://img.shields.io/badge/Live%20App-Streamlit-brightgreen?logo=streamlit)](https://gowqrvufjni5pwyd2hbszm.streamlit.app/)

---

## 🚀 Features

- 🧠 Gemini 2.5 Flash integration via LangChain
- 💬 Chat interface with animated typewriter effect
- 🗂️ Conversation history logging and viewing
- 🧾 Environment-secured API key management
- 🧭 Multipage Streamlit layout with sidebar navigation
- ⚙️ Response mode toggle: Quick vs. Deep thinking

---

## 🛠️ Tech Stack

| Tool            | Purpose                          |
|-----------------|----------------------------------|
| Streamlit       | UI and interaction               |
| LangChain       | Prompt chaining and LLM handling |
| Gemini API      | Language model backend           |
| Python-dotenv   | Secure API key loading           |

---

## 📁 Project Structure

```bash
GPB_Aurion/ ├── Aurion.py                  # Main chatbot logic ├── .env                       # API keys (excluded from Git) ├── .gitignore                 # Prevents pushing sensitive files ├── conversation_history.txt   # Logs all user-bot interactions ├── pages/ │   ├── About_Creator.py       # Info page │   └── Conversation_History.py# View + clear chat history ├── assets/ │   └── screenshots/           # UI screenshots for documentation ├── requirements.txt           # Python dependencies └── README.md                  # This file
```
---

## 🔐 Setup Instructions

1. **Clone the repo:**
   ```bash
   git clone https://github.com/Gyanankur23/GPB-AURION-.git
   cd GPB-AURION-


## - Install dependencies:
pip install -r requirements.txt
- Create a .env file:
GEMINI_API_KEY=your_gemini_key_here


## - Run the app:
streamlit run Aurion.py



## 📸 Screenshots

### 🧠 Main Chatbot Interface (GPB Aurion)
![Main Page](assets/screenshots/Screenshot%20(373).png)

### 👨‍💻 About the Creator Page
![About Creator](assets/screenshots/Screenshot%20(372).png)

### 🗂️ Conversation History Page
![Conversation History](assets/screenshots/Screenshot%20(371).png)

---

## 👨‍💻 Creator

Built by **Gyanankur Baruah** 
 
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Gyanankur%20Baruah-blue?logo=linkedin)](https://www.linkedin.com/in/gyanankur-baruah-797205338)

[![GitHub](https://img.shields.io/badge/GitHub-Gyanankur23-black?logo=github)](https://github.com/Gyanankur23)

Feel free to connect, collaborate, or explore more of my work!


## 🪪 License

MIT License — feel free to use, modify, and build upon it with credit.

---
