function criaJogo(sprite) {
    let palavraSecreta = '';
    let lacunas = [];
    let etapa = 1;

    function setPalavraSecreta(palavraRecebida) {
        if(!palavraRecebida.trim()) throw Error('Palavra inválida');
        palavraSecreta = palavraRecebida;
        criaLacunas();
        etapa = 2;
    }

    function criaLacunas() {
        lacunas = Array(palavraSecreta.length).fill('');
    }
    
    function getLacunas() {
        return lacunas;
    }

    function getEtapa() {
        return etapa;
    }

    function verificaChute(chute) {
        if(!chute.trim()) throw Error('Chute inválido');
        const exp = new RegExp(chute, 'gi'); 
        let resultado;
        let acertou = false;

        while (resultado = exp.exec(palavraSecreta)) acertou = lacunas[resultado.index] = chute;
        if (!acertou) sprite.nextFrame();
    }

    function ganhou() {
        return lacunas.length
            ? !lacunas.some((lacuna) =>{
            return lacuna === '';})
            : false;
    }

    function perdeu() {
       return sprite.isFinished();
    }

    function ganhouOuPerdeu() {
        return ganhou() || perdeu();
    }

    function reinicia() {
        palavraSecreta = '';
        lacunas = [];
        etapa = 1;
        sprite.reset();
    }


    return{
        setPalavraSecreta,
        getLacunas,
        getEtapa,
        verificaChute,
        ganhou,
        perdeu,
        ganhouOuPerdeu,
        reinicia
    };
}