import { v1 as uuid } from "uuid";
import data from "../data/patients-full";
import {
  Entry,
  NewEntry,
  NewPatient,
  NonSensitivePatient,
  Patient,
} from "../types";

const getPatients = (): Patient[] => {
  return data;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return data.map((patient) => ({ ...patient, ssn: undefined }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    entries: [],
    ...patient,
  };

  data.push(newPatient);
  return newPatient;
};

const getPatientById = (id: string): Patient | undefined => {
  return data.find((patient) => patient.id === id);
};

const addEntry = (patientId: string, entry: NewEntry): Entry => {
  const newEntry = {
    id: uuid(),
    ...entry,
  };

  const patient = getPatientById(patientId);
  if (!patient) {
    throw new Error("Patient not found");
  }

  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
  getPatientById,
  addEntry,
};
