const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// 🧠 Function to show messages
function addMessage(sender, message) {
  const msg = document.createElement("p");
  msg.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// 🚀 Send message to backend
sendBtn.addEventListener("click", async () => {
  const message = userInput.value.trim();
  if (!message) return;

  addMessage("You", message);
  userInput.value = "";

  try {
    const response = await fetch("https://dileepgpt-backend.onrender.com/api/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    const data = await response.json();
    if (data.reply) {
      addMessage("DileepGPT", data.reply);
    } else {
      addMessage("DileepGPT", "⚠️ Error: No reply received");
    }
  } catch (error) {
    console.error("Error:", error);
    addMessage("DileepGPT", "❌ Server error, please try again later.");
  }
});

// Enable Enter key to send
userInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    sendBtn.click();
  }
});
