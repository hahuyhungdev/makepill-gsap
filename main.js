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

// ===============SECTION1 ANIMATION===========

function section1() {
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

document.querySelector("main").style.display = "none";
document.getElementById("introVideo").addEventListener("ended", function () {
  // Ẩn video intro
  document.getElementById("introVideo").style.display = "none";

  // Hiển thị toàn bộ <main> chứa các section
  document.querySelector("main").style.display = "block";

  // Chạy animation cho section1
  section1();
});

// =======================SECTION2 ANIMATIONS==================

function section2() {
  let sectionTwo = document.querySelector(".section2");
  let cursor = document.querySelector(".cursor");
  let body = document.querySelector("body");

  // NOW WE WANT TO EXCUTE THIS CODE WHENEVER OUR MOUSE ENTER IN OUR SECTION2

  sectionTwo.addEventListener("mouseenter", () => {
    gsap.to(cursor, {
      height: "100px",
      width: "100px",
      innerHTML: "<i class='fa-solid fa-volume-high'></i>",
      fontSize: "25px",
      color: "black",
      margin: "20px",
      background: "white",
    });

    // AND WE WANT OUR BODY COLOR TO CHANGE TO THIS

    gsap.to(body, {
      background: "#0f0f0f",
      color: "white",
    });
  });

  // NOW WE WANT TO EXCUTE THIS CODE WHENEVER OUR MOUSE LEAVE IN OUR SECTION2

  sectionTwo.addEventListener("mouseleave", () => {
    gsap.to(cursor, {
      height: "18px",
      width: "18px",
      margin: 0,
      innerHTML: "",
    });

    // AND WE WANT OUR BODY COLOR TO CHANGE TO THIS

    gsap.to(body, {
      background: "white",
      color: "#0f0f0f",
    });
  });
}
section2();

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

section3();

// =======================SECTION4 ANIMATIONS=============

function section4() {
  let sectionFour = document.querySelector(".section4");
  let cursor = document.querySelector(".cursor");

  sectionFour.addEventListener("mouseenter", () => {
    cursor.style.background = "#0f0f0f";
  });

  gsap.to(sectionFour, {
    background: "#0f0f0f",
    color: "white",

    scrollTrigger: {
      trigger: ".section4 .four .moving-text",
      start: "bottom center",
      end: "botttom center",
      scrub: 2,
    },
  });

  gsap.to(".services", {
    color: "white",
    scrollTrigger: {
      trigger: ".section4 .four .moving-text",
      start: "bottom center",
      end: "botttom center",
      scrub: 2,
    },
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
section4();

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
section5();

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
section7();
