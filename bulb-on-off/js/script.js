const bulbImgEl = document.querySelectorAll(".bulb-img");
const btnEl = document.querySelector(".btn");
const btnTextEl = document.querySelectorAll(".btn-text");

btnEl.addEventListener("click", () => {
  bulbImgEl.forEach((el) => el.classList.toggle("active"));
  btnTextEl.forEach((el) => el.classList.toggle("active"));
});
