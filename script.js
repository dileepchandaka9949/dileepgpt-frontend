document.getElementById("payButton").onclick = function () {
  var options = {
    key: "rzp_test_6aUdAJRGe6Glqm", // ✅ Your Razorpay Test Key
    amount: 1900,
    currency: "INR",
    name: "DileepGPT Access",
    description: "Unlock AI Chat",
    handler: function (response) {
      document.getElementById("payButton").style.display = "none";
      document.getElementById("chatSection").style.display = "block";
      alert("Payment Successful. Chat Unlocked!");
    },
    prefill: {
      name: "User",
      email: "test@example.com",
      contact: "9999999999",
    },
    theme: {
      color: "#3399cc"
    }
  };
  var rzp = new Razorpay(options);
  rzp.open();
};

function sendMessage() {
  const userMessage = document.getElementById("userInput").value;
  const chatbox = document.getElementById("chatbox");

  chatbox.innerHTML += `<div><strong>You:</strong> ${userMessage}</div>`;
  document.getElementById("userInput").value = "";

  fetch("https://dileepgpt-backend.onrender.com/api/message", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message: userMessage })
  })
    .then(res => res.json())
    .then(data => {
      chatbox.innerHTML += `<div><strong>DileepGPT:</strong> ${data.reply}</div>`;
      chatbox.scrollTop = chatbox.scrollHeight;
    })
    .catch(err => {
      chatbox.innerHTML += `<div style="color:red;"><strong>Error:</strong> Failed to get reply</div>`;
    });
}
