const initialCards = [
  {
    // card 1
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },

  {
    // card 2
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },

  {
    // card 3
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },

  {
    // card 4
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },

  {
    // card 5
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },

  {
    // card 6
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },

  {
    // card 7 the bonus card
    name: "a person stacking rocks on top of each other",
    link: "https://unsplash.com/photos/a-person-stacking-rocks-on-top-of-each-other-RFFzlqBSmRw",
  },
];

//edit profile modal
const editProfileButton = document.querySelector(".profile__edit-button");

const editProfileModal = document.querySelector("#profile-edit-modal");

const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");

const profileNameElement = document.querySelector(".profile__name");

const profileDescriptionElement = document.querySelector(
  ".profile__description"
);

const editProfileNameInput = document.querySelector("#profile-name-input");

const editProfileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

function openEditProfileModal() {
  editProfileNameInput.value = profileNameElement.textContent;
  editProfileDescriptionInput.value = profileDescriptionElement.textContent;
  openModal(editProfileModal);
}

function closeEditProfileModal() {
  closeModal(editProfileModal);
}

function submitEditProfileModal(evt) {
  evt.preventDefault();
  profileNameElement.textContent = editProfileNameInput.value;
  profileDescriptionElement.textContent = editProfileDescriptionInput.value;
  closeModal(editProfileModal);
}

editProfileButton.addEventListener("click", openEditProfileModal);

editProfileCloseBtn.addEventListener("click", closeEditProfileModal);

editProfileModal.addEventListener("submit", submitEditProfileModal);

//new post modal
const newPostButton = document.querySelector(".profile__add-button");

const newPostModal = document.querySelector("#post-new-modal");

const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");

const newPostSaveBtn = newPostModal.querySelector(".modal__save-btn");

const cardImageElement = document.querySelector(".card__image");

const cardContentTitleElement = document.querySelector(".card__content-title"); //sub-class of card__content

const newPostImageLinkInput = document.querySelector(
  "#new-post-image-link-input"
);
const newPostImageCaptionInput = document.querySelector(
  "#new-post-caption-input"
);

function openNewPostModal() {
  openModal(newPostModal);
}

function closeNewPostModal() {
  closeModal(newPostModal);
}

function submitNewPostModal(evt) {
  evt.preventDefault();
  console.log(newPostImageLinkInput.value);
  console.log(newPostImageCaptionInput.value);
  evt.target.reset();
  closeModal(newPostModal);
}

newPostButton.addEventListener("click", openNewPostModal);

newPostCloseBtn.addEventListener("click", closeNewPostModal);

newPostModal.addEventListener("submit", submitNewPostModal);

//open & closing functions
function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

initialCards.forEach((element) => {
  console.log(element.name);
});
