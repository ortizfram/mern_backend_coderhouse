# mern_backend_coderhouse

## 30.mailing-mensajeria
# Objetivos de la clase

- Conocer y utilizar el módulo Nodemailer para el desarrollo de mensajería.
- Conocer el modelo de mensajería de Twilio
- Desarrollar un modelo práctico de mailing
# A entregar
- [x] Solo admin puede agregar, actualizar, eliminar productos del cart
- [ ] Solo admin puede enviar msg al chat
- [x] Solo user puede agregar productos as carrito
- [x] Crear modelo Ticket: cuando la compra se realizo
```
TICKET:
> Id (autogenerado por mongo)

> code: String debe autogenerarse y ser único

> purchase_datetime: Deberá guardar la fecha y hora exacta en la cual se formalizó la compra (básicamente es un created_at)
> amount: Number, total de la compra.

> purchaser: String, contendrá el correo del usuario asociado al carrito.
```
- [ ] router de carts, la ruta `/:cid/purchase`, la cual permitirá finalizar el proceso de compra de dicho carrito.
La compra debe corroborar el stock del producto al momento de finalizarse y restarlo del stock, actualizando la vista y vaciando el carrido generarando un nuevo id
> validaciones

Si el producto `no tiene suficiente stock` para la cantidad indicada en el producto del carrito,cotar los clicks y entonces no agregar el producto al proceso de compra y devolver el arreglo con los ids de los productos que no pudieron procesarse

# Entrega
- [ ] Agregar el `.env` 


