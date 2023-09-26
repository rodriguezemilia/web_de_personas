document.addEventListener('DOMContentLoaded', () => {
  const modoBtn = document.getElementById('modoBtn');
  const body = document.body;
  const personContainer = document.getElementById('personContainer'); // Cambiado el nombre a 'personContainer'
  const searchInput = document.getElementById('searchInput');

  // Verificar localStorage para establecer el modo inicial
  const modoActual = localStorage.getItem('modo');
  if (modoActual) {
    body.classList.add(modoActual);
  }

  // Función para cargar personas desde la API
  async function cargarPersonas() {
    try {
      const response = await fetch(
        'https://api.npoint.io/e286c114a2b16489dd0b'
      );
      const data = await response.json();

      // Limpiar el contenedor de personas
      personContainer.innerHTML = '';

      // Crear una tarjeta para cada persona
      data.forEach((persona) => {
        const card = document.createElement('div');
        card.classList.add('card');

        const cardContent = `
              <h2>${persona.name}</h2>
              <p>Ciudad: ${persona.country}</p>
              <p>Teléfono: ${persona.phone}</p>
          `;

        card.innerHTML = cardContent;
        personContainer.appendChild(card);
      });
    } catch (error) {
      console.error('Error al cargar personas:', error);
    }
  }

  // ...

  cargarPersonas();

  // Función para alternar entre los modos "Día" y "Noche"
  const switchButton = document.getElementById('switch');
  switchButton.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    switchButton.classList.toggle('active');
  });

  // ...

  // Función para buscar personas por dato
  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const personas = personContainer.querySelectorAll('.card h2');

    Array.from(personas).forEach((persona) => {
      const texto = persona.textContent.toLowerCase();
      const card = persona.closest('.card');
      if (texto.includes(searchTerm)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});
