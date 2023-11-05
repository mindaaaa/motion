const openButtons = document.querySelectorAll('.open');
const modals = document.querySelectorAll('.modal');
let isModalOpen = false;

openButtons.forEach((button) => {
  button.addEventListener('click', () => {
    if (!isModalOpen) {
      const modalId = button.getAttribute('data-modal-id') as string;
      console.log(modalId);
      const modalToOpen = document.getElementById(modalId);
      if (modalToOpen) {
        modalToOpen.classList.remove('hidden');
        isModalOpen = true;
      }
    }
  });
});

modals.forEach((modal) => {
  modal.addEventListener('click', () => {
    modal.classList.add('hidden');
    isModalOpen = false;
  });
});
