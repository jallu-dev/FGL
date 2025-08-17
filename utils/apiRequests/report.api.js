import axiosInstance from "../axiosInstance";

export const getAllReports = async (data) => {
  const response = await axiosInstance.get(
    `/test-db?page=${data.page}&limit=${data.limit}&search=${encodeURIComponent(
      data.search
    )}`
  );
  return response.data;
};
