const readline = require('readline');
// importando o módulo readline para ler entradas do usuário no terminal
// e escrever saídas no terminal.
const rl = readline.createInterface({
  input: process.stdin, // Entrada padrão, vem do teclado
  output: process.stdout // Saída padrão, vai para o terminal
});

let fs = require('fs');
// Verifica se o arquivo catalogo.json existe, se não existir, cria um novo
fs.existsSync('catalogo.json') || fs.writeFileSync('catalogo.json', JSON.stringify([]));
// verifica se existe o arquivo catalogo.json,|| verifica se a resposta foi true ou false, caso false cria um array vazio convertido em json

class Livro { 
    constructor(titulo) {
        this.titulo = titulo;
        this.lido = false;
    }

    marcarComoLido() {
        this.lido = true;  // Marca o livro como lido, vou chamar a função no futuro
      }
}

class Catalogo {
    constructor() {
        this.livros = [];
    }

    novoLivro(titulo) {
        this.livros.push(new Livro(titulo));
    }

    listarLivros() {
        if (this.livros.length === 0) {
            console.log("Nenhum livro cadastrado.");
            return;
          }
        this.livros.forEach((livro, index) => {
            console.log(`${index + 1}. ${livro.titulo} - ${livro.lido ? "Lido" : "Não Lido"}`);
        });
    }

    removerLivro(numero){
        const idx = numero - 1;
        if (idx >= 0 && idx < this.livros.length) {
            const removido = this.livros.splice(idx, 1); //indice e quantidade de itens removidos onde o this ja aponta pra Catalogo que contem livros
            console.log(`Livro "${removido[0].titulo}" removido.`)
        } else {
            console.log("Número inválido, nenhum livro removido.")
        }
    }

    marcarLivroComoLido(numero) {
        const idx = numero - 1;
        if (idx >= 0 && idx < this.livros.length) {
          this.livros[idx].marcarComoLido();  // Marca o livro como lido
          console.log(`Livro "${this.livros[idx].titulo}" marcado como Lido.`);
        } else {
          console.log("Número inválido, não foi possível marcar como lido.");
        }
      }
}

function salvarCatalogo(catalogo) {
    fs.writeFileSync('catalogo.json', JSON.stringify(catalogo.livros, null, 2));
    // Salva o catálogo no arquivo catalogo.json, convertendo o array de livros em JSON
    // O segundo parâmetro é null porque não estamos usando uma função de substituição
    // O terceiro parâmetro é para formatar o JSON com 2 espaços de indentação
}

function carregarCatalogo() {
    const dadosArquivo = fs.readFileSync('catalogo.json', 'utf8');
    // Lê o conteúdo do arquivo catalogo.json
    const livros = JSON.parse(dadosArquivo);
    // Converte o conteúdo lido de JSON para um array de objetos Livro
    const catalogo = new Catalogo();
    livros.forEach(livro => {
        const novoLivro = new Livro(livro.titulo);
        novoLivro.lido = livro.lido; // Mantém o estado de lido
        catalogo.livros.push(novoLivro);
    });
    return catalogo;
}

let catalogo = carregarCatalogo(); //O catálogo é carregado ao inicializar o programa, usei let pois vai ser alterado constantemente dentro da classe catalogo
// Carrega o catálogo do arquivo catalogo.json ao iniciar o programa

function verMenuOuNao() {
  console.log("");
  rl.question("Digite \"1\" pra continuar e \"2\" pra sair!: ", (opcao) => {
    switch (opcao.trim()) {
      case '1':
        mostrarMenu();
        break;
      case '2':
        console.log("Saindo...");
        rl.close();
        break;
      default:
        console.log("Opção inválida.");
        verMenuOuNao();
    }
  });
}

function mostrarMenu() {
    console.log("\nMenu:");
    console.log("1. Adicionar novo livro");
    console.log("2. Listar livros");
    console.log("3. Remover livro");
    console.log("4. Marcar livro como lido");
    console.log("5. Sair");
  
    rl.question("Escolha uma opção: ", (opcao) => {
      switch (opcao.trim()) {
        case '1':
          rl.question("Digite o título do livro: ", (titulo) => {
            catalogo.novoLivro(titulo.trim());
            console.log(`Livro "${titulo.trim()}" adicionado!`);
            salvarCatalogo(catalogo);  // Salva o catálogo após adicionar
            verMenuOuNao();
          });
          break;
        case '2':
          catalogo.listarLivros();
          verMenuOuNao();
          break;
        case '3':
          catalogo.listarLivros();
          rl.question("Digite o número do livro que deseja remover: ", (num) => {
            catalogo.removerLivro(parseInt(num));
            salvarCatalogo(catalogo);  // Salva o catálogo após remover
            verMenuOuNao();
          });
          break;
        case '4':
          catalogo.listarLivros();
          rl.question("Digite o número do livro que deseja marcar como lido: ", (num) => {
            catalogo.marcarLivroComoLido(parseInt(num));
            salvarCatalogo(catalogo);  // Salva o catálogo após marcar como lido
            verMenuOuNao();
          });
          break;
        case '5':
          console.log("Saindo...");
          salvarCatalogo(catalogo);  // Salva o catálogo antes de sair
          rl.close();
          break;
        default:
          console.clear();
          console.log("");
          console.log(`Opção ${opcao} inválida.`);
          mostrarMenu();
      }
    });
  }
mostrarMenu();