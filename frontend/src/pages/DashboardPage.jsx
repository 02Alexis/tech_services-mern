import useDashboard from "../features/dashboard/useDashboard";
import StatCard from "../components/StatCard";
import { motion } from "framer-motion";
import Spinner from "../components/Spinner";
import TopEquipmentCard from "../components/TopEquipmentCard";
import StatusChart from "../components/StatusChart";

export default function DashboardPage() {
  const { data, loading } = useDashboard();

  if (loading || !data) {
    return <Spinner />;
  }

  const stats = [
    {
      title: "Total",
      value: data.totalServices,
    },
    {
      title: "Ingreso",
      value: data.entry,
    },
    {
      title: "Proceso",
      value: data.process,
    },
    {
      title: "Espera",
      value: data.wait,
    },
    {
      title: "Finalizado",
      value: data.finalized,
    },
    {
      title: "Hoy",
      value: data.todayEntries,
    },
    {
      title: "Finalizados Hoy",
      value: data.finalizedToday,
    },
    {
      title: "Este Mes",
      value: data.monthEntries,
    },
  ];
  console.log(data);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="flex flex-col items-center gap-7 px-4 sm:px-12 lg:px-24 xl:px-20 pt-5 text-gray-800 dark:text-gray-700"
    >
      <motion.h2
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-2xl sm:text-4xl font-medium"
      >
        Dashboard
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.1,
            }}
          >
            <StatCard title={stat.title} value={stat.value} />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="
          w-full
          bg-white
          rounded-xl
          border
          p-6
          mt-8
        "
      >
        <h3
          className="
            text-xl
            font-bold
            mb-4
          "
        >
          Últimas Órdenes
        </h3>

        <div className="space-y-3">
          {data.latestServices?.map((service) => (
            <div
              key={service._id}
              className="
          flex
          justify-between
          border-b
          pb-2
        "
            >
              <span>{service.code}</span>

              <span>{service.customer?.name}</span>

              <span>{service.status}</span>
            </div>
          ))}
        </div>

        <TopEquipmentCard types={data.servicesByType} />
        <StatusChart data={data} />
      </motion.div>
    </motion.div>
  );
}
