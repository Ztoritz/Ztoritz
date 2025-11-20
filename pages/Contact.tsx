import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="pt-20 bg-white min-h-screen">
        <div className="bg-primary text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl font-bold mb-4">Kontakta Oss</h1>
                <p className="text-gray-300 max-w-xl mx-auto">
                    Har du frågor om våra produkter eller behöver teknisk support? 
                    Vi finns här för att hjälpa dig.
                </p>
            </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                
                {/* Contact Form */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Skicka ett meddelande</h2>
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Förnamn</label>
                                <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Efternamn</label>
                                <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">E-post</label>
                            <input type="email" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Ämne</label>
                            <select className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary bg-white">
                                <option>Offertförfrågan</option>
                                <option>Teknisk Support</option>
                                <option>Servicebokning</option>
                                <option>Övrigt</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Meddelande</label>
                            <textarea rows={5} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary"></textarea>
                        </div>
                        <button type="submit" className="w-full bg-secondary hover:bg-sky-700 text-white font-bold py-4 rounded-lg transition-colors">
                            Skicka Meddelande
                        </button>
                    </form>
                </div>

                {/* Info & Map */}
                <div className="space-y-12">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Kontaktinformation</h2>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="bg-blue-50 p-3 rounded-full text-secondary">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">Besöksadress</h3>
                                    <p className="text-gray-600">Industrivägen 12<br/>123 45 Stockholm</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-4">
                                <div className="bg-blue-50 p-3 rounded-full text-secondary">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">Telefon</h3>
                                    <p className="text-gray-600">Växel: 08-123 45 67</p>
                                    <p className="text-gray-600">Support: 08-123 45 68</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-blue-50 p-3 rounded-full text-secondary">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">E-post</h3>
                                    <p className="text-gray-600">info@hydmos.se</p>
                                    <p className="text-gray-600">order@hydmos.se</p>
                                </div>
                            </div>

                             <div className="flex items-start gap-4">
                                <div className="bg-blue-50 p-3 rounded-full text-secondary">
                                    <Clock size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">Öppettider</h3>
                                    <p className="text-gray-600">Mån - Fre: 07:00 - 16:00</p>
                                    <p className="text-gray-600">Helg: Stängt</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Placeholder for Google Maps */}
                    <div className="bg-gray-200 rounded-2xl h-64 w-full flex items-center justify-center text-gray-400 overflow-hidden relative">
                        <img 
                            src="https://picsum.photos/id/10/800/600" 
                            alt="Map placeholder" 
                            className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale"
                        />
                        <span className="relative z-10 font-semibold bg-white px-4 py-2 rounded-lg shadow-sm">Karta (Simulerad)</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Contact;