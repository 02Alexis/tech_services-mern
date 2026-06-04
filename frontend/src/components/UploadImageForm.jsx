import { useState } from "react";

import toast from "react-hot-toast";

import { uploadImage } from "../features/uploads/upload.api";

const UploadImageForm = ({ serviceId, onSuccess }) => {
  const [file, setFile] = useState(null);

  const [description, setDescription] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      return toast.error("Seleccione una imagen");
    }

    try {
      const formData = new FormData();

      formData.append("image", file);

      formData.append("serviceOrder", serviceId);

      formData.append("description", description);

      await uploadImage(formData);

      toast.success("Imagen subida");

      setFile(null);

      setDescription("");

      onSuccess();
    } catch {
      toast.error("Error al subir");
    }
  };

  return (
    <form
      onSubmit={handleUpload}
      className="
        border
        rounded-xl
        p-4
        bg-white
      "
    >
      <h3
        className="
          font-semibold
          mb-4
        "
      >
        Subir Evidencia
      </h3>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descripción"
        className="
          w-full
          border
          rounded-lg
          p-2
          mt-4
        "
      />

      <button
        type="submit"
        className="
          mt-4
          bg-blue-600
          text-white
          px-4
          py-2
          rounded-lg
        "
      >
        Subir
      </button>
    </form>
  );
};

export default UploadImageForm;
