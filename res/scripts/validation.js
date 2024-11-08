export const enableValidation = (config) => {
  const forms = document.querySelectorAll(config.formSelector);

  forms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      clearValidation(form, config);
    });

    const inputs = form.querySelectorAll(config.inputSelector);
    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        validateInput(input, config);
        toggleSubmitButton(form, config);
      });
    });

    toggleSubmitButton(form, config);
  });
};

export function clearValidation(form, config) {
  resetValidationErrors(form, config);
  const submitButton = form.querySelector(config.submitButtonSelector);
  submitButton.disabled = true;
  submitButton.classList.add(config.inactiveButtonClass);
}

function resetValidationErrors(form, config) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  inputs.forEach((input) => hideError(input, config));
  toggleSubmitButton(form, config);
}

function toggleSubmitButton(form, config) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const submitButton = form.querySelector(config.submitButtonSelector);
  const isFormValid = inputs.every((input) => input.validity.valid);
  submitButton.disabled = !isFormValid;
  submitButton.classList.toggle(config.inactiveButtonClass, !isFormValid);
}

function hideError(input, config) {
  const errorElement = input.nextElementSibling;
  if (errorElement) {
    errorElement.textContent = "";
    errorElement.classList.remove(config.errorClass);
  }
  input.classList.remove(config.inputErrorClass);
}

const validateInput = (input, config) => {
    const errorElement = input.nextElementSibling;
  
    if (!errorElement) {
      console.warn(`Элемент ошибки не найден для поля: ${input.name}`);
      return;
    }
  
    if (!input.validity.valid) {
      let errorMessage;
      if (input.validity.patternMismatch) {
        errorMessage = input.dataset.errorMessage;
      } else {
        errorMessage = input.validationMessage;
      }
  
      errorElement.textContent = errorMessage;
      errorElement.classList.add(config.errorClass);
      input.classList.add(config.inputErrorClass);
    } else {
      hideError(input, config);
    }
  };
