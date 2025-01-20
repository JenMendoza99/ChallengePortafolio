import { validate, checkValidForm } from './js/validations.js';

const form = document.querySelector('form');

// Verificar que el formulario exista antes de trabajar con él
if (form) {
  form.addEventListener('submit', (e) => {
    const isValidForm = checkValidForm();
    if (!isValidForm) {
      e.preventDefault();
    }
  });

  const inputs = form.querySelectorAll('.input-form');
  inputs.forEach((input) => {
    input.addEventListener('blur', () => validate(input));
  });
}

const generateEmail = () => {
  const user = 'Jeniferpaolamendozahenriquez';
  const at = '@';
  const domain = 'gmail';
  return `${user}${at}${domain}.com`;
};

const replaceContactMail = () => {
  const navMail = document.querySelector('header .header-menu .header-mail');
  
  // Verificar que el elemento exista antes de modificarlo
  if (navMail) {
    const generatedMail = generateEmail();
    navMail.textContent = generatedMail; // textContent es más seguro que innerHTML para texto simple
    navMail.href = `mailto:${generatedMail}`;
  }
};

// Llamar a la función de reemplazo del correo electrónico
replaceContactMail();
