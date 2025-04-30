//Aquele negóço de por o número assim ---> (00) 00000-0000
(function aplicarMascaraTelefone(){
    const telefoneInput = document.getElementsByName("tel")[0];

    if (!telefoneInput) return; // 

    telefoneInput.setAttribute("title", "Somente números"); //avisa o usuário para escrever número
    telefoneInput.setAttribute("maxlength", "15"); // Limite números

    telefoneInput.addEventListener("input", function () {
        let numero = telefoneInput.value.replace(/\D/g, ''); // Remove tudo que não é número

        if (numero.length > 11) {
            numero = numero.slice(0, 11);
        }

        // Aplica a "máscara": (99) 99999-9999 ou (99) 9999-9999
        if (numero.length <= 10) {
            telefoneInput.value = numero.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
        } else {
            telefoneInput.value = numero.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
        }
    });
})();

// Função IMC corrigida
function imc(){
    const formulario = document.getElementsByName("formulario")[0];
    const formDados = new FormData(formulario);
    const paciente = {
        nome: formDados.get("nome"),
        email: formDados.get("email"),
        dataNasc: formDados.get("nasc"),
        telefone: formDados.get("tel"),
        sexo: document.querySelector('input[name=sexo]:checked').value,
        peso: parseFloat(formDados.get("peso")),
        altura: parseFloat(formDados.get("altura")),
        classificacao: "",
        calcularIMC(){
            if (this.altura > 3) this.altura = this.altura / 100;
            const imc = this.peso / (this.altura ** 2);
            if (imc < 18.5) this.classificacao = "Magreza";
            else if (imc < 25) this.classificacao = "Saudável";
            else if (imc < 30) this.classificacao = "Sobrepeso";
            else if (imc < 35) this.classificacao = "Obesidade";
            else if (imc < 40) this.classificacao = "Obesidade Severa";
            else this.classificacao = "Obesidade Mórbida";
            return imc.toFixed(2);
        },
    };
    
    console.log(paciente);
    const imcResultado = paciente.calcularIMC();
    const resposta = document.getElementById('resposta');
    resposta.innerHTML = "Seu IMC é " + imcResultado + ". Sua classificação de peso é: " + paciente.classificacao + ".";
}
//usar ccomentários ajuda bastante
