"use client";

import { Star, MapPin, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const FEATURED_HOSTS = [
    {
        id: 1,
        name: "Valentina Rossi",
        specialties: ["Gala", "Empresarial"],
        location: "Santiago, Chile",
        rating: 4.9,
        rate: 85000,
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop",
        verified: true,
    },
    {
        id: 2,
        name: "Alessandro Silva",
        specialties: ["Bodas", "Conversación"],
        location: "Viña del Mar, Chile",
        rating: 5.0,
        rate: 95000,
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop",
        verified: true,
    },
    {
        id: 3,
        name: "Isabella Martinez",
        specialties: ["Gala", "Cultura"],
        location: "Concepcion, Chile",
        rating: 4.8,
        rate: 75000,
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
        verified: true,
    },
];

function HostCard({ host, index }: { host: any; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group bg-midnight-light/30 border border-gold/10 rounded-2xl overflow-hidden hover:border-gold/40 transition-all duration-500 shadow-xl"
        >
            <Link href={`/anfitrion/${host.id}`} className="relative block aspect-[3/4] overflow-hidden">
                <img
                    src={host.image}
                    alt={host.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-transparent opacity-60" />

                {host.verified && (
                    <div className="absolute top-4 right-4 bg-gold text-midnight px-2 py-1 rounded-md text-[10px] font-bold flex items-center gap-1 shadow-lg">
                        <ShieldCheck size={12} />
                        VERIFICADO
                    </div>
                )}

                <div className="absolute bottom-4 left-4 right-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 text-shadow">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="flex text-gold">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={12} fill={i < Math.floor(host.rating) ? "currentColor" : "none"} />
                            ))}
                        </div>
                        <span className="text-[10px] text-bone/60">{host.rating} (42 reseñas)</span>
                    </div>
                    <h3 className="text-xl font-serif text-bone group-hover:text-gold transition-colors">{host.name}</h3>
                </div>
            </Link>

            <div className="p-5">
                <div className="flex items-center gap-1 text-bone/50 text-[11px] uppercase tracking-widest mb-3">
                    <MapPin size={12} className="text-gold" />
                    {host.location}
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                    {host.specialties.map((s: string) => (
                        <span key={s} className="px-2 py-0.5 border border-gold/20 rounded-full text-[10px] text-gold/80 bg-gold/5">
                            {s}
                        </span>
                    ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gold/10">
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-tighter text-bone/40">Tarifa desde</span>
                        <span className="text-gold font-bold">{new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(host.rate)}<small className="text-[10px] font-normal text-bone/40 ml-1">/ hora</small></span>
                    </div>
                    <Link href={`/anfitrion/${host.id}`} className="bg-bone text-midnight text-xs font-bold px-4 py-2 rounded-lg hover:bg-gold transition-colors">
                        Ver Perfil
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}

export default function FeaturedHosts() {
    return (
        <section className="py-24 bg-midnight relative">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
                    <div className="max-w-xl">
                        <span className="text-gold text-xs font-bold uppercase tracking-[0.3em] mb-3 block">Nuestra Selección</span>
                        <h2 className="text-4xl md:text-5xl font-serif text-bone mb-4">Anfitriones Destacados</h2>
                        <p className="text-bone/50">
                            Conoce a los miembros más exclusivos de nuestro club. Perfiles verificados con excelencia en servicio y discreción.
                        </p>
                    </div>
                    <Link href="/explorar" className="text-gold border-b border-gold/30 pb-1 text-sm font-medium hover:border-gold transition-all">
                        Ver todos los anfitriones →
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {FEATURED_HOSTS.map((host, idx) => (
                        <HostCard key={host.id} host={host} index={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
}
