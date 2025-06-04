
// 1. Espera o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {

    // 2. Elementos DOM
    const ctaButton = document.querySelector('.cta-button');
    const benefitCards = document.querySelectorAll('.benefit-card');
    const ctaSection = document.querySelector('.cta-section');

    // 3. Contador de interações (para analytics)
    let interactionCount = 0;

    // 4. Animação dos cards de benefícios
    function animateCards() {
        benefitCards.forEach((card, index) => {
            // Delay escalonado para cada card
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 200 * index);
        });
    }

    // 5. Rastreia clique no botão CTA
    function trackCTAInteraction() {
        interactionCount++;
        console.log(`Interação ${interactionCount}: Botão CTA clicado`);
        
        // Simulação de redirecionamento (substitua pelo link real)
        setTimeout(() => {
            window.location.href = 'formulario.html';
        }, 300);
    }

    // 6. Efeito de parallax na seção
    function setupParallax() {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            ctaSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        });
    }

    // 7. Inicialização
    function init() {
        // Configura estados iniciais
        benefitCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.5s ease-out';
        });

        // Ativa animações
        animateCards();
        setupParallax();

        // Event Listeners
        ctaButton.addEventListener('click', trackCTAInteraction);
    }

    // 8. Executa a inicialização
    init();

});

document.querySelectorAll('.hover-effect').forEach(item => {
    item.addEventListener('click', function() {
        this.style.transform = 'translateY(0)';
        setTimeout(() => {
            this.style.transform = 'translateY(-3px)';
        }, 100);
    });
});