// 1. Generador de Partículas de Fondo (Corazones y Destellos)
const particlesContainer = document.getElementById('particles');
const symbols = ['🌸', '✨', '💗', '🎀', '⭐', '🧁'];

function createParticle() {
  const particle = document.createElement('div');
  particle.classList.add('particle');
  particle.innerText = symbols[Math.floor(Math.random() * symbols.length)];
  particle.style.left = Math.random() * 100 + 'vw';
  particle.style.animationDuration = (Math.random() * 4 + 6) + 's';
  particle.style.fontSize = (Math.random() * 12 + 16) + 'px';
  
  particlesContainer.appendChild(particle);

  setTimeout(() => {
    particle.remove();
  }, 10000);
}

setInterval(createParticle, 500);

// 2. Sistema de Lectura por Voz (Text-to-Speech)
let synth = window.speechSynthesis;
let utterance = null;
let isReading = false;

function toggleReadLetter() {
  const btn = document.getElementById('playBtn');
  const icon = document.getElementById('audioIcon');
  const text = document.getElementById('audioText');

  if (isReading) {
    synth.cancel();
    isReading = false;
    btn.classList.remove('playing');
    icon.className = 'fa-solid fa-volume-high';
    text.innerText = 'Escuchar la carta';
  } else {
    // Obtener el texto legible
    const letterContent = document.getElementById('letterText').innerText;
    
    utterance = new SpeechSynthesisUtterance(letterContent);
    utterance.lang = 'es-ES'; // Idioma español
    utterance.rate = 0.9; // Velocidad suave
    utterance.pitch = 1.1; // Tono cálido

    // Seleccionar una voz preferente si existe
    const voices = synth.getVoices();
    const spanishVoice = voices.find(v => v.lang.includes('es') && (v.name.includes('Monica') || v.name.includes('Paulina') || v.name.includes('Google spanish') || v.name.includes('Luciana')));
    if (spanishVoice) {
      utterance.voice = spanishVoice;
    }

    utterance.onend = function() {
      isReading = false;
      btn.classList.remove('playing');
      icon.className = 'fa-solid fa-volume-high';
      text.innerText = 'Escuchar la carta';
    };

    synth.speak(utterance);
    isReading = true;
    btn.classList.add('playing');
    icon.className = 'fa-solid fa-pause';
    text.innerText = 'Pausar lectura';
  }
}

// 3. Efectos interactivos adicionales
function createConfetti() {
  for (let i = 0; i < 15; i++) {
    createParticle();
  }
}

function openModal() {
  document.getElementById('surpriseModal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('surpriseModal').style.display = 'none';
}

// Carga previa de voces
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = () => {};
}

// Objeto con los párrafos motivacionales y de celebración para cada ícono
const stickerMessages = {
  kitty: {
    icon: '🎀',
    title: '¡Celebra tu existencia, Daya!',
    text: 'Hoy celebramos el regalo maravilloso que es tenerte en nuestras vidas. Que este nuevo año esté lleno de risas contagiosas, abrazos apretados y razones de sobra para festejar cada pequeño logro. ¡Brilla con toda tu luz porque te mereces un año verdaderamente mágico!'
  },
  melody: {
    icon: '🐰',
    title: '¡Sigue transmitiendo dulzura y luz!',
    text: 'Nunca pierdas esa esencia tan bonita y amable que te caracteriza. Tu presencia llena de calidez los lugares a los que llegas y alegras los corazones de quienes te rodean. Que la vida siempre te devuelva multiplicado todo el cariño y la bondad que entregas al mundo.'
  },
  kuromi: {
    icon: '🖤',
    title: '¡Tu fuerza e independencia son gigantes!',
    text: 'Recuerda siempre lo increíblemente fuerte, capaz y valiente que eres. Ningún obstáculo ni día difícil puede apagar tus ganas de salir adelante. Confía plenamente en tu potencial, persigue tus metas sin dudarlo y recuerda que tienes el poder de conquistar todo lo que te propongas.'
  },
  cinnamoroll: {
    icon: '☁️',
    title: '¡Vuela alto y cumple todos tus sueños!',
    text: 'Que tus sueños nunca tengan techo ni límites. Deseo que este año esté lleno de paz en tu corazón, viajes memorables, proyectos exitosos y la certeza de que naciste para lograr cosas grandes. ¡Sigue volando alto y haciendo realidad cada uno de tus anhelos!'
  }
};

// Función para desplegar el modal con el mensaje correspondiente
function showStickerMessage(stickerType) {
  const data = stickerMessages[stickerType];
  if (data) {
    document.getElementById('stickerIcon').innerText = data.icon;
    document.getElementById('stickerTitle').innerText = data.title;
    document.getElementById('stickerMessage').innerText = data.text;
    
    // Lluvia extra de destellos al hacer clic
    for (let i = 0; i < 12; i++) {
      createParticle();
    }
    
    document.getElementById('stickerModal').style.display = 'flex';
  }
}

// Cierre dinámico de modales
function closeModal(modalId) {
  // Si no se pasa un ID específico, cierra el modal de abrazo por defecto
  const idToClose = modalId || 'surpriseModal';
  const modalElement = document.getElementById(idToClose);
  
  if (modalElement) {
    modalElement.style.display = 'none';
  }
}