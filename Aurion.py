import streamlit as st
import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
import time

load_dotenv()
gemini_api_key = os.getenv("GEMINI_API_KEY")


prompt = ChatPromptTemplate.from_messages([
    ("system", "You are GPB Aurion, a helpful, respectful AI mentor for academic and career questions."),
    ("user", "{question}")
])

llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",
    temperature=0.7,
    google_api_key=gemini_api_key
)

output_parser = StrOutputParser()
chain = prompt | llm | output_parser




# Chat Interface
st.markdown("""
<style>
            
@keyframes pulse {
  0%   {opacity: 0.3;}
  50%  {opacity: 1;}
  100% {opacity: 0.3;}
}
@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}
@keyframes blink-caret {
  50% { border-color: transparent }
}

.animated-text {
      text-align: center;
      animation: pulse 2s infinite;
      font-size: 60px;
      font-weight: bold;
     background: linear-gradient(to right, 
        red, orange, yellow, green, blue, indigo, violet);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }

.typewriter-subtext {
  text-align: center;
  font-size: 35px;
  color: #6E6E6E;
  white-space: nowrap;
  overflow: hidden;
  border-right: 2px solid #6E6E6E;
  width: 0;
  animation: typing 3s steps(40, end) forwards, blink-caret 0.75s step-end infinite;
  margin-top: -10px;
}
</style>

<div class='animated-text'>💬 GPB Aurion Chatbot</div>
<div class='typewriter-subtext'>What's on your mind today?</div>
""", unsafe_allow_html=True)


if "messages" not in st.session_state:
        st.session_state.messages = []

for msg in st.session_state.messages:
        st.chat_message(msg["role"]).write(msg["content"])

user_input = st.chat_input("What's on your mind?")
if user_input:
        st.chat_message("user").write(user_input)
        response = chain.invoke({"question": user_input})
        st.chat_message("assistant").write(response)
        st.session_state.messages.append({"role": "user", "content": user_input})
        st.session_state.messages.append({"role": "assistant", "content": response})

response_mode = st.radio("⚙️ Choose response style:", ["⚡ Quick Response", "🤔 Think Deeper"])
delay = 0.015 if response_mode == "⚡ Quick Response" else 0.045

with st.spinner("Aurion is thinking..."):
    response = chain.invoke({"question": user_input})

placeholder = st.empty()
typed_text = ""
for char in response:
    typed_text += char
    placeholder.markdown(f"<p style='font-size:18px;'>{typed_text}</p>", unsafe_allow_html=True)
    time.sleep(delay)

st.session_state.messages.append({"role": "user", "content": user_input})
st.session_state.messages.append({"role": "assistant", "content": response})
