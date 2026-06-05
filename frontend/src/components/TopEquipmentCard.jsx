const TopEquipmentCard = ({ types }) => {
  return (
    <div
      className="
        bg-white
        border
        rounded-xl
        p-6
      "
    >
      <h3
        className="
          text-xl
          font-bold
          mb-4
        "
      >
        Equipos Más Recibidos
      </h3>

      <div className="space-y-3">
        {types?.map((item, index) => (
          <div
            key={index}
            className="
              flex
              justify-between
            "
          >
            <span>{item.name}</span>

            <span>{item.total}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopEquipmentCard;
