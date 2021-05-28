function criaController(jogo) {
    
    const $entrada = $('.entrada');
    const $lacunas = $('.lacunas');

    function exibeLacunas() {
        $lacunas.empty();
        jogo.getLacunas().forEach((lacuna) => {
            const li = $('<li>');
            li.addClass('lacuna').text(lacuna).appendTo($lacunas);
        });
    }

    function mudaPlaceHolder(texto) {
        $entrada.attr('placeholder', texto);
    }

    function guardaPalavraSecreta() {
        try {
            jogo.setPalavraSecreta($entrada.val().trim());
            $entrada.val('');
            mudaPlaceHolder('chute');
            exibeLacunas();
        } catch (error) {
            alert(error.menssage);
        }
        
    }

    function leChute() {

        try {
            let chute = $entrada.val().trim().substr(0, 1);
            jogo.verificaChute(chute);
            $entrada.val('');
            exibeLacunas();

            if(jogo.ganhouOuPerdeu()) {
                const divResultado = $('#resultado');
                const pResultado =  $('<p>');
                let texto;

                if(jogo.ganhou()){
                    texto = `Você Ganhou. Parabens!`
                    $('<p>').addClass('resultado').text(texto).appendTo(divResultado);
                }
                else if(jogo.perdeu()){
                    texto = `Você perdeu. Tente novamente`
                    pResultado.addClass('resultado').text(texto).appendTo(divResultado);
                }
        
                const input = $('<input>').attr({'type': 'button', 'value': 'Reiniciar'});
                input.addClass('botaoResultado').appendTo(divResultado);
                input.click('click', () => {
                    reinicia();
                });
            }
        } catch (error) {
            alert(error.message);
        }
    }

    function inicia() {
        $entrada.keypress((event) => {
            
            if(event.which == 13){
                switch (jogo.getEtapa()) {
                    case 1:
                        guardaPalavraSecreta();
                        break;
                    case 2:
                        leChute();
                        break;
                }
            }
        });
    }
    
    function reinicia() {
        $lacunas.empty();
        mudaPlaceHolder('Palavra Secreta');
        jogo.reinicia();
        $('.resultado').remove();
        $('.botaoResultado').remove();
    }

    return {
        inicia
    };
}