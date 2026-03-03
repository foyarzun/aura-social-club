"use client";

import { Search, MapPin, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Background with Gradient Overlay */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 scale-105"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519671482749-fd09be4ccebf?q=80&w=2070&auto=format&fit=crop')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-midnight via-midnight/60 to-midnight z-0" />

            <div className="relative z-10 container mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-bold uppercase tracking-widest mb-6">
                        <Sparkles size={14} />
                        Elegancia y Confianza
                    </div>
                    <h1 className="text-5xl md:text-7xl font-serif text-bone leading-tight mb-6">
                        Tu Compañía Ideal para <br />
                        <span className="text-gold italic">Momentos Inolvidables</span>
                    </h1>
                    <p className="text-lg md:text-xl text-bone/70 max-w-2xl mx-auto mb-12 font-light">
                        Encuentra anfitriones exclusivos para tus eventos sociales, galas y salidas culturales.
                        Seguridad, discreción y la mejor compañía.
                    </p>
                </motion.div>

                {/* Advanced Search Component */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="max-w-4xl mx-auto bg-midnight-light/40 backdrop-blur-xl border border-gold/20 p-2 rounded-2xl md:rounded-full shadow-2xl flex flex-col md:flex-row items-center gap-2"
                >
                    <div className="flex-1 w-full flex items-center gap-3 px-6 py-3 border-b md:border-b-0 md:border-r border-gold/10">
                        <MapPin className="text-gold" size={20} />
                        <div className="flex flex-col items-start">
                            <span className="text-[10px] uppercase tracking-tighter text-gold font-bold">Ubicación</span>
                            <input
                                type="text"
                                placeholder="¿Dónde necesitas compañía?"
                                className="bg-transparent border-none outline-none text-bone placeholder:text-bone/30 w-full text-sm"
                            />
                        </div>
                    </div>

                    <div className="flex-1 w-full flex items-center gap-3 px-6 py-3">
                        <Sparkles className="text-gold" size={20} />
                        <div className="flex flex-col items-start">
                            <span className="text-[10px] uppercase tracking-tighter text-gold font-bold">Especialidad</span>
                            <select className="bg-transparent border-none outline-none text-bone w-full text-sm appearance-none cursor-pointer">
                                <option value="">Cualquier evento</option>
                                <option value="boda">Boda</option>
                                <option value="gala">Gala</option>
                                <option value="empresarial">Empresarial</option>
                                <option value="conversacion">Conversación</option>
                            </select>
                        </div>
                    </div>

                    <Link href="/explorar" className="w-full md:w-auto">
                        <button className="w-full md:w-auto bg-gold text-midnight h-14 px-10 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-gold/90 transition-all transform hover:scale-[1.02]">
                            <Search size={18} />
                            Buscar Aura
                        </button>
                    </Link>
                </motion.div>
            </div>

            {/* Decorative Blur */}
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold/5 blur-[120px] rounded-full" />
            <div className="absolute top-[10%] right-[-10%] w-[30%] h-[30%] bg-gold/5 blur-[100px] rounded-full" />
        </section>
    );
}
