// Show empty screen initially
document.querySelector(".col-right.empty-result").classList.add("show");
document.querySelector(".col-right.completed").classList.add("hide");

// Clear All button functionality
document.getElementById("clear-all").addEventListener("click", () => {
  // Reset form
  document.getElementById("mortgage-form").reset();

  // Uncheck mortgage type radios
  document.querySelectorAll(".mortgage-type-inp").forEach((inputElement) => {
    inputElement.checked = false;
  });

  // Remove selected class from radio wrappers
  document.querySelectorAll(".radio-div p").forEach((element) => {
    element.classList.remove("selected");
  });

  // Hide results, show empty screen
  document.querySelector(".col-right.completed").classList.remove("show");
  document.querySelector(".col-right.completed").classList.add("hide");

  document.querySelector(".col-right.empty-result").classList.add("show");
  document.querySelector(".col-right.empty-result").classList.remove("hide");

  // Hide any alerts
  document.querySelectorAll(".form-alert").forEach((alert) => {
    alert.style.display = "none";
  });

  // Remove dynamic mortgage type alert if present
  const radioAlert = document.querySelector(".radio-div .form-alert");
  if (radioAlert) radioAlert.remove();
});

// Add selected class when mortgage type is selected
document.querySelectorAll(".mortgage-type-inp").forEach((inputElement) => {
  inputElement.addEventListener("change", function () {
    document.querySelectorAll(".radio-div p").forEach((wrapper) => {
      wrapper.classList.remove("selected");
    });
    if (this.checked) {
      this.parentElement.classList.add("selected");
    }
  });
});

// Calculate Repayments button functionality
document.querySelector(".calculate-repayments").addEventListener("click", function (e) {
  e.preventDefault(); // Prevent form submission

  // Get input fields
  const amount = document.getElementById("mortgage-amount");
  const term = document.getElementById("mortgage-term");
  const rate = document.getElementById("interest-rate");
  const mortgageType = document.querySelector('input[name="mortgage-type"]:checked');

  let isValid = true;

  // Clear all alerts
  document.querySelectorAll(".form-alert").forEach((alert) => {
    alert.style.display = "none";
  });

  // Remove dynamic mortgage type alert if exists
  const prevAlert = document.querySelector(".radio-div .form-alert");
  if (prevAlert) prevAlert.remove();

  // Validate each field
  if (!amount.value.trim()) {
    amount.closest(".form-item").querySelector(".form-alert").style.display = "block";
    isValid = false;
  }

  if (!term.value.trim()) {
    term.closest(".term-item").querySelector(".form-alert").style.display = "block";
    isValid = false;
  }

  if (!rate.value.trim()) {
    rate.closest(".rate-item").querySelector(".form-alert").style.display = "block";
    isValid = false;
  }

  if (!mortgageType) {
    const radioContainer = document.querySelector(".radio-div");
    const alert = document.createElement("p");
    alert.textContent = "Please select a mortgage type.";
    alert.classList.add("form-alert");
    alert.style.color = "red";
    radioContainer.appendChild(alert);
    isValid = false;
  }

  // Proceed if all valid
  if (isValid) {
    const principal = parseFloat(amount.value);
    const annualRate = parseFloat(rate.value);
    const years = parseInt(term.value);
    const type = mortgageType.value;

    const monthlyRate = annualRate / 12 / 100;
    const totalMonths = years * 12;
    let monthlyRepayment = 0;
    let totalRepayment = 0;

    if (type === "repayment") {
      monthlyRepayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1);
      totalRepayment = monthlyRepayment * totalMonths;
    } else if (type === "interest-only") {
      monthlyRepayment = principal * monthlyRate;
      totalRepayment = monthlyRepayment * totalMonths;
    }

    monthlyRepayment = monthlyRepayment.toFixed(2);
    totalRepayment = totalRepayment.toFixed(2);

    document.querySelector(".calculations").textContent = `$${monthlyRepayment}`;
    document.querySelector(".total-repay").textContent = `$${totalRepayment}`;

    // Switch views
    document.querySelector(".col-right.empty-result").classList.remove("show");
    document.querySelector(".col-right.empty-result").classList.add("hide");

    document.querySelector(".col-right.completed").classList.remove("hide");
    document.querySelector(".col-right.completed").classList.add("show");
  }
});
