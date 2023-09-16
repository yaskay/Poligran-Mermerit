const grayHorizontalLogo = "logo/gray_horizontal_logo.png";
const blackHorizontalLogo = "logo/black_horizontal_logo.png";

const grayVerticalLogo = "logo/gray_vertical_logo.png";
const blackVerticalLogo = "logo/black_vertical_logo.png";

const lightIcon = "bi-moon-fill";
const darkIcon = "bi-brightness-high-fill";

// Sayfanın tamamen hazır hale gelmesini bekle.
// HTML, CSS ve javascript dosyaları indirilip işlenmeli ve sayfa son haline gelmeli.
window.addEventListener("load", () => {
  document.querySelector('.loading-screen').style.display = 'none';
  document.body.classList.remove("overflow-hidden");
});

// HTML yüklendiğinde tercihlere göre still ayarlamalarını yap.
document.addEventListener("DOMContentLoaded", () => {
  const htmlElement = document.documentElement;
  const footerLogo = document.querySelector(".footer-logo");
  const navbarLogos = [...document.getElementsByClassName("navbar-logo")];
  const themeIcons = [...document.getElementsByClassName("theme-icon")];

  // Temayı localStorage'dan al, yoksa varsayılan olarak light tema kullan.
  const storedTheme = localStorage.getItem("theme") || "light";
  htmlElement.setAttribute("data-bs-theme", storedTheme);

  // Navbar logolarını set et.
  navbarLogos.forEach((logo) => logo.src = storedTheme === "light" ? blackHorizontalLogo : grayHorizontalLogo);

  // Footer logosunu set et.
  footerLogo.src = storedTheme === "light" ? blackVerticalLogo : grayVerticalLogo;

  // Tema ikonları başlagıç için set et.
  themeIcons.forEach((icon) => {

    // Tema ikonlarına sınıflarını ekle
    icon.classList.add(storedTheme === "light" ? lightIcon : darkIcon);

  });

  // Tema ikonlarının click olaylarını dinle.
  themeIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
      const currentTheme = htmlElement.getAttribute("data-bs-theme");
      const newTheme = currentTheme === "light" ? "dark" : "light";

      // Temayı değiştir ve localStorage'a kaydet.
      htmlElement.setAttribute("data-bs-theme", newTheme);
      localStorage.setItem("theme", newTheme);

      if (newTheme === "dark") {
        // İkonun class'ını güncelle.
        icon.classList.remove(lightIcon);
        icon.classList.add(darkIcon);

        // Footer'ın logosunu güncelle.
        footerLogo.src = grayVerticalLogo;

        // Navbar'ın logolarını güncelle.
        navbarLogos.forEach((logo) => logo.src = grayHorizontalLogo);
      } else {
        // İkonun class'ını güncelle.
        icon.classList.remove(darkIcon);
        icon.classList.add(lightIcon);

        // Footer'ın logosunu güncelle.
        footerLogo.src = blackVerticalLogo;

        // Navbar'ın logolarını güncelle.
        navbarLogos.forEach((logo) => logo.src = blackHorizontalLogo);
      }
    });
  });
});
