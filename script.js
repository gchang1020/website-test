// Initialize Stripe (replace with your publishable key)
const stripe = Stripe("pk_test_YOUR_PUBLISHABLE_KEY_HERE");

let selectedAmount = null;

// Amount button handlers
document.querySelectorAll(".amount-btn").forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    document.querySelectorAll(".amount-btn").forEach((btn) => {
      btn.classList.remove("active");
    });

    // Add active class to clicked button
    button.classList.add("active");
    selectedAmount = parseInt(button.getAttribute("data-amount"));
  });
});

// Checkout button handler
document
  .getElementById("checkout-button")
  .addEventListener("click", async () => {
    if (!selectedAmount) {
      alert("Please select a donation amount");
      return;
    }

    try {
      // Call your backend endpoint to create a checkout session
      const response = await fetch("/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: selectedAmount,
        }),
      });

      const session = await response.json();

      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        alert(result.error.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  });

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});
