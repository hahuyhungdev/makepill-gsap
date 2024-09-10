// NOW LETS ADD ANIMATION TO OUR CURSOR

function cursor() {
  let cursor = document.querySelector(".cursor");
  let body = document.querySelector("body");

  // NOW WE ARE GOING TO ADD AN EVENT LISTER ON OUR MOUSE

  body.addEventListener("mousemove", (e) => {
    gsap.to(cursor, {
      x: e.x + "px",
      y: e.y + "px",
    });
  });
}
cursor();

document.querySelector("main").style.display = "none";
function loadMainContent() {
  return new Promise((resolve) => {
    document.querySelector("main").style.display = "block";
    resolve();
  });
}

function runAnimations() {
  section1();
  // section2(),
  // section3(),
  section4();
  section5();
  section7();
}

document.getElementById("introVideo").addEventListener("ended", function () {
  this.style.display = "none";
  document.querySelector("main").style.display = "block";
  runAnimations();
});
// ===============SECTION1 ANIMATION===========

function section1() {
  let cursor = document.querySelector(".cursor");
  let bodySection = document.querySelector(".section1");

  bodySection.addEventListener("mouseenter", () => {
    gsap.to(cursor, {
      background: "white",
      duration: 0.1,
    });
  });
  let tl = gsap.timeline();
  tl.from(".header", {
    y: -50,
    opacity: 0,
    duration: 1,
  });

  tl.from(".text-content h1, .text-content p", {
    y: 100,
    opacity: 0,
    duration: 0.8,
  });
}

// =======================SECTION2 ANIMATIONS==================

function section2() {
  const sectionTwo = document.querySelector(".section2");
  const cursor = document.querySelector(".cursor");
  const video = sectionTwo.querySelector("video");

  function updateCursor(e) {
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.2,
      ease: "power3.out",
    });
  }

  function toggleMute() {
    console.log("toggleMute");
    video.muted = !video.muted;
    updateCursorStyle();
  }

  function updateCursorStyle() {
    if (sectionTwo.matches(":hover")) {
      cursor.style.width = "100px";
      cursor.style.height = "100px";
      cursor.style.backgroundColor = "white";
      cursor.innerHTML = `<i class="fa-solid ${
        video.muted ? "fa-volume-xmark" : "fa-volume-high"
      }" style="font-size: 25px; color: black;"></i>`;
    } else {
      cursor.style.width = "18px";
      cursor.style.height = "18px";
      cursor.style.backgroundColor = "white";
      cursor.innerHTML = "";
    }
  }

  sectionTwo.addEventListener("mouseenter", updateCursorStyle);
  sectionTwo.addEventListener("mouseleave", updateCursorStyle);
  document.addEventListener("mousemove", updateCursor);

  sectionTwo.addEventListener("click", (e) => {
    console.log("click");
    toggleMute();
  });

  updateCursorStyle();
}

// =================SECTION3 ANIMATION==============
function section3() {
  let sectionThree = document.querySelector(".section3");
  let leftVideo = document.querySelector(".section3 .left video");
  let rightText = document.querySelectorAll(
    ".section3 .right h1, .section3 .right h5"
  );

  gsap.from(rightText, {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.2,
    scrollTrigger: {
      trigger: sectionThree,
      start: "top 30%",
      end: "bottom 20%",
      toggleActions: "play none none reverse",
    },
  });

  // Animation cho video bên trái
  gsap.from(leftVideo, {
    scale: 0.8, // Bắt đầu từ kích thước nhỏ hơn
    opacity: 0,
    duration: 1.5,
    scrollTrigger: {
      trigger: sectionThree,
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse",
    },
  });
}

// =======================SECTION4 ANIMATIONS=============

function section4() {
  let sectionFour = document.querySelector(".section4");
  let cursor = document.querySelector(".cursor");
  let services = document.querySelector(".section4 .services");
  let serviceText = document.querySelector(".service-text");
  let isHovering = false;
  let tween;

  sectionFour.addEventListener("mouseenter", () => {
    gsap.to(cursor, {
      background: "black",
      duration: 0.1,
    });
  });

  services.addEventListener("mouseenter", () => {
    isHovering = true;
    services.style.cursor = "pointer";
    gsap.to(cursor, {
      scale: 1,
      opacity: 1,
      duration: 0.3,
      width: services.offsetWidth,
      height: services.offsetHeight,
      background: "black",
      ease: "power2.out",
    });
    services.style.backgroundColor = "white";
    services.style.borderColor = "white";
    gsap.to(serviceText, {
      color: "white",
      duration: 0.3,
      ease: "power2.out",
    });
    serviceText.style.zIndex = 99;
  });

  services.addEventListener("mousemove", (e) => {
    if (isHovering) {
      let rect = services.getBoundingClientRect();

      let x = e.clientX - (rect.left + rect.width / 2);
      let y = e.clientY - (rect.top + rect.height / 2);

      gsap.to(serviceText, {
        x: x * 0.5,
        y: y * 0.5,
        duration: 0.05,
        ease: "power1.out",
      });
    }
  });
  services.addEventListener("mouseleave", (e) => {
    isHovering = false;
    if (tween) tween.kill();
    tween = gsap.to(cursor, {
      scale: 0.1,
      opacity: 1,
      duration: 0.6,
      ease: "power3.out",
    });
    gsap.to(serviceText, {
      x: 0,
      y: 0,
      color: "black", // Trả lại màu chữ ban đầu
      duration: 0.5,
      ease: "power3.out",
    });
    services.style.borderColor = "#ccc";
    services.style.backgroundColor = "transparent"; // Trả lại màu nền ban đầu
  });
  // FOR CHANGING TO OUR CURSOR COLOR TO WHITE WHEN BACKGROUND WILL TURN ITO BLACK

  sectionFour.addEventListener("mouseenter", () => {
    gsap.to(cursor, {
      background: "white",
      scrollTrigger: {
        trigger: ".section4 .four .moving-text",
        start: "bottom center",
        end: "bottom center",
        scrub: 0.1,
      },
    });
  });

  // =======project======
  function initProjectAnimations() {
    let parentEl = document.querySelector(".bg");
    let childEl = document.querySelectorAll(".first-project .first");
    let videos = parentEl.querySelectorAll(".bg video");
    // console.log(parentEl, childEl, videos);
    // Hide all videos initially
    gsap.set(videos[0], { display: "block", opacity: 1 });

    childEl.forEach((item, index) => {
      let video = videos[index];

      // Create a timeline for each project
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: "top center",
          end: "bottom center",
          scrub: 1,

          onEnter: () => showVideo(video),
          onLeave: () => hideVideo(video),
          onEnterBack: () => showVideo(video),
          onLeaveBack: () => hideVideo(video),
        },
      });

      // Add animations to the timeline
      tl.from(item, {
        opacity: 0,
        y: 50,
        duration: 0.5,
      });

      // Animate project details
      tl.from(item.querySelector("h1"), { opacity: 0, y: 20, duration: 0.3 });
      tl.from(item.querySelectorAll(".about h4"), {
        opacity: 0,
        y: 10,
        stagger: 0.1,
        duration: 0.3,
      });
    });

    function showVideo(video) {
      gsap.to(video, { display: "block", opacity: 1, duration: 0.5 });
    }

    function hideVideo(video) {
      gsap.to(video, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          video.style.display = "none";
        },
      });
    }

    // Cursor animation (modified to work with scroll instead of hover)
    let cursor = document.querySelector(".cursor"); // Assuming you have a cursor element

    ScrollTrigger.create({
      trigger: ".projects",
      start: "top center",
      end: "bottom center",
      onEnter: () => animateCursor(true),
      onLeave: () => animateCursor(false),
      onEnterBack: () => animateCursor(true),
      onLeaveBack: () => animateCursor(false),
    });

    function animateCursor(enlarge) {
      if (enlarge) {
        gsap.to(cursor, {
          height: "100px",
          width: "100px",
          duration: 0.3,
          innerHTML: "<p>See Project</p>",
          fontSize: "15px",
          margin: "20px",
        });
      } else {
        gsap.to(cursor, {
          height: "18px",
          width: "18px",
          duration: 0.3,
          innerHTML: "",
          margin: 0,
        });
      }
    }
  }
  // Call the function to initialize animations
  initProjectAnimations();
}

// ===========================SECTION5 ANMATIONS============

function section5() {
  let sectionFive = document.querySelector(".section5");
  let cursor = document.querySelector(".cursor");
  let videoRight = document.querySelector(".section5 .five .right video");

  // FOR CHANGING OUR CURSOR COLOR TO BLACK

  sectionFive.addEventListener("mouseenter", () => {
    gsap.to(cursor, {
      background: "#0f0f0f",
      duration: 0.1,
    });
  });

  gsap.from(".section5 .five .left h1, .section5 .five .left h5", {
    y: 100,
    opacity: 0,
    stagger: 1,
    duration: 3,

    scrollTrigger: {
      trigger: ".section5 .five",
      start: "top 60%",
      end: "top 30%",
      scrub: 1,
    },
  });

  gsap.from(videoRight, {
    opacity: 0,
    y: 100,
    duration: 1,
    stagger: 1,
    scrollTrigger: {
      trigger: sectionFive,
      start: "top 60%",
      end: "top 30%",
      scrub: 1,
    },
  });
}

// =========================SECTION7 ANIMATIONS-====================

function section7() {
  let cursor = document.querySelector(".cursor");
  let body = document.querySelector("body");
  let sectionSeven = document.querySelector(".section7");

  gsap.to(body, {
    background: "#0f0f0f",
    color: "white",
    scrollTrigger: {
      trigger: ".section6 .right",
      start: "bottom 60%",
      end: "bottom 40%",
      scrub: 1,
    },
  });

  // LET CHANGE OUR CURSOR TO WHITE WHEN BACKGROUND IS BLACK

  sectionSeven.addEventListener("mouseenter", () => {
    gsap.to(cursor, {
      background: "white",
      duration: 0.1,
      scrollTrigger: {
        trigger: ".section6 .right",
        start: "bottom 60%",
        end: "bottom 40%",
        scrub: 1,
      },
    });
  });

  // LET CHANGE OUR CURSOR TO balc WHEN BACKGROUND IS white
  sectionSeven.addEventListener("mouseleave", () => {
    gsap.to(cursor, {
      background: "black",
      duration: 0.1,
      scrollTrigger: {
        trigger: ".section6 .right",
        start: "bottom 60%",
        end: "bottom 40%",
        scrub: 1,
      },
    });
  });
}
