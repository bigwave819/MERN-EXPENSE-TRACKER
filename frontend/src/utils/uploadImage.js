import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);
    
    try {
        const response = await axiosInstance.post(
            API_PATHS.AUTH.UPLOAD_IMAGE, // Changed from IMAGE to AUTH
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
                },
                timeout: 30000
            }
        );
        return response.data;
    } catch (error) {
        console.error("Upload Error Details:", {
            status: error.response?.status,
            data: error.response?.data,
            config: error.config
        });
        throw error;
    }
};

export default uploadImage;