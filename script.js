document.getElementById("clear-all").addEventListener("click", () => {
  // Reset the entire form
  document.getElementById("mortgage-form").reset();

  // Uncheck all mortgage type inputs (in case browser doesn't fully reset radios)
  document.querySelectorAll(".mortgage-type-inp").forEach((inputElement) => {
    inputElement.checked = false;
  });

  // Remove any 'selected' classes from the mortgage type labels
  document.querySelectorAll(".radio-div p").forEach((element) => {
    element.classList.remove("selected");
  });

  // Optionally hide the results and show the empty state
  document.querySelector(".col-right.completed").classList.remove("show");
  document.querySelector(".col-right.empty-result").classList.add("show");

  // Clear any alerts (if they are shown)
  document.querySelectorAll(".form-alert").forEach(alert => {
    alert.style.display = "none";

    document.querySelectorAll(".radio-div p").forEach((element) => {
  element.classList.remove("selected");
});

  });
});

// Add selected class to the chosen radio input wrapper
document.querySelectorAll(".mortgage-type-inp").forEach((inputElement) => {
  inputElement.addEventListener("change", function () {
    // First, remove 'selected' class from all radio wrappers
    document.querySelectorAll(".radio-div p").forEach((wrapper) => {
      wrapper.classList.remove("selected");
    });

    // Add 'selected' class to the parent <p> of the checked input
    if (this.checked) {
      this.parentElement.classList.add("selected");
    }
  });
});
