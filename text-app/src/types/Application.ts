// src/types/Application.ts
export interface Application {
  id: number;
  jobPostingId: number | null;
  candidateId: number | null;
  coverLetter: string;
  status: string;
  appliedAt: string;
}
