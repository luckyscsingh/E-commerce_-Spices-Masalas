const Quality = () => {
  return (
    <section className="bg-[#f8f5ef] py-16 h-100">
      <div className="max-w-5xl mx-auto text-center px-6 pt-6">

        <h2 className="text-2xl md:text-5xl font-bold text-red-700">
          Our Unwavering Quality Promise
        </h2>

        <p className="mt-4 text-gray-600 italic">
          If it isn't organic, heritage-grown, and rich in flavor,
          it doesn’t enter our jars.
        </p>

        <div className="grid grid-cols-3 gap-6 mt-10">
          <div>
            <h3 className="text-xl font-bold">100%</h3>
            <p className="text-gray-600 text-sm">Organic Certified</p>
          </div>

          <div>
            <h3 className="text-xl font-bold">Direct</h3>
            <p className="text-gray-600 text-sm">Farm to Kitchen</p>
          </div>

          <div>
            <h3 className="text-xl font-bold">No</h3>
            <p className="text-gray-600 text-sm">Artificial Additives</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Quality;