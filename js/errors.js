const errors = ['valueMissing', 'typeMismatch', 'patternMismatch'];

const errorMessages = {
  valueMissing: (name) => `El ${name} no puede estar vacío.`,
  typeMismatch: (name) => `El ${name} no es válido.`,
  patternMismatch: (name, minN, maxN) =>
    `El campo ${name} debe contener entre ${minN} a ${maxN} caracteres.`,
};

export const getErrorMessage = (
  { validity, placeholder: name, pattern },
  textareaValidations
) => {
  name = name.toLowerCase().split(' ')[0]; // Formatear el nombre del campo.

  // Validación específica para textarea
  if (textareaValidations.errorTextareaPattern) {
    const { minN, maxN } = textareaValidations.pattern;
    return errorMessages.patternMismatch(name, minN, maxN);
  }

  // Validación genérica
  for (const error of errors) {
    if (validity[error]) {
      if (error === 'patternMismatch') {
        const [minN, maxN] = pattern.match(/\d+/g); // Extraer valores numéricos del patrón.
        return errorMessages[error](name, minN, maxN);
      }
      return errorMessages[error](name);
    }
  }

  return null; // Retornar `null` si no hay error.
};
