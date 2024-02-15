"use strict";

const passwordInput = document.querySelector('#password');
const passwordLengthInput = document.querySelector('#password_length');
const passwordRangeInput = document.querySelector('#password_range');
const copyBtn = document.querySelector('.copy_btn');
const generateBtn = document.querySelector('.generate_btn');

// Função para exibir uma popup de sucesso por 3 segundos
function displaySuccessPopup() {
  const successPopup = document.querySelector('#success_popup');
  successPopup.style.display = 'block';
  setTimeout(() => {
    closePopup();
  }, 3000);
};

// Função para fechar a popup de sucesso
function closePopup() {
  const successPopup = document.querySelector('#success_popup');
  successPopup.style.display = 'none';
};

// Função para gerar uma senha aleatória de acordo com o comprimento fornecido
function generateRandomString(length) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_+=[]{}|;:,.<>?/';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars[randomIndex];
  };
  return result;
};

// Função para copiar a senha para a área de transferência
function copyToClipboard(text) {
  navigator.clipboard.writeText(text);
};

// Função para atualizar o campo de senha com uma nova senha gerada
function updatePassword() {
  const length = parseInt(passwordLengthInput.value);
  const generatedPassword = generateRandomString(length);
  if (generatedPassword) {
    passwordInput.value = generatedPassword;
  };
};

window.onload = () => {

  // Event listener para a mudança no comprimento da senha
  passwordLengthInput.addEventListener('input', (e) => {
    e.preventDefault();
    const value = passwordLengthInput.value;
    if (value.length > 2) {
      window.alert("O numero máximo de caracteres é 16");
      passwordLengthInput.value = '12';
      passwordRangeInput.value = '12';
    } else {
      passwordRangeInput.value = value;
      updatePassword();
    };
  });

  // Event listener para a mudança no range de comprimento da senha
  passwordRangeInput.addEventListener('input', (e) => {
    e.preventDefault();
    const value = passwordRangeInput.value;
    passwordLengthInput.value = value;
    updatePassword();
  });

  // Event listener para o botão de cópia da senha
  copyBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const passwordValue = passwordInput.value;
    copyToClipboard(passwordValue);
    displaySuccessPopup();
  });

  // Event listener para o botão de geração da senha
  generateBtn.addEventListener('click', (e) => {
    e.preventDefault();
    updatePassword();
  });

  // Inicializa a senha
  updatePassword();
};
