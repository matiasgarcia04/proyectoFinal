import passport from "passport";
import local from 'passport-local';
import userManagerDB from "../dao/usersManagerDB.js";
import { createHash, isValidPassword } from "./bcrypt.js";
import GitHubStrategy from "passport-github2";
import CartProdManagerDB from "../dao/CartsProdManagerDB.js";
import configObjet from "./dotenv.js";


const cartDB = new CartProdManagerDB();
const LocalStrategy= local.Strategy
const userDB = new userManagerDB();


const initializePassport = ()=>{
    // sin asociar carrito con usuario-----------------------
    // passport.use('register', new LocalStrategy({
    //         passReqToCallback: true,
    //         usernameField: 'email'
    //     }, async (req, username,password,done)=>{
    //         const { first_name, last_name, email, age } = req.body;
    //     try {
    //         const exists = await userDB.getByEmail({ email: req.body.email });
    //             if(exists) return done(null,false);
    //         const user = await userDB.create({
    //                     first_name:first_name,
    //                     last_name:last_name,
    //                     email:email,
    //                     age:age,
    //                     password:createHash(password),
    //                 });
    //         return done(null,user);

    //     } catch (error) {
    //         return done(error)
    //     }
    // }))
    // asociando carrito al usuario---------------------------
    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async (req, username,password,done)=>{
        const { first_name, last_name, email, age } = req.body;
    try {
        const newCart= await cartDB.create();
        await newCart.save();
        const exists = await userDB.getByEmail({ email: req.body.email });
            if(exists) return done(null,false);
        const user = await userDB.create({
                    first_name:first_name,
                    last_name:last_name,
                    email:email,
                    age:age,
                    password:createHash(password),
                    cart: newCart._id,
                });
        return done(null,user);

    } catch (error) {
        return done(error)
    }
}))

    passport.use('login', new LocalStrategy({
        usernameField:'email'
        }, async(username,password,done)=>{
        try {
            const user =await userDB.getByEmail({email:username})
                if(!user){
                    console.log('user not found')
                    return done(null,false)

                }
                if (!isValidPassword(password, user.password)) return done(null, false)
            return done(null, user)


        } catch (error) {
            return done(error);
        }
    }))

    passport.use('github', new GitHubStrategy({
            clientID:configObjet.githubclientID,
            clientSecret:configObjet.githubClientSecret,
            callbackURL:'http://localhost:8080/api/session/githubcallback'
        },async(accessToken,refreshToken,profile,done)=>{
            console.log('profile:',profile)
        try {
            const exists =await userDB.getByEmail({email:profile._json.email})
            if(!exists){
                const user = await userDB.create({
                    first_name:profile.username,
                    last_name:profile.username,
                    email:profile._json.email,
                    age:'',
                    password:'',
                });
                return done(null, user)
            }
            return done(null,exists)
        } catch (error) {
            done(error)
        }
    }) )

    passport.serializeUser((user,done)=>{
        done(null, user._id)
    })
    passport.deserializeUser(async (id, done)=>{
        let user= await userDB.getByID({_id:id})
        done(null,user)
    })
    
};


export default initializePassport;