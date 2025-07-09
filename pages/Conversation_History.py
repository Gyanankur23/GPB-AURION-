import streamlit as st
import os

st.title("📜 Conversation History")

history_file = "conversation_history.txt"

# Show current history
if os.path.exists(history_file):
    with open(history_file, "r", encoding="utf-8") as file:
        history = file.read()
    st.text_area("🗂️ Stored Conversations", value=history, height=400)
else:
    st.warning("No conversation history found yet.")

# clear history
if st.button("🧹 Clear History"):
    with open(history_file, "w", encoding="utf-8") as file:
        file.write("")
    st.success("Conversation history cleared.")
