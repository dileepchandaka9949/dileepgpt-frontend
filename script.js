function payNow() {
  var options = {
    key: "rzp_test_6aUdAJRGe6Glqm", // ✅ Your Razorpay Test Key
    amount: 1900, // ₹19 in paisa
    currency: "INR",
    name: "DileepGPT",
    description: "Chatbot Unlock Access",
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
