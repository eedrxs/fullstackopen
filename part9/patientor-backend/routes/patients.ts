import express, { Response } from "express";
import patientService from "../services/patientService";
import { NonSensitivePatient } from "../types";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatient[]>) => {
  const data = patientService.getNonSensitivePatients();
  res.send(data);
});

export default router;
