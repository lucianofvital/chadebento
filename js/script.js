document.addEventListener("DOMContentLoaded", function () {
  const rifaGrid = document.querySelector(".rifa-grid");
  const selectedSpan = document.getElementById("selected");
  const whatsappButton = document.getElementById("whatsapp-button");
  const selectedNumbers = new Set();
  const phoneNumber = "5511999999999"; // Substitua pelo número correto

  // Criar os números da rifa
  for (let i = 1; i <= 50; i++) {
    const numberBox = document.createElement("div");
    numberBox.className = "number-box";
    numberBox.textContent = i.toString().padStart(2, "0");

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
    const message = `Olá! Gostaria de confirmar os seguintes números para o Chá de Fraldas do Bento: ${numbersArray
      .map((num) => num.toString().padStart(2, "0"))
      .join(", ")}`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  });
});
