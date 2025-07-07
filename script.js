document.getElementById("payButton").onclick = function () {
  var options = {
    key: "rzp_test_6aUdAJRGe6Glqm", // Your Razorpay key
    amount: 1900,
    currency: "INR",
    name: "DileepGPT",
    description: "Unlock Chat Access",
    handler: function (response) {
      document.getElementById("chatContainer").style.display = "block";
      document.getElementById("payButton").style.display = "none";
    },
    prefill: {
      name: "User",
      email: "user@example.com",
      contact: "9999999999",
    },
    theme: {
      color: "#3399cc"
    }
  };
  var rzp = new Razorpay(options);
  rzp.open();
};

async function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value;
  const chatBox = document.getElementById("chatBox");
  chatBox.innerHTML += `<div><b>You:</b> ${message}</div>`;
  input.value = "";

  const res = await fetch("https://dileepgpt-backend.onrender.com/api/message", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  });

  const data = await res.json();
  chatBox.innerHTML += `<div><b>DileepGPT:</b> ${data.reply}</div>`;
}
