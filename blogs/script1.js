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
const comm_s = document.querySelector(".comments1");
const userName = document.querySelector(".user");
document.addEventListener("DOMContentLoaded", () => {
  loadComments("comments1");
});

function loadComments() {
  const storedComments = JSON.parse(localStorage.getItem("comments1")) || [];
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

function addComment1() {
  if (!user_comm.value) return;
  details.name = userName.value;
  if (details.name === "Anonymous") {
    details.identity = false;
  } else {
    details.identity = true;
  }
  // details.image = "userlogo.jpg";
  details.image = "userlogo.png";
  details.message = user_comm.value;
  details.date = new Date().toLocaleString();

  const storedComments = JSON.parse(localStorage.getItem("comments1")) || [];
  storedComments.push({ ...details });
  localStorage.setItem("comments1", JSON.stringify(storedComments));
  loadComments("comments1");
  user_comm.value = "";
}


publish.addEventListener("click", addComment1);

let likeCount1 = 0;
let likeImageSrc1 = "./unlike.png"; 


function likePost1() {
  const likeImage = document.getElementById("like");
  if (likeCount1 === 0) {
    likeCount1 = 1;
    likeImageSrc1 = "./heart.png";
  }
  else {
    likeCount1 = 0;
    likeImageSrc1 = "./unlike.png";
  }
  likeImage.src = likeImageSrc1;
  localStorage.setItem("likeCount1", likeCount1.toString());
  localStorage.setItem("likeImageSrc1", likeImageSrc1);
  document.getElementById("like-count").innerText = likeCount1;

}



window.onload = function () {
  if (localStorage.getItem("likeCount1")) {
    likeCount1 = parseInt(localStorage.getItem("likeCount1"));
    likeImageSrc1 = localStorage.getItem("likeImageSrc1");
    document.getElementById("like-count").innerText = likeCount1;
    document.getElementById("like").src = likeImageSrc1;

  }
};

window.onbeforeunload = function () {
  localStorage.setItem("likeCount1", likeCount1.toString());
  localStorage.setItem("likeImageSrc1", likeImageSrc1);
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

var top_go = document.getElementById("goToTopBtn");

window.onscroll = function () {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    top_go.style.display = "block";
  }
  else {
    top_go.style.display = "none";
  }
};

top_go.addEventListener("click", function () {
  document.body.scrollTop = 0; // For safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
});
