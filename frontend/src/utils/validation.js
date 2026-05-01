import { z } from 'zod';

export const patientSchema = z.object({
  age: z.number().min(1).max(120, "Age is out of bounds"),
  gender: z.enum(["Male", "Female"]),
  bmi: z.number().positive("BMI must be a positive number"),
  alcohol_consumption: z.enum(["Low", "Moderate", "High"]),
});

// Use this in your React component before calling the API:
// const result = patientSchema.safeParse(formData);
// if (!result.success) { console.log(result.error.format()); }