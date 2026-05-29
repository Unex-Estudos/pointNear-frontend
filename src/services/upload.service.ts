const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3333/api/v1";

interface UploadResponse {
  data: {
    url: string;
    filename: string;
    originalName: string;
    mimeType: string;
    size: number;
  };
}

export const uploadService = {
  async uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);

    const token = localStorage.getItem("pointnear.accessToken");
    const response = await fetch(`${API_URL}/uploads`, {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    });

    const data: UploadResponse = await response.json();
    return data.data.url;
  },
};
