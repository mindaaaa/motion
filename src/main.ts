const modals: NodeListOf<HTMLElement> = document.querySelectorAll('.modal');
const openButtons: NodeListOf<HTMLElement> = document.querySelectorAll('.open');
let isModalOpen: boolean = false;
let draggedElement: HTMLElement | null = null;
const contentElement = document.querySelector('#content') as HTMLElement;

class Section {
  title: string;
  image: string;
  item: string;

  constructor(title: string, image: string, item: string) {
    this.title = title;
    this.image = image;
    this.item = item;
  }
}

// 추가된 섹션 중 선택된 요소를 다른 위치로 변경하는 함수(나머지는 밀려난다.)
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

// 모달 구현 기능
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

// 모달을 닫는 기능 구현
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

// 입력된 정보를 받아오는 함수(creatSection으로 넘어감)
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

const sections: HTMLElement[] = [];
// getInputValue에서 입력받은 함수를 바탕으로 섹션을 만드는 함수
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

  // 삭제 버튼 구현
  const deleteButton = document.createElement('button');
  deleteButton.textContent = '❌';
  deleteButton.addEventListener('click', () => {
    deleteSection(newSection);
  });

  newSection.appendChild(newItem);
  newSection.appendChild(newTitle);
  newSection.appendChild(deleteButton);

  contentElement.appendChild(newSection);

  sections.push(newSection);

  addDragEventListeners(newSection);
  resetInputValues(item);
}

// 모달로 섹션을 추가했으면 input창이 초기화되는 함수
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

function deleteSection(section: HTMLElement) {
  section.remove();
  const index = sections.indexOf(section);
  if (index !== -1) {
    sections.splice(index, 1);
  }
  console.log(section);
}
