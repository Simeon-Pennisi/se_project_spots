const initialCards = [
  {
    // example card
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },

  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },

  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },

  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },

  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },

  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },

  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },

  {
    // additional card
    name: "a person stacking rocks on top of each other",
    link: "https://unsplash.com/photos/a-person-stacking-rocks-on-top-of-each-other-RFFzlqBSmRw",
  },
];

const cardTemplate = document.querySelector("#card-template");

const cardsList = document.querySelector(".cards__list");

//open & closing functions
function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

//edit profile modal
const editProfileModal = document.querySelector("#profile-edit-modal");

const editProfileButton = document.querySelector(".profile__edit-button");

const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");

const editProfileNameInput = document.querySelector("#profile-name-input");

const editProfileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const profileNameElement = document.querySelector(".profile__name");

const profileDescriptionElement = document.querySelector(
  ".profile__description"
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
const newPostModal = document.querySelector("#post-new-modal");

const newPostButton = document.querySelector(".profile__add-button");

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

  const cardInputs = {
    link: newPostImageLinkInput.value,
    name: newPostImageCaptionInput.value,
  };

  const newCard = getCardElement(cardInputs);

  cardsList.prepend(newCard);

  evt.target.reset();
  closeModal(newPostModal);
}

newPostButton.addEventListener("click", openNewPostModal);

newPostCloseBtn.addEventListener("click", closeNewPostModal);

newPostModal.addEventListener("submit", submitNewPostModal);

// primary function
function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__content-title");
  const cardImageEl = cardElement.querySelector(".card__image");

  cardImageEl.src = data.link;
  cardTitleEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  const cardLikeButton = cardElement.querySelector(
    ".card__content-like-button"
  );

  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.replace(
      "card__content-like-button",
      "card__content-like-button_active"
    );
  });

  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    modalPreviewImage.src = data.link;
    modalPreviewImage.alt = data.name;
    modalPreviewTitle.textContent = data.name;
    openModal(modalPreview);
  });

  return cardElement;
}

initialCards.forEach((element) => {
  const cardElem = getCardElement(element);
  cardsList.append(cardElem);
});

const modalPreview = document.querySelector("#preview-modal");

const modalPreviewCloseBtn = modalPreview.querySelector(
  ".modal__close-btn_preview"
);

const modalPreviewImage = modalPreview.querySelector(".modal__image-preview");

const modalPreviewTitle = document.querySelector(".modal__preview-title");

modalPreviewCloseBtn.addEventListener("click", closeModalPreview);

function closeModalPreview() {
  closeModal(modalPreview);
}
