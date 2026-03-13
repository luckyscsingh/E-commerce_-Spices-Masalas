function StatCard({ title, value, change, color }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border w-full">

      <div className="flex justify-between items-start">

        <div>
          <p className="text-gray-500 text-sm">
            {title}
          </p>

          <h3 className="text-2xl font-semibold mt-1">
            {value}
          </h3>
        </div>

        <span
          className={`text-xs font-medium ${color} shrink-0`}
        >
          {change}
        </span>

      </div>

    </div>
  );
}

export default StatCard;