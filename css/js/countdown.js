function updateCountdown() {
  const targetDate = new Date("2025-04-10T15:00:00").getTime();

  function update() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      document.querySelector(".countdown").innerHTML =
        "<h3>O chá já aconteceu!</h3>";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = String(days).padStart(2, "0");
    document.getElementById("hours").textContent = String(hours).padStart(
      2,
      "0"
    );
    document.getElementById("minutes").textContent = String(minutes).padStart(
      2,
      "0"
    );
    document.getElementById("seconds").textContent = String(seconds).padStart(
      2,
      "0"
    );
  }

  update();
  setInterval(update, 1000);
}

document.addEventListener("DOMContentLoaded", updateCountdown);

// Back to top button visibility
window.addEventListener("scroll", () => {
  const backToTop = document.querySelector(".back-to-top");
  if (window.scrollY > window.innerHeight / 2) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
});
