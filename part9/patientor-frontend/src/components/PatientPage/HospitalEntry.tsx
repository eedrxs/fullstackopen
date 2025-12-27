import useDiagnosisContext from "../../hooks/useDiagnosisContext";
import { HospitalEntry as Entry } from "../../types";

const HospitalEntry = ({ entry }: Props) => {
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
      <p>{entry.date}</p>

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

export default HospitalEntry;

interface Props {
  entry: Entry;
}
