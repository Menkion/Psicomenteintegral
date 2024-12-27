const cartas = [
    { nombre: "As de Corazones", descripcion: "El inicio de algo maravilloso.", imagen: "images/as_corazones.png" },
    { nombre: "Rey de Espadas", descripcion: "La sabiduría y la estrategia te guían.", imagen: "images/rey_espadas.png" },
    { nombre: "Reina de Oros", descripcion: "La abundancia está de tu lado.", imagen: "images/reina_oros.png" },
    { nombre: "Jota de Tréboles", descripcion: "Una sorpresa está en camino.", imagen: "images/jota_treboles.png" },
  ];
  
  const deck = document.getElementById("deck");
  const cardsContainer = document.getElementById("cardsContainer");
  const cardDisplay = document.getElementById("cardDisplay");
  
  deck.addEventListener("click", () => {
    cardsContainer.innerHTML = ""; // Limpiar contenedor
    cardsContainer.style.opacity = "1";
  
    const shuffledCards = shuffleArray(cartas);
    shuffledCards.forEach((carta, index) => {
      const card = document.createElement("div");
      card.className = "card";
      card.dataset.index = index;
  
      // Añadir caras de la carta
      const front = document.createElement("div");
      front.className = "front";
      front.style.backgroundImage = `url(${carta.imagen})`;
  
      const back = document.createElement("div");
      back.className = "back";
  
      card.appendChild(front);
      card.appendChild(back);
  
      // Posición inicial en el mazo (esquina inferior derecha)
      card.style.position = "absolute"; // Asegurar que la posición es absoluta
      card.style.right = "0px"; // Ajusta la posición del mazo a la derecha
      card.style.bottom = "0px"; // Posiciona las cartas justo sobre el mazo
  
      // Animación de despliegue desde el mazo hacia la fila
      setTimeout(() => {
        card.style.transition = "right 0.6s ease"; // Usamos 'right' para mover las cartas
        card.style.right = `${160 + index * 50}px`; // Cartas se distribuyen hacia la izquierda desde la derecha
        card.style.bottom = "0px"; // Dejan un pequeño espacio debajo del mazo
      }, 300);
  
      cardsContainer.appendChild(card);
    });
  });
  
  // Evento para revelar carta
  cardsContainer.addEventListener("click", (event) => {
    if (event.target.closest(".card")) {
      const card = event.target.closest(".card");
      const index = card.dataset.index;
      const carta = cartas[index];
  
      // Mover las cartas restantes al mazo antes de mostrar la carta seleccionada
      const allCards = document.querySelectorAll(".card");
      allCards.forEach((otherCard) => {
        if (otherCard !== card) {
          // Mueve las cartas restantes hacia el mazo
          otherCard.style.transition = "right 0.8s ease, bottom 0.8s ease";
          otherCard.style.right = "0px"; // Mueve al mazo
          otherCard.style.bottom = "0px"; // Posiciona justo sobre el mazo
        }
      });
  
      // Calcular el desplazamiento hacia la zona de revelación
      const cardDisplayRect = cardDisplay.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      const translateX = cardDisplayRect.left - cardRect.left;
      const translateY = cardDisplayRect.top - cardRect.top;
  
      // Aplicar animación de movimiento hacia la zona fija de revelación
      card.style.transition = "transform 0.8s ease, right 0.8s ease, bottom 0.8s ease";
      card.style.transform = `translate(${translateX}px, ${translateY}px) rotateY(180deg)`;
  
      // Mostrar el área de revelación inmediatamente, pero solo cuando termine el movimiento
      cardDisplay.style.visibility = "visible"; // Hazlo visible al comenzar la animación de la carta
  
      setTimeout(() => {
        // Mostrar el área de revelación
        cardDisplay.style.visibility = "visible"; // Mostrar el contenedor
      
        // Crear un contenedor para el nombre y la descripción
        const cardInfoContainer = document.createElement("div");
        cardInfoContainer.className = "card-info-container"; // Clase para aplicar estilos
      
        // Insertar nombre y descripción dentro del contenedor
        cardInfoContainer.innerHTML = `
          <p class="card-name">${carta.nombre}</p>
          <p class="card-description">${carta.descripcion}</p>
        `;
      
        // Agregar el contenedor al área independiente para la información
        document.getElementById("cardInfoContainer").innerHTML = cardInfoContainer.innerHTML; // Agregar al contenedor fuera de cardDisplay
      
      }, 800); // Después de la animación de la carta
       // Después de la animación de la carta
       // Esperamos el tiempo de la animación para agregar los detalles de la carta
    }
  });
  
  // Función para mezclar cartas
  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }
  