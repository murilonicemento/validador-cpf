$(document).ready(function () {
  $("#cpf").inputmask("999.999.999-99")
})


function validateCPF() {
  const formattedCPF = document.getElementById("cpf").value;

  const cpf = clearFormatting(formattedCPF);

  if (cpf.length !== 11) {
    return showResult("CPF deve conter 11 dígitos", "firebrick");
  }

  if (checkRepeatedDigits(cpf)) {
    return showResult("CPF não pode conter dígitos repetidos", "firebrick");
  }

  const firstDigit = calculateCheckDigit(cpf, 1);

  if (!firstDigit) {
    return showResult(`CPF inválido - ${formattedCPF}`, "firebrick");
  }

  const secondDigit = calculateCheckDigit(cpf, 2);

  if (!secondDigit) {
    return showResult(`CPF inválido - ${formattedCPF}`, "firebrick");
  }

  showResult(`CPF Válido - ${formattedCPF}`, "#0B420E")
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
  return cpf.split("").every((digit) => digit === cpf[0])
}