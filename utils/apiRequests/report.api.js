import axiosInstance from "../axiosInstance";

export const get = async () => {
  const response = await axiosInstance.get("/report/");
  return response.data;
};
