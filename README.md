# mern_backend_coderhouse

## 21.estrategia_auth_terceros_jwt

### A integrar:
- Mongo Avanzado

- Cookies

- Autenticación y autorización

- Passport

-  jwt
### Skills mongo avanzado
Comprender el uso de una referencia por ObjectId

Saber definir referencias en un schema de mongoose

Comprender el uso de populations

Aplicar una population en mongoose entre dos esquemas con una referencia

Comprender la necesidad de la utilización de paginaciones

Aplicar paginaciones en consultas con mongoose-paginatev2

Puedes revisar las clases 16 y 17 sobre Mongo Avanzado
### Skills Cookies
Entender el funcionamiento de una cookie

Saber setear una cookie 

Saber configurar el tiempo de vida de una cookie

Saber limpiar una cookie

Comprender la conexión de una cookie con jwt

Puedes revisar la clase 18 para recordar conceptos de cookies
### Skills auth
Comprender la lógica de registro de un usuario

Comprender el concepto de autenticación y la lógica de login de un usuario

Comprender la diferencia entre autenticación y autorización

Construir middlewares de autorización y control de códigos de estado 401 y 403

Manejo de políticas

### skills passport
Comprender el uso de una estrategia
Comprender la lógica de una estrategia local y sus configuraciones
Comprender la lógica de una estrategia por terceros y sus configuraciones
Comprender la lógica de una estrategia de tokenización y su configuración

### Skills JWT
Comprender la diferencia entre una sesión y una tokenización

Firmar información en un token

Guardar tokens en cookies HTTP - Only

Utilizar Passport-jwt

# ⚔️ DESAFIO COMPLEMENTARIO ⚔️
#### Consigna

Continuar sobre el proyecto que has trabajado para tu ecommerce y configurar los siguientes elementos:

#### Aspectos a incluir

Crear un modelo User el cual contará con los campos:
```
first_name:String,
last_name:String,
email:String (único)
age:Number,
password:String(Hash)
cart:Id con referencia a Carts
role:String(default:’user’)
```
Desarrollar las estrategias de Passport para que funcionen con este modelo de usuarios

Modificar el sistema de login del usuario para poder trabajar con session o con jwt (a tu elección). 

(Sólo para jwt) desarrollar una estrategia “current” para extraer la cookie que contiene el token para obtener el usuario asociado a dicho token, en caso de tener el token, devolver al usuario asociado al token, caso contrario devolver un error de passport, utilizar un extractor de cookie.
Agregar al router /api/sessions/ la ruta /current, la cual utilizará el modelo de sesión que estés utilizando, para poder devolver en una respuesta el usuario actual.

#### sugerencias

Te recomendamos trabajar con el modelo de sesión con el cual te sientas más cómodo (sessions / jwt)



