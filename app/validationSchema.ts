import { z } from "zod";

export const newIssueSchema = z.object({
  title: z.string().min(1, "title is required").max(255),
  description: z.string().min(1, "description is required"),
});

export const patchIssueSchema = z.object({
  title: z.string().min(1, "title is required").max(255),
  description: z.string().min(1, "description is required"),
});
