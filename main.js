console.log("Hello World!");

// Dark Mode Toggle with Persistence
const toggleButton = document.querySelector(".header button");
const body = document.body;

function toggleDarkMode() {
    body.classList.toggle("dark-mode");
    localStorage.setItem("theme", body.classList.contains("dark-mode") ? "dark" : "light");
}

// Preserve Theme on Reload
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-mode");
    }
});

toggleButton.addEventListener("click", toggleDarkMode);

// Chatbot Functionality
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chatInput");
const chatOutput = document.getElementById("chatbox"); // Using chatbox for display

chatForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent page reload

    const userMessage = chatInput.value.trim();
    if (!userMessage) return;

    displayMessage(userMessage, true);
    chatInput.value = ""; // Clear input

    try {
        const response = await fetch("http://localhost:3000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: userMessage }),
        });

        const data = await response.json();
        displayMessage(data.response || "⚠️ Error: No response received", false);
    } catch (error) {
        console.error("Error fetching chatbot response:", error);
        displayMessage("⚠️ Bot: Sorry, something went wrong.", false);
    }
});

// Enable Enter Key Submission
chatInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        chatForm.dispatchEvent(new Event("submit"));
    }
});

// Function to Display Messages
function displayMessage(message, isUser) {
    const msgElem = document.createElement("div");
    msgElem.textContent = message;
    msgElem.className = `chat-message ${isUser ? "user-message" : "assistant-message"}`;
    chatOutput.appendChild(msgElem);
    chatOutput.scrollTop = chatOutput.scrollHeight;
}
