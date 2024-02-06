document.querySelector(".close").style.display = 'none';
document.body.addEventListener("click", (event) => {
  const navbar = document.querySelector(".navbar");
  const ham = document.querySelector(".ham");
  const isOpen = !navbar.classList.contains("hide_nav");

  if (isOpen && !ham.contains(event.target) && !navbar.contains(event.target)) {
    navbar.classList.add("hide_nav");

    setTimeout(() => {
      document.querySelector(".open").style.display = "inline";
      document.querySelector(".close").style.display = "none";
    });
  }
});
document.querySelector('.ham').addEventListener("click", () => {
   document.querySelector('.navbar').classList.toggle('hide_nav'); // if it contain hide_nav remove, else add it.
   if (document.querySelector('.navbar').classList.contains('hide_nav')){
     setTimeout(() => {
        document.querySelector(".open").style.display = "inline";
     }, 300); //we are taking 3s for transition
     document.querySelector(".close").style.display = "none";
   }
   else {
      document.querySelector(".open").style.display = "none";
      setTimeout(() => {
         document.querySelector(".close").style.display = "inline";
      }, 300);
   }
})
const toggleMode = document.getElementById("toggle-mode");
const body = document.body;

toggleMode.addEventListener("change", () => {
  if (toggleMode.checked) {
    body.classList.add("dark-mode");
  }
  else {
    body.classList.remove("dark-mode");
  }
});