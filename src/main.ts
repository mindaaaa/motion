const modals: NodeListOf<HTMLElement> = document.querySelectorAll('.modal');
const openButtons: NodeListOf<HTMLElement> = document.querySelectorAll('.open');
let isModalOpen: boolean = false;

openButtons.forEach((button) => {
  button.addEventListener('click', () => {
    if (!isModalOpen) {
      const modalId = button.getAttribute('modal-button-id');
      // 이중 if문을 사용해서 코드가 더러워졌어 ㅠㅠ 리팩토링 함수로 뺴자
      if (modalId) {
        const modalToOpen = document.getElementById(modalId);
        if (modalToOpen) {
          modalToOpen.classList.remove('hidden');
          isModalOpen = true;
        }
      }
    }
  });
});

const closeButton: NodeListOf<HTMLElement> =
  document.querySelectorAll('.close');
closeButton.forEach((button) => {
  button.addEventListener('click', () => {
    const closeButtonId = button.getAttribute('close-button-id');
    if (closeButtonId) {
      const modalToClose = document.getElementById(closeButtonId);
      if (modalToClose) {
        modalToClose.classList.add('hidden');
        isModalOpen = false;
      }
    }
  });
});

// url 추가 버튼
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
