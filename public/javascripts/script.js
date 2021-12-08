window.addEventListener('load', () => {
  document
    .querySelector('.dropdown-button')
    .addEventListener('click', (event) => {
      //console.log(event.target.closest('.dropdown-button'));
      document.querySelector('.dropdown-menu').classList.toggle('hidden');
    });
  document.querySelector('#imageInput').addEventListener('change', (event) => {
    const [file] = imageInput.files;
    if (file) {
      document.querySelector('.user-profile-image').src =
        URL.createObjectURL(file);
    }
  });
});
