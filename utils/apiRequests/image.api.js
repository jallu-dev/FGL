import axiosInstance from "../axiosInstance";

// Fetch all gallery images, optionally filtered by status
export const getAllImages = async (status = "") => {
  const url = status ? `/images?status=${status}` : "/images";
  const response = await axiosInstance.get(url);
  return response.data;
};

// Create a new gallery image with multipart/form-data
export const createImage = async (formData) => {
  const response = await axiosInstance.post("/images", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Delete a gallery image by ID
export const deleteImage = async (id) => {
  const response = await axiosInstance.delete(`/images/${id}`);
  return response.data;
};

// Update gallery image (e.g. toggle draft/published status)
export const updateImage = async (id, data) => {
  const response = await axiosInstance.patch(`/images/${id}`, data);
  return response.data;
};
