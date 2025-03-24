import * as readline from 'readline';
interface Operacao {
    calcular(a: number, b: number): number;
}
class Soma implements Operacao {
    calcular(a: number, b: number): number {
        return a + b;
    }
}

class Subtracao implements Operacao {
    calcular(a: number, b: number): number {
        return a - b;
    }
}

class Multiplicacao implements Operacao {
    calcular(a: number, b: number): number {
        return a * b;
    }
}
class Divisao implements Operacao {
    calcular(a: number, b: number): number {
        if (b === 0) {
            throw new Error("Divisão por zero não é permitida.");
        }
        return a / b;
    }
}
class Potenciacao implements Operacao {
    calcular(a: number, b: number): number {
        return Math.pow(a, b);
    }
}
class Radiciacao implements Operacao {
    calcular(a: number, b: number): number {
        return Math.pow(a, 1 / b);
    }
}
class Bhaskara {
    calcular(a: number, b: number, c: number): string {
        const delta = Math.pow(b, 2) - 4 * a * c;

        if (delta < 0) {
            return "A equação não possui raízes reais.";
        }

        const x1 = (-b + Math.sqrt(delta)) / (2 * a);
        const x2 = (-b - Math.sqrt(delta)) / (2 * a);

        return `As raízes da equação são: x1 = ${x1}, x2 = ${x2}`;
    }
}
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function calcular(): void {
    rl.question("Digite a operação (+, -, *, /, ^, r, bhaskara): ", (op) => {
        if (op === 'bhaskara') {
            rl.question("Digite os coeficientes a, b e c separados por espaço: ", (input) => {
                const [a, b, c] = input.split(" ").map(Number);
                const bhaskara = new Bhaskara();
                console.log(bhaskara.calcular(a, b, c));
                rl.close();
            });
        } else {
            rl.question("Digite dois números separados por espaço: ", (input) => {
                const [a, b] = input.split(" ").map(Number);
                let operacao: Operacao;
                
                switch (op) {
                    case '+': operacao = new Soma(); break;
                    case '-': operacao = new Subtracao(); break;
                    case '*': operacao = new Multiplicacao(); break;
                    case '/': operacao = new Divisao(); break;
                    case '^': operacao = new Potenciacao(); break;
                    case 'r': operacao = new Radiciacao(); break;
                    default:
                        console.log("Operação inválida.");
                        rl.close();
                        return;
                }
                
                try {
                    console.log("Resultado:", operacao.calcular(a, b));
                } catch (error) {
                    console.log(error.message);
                }
                rl.close();
            });
        }
    });
}

calcular();
