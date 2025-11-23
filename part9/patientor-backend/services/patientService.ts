import { v1 as uuid } from "uuid";
import data from "../data/patients";
import { NewPatient, NonSensitivePatient, Patient } from "../types";

const getPatients = (): Patient[] => {
  return data;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return data.map((patient) => ({ ...patient, ssn: undefined }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };

  data.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
};
