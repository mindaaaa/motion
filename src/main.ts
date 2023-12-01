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

const contentElement = document.querySelector('#content') as HTMLElement;

modals.forEach((modal) => {
  const addButton = modal.querySelector('.add') as HTMLElement;
  addButton.addEventListener('click', () => {
    const { title, image } = getInputValue(modal);

    if (title && image) {
      const newSection = createSection(title, image);
      contentElement.appendChild(newSection);
    }
  });
});

function getInputValue(modal: HTMLElement): { title: string; image: string } {
  const inputTitle = modal.querySelector('#image-title') as HTMLInputElement;
  const inputImage = modal.querySelector('#image-url') as HTMLInputElement;

  return {
    title: inputTitle.value,
    image: inputImage.value,
  };
}

function createSection(title: string, image: string): HTMLElement {
  const newSection = document.createElement('section');
  newSection.classList.add('section-css');

  const newTitle = document.createElement('div');
  newTitle.textContent = title;
  const newImg = document.createElement('img');
  newImg.src = image;

  newSection.appendChild(newImg);
  newSection.appendChild(newTitle);

  return newSection;
}

// add 버튼을 누르면
// 모달이 꺼지요
