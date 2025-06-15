const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


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

const catalogo = new Catalogo();

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
            verMenuOuNao();
          });
          break;
        case '4':
          catalogo.listarLivros();
          rl.question("Digite o número do livro que deseja marcar como lido: ", (num) => {
            catalogo.marcarLivroComoLido(parseInt(num));
            verMenuOuNao();
          });
          break;
        case '5':
          console.log("Saindo...");
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