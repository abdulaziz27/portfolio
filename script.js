// Toggle Menu function for mobile navigation
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Document Ready Function
document.addEventListener("DOMContentLoaded", function () {
  setupCertificatesFilter();
  setupCertificateViewer();
  setupProjectsFilter();
  toggleMenu();
});

// Setup Certificate Filtering
function setupCertificatesFilter() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const certificateCards = document.querySelectorAll(".certificate-card");

  // Map for translating categories
  const categoryMap = {
    security: "others",
    competence: "others",
    competition: "others",
  };

  // Function to filter certificates
  function filterCertificates(category) {
    certificateCards.forEach((card) => {
      let cardCategory = card.getAttribute("data-category");

      // Map specialized categories to "others" if needed
      if (category === "others" && categoryMap[cardCategory]) {
        card.style.display = "block";
      } else if (category === "all" || cardCategory === category) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }

  // Add click listeners to filter buttons
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      button.classList.add("active");

      // Filter certificates
      const category = button.getAttribute("data-filter");
      filterCertificates(category);
    });
  });

  // Initial filter to show all certificates
  filterCertificates("all");
}

// Setup Certificate Viewer
function setupCertificateViewer() {
  const certificateCards = document.querySelectorAll(".certificate-card");

  // Create modal element
  const modal = document.createElement("div");
  modal.className = "cert-viewer-modal";
  modal.innerHTML = `
    <span class="cert-close-btn">&times;</span>
    <div class="cert-modal-controls">
      <button class="cert-nav-btn cert-prev-btn"><i class="fas fa-chevron-left"></i></button>
      <button class="cert-nav-btn cert-next-btn"><i class="fas fa-chevron-right"></i></button>
    </div>
    <div class="cert-modal-content">
      <img class="cert-modal-img" src="" alt="">
      <div class="cert-modal-caption"></div>
    </div>
  `;
  document.body.appendChild(modal);

  // Get modal elements
  const modalImg = modal.querySelector(".cert-modal-img");
  const modalCaption = modal.querySelector(".cert-modal-caption");
  const prevBtn = modal.querySelector(".cert-prev-btn");
  const nextBtn = modal.querySelector(".cert-next-btn");
  const closeBtn = modal.querySelector(".cert-close-btn");

  let currentIndex = 0;
  let visibleCertificates = [];

  // Function to update visible certificates
  function updateVisibleCertificates() {
    visibleCertificates = Array.from(certificateCards).filter(
      (card) => card.style.display !== "none"
    );
  }

  // Function to show the certificate in modal
  function showCertificate(index) {
    const certificate = visibleCertificates[index];
    const img = certificate.querySelector("img");
    const title = certificate.querySelector(".certificate-title").textContent;

    modalImg.src = img.src;
    modalCaption.textContent = title;

    // Update navigation button states
    prevBtn.style.visibility = index === 0 ? "hidden" : "visible";
    nextBtn.style.visibility =
      index === visibleCertificates.length - 1 ? "hidden" : "visible";

    modal.style.display = "block";
  }

  // Function to close modal
  function closeModal() {
    modal.style.display = "none";
  }

  // Setup view certificate buttons
  certificateCards.forEach((card) => {
    const viewBtn = card.querySelector(".view-cert-btn");

    viewBtn.addEventListener("click", () => {
      updateVisibleCertificates();
      currentIndex = visibleCertificates.indexOf(card);
      showCertificate(currentIndex);
    });
  });

  // Previous certificate navigation
  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      showCertificate(currentIndex);
    }
  });

  // Next certificate navigation
  nextBtn.addEventListener("click", () => {
    if (currentIndex < visibleCertificates.length - 1) {
      currentIndex++;
      showCertificate(currentIndex);
    }
  });

  // Close modal when clicking the close button
  closeBtn.addEventListener("click", closeModal);

  // Close modal when clicking outside of content
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (modal.style.display === "block") {
      if (e.key === "ArrowLeft" && currentIndex > 0) {
        currentIndex--;
        showCertificate(currentIndex);
      } else if (
        e.key === "ArrowRight" &&
        currentIndex < visibleCertificates.length - 1
      ) {
        currentIndex++;
        showCertificate(currentIndex);
      } else if (e.key === "Escape") {
        closeModal();
      }
    }
  });
}

// Setup Projects Filtering
function setupProjectsFilter() {
  const filterButtons = document.querySelectorAll(".project-filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  // Function to filter projects
  function filterProjects(category) {
    projectCards.forEach((card) => {
      const cardCategories = card.getAttribute("data-categories").split(",");

      if (category === "all" || cardCategories.includes(category)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });

    // Update badges to show the currently filtered category
    // This is optional but adds a nice touch
    if (category !== "all") {
      projectCards.forEach((card) => {
        const cardCategories = card.getAttribute("data-categories").split(",");
        const badge = card.querySelector(".project-badge");

        if (cardCategories.includes(category)) {
          // Update badge to show filtered category
          badge.textContent =
            category.charAt(0).toUpperCase() + category.slice(1);
          badge.className = "project-badge " + category;
        }
      });
    }
  }

  // Add click listeners to filter buttons
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      button.classList.add("active");

      // Filter projects
      const category = button.getAttribute("data-filter");
      filterProjects(category);
    });
  });

  // Initial filter to show all projects
  filterProjects("all");
}

// Timeline Animation and Interactivity
function setupTimeline() {
  const timelineItems = document.querySelectorAll(".timeline-item");
  const filterButtons = document.querySelectorAll(".timeline-filter-btn");
  const expandButtons = document.querySelectorAll(".timeline-expand-btn");

  // Animate items when they come into view
  function animateOnScroll() {
    timelineItems.forEach((item) => {
      const itemTop = item.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (itemTop < windowHeight * 0.8) {
        item.classList.add("animate");
      }
    });
  }

  // Expand/collapse details
  expandButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const details = this.nextElementSibling;
      details.classList.toggle("open");
      this.textContent = details.classList.contains("open")
        ? "Read Less"
        : "Read More";
    });
  });

  // Filter timeline items
  function filterTimeline(category) {
    timelineItems.forEach((item) => {
      if (category === "all" || item.dataset.category === category) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
      filterTimeline(this.dataset.filter);
    });
  });

  // Run animation on scroll
  window.addEventListener("scroll", animateOnScroll);

  // Initial animation
  animateOnScroll();
}

// Call after DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  setupTimeline();
});
