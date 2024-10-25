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




const typingElement = document.getElementById('typing-text');

// Função para carregar o JSON
const loadJSON = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Erro ao carregar o arquivo JSON.');
    }
    return await response.json();
};

// Função para o efeito de digitação
const typeWriter = (text, delay) => {
    typingElement.innerHTML = ''; // Limpa o texto anterior
    let i = 0;

    const typingInterval = setInterval(() => {
        if (i < text.length) {
            typingElement.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(typingInterval);
            // Espera 1 segundo antes de iniciar a próxima digitação
            setTimeout(() => {
                currentIndex = (currentIndex + 1) % roles.length; // Alterna entre os índices
                typeWriter(roles[currentIndex], 100); // Inicia a digitação da próxima frase
            }, 1000); // Tempo de espera antes de começar a próxima digitação
        }
    }, delay);
};

// Variáveis de controle
let roles = [];
let currentIndex = 0;

// Carrega o JSON e inicia o efeito de digitação
loadJSON('../languages/pt-br.json')
    .then(data => {
        roles = [data.home_role, data.home_hole]; // Armazena as frases no array
        typeWriter(roles[currentIndex], 100); // Inicia a digitação
    })
    .catch(error => {
        console.error('Erro:', error);
        typingElement.innerHTML = 'Erro ao carregar as mensagens.';
    });






// Função de máscara para campo de telefone
function mascaraTelef(event) {
    let input = event.target;
    let value = input.value.replace(/\D/g, '');

    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 10) value = value.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4');
    else if (value.length > 5) value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    else if (value.length > 2) value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
    else value = value.replace(/(\d{0,2})/, '($1');

    input.value = value;

    if (input.value === '(' || input.value === '() ' || input.value === '()') input.value = '';
}

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
    const themeToggleBtn = document.getElementById('theme-toggle');
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
