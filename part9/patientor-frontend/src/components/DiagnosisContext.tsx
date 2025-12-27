import { createContext, useEffect, useState } from "react";
import patientService from "../services/patients";
import { Diagnosis } from "../types";

export const DiagnosisContext = createContext({} as IDiagnosisContext);

const DiagnosisProvider = ({ children }: { children: React.ReactNode }) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await patientService.getDiagnoses();
      setDiagnoses(diagnoses);
    };

    void fetchDiagnoses();
  }, []);

  const diagnosisMap = diagnoses.reduce((map, diagnosis) => {
    map[diagnosis.code] = diagnosis;
    return map;
  }, {} as { [key: string]: Diagnosis });

  return (
    <DiagnosisContext.Provider value={{ diagnosisMap }}>
      {children}
    </DiagnosisContext.Provider>
  );
};

export default DiagnosisProvider;

interface IDiagnosisContext {
  diagnosisMap: {
    [key: string]: Diagnosis;
  };
}