import { apiClient } from "@/libraries/api-client";

export const jobPostingService = {
  postJob: (id: number) =>
    apiClient.post(`/jobs/post/${id}`),

  getAllJob: () =>
    apiClient.get(`/jobs`),

  removeJob: (id: number) =>
    apiClient.delete(`/jobs/delete/${id}`),
};

// export const jobPostingService = {
//   postJob: (id: number) =>
//     apiClient.post(`/jobs/post/${id}`),

//   getAllJob: () =>
//     apiClient.get(`/api/job-postings`),

//   removeJob: (id: number) =>
//     apiClient.delete(`/jobs/delete/${id}`),
// };
