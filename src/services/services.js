import CartsProdManagerDB from "../dao/CartsProdManagerDB.js"
import chatManagerDB from "../dao/chatManagerDB.js";
import ProdManagerDB from "../dao/ProdManagerDB.js";
import purchaseManagerDB from "../dao/purchaseManagerDB.js";
import userManagerDB from "../dao/usersManagerDB.js";


const cartDB = new CartsProdManagerDB();

const chatDB = new chatManagerDB();

const prodDB = new ProdManagerDB();

const ticketDB = new purchaseManagerDB();

const userDB = new userManagerDB();


export { cartDB, chatDB, prodDB, ticketDB, userDB };