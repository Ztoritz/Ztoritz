import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatAssistant from './components/ChatAssistant';
import Home from './pages/Home';
import Products from './pages/Products';
import Contact from './pages/Contact';
import { PageRoute } from './types';

// Placeholder components for missing pages
const Services = () => <div className="pt-32 pb-20 text-center text-2xl font-bold text-gray-500 min-h-screen">Tjänster (Kommer snart)</div>;
const About = () => <div className="pt-32 pb-20 text-center text-2xl font-bold text-gray-500 min-h-screen">Om Oss (Kommer snart)</div>;

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen font-sans text-slate-900">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path={PageRoute.HOME} element={<Home />} />
            <Route path={PageRoute.PRODUCTS} element={<Products />} />
            <Route path={PageRoute.CONTACT} element={<Contact />} />
            <Route path={PageRoute.SERVICES} element={<Services />} />
            <Route path={PageRoute.ABOUT} element={<About />} />
            <Route path="*" element={<Navigate to={PageRoute.HOME} replace />} />
          </Routes>
        </main>
        <ChatAssistant />
        <Footer />
      </div>
    </Router>
  );
};

export default App;