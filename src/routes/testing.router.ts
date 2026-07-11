import { Router } from "express";

const testingRouter = Router();

testingRouter.delete("/all-data", (req, res) => {
  res.status(204).send("All data deleted");
});

export default testingRouter;
