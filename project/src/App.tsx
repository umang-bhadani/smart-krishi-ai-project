import React, { useState } from 'react';
import { Sprout, MapPin, Droplets, Leaf, Users, Mail, Phone, Facebook, Twitter, Instagram, ChevronRight, CheckCircle, Thermometer, TestTube, TreePine } from 'lucide-react';

interface FormData {
  farmerName: string;
  location: string;
  soilType: string;
  soilPh: string;
  moistureLevel: string;
  organicContent: string;
  cropPreference: string;
}

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    farmerName: '',
    location: '',
    soilType: '',
    soilPh: '',
    moistureLevel: '',
    organicContent: '',
    cropPreference: ''
  });

  const [contactForm, setContactForm] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isContactSubmitted, setIsContactSubmitted] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsAnalyzing(true);
    
    // Prepare soil data for AI analysis
    const soilDataText = `
Farmer Information:
- Name: ${formData.farmerName}
- Location: ${formData.location}

Soil Analysis Data:
- Soil Type: ${formData.soilType}
- pH Level: ${formData.soilPh}
- Moisture Level: ${formData.moistureLevel}%
- Organic Content: ${formData.organicContent}%
- Crop Preference: ${formData.cropPreference || 'Not specified'}

Please provide detailed farming recommendations based on this soil data.
    `.trim();
    
    try {
      // Store data for the result page
      localStorage.setItem('soilAnalysisData', soilDataText);
      
      // Redirect to result page
      window.location.href = `/result.html?data=${encodeURIComponent(soilDataText)}`;
      
    } catch (error) {
      console.error('Error processing soil data:', error);
      setIsAnalyzing(false);
      alert('Error processing your data. Please try again.');
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact Form Submitted:', contactForm);
    setIsContactSubmitted(true);
    setTimeout(() => setIsContactSubmitted(false), 3000);
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const soilTypes = [
    {
      name: 'Clay Soil',
      icon: <TestTube className="w-8 h-8 text-amber-600" />,
      ph: '6.0 - 7.0',
      fertility: 'High',
      waterHolding: 'High',
      crops: 'Rice, Cotton, Sugarcane'
    },
    {
      name: 'Sandy Soil',
      icon: <Droplets className="w-8 h-8 text-yellow-600" />,
      ph: '6.0 - 7.5',
      fertility: 'Low',
      waterHolding: 'Low',
      crops: 'Millet, Groundnut, Watermelon'
    },
    {
      name: 'Loamy Soil',
      icon: <Leaf className="w-8 h-8 text-green-600" />,
      ph: '6.0 - 7.0',
      fertility: 'High',
      waterHolding: 'Medium',
      crops: 'Wheat, Barley, Vegetables'
    },
    {
      name: 'Silty Soil',
      icon: <TreePine className="w-8 h-8 text-blue-600" />,
      ph: '6.5 - 7.0',
      fertility: 'Medium',
      waterHolding: 'High',
      crops: 'Corn, Soybean, Vegetables'
    },
    {
      name: 'Peaty Soil',
      icon: <Thermometer className="w-8 h-8 text-brown-600" />,
      ph: '4.0 - 5.5',
      fertility: 'High',
      waterHolding: 'Very High',
      crops: 'Cranberries, Blueberries'
    },
    {
      name: 'Chalky Soil',
      icon: <TestTube className="w-8 h-8 text-gray-600" />,
      ph: '7.5 - 8.5',
      fertility: 'Low',
      waterHolding: 'Low',
      crops: 'Cabbage, Spinach, Beets'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header/Navbar */}
      <header className="bg-white shadow-md fixed w-full top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Sprout className="w-8 h-8 text-green-600" />
              <span className="text-xl font-bold text-green-800">Smart Krishi 1.0 🌱</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('home')} className="text-gray-700 hover:text-green-600 transition-colors">Home</button>
              <button onClick={() => scrollToSection('soil-input')} className="text-gray-700 hover:text-green-600 transition-colors">Soil Data Input</button>
              <button onClick={() => scrollToSection('soil-details')} className="text-gray-700 hover:text-green-600 transition-colors">Soil Details</button>
              <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-green-600 transition-colors">About</button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-green-600 transition-colors">Contact</button>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="pt-16 bg-gradient-to-br from-green-50 to-green-100 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-green-800 mb-6">
              Empowering Farmers with Smart Soil Insights
            </h1>
            <p className="text-xl md:text-2xl text-green-700 mb-8 max-w-3xl mx-auto">
              Enter soil details and get accurate, AI-powered farming advice to maximize your crop yield and soil health.
            </p>
            <button 
              onClick={() => scrollToSection('soil-input')}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center mx-auto"
            >
              Get Started <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* Soil Data Input Form */}
      <section id="soil-input" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">Soil Data Input</h2>
            <p className="text-lg text-gray-600">Provide your soil details for personalized farming recommendations</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {isAnalyzing && (
              <div className="mb-6 p-4 bg-green-100 border border-green-400 rounded-lg flex items-center">
                <div className="w-5 h-5 border-2 border-green-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                <span className="text-green-800">Analyzing your soil data with AI...</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Users className="w-4 h-4 inline mr-2" />
                  Farmer Name *
                </label>
                <input
                  type="text"
                  name="farmerName"
                  value={formData.farmerName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Location (District/State) *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="e.g., Pune, Maharashtra"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <TestTube className="w-4 h-4 inline mr-2" />
                  Soil Type *
                </label>
                <select
                  name="soilType"
                  value={formData.soilType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                >
                  <option value="">Select soil type</option>
                  <option value="clay">Clay</option>
                  <option value="sandy">Sandy</option>
                  <option value="loamy">Loamy</option>
                  <option value="silty">Silty</option>
                  <option value="peaty">Peaty</option>
                  <option value="chalky">Chalky</option>
                  <option value="saline">Saline</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Thermometer className="w-4 h-4 inline mr-2" />
                  Soil pH *
                </label>
                <input
                  type="number"
                  name="soilPh"
                  value={formData.soilPh}
                  onChange={handleInputChange}
                  required
                  min="0"
                  max="14"
                  step="0.1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="e.g., 6.5"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Droplets className="w-4 h-4 inline mr-2" />
                  Moisture Level (%) *
                </label>
                <input
                  type="number"
                  name="moistureLevel"
                  value={formData.moistureLevel}
                  onChange={handleInputChange}
                  required
                  min="0"
                  max="100"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="e.g., 25"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Leaf className="w-4 h-4 inline mr-2" />
                  Organic Content (%) *
                </label>
                <input
                  type="number"
                  name="organicContent"
                  value={formData.organicContent}
                  onChange={handleInputChange}
                  required
                  min="0"
                  max="100"
                  step="0.1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="e.g., 3.2"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <TreePine className="w-4 h-4 inline mr-2" />
                  Crop Preference (Optional)
                </label>
                <input
                  type="text"
                  name="cropPreference"
                  value={formData.cropPreference}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="e.g., Rice, Wheat, Vegetables"
                />
              </div>
              
              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={isAnalyzing}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  {isAnalyzing ? 'Analyzing...' : 'Submit Soil Data'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Soil Details Section */}
      <section id="soil-details" className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">Soil Types Knowledge Base</h2>
            <p className="text-lg text-gray-600">Learn about different soil types and their characteristics</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {soilTypes.map((soil, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  {soil.icon}
                  <h3 className="text-xl font-bold text-green-800 ml-3">{soil.name}</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">pH Range:</span>
                    <span className="font-semibold text-green-700">{soil.ph}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fertility:</span>
                    <span className="font-semibold text-green-700">{soil.fertility}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Water Holding:</span>
                    <span className="font-semibold text-green-700">{soil.waterHolding}</span>
                  </div>
                  <div className="mt-4">
                    <span className="text-gray-600 block mb-2">Suitable Crops:</span>
                    <span className="text-green-800 font-medium">{soil.crops}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">About Smart Krishi 1.0</h2>
            <p className="text-lg text-gray-600">Revolutionizing agriculture through intelligent technology</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-green-800 mb-6">Our Mission</h3>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                Smart Krishi 1.0 is dedicated to empowering farmers with cutting-edge AI technology and data-driven insights. 
                We bridge the gap between traditional farming wisdom and modern agricultural science.
              </p>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                  <span className="text-gray-700">AI-powered soil analysis and crop recommendations</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                  <span className="text-gray-700">Voice support in multiple regional languages</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                  <span className="text-gray-700">Real-time weather and market price updates</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                  <span className="text-gray-700">Sustainable farming practice guidance</span>
                </div>
              </div>
            </div>
            
            <div className="bg-green-100 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-green-800">10,000+</div>
                  <div className="text-green-600">Farmers Helped</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-800">50+</div>
                  <div className="text-green-600">Crop Types</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-800">95%</div>
                  <div className="text-green-600">Accuracy Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-800">24/7</div>
                  <div className="text-green-600">AI Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-green-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">Get In Touch</h2>
            <p className="text-lg text-gray-600">Have questions? We're here to help you grow better crops</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-green-800 mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="w-6 h-6 text-green-600 mr-4" />
                  <span className="text-gray-700">+91 9333727126</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-6 h-6 text-green-600 mr-4" />
                  <span className="text-gray-700">support@smartkrishi.com</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-6 h-6 text-green-600 mr-4" />
                  <span className="text-gray-700">Asansol, West Bengal, India</span>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="text-lg font-semibold text-green-800 mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <Facebook className="w-8 h-8 text-blue-600 hover:text-blue-800 cursor-pointer transition-colors" />
                  <Twitter className="w-8 h-8 text-blue-400 hover:text-blue-600 cursor-pointer transition-colors" />
                  <Instagram className="w-8 h-8 text-pink-600 hover:text-pink-800 cursor-pointer transition-colors" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {isContactSubmitted && (
                <div className="mb-6 p-4 bg-green-100 border border-green-400 rounded-lg flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-green-800">Message sent successfully! We'll get back to you soon.</span>
                </div>
              )}
              
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={contactForm.name}
                    onChange={handleContactChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="Enter your name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleContactChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="Enter your email"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={contactForm.message}
                    onChange={handleContactChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="Enter your message"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Sprout className="w-8 h-8 text-green-400" />
              <span className="text-xl font-bold">Smart Krishi 1.0 🌱</span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-green-200">© 2025 Smart Krishi 1.0. All rights reserved.</p>
              <p className="text-green-300 mt-1">Empowering farmers, nurturing the future.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;