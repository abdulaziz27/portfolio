function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Get the modal
var modal = document.getElementById('certificateModal');

// Get the image and insert it inside the modal - use its "alt" text as a caption
var modalImg = document.getElementById('modalImg');
var captionText = document.getElementById('caption');

function showModal(src) {
  modal.style.display = 'block';
  modalImg.src = src;
  captionText.innerHTML = src.split('/').pop();
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName('close')[0];

// When the user clicks on <span> (x), close the modal
function closeModal() {
  modal.style.display = 'none';
}