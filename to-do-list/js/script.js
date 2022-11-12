const form = document.querySelector('form[name="add-to-do"]');
const toDoTextEl = document.getElementById("to-do-text");
const toDoListEl = document.querySelector(".to-do-list");
const emptyListTextEl = document.querySelector(".empty-list-text");
const taskContainerEl = document.querySelector(".tasks-container");

let countItems = 0;

/////////////////////////////////////
// ADD NEW TO-DO ITEM
/////////////////////////////////////
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const toDoText = getTextFromFormInput(form);

  createItemListComponent(toDoText);
  toDoTextEl.value = "";

  toggleEmptyListText();

  addBtnDeleteEventListener();
  addBtnCheckEventListener();

  increaseOneClearAllSection();
});

/////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////
function getTextFromFormInput(formInput) {
  const fromDataEntries = new FormData(formInput).entries();
  return Array.from(fromDataEntries)[0][1];
}

function getLastElementFromNodeList(selector) {
  const elements = document.querySelectorAll(selector);
  return (lastElement = elements[elements.length - 1]);
}

function removeAllToDoItems() {
  const toDoItemEl = document.querySelectorAll(".to-do-item");
  toDoItemEl.forEach((el) => el.remove());
}

// COMPONENTS
function createItemListComponent(toDoText) {
  const HTMLContent = `
    <li class="to-do-item">
      <div class="to-do-item-box">
        <button class="btn btn-to-do btn-check">
          <i class="list-icon list-icon-check fa-solid fa-check hidden"></i>
        </button>

        <div class="to-do-text">${toDoText}</div>

        <button class="btn btn-to-do btn-delete">
          <i
            class="list-icon list-icon-delete fa-regular fa-trash-can"
          ></i>
        </button>
      </div>
    </li>`;

  toDoListEl.insertAdjacentHTML("beforeend", HTMLContent);
}

function createClearAllSectionComponent() {
  const HTMLContent = `
    <div class="clear-all">
      <p class="clear-all-text">You have 1 task</p>
      <button class="clear-all-btn">CLEAR ALL</button>
    </div>`;

  taskContainerEl.insertAdjacentHTML("beforeend", HTMLContent);

  addBtnClearAllEventListener();
}

// EMPTY LIST TEXT
function toggleEmptyListText() {
  const toDoItemEl = document.querySelectorAll(".to-do-item");

  if (toDoItemEl.length > 0) {
    emptyListTextEl.classList.add("hidden");
  } else {
    emptyListTextEl.classList.remove("hidden");
  }
}

// BUTTONS EVENT LISTENERS
function addBtnDeleteEventListener() {
  const lastBtnDeleteEl = getLastElementFromNodeList(".btn-delete");

  lastBtnDeleteEl.addEventListener("click", (e) => {
    e.target.closest(".to-do-item").remove();

    toggleEmptyListText();
    decreaseOneClearAllSection();
  });
}

function addBtnCheckEventListener() {
  const lastBtnCheckEl = getLastElementFromNodeList(".btn-check");
  const lastCheckIconEl = getLastElementFromNodeList(".list-icon-check");
  const lastToDoTextEl = getLastElementFromNodeList(".to-do-text");

  lastBtnCheckEl.addEventListener("click", (e) => {
    lastCheckIconEl.classList.toggle("hidden");
    lastToDoTextEl.classList.toggle("done");
  });
}

function addBtnClearAllEventListener() {
  const clearAllBtnEl = document.querySelector(".clear-all-btn");

  clearAllBtnEl.addEventListener("click", () => {
    removeAllToDoItems();
    removeClearAllSection();
    toggleEmptyListText();
  });
}

// CLEAR ALL SECTION (COUNT ITEMS IN TO-DO LIST)
function updateClearAllSection(count) {
  const clearAllTextEl = document.querySelector(".clear-all-text");
  clearAllTextEl.innerHTML = `You have ${count} tasks`;
}

function removeClearAllSection() {
  const clearAllEl = document.querySelector(".clear-all");
  clearAllEl.remove();
  countItems = 0;
}

function increaseOneClearAllSection() {
  const toDoItemEl = document.querySelectorAll(".to-do-item");

  if (toDoItemEl.length > 0) {
    if (toDoItemEl.length === 1 && countItems === 0) {
      createClearAllSectionComponent();
      countItems++;
    } else {
      countItems++;
      updateClearAllSection(countItems);
    }
  }
}

function decreaseOneClearAllSection() {
  countItems--;
  if (countItems === 0) {
    removeClearAllSection();
  } else {
    updateClearAllSection(countItems);
  }
}
