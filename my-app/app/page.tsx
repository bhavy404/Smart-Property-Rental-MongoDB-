"use client";

import { useEffect, useState } from "react";

// Types corresponding to our MongoDB schema
interface Property {
  _id: number;
  title: string;
  location: string;
  price: number;
  amenities: string[];
  available: boolean;
  verified: boolean;
  image_url?: string;
  bedrooms?: number;
  bathrooms?: number;
  sqft?: number;
}

export default function Home() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch properties from our Next.js API (which connects to MongoDB)
  useEffect(() => {
    async function fetchProperties() {
      try {
        const res = await fetch("/api/properties");
        const json = await res.json();
        if (json.success) {
          setProperties(json.data);
        }
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProperties();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-extrabold text-blue-600 tracking-tight flex items-center gap-2">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
                Spark<span className="text-gray-900">Properties</span>
              </span>
            </div>
            <div className="hidden sm:flex space-x-8 items-center">
              <a href="#properties" onClick={(e) => { e.preventDefault(); document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-gray-900 font-semibold px-3 py-2 border-b-2 border-blue-600">Explore</a>
              <button onClick={() => alert('Saved properties feature connects to the User collection in MongoDB. Coming soon!')} className="text-gray-500 hover:text-gray-900 font-medium transition">Saved</button>
              <button onClick={() => alert('Messaging system utilizes MongoDB embedded documents. Coming soon!')} className="text-gray-500 hover:text-gray-900 font-medium transition">Messages</button>
              <button onClick={() => alert('Authentication system using MongoDB User documents is required to Sign In.')} className="bg-gray-900 text-white px-5 py-2 rounded-full font-medium hover:bg-gray-800 transition shadow-sm">Sign In</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center lg:py-48">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl tracking-tight">
            Find your next <span className="text-blue-500">perfect</span> home
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-gray-300 mx-auto">
            Explore premium rental properties fetched in real-time from our scalable NoSQL database.
          </p>
          <div className="mt-10 flex justify-center max-w-3xl mx-auto">
            <div className="flex w-full bg-white rounded-full shadow-lg p-2 overflow-hidden">
              <input type="text" placeholder="Search by location (e.g. Mumbai, Delhi)..." className="w-full px-6 py-3 text-gray-700 outline-none rounded-l-full" />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition shadow-md">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <main id="properties" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Premium Listings</h2>
            <p className="mt-2 text-gray-500 font-medium">Live data loaded from MongoDB ({properties.length} properties found)</p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-y-12 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <div key={property._id} className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 transform hover:-translate-y-1 flex flex-col">
                
                {/* Image Section */}
                <div className="w-full h-64 relative bg-gray-200 overflow-hidden">
                  <img 
                    src={property.image_url || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} 
                    alt={property.title} 
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {property.available ? (
                      <span className="bg-white/90 backdrop-blur-sm text-gray-900 text-xs px-3 py-1.5 rounded-full font-bold shadow-sm flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span> Available
                      </span>
                    ) : (
                      <span className="bg-red-500/90 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-sm">
                        Rented
                      </span>
                    )}
                  </div>
                  {property.verified && (
                    <div className="absolute top-4 right-4">
                       <span className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-sm flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg> Verified
                      </span>
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-sm font-semibold text-blue-600 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      {property.location}
                    </p>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                    {property.title}
                  </h3>

                  {/* Bed, Bath, Sqft Row */}
                  <div className="flex items-center text-gray-600 text-sm space-x-4 mb-4 font-medium border-b border-gray-100 pb-4">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                      {property.bedrooms || 2} Beds
                    </span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg>
                      {property.bathrooms || 1} Baths
                    </span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                      {property.sqft || 1200} sqft
                    </span>
                  </div>

                  <div className="flex-grow">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {property.amenities.slice(0, 3).map((amenity, idx) => (
                        <span key={idx} className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-gray-50 text-gray-600 border border-gray-200">
                          {amenity}
                        </span>
                      ))}
                      {property.amenities.length > 3 && (
                         <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-gray-50 text-gray-600 border border-gray-200">
                         +{property.amenities.length - 3} more
                       </span>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                     <p className="text-3xl font-extrabold text-gray-900 tracking-tight">
                      ₹{property.price.toLocaleString()}
                      <span className="text-sm font-semibold text-gray-500 tracking-normal">/mo</span>
                    </p>
                    <button 
                      disabled={!property.available}
                      className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm ${
                        property.available 
                          ? "bg-gray-900 hover:bg-gray-800 text-white hover:shadow-md" 
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {property.available ? "Details" : "Unavailable"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
           <span className="text-xl font-extrabold text-blue-600 tracking-tight mb-4">
                Spark<span className="text-gray-900">Properties</span>
           </span>
          <p className="text-gray-500 text-sm font-medium">
            Database Engineering Project © 2026. Data seamlessly integrated from MongoDB.
          </p>
        </div>
      </footer>
    </div>
  );
}
