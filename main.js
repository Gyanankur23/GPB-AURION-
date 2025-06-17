console.log("Hello World!");

// Wait for the page to fully load before running scripts
document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.querySelector(".header button");
    const body = document.body;
    const chatForm = document.getElementById("chat-form");
    const chatInput = document.getElementById("chatInput");
    const chatOutput = document.getElementById("chatbox");

    // 🌓 Dark Mode Toggle with Persistence
    function toggleDarkMode() {
        body.classList.toggle("dark-mode");
        localStorage.setItem("theme", body.classList.contains("dark-mode") ? "dark" : "light");
    }

    // Preserve Theme on Reload
    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-mode");
    }

    // Ensure toggle button exists before adding event listener
    if (toggleButton) {
        toggleButton.addEventListener("click", toggleDarkMode);
    } else {
        console.error("❌ Dark mode toggle button not found!");
    }

    // 📝 Chat Functionality
    if (!chatForm || !chatInput || !chatOutput) {
        console.error("❌ Chat elements missing!");
        return;
    }

    chatForm.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent page reload

        const userMessage = chatInput.value.trim();
        if (!userMessage) {
            console.warn("⚠️ Empty message, not sending.");
            return;
        }

        displayMessage(userMessage, true);
        chatInput.value = ""; // Clear input

        try {
            const response = await fetch("http://localhost:3000/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: userMessage }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            displayMessage(data.response || "⚠️ Error: No response received", false);
        } catch (error) {
            console.error("❌ Error fetching chatbot response:", error);
            displayMessage("⚠️ Bot: Sorry, something went wrong.", false);
        }
    });

    // 🔄 Enable Enter Key Submission
    chatInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            chatForm.dispatchEvent(new Event("submit"));
        }
    });

    // 🔥 Function to Display Messages
    function displayMessage(message, isUser) {
        const msgElem = document.createElement("div");
        msgElem.textContent = message;
        msgElem.className = `chat-message ${isUser ? "user-message" : "assistant-message"}`;
        chatOutput.appendChild(msgElem);
        chatOutput.scrollTop = chatOutput.scrollHeight;
    }
});
