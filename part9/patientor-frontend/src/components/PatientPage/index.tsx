import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import patientService from "../../services/patients";
import { EntryFormValues, Patient } from "../../types";
import EntryDetails from "./EntryDetails";
import DiagnosisProvider from "../DiagnosisContext";
import AddEntryModal from "../AddEntryModal";
import { isAxiosError } from "axios";
import { Button } from "@mui/material";

const PatientPage = () => {
  const patientId = useParams().id;
  const [patient, setPatient] = useState<Patient | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await patientService.getById(patientId!);
        setPatient(response);
      } catch (error) {
        console.error("Error fetching patient:", error);
      }
    };

    fetchPatient();
  }, [patientId]);

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    if (patient) {
      try {
        const entry = await patientService.createEntry(patientId!, values);
        setPatient({ ...patient, entries: [...patient.entries, entry] });
        setModalOpen(false);
      } catch (e: unknown) {
        if (isAxiosError(e) && e.response?.data) {
          if (Array.isArray(e.response.data.error)) {
            const [err] = e.response.data.error;
            const message = `${err.path[0]}: ${err.message}` || "Unrecognized axios error";
            console.error(message);
            setError(message);
          } else {
            setError("Unrecognized axios error");
          }
        } else {
          console.error("Unknown error", e);
          setError("Unknown error");
        }
      }
    }
  };

  return (
    <DiagnosisProvider>
      {patient ? (
        <div>
          <h2>
            {patient.name}{" "}
            {patient.gender === "male" ? (
              <MaleIcon />
            ) : patient.gender === "female" ? (
              <FemaleIcon />
            ) : (
              <HelpOutlineIcon />
            )}
          </h2>
          <p>occupation: {patient.occupation}</p>
          <p>ssn: {patient.ssn}</p>

          <AddEntryModal
            modalOpen={modalOpen}
            onSubmit={submitNewEntry}
            error={error}
            onClose={closeModal}
          />
          <Button variant="contained" onClick={() => openModal()}>
            Add New Entry
          </Button>

          <h4>entries</h4>
          {patient.entries.length === 0 ? (
            <p>No entries available.</p>
          ) : (
            <div>
              {patient.entries.map((entry) => (
                <EntryDetails key={entry.id} entry={entry} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </DiagnosisProvider>
  );
};

export default PatientPage;
