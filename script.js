const form = document.querySelector(".calculator-container form");
const amountInputError = document.querySelector(".amount-input-error");
const tipSelector = document.querySelector(".select-tip");
const totalPerPersonElement = document.querySelector(".total-per-person");

let selectedTip;

const handleFormSubmit = (e) => {
  e.preventDefault();
  console.log(e);

  const data = new FormData(e.target);
  const amount = Number(data.get("amount"));
  const numberOfPeople = Number(data.get("number-of-people"));

  if (amount <= 0) {
    amountInputError.style.display = "block";
    return;
  } else {
    amountInputError.style.display = "none";
  }

  // const numberOfPeople = Number(data.get("number-of-people"));
  const totalPerPerson =
    (amount + (selectedTip / 100) * amount) / numberOfPeople;
  totalPerPersonElement.innerText = "$" + totalPerPerson.toFixed(2);

  const tipAmount = amount * tipPercentage;
  const tipPerPerson =
    numberOfPeople > 0 ? tipAmount / numberOfPeople : tipAmount;

  console.log(`Total Tip: ${tipAmount}, Tip per person: ${tipPerPerson}`);
  resetButton.removeAttribute("disabled");
  //   console.log(typeof data.get("amount"));
};

let tipPercentage = 0;

const handleTipSelection = (e) => {
  if (e.target.tagName.toLowerCase() === "button") {
    const tipText = e.target.textContent.replace("%", "");
    const tipValue = parseFloat(tipText);
    if (!isNaN(tipValue)) {
      tipPercentage = tipValue / 100;
      console.log(`Tip percentage set to ${tipPercentage}`);
    }
  }
};

form.addEventListener("submit", handleFormSubmit);
tipSelector.addEventListener("click", handleTipSelection);

// tip buttons

const tipButtons = document.querySelectorAll(".tip-button");

const handleSelectTip = (e) => {
  tipButtons.forEach((tipButton) => {
    tipButton.classlist.remove("percentage-button");
  });
  e.target.classlist.add("percentage-button");
  selectedTip = Number(e.target.getAttribute("value"));
};

tipButtons.forEach((tipButton) => {
  tipButton.addEventListener("click", handleSelectTip);
});

// for (let i = 0; i < tipButtons.length; i++) {
//   tipButtons[i].addEventListener("click", handleSelectTip);
// }

// custom tip input
const customTipInput = document.querySelector(".custom-tip-input");

const handleCustomTip = () => {
  tipButtons.forEach((tipButton) => {
    tipButton.classlist.remove("percentage-button");
  });

  // selectedTip = Number(customTipInput.value);
  // const selectedTipButton = document.querySelector(".percentage-button");
  // if (selectedTipButton !== null) {
  //   selectedTipButton.classlist.remove("percentage-button");
  // }
};

customTipInput.addEventListener("input", handleCustomTip);

const resetButton = document.querySelector(".reset-button");
const handleResetForm = () => {};

resetButton.addEventListener("click", handleResetForm);
