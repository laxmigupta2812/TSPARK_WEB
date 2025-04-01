document.addEventListener("DOMContentLoaded", function () {
  // Mobile Navigation
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", function () {
    this.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  // Close mobile menu when clicking a link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });

  // Sticky Header
  window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    header.classList.toggle("scrolled", window.scrollY > 50);
  });

  // Schedule Tabs
  const tabBtns = document.querySelectorAll(".tab-btn");
  const daySchedules = document.querySelectorAll(".day-schedule");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remove active class from all buttons and schedules
      tabBtns.forEach((btn) => btn.classList.remove("active"));
      daySchedules.forEach((schedule) => schedule.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      // Show corresponding schedule
      const day = this.getAttribute("data-day");
      document.getElementById(day).classList.add("active");
    });
  });

  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: "smooth",
        });
      }
    });
  });

  // Form Submission
  const registrationForm = document.getElementById("registration-form");
  if (registrationForm) {
    registrationForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const department = document.getElementById("department").value;
      const sport = document.getElementById("sport").value;
      const captain = document.getElementById("captain").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;

      // Here you would typically send this data to a server
      console.log("Registration Submitted:", {
        department,
        sport,
        captain,
        email,
        phone,
      });

      // Show success message
      alert(
        `Thank you, ${captain}! Your ${sport} team from ${department} department has been registered successfully. We'll contact you at ${email} for further details.`
      );

      // Reset form
      this.reset();
    });
  }

  // Animation on Scroll
  const animateOnScroll = function () {
    const elements = document.querySelectorAll(
      ".event-card, .team-card, .gallery-item, .stat-item"
    );

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;

      if (elementPosition < screenPosition) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  };

  // Set initial state for animated elements
  document
    .querySelectorAll(".event-card, .team-card, .gallery-item, .stat-item")
    .forEach((element) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(20px)";
      element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    });

  window.addEventListener("scroll", animateOnScroll);
  // Trigger once on page load
  animateOnScroll();

  // Countdown Timer (example for next event)
  const countdown = function () {
    const countdownElement = document.createElement("div");
    countdownElement.className = "countdown";
    countdownElement.style.cssText = `
              position: fixed;
              bottom: 20px;
              right: 20px;
              background: var(--primary-color);
              color: white;
              padding: 10px 15px;
              border-radius: 5px;
              box-shadow: 0 3px 10px rgba(0,0,0,0.2);
              z-index: 1000;
              font-weight: bold;
          `;

    document.body.appendChild(countdownElement);

    // Set the date we're counting down to (next week from now)
    const countDownDate = new Date();
    countDownDate.setDate(countDownDate.getDate() + 7);

    // Update the count down every 1 second
    const x = setInterval(function () {
      // Get today's date and time
      const now = new Date().getTime();

      // Find the distance between now and the count down date
      const distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Display the result
      countdownElement.innerHTML = `
                  TSpark Starts In:<br>
                  ${days}d ${hours}h ${minutes}m ${seconds}s
              `;

      // If the count down is finished
      if (distance < 0) {
        clearInterval(x);
        countdownElement.innerHTML = "TSpark Has Started!";
        countdownElement.style.background = "var(--secondary-color)";
      }
    }, 1000);
  };

  // Initialize the countdown
  countdown();
});
