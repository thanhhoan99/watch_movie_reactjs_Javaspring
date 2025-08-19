
import { apiClient } from "@/libraries/api-client";

// export const resumeService = {
//   createResume: (id: number) =>
//     apiClient.post(`/api/resumes/me${id}`),

//   getAllResumes: () =>
//     apiClient.get(`/api/resumes`),

  
// };
export const resumeService = {
  createResume: (id: number) =>
    apiClient.post(`/resumes/${id}`),

  getAllResumes: () =>
    apiClient.get(`/resumes`),

  
};
