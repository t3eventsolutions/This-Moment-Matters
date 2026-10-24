const menu = document.getElementById("menu");
const nav = document.getElementById("nav");
if (menu && nav) {
  menu.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menu.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    menu.setAttribute("aria-expanded", "false");
  }));
}
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const form = document.getElementById("form");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const emailMeta = document.querySelector('meta[name="t3-inquiry-email"]');
    const recipient = emailMeta ? emailMeta.content.trim() : "";
    const subject = `T3 Event Solutions inquiry - ${data.get("service") || "Event"}`;
    const body = [
      `Name: ${data.get("name") || ""}`,
      `Email: ${data.get("email") || ""}`,
      `Phone: ${data.get("phone") || ""}`,
      `Event date: ${data.get("date") || ""}`,
      `Event location: ${data.get("location") || ""}`,
      `Interested in: ${data.get("service") || ""}`,
      "",
      "Event details:",
      data.get("details") || ""
    ].join("\n");
    const message = document.getElementById("message");
    if (recipient && recipient.includes("@")) {
      message.textContent = "Your email app should open with the inquiry prepared. Review it and press Send to contact T3 Event Solutions.";
      window.location.href = `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    } else {
      message.textContent = "Please email T3EventSolutions@gmail.com with your event details.";
      const preview = document.getElementById("preview");
      if (preview) { preview.hidden = false; preview.textContent = `To: T3EventSolutions@gmail.com\nSubject: ${subject}\n\n${body}`; }
    }
  });
}

// Click any gallery photo to view it larger; close with the button, backdrop, or Escape.
const lightbox = document.getElementById("lightbox");
if (lightbox) {
  const lightboxImage = lightbox.querySelector("img");
  document.querySelectorAll(".photo-open").forEach(button => button.addEventListener("click", () => {
    const image = button.querySelector("img");
    lightboxImage.src = image.src; lightboxImage.alt = image.alt;
    lightbox.classList.add("open"); lightbox.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden";
  }));
  const closeLightbox = () => { lightbox.classList.remove("open"); lightbox.setAttribute("aria-hidden", "true"); lightboxImage.src = ""; document.body.style.overflow = ""; };
  lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", event => { if (event.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", event => { if (event.key === "Escape") closeLightbox(); });
}
// Preselect a service when a customer clicks a service-specific inquiry link.
document.querySelectorAll("[data-service]").forEach(link => link.addEventListener("click", () => {
  const select = document.querySelector('select[name="service"]'); if (select) select.value = link.dataset.service;
}));
