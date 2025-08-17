import axiosInstance from "../axiosInstance";

export const getAllReports = async (data) => {
  const response = await axiosInstance.get(
    `/reports?page=${data.page}&limit=${data.limit}&search=${encodeURIComponent(
      data.search
    )}`
  );
  return response.data;
};
