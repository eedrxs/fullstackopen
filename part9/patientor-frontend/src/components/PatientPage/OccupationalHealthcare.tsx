import useDiagnosisContext from "../../hooks/useDiagnosisContext";
import { OccupationalHealthcareEntry } from "../../types";
import WorkIcon from "@mui/icons-material/Work";

const OccupationalHealthcare = ({ entry }: Props) => {
  const { diagnosisMap } = useDiagnosisContext();

  return (
    <div
      key={entry.id}
      style={{
        border: "1px solid black",
        borderRadius: "5px",
        marginBottom: "10px",
        padding: "10px",
      }}
    >
      <p>
        {entry.date} <WorkIcon /> <i>{entry.employerName}</i>
      </p>

      <p>
        <i>{entry.description}</i>
      </p>

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

export default OccupationalHealthcare;

interface Props {
  entry: OccupationalHealthcareEntry;
}
