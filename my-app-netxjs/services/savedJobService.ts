import { apiClient } from "@/libraries/api-client";

export const savedJobService = {
  saveJob: (jobPostingId: number) =>
    apiClient.post(`/saved-jobs/${jobPostingId}`),

  getMySavedJobs: () =>
    apiClient.get(`/saved-jobs`),

  removeSavedJob: (jobPostingId: number) =>
    apiClient.delete(`/saved-jobs/${jobPostingId}`),
};
