class TicketManager {
  constructor() {
    this.eventos = [];
  }

  getEventos() {
    console.log("getEventos------------------------------")
     this.eventos.forEach((evento) => {
      console.log(`\nEvento ${evento.id}: ${evento.nombre} en ${evento.lugar} el ${evento.fecha}`);
    });
  }

  agregarEvento(nombre, lugar, precio, capacidad = 50, fecha = new Date()) {
    // Añadir un 0.15 del valor original al precio
    const precioConGanancia = precio * 1.15;

    // Generar un ID autoincrementable
    const id = this.eventos.length + 1;

    // Crear el evento con los parámetros dados y los valores calculados
    const evento = {
      id,
      nombre,
      lugar,
      precio: precioConGanancia,
      capacidad,
      fecha,
      participantes: [],
    };

    // Agregar el evento al arreglo de eventos
    this.eventos.push(evento);
    const message = `\nevento agregado:${evento}`

    return message;
  }

  agregarUsuario(eventoId, usuarioId) {
    // Buscar el evento por su ID
    const evento = this.eventos.find((evento) => evento.id === eventoId);

    if (!evento) {
      throw new Error("\nError: El evento no existe.");
      return;
    }

    // Verificar si el usuario ya está inscrito en el evento
    if (evento.participantes.includes(usuarioId)) {
      throw new Error("\nError: El usuario ya está inscrito en este evento.");
      return;
    }

    // Agregar al usuario a la lista de participantes
    evento.participantes.push(usuarioId);
    console.log("\nUsuario inscrito correctamente en el evento.");

    const message = `\nUsuario ${usuarioId} agregado a evento ${eventoId}`
    return message;
  }

  ponerEventoEnGira(eventoId, nueva_localidad, nueva_fecha) {
    console.log("ponerEventoEnGira -----------------------")
    // Buscar el evento por su ID
    const evento = this.eventos.find((evento) => evento.id === eventoId);

    // Si el evento no existe, lanzar un error
    if (!evento) {
      throw new Error("\nError: El evento no existe.");
    }

    // Copiar el evento existente y modificar la localidad y la fecha
    const eventoEnGira = {
      ...evento, // Copiar todas las propiedades del evento existente
      lugar: nueva_localidad, // Asignar la nueva localidad
      fecha: nueva_fecha, // Asignar la nueva fecha
      id: this.eventos.length + 1, // Generar un nuevo ID autoincrementable
      participantes: [], // Limpiar el array de participantes
    };

    // Agregar el evento en gira al arreglo de eventos
    this.eventos.push(eventoEnGira);

    console.log("\nEvento puesto en gira correctamente.");
  }
}

//! Ejemplo de uso
const manager = new TicketManager();
manager.agregarEvento("Concierto", "Estadio", 100);
manager.agregarEvento("Conferencia", "Centro de convenciones", 50);
console.log(manager.getEventos());

// Simulando la inscripción de un usuario en un evento
manager.agregarUsuario(1, 1); // Agregar usuario 1 al evento 1
manager.agregarUsuario(1, 2); // Intentar agregar usuario 1 al evento 1 nuevamente
manager.agregarUsuario(2, 1); // Agregar usuario 1 al evento 2
console.log(manager.getEventos());

manager.ponerEventoEnGira(1,"Mendoza Plaza Shopping", new Date())
console.log(manager.getEventos());