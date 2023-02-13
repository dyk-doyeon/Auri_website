'use strict';

(() => {
  // Landing Page Logo Animation
  const logoAnimation = document.querySelector(".cube__poly__before");

  logoAnimation.addEventListener("click", (event) => {
    let afterLogo = document.querySelector(".cube__poly__after"),
        beforeLogo = document.querySelector(".cube__poly__before"),
        textShowLeft = document.querySelector(".cube__text__left"),
        textShowRight = document.querySelector(".cube__text__right");

    afterLogo.classList.add("showUp");
    textShowLeft.classList.add("showUp");
    textShowRight.classList.add("showUp");
    beforeLogo.classList.add("hidden");

    setTimeout(function(){
      afterLogo.classList.remove("showUp");
      textShowLeft.classList.remove("showUp");
      textShowRight.classList.remove("showUp");
      beforeLogo.classList.remove("hidden");
    }, 8000);
  })


})()