function Newsletter() {
  return (
    <section className="bg-yellow-100/20 py-16 sm:py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-[#d8cfb0] to-[#e6d7b8] 
                        rounded-3xl sm:rounded-[40px] 
                        px-6 sm:px-12 lg:px-16 
                        py-10 sm:py-14 lg:py-16">

          <div className="max-w-4xl">
            
            {/* Heading */}
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Get Spice Recipes & Offers
            </h3>

            {/* Paragraph */}
            <p className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-10 leading-relaxed">
              Join our community and get exclusive tips on how to use authentic
              Indian spices in your everyday cooking.
            </p>

            {/* Input + Button */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              
              <input
                type="email"
                placeholder="Your email address"
                className="w-full flex-1 px-6 sm:px-8 py-4 sm:py-5 
                           rounded-full bg-white text-gray-600 
                           text-base sm:text-lg 
                           shadow-md outline-none"
              />

              <button className="w-full sm:w-auto 
                                 bg-[#d4af37] hover:bg-[#c89f2d] 
                                 transition px-8 sm:px-10 
                                 py-4 sm:py-5 
                                 rounded-full 
                                 text-base sm:text-lg 
                                 font-semibold text-black shadow-md">
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