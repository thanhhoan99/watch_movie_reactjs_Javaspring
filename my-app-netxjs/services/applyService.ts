/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient } from "@/libraries/api-client";


export const applyService = {
// eslint-disable-next-line @typescript-eslint/no-unused-vars
applyJobWithFile: (jobId: number, formData: FormData, p0: { onUploadProgress: (event: ProgressEvent) => void; }) => {
    return apiClient.post(`/applicant/${jobId}/apply`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  getAllAppsByPage: (page = 0, size = 5, sortBy = "appliedAt", sortDir = "desc") =>
    apiClient.get(`/applicant`, { params: { page, size, sortBy, sortDir } }),
};