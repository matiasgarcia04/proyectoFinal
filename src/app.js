import express from "express";
import _dirname from "./utils.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import productsrouter from "./routers/products.routers.js";
import cartsrouters from "./routers/carts.routers.js";
import connectDB from "./config/connectDB.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import sessionrouter from "./routers/session.routers.js";
import MongoStore from "connect-mongo";
import viewsRouter from "./routers/views.routers.js";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import chatRouter from "./routers/chat.routers.js";
import realTimeRouter from "./routers/realTimeProducts.routers.js"
import cartid from "./routers/cartViews.routers.js";
import configObjet from "./config/dotenv.js";
import Socket from "./socket.js"


const app = express();
const port = configObjet.port;
const httpServer = app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
const socketServer = new Server(httpServer);
connectDB()


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(_dirname+'/public'));
app.use(cookieParser(configObjet.cookieParser));
app.use(session({
  store:MongoStore.create({
    mongoUrl:configObjet.mongoURL,
    mongoOptions:{useNewUrlParser:true, useUnifiedTopology:true},
    ttl:86400,
  }),
  secret:configObjet.sessionSecret,
  resave: true,
  saveUninitialized:true
}))
initializePassport()
app.use(passport.initialize())
app.use(passport.session())


app.engine('handlebars', handlebars.engine());
app.set('views',_dirname+'/views');
app.set('view engine', 'handlebars');


app.use("/",viewsRouter);
app.use("/realtimeproducts", realTimeRouter)
app.use("/api/products", productsrouter);
app.use("/api/carts", cartsrouters);
app.use("/api/session",sessionrouter)
app.use("/chat",chatRouter)
app.use("/cart", cartid);

Socket(socketServer);
