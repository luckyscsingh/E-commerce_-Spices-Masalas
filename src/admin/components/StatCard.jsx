function StatCard({ title, value, change, Icon }) {
  return (
    <div className="bg-white border rounded-xl p-5 shadow-sm flex justify-between items-start">
      
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-2xl font-bold mt-2">{value}</h2>
      </div>

      <div className="flex flex-col items-end">
        {/* ICON */}
        {Icon && <Icon className="text-yellow-500" size={22} />}

        {change && (
          <span className="text-green-600 text-xs mt-2">
            {change}
          </span>
        )}
      </div>

    </div>
  );
}

export default StatCard;