import "../styles/reset.scss";
import "../styles/styles.scss";
import Swiper, { Navigation } from "swiper";
import "swiper/swiper.min.css";
import { languages } from "./languages";
Swiper.use([Navigation]);

window.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".header__menu-button"),
    header = document.querySelector(".header"),
    vidoButton = document.querySelector(".video__info_btn"),
    videoTitle = document.querySelector(".video__info_title"),
    video = document.querySelector("#video"),
    lang = document.querySelector(".lang"),
    menuLink = document.querySelectorAll(".menu-link"),
    checkbox = document.querySelectorAll(".checkbox"),
    section = document.querySelectorAll(".section"),
    language = document.querySelectorAll(".language"),
    currentLang = document.querySelectorAll(".current-lang"),
    faq = document.querySelectorAll(".faq__item "),
    modal = document.querySelector(".modal"),
    overlay = document.querySelector(".overlay"),
    modalTitle = document.querySelector(".modal-version"),
    modalPrice = document.querySelector(".modal-total__price"),
    buyButton = document.querySelectorAll(".buy-button"),
    modalClose = document.querySelector(".modal-close");
  const checkboxes = {
    requirements: ["minimum", "normal"],
    versions: ["standard", "limited"],
  };
  const classes = {
    opened: "opened",
    open: "open",
    openLang: "open-lang",
    hidden: "hidden",
    active: "active",
  };
  const values = [
    {
      price: 19.99,
      title: "Standard Edition",
    },
    {
      price: 29.99,
      title: "Standard Edition",
    },
    {
      price: 35.99,
      title: "Deluxe Edition",
    },
  ];
  let isPlay = false;
  const openToggle = () => {
    header.classList.toggle(classes.open);
  };

  const openLang = () => {
    lang.childNodes[5].classList.toggle(classes.openLang);
  };

  const scrollToSection = (e) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute("href");
    if (!href && !href.startsWhith("#")) return;
    const section = href.slice(1);
    const top = document.getElementById(section)?.offsetTop || 0;
    window.scrollTo({
      top,
      behavior: "smooth",
    });
  };

  const getTimerValues = (diff) => ({
    seconds: Math.floor((diff / 1000) % 60),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
  });
  const startTimer = (date) => {
    const diff = new Date(date).getTime() - new Date().getTime();

    const values = getTimerValues(diff);
    Object.entries(values).forEach(([key, value]) => {
      const time = document.getElementById(key);
      time.innerHTML = value < 10 ? "0" + value : value;
    });
  };
  setInterval(() => {
    startTimer("September 1, 2023 00:00:00");
  }, 1000);

  const handleVodeo = ({ target }) => {
    videoTitle.classList.add(classes.hidden);
    const info = target.parentElement;
    isPlay = !isPlay;
    info.classList.toggle(classes.hidden, isPlay);
    target.innerText = isPlay ? "Pause" : "Play";
    isPlay ? video.play() : video.pause();
    video.addEventListener("click", () => {
      isPlay = !isPlay;
      isPlay ? video.play() : video.pause();
    });
  };

  const handleCheckBox = ({ currentTarget: { checked, name } }) => {
    const { active } = classes;

    const value = checkboxes[name][Number(checked)];
    const list = document.getElementById(value);

    const tabs = document.querySelectorAll(`[data-${name}]`);
    const siblings = list.parentElement.children;
    for (const item of siblings) item.classList.remove(active);
    for (const tab of tabs) {
      tab.classList.remove(active);
      tab.dataset[name] == value && tab.classList.add(active);
    }
    list.classList.add(active);
  };

  lang.addEventListener("click", openLang);

  menuButton.addEventListener("click", openToggle);

  menuLink.forEach((item) => {
    item.addEventListener("click", scrollToSection);
  });

  vidoButton.addEventListener("click", handleVodeo);

  checkbox.forEach((box) => {
    box.addEventListener("click", handleCheckBox);
  });

  const initSlider = () => {
    new Swiper(".swiper", {
      loop: true,
      slidesPerView: 3,
      spaceBetween: 20,
      initialSlide: 1,
      navigation: {
        prevEl: ".swiper-button-prev",
        nextEl: ".swiper-button-next",
      },
    });
  };
  initSlider();

  const toggleFaq = ({ currentTarget: target }) => {
    target.classList.toggle("opened");
  };
  faq.forEach((item) => item.addEventListener("click", toggleFaq));

  const handleScroll = () => {
    const { scrollY: y, innerHeight: h } = window;
    section.forEach((sec) => {
      if (y >= sec.offsetTop - h / 1.6) sec.classList.remove(classes.hidden);
    });
  };

  window.addEventListener("scroll", handleScroll);

  const setText = () => {
    const lang = localStorage.getItem("lang") || "en";
    currentLang.forEach(
      (item) => (item.innerHTML = localStorage.getItem("lang") || "en")
    );
    const content = languages[lang];

    Object.entries(content).forEach(([key, value]) => {
      const items = document.querySelectorAll(`[data-text=${key}]`);
      items.forEach((item) => (item.innerHTML = value));
    });
  };
  setText();

  const handleLeng = ({ target }) => {
    const { lang } = target.dataset;
    if (!lang) return;
    localStorage.setItem("lang", lang);
    setText();
  };
  language.forEach((lang) => {
    lang.addEventListener("click", handleLeng);
  });

  const handleBuyButton = ({ currentTarget: target }) => {
    const { value } = target.dataset;
    if (!value) return;
    const { price, title } = values[value];
    modalTitle.innerText = title;
    modalPrice.innerText = `${price}$`;
    modal.classList.add("opened");
    overlay.classList.add(classes.opened);
  };

  const closeModal = () => {
    modal.classList.remove(classes.opened);
    overlay.classList.remove(classes.opened);
  };

  modalClose.addEventListener("click", closeModal);
  buyButton.forEach((btn) => btn.addEventListener("click", handleBuyButton));
});
