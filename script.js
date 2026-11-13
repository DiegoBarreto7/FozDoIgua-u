// Aguarda o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {

    // 1. Rolagem suave para links internos
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Impede o comportamento padrão de pular
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calcula a posição do elemento menos a altura do header fixo
                const headerHeight = document.querySelector('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. Efeito de fade-in ao rolar a página (Intersection Observer)
    const cards = document.querySelectorAll('.card');
    
    // Adiciona a classe inicial em todos os cards
    cards.forEach(card => {
        card.classList.add('fade-in');
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Opcional: parar de observar após aparecer
                // observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1 // Dispara quando 10% do card estiver visível
    });

    cards.forEach(card => {
        observer.observe(card);
    });

    // 3. (Opcional) Log simples para confirmar que o script rodou
    console.log("Site de Foz do Iguaçu carregado com sucesso!");
});