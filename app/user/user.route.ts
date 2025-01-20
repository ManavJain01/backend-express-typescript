import { userController, userValidator, Router, catchError } from "../common/helper/imports.helper";

const router = Router();

router.get("/", userController.getAllUser);
router.get("/:id", userController.getUserById);
router.delete("/:id", userController.deleteUser);
router.post("/", userValidator.createUser, catchError, userController.createUser);
router.patch("/:id", userValidator.editUser, catchError, userController.editUser);
router.put("/:id", userValidator.updateUser, catchError, userController.updateUser);

export default router;