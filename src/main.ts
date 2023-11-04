const openButtons = document.querySelectorAll('.open');
const modal = document.querySelector('.modal');
const openModal = () => {
  modal?.classList.remove('hidden');
};
openButtons.forEach((button) => {
  button.addEventListener('click', openModal);
});
const closeButton = modal?.querySelector('.close');
const closeModal = () => {
  modal?.classList.add('hidden');
};
closeButton?.addEventListener('click', closeModal);
