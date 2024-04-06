import { Command } from "commander";

const program=new Command();

program
    .option('--mode <mode>', 'especificacion de entorno','development')
    .parse()
     
export default program