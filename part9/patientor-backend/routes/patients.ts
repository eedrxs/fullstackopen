import express, { Request, Response } from "express";
import patientService from "../services/patientService";
import { NewPatient, NonSensitivePatient, Patient } from "../types";
import { newPatientParser } from "../middleware";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatient[]>) => {
  const data = patientService.getNonSensitivePatients();
  res.send(data);
});

router.post(
  "/",
  newPatientParser,
  (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const addedPatient = patientService.addPatient(req.body);
    res.json(addedPatient);
  }
);

export default router;
