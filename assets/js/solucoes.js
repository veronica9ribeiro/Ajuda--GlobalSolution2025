// Controle dos players de vídeo
document.addEventListener('DOMContentLoaded', function() {
    const players = document.querySelectorAll('iframe');
    
    // Pausa outros vídeos quando um começa a tocar
    players.forEach(player => {
        player.addEventListener('play', function() {
            players.forEach(p => {
                if (p !== player) {
                    p.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
                }
            });
        });
    });
    
    // Adiciona classe de carregamento
    players.forEach(player => {
        player.addEventListener('load', function() {
            this.classList.add('loaded');
        });
    });
});