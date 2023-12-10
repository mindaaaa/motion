const modals: NodeListOf<HTMLElement> = document.querySelectorAll('.modal');
const openButtons: NodeListOf<HTMLElement> = document.querySelectorAll('.open');
let isModalOpen: boolean = false;
let draggedElement: HTMLElement | null = null;
const contentElement = document.querySelector('#content') as HTMLElement;

function addDragEventListeners(section: HTMLElement) {
  section.addEventListener('dragstart', (event) => {
    const dragEvent = event as DragEvent;

    draggedElement = event.currentTarget as HTMLElement;
    console.log(draggedElement);

    dragEvent.dataTransfer?.setData('text/plain', '');
  });

  section.addEventListener('dragover', (event) => {
    event.preventDefault();
  });

  section.addEventListener('drop', (event) => {
    event.preventDefault();
    const dragEvent = event as DragEvent; // 개 긴 오브젝트
    const dropElement = event.currentTarget as HTMLElement;
    const element = dropElement?.getBoundingClientRect();

    if (!draggedElement) {
      return;
    }

    const isAfter = dragEvent.clientY > element!.top + element!.height / 2;
    if (isAfter) {
      contentElement.insertBefore(draggedElement, dropElement.nextSibling);
    } else {
      contentElement.insertBefore(draggedElement, dropElement);
    }
  });

  section.addEventListener('dragend', () => {
    draggedElement = null;
  });
}

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

const closeButtons: NodeListOf<HTMLElement> =
  document.querySelectorAll('.close');

closeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const modalId = button.getAttribute('close-button-id');
    if (modalId) {
      closeModal(modalId);
    }
  });
});

function closeModal(modalId: string) {
  const modalToClose = document.getElementById(modalId);
  if (modalToClose) {
    modalToClose.classList.add('hidden');
    isModalOpen = false;
  }
}

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
modals.forEach((modal) => {
  const addButton = modal.querySelector('.add') as HTMLElement;
  const modalType = addButton.getAttribute('modal-type');

  addButton.addEventListener('click', () => {
    const { title, image } = getInputValue(modal, modalType);

    if (title && image && modalType) {
      createSection(title, image, modalType);

      const modalId = addButton.getAttribute('add-button-id');
      if (modalId) {
        closeModal(modalId);
      }
    }
  });
});

function getInputValue(
  modal: HTMLElement,
  modalType: string | null
): { title: string; image: string } {
  let inputTitleId = '';
  let inputImageId = '';

  if (modalType === 'img') {
    inputTitleId = '#image-title';
    inputImageId = '#image-url';
  } else if (modalType === 'video') {
    inputTitleId = '#video-title';
    inputImageId = '#video-url';
  } else {
    inputTitleId = '.title';
    inputImageId = '.body';
  }

  const inputTitle = modal.querySelector(inputTitleId) as HTMLInputElement;
  const inputImage = modal.querySelector(inputImageId) as HTMLInputElement;

  return {
    title: inputTitle.value,
    image: inputImage.value,
  };
}

function createSection(title: string, image: string, item: string) {
  const newSection = document.createElement('section');
  newSection.classList.add('section-css');
  newSection.classList.add('drag-section');
  newSection.draggable = true;

  const newTitle = document.createElement('div');
  newTitle.textContent = title;
  const newItem: HTMLElement = document.createElement(item);

  if (item === 'img') {
    newItem.setAttribute('src', image);
  } else if (item === 'video') {
    const sourceElement = document.createElement('source');
    sourceElement.setAttribute('src', image);
    newItem.appendChild(sourceElement);
    newItem.setAttribute('width', '400');
    newItem.setAttribute('height', '300');
    newItem.setAttribute('controls', 'controls');
  } else {
    newItem.innerText = image;
  }

  newSection.appendChild(newItem);
  newSection.appendChild(newTitle);

  contentElement.appendChild(newSection);

  addDragEventListeners(newSection);
  resetInputValues(item);
}

function resetInputValues(modalType: string | null) {
  let inputTitleId = '';
  let inputImageId = '';

  if (modalType === 'img') {
    inputTitleId = '#image-title';
    inputImageId = '#image-url';
  } else if (modalType === 'video') {
    inputTitleId = '#video-title';
    inputImageId = '#video-url';
  } else {
    inputTitleId = '.title';
    inputImageId = '.body';
  }

  const inputTitle = document.querySelector(inputTitleId) as HTMLInputElement;
  const inputImage = document.querySelector(inputImageId) as HTMLInputElement;

  if (inputTitle && inputImage) {
    inputTitle.value = '';
    inputImage.value = '';
  }
}
