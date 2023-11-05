const openButtons = document.querySelectorAll('.open');
const modals = document.querySelectorAll('.modal');

openButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const modalId = button.getAttribute('data-modal-id') as string;
    console.log(modalId);
    const modalToOpen = document.getElementById(modalId);
    if (modalToOpen) {
      modalToOpen.classList.remove('hidden');
    }
  });
});

modals.forEach((modal) => {
  modal.addEventListener('click', () => modal.classList.add('hidden'));
});
