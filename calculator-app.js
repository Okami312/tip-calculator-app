const form = document.querySelector(".calculator-container form");
const amountInput = document.querySelector(".amount-input");
const customTipInput = document.querySelector(".custom-tip-input");
const numberOfPeopleInput = document.querySelector(".number-of-people-input");

const amountInputError = document.querySelector(".amount-input-error");
const numberOfPeopleInputError = document.querySelector(
  ".number-of-people-input-error"
);

const totalPerPersonElement = document.querySelector(".total-per-person");
const tipTotalPerPersonElement = document.querySelector(
  ".amount-total-paragraph"
);

const resetButton = document.querySelector(".reset-button");
const tipButtonsPercent = document.querySelectorAll(".tip-button");

const historyNotAvailable = document.querySelector(".history-not-available");
const historyTable = document.querySelector(".history-table");

let history = [];
let selectedTip = null;

// handle form submit
const handleFormSubmit = (e) => {
  e.preventDefault();

  const amount = Number(amountInput.value);
  const people = Number(numberOfPeopleInput.value);
  let hasError = false;

  // bill amount
  if (amount <= 0) {
    amountInputError.classList.remove("hide");
    amountInputError.style.display = "block";
    hasError = true;
  } else {
    amountInputError.classList.add("hide");
    amountInputError.style.display = "none";
  }

  // number of people
  if (people <= 0) {
    numberOfPeopleInputError.classList.remove("hide");
    numberOfPeopleInputError.style.display = "block";
    hasError = true;
  } else {
    numberOfPeopleInputError.classList.add("hide");
    numberOfPeopleInputError.style.display = "none";
  }

  if (hasError) {
    return;
  }

  const tipAmountTotal = (selectedTip / 100) * amount;
  const totalPerPerson = (amount + tipAmountTotal) / people;
  const tipPerPerson = tipAmountTotal / people;

  // update display amounts
  totalPerPersonElement.innerText = "$" + totalPerPerson.toFixed(2);
  tipTotalPerPersonElement.innerText = "$" + tipPerPerson.toFixed(2);

  resetButton.removeAttribute("disabled");
  historyNotAvailable.classList.add("hide");
  historyTable.classList.remove("hide");

  const historyItemId = Date.now();
  history.push({
    id: historyItemId,
    bill: amount,
    tip: Number(selectedTip),
    people: people,
  });

  createHistoryRow(amount, selectedTip, people, historyItemId);

  updateAverageBillElement();
  updateAverageTipElement();
  updateHighestPriceElement();
};

// tip buttons
const handleSelectTip = (e) => {
  tipButtonsPercent.forEach((btn) => btn.classList.remove("selected-tip"));
  e.target.classList.add("selected-tip");
  customTipInput.value = "";
  selectedTip = Number(e.target.getAttribute("value"));
};

// custom tip
const handleCustomTip = () => {
  // Remove any selected tip button styles
  tipButtonsPercent.forEach((btn) => btn.classList.remove("selected-tip"));
  // Use the value from the custom tip input
  selectedTip = Number(customTipInput.value);
};

// reset from
const handleResetForm = () => {
  amountInput.value = "";
  customTipInput.value = "";
  numberOfPeopleInput.value = "";
  totalPerPersonElement.innerText = "$0.00";
  tipTotalPerPersonElement.innerText = "$0.00";
  resetButton.setAttribute("disabled", "true");
  tipButtonsPercent.forEach((btn) => btn.classList.remove("selected-tip"));
  selectedTip = null;
};

function createHistoryRow(bill, tip, people, id) {
  const tbody = document.querySelector(".history-table tbody");
  const row = document.createElement("tr");
  row.setAttribute("data-history-id", id);

  row.innerHTML = `
    <td>$${bill.toFixed(2)}</td>
    <td>${tip}%</td>
    <td>${people}</td>
    <td>${new Date().toLocaleDateString()}</td>
    <td>
      <button class="delete-history">
        <img src="./assets/delete.svg" alt="Delete" />
      </button>
    </td>
  `;
  tbody.appendChild(row);
}

historyTable.addEventListener("click", (e) => {
  const deleteButton = e.target.closest(".delete-history");
  if (deleteButton) {
    if (confirm("Are you sure? This action is irreversible.")) {
      const row = deleteButton.closest("tr");
      const historyId = row.getAttribute("data-history-id");
      row.remove();
      history = history.filter((item) => item.id != historyId);

      updateAverageBillElement();
      updateAverageTipElement();
      updateHighestPriceElement();
    }
  }
});

// update average bill
function updateAverageBillElement() {
  const averageBillElement = document.querySelector(".average-bill");
  if (history.length === 0) {
    averageBillElement.innerText = "$0.00";
    return;
  }
  let totalBill = 0;
  for (let i = 0; i < history.length; i++) {
    totalBill += history[i].bill;
  }
  let average = totalBill / history.length;
  averageBillElement.innerText = "$" + average.toFixed(2);
}

// update average tip
function updateAverageTipElement() {
  const averageTipElement = document.querySelector(".average-tip");
  if (history.length === 0) {
    averageTipElement.innerText = "$0.00";
    return;
  }
  let totalTip = 0;
  for (let i = 0; i < history.length; i++) {
    totalTip += history[i].tip;
  }
  let average = totalTip / history.length;
  averageTipElement.innerText = "$" + average.toFixed(2);
}

// update highest bill
function updateHighestPriceElement() {
  const highestPriceElement = document.querySelector(".most-highest-price");
  if (history.length === 0) {
    highestPriceElement.innerText = "$0.00";
    return;
  }
  let highest = 0;
  for (let i = 0; i < history.length; i++) {
    if (history[i].bill > highest) {
      highest = history[i].bill;
    }
  }
  highestPriceElement.innerText = "$" + highest.toFixed(2);
}

// event listeners
form.addEventListener("submit", handleFormSubmit);
tipButtonsPercent.forEach((btn) =>
  btn.addEventListener("click", handleSelectTip)
);
customTipInput.addEventListener("input", handleCustomTip);
resetButton.addEventListener("click", handleResetForm);
