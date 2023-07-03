// Start writing JavaScript here!

// ************* REFACTORED CODE HERE *********************

const carousel = document.querySelector(".carousel");
const prevButton = createPrevButton();
// Insert previous button in desired place
carousel.insertBefore(prevButton, carousel.children[0]);
// const nextButton = carousel.querySelector(".btn-2");
const nextButton = createNextButton();
// Insert previous button in desired place
carousel.appendChild(nextButton);
const contents = carousel.querySelector(".carousel__contents");
const slides = [...contents.children];
const dotCont = createDots(slides);
const allDots = [...dotCont.children];
// Adds dots into the DOM
carousel.appendChild(dotCont);

// Arrow functions are not hiosted(declared at top) automatically(we have to manually), so we need to use function Keyword to Auto-Hoist them.
function createDots(slides) {
  //create parent container for dots
  const dotCont = document.createElement("div");
  dotCont.classList.add("carousel__dots");
  slides.forEach((slide) => {
    //create 3 children i.e dots.
    const dot = document.createElement("button");
    dot.classList.add("carousel__dot");

    //add .is-selected class to selected dot
    if (slide.classList.contains("is-selected")) {
      dot.classList.add("is-selected");
    }
    //add all dots to dotCont
    dotCont.appendChild(dot);
  });
  return dotCont;
}

function createPrevButton() {
  const prevButton = document.createElement("button");
  prevButton.innerHTML = `
  <svg id="left" viewBox="0 0 54 69.007">
      <path d="M47 0L3.44 34.502 47 69.007z" />
  </svg>`;
  prevButton.classList.add("carousel__button");
  prevButton.classList.add("btn-1");
  prevButton.setAttribute("hidden", "true");
  return prevButton;
}

function createNextButton() {
  const nextButton = document.createElement("button");
  nextButton.innerHTML = `
  <svg viewBox="0 0 54 69.007">
    <path d="M5-.121l43.56 34.502L5 68.886z" />
  </svg>`;
  nextButton.classList.add("carousel__button");
  nextButton.classList.add("btn-2");
  return nextButton;
}

const setSlidePositions = () => {
  const slideWidth = slides[0].getBoundingClientRect().width;
  slides.forEach((slide, index) => {
    slide.style.left = slideWidth * index + "px";
  });
};

setSlidePositions();

const switchSlide = (presSlideIndex, targetSlideIndex) => {
  const presSlide = slides[presSlideIndex];
  const targetSlide = slides[targetSlideIndex];

  const nextleft = getComputedStyle(targetSlide).left;
  contents.style.transform = `translateX(-${nextleft})`;
  presSlide.classList.remove("is-selected");
  targetSlide.classList.add("is-selected");
};

const highlightDot = (presSlideIndex, targetSlideIndex) => {
  const presDot = allDots[presSlideIndex];
  const targetDot = allDots[targetSlideIndex];
  presDot.classList.remove("is-selected");
  targetDot.classList.add("is-selected");
};

const showHideArrowButtons = (targetSlideIndex) => {
  if (targetSlideIndex === 0) {
    prevButton.setAttribute("hidden", true);
    nextButton.removeAttribute("hidden");
  } else if (targetSlideIndex === allDots.length - 1) {
    nextButton.setAttribute("hidden", true);
    prevButton.removeAttribute("hidden");
  } else {
    nextButton.removeAttribute("hidden");
    prevButton.removeAttribute("hidden");
  }
};

const getCurrentSlideIndex = (_) => {
  const presSlide = contents.querySelector(".is-selected");
  const presSlideIndex = slides.findIndex((slide) => slide === presSlide);
  return presSlideIndex;
};

nextButton.addEventListener("click", (e) => {
  const presSlideIndex = getCurrentSlideIndex();
  const nextSlideIndex = presSlideIndex + 1;
  switchSlide(presSlideIndex, nextSlideIndex);
  showHideArrowButtons(nextSlideIndex);
  highlightDot(presSlideIndex, nextSlideIndex);
});

prevButton.addEventListener("click", (e) => {
  const presSlideIndex = getCurrentSlideIndex();
  const prevSlideIndex = presSlideIndex - 1;
  switchSlide(presSlideIndex, prevSlideIndex);
  showHideArrowButtons(prevSlideIndex);
  highlightDot(presSlideIndex, prevSlideIndex);
});

dotCont.addEventListener("click", (e) => {
  const dot = e.target.closest("button");
  if (!dot) return;
  const presSlideIndex = getCurrentSlideIndex();
  const targetSlideIndex = allDots.findIndex((s) => s === dot);
  switchSlide(presSlideIndex, targetSlideIndex);
  highlightDot(presSlideIndex, targetSlideIndex);
  showHideArrowButtons(targetSlideIndex);
});

// *****************Old + Refactored code mixed and explained below :  *********************

// Arrow functions are not hiosted(declared at top) automatically(we have to manually), so we need to use function Keyword to Auto-Hoist them.

// const carousel = document.querySelector(".carousel");
// const prevButton = carousel.querySelector(".btn-1");
// const nextButton = carousel.querySelector(".btn-2");
// const contents = carousel.querySelector(".carousel__contents");
// // const dotCont = carousel.querySelector(".carousel__dots");
// // const allDots = [...dotCont.children];
// const slides = [...contents.children];
// const dotCont = createDots(slides);
// const allDots = [...dotCont.children];
// // Adds dots into the DOM
// carousel.appendChild(dotCont);

// //making slides/carousel responsive by setting grid column to 80vw and then getting the left of first slide from user's browser using javascript. Using that width, we set width of all other slides. (imperative code)
// // const slideWidth = slides[0].getBoundingClientRect().width;
// // // slides[0].style.left = slideWidth * 0 + "px";
// // // slides[1].style.left = slideWidth * 1 + "px";
// // // slides[2].style.left = slideWidth * 2 + "px";
// // slides.forEach((slide, index) => {
// //   slide.style.left = slideWidth * index + "px";
// // });
// //Refactoring above imperative code to be declarative.
// const setSlidePositions = () => {
//   const slideWidth = slides[0].getBoundingClientRect().width;
//   slides.forEach((slide, index) => {
//     slide.style.left = slideWidth * index + "px";
//   });
// };

// setSlidePositions();

// Arrow functions are not hiosted(declared at top) automatically(we have to manually), so we need to use function Keyword to Auto-Hoist them.
// function createDots(slides) {
//   //create parent container for dots
//   const dotCont = document.createElement("div");
//   dotCont.classList.add("carousel__dots");
//   slides.forEach(slide => {
//     //create 3 children i.e dots.
//     const dot = document.createElement("button");
//     dot.classList.add("carousel__dot");

//     //add .is-selected class to selected dot
//     if(slide.classList.contains("is-selected")) {
//       dot.classList.add("is-selected");
//     }
//     //add all dots to dotCont
//     dotCont.appendChild(dot);
//   })
//   return dotCont;
// }

// //switch slides
// const switchSlide = (presSlideIndex, targetSlideIndex) => {
//   const presSlide = slides[presSlideIndex];
//   const targetSlide = slides[targetSlideIndex];

//   // finding nextleft of target slide (destination)
//   const nextleft = getComputedStyle(targetSlide).left;
//   //shows next slide
//   contents.style.transform = `translateX(-${nextleft})`;
//   presSlide.classList.remove("is-selected");
//   targetSlide.classList.add("is-selected");

//   // //shows prev slide
//   // contents.style.transform = `translateX(-${prevleft})`;
//   // presSlide.classList.remove("is-selected");
//   // prevSlide.classList.add("is-selected");
// };

// //Highlight dots
// const highlightDot = (presSlideIndex, targetSlideIndex) => {
//   const presDot = allDots[presSlideIndex];
//   const targetDot = allDots[targetSlideIndex];
//   // Highlight next dot
//   // const presDot = dotCont.querySelector(".is-selected");
//   presDot.classList.remove("is-selected");
//   // const nextDot = presDot.nextElementSibling;
//   targetDot.classList.add("is-selected");

//   //   // Highlight previous dot
//   // // const presDot = dotCont.querySelector(".is-selected");
//   // presDot.classList.remove("is-selected");
//   // // const prevDot = presDot.previousElementSibling;
//   // prevDot.classList.add("is-selected");
// };

//   // Show / hide buttons
//   const showHideArrowButtons = targetSlideIndex => {
//     if (targetSlideIndex === 0) {
//       prevButton.setAttribute("hidden", true);
//       nextButton.removeAttribute("hidden");
//     } else if (targetSlideIndex === allDots.length - 1) {
//       nextButton.setAttribute("hidden", true);
//       prevButton.removeAttribute("hidden");
//     } else {
//       nextButton.removeAttribute("hidden");
//       prevButton.removeAttribute("hidden");
//     }
//   }

//   const getCurrentSlideIndex = _ => {
//     const presSlide = contents.querySelector(".is-selected");
//     const presSlideIndex = slides.findIndex(slide => slide === presSlide);
//     return presSlideIndex;
//   }

// //Working on NEXT button
// nextButton.addEventListener("click", (e) => {
//   //determining present slide to get next one on screen by styling its left property.
//   // const presSlide = contents.querySelector(".is-selected");
//   // const presSlideIndex = slides.findIndex(slide => slide === presSlide);
//   // Refactoring above code : presSlideIndex will be finded by getCurrentSlideIndex Function
//   const presSlideIndex = getCurrentSlideIndex();
//   const nextSlideIndex = presSlideIndex + 1;
//   // Refactored above lines : slide will be finded using indexes inside switchSlides function
//   // const nextleft = getComputedStyle(nextSlide).left;

//   // // contents.style.left = "-" + nextleft;
//   // // To animate, we are going to replace above line with folloeing:
//   //     // Shows next slide
//   // contents.style.transform = `translateX(-${nextleft})`;
//   // //in order to move to 3rd or every next slide we need to add .is-selected class on current slide and remove it from previous one so that we can move to next one by getting its next elemnet etc - .
//   // presSlide.classList.remove("is-selected");
//   // nextSlide.classList.add("is-selected");
//   // =>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Using declarative code
//   // switchSlide(presSlide, nextSlide);
//   switchSlide(presSlideIndex,nextSlideIndex);

//   //to show previous button when any previous slide is available to see
//   // Shows previous button
//   // prevButton.removeAttribute("hidden");

//   // //if there is no next slide available, we need to hide next button
//   // // Hides next button
//   // if (!nextSlide.nextElementSibling) {
//   //   nextButton.setAttribute("hidden", true);
//   // }
//   // Refactoring above code to be declarative
//   // const nextSlide = presSlide.nextElementSibling;
//   // const nextSlideIndex = slides.findIndex(slide => slide === nextSlide);
//   // Refactoring above code to be declarative
//   showHideArrowButtons(nextSlideIndex);

//   // to get respective/next dot styled (using .is-selected class), when we click next button. (Highlight Dot)
//   // Highlight next dot
//   // const presDot = dotCont.querySelector(".is-selected");
//   // // presDot.classList.remove("is-selected");
//   // const nextDot = presDot.nextElementSibling;
//   // // nextDot.classList.add("is-selected");
//   // Refactored : presDot and nextDot is finded by highlightDot function inside itself.

//   //Replaced above imperative code with declarative
//   highlightDot(presSlideIndex, nextSlideIndex);
// });

// //Working on PREVIOUS button
// prevButton.addEventListener("click", (e) => {
//   //determining present slide to get next one on screen by styling its left property
//   // const presSlide = contents.querySelector(".is-selected");
//   // const presSlideIndex = slides.findIndex(slide => slide === presSlide);
//   // Refactoring above code : presSlideIndex will be finded by getCurrentSlideIndex Function
//   const presSlideIndex = getCurrentSlideIndex();
//   const prevSlideIndex = presSlideIndex - 1;
//   // Refactored above lines : slide will be finded using indexes inside switchSlides function
//   // const prevleft = getComputedStyle(prevSlide).left;

//   //     // Shows next slide
//   // contents.style.transform = `translateX(-${prevleft})`;
//   // //in order to move to 3rd or every next slide we need to add .is-selected class on current slide and remove it from previous one so that we can move to next one by getting its next elemnet etc.
//   // presSlide.classList.remove("is-selected");
//   // prevSlide.classList.add("is-selected");
//   // =>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Using declarative code
//   switchSlide(presSlideIndex,prevSlideIndex);

//   //to show previous button when any previous slide is available to see
//   // Shows next button
//   // nextButton.removeAttribute("hidden");

//   // //if there is no next slide available, we need to hide previous button
//   // // Hides next button
//   // if (!prevSlide.previousElementSibling) {
//   //   prevButton.setAttribute("hidden", true);
//   // }
//     // Refactoring above code to be declarative
//     showHideArrowButtons(prevSlideIndex);

//   // to get respective/next dot styled (using .is-selected class), when we click next button.
//   // Highlight previous dot
//   // const presDot = dotCont.querySelector(".is-selected");
//   // // presDot.classList.remove("is-selected");
//   // const prevDot = presDot.previousElementSibling;
//   // // prevDot.classList.add("is-selected");
//   // Refactored : presDot and nextDot is finded by highlightDot function inside itself.

//   //Replaced above imperative code with declarative
//   highlightDot(presSlideIndex, prevSlideIndex);
// });

// //working on DOTS

// //WITHOUT EVENT DELEGATION

// // allDots.forEach((btn) => {
// //   btn.addEventListener("click", (e) => {
// //     //variable to save clicked button index
// //     let btnIndex;
// //     //******forEach will work here like this***** */
// //     allDots.forEach((dot, index, allDots) => {
// //       if (allDots[index] === btn) {
// //         btnIndex = index;
// //       }
// //     });

// //     //for loop will also work for this in simple way
// //     // for(let i=0; i<dots.length; i++) {
// //     //   if(allDots[i]===btn) {
// //     //     btnIndex = i;
// //     //   }
// //     // }

// //     //pulling the slide on screen according to the clicked dot.
// //     const slideToShow = slides[btnIndex];
// //     const destination = getComputedStyle(slideToShow).left;
// //     contents.style.left = "-" + destination;

// //     //adding .is-selected class to present dot to apply css styles to it
// //     const presSlide = contents.querySelector(".is-selected");
// //     presSlide.classList.remove("is-selected");
// //     slideToShow.classList.add("is-selected");

// //     //removing .is-selected class from all dots and adding it only to current one
// //     allDots.forEach((dot) => {
// //       dot.classList.remove("is-selected");
// //     });
// //     btn.classList.add("is-selected");

// //     // Setting whether click on dots make right n left buttons change their state (appear/disappear);
// //     if (btnIndex === 0) {
// //       prevButton.setAttribute("hidden", true);
// //       nextButton.removeAttribute("hidden");
// //     } else if (btnIndex === allDots.length - 1) {
// //       nextButton.setAttribute("hidden", true);
// //       prevButton.removeAttribute("hidden");
// //     } else {
// //       nextButton.removeAttribute("hidden");
// //       prevButton.removeAttribute("hidden");
// //     }
// //   });
// // });

// //WITH EVENT DELEGATION

// dotCont.addEventListener("click", (e) => {
//   // const dot = e.target.matches('button');
//   const dot = e.target.closest("button");
//   if (!dot) return;
//   //variable to save clicked button index
//   // let btnIndex;
//   //******forEach will work here like this***** */
//   // allDots.forEach((dote, index, allDots) => {
//   //   if (allDots[index] === dot) {
//   //     btnIndex = index;
//   //   }
//   // });

//   // Instead of forEach(), using findIdex() here
//   //   Show slide
//   // let btnIndex = allDots.findIndex((d) => d === dot);
//   // // for loop will also work for this in simple way
//   // // for(let i=0; i<allDots.length; i++) {
//   // //   if(allDots[i]===dot) {
//   // //     btnIndex = i;
//   // //   }
//   // // }
//   // //pulling the slide on screen according to the clicked dot.
//   // const slideToShow = slides[btnIndex];
//   // const destination = getComputedStyle(slideToShow).left;
//   // contents.style.transform = `translateX(-${destination})`;

//   // //adding .is-selected class to present dot to apply css styles to it
//   // const presSlide = contents.querySelector(".is-selected");
//   // presSlide.classList.remove("is-selected");
//   // slideToShow.classList.add("is-selected");
//   // Refactoring above code
//   // const presSlide = contents.querySelector(".is-selected");
//   // // let btnIndex = allDots.findIndex((d) => d === dot);
//   // //Refactoring above code (*only name echanged)
//   // // let targetSlideIndex = allDots.findIndex((d) => d === dot);
//   // // Refactoring above code
//   // const presSlideIndex = slides.findIndex(s => s === presSlide);
//   // Refactoring above code : presSlideIndex will be finded by getCurrentSlideIndex Function
//   const presSlideIndex = getCurrentSlideIndex();
//   const targetSlideIndex = allDots.findIndex(s => s === dot);

//   // const slideToShow = slides[targetSlideIndex];
//   switchSlide(presSlideIndex, targetSlideIndex);

//   //removing .is-selected class from all dots and adding it only to current one
//   // Highlight dot
//   // allDots.forEach((dot) => {dot.classList.remove("is-selected")});
//   // dot.classList.add("is-selected");
//   // Refactoring above code to be declarative
//   // const currentDot = dotCont.querySelector('.is-selected');
//   // Refactored : presDot and nextDot is finded by highlightDot function inside itself.
//   highlightDot(presSlideIndex,targetSlideIndex);

//   // Setting whether click on dots make right n left buttons change their state (appear/disappear);
//   // Show / hide buttons
//   // if (btnIndex === 0) {
//   //   prevButton.setAttribute("hidden", true);
//   //   nextButton.removeAttribute("hidden");
//   // } else if (btnIndex === allDots.length - 1) {
//   //   nextButton.setAttribute("hidden", true);
//   //   prevButton.removeAttribute("hidden");
//   // } else {
//   //   nextButton.removeAttribute("hidden");
//   //   prevButton.removeAttribute("hidden");
//   // }
//   //Refactoring above code to be declarative
//   showHideArrowButtons(targetSlideIndex)
// });

// -------------------------------------------------------------------------------
