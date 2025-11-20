import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Settings, Database, Wind, CheckCircle2 } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-primary">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/id/1033/1920/1080" 
            alt="Industriell bakgrund" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <div className="inline-block bg-secondary/20 border border-secondary/30 rounded-full px-4 py-1 mb-6">
              <span className="text-accent font-semibold text-sm tracking-wide uppercase">Sedan 1985</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
              Innovation under <span className="text-secondary">tryck</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Vi är specialister på hydraulik, gassystem och högtrycksteknik. 
              Från komponenter till kompletta system och kvalificerad service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/products" 
                className="bg-secondary hover:bg-sky-500 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 shadow-lg shadow-secondary/25"
              >
                Utforska Produkter <ArrowRight size={20} />
              </Link>
              <Link 
                to="/contact" 
                className="border border-white/30 hover:bg-white/10 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all flex items-center justify-center"
              >
                Kontakta Oss
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Våra Expertområden</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Vi levererar helhetslösningar för krävande miljöer. Vår expertis sträcker sig från enskilda komponenter till komplexa system.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Database,
                title: "Hydraulik",
                desc: "Ackumulatorer, ventiler och skräddarsydda hydraulsystem för industriella applikationer.",
                img: "https://picsum.photos/id/1021/800/600"
              },
              {
                icon: Wind,
                title: "Gasteknik",
                desc: "Gasförstärkare (Boosters), gaskompressorer och hantering av högtrycksgaser.",
                img: "https://picsum.photos/id/1002/800/600"
              },
              {
                icon: Settings,
                title: "Service & Provning",
                desc: "Förebyggande underhåll, provtryckning och ackreditering enligt gällande standarder.",
                img: "https://picsum.photos/id/1059/800/600"
              }
            ].map((item, index) => (
              <div key={index} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-8">
                  <div className="bg-blue-50 w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-secondary">
                    <item.icon size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-3">{item.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{item.desc}</p>
                  <Link to="/services" className="text-secondary font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                    Läs mer <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="relative">
                    <img 
                        src="https://picsum.photos/id/1070/800/800" 
                        alt="Quality control" 
                        className="rounded-3xl shadow-2xl"
                    />
                    <div className="absolute -bottom-6 -right-6 bg-white p-8 rounded-2xl shadow-xl border border-gray-100 hidden md:block">
                        <div className="flex items-center gap-4">
                            <div className="text-5xl font-bold text-secondary">35+</div>
                            <div className="text-gray-600 leading-tight">
                                År av<br />erfarenhet
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="text-4xl font-bold text-primary mb-6">Varför välja Hydmos?</h2>
                    <p className="text-lg text-gray-600 mb-8">
                        Vi kombinerar teknisk spetskompetens med snabb service. Våra lösningar är designade för att maximera driftstiden och minimera risker.
                    </p>
                    <ul className="space-y-4">
                        {[
                            "Certifierade tekniker och ingenjörer",
                            "Snabb respons och rikstäckande service",
                            "Lagerhållning av kritiska komponenter",
                            "Skräddarsydda systemlösningar"
                        ].map((point, i) => (
                            <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                                <CheckCircle2 className="text-green-500 flex-shrink-0" />
                                {point}
                            </li>
                        ))}
                    </ul>
                    <div className="mt-10">
                        <Link to="/about" className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors">
                            Mer om oss
                        </Link>
                    </div>
                </div>
            </div>
        </div>
      </section>

    </div>
  );
};

export default Home;