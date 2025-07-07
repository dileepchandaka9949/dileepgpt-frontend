function payNow() {
  var options = {
    key: "rzp_test_6aUdAJRGe6Glqm", // ✅ Your Razorpay Key ID (Test mode)
    amount: 1900,
    currency: "INR",
    name: "DileepGPT",
    description: "Unlock the chatbot",
    handler: function (response) {
      alert("Payment Successful: " + response.razorpay_payment_id);
      document.getElementById("payment-section").style.display = "none";
      document.getElementById("chat-section").style.display = "block";
    },
    theme: {
      color: "#3399cc"
    }
  };
  var rzp1 = new Razorpay(options);
  rzp1.open();
}

function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value;
  if (!message) return;

  const chatBox = document.getElementById("chat-box");
  const userDiv = document.createElement("div");
  userDiv.textContent = "You: " + message;
  chatBox.appendChild(userDiv);

  // Send to backend
  fetch("https://dileepgpt-backend.onrender.com/api/message", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  })
    .then((res) => res.json())
    .then((data) => {
      const botDiv = document.createElement("div");
      botDiv.textContent = "DileepGPT: " + data.reply;
      chatBox.appendChild(botDiv);
      input.value = "";
    })
    .catch((err) => {
      const errorDiv = document.createElement("div");
      errorDiv.textContent = "Error: Failed to get reply";
      chatBox.appendChild(errorDiv);
    });
}
