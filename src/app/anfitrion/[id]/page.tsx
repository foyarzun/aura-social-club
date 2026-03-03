import Navbar from "@/components/layout/Navbar";
import BookingCalendar from "@/components/profile/BookingCalendar";
import { Star, MapPin, ShieldCheck, Heart, Share2, Award, Languages, MessageCircle } from "lucide-react";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default function HostProfilePage() {

    // En una versión real, estos datos vendrían de Supabase basado en params.id
    const host = {
        id: "1",
        name: "Valentina Rossi",
        bio: "Especialista en eventos de alta gala y cenas empresariales. Idiomas: Español, Inglés e Italiano. Mi enfoque es proporcionar una compañía distinguida, culta y discreta que eleve cualquier ocasión social.",
        hourly_rate: 125000,
        rating: 4.9,
        reviews_count: 56,
        region: "Santiago, Chile",
        specialties: ["Gala", "Empresarial", "Conversación", "Cultura"],
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop",
        verified: true,
        languages: ["Español (Nativo)", "Inglés (C1)", "Italiano (B2)"],
        portfolio: [
            "https://images.unsplash.com/photo-1485872224827-72e172654ee3?q=80&w=1000",
            "https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=1000",
            "https://images.unsplash.com/photo-1533000396123-40576565532f?q=80&w=1000",
        ]
    };

    const formatCurrency = (val: number) =>
        new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(val);

    return (
        <main className="min-h-screen bg-midnight pb-24">
            <Navbar />

            {/* Hero Section / Cover */}
            <div className="relative h-[45vh] lg:h-[60vh] overflow-hidden">
                <Image
                    src={host.image}
                    alt={host.name}
                    fill
                    className="object-cover object-top opacity-50 blur-[2px] scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/60 to-transparent" />
            </div>

            <div className="container mx-auto px-6 -mt-32 lg:-mt-48 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 items-start">

                    {/* Main Info Area */}
                    <div className="space-y-12">
                        <div className="flex flex-col md:flex-row gap-8 items-end md:items-center">
                            <div className="relative w-48 h-64 md:w-56 md:h-72 rounded-3xl overflow-hidden border-2 border-gold/40 shadow-2xl shadow-gold/10 transform -rotate-2">
                                <Image src={host.image} alt={host.name} fill className="object-cover" />
                            </div>
                            <div className="flex-1 space-y-4">
                                <div className="flex items-center gap-3">
                                    <h1 className="text-5xl font-serif text-bone">{host.name}</h1>
                                    {host.verified && <ShieldCheck className="text-gold" size={28} />}
                                </div>
                                <div className="flex flex-wrap items-center gap-6 text-bone/60 text-sm">
                                    <div className="flex items-center gap-1">
                                        <MapPin size={16} className="text-gold" />
                                        {host.region}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Star size={16} className="text-gold fill-gold" />
                                        <span className="text-bone font-bold">{host.rating}</span>
                                        <span className="opacity-60">({host.reviews_count} reseñas)</span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-2 bg-bone/5 border border-gold/20 rounded-xl text-gold hover:bg-gold/10 transition-colors">
                                        <Heart size={20} />
                                    </button>
                                    <button className="p-2 bg-bone/5 border border-gold/20 rounded-xl text-gold hover:bg-gold/10 transition-colors">
                                        <Share2 size={20} />
                                    </button>
                                    <button className="flex items-center gap-2 px-4 py-2 bg-gold text-midnight rounded-xl font-bold text-sm shadow-lg shadow-gold/20 hover:scale-105 transition-transform">
                                        <MessageCircle size={18} />
                                        Chat Directo
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Specialties & About */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gold border-b border-gold/20 pb-2">Sobre Mi</h3>
                                <p className="text-bone/70 leading-relaxed font-light text-lg italic">
                                    "{host.bio}"
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {host.specialties.map(s => (
                                        <span key={s} className="px-3 py-1 bg-gold/5 border border-gold/20 rounded-full text-xs text-gold uppercase tracking-widest font-bold">{s}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gold border-b border-gold/20 pb-2">Detalles Adicionales</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-center gap-4 text-bone/80">
                                        <Languages className="text-gold/60" size={20} />
                                        <div>
                                            <p className="text-[10px] uppercase text-bone/40 font-bold">Idiomas</p>
                                            <p className="text-sm">{host.languages.join(" • ")}</p>
                                        </div>
                                    </li>
                                    <li className="flex items-center gap-4 text-bone/80">
                                        <Award className="text-gold/60" size={20} />
                                        <div>
                                            <p className="text-[10px] uppercase text-bone/40 font-bold">Insignia</p>
                                            <p className="text-sm">Anfitriona Élite (Top 5%)</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Portfolio Grid */}
                        <div className="space-y-6">
                            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gold border-b border-gold/20 pb-2">Galería de Momentos</h3>
                            <div className="grid grid-cols-3 gap-4">
                                {host.portfolio.map((img, i) => (
                                    <div key={i} className="aspect-square relative rounded-2xl overflow-hidden group cursor-pointer border border-gold/10">
                                        <Image src={img} alt="Moment" fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sticky Booking Area */}
                    <div className="sticky top-24">
                        <div className="mb-4 flex items-center justify-between px-2">
                            <span className="text-bone font-serif text-2xl">{formatCurrency(host.hourly_rate)}<small className="text-sm text-bone/40 font-sans ml-1 tracking-normal">/hora</small></span>
                            <div className="px-3 py-1 bg-gold/10 rounded-lg text-gold text-[10px] font-bold uppercase tracking-widest">
                                Disponibilidad Hoy
                            </div>
                        </div>
                        <BookingCalendar hourlyRate={host.hourly_rate} hostId={host.id} />

                        <p className="mt-4 text-[10px] text-center text-bone/30 uppercase tracking-[0.2em] leading-relaxed">
                            Pago 100% Protegido por Aura Escrow<br />Sin cargos ocultos para el cliente
                        </p>
                    </div>

                </div>
            </div>
        </main>
    );
}
