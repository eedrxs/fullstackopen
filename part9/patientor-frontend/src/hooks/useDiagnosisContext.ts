import { useContext } from "react";
import { DiagnosisContext } from "../components/DiagnosisContext";


const useDiagnosisContext = () => {
  return useContext(DiagnosisContext);
};

export default useDiagnosisContext;