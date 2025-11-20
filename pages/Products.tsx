import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { ProductItem } from '../types';

const productsData: ProductItem[] = [
    { id: '1', name: 'Blåsackumulator EPE', category: 'Ackumulatorer', description: 'Högkvalitativ blåsackumulator för industriellt bruk. Max tryck 350 bar.', imageUrl: 'https://picsum.photos/id/20/400/300' },
    { id: '2', name: 'Haskel Gas Booster', category: 'Gasteknik', description: 'Luftdriven gasförstärkare för tryck upp till 2000 bar. Oljefri kompression.', imageUrl: 'https://picsum.photos/id/21/400/300' },
    { id: '3', name: 'Högtrycksventil 60k', category: 'Ventiler', description: 'Nålventil för ultrahögt tryck. Rostfritt stål.', imageUrl: 'https://picsum.photos/id/22/400/300' },
    { id: '4', name: 'Kolvackumulator', category: 'Ackumulatorer', description: 'För stora volymer och höga flöden. Anpassningsbar slaglängd.', imageUrl: 'https://picsum.photos/id/23/400/300' },
    { id: '5', name: 'Tryckvakt ATEX', category: 'Instrument', description: 'Explosionsskyddad tryckvakt för farliga miljöer.', imageUrl: 'https://picsum.photos/id/24/400/300' },
    { id: '6', name: 'Hydraulpump Mobil', category: 'Hydraulik', description: 'Kompakt pumpaggregat för mobila applikationer.', imageUrl: 'https://picsum.photos/id/25/400/300' },
];

const Products: React.FC = () => {
    const [filter, setFilter] = useState('Alla');
    const [search, setSearch] = useState('');

    const categories = ['Alla', 'Ackumulatorer', 'Gasteknik', 'Ventiler', 'Hydraulik', 'Instrument'];

    const filteredProducts = productsData.filter(product => {
        const matchesCategory = filter === 'Alla' || product.category === filter;
        const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) || product.description.toLowerCase().includes(search.toLowerCase());
        return matchesCategory && matchesSearch;
    });

  return (
    <div className="pt-20 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="bg-primary text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold mb-4">Våra Produkter</h1>
                <p className="text-gray-300 max-w-2xl">
                    Ett brett sortiment av komponenter från världsledande tillverkare. 
                    Vi hjälper dig hitta rätt lösning för ditt system.
                </p>
            </div>
        </div>

        {/* Filter & Search */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
            <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col md:flex-row gap-6 items-center justify-between">
                
                {/* Categories */}
                <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                    <Filter size={20} className="text-gray-400 mr-2 hidden md:block" />
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                                filter === cat 
                                ? 'bg-secondary text-white' 
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Search */}
                <div className="relative w-full md:w-72">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Sök produkt..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                </div>
            </div>
        </div>

        {/* Product Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map(product => (
                    <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100 flex flex-col">
                        <div className="h-56 overflow-hidden bg-gray-100">
                            <img 
                                src={product.imageUrl} 
                                alt={product.name} 
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                            <div className="text-xs font-bold text-secondary uppercase tracking-wide mb-2">{product.category}</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                            <p className="text-gray-600 text-sm mb-6 flex-1">{product.description}</p>
                            <button className="w-full border border-primary text-primary hover:bg-primary hover:text-white font-medium py-2 rounded-lg transition-colors">
                                Produktblad
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            
            {filteredProducts.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-gray-500 text-lg">Inga produkter hittades som matchar din sökning.</p>
                </div>
            )}
        </div>
    </div>
  );
};

export default Products;