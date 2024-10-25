// Saldo inicial da conta
let accountBalance = 0;

// Array para armazenar histórico de transações
let transactionHistory = [];

document.addEventListener("DOMContentLoaded", function () {
  const loginButton = document.getElementById("login-button");
  const depositButton = document.getElementById("deposit-button");
  const withdrawButton = document.getElementById("withdraw-button");
  const transferButton = document.getElementById("transfer-button");
  const logoutButton = document.getElementById("logout-button");

  // Verifica se estamos na página de login
  if (loginButton) {
    // Evento de login
    loginButton.addEventListener("click", function () {
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      // Simulação simples de autenticação
      if (username === "usuario" && password === "1234") {
        window.location.href = "dashboard.html"; // Redireciona para o dashboard
      } else {
        document.querySelector(".error-message").textContent =
          "Usuário ou senha incorretos!";
      }
    });
  }

  // Verifica se estamos na página do dashboard
  if (depositButton && withdrawButton && transferButton) {
    // Atualiza o saldo ao carregar a página
    updateBalanceDisplay();

    // Evento de depósito
    depositButton.addEventListener("click", function () {
      const amount = parseFloat(
        document.getElementById("deposit-amount").value
      );
      if (!isNaN(amount) && amount > 0) {
        accountBalance += amount; // Atualiza o saldo
        transactionHistory.push(`Depósito: R$ ${amount.toFixed(2)}`);
        updateBalanceDisplay(); // Atualiza o saldo no dashboard
        updateTransactionHistory(); // Atualiza o histórico de transações
        document.getElementById("deposit-amount").value = ""; // Limpa o campo de depósito
      } else {
        alert("Por favor, insira um valor válido.");
      }
    });

    // Evento de saque
    withdrawButton.addEventListener("click", function () {
      const amount = parseFloat(
        document.getElementById("withdraw-amount").value
      );
      if (!isNaN(amount) && amount > 0 && amount <= accountBalance) {
        accountBalance -= amount; // Atualiza o saldo
        transactionHistory.push(`Saque: R$ ${amount.toFixed(2)}`);
        updateBalanceDisplay(); // Atualiza o saldo no dashboard
        updateTransactionHistory(); // Atualiza o histórico de transações
        document.getElementById("withdraw-amount").value = ""; // Limpa o campo de saque
      } else {
        alert("Valor inválido ou saldo insuficiente.");
      }
    });

    // Evento de transferência
    transferButton.addEventListener("click", function () {
      const amount = parseFloat(
        document.getElementById("transfer-amount").value
      );
      const recipient = document.getElementById("recipient-name").value;

      if (
        !isNaN(amount) &&
        amount > 0 &&
        amount <= accountBalance &&
        recipient
      ) {
        accountBalance -= amount; // Atualiza o saldo
        transactionHistory.push(
          `Transferência de R$ ${amount.toFixed(2)} para ${recipient}`
        );
        updateBalanceDisplay(); // Atualiza o saldo no dashboard
        updateTransactionHistory(); // Atualiza o histórico de transações
        document.getElementById("transfer-amount").value = ""; // Limpa o campo de transferência
        document.getElementById("recipient-name").value = ""; // Limpa o campo de destinatário
      } else {
        alert(
          "Valor inválido, saldo insuficiente ou destinatário não informado."
        );
      }
    });

    // Evento de logout
    logoutButton.addEventListener("click", function () {
      window.location.href = "index.html"; // Redireciona para a página de login
    });
  }
});

// Função para atualizar o saldo no dashboard
function updateBalanceDisplay() {
  document.getElementById(
    "account-balance"
  ).textContent = `R$ ${accountBalance.toFixed(2)}`;
}

// Função para atualizar o histórico de transações
function updateTransactionHistory() {
  const transactionList = document.getElementById("transaction-list");
  transactionList.innerHTML = ""; // Limpa o histórico antes de atualizar

  transactionHistory.forEach((transaction) => {
    const li = document.createElement("li");
    li.textContent = transaction;
    transactionList.appendChild(li);
  });
}
