"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import ExplorarFilters from "@/components/explorar/Filters";
import { Star, MapPin, ShieldCheck, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Mock data (ready to be replaced by Supabase RPC 'filter_hosts_by_region_and_specialty')
const MOCK_HOSTS = [
    { id: 1, full_name: "Valentina Rossi", specialties: ["gala", "empresarial"], hourly_rate: 85000, rating: 4.9, region_name: "Santiago", avatar_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400" },
    { id: 2, full_name: "Alessandro Silva", specialties: ["boda", "conversacion"], hourly_rate: 95000, rating: 5.0, region_name: "Viña del Mar", avatar_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400" },
    { id: 3, full_name: "Isabella Martinez", specialties: ["gala", "conversacion"], hourly_rate: 75000, rating: 4.8, region_name: "Las Condes", avatar_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400" },
    { id: 4, full_name: "Julian Kosta", specialties: ["empresarial"], hourly_rate: 110000, rating: 4.7, region_name: "Santiago", avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400" },
];

import Link from "next/link";

function HostCard({ host }: { host: any }) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-midnight-light/30 border border-gold/10 rounded-2xl overflow-hidden group hover:border-gold/40 transition-all shadow-xl"
        >
            <Link href={`/anfitrion/${host.id}`} className="relative block aspect-[4/5] overflow-hidden">
                <img src={host.avatar_url} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-transparent opacity-60" />
                <button className="absolute top-4 right-4 p-2 bg-midnight/40 backdrop-blur-md rounded-full text-bone/60 hover:text-red-400 transition-colors z-20" onClick={(e) => e.stopPropagation()}>
                    <Heart size={18} />
                </button>
                <div className="absolute bottom-4 left-4">
                    <div className="flex text-gold gap-0.5 mb-1">
                        {[...Array(5)].map((_, i) => <Star key={i} size={10} fill={i < Math.floor(host.rating) ? "currentColor" : "none"} />)}
                    </div>
                    <h3 className="text-xl font-serif text-white">{host.full_name}</h3>
                </div>
            </Link>
            <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1 text-[10px] text-bone/50 uppercase tracking-widest">
                        <MapPin size={12} className="text-gold" />
                        {host.region_name}
                    </div>
                    <Link href={`/anfitrion/${host.id}`} className="text-[10px] text-gold font-bold uppercase tracking-widest hover:underline decoration-gold/40 underline-offset-4">
                        Ver Perfil
                    </Link>
                </div>
                <div className="flex flex-wrap gap-2 mb-4 h-6 items-center">
                    {host.specialties.map((s: string) => (
                        <span key={s} className="px-2 py-0.5 bg-gold/5 border border-gold/20 rounded text-[9px] text-gold font-bold uppercase">{s}</span>
                    ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gold/10">
                    <span className="text-gold font-bold text-lg">{new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(host.hourly_rate)}<small className="text-[10px] font-normal text-bone/40 ml-1">/hr</small></span>
                    <Link href={`/anfitrion/${host.id}`} className="bg-bone text-midnight text-[10px] font-black px-4 py-2 rounded-lg hover:bg-gold transition-colors uppercase tracking-widest">
                        Reservar
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}


export default function ExplorarPage() {
    const [filters, setFilters] = useState<any>({});

    // Logic to filter the mock data (simulating the SQL RPC)
    const filteredHosts = MOCK_HOSTS.filter(host => {
        if (filters.specialty && !host.specialties.includes(filters.specialty)) return false;
        if (filters.maxRate && host.hourly_rate > filters.maxRate) return false;
        // Regional mock filtering (hardcoded for demo)
        if (filters.region && host.region_name === "Santiago" && filters.region !== "cf744654-7164-4458-97c7-508b982142e4" && filters.region !== "cf744654-7164-4458-97c7-508b982142e0") return false;
        return true;
    });

    return (
        <main className="min-h-screen bg-midnight">
            <Navbar />

            {/* Header */}
            <div className="pt-32 pb-12 bg-gradient-to-b from-midnight-light/50 to-midnight">
                <div className="container mx-auto px-6">
                    <h1 className="text-4xl md:text-5xl font-serif text-bone mb-4">Nuestra <span className="text-gold italic">Élite</span></h1>
                    <p className="text-bone/50 max-w-xl">Encuentra al anfitrión perfecto para elevar tu experiencia social. Filtrado por especialidad y región.</p>
                </div>
            </div>

            <div className="container mx-auto px-6 pb-24">
                <div className="grid grid-cols-1 xl:grid-cols-[350px_1fr] gap-12 items-start">
                    {/* Sidebar Filters */}
                    <ExplorarFilters onSearch={setFilters} />

                    {/* Results Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence mode="popLayout">
                            {filteredHosts.map((host) => (
                                <HostCard key={host.id} host={host} />
                            ))}
                        </AnimatePresence>

                        {filteredHosts.length === 0 && (
                            <div className="col-span-full py-24 text-center">
                                <div className="w-20 h-20 bg-gold/5 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <MapPin className="text-gold/20" size={40} />
                                </div>
                                <h3 className="text-2xl font-serif text-bone mb-2">Sin resultados</h3>
                                <p className="text-bone/40">Prueba ajustando los filtros de región o especialidad.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
