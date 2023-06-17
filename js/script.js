$(document).ready(function () {
  $("#cpf").inputmask("999.999.999-99");
});


function validateCPF() {
  const formattedCPF = document.getElementById("cpf").value;

  const cpf = clearFormatting(formattedCPF);

  if (cpf.length !== 11) {
    return showResult("CPF deve conter 11 dígitos", "#FF0000");
  }

  if (checkRepeatedDigits(cpf)) {
    return showResult("CPF não pode conter dígitos repetidos", "#FF0000");
  }

  const firstDigit = calculateCheckDigit(cpf, 1);

  if (!firstDigit) {
    return showResult(`CPF inválido`, "#FF0000");
  }

  const secondDigit = calculateCheckDigit(cpf, 2);

  if (!secondDigit) {
    return showResult(`CPF inválido - ${formattedCPF}`, "#FF0000");
  }

  showResult(`CPF Válido`, "#008000");
}

function calculateCheckDigit(cpf, position) {
  const sequence = cpf.slice(0, 8 + position).split("");

  let sum = 0;
  let multiplier = 9 + position;

  for (const number of sequence) {
    sum += multiplier * Number(number);
    multiplier--;
  }

  const restDivide = (sum * 10) % 11;
  const digit = cpf.slice(8 + position, 9 + position);

  return restDivide == digit;
}

function clearFormatting(cpf) {
  cpf = cpf.replace(/\D/g, "");

  return cpf;
}

function showResult(text, color) {
  const span = document.getElementById("result");

  span.innerHTML = text;
  span.style.color = color;
}

function checkRepeatedDigits(cpf) {
  return cpf.split("").every((digit) => digit === cpf[0]);
}