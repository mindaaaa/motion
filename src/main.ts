const modals: NodeListOf<HTMLElement> = document.querySelectorAll('.modal');
const openButtons: NodeListOf<HTMLElement> = document.querySelectorAll('.open');
let isModalOpen: boolean = false;

openButtons.forEach((button) => {
  button.addEventListener('click', handleOpenModal);
});

function handleOpenModal(event: Event) {
  const openButton = event.currentTarget as HTMLElement;
  const modalId = openButton.getAttribute('modal-button-id');
  if (!isModalOpen) {
    if (modalId) {
      const modalToOpen = document.getElementById(modalId);
      if (modalToOpen) {
        modalToOpen.classList.remove('hidden');
        isModalOpen = true;
      }
    }
  }
}

const closeButton: NodeListOf<HTMLElement> =
  document.querySelectorAll('.close');

closeButton.forEach((button) => {
  button.addEventListener('click', handleCloseModal);
});

function handleCloseModal(event: Event) {
  const closeButton = event.currentTarget as HTMLElement;
  const modalId = closeButton.getAttribute('close-button-id');

  if (modalId) {
    const modalToClose = document.getElementById(modalId);

    if (modalToClose) {
      modalToClose.classList.add('hidden');
      isModalOpen = false;
    }
  }
}

// add 버튼을 누르면
// 우측 이미지/좌측 타이틀이 출력되고
// 모달이 꺼져요
const modal = document.querySelector('#image-modal');

const addButton = modal?.querySelector('.add');
addButton?.addEventListener('click', () => {
  const imageUrlInput = document.getElementById(
    'image-url'
  ) as HTMLInputElement;
  const imageUrl = imageUrlInput?.value;

  const modalImage = modal?.querySelector('#modal-image') as HTMLImageElement;
  if (modalImage) {
    modalImage.src = imageUrl;
  }
});
