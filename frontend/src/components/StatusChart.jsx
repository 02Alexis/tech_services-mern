import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
const COLORS = ["#3B82F6", "#F59E0B", "#EF4444", "#10B981"];

const StatusChart = ({ data }) => {
  const chartData = [
    {
      name: "Ingreso",
      value: data.entry,
    },
    {
      name: "Proceso",
      value: data.process,
    },
    {
      name: "Espera",
      value: data.wait,
    },
    {
      name: "Finalizado",
      value: data.finalized,
    },
  ];

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
        Estados de Servicios
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
          >
            {chartData.map((_, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatusChart;
