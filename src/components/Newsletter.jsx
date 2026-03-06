function Newsletter() {
  return (
    <section className="bg-yellow-100/20 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-[#d8cfb0] to-[#e6d7b8] rounded-[40px] px-16 py-16">
          
          {/* Content */}
          <div className="max-w-4xl">
            <h3 className="text-4xl font-bold text-gray-900 mb-6">
              Get Spice Recipes & Offers
            </h3>

            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              Join our community and get exclusive tips on how to use authentic
              Indian spices in your everyday cooking.
            </p>

            {/* Input + Button */}
            <div className="flex items-center gap-6">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-8 py-5 rounded-full bg-white text-gray-600 text-lg shadow-md outline-none"
              />

              <button className="bg-[#d4af37] hover:bg-[#c89f2d] transition px-10 py-5 rounded-full text-lg font-semibold text-black shadow-md">
                Subscribe
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Newsletter;