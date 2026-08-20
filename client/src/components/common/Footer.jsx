import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, ShieldCheck, Truck, RefreshCw, CreditCard } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [openSection, setOpenSection] = useState(null);
  const { addToast } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      if (addToast) addToast('Thank you for subscribing to Aether Journal!', 'success');
      setEmail('');
    }
  };

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  const footerSections = [
    {
      title: 'Shop Catalog',
      links: [
        { name: 'Audio & Acoustics', path: '/products?category=Audio' },
        { name: 'Wearables & Timepieces', path: '/products?category=Wearables' },
        { name: 'Minimalist Tech', path: '/products?category=Tech' },
        { name: 'Living & Interiors', path: '/products?category=Living' },
        { name: 'Apparel & Accessories', path: '/products?category=Apparel' }
      ]
    },
    {
      title: 'Customer Care',
      links: [
        { name: 'Order Tracking', path: '/account/orders' },
        { name: 'Shipping & Delivery', path: '/products' },
        { name: 'Returns & Exchange', path: '/products' },
        { name: 'Size & Material Guide', path: '/products' },
        { name: 'Contact Concierge', path: '/account' }
      ]
    },
    {
      title: 'About Aether',
      links: [
        { name: 'Our Design Ethos', path: '/' },
        { name: 'Sustainability & Materials', path: '/' },
        { name: 'Editorial Journal', path: '/' },
        { name: 'Press & Media', path: '/' },
        { name: 'Careers', path: '/' }
      ]
    }
  ];

  return (
    <footer className="w-full bg-[#EAEAE8] text-slate-800 border-t border-slate-300/70 pt-16 pb-24 md:pb-16 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Value Value Props Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-slate-300/80">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-white/80 text-slate-900 border border-slate-200">
              <Truck size={20} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Complimentary Shipping</h4>
              <p className="text-[11px] text-slate-600">On orders over $200 worldwide</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-white/80 text-slate-900 border border-slate-200">
              <RefreshCw size={20} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">30-Day Hassle Returns</h4>
              <p className="text-[11px] text-slate-600">Pre-paid shipping labels provided</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-white/80 text-slate-900 border border-slate-200">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">2-Year International Warranty</h4>
              <p className="text-[11px] text-slate-600">Comprehensive manufacturer coverage</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-white/80 text-slate-900 border border-slate-200">
              <CreditCard size={20} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Encrypted Payments</h4>
              <p className="text-[11px] text-slate-600">Apple Pay, Cards, UPI & Net Banking</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-12 border-b border-slate-300/80">
          
          {/* Brand Info & Newsletter Signup */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white font-black text-xs">
                Æ
              </div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900">
                AETHER<span className="text-slate-600 font-normal">STORE</span>
              </span>
            </div>

            <p className="text-xs text-slate-600 max-w-sm leading-relaxed">
              Curated minimal architectural electronics, acoustic hardware, and essential interior objects crafted with precision engineered materials.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2 max-w-md pt-2">
              <label className="text-xs font-bold text-slate-900 block">
                Subscribe to Aether Journal
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white/80 border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors flex items-center gap-1"
                >
                  Join <ArrowRight size={14} />
                </button>
              </div>
            </form>
          </div>

          {/* Footer Accordion Navigation */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {footerSections.map((section, idx) => (
              <div key={section.title} className="border-b sm:border-none border-slate-300 pb-3 sm:pb-0">
                <button
                  onClick={() => toggleSection(idx)}
                  className="w-full flex items-center justify-between sm:justify-start text-xs font-extrabold uppercase tracking-wider text-slate-900 py-1"
                >
                  {section.title}
                  <ChevronDown
                    size={16}
                    className={`sm:hidden transition-transform ${openSection === idx ? 'rotate-180' : ''}`}
                  />
                </button>

                <ul
                  className={`space-y-2.5 pt-3 sm:block ${
                    openSection === idx ? 'block' : 'hidden sm:block'
                  }`}
                >
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.path}
                        className="text-xs text-slate-600 hover:text-slate-900 transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Legal Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Aether Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
            <span className="hover:underline cursor-pointer">Terms of Service</span>
            <span className="hover:underline cursor-pointer">Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
