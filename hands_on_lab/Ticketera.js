class Ticketera {
  static CONTADOR_GLOBAL = 0;

  constructor(nueva_localidad, nueva_fecha) {
    this.id_usuario = 0;
    this.id_evento = 0; // Start with 0
    this.participantes = [];
    this.eventos = [];
  }

  agregarUsuario(id_usuario, id_evento) {
    return this.id_usuario;
    return this.id_evento;

    //evaluar id de evento existe

    //usuario no repetido agregar a Participantes[]
    if (!this.participantes.includes(this.id_usuario)) {
      this.participantes.push(this.id_usuario);
    }
  }

  // use spread operator here
  ponerEventoEnGira(id_evento, nueva_localidad, nueva_fecha) {
    console.log(`\nLocalidad:${nueva_localidad}\n
    Fecha:${nueva_fecha}\nId:${id_evento}\nParticipantes:${this.participantes}\n`);
  }
}

export default Ticketera;
