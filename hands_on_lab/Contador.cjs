class Contador {
  static CONTADOR_GLOBAL = 0;

  constructor(responsable) {
    this.responsable = responsable;
    this.contadorResponsable = 0; // Start with 0
  }

  getResponsable() {
    return this.responsable;
  }

  getCuentaIndividual() {
    return this.contadorResponsable;
  }

  static getCuentaGlobal() {
    return Contador.CONTADOR_GLOBAL;
  }

  contar() {

    // Increment the counters
    this.contadorResponsable++;
    Contador.CONTADOR_GLOBAL++;

    // Log updated individual and global counts
    console.log(this.getCuentaIndividual());
    console.log(Contador.getCuentaGlobal());
    
  }
}

module.exports = Contador;
