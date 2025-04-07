// Initialize Lucide Icons
document.addEventListener("DOMContentLoaded", () => {
  // Initialize icons
  lucide.createIcons();

  // Set correct logo visibility on initial load
  updateLogoVisibility();
});

// Logo visibility management
function updateLogoVisibility() {
  const isDarkMode = document.body.classList.contains("dark-mode");
  const lightLogo = document.querySelector(".light-logo");
  const darkLogo = document.querySelector(".dark-logo");

  if (!lightLogo || !darkLogo) {
    console.error("Logo elements not found");
    return;
  }

  // Debug message
  console.log(
    "Setting logo visibility for theme:",
    isDarkMode ? "dark" : "light"
  );

  if (isDarkMode) {
    lightLogo.style.display = "none";
    darkLogo.style.display = "block";
  } else {
    lightLogo.style.display = "block";
    darkLogo.style.display = "none";
  }
}

// Theme Toggling
const initializeTheme = () => {
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
  const storedTheme = localStorage.getItem("theme");

  if (storedTheme === "dark" || (!storedTheme && prefersDarkScheme.matches)) {
    document.body.classList.remove("light-mode");
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
    document.body.classList.add("light-mode");
  }

  // Update logo visibility after setting theme
  updateLogoVisibility();
};

const toggleTheme = () => {
  if (document.body.classList.contains("light-mode")) {
    document.body.classList.remove("light-mode");
    document.body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark-mode");
    document.body.classList.add("light-mode");
    localStorage.setItem("theme", "light");
  }

  // Update logo visibility after toggling theme
  setTimeout(updateLogoVisibility, 50);
};

// Initialize theme on page load
initializeTheme();

// Theme toggle event listeners
document.getElementById("theme-toggle").addEventListener("click", toggleTheme);
document
  .getElementById("mobile-theme-toggle")
  .addEventListener("click", toggleTheme);
document
  .getElementById("footer-theme-toggle")
  .addEventListener("click", toggleTheme);

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const mobileMenu = document.querySelector(".mobile-menu");

mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
  document.body.style.overflow = mobileMenu.classList.contains("active")
    ? "hidden"
    : "";
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".mobile-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
    document.body.style.overflow = "";
  });
});

// Navbar Scroll Effect
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Back to Top Button
const backToTopButton = document.getElementById("back-to-top");
window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    backToTopButton.classList.add("visible");
  } else {
    backToTopButton.classList.remove("visible");
  }
});

backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Typewriter Effect for Hero Section
const typeWriter = () => {
  const words = [
    "beautiful websites.",
    "engaging designs.",
    "memorable photos.",
  ];
  const typewriterElement = document.getElementById("typewriter-words");
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  const type = () => {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50;
    } else {
      typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      typeSpeed = 1500; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 500; // Pause before typing next word
    }

    setTimeout(type, typeSpeed);
  };

  // Start typing
  setTimeout(type, 1000);
};

// Portfolio Filtering
const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const filterValue = button.getAttribute("data-filter");

    portfolioItems.forEach((item) => {
      if (filterValue === "all" || item.classList.contains(filterValue)) {
        gsap.to(item, {
          duration: 0.5,
          opacity: 1,
          scale: 1,
          ease: "power1.out",
        });
        item.style.display = "block";
      } else {
        gsap.to(item, {
          duration: 0.5,
          opacity: 0,
          scale: 0.8,
          ease: "power1.out",
          onComplete: () => {
            item.style.display = "none";
          },
        });
      }
    });
  });
});

// Portfolio item click functionality
document.querySelectorAll(".portfolio-item").forEach((item) => {
  item.addEventListener("click", (event) => {
    // Find the link inside this portfolio item
    const link = item.querySelector(".portfolio-link");

    // If the clicked element is not the link itself, trigger the link click
    if (!event.target.closest(".portfolio-link")) {
      link.click();
    }
  });
});

// Testimonial Slider
const testimonials = document.querySelectorAll(".testimonial");
const testimonialTrack = document.querySelector(".testimonial-track");
const dotsContainer = document.querySelector(".testimonial-dots");
let currentIndex = 0;

// Create dots
testimonials.forEach((_, index) => {
  const dot = document.createElement("div");
  dot.classList.add("testimonial-dot");
  if (index === 0) dot.classList.add("active");
  dot.addEventListener("click", () => goToSlide(index));
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".testimonial-dot");

// Set initial active slide
testimonials[0].classList.add("active");

function goToSlide(index) {
  // Update current index
  currentIndex = index;

  // Remove active classes
  testimonials.forEach((slide) => slide.classList.remove("active"));
  dots.forEach((dot) => dot.classList.remove("active"));

  // Add active class to current slide and dot
  testimonials[index].classList.add("active");
  dots[index].classList.add("active");

  // Move the track
  gsap.to(testimonialTrack, {
    duration: 0.5,
    x: -index * 100 + "%",
    ease: "power2.out",
  });
}

// Previous and next buttons
document.querySelector(".prev-testimonial").addEventListener("click", () => {
  const newIndex =
    (currentIndex - 1 + testimonials.length) % testimonials.length;
  goToSlide(newIndex);
});

document.querySelector(".next-testimonial").addEventListener("click", () => {
  const newIndex = (currentIndex + 1) % testimonials.length;
  goToSlide(newIndex);
});

// Auto slide testimonials
let testimonialInterval;

function startTestimonialInterval() {
  testimonialInterval = setInterval(() => {
    const newIndex = (currentIndex + 1) % testimonials.length;
    goToSlide(newIndex);
  }, 5000);
}

function resetTestimonialInterval() {
  clearInterval(testimonialInterval);
  startTestimonialInterval();
}

// Start auto slide
startTestimonialInterval();

// Reset interval when manually changing slides
document
  .querySelectorAll(".testimonial-dot, .prev-testimonial, .next-testimonial")
  .forEach((control) => {
    control.addEventListener("click", resetTestimonialInterval);
  });

// Form Focus Effects
const formInputs = document.querySelectorAll(
  ".contact-form input, .contact-form textarea"
);
formInputs.forEach((input) => {
  input.addEventListener("focus", () => {
    input.parentElement.classList.add("focused");
  });

  input.addEventListener("blur", () => {
    input.parentElement.classList.remove("focused");
  });
});

// Initialize GSAP Animations
function initGSAPAnimations() {
  // Hero Section Animations - Enhanced for new design
  const heroTimeline = gsap.timeline();

  heroTimeline.to(".animate-element", {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "power3.out",
  });

  // Scroll Animations
  gsap.registerPlugin(ScrollTrigger);

  // About Section
  gsap.from(".about-image", {
    scrollTrigger: {
      trigger: ".about-image",
      start: "top 80%",
    },
    opacity: 0,
    x: -50,
    duration: 1,
    ease: "power3.out",
  });

  gsap.from(".about-text", {
    scrollTrigger: {
      trigger: ".about-text",
      start: "top 80%",
    },
    opacity: 0,
    x: 50,
    duration: 1,
    ease: "power3.out",
  });

  // Skills Section
  gsap.from(".skill-card", {
    scrollTrigger: {
      trigger: ".skills-grid",
      start: "top 80%",
    },
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.2,
    ease: "power3.out",
  });

  // Portfolio Section
  gsap.from(".portfolio-filters", {
    scrollTrigger: {
      trigger: ".portfolio-filters",
      start: "top 90%",
    },
    opacity: 0,
    y: 20,
    duration: 0.8,
    ease: "power3.out",
  });

  gsap.from(".portfolio-item", {
    scrollTrigger: {
      trigger: ".portfolio-grid",
      start: "top 80%",
    },
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.1,
    ease: "power3.out",
  });

  // Testimonials Section
  gsap.from(".testimonial-slider", {
    scrollTrigger: {
      trigger: ".testimonial-slider",
      start: "top 80%",
    },
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: "power3.out",
  });

  // Contact Section
  gsap.from(".contact-form", {
    scrollTrigger: {
      trigger: ".contact-container",
      start: "top 80%",
    },
    opacity: 0,
    x: -50,
    duration: 0.8,
    ease: "power3.out",
  });

  gsap.from(".contact-info", {
    scrollTrigger: {
      trigger: ".contact-container",
      start: "top 80%",
    },
    opacity: 0,
    x: 50,
    duration: 0.8,
    ease: "power3.out",
  });

  // Section Titles
  gsap.utils.toArray(".section-title").forEach((title) => {
    gsap.from(title, {
      scrollTrigger: {
        trigger: title,
        start: "top 80%",
      },
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: "power3.out",
    });
  });
}

// Initialize animations and typewriter once the page is loaded
window.addEventListener("load", () => {
  initGSAPAnimations();
  typeWriter();
});

// Form Submission
const contactForm = document.querySelector(".contact-form");
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  // Here you would normally send the data to a server
  // For demo purposes, we'll just log it and reset the form
  console.log("Form submitted:", { name, email, message });

  // Show success message (you could create a more sophisticated notification)
  alert("Thank you for your message! I will get back to you soon.");

  // Reset the form
  contactForm.reset();
});
