import { Router } from "express";
import { CreateUser, DeleteUser, GetAllUser, GetUser, UpdateUser } from "../controllers/User.controller";

const UserRoute = Router();

UserRoute.get('/:id', GetUser);
UserRoute.get('', GetAllUser);
UserRoute.post('', CreateUser);
UserRoute.put('/:id', UpdateUser);
UserRoute.delete('/:id', DeleteUser);

  
export {UserRoute} ;