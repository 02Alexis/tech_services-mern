export default function StatCard({ title, value }) {
  return (
    <div
      className="
        bg-white
        rounded-xl
        shadow-md
        hover:shadow-lg
        transition-all
        duration-300
        p-5
      "
    >
      <p className="text-sm text-gray-500">{title}</p>

      <h2 className="text-3xl font-bold mt-2">{value}</h2>
    </div>
  );
}
