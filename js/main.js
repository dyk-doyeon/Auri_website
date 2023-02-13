'use strict';

(() => {

  // Make navbar transparent when it is on the top
  const navbar = document.querySelector("#navbar"),
  navbarHeight = navbar.getBoundingClientRect().height;

  document.addEventListener('scroll', () => {
  if(window.scrollY > navbarHeight) {
  navbar.classList.add('navbar--dark');
  } else {
  navbar.classList.remove('navbar--dark');
  }
  });

  // Handle scrolling when tapping on the navbar menu
  const navbarMenu = document.querySelector('.navbar__menu');

  navbarMenu.addEventListener("click", (event) => {
  let target = event.target,
  link = target.dataset.link;
  if(link == null) {
  return;
  }
  navbarMenu.classList.remove('open');
  scrollIntoView(link);
  });

  // Navbar toggle button for small screen
  const navbarToggleBtn = document.querySelector(".navbar__toggle-btn");
  navbarToggleBtn.addEventListener("click", () => {
  navbarMenu.classList.toggle("open");
  });

  // Make home slowly fade to transparent as the window scrolls down
  const home = document.querySelector(".home__container"),
  homeHeight = home.getBoundingClientRect().height;

  document.addEventListener("scroll", () => {
  home.style.opacity = 2 - window.scrollY / homeHeight;
  });

  // Show "arrow up" button when scrolling down
  const arrowUp = document.querySelector(".arrow-up");

  document.addEventListener("scroll", () => {
  if(window.scrollY > homeHeight) {
  arrowUp.classList.add("visible");
  } else {
  arrowUp.classList.remove("visible");
  }
  });

  // Handle click on the "arrow up" button
  arrowUp.addEventListener("click", () => {
  scrollIntoView("#home");
  });

  // navbar active

  const sectionIds = [
    '#home',
    '#about',
    '#skills',
  ];

  const sections = sectionIds.map((id) => document.querySelector(id));
  const navItems = sectionIds.map((id) =>
    document.querySelector(`[data-link="${id}"]`)
  );

  let selectedNavIndex = 0;
  let selectedNavItem = navItems[0];
  function selectNavItem(selected) {
    selectedNavItem.classList.remove('active');
    selectedNavItem = selected;
    selectedNavItem.classList.add('active');
  };

  function scrollIntoView(selector) {
    let scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({ behavior: "smooth" });
    selectNavItem(navItems[sectionIds.indexOf(selector)]);
    };

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3,
  };

  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting && entry.intersectionRatio > 0) {
        console.log('y');
        const index = sectionIds.indexOf(`#${entry.target.id}`);
        if (entry.boundingClientRect.y < 0) {
          selectedNavIndex = index + 1;
        } else {
          selectedNavIndex = index - 1;
        }
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  sections.forEach((section) => observer.observe(section));

  window.addEventListener('wheel', () => {
    if (window.scrollY === 0) {
      selectedNavIndex = 0;
    } else if (
      window.scrollY + window.innerHeight ===
      document.body.clientHeight
    ) {
      selectedNavIndex = navItems.length - 1;
    }
    selectNavItem(navItems[selectedNavIndex]);
  });

})()