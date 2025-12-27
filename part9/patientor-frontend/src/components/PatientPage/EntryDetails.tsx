import { Entry } from "../../types";
import { assertNever } from "../../utils";
import HealthCheckEntry from "./HealthCheckEntry";
import HospitalEntry from "./HospitalEntry";
import OccupationalHealthcare from "./OccupationalHealthcare";

const EntryDetails = ({ entry }: PatientEntryProps) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntry entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcare entry={entry} />;
    case "HealthCheck":
      return <HealthCheckEntry entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;

interface PatientEntryProps {
  entry: Entry;
}
