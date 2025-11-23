import data from "../data/patients";
import { NonSensitivePatient, Patient } from "../types";

const getPatients = (): Patient[] => {
  return data;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return data.map((patient) => ({ ...patient, ssn: undefined }));
};

export default {
  getPatients,
  getNonSensitivePatients,
};
