import { useState, SyntheticEvent } from "react";

import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  SelectChangeEvent,
  FormControl,
  OutlinedInput,
} from "@mui/material";

import { EntryFormValues, EntryType, HealthCheckRating } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

interface EntryTypeOption {
  value: EntryType;
  label: string;
}

const typeOptions: EntryTypeOption[] = Object.values(EntryType).map((v) => ({
  value: v,
  label: v.toString(),
}));

const diagnosisCodesOptions: Array<{
  value: string;
  label: string;
}> = [
  {
    value: "S03.5",
    label: "S03.5",
  },
  {
    value: "I10",
    label: "I10",
  },
  {
    value: "J45.909",
    label: "J45.909",
  },
];

const healthCheckRatingOptions: Array<{
  value: HealthCheckRating;
  label: string;
}> = Object.entries(HealthCheckRating).flatMap((v) => {
  const [key, value] = v;

  if (typeof value === "string") {
    return [];
  }

  return [
    {
      value: value as HealthCheckRating,
      label: key,
    },
  ];
});

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [type, setType] = useState<EntryType>(EntryType.Hospital);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(
    HealthCheckRating.Healthy
  );
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState("");

  const onTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      const value = event.target.value;
      const entryType = Object.values(EntryType).find(
        (g) => g.toString() === value
      );
      if (entryType) {
        setType(entryType);
      }
    }
  };

  const onDiagnosisCodesChange = (
    event: SelectChangeEvent<typeof diagnosisCodes>
  ) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(typeof value === "string" ? value.split(",") : value);
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    const body = {
      type: type,
      description: description,
      date: date,
      specialist: specialist,
      diagnosisCodes: diagnosisCodes,
      ...(type === EntryType.HealthCheck && {
        healthCheckRating: healthCheckRating,
      }),
      ...(type === EntryType.Hospital && {
        discharge: { date: dischargeDate, criteria: dischargeCriteria },
      }),
      ...(type === EntryType.OccupationalHealthcare && {
        employerName: employerName,
        sickLeave: {
          startDate: sickLeaveStartDate,
          endDate: sickLeaveEndDate,
        },
      }),
    } as EntryFormValues;

    onSubmit(body);
  };

  return (
    <div>
      <form onSubmit={addEntry} style={{ display: "grid", gap: 16 }}>
        <FormControl>
          <InputLabel>Type</InputLabel>
          <Select
            label="Type"
            fullWidth
            input={<OutlinedInput label="Type" />}
            value={type}
            onChange={onTypeChange}
          >
            {typeOptions.map((option) => (
              <MenuItem key={option.label} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />

        <FormControl>
          <InputLabel>Date</InputLabel>
          <OutlinedInput
            type="date"
            placeholder="YYYY-MM-DD"
            fullWidth
            // input={<OutlinedInput label="Date" />}
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </FormControl>

        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />

        <FormControl fullWidth>
          <InputLabel>Diagnosis Codes</InputLabel>
          <Select
            multiple
            value={diagnosisCodes}
            onChange={onDiagnosisCodesChange}
            input={<OutlinedInput label="Diagnosis Codes" />}
            MenuProps={MenuProps}
          >
            {diagnosisCodesOptions.map((option) => (
              <MenuItem key={option.label} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {type === EntryType.HealthCheck && (
          <FormControl>
            <InputLabel>Health Check Rating</InputLabel>
            <Select
              label="Health Check Rating"
              value={healthCheckRating}
              onChange={({ target }) =>
                setHealthCheckRating(Number(target.value))
              }
            >
              {healthCheckRatingOptions.map((option) => (
                <MenuItem key={option.label} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {type === EntryType.Hospital && (
          <>
            <FormControl>
              <InputLabel>Discharge Date</InputLabel>
              <OutlinedInput
                type="date"
                placeholder="YYYY-MM-DD"
                fullWidth
                value={dischargeDate}
                onChange={({ target }) => setDischargeDate(target.value)}
              />
            </FormControl>

            <TextField
              label="Discharge Criteria"
              fullWidth
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)}
            />
          </>
        )}

        {type === EntryType.OccupationalHealthcare && (
          <>
            <TextField
              label="Employer Name"
              fullWidth
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            />
            <FormControl>
              <InputLabel>Sick Leave Start Date</InputLabel>
              <OutlinedInput
                type="date"
                placeholder="YYYY-MM-DD"
                fullWidth
                value={sickLeaveStartDate}
                onChange={({ target }) => setSickLeaveStartDate(target.value)}
              />
            </FormControl>
            <FormControl>
              <InputLabel>Sick Leave End Date</InputLabel>
              <OutlinedInput
                type="date"
                placeholder="YYYY-MM-DD"
                fullWidth
                value={sickLeaveEndDate}
                onChange={({ target }) => setSickLeaveEndDate(target.value)}
              />
            </FormControl>
          </>
        )}

        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
