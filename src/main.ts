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
// input에 내용이 들어가서
// img 태그가 출력되고, div 태그에 title이 출력되고
// 모달이 꺼져요
modals.forEach((modal) => {
  const modalTitle: HTMLElement | null =
    document.querySelector('#modalContent');
  const modalImage: HTMLImageElement | null =
    document.querySelector('#modal-image');
  const addButton = modal.querySelector('.add') as HTMLElement;
  addButton.addEventListener('click', () => {
    // 모달 타이틀 입력
    const modalInputTitle = modal.querySelector(
      '#image-title'
    ) as HTMLInputElement;
    const title = modalInputTitle.value;

    if (modalTitle) {
      modalTitle.textContent = `${title}`;
    }
    // 모달 이미지 출력
    const modalInputImage = modal.querySelector(
      '#image-url'
    ) as HTMLInputElement;
    const image = modalInputImage.value;

    if (modalImage) {
      modalImage.src = image;
    }
    // 모달 삭제
    handleCloseModal;
  });
});

// addButton?.addEventListener('click', () => {
//   const imageUrlInput = document.getElementById(
//     'image-url'
//   ) as HTMLInputElement;
//   const imageUrl = imageUrlInput?.value;

//   const modalImage = modal?.querySelector('#modal-image') as HTMLImageElement;
//   if (modalImage) {
//     modalImage.src = imageUrl;
//   }
// });
