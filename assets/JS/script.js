const inputCPF = document.querySelector('.cpf-text');
const botaoGerar = document.querySelector('.gerar');
const botaoCopiar = document.querySelector('.copiar');
const botaoGerarCopiar = document.querySelector('.gerar-copiar');
const checkboxMask = document.querySelector('.check-mask');

class GeradorCPF{
    constructor(){
        document.getElementById('cpf-text').readOnly = true;
        this.exibir();
        this.checkAcao();
        botaoGerar.addEventListener('click', e=> {
           this.exibir();
        })
        botaoCopiar.addEventListener('click', e=>{
            this.copiar();
        })

        botaoGerarCopiar.addEventListener('click', e=>{
            this.exibir();
            this.copiar();
        })


    }

    exibir(){
        const inputCPF = document.querySelector('.cpf-text')
        inputCPF.value = this.gerarCPF();
        this.mascarar();
    }

    copiar(){
        const texto = inputCPF.value;
        navigator.clipboard.writeText(texto)
    }

    mascarar(){
        if(checkboxMask.checked){
            const textInput = inputCPF.value;
            const cpfWithMask = textInput.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
            inputCPF.value = cpfWithMask;
        } else{
            const textInput = inputCPF.value;
            const cpfWithoutMask = textInput.replace(/\D/g, '');
            inputCPF.value = cpfWithoutMask
        }
    }

    checkAcao(){
        checkboxMask.addEventListener('change', e=> {
           this.mascarar();
        })
    }
    gerarCPF(){
        const numeros = this.gerarNumeros();
        const digitoUm = this.gerarDigito(numeros)
        const digitoDois = this.gerarDigito(numeros + digitoUm)

        return numeros+digitoUm+digitoDois;
    }

    gerarDigito(cpfSemDigitos){
        let total = 0;
        let tamanho = cpfSemDigitos.length+1;

        for (let numero of cpfSemDigitos){
            total += tamanho * Number(numero)
            --tamanho;
        }
        const numeroParaSubtrair = total % 11;
        return numeroParaSubtrair < 2 ? "0" : String(11-numeroParaSubtrair)
    }

    gerarNumeros(){
        let numbers;
        do{
        numbers = [];
        for(let x=1; x<=9; x++){
            const randomNumber = this.randomIntFromInterval(0,9);
            numbers.push(randomNumber);
        }
    } while(numbers.filter(num => num === numbers[0]).length === 9);
        const numerosString = numbers.join('');
        return numerosString;
    }

    randomIntFromInterval(min, max) { 
        return Math.floor(Math.random() * (max - min + 1) + min);
      }
}

const gerar = new GeradorCPF();