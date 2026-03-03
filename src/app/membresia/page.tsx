"use client";

import Navbar from "@/components/layout/Navbar";
import { Check, Star, Crown, Diamond, Sparkles, ShieldCheck, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function MembershipPage() {
    const tiers = [
        {
            name: "Gold",
            price: "150.000",
            description: "La puerta de entrada a la sofisticación.",
            icon: Star,
            benefits: [
                "Acceso a perfiles verificados",
                "Reserva con 48h de antelación",
                "Soporte Concierge básico",
                "Invitaciones a eventos regionales"
            ],
            color: "from-amber-200 to-yellow-600",
            cta: "Empezar ahora"
        },
        {
            name: "Platinum",
            price: "350.000",
            description: "Para quienes buscan una presencia constante en el club.",
            icon: Crown,
            benefits: [
                "Todo lo de Gold",
                "Prioridad de reserva (24h)",
                "Acceso a 'Auras de Élite'",
                "Conserje dedicado 12/7",
                "10% de descuento en tarifas por hora"
            ],
            color: "from-slate-200 to-slate-500",
            featured: true,
            cta: "Seleccionar Platinum"
        },
        {
            name: "Diamond",
            price: "750.000",
            description: "El estatus máximo de Aura. Solo por invitación o aprobación.",
            icon: Diamond,
            benefits: [
                "Todo lo de Platinum",
                "Acceso a eventos internacionales VIP",
                "Conserje personal 24/7",
                "Sin límites de antelación en reservas",
                "Verificación de identidad prioritaria"
            ],
            color: "from-cyan-200 to-blue-400",
            cta: "Solicitar Acceso"
        }
    ];

    return (
        <main className="min-h-screen bg-midnight pb-20">
            <Navbar />

            {/* Header Section */}
            <section className="pt-32 pb-16 px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-3xl mx-auto space-y-6"
                >
                    <span className="text-gold text-xs font-black uppercase tracking-[0.5em] block">Suscripciones</span>
                    <h1 className="text-5xl md:text-7xl font-serif text-bone leading-tight">
                        Eleva tu <span className="text-gold italic">Aura</span>
                    </h1>
                    <p className="text-bone/50 text-lg font-light leading-relaxed">
                        Selecciona el nivel de acceso que mejor se adapte a tu estilo de vida.
                        Nuestras membresías están diseñadas para garantizar la calidad y exclusividad de cada interacción.
                    </p>
                </motion.div>
            </section>

            {/* Tiers Grid */}
            <section className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {tiers.map((tier, i) => (
                        <motion.div
                            key={tier.name}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={cn(
                                "relative group p-8 rounded-[2.5rem] border bg-midnight-light/10 transition-all duration-500",
                                tier.featured
                                    ? "border-gold/50 shadow-2xl shadow-gold/10 scale-105 z-10"
                                    : "border-gold/10 hover:border-gold/30"
                            )}
                        >
                            {tier.featured && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-midnight text-[10px] font-black uppercase tracking-widest py-1 px-4 rounded-full flex items-center gap-2 shadow-lg">
                                    <Sparkles size={12} /> Más Popular
                                </div>
                            )}

                            <div className="space-y-6">
                                <div className={cn(
                                    "w-16 h-16 rounded-3xl flex items-center justify-center bg-gradient-to-br shadow-lg",
                                    tier.color
                                )}>
                                    <tier.icon className="text-midnight" size={32} />
                                </div>

                                <div>
                                    <h3 className="text-3xl font-serif text-bone mb-1">{tier.name}</h3>
                                    <p className="text-bone/40 text-xs leading-relaxed">{tier.description}</p>
                                </div>

                                <div className="flex items-baseline gap-1">
                                    <span className="text-gold text-4xl font-serif">$ {tier.price}</span>
                                    <span className="text-bone/30 text-xs">/ Trimestre</span>
                                </div>

                                <div className="space-y-4 pt-4">
                                    {tier.benefits.map((benefit, j) => (
                                        <div key={j} className="flex items-center gap-3">
                                            <div className="w-5 h-5 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                                                <Check className="text-gold" size={12} />
                                            </div>
                                            <span className="text-bone/60 text-xs">{benefit}</span>
                                        </div>
                                    ))}
                                </div>

                                <button className={cn(
                                    "w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] transition-all transform hover:scale-[1.02]",
                                    tier.featured
                                        ? "bg-gold text-midnight shadow-xl shadow-gold/20"
                                        : "border border-gold text-gold hover:bg-gold/5"
                                )}>
                                    {tier.cta}
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Trust Badges */}
            <section className="container mx-auto px-6 mt-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-gold/10 pt-16">
                    <div className="flex items-start gap-4">
                        <ShieldCheck className="text-gold shrink-0" size={32} />
                        <div>
                            <h4 className="text-bone font-serif text-lg mb-2">Pago Seguro</h4>
                            <p className="text-bone/40 text-xs leading-relaxed">Encriptación de nivel bancario y manejo confidencial de tus transacciones.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <Zap className="text-gold shrink-0" size={32} />
                        <div>
                            <h4 className="text-bone font-serif text-lg mb-2">Activación Instantánea</h4>
                            <p className="text-bone/40 text-xs leading-relaxed">Tu perfil se eleva al momento de confirmar el pago de tu membresía.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <Crown className="text-gold shrink-0" size={32} />
                        <div>
                            <h4 className="text-bone font-serif text-lg mb-2">Estatus Verificado</h4>
                            <p className="text-bone/40 text-xs leading-relaxed">Forma parte de una red de socios con antecedentes verificados internamente.</p>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="mt-32 text-center pb-12">
                <p className="text-[10px] text-bone/20 uppercase tracking-[0.5em]">Aura Membership Program • Confidentiality Guaranteed</p>
            </footer>
        </main>
    );
}
