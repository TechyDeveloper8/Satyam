import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Shield, Zap, Flame, Award, ChevronRight } from 'lucide-react';
import { productService } from '../services/productService';
import { categoryService } from '../services/categoryService';
import { ProductCarousel, ProductGrid } from '../components/product/ProductGrid';
import { SkeletonLoader } from '../components/common/SkeletonLoader';

export const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [bestsellerProducts, setBestsellerProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [cats, feat, best, news] = await Promise.all([
          categoryService.getCategories(),
          productService.getCollectionProducts('featured'),
          productService.getCollectionProducts('bestseller'),
          productService.getCollectionProducts('new-arrival')
        ]);
        setCategories(cats);
        setFeaturedProducts(feat);
        setBestsellerProducts(best);
        setNewArrivals(news);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-16 sm:space-y-24">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-6 pb-12 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Editorial Copy */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="lg:col-span-7 space-y-6 text-left"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-white/80 text-xs font-bold text-slate-800 shadow-sm">
                <Sparkles size={14} className="text-amber-500" />
                <span>2026 Architectural Acoustic & Tech Collection</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                Purity in Form. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500">
                  Precision in Audio.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed">
                Discover a curated universe of titanium acoustic hardware, minimal smartwatches, CNC machined keyboards, and stoneware interior objects.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/products"
                  className="px-7 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm shadow-xl flex items-center gap-2 transition-transform active:scale-95"
                >
                  Explore Catalog <ArrowRight size={16} />
                </Link>
                <Link
                  to="/products?category=Audio"
                  className="px-6 py-3.5 rounded-2xl glass-panel hover:bg-white text-slate-900 font-bold text-sm border border-slate-300/80 transition-colors"
                >
                  Audio Acoustics
                </Link>
              </div>

              {/* Floating Glass Specs */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-300/60 max-w-lg">
                <div>
                  <h4 className="text-xl font-extrabold text-slate-900">45 hrs</h4>
                  <p className="text-[11px] text-slate-500 font-medium">ANC Battery Life</p>
                </div>
                <div>
                  <h4 className="text-xl font-extrabold text-slate-900">Grade 5</h4>
                  <p className="text-[11px] text-slate-500 font-medium">Titanium Chassis</p>
                </div>
                <div>
                  <h4 className="text-xl font-extrabold text-slate-900">480 GSM</h4>
                  <p className="text-[11px] text-slate-500 font-medium">Organic Terry</p>
                </div>
              </div>
            </motion.div>

            {/* Right Hero Image Card with Glass Elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden glass-card p-4 shadow-2xl border border-white/80">
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&q=80"
                  alt="Aether Studio ANC Headphones"
                  className="w-full h-full object-cover rounded-2xl hover:scale-105 transition-transform duration-700"
                />

                {/* Floating Glass Spec Badge */}
                <div className="absolute bottom-8 left-8 right-8 glass-panel p-4 rounded-2xl border border-white/90 shadow-glass flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">
                      Aether Acoustic
                    </span>
                    <h4 className="text-xs font-bold text-slate-900">Aether Studio ANC</h4>
                  </div>
                  <span className="px-3 py-1 bg-slate-900 text-white font-extrabold text-xs rounded-xl">
                    $299
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dynamic Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-widest block">
              Curated Worlds
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Browse by Category</h2>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat._id}
              to={`/products?category=${encodeURIComponent(cat.name)}`}
              className="group relative aspect-square rounded-2xl overflow-hidden glass-card p-3 flex flex-col justify-end transition-all hover:-translate-y-1"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
              <div className="relative z-10 text-white space-y-0.5">
                <h4 className="text-xs sm:text-sm font-extrabold leading-tight">{cat.name}</h4>
                <p className="text-[10px] text-slate-300 font-medium">Explore Catalog →</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Carousel */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <SkeletonLoader count={4} />
        ) : (
          <ProductCarousel
            subtitle="Curated Recommendations"
            title="Featured Essentials"
            products={featuredProducts}
          />
        )}
      </section>

      {/* Promotional Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden glass-panel p-8 sm:p-12 border border-white/90 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-2xl">
          <div className="max-w-xl space-y-4 relative z-10">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-extrabold uppercase tracking-widest text-slate-200">
              Limited Horological Release
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Monolith Series 4 — Titanium Grade 5
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Forged from aerospace titanium with curved sapphire crystal glass. Engineered for 7-day continuous biometric tracking.
            </p>
            <Link
              to="/product/monolith-watch-series-4"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-xl font-extrabold text-xs hover:bg-slate-100 transition-colors shadow-lg"
            >
              Order Monolith $449 <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Best Sellers Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-widest block">
              Top Ratings & Reviews
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Bestselling Hardware</h2>
          </div>
          <Link to="/products" className="text-xs font-bold text-slate-900 hover:underline">
            View All →
          </Link>
        </div>

        {loading ? <SkeletonLoader count={4} /> : <ProductGrid products={bestsellerProducts} />}
      </section>

      {/* New Arrivals Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <SkeletonLoader count={4} />
        ) : (
          <ProductCarousel
            subtitle="Fresh Drops"
            title="New Arrivals 2026"
            products={newArrivals}
          />
        )}
      </section>
    </div>
  );
};
