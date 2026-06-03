const FormInput = ({ label, register, name, required = false, errors }) => {
  return (
    <div>
      <label
        className="
          block
          mb-1
          font-medium
        "
      >
        {label}
      </label>

      <input
        {...register(name, {
          required,
        })}
        className="
          w-full
          border
          rounded-lg
          p-2
        "
      />

      {errors[name] && (
        <p
          className="
            text-red-500
            text-sm
            mt-1
          "
        >
          Campo requerido
        </p>
      )}
    </div>
  );
};

export default FormInput;
