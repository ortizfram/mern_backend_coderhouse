import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import path from "path";
import { __dirname } from "./utils.js"

import {engine} from "express-handlebars";
import {Server} from "socket.io";
import cookieParser from "cookie-parser";
import passport from "passport";

import config from "./config/config.js";
import initPassport from "./config/passport.config.js";

import mensajesModelo from "./dao/models/MenssageModel.js";

import productsRouter from "./routes/products_routers.js";
import cartsRouter from "./routes/carts_router.js";
import vistasRouter from "./routes/views_router.js";
import sessionRouter from "./routes/session_router.js";

const PORT = config.PORT;
const app = express();

app.use(express.json()); 
app.use(express.urlencoded({extended:true}));
app.use(session({
    secret:config.SECRET,
    resave:true,
    saveUninitialized:true,
    store:MongoStore.create({
        ttl:3600,
        mongoUrl:config.MONGO_URL,
        dbName:config.DB_NAME,
        collectionName:"sessions"
    })
}));

initPassport();
app.use(passport.initialize());
app.use(passport.session()); // Solo si uso sessions
app.use(cookieParser());

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname,'/views'));


app.use(express.static(__dirname+'/public'));

//Estoy agregando un middleware literal en flecha y enviando io al products_routers
app.use("/api/products/", (req, res, next) => {
        req.io = io;
        next();
    },
    productsRouter
); 
app.use("/api/carts/", cartsRouter);
app.use("/", vistasRouter);
app.use("/api/sessions/", sessionRouter);

const serverHTTP = app.listen(PORT, () => console.log(`Server online en puerto ${PORT}`)); 
const io = new Server(serverHTTP);

io.on("connection", socket => {
//console.log(Se conecto un cliente con el ID ${socket.id});
    let usuarios = [];
    let mensajes = [];

    socket.on("id", async(nombre) => {
        usuarios.push({id:socket.id, nombre});
        try {mensajes = await mensajesModelo.find().lean();}
        catch(error){`Error desde el servidor recuperando mensajes ${error}`}
        
        socket.emit("mensajesPrevios", mensajes);
        socket.broadcast.emit("nuevoUsuario", nombre );
        //Le envio a todos menos al que se conecto 
    });

    socket.on("mensaje", async(nombre, mensaje) => {
    //mensajes.push({nombre, mensaje}); // Guadar mensajes
        try {
            let guardado = await mensajesModelo.create({user:nombre,message:mensaje});
        } catch(error){`Error en el servidor guardando mensajes ${error}`}
        
        io.emit("nuevoMensaje", nombre, mensaje); 
        //io envia a Todos
    });

    socket.on("disconnect", () => {
        let usuario = usuarios.find(user => user.id === socket.id);
        if(usuario){
            io.emit("saleUsuario", usuario.nombre)
        }
    })
});

const connDB = async () => {
    try {
        await mongoose.connect(config.MONGO_URL,
        {dbName:config.DB_NAME});
        console.log("DB MONGO ONLINE");
    } catch (error) {
        console.log("Error al conectar a la DB", error.message)
    }
} 
connDB();