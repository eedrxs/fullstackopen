import useDiagnosisContext from "../../hooks/useDiagnosisContext";
import { HealthCheckEntry as Entry } from "../../types";
import HealthRating from "./HealthRating";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";

const HealthCheckEntry = ({ entry }: Props) => {
  const { diagnosisMap } = useDiagnosisContext();

  return (
    <div
      style={{
        border: "1px solid black",
        borderRadius: "5px",
        marginBottom: "10px",
        padding: "10px",
      }}
    >
      <p>
        {entry.date} <MedicalServicesIcon />
      </p>

      <p>
        <i>{entry.description}</i>
      </p>

      <HealthRating rating={entry.healthCheckRating} />

      <ul>
        {entry.diagnosisCodes?.map((code) => (
          <li key={code}>
            {code} {diagnosisMap[code]?.name}
          </li>
        ))}
      </ul>
      <p>diagnose by {entry.specialist}</p>
    </div>
  );
};

export default HealthCheckEntry;

interface Props {
  entry: Entry;
}
