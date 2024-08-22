// toggle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// scroll sections active link
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

    // navbar stick
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

function mascaraTelef(event) {
    let input = event.target;
    let value = input.value.replace(/\D/g, '');

    if (value.length > 11) {
        value = value.slice(0, 11);
    }

    if (value.length > 10) {
        value = value.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4');
    } else if (value.length > 5) {
        value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else if (value.length > 2) {
        value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
    } else {
        value = value.replace(/(\d{0,2})/, '($1');
    }

    input.value = value;

    // Remove parênteses, espaço e hífen ao apagar os números
    if (input.value === '(' || input.value === '() ' || input.value === '()') {
        input.value = '';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Seleciona o botão de rolar para o topo
    const scrollToTopBtn = document.querySelector('#scrollToTopBtn');

    // Verifica se o botão foi encontrado
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', (event) => {
            event.preventDefault(); // Previne o comportamento padrão do link
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // Adiciona o efeito de rolagem suave
            });
        });
    }

    // Função para carregar o JSON de idioma
    async function loadTranslations(language) {
        const response = await fetch(`languages/${language}.json`);
        const translations = await response.json();
        return translations;
    }

    const languageToggle = document.getElementById('language-toggle');
    const elementsToTranslate = document.querySelectorAll('[data-key]');
    let currentLang = 'pt-br'; // idioma padrão

    const loadLanguage = async (lang) => {
        try {
            const translations = await loadTranslations(lang);

            // Atualiza o conteúdo das tags com data-key
            elementsToTranslate.forEach(element => {
                const key = element.getAttribute('data-key');
                if (translations[key]) {
                    element.innerHTML = translations[key];
                }
            });

            // Atualiza os placeholders dos campos de formulário
            document.querySelectorAll('[data-key]').forEach(element => {
                const key = element.getAttribute('data-key');
                if (translations[key] && (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA')) {
                    element.setAttribute('placeholder', translations[key]);
                }
            });

            // Atualiza o atributo data-lang do botão para refletir o idioma atual
            languageToggle.setAttribute('data-lang', lang);
            languageToggle.textContent = lang === 'pt-br' ? 'EN' : 'PT-BR';

        } catch (error) {
            console.error('Erro ao carregar o idioma:', error);
        }
    };

    languageToggle.addEventListener('click', () => {
        currentLang = currentLang === 'pt-br' ? 'en' : 'pt-br';
        loadLanguage(currentLang);
    });

    // Carrega o idioma padrão ao inicializar
    loadLanguage(currentLang);
});

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



ScrollReveal({ 
    reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200


});


ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
