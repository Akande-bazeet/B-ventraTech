/* ============================================================
   B-VENTRA TECH — SHARED SITE SCRIPT
   ============================================================ */

/* ---- Preloader ---- */
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

/* ---- Scroll reveal (falls back to instantly visible on older browsers) ---- */
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach((el) => revealObserver.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("visible"));
}

/* ---- Mobile nav toggle ---- */
const navToggle = document.getElementById("navToggle");
const mobileMenu = document.getElementById("mobileMenu");
if (navToggle && mobileMenu) {
  navToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
  });
}

/* ---- Social links (update handles here — used across every page) ---- */
const WHATSAPP_NUMBER = "2347086814953";
const CONTACT_EMAIL = "bventratech@gmail.com";
const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/bventratech",
  tiktok: "https://www.tiktok.com/@bventra.tech",
  whatsapp: "https://wa.me/" + WHATSAPP_NUMBER
};
document.querySelectorAll(".social-link").forEach((link) => {
  const url = SOCIAL_LINKS[link.dataset.social];
  if (url) link.href = url;
});
document.querySelectorAll(".js-whatsapp-link").forEach((link) => {
  link.href = "https://wa.me/" + WHATSAPP_NUMBER;
});

/* ---- Highlight active nav link ---- */
(function highlightActiveNav() {
  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a, .mobile-menu a").forEach((a) => {
    const href = a.getAttribute("href");
    if (href === current) a.classList.add("active");
  });
})();

/* ============================================================
   SERVICES PAGE — request card + WhatsApp modal
   (only runs if the #services element exists on the page)
   ============================================================ */
const servicesContainer = document.getElementById("services");

if (servicesContainer) {
  const services = [
    {
      icon: "📄",
      title: "SIWES / IT REPORT",
      description: "Reports, formatting, editing & documentation",
      question: "What do you need help with?",
      options: ["Report formatting", "Editing & proofreading", "Report structure", "Documentation support", "Complete report assistance", "Other"]
    },
    {
      icon: "💻",
      title: "WEBSITE DEVELOPMENT",
      description: "Modern websites for businesses & brands",
      question: "What type of website do you need?",
      options: ["Business website", "Portfolio website", "School / Organization website", "E-commerce website", "Landing page", "Website redesign", "Other"]
    },
    {
      icon: "🎨",
      title: "GRAPHIC DESIGN",
      description: "Creative designs for your brand & business",
      question: "What design do you need?",
      options: ["Logo design", "Flyer", "Business card", "Banner", "Social media design", "Event design", "Other"]
    },
    {
      icon: "🎬",
      title: "VIDEO EDITING",
      description: "Professional video editing & content",
      question: "What type of video do you need?",
      options: ["Social media video", "Advertisement", "Event video", "YouTube video", "Reels / Short video", "Presentation video", "Other"]
    },
    {
      icon: "🖨️",
      title: "PRINTING & BRANDING",
      description: "Printing, branding materials & merchandise",
      question: "What printing / branding service do you need?",
      options: ["Business cards", "Letterheads", "Banners & signage", "Stickers & labels", "Branded merchandise", "Packaging design", "Other"]
    },
    {
      icon: "📄",
      title: "CV & DOCUMENT SERVICES",
      description: "Professional CVs & document preparation",
      question: "What document service do you need?",
      options: ["CV creation", "CV redesign", "Document formatting", "Typing", "Proofreading", "PDF / Word document", "Other"]
    },
    {
      icon: "☕",
      title: "JAVA / PROGRAMMING",
      description: "Java, coding, debugging & programming support",
      question: "What programming help do you need?",
      options: ["Java project", "Programming assignment", "Debugging", "Code explanation", "Web programming", "Database / Backend", "Other"]
    },
    {
      icon: "📱",
      title: "SOCIAL MEDIA CONTENT",
      description: "Content, graphics & promotional materials",
      question: "What social media service do you need?",
      options: ["Social media graphics", "Content ideas", "Captions", "Promotional content", "Content calendar", "Social media management", "Other"]
    },
    {
      icon: "💬",
      title: "OTHER SERVICE",
      description: "Tell us what you're looking for",
      question: "What service do you need?",
      options: ["Business support", "Technical support", "Creative service", "Academic service", "Other"]
    }
  ];

  let selectedService = null;

  services.forEach((service) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "service-card";
    card.innerHTML = `
      <div class="service-icon">${service.icon}</div>
      <div class="service-content">
        <h3>${service.title}</h3>
        <p>${service.description}</p>
      </div>
      <div class="arrow">→</div>
    `;
    card.onclick = () => openModal(service);
    servicesContainer.appendChild(card);
  });

  function openModal(service) {
    selectedService = service;
    document.getElementById("modalIcon").textContent = service.icon;
    document.getElementById("modalTitle").textContent = service.title;
    document.getElementById("modalDescription").textContent = service.description;
    document.getElementById("question").textContent = service.question;

    const options = document.getElementById("options");
    options.innerHTML = "";
    service.options.forEach((option, index) => {
      const div = document.createElement("div");
      div.className = "option";
      div.innerHTML = `
        <input type="radio" name="serviceOption" id="option${index}" value="${option}" ${index === 0 ? "checked" : ""}>
        <label for="option${index}">${option}</label>
      `;
      options.appendChild(div);
    });

    document.getElementById("details").value = "";
    document.getElementById("modal").classList.add("show");
    document.body.style.overflow = "hidden";
  }

  window.closeModal = function () {
    document.getElementById("modal").classList.remove("show");
    document.body.style.overflow = "";
  };

  document.getElementById("modal").addEventListener("click", function (event) {
    if (event.target === this) closeModal();
  });

  document.getElementById("requestForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const selectedOption = document.querySelector('input[name="serviceOption"]:checked');
    const details = document.getElementById("details").value.trim();
    const requestType = selectedOption ? selectedOption.value : "Not specified";

    const message =
`Hello B-Ventra Tech 👋

I would like to request a service.

━━━━━━━━━━━━━━━━━━

📌 SERVICE
${selectedService.title}

📋 REQUEST
${requestType}

📝 DETAILS
${details || "No additional details provided."}

━━━━━━━━━━━━━━━━━━

Please let me know the next steps and pricing.

Thank you.`;

    const whatsappURL = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
    window.location.href = whatsappURL;
  });
}

/* ============================================================
   CONTACT PAGE — simple form -> Gmail handoff
   (only runs if #contactForm exists on the page)
   ============================================================ */
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("cName").value.trim();
    const email = document.getElementById("cEmail").value.trim();
    const message = document.getElementById("cMessage").value.trim();

    const subject = "New enquiry from " + name;
    const body =
`Name: ${name}
Email: ${email}

Message:
${message}`;

    // Opens Gmail's web compose window, pre-filled and addressed to us.
    const gmailURL =
      "https://mail.google.com/mail/?view=cm&fs=1&to=" + encodeURIComponent(CONTACT_EMAIL) +
      "&su=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);

    window.open(gmailURL, "_blank");
  });
}
