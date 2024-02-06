const details = {
  name: null,
  message: null,
  date: null,
  identity: null,
  image: null,
  likes: 0,
};
const user_comm = document.querySelector(".usercomment");
const publish = document.querySelector("#publish");
const comm_s = document.querySelector(".comments0");
const userName = document.querySelector(".user");
document.addEventListener("DOMContentLoaded", () => {
  loadComments("comments0");
});

function loadComments() {
   const storedComments = JSON.parse(localStorage.getItem("comments0")) || [];
   comm_s.innerHTML = "";
   storedComments.forEach((comment) => {
      renderComment(comment);
   });
}

function renderComment(comment) {
  let published = `<div class="parents">
      <img src="${comment.image}">
      <div>
         <h1>${comment.name}</h1>
         <p>${comment.message}</p>
         <div class="likes" data-comment-id="${comment.date}">
         </div>
         <span class="date">${comment.date}</span>
      </div>
   </div>`;
  comm_s.innerHTML += published;
}

// ##################################
user_comm.addEventListener("input", () => {
   if (!user_comm.value) {
      publish.setAttribute("disabled", "disabled");
      publish.classList.remove("abled");
   }
   else {
      publish.removeAttribute("disabled");
      publish.classList.add("abled");
   }
});

function addComment0() {
   if (!user_comm.value) return;
   details.name = userName.value;
   if (details.name === "Anonymous") {
      details.identity = false;
   }
   else {
      details.identity = true;
   }
   // details.image = "userlogo.jpg";
   details.image = "userlogo.png";
   details.message = user_comm.value;
   details.date = new Date().toLocaleString();

   const storedComments = JSON.parse(localStorage.getItem("comments0")) || [];
   storedComments.push({ ...details });
   localStorage.setItem("comments0", JSON.stringify(storedComments));
   loadComments("comments0");
   user_comm.value = "";
}

publish.addEventListener("click", addComment0);

let likeCount0 = 0;
let likeImageSrc = "./unlike.png"; 

function likePost0() {
   const likeImage = document.getElementById("like");
   if (likeCount0 === 0) {
      likeCount0 = 1;
      likeImageSrc = "./heart.png"; 
   }
   else {
      likeCount0 = 0;
      likeImageSrc = "./unlike.png"; 
   }
   likeImage.src = likeImageSrc;
   localStorage.setItem("likeCount0", likeCount0.toString());
   localStorage.setItem("likeImageSrc", likeImageSrc);
   document.getElementById("like-count").innerText = likeCount0;

}

window.onload = function () {
   if (localStorage.getItem("likeCount0")) {
      likeCount0 = parseInt(localStorage.getItem("likeCount0"));
      likeImageSrc = localStorage.getItem("likeImageSrc");
      document.getElementById("like-count").innerText = likeCount0;
      document.getElementById("like").src = likeImageSrc;
   }
};

window.onbeforeunload = function () {
  localStorage.setItem("likeCount0", likeCount0.toString());
   localStorage.setItem("likeImageSrc", likeImageSrc);   
};

function sharePost() {
   if (navigator.share) {
      navigator
         .share({
         title: "Web Development Blog",
         text: "Check out this awesome web development blog!",
         url: window.location.href,
         })
         .then(() => console.log("Successful share"))
         .catch((error) => console.log("Error sharing:", error));
   }
}

var goToTopButton = document.getElementById("goToTopBtn");
window.onscroll = function () {
   if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      goToTopButton.style.display = "block";
   }
   else {
      goToTopButton.style.display = "none";
   }
};

goToTopButton.addEventListener("click", function () {
   document.body.scrollTop = 0; 
   document.documentElement.scrollTop = 0; 
});