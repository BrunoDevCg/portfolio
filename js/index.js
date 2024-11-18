// Seleção e manipulação do menu e da barra de navegação
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Links ativos de acordo com a seção visível na rolagem
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector(`header nav a[href*=${id}]`).classList.add('active');
            });
        }
    });

    // Tornando o header fixo ao rolar
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    // Removendo classes de menu e navbar ao rolar
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};


// btn mudar thema
const toggleSwitch = document.getElementById('toggleSwitch');
const body = document.body;

toggleSwitch.addEventListener('click', function() {
  if (toggleSwitch.classList.contains('day')) {
    toggleSwitch.classList.remove('day');
    toggleSwitch.classList.add('night');

    // Definindo as cores do tema escuro
    body.style.setProperty('--bg-color', '#1f242d');
    body.style.setProperty('--second-bg-color', '#292d35');
    body.style.setProperty('--text-color', '#fff');
    body.style.setProperty('--main-color', 'rgb(0, 110, 255)');
    
    // Aplicando o fundo diretamente
    body.style.backgroundColor = 'var(--bg-color)';
  } else {
    toggleSwitch.classList.remove('night');
    toggleSwitch.classList.add('day');

    // Definindo as cores do tema claro
    body.style.setProperty('--bg-color', '#fff');
    body.style.setProperty('--second-bg-color', '#f4f4f4');
    body.style.setProperty('--text-color', '#333');
    body.style.setProperty('--main-color', 'rgb(0, 110, 255)');

    // Aplicando o fundo diretamente
    body.style.backgroundColor = 'var(--bg-color)';
  }
});


// efeito digitação
const phrases = [    
    "Desenvolvedor de Software",
    "Analista de Sistemas"    ,
    "Tecnico Suporte de TI"
];

const typingText = document.getElementById("typing-text");
let phraseIndex = 0; 
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 50; 
const deletingSpeed = 35; 
const pauseBetweenPhrases = 2000; 

function type() {
    const currentPhrase = phrases[phraseIndex]; 

    if (isDeleting) {
        // Apaga o texto
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;

        // Quando terminar de apagar, muda para a próxima frase
        if (charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length; 
            setTimeout(type, typingSpeed);
        } else {
            setTimeout(type, deletingSpeed);
        }
    } else {
        // Digita o texto
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;

        // Quando terminar de digitar, espera e depois começa a apagar
        if (charIndex === currentPhrase.length) {
            isDeleting = true;
            setTimeout(type, pauseBetweenPhrases);
        } else {
            setTimeout(type, typingSpeed);
        }
    }
}

document.addEventListener("DOMContentLoaded", () => type());
//




// Função para botão de rolagem para o topo
document.addEventListener('DOMContentLoaded', () => {
    const scrollToTopBtn = document.querySelector('#scrollToTopBtn');

    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', (event) => {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});

// Alternância de tema claro/escuro
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('toggle-switch');
    const currentTheme = localStorage.getItem('theme') || 'light';

    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggleBtn.textContent = 'Modo Claro';
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        themeToggleBtn.textContent = 'Modo Escuro';
    }

    themeToggleBtn.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            themeToggleBtn.textContent = 'Modo Escuro';
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggleBtn.textContent = 'Modo Claro';
            localStorage.setItem('theme', 'dark');
        }
    });
});

// Configuração de animações ScrollReveal
ScrollReveal({ 
    reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });


