const modal = document.getElementById("image-modal");
const modalImg = document.getElementById("expanded-img");
const closeModal = document.querySelector(".close-modal");

const galleryImages = document.querySelectorAll(".gallery-card img");

galleryImages.forEach(function(img) {
  img.addEventListener("click", function() {
    modal.style.display = "flex"; 
    modalImg.src = this.src;  //wskazanie na dokladnie to zdjecie
  });
});

closeModal.addEventListener("click", function() {
  modal.style.display = "none";
});

modal.addEventListener("click", function(event) {
  if (event.target === modal) { //czy w tło
    modal.style.display = "none";
  }
});