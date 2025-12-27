import z from "zod";
import { EntryType, Gender, HealthCheckRating } from "./types";

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string(),
});

const BaseEntrySchema = z.object({
  description: z.string(),
  date: z.iso.date(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
});

export const NewEntrySchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal(EntryType.Hospital),
    discharge: z.object({
      date: z.iso.date(),
      criteria: z.string(),
    }),
    ...BaseEntrySchema.shape,
  }),
  z.object({
    type: z.literal(EntryType.OccupationalHealthcare),
    employerName: z.string(),
    sickLeave: z
      .object({
        startDate: z.iso.date(),
        endDate: z.iso.date(),
      })
      .optional(),
    ...BaseEntrySchema.shape,
  }),
  z.object({
    type: z.literal(EntryType.HealthCheck),
    healthCheckRating: z.enum(HealthCheckRating),
    ...BaseEntrySchema.shape,
  }),
]);
