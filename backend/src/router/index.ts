import {NextFunction, Request, Response, Router} from "express";
import 'express-async-errors'
import errorHandler from "../middlewares/errorHandler";
import createUserWithoutSignup from "./create-user-without-signup";
import getUserByCookie from "./get-user-by-cookie";

const router = Router();

router.get('/', (req, res) => {
    res.send("A")
})
router.post('/create-user-without-signup', createUserWithoutSignup)
router.post('/get-user-by-cookie', getUserByCookie)

router.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.log('Error encountered:', err.message || err);
    next(err);
});
router.use(errorHandler)


export default router