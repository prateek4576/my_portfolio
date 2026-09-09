const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const navbar = document.getElementById("navbar");

const sections = [...document.querySelectorAll("main section[id]")];

const navLinks = [...document.querySelectorAll(".nav-link")];

function updateNavbar() {
  if (!navbar) {
    return;
  }

  navbar.classList.toggle("scrolled", window.scrollY > 18);

  let current = "home";

  sections.forEach((section) => {
    const top = section.getBoundingClientRect().top;

    if (top <= 150) {
      current = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${current}`,
    );
  });
}

window.addEventListener("scroll", updateNavbar, { passive: true });

updateNavbar();

const menuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const mobileLinks = document.querySelectorAll(".mobile-link");



function toggleMenu(force) {
  if (!mobileMenu || !menuBtn) {
    return;
  }

  const shouldOpen =
    typeof force === "boolean" ? force : !mobileMenu.classList.contains("open");

  mobileMenu.classList.toggle("open", shouldOpen);
  menuBtn.classList.toggle("open", shouldOpen);
  menuBtn.setAttribute("aria-expanded", String(shouldOpen));
  document.body.style.overflow = shouldOpen ? "hidden" : "";
}

if (menuBtn) {
  menuBtn.addEventListener("click", () => toggleMenu());
}

mobileLinks.forEach((link) => {
  link.addEventListener("click", () => toggleMenu(false));
});

document.addEventListener("click", (e) => {
  if (!mobileMenu || !menuBtn) return;

  const isMenuOpen = mobileMenu.classList.contains("open");

  if (
    isMenuOpen &&
    !mobileMenu.contains(e.target) &&
    !menuBtn.contains(e.target)
  ) {
    toggleMenu(false);
  }
});

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
    },
  );

  revealItems.forEach((item) => {
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach((item) => {
    item.classList.add("visible");
  });
}

const projectModal = document.getElementById("projectModal");
const projectModalClose = document.getElementById("projectModalClose");
const projectCards = document.querySelectorAll(".project-card");

let projectModalPreviousBodyOverflow = "";
let imageModalPreviousBodyOverflow = "";

const projectData = {
  campusconnect: {
    category: "Full Stack Web App",

    title: "CampusConnect",

   overview: [
  "Developed a full-stack campus lost-and-found platform enabling students to report, search, and recover belongings efficiently.",
  "Integrated React.js with FastAPI and MongoDB to manage users, lost items, found items, and communication data.",
  "Built real-time messaging features to help users communicate securely and coordinate item recovery.",
  "Implemented JWT authentication with Google OAuth verification to provide secure access for registered users."
],

    technology: [
      "React.js",
      "JavaScript",
      "Python",
      "MongoDB",
      "Google OAuth",
      "JWT",
      "FastAPI",
    ],

    
    authentication:
      "Google OAuth and JWT-based authentication are used to securely authenticate users and protect application resources.",

    screenshots: [
      "images/campusconnect.png",
      "images/campusconnect-dashboard.png",
      "images/campusconnect-lostitems.png",
      "images/campusconnect-messages.png",
      "images/campusconnect-myaccount.png",
      "images/campusconnect-reportlost.png",
    ],

    github: "https://github.com/prateek4576/campusconnect",
    live: "https://campusconnect-prateek57.vercel.app/",
  },

  caat: {
    category: "Assessment Platform",

    title: "CAAT – Child Aptitude Assessment Test",
   overview: [
  "Engineered an interactive aptitude assessment platform covering Maths, Science, and Aptitude quizzes for students.",
  "Connected MongoDB with Node.js and Express.js to manage users, scores, questions, and attempt history in one system.",
  "Implemented instant result generation, subject-wise scoring, and dashboard-based performance tracking across three assessment areas.",
  "Strengthened user authentication with bcrypt password hashing to protect user credentials."
],

    technology: [
      "HTML",
      "CSS",
      "JavaScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "bcrypt",
      "Nodemailer",
    ],

   

    authentication:
      "User authentication is secured with password hashing using bcrypt and session-based access control.",

    screenshots: [
      "images/CAAT.png",
      "images/CAAT-ABOUT.png",
      "images/CAAT-CONTACT.png",
      "images/CAAT-DASHBOARD.png",
      "images/CAAT-QUIZ.png",
      "images/CAAT-SCORECARD.png",
    ],

    github: "https://github.com/prateek4576/project",
    live: "https://caat-pfiy.onrender.com/",
  },

  taskflow: {
    category: "Productivity Web App",

    title: "TaskFlow",
   overview: [
  "Developed a secure task management application with email/password registration and Google OAuth 2.0 authentication.",
  "Implemented Express-Session with secure cookies to maintain persistent authenticated user sessions.",
  "Used Passport.js and Passport-Local for authentication alongside hashed password validation.",
  "Integrated PostgreSQL for SQL-based credential and user data storage with secure password hashing."
],

    technology: [
      "HTML",
      "CSS",
      "JavaScript",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "OAuth 2.0",
    ],

   

    authentication:
      "Google OAuth 2.0 provides secure login while session-based authentication maintains authenticated user sessions.",


    screenshots: [
      "images/todo.png",
      "images/todo-about.png",
      "images/todo-login.png",
      "images/todo-dashboard.png",
      "images/todo-tasklist.png",
      "images/todo-edit.png",
    ],

    github: "https://github.com/prateek4576/mytodoapp",
    live: "https://mytodoapp-deth.onrender.com",
  },
};

const projectModalCategory = document.getElementById("projectModalCategory");
const projectModalTitle = document.getElementById("projectModalTitle");
const projectModalOverview = document.getElementById("projectModalOverview");
const projectModalTech = document.getElementById("projectModalTech");

const projectModalAuth = document.getElementById("projectModalAuth");


const projectModalScreenshots = document.getElementById(
  "projectModalScreenshots",
);
const projectModalGithub = document.getElementById("projectModalGithub");
const projectModalLive = document.getElementById("projectModalLive");

function openProjectModal(projectId) {
  const project = projectData[projectId];

  if (!project || !projectModal) {
    return;
  }

  projectModalCategory.textContent = project.category;
  projectModalTitle.textContent = project.title;
  projectModalOverview.innerHTML = `
  <ul class="project-overview-list">
    ${project.overview
      .map((item) => `<li>${item}</li>`)
      .join("")}
  </ul>
`;

  projectModalAuth.textContent = project.authentication;


  projectModalTech.innerHTML = "";

  project.technology.forEach((tech) => {
    const span = document.createElement("span");

    span.className = "tech-tag";
    span.textContent = tech;
    projectModalTech.appendChild(span);
  });

  projectModalScreenshots.innerHTML = "";

 projectModalScreenshots.innerHTML = "";

project.screenshots.forEach((src) => {
  const img = document.createElement("img");

  img.src = src;
  img.alt = `${project.title} screenshot`;
  img.classList.add("project-screenshot-clickable");

  img.addEventListener("click", () => {
    openModal(
      src,
      "https://placehold.co/1200x675/f8fafc/0f172a?text=Screenshot+Unavailable"
    );
  });

  projectModalScreenshots.appendChild(img);
});

  projectModalGithub.href = project.github;
  projectModalLive.href = project.live;
  projectModal.classList.add("show");
  projectModal.setAttribute("aria-hidden", "false");

projectModalPreviousBodyOverflow = document.body.style.overflow;
document.body.style.overflow = "hidden";
}

function closeProjectModal() {
  if (!projectModal) {
    return;
  }

  projectModal.classList.remove("show");
  projectModal.setAttribute("aria-hidden", "true");

  document.body.style.overflow = projectModalPreviousBodyOverflow;
}

const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const modalClose = document.getElementById("modalClose");
const certificateCards = document.querySelectorAll(".cert-card");
function openModal(src, fallback) {
  if (!modal || !modalImage) {
    return;
  }

  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  imageModalPreviousBodyOverflow = document.body.style.overflow;
document.body.style.overflow = "hidden";

  modalImage.onerror = function () {
    modalImage.onerror = null;
    modalImage.src = fallback;
  };

  modalImage.src = src;
}

function closeModal() {
  if (!modal || !modalImage) {
    return;
  }

  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  modalImage.src = "";

 document.body.style.overflow = imageModalPreviousBodyOverflow;
}

certificateCards.forEach((card) => {
  card.addEventListener("click", () => {
    const src = card.dataset.certificate;

    const fallback = card.dataset.fallback;

    if (!src) {
      return;
    }

    openModal(src, fallback);
  });
});

if (modalClose) {
  modalClose.addEventListener("click", closeModal);
}

if (modal) {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal && modal.classList.contains("show")) {
    closeModal();
  }
});

window.addEventListener("resize", () => {
  if (
    window.innerWidth >= 768 &&
    mobileMenu &&
    mobileMenu.classList.contains("open")
  ) {
    toggleMenu(false);
  }
});

projectCards.forEach((card) => {
  card.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      return;
    }

    const projectId = card.dataset.project;
    openProjectModal(projectId);
  });

  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();

      const projectId = card.dataset.project;
      openProjectModal(projectId);
    }
  });
});

document.querySelectorAll(".project-case-study-btn").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();

    const card = button.closest(".project-card");

    if (!card) {
      return;
    }

    const projectId = card.dataset.project;
    openProjectModal(projectId);
  });
});

if (projectModalClose) {
  projectModalClose.addEventListener("click", closeProjectModal);
}

if (projectModal) {
  projectModal.addEventListener("click", (event) => {
    if (event.target === projectModal) {
      closeProjectModal();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    projectModal &&
    projectModal.classList.contains("show")
  ) {
    closeProjectModal();
  }
});


// =========================
// THEME TOGGLE
// =========================

const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

function setTheme(isLight) {
  document.body.classList.toggle("light-mode", isLight);

  if (themeIcon) {
    themeIcon.className = isLight
      ? "fa-solid fa-moon"
      : "fa-solid fa-sun";
  }

  if (themeToggle) {
    themeToggle.setAttribute(
      "aria-label",
      isLight ? "Switch to dark mode" : "Switch to light mode"
    );

    themeToggle.setAttribute("aria-pressed", String(isLight));
  }

  localStorage.setItem("theme", isLight ? "light" : "dark");
}

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
  setTheme(true);
} else {
  setTheme(false);
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isLight = !document.body.classList.contains("light-mode");
    setTheme(isLight);
  });
}

// =========================
// SCROLL TO TOP
// =========================

const scrollToTopButton = document.getElementById("scroll-to-top");

window.addEventListener(
  "scroll",
  () => {
    if (!scrollToTopButton) return;

    scrollToTopButton.classList.toggle(
      "show",
      window.scrollY > 400
    );
  },
  { passive: true }
);

if (scrollToTopButton) {
  scrollToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}