(function() {
  const root = document.getElementById("site-header");
  if (!root) return;

  const contactItems = [
    SITE.email ? `<a href="mailto:${SITE.email}" class="contact-link" aria-label="Email">${SITE.email}</a>` : "",
    SITE.linkedin ? `<a href="${SITE.linkedin}" target="_blank" rel="noopener" class="contact-link" aria-label="LinkedIn">LinkedIn</a>` : "",
    SITE.telegram ? `<a href="${SITE.telegram}" target="_blank" rel="noopener" class="contact-link" aria-label="Telegram">Telegram</a>` : "",
  ].filter(Boolean).join('<span class="dot">•</span>');

  root.innerHTML = `
  <header class="site-header">
    <div class="container header-inner">
      <div class="brand">
        <div class="brand-top">
          <a href="/index.html" class="brand-name" title="To home">${SITE.name}</a>
          <span class="brand-role">${SITE.role}</span>
        </div>
        <div class="brand-contacts">${contactItems}</div>
      </div>

      <button class="menu-toggle" aria-label="Open menu" aria-expanded="false">
        <span class="bar"></span><span class="bar"></span><span class="bar"></span>
      </button>

      <nav class="site-nav" data-state="closed" aria-label="Main menu">
        <a href="about.html">About</a>
        <a href="experience.html">Experience</a>
        <a href="courses.html">Courses</a>
      </nav>
    </div>
  </header>`;

  const toggle = root.querySelector(".menu-toggle");
  const nav = root.querySelector(".site-nav");
  toggle.addEventListener("click", () => {
    const isOpen = nav.getAttribute("data-state") === "open";
    nav.setAttribute("data-state", isOpen ? "closed" : "open");
    toggle.setAttribute("aria-expanded", String(!isOpen));
  });

  // Close menu on nav click (mobile UX)
  nav.addEventListener("click", e => {
    if (e.target.tagName === "A") {
      nav.setAttribute("data-state", "closed");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
})();
