import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function RecipesPage() {
  return (
    <>
    <Navbar/>
    
    <div className="min-h-screen bg-yellow-100/20 px-4 sm:px-6 py-10">
      
      <div className="max-w-7xl mx-auto">
        
        <h1 className="text-3xl sm:text-4xl font-bold text-yellow-600 mb-8">
          Recipes
        </h1>

        <p className="text-gray-600 mb-10">
          Discover authentic Indian recipes crafted with premium spices.
        </p>

        {/* Sample Recipe Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          
          <div className="bg-white rounded-2xl shadow-md p-5">
            <h3 className="font-semibold text-lg mb-2">Butter Chicken</h3>
            <p className="text-sm text-gray-500">
              A creamy tomato-based curry with rich spices.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5">
            <h3 className="font-semibold text-lg mb-2">Paneer Tikka</h3>
            <p className="text-sm text-gray-500">
              Marinated paneer grilled with aromatic masalas.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5">
            <h3 className="font-semibold text-lg mb-2">Biryani</h3>
            <p className="text-sm text-gray-500">
              Fragrant rice layered with spices and herbs.
            </p>
          </div>

        </div>

      </div>

    </div>
    <Footer/>

    </>
  );
}