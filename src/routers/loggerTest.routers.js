import { Router } from "express";

const router = Router();

router.get('/',(req,res)=>{
    req.logger.fatal('fatal ejecutandose');
    req.logger.error('error ejecutandose');
    req.logger.warning('warning ejecutandose');
    req.logger.info('info ejecutandose');
    req.logger.http('http ejecutandose');
    req.logger.debug('debug ejecutandose');
    res.send('ejecutado el test logger')
})


export default router