const whiteHorizontalLogo = "logo/white_horizontal_logo.png";
const blackHorizontalLogo = "logo/black_horizontal_logo.png";

const whiteVerticalLogo = "logo/white_vertical_logo.png";
const blackVerticalLogo = "logo/test.png";

const lightIcon = "bi-moon-fill";
const darkIcon = "bi-brightness-high-fill";

const navbarScrollYMax = 150;

// Sayfanın tamamen hazır hale gelmesini bekle.
// HTML, CSS ve javascript dosyaları indirilip işlenmeli ve sayfa son haline gelmeli.
window.addEventListener("load", () => {
  document.querySelector('.loading-screen').style.display = 'none';
  document.body.classList.remove("overflow-hidden");
});

// HTML yüklendiğinde tercihlere göre still ayarlamalarını yap.
document.addEventListener("DOMContentLoaded", () => {
  const htmlElement = document.documentElement;
  const navbar = document.getElementById("navbar");
  const footerLogo = document.querySelector(".footer-logo");
  const navbarLogos = [...document.getElementsByClassName("navbar-logo")];
  const themeIcons = [...document.getElementsByClassName("theme-icon")];

  // Temayı localStorage'dan al, yoksa varsayılan olarak light tema kullan.
  const storedTheme = localStorage.getItem("theme") || "light";
  htmlElement.setAttribute("data-bs-theme", storedTheme);

  // navbar sınıfı set et.
  navbar.classList.add("navbar-no-bg");

  // Navbar logolarını başlangıç için beyaz yap.
  navbarLogos.forEach((logo) => logo.src = whiteHorizontalLogo);

  // Footer logosunu set et
  footerLogo.src = storedTheme === "light" ? blackVerticalLogo : whiteVerticalLogo;

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
        footerLogo.src = whiteVerticalLogo;

        // Scroll yapılmışsa ve gerçek navbar gözüküyorsa navbar logolarını güncelle.
        if (window.scrollY > navbarScrollYMax) {
          navbarLogos.forEach((logo) => logo.src = whiteHorizontalLogo);
        }

      } else {
        // İkonun class'ını güncelle.
        icon.classList.remove(darkIcon);
        icon.classList.add(lightIcon);

        // Footer'ın logosunu güncelle.
        footerLogo.src = blackVerticalLogo;

        // Scroll yapılmışsa ve gerçek navbar gözüküyorsa navbar logolarını güncelle.
        if (window.scrollY > navbarScrollYMax) {
          navbarLogos.forEach((logo) => logo.src = blackHorizontalLogo);
        }
      }
    });
  });

  // Scroll olayını dinle
  let hasScrolledDown = false; // Aşağı kaydırıldığını izlemek için bir değişken
  let hasScrolledUp = false; // Yukarı kaydırıldığını izlemek için bir değişken
  window.addEventListener("scroll", () => {
    if (window.scrollY > navbarScrollYMax && !hasScrolledDown) {
      hasScrolledDown = true;
      hasScrolledUp = false;
      const currentTheme = htmlElement.getAttribute("data-bs-theme");

      navbar.classList.remove("navbar-no-bg");
      navbar.classList.add("bg-secondary-subtle");

      if (currentTheme === "dark")
        navbarLogos.forEach((logo) => logo.src = whiteHorizontalLogo);
      else
        navbarLogos.forEach((logo) => logo.src = blackHorizontalLogo);
    }
    else if (window.scrollY <= navbarScrollYMax && !hasScrolledUp) {
      hasScrolledUp = true;
      hasScrolledDown = false;

      navbar.classList.remove("bg-secondary-subtle");
      navbar.classList.add("navbar-no-bg");
      navbarLogos.forEach((logo) => logo.src = whiteHorizontalLogo);
    }
  });
});
