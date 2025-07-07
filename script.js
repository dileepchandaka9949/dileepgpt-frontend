document.getElementById("sendBtn").addEventListener("click", async () => {
  const userInput = document.getElementById("userInput").value;
  if (!userInput) return;

  const chatLog = document.getElementById("chatLog");
  chatLog.innerHTML += `<div><strong>You:</strong> ${userInput}</div>`;

  try {
    const res = await fetch("https://dileepgpt-backend.onrender.com/api/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: userInput })
    });

    const data = await res.json();
    chatLog.innerHTML += `<div><strong>DileepGPT:</strong> ${data.reply}</div>`;
  } catch (err) {
    chatLog.innerHTML += `<div><strong>Error:</strong> Failed to get reply</div>`;
  }

  document.getElementById("userInput").value = "";
});
