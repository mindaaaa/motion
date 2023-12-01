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
    const modalInputTitle = modal.querySelector(
      '#image-title'
    ) as HTMLInputElement;
    const title = modalInputTitle.value;

    const modalInputImage = modal.querySelector(
      '#image-url'
    ) as HTMLInputElement;
    const image = modalInputImage.value;

    if (title && image) {
      const newSection = document.createElement('section');
      newSection.classList.add('section-css');

      const newTitle = document.createElement('div');
      newTitle.textContent = title;
      const newImg = document.createElement('img');
      newImg.src = image;

      newSection.appendChild(newImg);
      newSection.appendChild(newTitle);

      contentElement.appendChild(newSection);
    }
  });
});

function handleAddModal(event: Event) {
  const addButtom = event.currentTarget as HTMLElement;
  const modalId = addButtom.getAttribute('add-button-id');

  if (modalId) {
    const modalToClose = document.getElementById(modalId);

    if (modalToClose) {
      modalToClose.classList.add('hidden');
      isModalOpen = false;
    }
  }
}

// repactor
// add 버튼을 누르면
// 모달이 꺼지고
// section 추가되고
// classList add 해줘요(css처리하게)
