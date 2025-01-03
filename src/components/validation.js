// функция проверки валидности для вывода/скрытия сообщения об ошибке 
const updateInputError = (formElement, inputElement, selectors) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  };
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement, selectors);
  } else {
    showInputError(formElement, inputElement, inputElement.validationMessage, selectors);
  }
};

// функция вывода сообщения об ошибке
const showInputError = (formElement, inputElement, errorMessage, selectors) => {
  const errorElement = formElement.querySelector(
    `.${inputElement.name}-popup__input-error`
  );
  inputElement.classList.add(selectors.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(selectors.errorClass);
};

// функция скрытия сообщения об ошибке
export const hideInputError = (formElement, inputElement, selectors) => {
  const errorElement = formElement.querySelector(
    `.${inputElement.name}-popup__input-error`
  );
  inputElement.classList.remove(selectors.inputErrorClass);
  errorElement.classList.remove(selectors.errorClass);
  errorElement.textContent = "";
};

// функция активирования/деактивирования кнопки сохранить
const updateSaveButton = (formElement, selectors) => {
  const saveButton = formElement.querySelector(selectors.submitButtonSelector);
  const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
  const allValid = inputList.every(
    (inputElement) => inputElement.validity.valid
  );
  if (allValid) {
    saveButton.removeAttribute("disabled");
  } else {
    saveButton.setAttribute("disabled", "");
  }
};

// функция установления обработчика события для каждого поля формы
const setEventListeners = (formElement, selectors) => {
  const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      updateInputError(formElement, inputElement, selectors);
      updateSaveButton(formElement, selectors);
    });
  });
};

// функция установления обработчика события для каждого поля каждой формы документа
export const enableValidation = (selectors) => {
  const formList = Array.from(document.querySelectorAll(selectors.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, selectors);
  });
};

// возврат формы в исходное состояние
export const clearValidation = (formElement, selectors) => {
  const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, selectors);
  });
  const saveButton = formElement.querySelector(selectors.submitButtonSelector);
  saveButton.removeAttribute("disabled");
};