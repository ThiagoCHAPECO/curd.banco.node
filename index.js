const readline = require('readline');
const { Cadastro, sequelize } = require('./models/Cadastro'); // Importa o modelo e a instância do sequelize

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Função para perguntar ao usuário
function perguntar(pergunta) {
  return new Promise((resolve) => {
    rl.question(pergunta, (resposta) => {
      resolve(resposta);
    });
  });
}

// Função para realizar o cadastro de várias pessoas
async function realizarcadastro(qtdpessoas) {
  await sequelize.sync(); // Sincroniza a tabela, garantindo que ela exista no banco de dados
  for (let i = 1; i <= qtdpessoas; i++) {
    let nome = await perguntar("Digite seu nome: ");
    let idade = await perguntar("Digite sua idade: ");
    let telefone = await perguntar("Digite seu telefone: ");
    let email = await perguntar("Digite seu email: ");
    let rua = await perguntar("Digite sua rua: ");
    let numero = await perguntar("Digite o numero da casa (ou prédio): ");
    let cidade = await perguntar("Digite sua cidade: ");
    let estado = await perguntar("Digite seu estado: ");

    // Cria o cadastro no banco de dados
    await Cadastro.create({
      nome: nome.toLowerCase(),
      idade: parseInt(idade),
      telefone: telefone,
      email: email.toLowerCase(),
      rua: rua.toLowerCase(),
      numero: parseInt(numero),
      cidade: cidade.toLowerCase(),
      estado: estado.toLowerCase()
    });

    console.log("Cadastro realizado com sucesso.");
  }
  return exibirMenu();
}

// Função para buscar um cadastro no banco
async function buscarCadastro() {
  let nome = await perguntar("Escreva o seu nome: ");
  let encontrado = await Cadastro.findOne({ where: { nome: nome.toLowerCase() } });
  if (encontrado) {
    console.log("Cadastro encontrado:", encontrado.toJSON());
  } else {
    console.log("Cadastro não encontrado.");
  }
  return exibirMenu();
}

// Função para listar todos os cadastros
async function listarCadastro() {
  let cadastros = await Cadastro.findAll();
  console.log("Lista de cadastros:");
  cadastros.forEach(cadastro => console.log(cadastro.toJSON()));
  return exibirMenu();
}

// Função para excluir um cadastro do banco
async function excluirCadastro() {
  let nome = await perguntar("Escreva o seu nome: ");
  let deletado = await Cadastro.destroy({ where: { nome: nome.toLowerCase() } });
  if (deletado) {
    console.log("Cadastro deletado com sucesso.");
  } else {
    console.log("Cadastro não encontrado.");
  }
  return exibirMenu();
}

// Função para alterar um cadastro
async function alterarCadastro() {
  let nome = await perguntar("Escreva o seu nome: ");
  let existente = await Cadastro.findOne({ where: { nome: nome.toLowerCase() } });
  if (existente) {
    let novoNome = await perguntar("Digite seu nome: ");
    let idade = parseInt(await perguntar("Digite sua idade: "));
    let telefone = await perguntar("Digite seu telefone: ");
    let email = await perguntar("Digite seu email: ");
    let rua = await perguntar("Digite sua rua: ");
    let numero = parseInt(await perguntar("Digite o numero da casa (ou prédio): "));
    let cidade = await perguntar("Digite sua cidade: ");
    let estado = await perguntar("Digite seu estado: ");

    await Cadastro.update({
      nome: novoNome.toLowerCase(),
      idade,
      telefone,
      email: email.toLowerCase(),
      rua: rua.toLowerCase(),
      numero,
      cidade: cidade.toLowerCase(),
      estado: estado.toLowerCase()
    }, {
      where: { nome: nome.toLowerCase() }
    });

    console.log("Cadastro alterado com sucesso.");
  } else {
    console.log("Cadastro não encontrado.");
  }
  return exibirMenu();
}

// Função para perguntar quantas pessoas serão cadastradas
function totalDeCadastros() {
  rl.question("Quantas pessoas deseja cadastrar? ", async (resposta) => {
    let qtdpessoas = parseInt(resposta);
    if (isNaN(qtdpessoas) || qtdpessoas <= 0) {
      console.log("Por favor, insira um valor válido.");
      return exibirMenu();
    } else {
      await realizarcadastro(qtdpessoas);
    }
  });
}

// Função para exibir o menu de opções
function exibirMenu() {
  console.log("\nEscolha uma opção:");
  console.log("1 - Cadastrar Pessoa");
  console.log("2 - Buscar Pessoa");
  console.log("3 - Listar Pessoas");
  console.log("4 - Excluir Pessoa");
  console.log("5 - Alterar Pessoa");
  console.log("6 - Sair");

  rl.question("Escolha uma opção: ", (opcao) => {
    switch (opcao) {
      case "1":
        totalDeCadastros();
        break;
      case "2":
        buscarCadastro();
        break;
      case "3":
        listarCadastro();
        break;
      case "4":
        excluirCadastro();
        break;
      case "5":
        alterarCadastro();
        break;
      case "6":
        rl.close(); // Fecha o programa
        break;
      default:
        console.log("Opção inválida. Tente novamente.");
        exibirMenu(); // Chama o menu novamente
    }
  });
}

exibirMenu();
// Fecha a interface readline quando o programa terminar