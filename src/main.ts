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

const contentElement = document.querySelector('#content') as HTMLElement;

// modals.forEach((modal) => {
//   const addButton = modal.querySelector('.add') as HTMLElement;
//   const modalId = addButton.getAttribute('add-button-id');

//   addButton.addEventListener('click', () => {
//     const { title, image } = getInputValue(modal, modalId);

//     if (title && image && modalId) {
//       createSection(title, image, modalId);

//       if (modalId) {
//         closeModal(modalId);
//       }
//     }
//   });
// });

// function getInputValue(
//   modal: HTMLElement,
//   modalId: string | null
// ): { title: string; image: string } {
//   let inputTitleId = '';
//   let inputImageId = '';

//   if (modalId === 'image-modal') {
//     inputTitleId = '#image-title';
//     inputImageId = '#image-url';
//   } else if (modalId === 'video-modal') {
//     inputTitleId = '#video-title';
//     inputImageId = '#video-url';
//   } else {
//     inputTitleId = '.title';
//     inputImageId = '.body';
//   }

//   const inputTitle = modal.querySelector(inputTitleId) as HTMLInputElement;
//   const inputImage = modal.querySelector(inputImageId) as HTMLInputElement;

//   return {
//     title: inputTitle.value,
//     image: inputImage.value,
//   };
// }

// function createSection(title: string, image: string, modalId: string) {
//   const newSection = document.createElement('section');
//   newSection.classList.add('section-css');

//   const newTitle = document.createElement('div');
//   newTitle.textContent = title;
//   const newItem: HTMLElement = document.createElement(modalId);

//   if (modalId === 'image-modal' || modalId === 'video-modal') {
//     newItem.setAttribute('src', image);
//   } else {
//     newItem.innerText = image;
//   }

//   newSection.appendChild(newItem);
//   newSection.appendChild(newTitle);

//   contentElement.appendChild(newSection);
// }

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
}

// todo ◼로 구현
// 드래그앤드롭
// css
