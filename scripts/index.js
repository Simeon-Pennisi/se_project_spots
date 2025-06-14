//edit profile modal

console.log("Eat Pray Love");

const editProfileButton = document.querySelector(".profile__edit-button");

const profileEditModal = document.querySelector("#profile-edit-modal");

const editProfileCloseBtn = profileEditModal.querySelector(".modal__close-btn");

editProfileButton.addEventListener("click", function () {
  profileEditModal.classList.add("modal_is-opened");
  console.log("edit button clicked");
});

editProfileCloseBtn.addEventListener("click", function () {
  profileEditModal.classList.remove("modal_is-opened");
  console.log("close button clicked");
});

//new post modal

console.log("Live Laugh Love");

const newPostButton = document.querySelector(".profile__add-button");

const postNewModal = document.querySelector("#post-new-modal");

const newPostCloseBtn = postNewModal.querySelector(".modal__close-btn");

newPostButton.addEventListener("click", function () {
  postNewModal.classList.add("modal_is-opened");
  console.log("new post button clicked");
});

newPostCloseBtn.addEventListener("click", function () {
  postNewModal.classList.remove("modal_is-opened");
  console.log("close button clicked");
});
