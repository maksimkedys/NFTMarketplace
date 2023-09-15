$(function () {
  // Fixed Header

  $(window).on("scroll", function () {
    $(".header").toggleClass("header--scrolled", $(window).scrollTop() > 0);
  });

  // Accordion Menu

  $(window).on("resize load", function () {
    if ($(window).width() < 769) {
      $(".footer__title")
        .off("click")
        .on("click", function () {
          $(this).next().slideToggle();
          $(this).toggleClass("footer__title--active");
        });
    } else {
      $(".footer__title").off("click");
      $(".footer__list").removeAttr("style");
    }
  });

  // Timer NFT

  const timer = ({ hours, minutes, seconds, expire }) => {
    function getTimeRemaining(endtime) {
      const total = Date.parse(endtime) - Date.parse(new Date());
      let seconds = Math.floor((total / 1000) % 60);
      let minutes = Math.floor((total / 1000 / 60) % 60);
      let hours = Math.floor((total / (1000 * 60 * 60)) % 24);
      const days = Math.floor(total / (1000 * 60 * 60 * 24));

      if (days) {
        hours = hours + 24 * days;
      }

      return {
        total,
        days,
        hours,
        minutes,
        seconds,
      };
    }

    function updateClock(clock, endtime) {
      const hoursSpan = clock.querySelector(hours);
      const minutesSpan = clock.querySelector(minutes);
      const secondsSpan = clock.querySelector(seconds);

      function updateDisplay() {
        const t = getTimeRemaining(endtime);

        hoursSpan.innerHTML = t.hours < 10 ? "0" + t.hours : t.hours;
        minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
        secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);

        if (t.total <= 0) {
          clearInterval(timeinterval);
        }
      }

      updateDisplay();
      const timeinterval = setInterval(updateDisplay, 1000);
    }

    const clocks = document.querySelectorAll(expire);
    clocks.forEach((clock) => {
      const deadline = clock.getAttribute("data-time");
      updateClock(clock, deadline);
    });
  };

  timer({
    hours: ".hero__holder-hours",
    minutes: ".hero__holder-minutes",
    seconds: ".hero__holder-seconds",
    expire: ".hero__holder-time",
  });
  timer({
    hours: ".art-card__hours",
    minutes: ".art-card__minutes",
    seconds: ".art-card__seconds",
    expire: ".art-card__time",
  });
});

// Burger Menu

const burger = document.querySelector(".burger");
const menu = document.querySelector(".menu__list");

burger.addEventListener("click", function () {
  burger.classList.toggle("burger--active");
  menu.classList.toggle("menu__list--active");
});

// Modal Contacts

const scrollController = {
  scrollPosition: 0,
  disabledScroll() {
    scrollController.scrollPosition = window.scrollY;
    document.body.style.cssText = `
      overflow: hidden;
      position: fixed;
      top: -${scrollController.scrollPosition}px;
      left: 0;
      height: 100vh;
      width: 100vw;
      padding-right: ${window.innerWidth - document.body.offsetWidth}px
    `;
    document.documentElement.style.scrollBehavior = "unset";
  },
  enabledScroll() {
    document.body.style.cssText = "";
    window.scroll({ top: scrollController.scrollPosition });
    document.documentElement.style.scrollBehavior = "";
  },
};

const modalController = ({ modal, btnOpen, btnClose, time = 400 }) => {
  const buttonElems = document.querySelectorAll(btnOpen);
  const modalElem = document.querySelector(modal);

  modalElem.style.cssText = `
    display: flex;
    visibility: hidden;
    opacity: 0;
    transition: opacity ${time}ms ease-in-out;
  `;

  const closeModal = (event) => {
    const target = event.target;

    if (
      target === modalElem ||
      (btnClose && target.closest(btnClose)) ||
      event.code === "Escape"
    ) {
      modalElem.style.opacity = 0;

      setTimeout(() => {
        modalElem.style.visibility = "hidden";
        scrollController.enabledScroll();
      }, time);

      window.removeEventListener("keydown", closeModal);
    }
  };

  const openModal = (event) => {
    event.preventDefault();
    modalElem.style.visibility = "visible";
    modalElem.style.opacity = 1;
    window.addEventListener("keydown", closeModal);
    scrollController.disabledScroll();
  };

  buttonElems.forEach((btn) => {
    btn.addEventListener("click", openModal);
  });

  modalElem.addEventListener("click", closeModal);
};

modalController({
  modal: ".contact-popup",
  btnOpen: ".menu__contact",
  btnClose: ".contact-popup__close",
});

// Animation

gsap.registerPlugin(ScrollTrigger);

const tl = gsap.timeline();

tl.fromTo(
  ".menu__item",
  {
    y: -50,
    opacity: 0,
  },
  {
    y: 0,
    opacity: 1,
    stagger: 0.15,
  },
  0.6
)

  .fromTo(
    ".menu__contact",
    {
      y: -50,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
    },
    1
  )

  .fromTo(
    ".burger",
    {
      y: -50,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
    },
    0.8
  )

  .fromTo(
    ".hero__title",
    {
      x: -300,
      opacity: 0,
    },
    {
      x: 0,
      opacity: 1,
    },
    0.4
  )

  .fromTo(
    ".hero__desc",
    {
      x: -300,
      opacity: 0,
    },
    {
      x: 0,
      opacity: 1,
    },
    0.8
  )

  .fromTo(
    ".hero__buttons",
    {
      x: -300,
      opacity: 0,
    },
    {
      x: 0,
      opacity: 1,
    },
    1
  )

  .fromTo(
    ".hero__img",
    {
      x: 300,
      opacity: 0,
    },
    {
      x: 0,
      opacity: 1,
    },
    1
  )

  .fromTo(
    ".hero__holder",
    {
      scale: 0,
      opacity: 0,
    },
    {
      scale: 1,
      opacity: 1,
    },
    1.6
  )

  .fromTo(
    ".hero__item",
    {
      y: -50,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      stagger: 0.15,
    },
    1
  );

gsap.from(".arts__top", {
  scrollTrigger: {
    trigger: ".arts",
    start: "top center",
  },
  x: -300,
  opacity: 0,
  duration: 0.6,
});

gsap.from(".arts__item", {
  scrollTrigger: {
    trigger: ".arts",
    start: "top center",
  },
  opacity: 0,
  scale: 0,
  stagger: 0.3,
  duration: 0.4,
});

gsap.from(".create__title, .create__text", {
  scrollTrigger: {
    trigger: ".create",
    start: "top center",
  },
  x: -300,
  opacity: 0,
  duration: 1,
});

gsap.from(".create__btn.btn, .create__btn.more", {
  scrollTrigger: {
    trigger: ".create",
    start: "top center",
  },
  scale: 0,
  opacity: 0,
  duration: 1,
});

gsap.from(".create__images", {
  scrollTrigger: {
    trigger: ".create",
    start: "top center",
  },
  x: -100,
  opacity: 0,
  duration: 1,
});

gsap.from(".popular__top", {
  scrollTrigger: {
    trigger: ".popular",
    start: "top center",
  },
  x: -300,
  opacity: 0,
  duration: 0.6,
});

gsap.from(".popular__item", {
  scrollTrigger: {
    trigger: ".popular",
    start: "top center",
  },
  scale: 0,
  stagger: 0.3,
  opacity: 0,
  duration: 0.6,
});

gsap.from(".subscribe__title, .subscribe__text", {
  scrollTrigger: {
    trigger: ".subscribe",
    start: "top center",
  },
  x: -100,
  opacity: 0,
  duration: 1,
});

gsap.from(".subscribe__form", {
  scrollTrigger: {
    trigger: ".subscribe",
    start: "top center",
  },
  scale: 0,
  opacity: 0,
  duration: 1,
});

gsap.from(".subscribe__images", {
  scrollTrigger: {
    trigger: ".subscribe",
    start: "top center",
  },
  x: -100,
  opacity: 0,
  duration: 1,
});

gsap.from(".footer__text", {
  scrollTrigger: {
    trigger: ".footer",
    start: "top 80%",
  },
  x: -100,
  opacity: 0,
  duration: 1,
});

gsap.from(".footer__social-item", {
  scrollTrigger: {
    trigger: ".footer",
    start: "top 80%",
  },
  scale: 0,
  stagger: 0.15,
  opacity: 0,
  duration: 1,
});

gsap.from(".footer__item", {
  scrollTrigger: {
    trigger: ".footer",
    start: "top 80%",
  },
  scale: 0,
  stagger: 0.15,
  opacity: 0,
  duration: 1,
});

gsap.from(".footer__bottom", {
  scrollTrigger: {
    trigger: ".footer",
    start: "top 80%",
  },
  x: -50,
  opacity: 0,
  duration: 1,
});
