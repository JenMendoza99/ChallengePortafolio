import { getErrorMessage } from './errors.js';

const validInputs = {
  name: false,
  email: false,
  subject: false,
  message: false,
};

export const validate = (input) => {
  let isValid = input.validity.valid;
  let errorTextareaPattern = false;

  // Validación específica para textarea
  if (input.type === 'textarea') {
    const textareaPattern = { minN: 10, maxN: 300 };
    ({ isValid, errorTextareaPattern } = validateTextareaPattern(input, textareaPattern));
  }

  // Actualizar estado de validación y clases de error
  updateInputValidationState(input, isValid, errorTextareaPattern);

  // Habilitar o deshabilitar botón de envío
  handleSubmitButton();
};

const validateTextareaPattern = (input, pattern) => {
  const { value, validity } = input;
  const { minN, maxN } = pattern;
  const textareaPattern = new RegExp(`^[\\s\\S]{${minN},${maxN}}$`);

  if (!validity.valueMissing) {
    return {
      errorTextareaPattern: !textareaPattern.test(value),
      isValid: textareaPattern.test(value),
    };
  }
  return { errorTextareaPattern: false, isValid: false };
};

const updateInputValidationState = (input, isValid, errorTextareaPattern) => {
  const parentElement = input.parentElement;
  const errorMessageElement = parentElement.querySelector('.invalid-input-message');

  if (isValid) {
    validInputs[input.name] = true;
    parentElement.classList.remove('invalid-input-group');
    if (errorMessageElement) errorMessageElement.innerHTML = '';
  } else {
    validInputs[input.name] = false;
    parentElement.classList.add('invalid-input-group');
    if (errorMessageElement) {
      errorMessageElement.innerHTML = getErrorMessage(input, {
        errorTextareaPattern,
        pattern: { minN: 10, maxN: 300 },
      });
    }
  }
};

const handleSubmitButton = () => {
  const submitButton = document.querySelector('.contact-form .button-form');
  if (submitButton) {
    const isValidForm = checkValidForm();
    submitButton.disabled = !isValidForm;
  }
};

export const checkValidForm = () => {
  return Object.values(validInputs).every((isValid) => isValid);
};
