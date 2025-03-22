const form = document.querySelector(".calculator-container form");
const amountInputError = document.querySelector(".amount-input-error");
const tipSelector = document.querySelector(".select-tip");

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

  const tipAmount = amount * tipPercentage;
  const tipPerPerson =
    numberOfPeople > 0 ? tipAmount / numberOfPeople : tipAmount;

  console.log(`Total Tip: ${tipAmount}, Tip per person: ${tipPerPerson}`);
  //   console.log(typeof data.get("amount"));
};

form.addEventListener("submit", handleFormSubmit);
tipSelector.addEventListener("click", handleTipSelection);
