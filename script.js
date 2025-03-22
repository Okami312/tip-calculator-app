const form = document.querySelector(".calculator-container form");
const amountInputError = document.querySelector(".amount-input-error");

const handleFormSubmit = (e) => {
  e.preventDefault();
  console.log(e);

  const data = new FormData(e.target);
  const amount = Number(data.get("amount"));
  if (amount <= 0) {
    amountInputError.style.display = "block";
  } else {
    amountInputError.style.display = "none";
  }
  //   console.log(typeof data.get("amount"));
};

form.addEventListener("submit", handleFormSubmit);
