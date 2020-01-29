class Jedi{
    nivelFuerza : number;
    cantMisiones : number;
    estado : EstadoJedi;
    constructor(){
        this.estado = new Iniciado(this);
    }
    evaluar(){
        this.estado.evaluar();
    };
}

abstract class EstadoJedi{
    jedi : Jedi;
    constructor(jedi : Jedi){
        this.jedi = jedi;
    }
    abstract evaluar();
    abstract toString() : string;
}
class Iniciado extends EstadoJedi{
    evaluar() {
        if(this.jedi.nivelFuerza > 100 && this.jedi.cantMisiones > 10){
            this.jedi.estado = new Padawan(this.jedi);
        }else if (this.jedi.nivelFuerza < -100){
            this.jedi.estado = new Observado(this.jedi);
        }
    }
    toString(): string {
        return "Iniciado";
    }

}
class Padawan extends EstadoJedi{
    evaluar() {
        if(this.jedi.nivelFuerza > 200 && this.jedi.cantMisiones > 30){
            this.jedi.estado = new Caballero(this.jedi);
        }else if (this.jedi.nivelFuerza < -100){
            this.jedi.estado = new Observado(this.jedi);
        }
    }
    toString(): string {
        return "Padawan";
    }
    
}
class Caballero extends EstadoJedi{
    evaluar() {
        if(this.jedi.nivelFuerza > 500 && this.jedi.cantMisiones > 50){
            this.jedi.estado = new Maestro(this.jedi);
        }else if (this.jedi.nivelFuerza < -100){
            this.jedi.estado = new Observado(this.jedi);
        }
    }
    toString(): string {
        return "Caballero";
    }
    
}
class Maestro extends EstadoJedi{
    evaluar() {
        if (this.jedi.nivelFuerza < -100){
            this.jedi.estado = new Observado(this.jedi);
        }
    }
    toString(): string {
        return "Maestro";
    }
}
class Observado extends EstadoJedi{
    evaluar() {
        if (this.jedi.nivelFuerza > 0){
            this.jedi.estado = new Expulsado(this.jedi);
        } else {
            this.jedi.estado = new Iniciado(this.jedi);
        }
    }
    toString(): string {
        return "Observado";
    }
    
}

class Expulsado extends EstadoJedi{
    evaluar() {}
    toString(): string {
        return "Expulsado";
    }
}

//podemos hacer singleton
class Evaluador{
    private static instance : Evaluador | null = null;
    private constructor(){};
    static getInstance(){
        if (Evaluador.instance == null){
            Evaluador.instance = new Evaluador();
        }
        return Evaluador.instance;
    }
    evaluarAscensos(jedi : Jedi){
        jedi.evaluar();
    }
}

let mainJediOrder = () => {
    let pepe = new Jedi();
    pepe.cantMisiones = 23;
    pepe.nivelFuerza = 300;
    //pepe.evaluar();
    let evaluador = Evaluador.getInstance();
    evaluador.evaluarAscensos(pepe);

    console.log(`El estado de pepe es : ${pepe.estado.toString()}`);
};
mainJediOrder();