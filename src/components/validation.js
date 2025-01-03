// функция проверки валидности для вывода/скрытия сообщения об ошибке 
const updateInputError = (formElement, inputElement) => {
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement);
  } else {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  }
};

// функция вывода сообщения об ошибке
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(
    `.${inputElement.name}-popup__input-error`
  );
  inputElement.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__input-error_active");
};

// функция скрытия сообщения об ошибке
export const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(
    `.${inputElement.name}-popup__input-error`
  );
  inputElement.classList.remove("popup__input_type_error");
  errorElement.classList.remove("popup__input-error_active");
  errorElement.textContent = "";
};

// функция активирования/деактивирования кнопки сохранить
const updateSaveButton = (formElement) => {
  const saveButton = formElement.querySelector(".popup__button");
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
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
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      updateInputError(formElement, inputElement);
      updateSaveButton(formElement);
    });
  });
};

// функция установления обработчика события для каждого поля каждой формы документа
export const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};
