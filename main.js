// main.js

console.log("Hello World!");

// Dark Mode Toggle
const toggleButton = document.getElementById("toggle-mode");
const body = document.body;

toggleButton.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  localStorage.setItem("theme", body.classList.contains("dark-mode") ? "dark" : "light");
});

// Preserve Theme on Reload
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
  }
});

// Chatbot Functionality
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatOutput = document.getElementById("chat-output");

chatForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent page reload

  const userMessage = chatInput.value.trim();
  if (!userMessage) return;

  chatOutput.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;
  chatInput.value = ""; // Clear input

  try {
    const response = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: userMessage }),
    });

    const data = await response.json();
    chatOutput.innerHTML += `<p><strong>Bot:</strong> ${data.response}</p>`;
  } catch (error) {
    console.error("Error fetching chatbot response:", error);
    chatOutput.innerHTML += `<p><strong>Bot:</strong> Sorry, something went wrong.</p>`;
  }
});

// Enable Enter Key Submission
chatInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevent default Enter behavior
    chatForm.dispatchEvent(new Event("submit"));
  }
});
