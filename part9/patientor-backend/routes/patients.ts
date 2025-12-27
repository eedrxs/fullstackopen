import express, { Request, Response } from "express";
import patientService from "../services/patientService";
import {
  Entry,
  NewEntry,
  NewPatient,
  NonSensitivePatient,
  Patient,
} from "../types";
import { newEntryParser, newPatientParser } from "../middleware";

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

router.get("/:id", (req, res: Response<Patient | { error: string }>) => {
  const patient = patientService.getPatientById(req.params.id);
  if (patient) {
    res.json(patient);
  } else {
    res.status(404).json({ error: "Patient not found" });
  }
});

router.post(
  "/:id/entries",
  newEntryParser,
  (
    req: Request<{ id: string }, unknown, NewEntry>,
    res: Response<Entry | { error: string }>
  ) => {
    try {
      const addedEntry = patientService.addEntry(req.params.id, req.body);
      res.json(addedEntry);
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).json({ error: error.message });
      }
    }
  }
);

export default router;
