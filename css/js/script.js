document.addEventListener("DOMContentLoaded", function () {
  const rifaGrid = document.querySelector(".rifa-grid");
  const selectedSpan = document.getElementById("selected");
  const whatsappButton = document.getElementById("whatsapp-button");
  const selectedNumbers = new Set();
  const phoneNumber = "5511999999999"; // Substitua pelo número correto

  // Números já escolhidos
  const unavailableNumbers = [
    1, 2, 3, 5, 6, 7, 8, 9, 10, 12, 13, 17, 19, 20, 22, 23, 24, 25, 26, 27, 30,
    31, 33, 40, 46,
  ];

  // Criar os números da rifa
  for (let i = 1; i <= 50; i++) {
    const numberBox = document.createElement("div");
    numberBox.className = "number-box";
    const formattedNumber = i.toString().padStart(2, "0");

    if (unavailableNumbers.includes(i)) {
      numberBox.classList.add("unavailable");
      numberBox.innerHTML = `${formattedNumber} 🦁`;
    } else {
      numberBox.textContent = formattedNumber;
      numberBox.addEventListener("click", () => {
        if (numberBox.classList.contains("selected")) {
          numberBox.classList.remove("selected");
          selectedNumbers.delete(i);
        } else {
          numberBox.classList.add("selected");
          selectedNumbers.add(i);
        }

        updateSelectedNumbers();
      });
    }

    rifaGrid.appendChild(numberBox);
  }

  function updateSelectedNumbers() {
    const numbersArray = Array.from(selectedNumbers).sort((a, b) => a - b);
    selectedSpan.textContent = numbersArray
      .map((num) => num.toString().padStart(2, "0"))
      .join(", ");

    whatsappButton.disabled = selectedNumbers.size === 0;
  }

  whatsappButton.addEventListener("click", () => {
    const numbersArray = Array.from(selectedNumbers).sort((a, b) => a - b);
    const message = `Quero escolher esses números (${numbersArray
      .map((num) => num.toString().padStart(2, "0"))
      .join(", ")}) na rifa do Bentinho 🦁`;

    const whatsappUrl = `https://wa.me/${+5581996488878}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  });
});
