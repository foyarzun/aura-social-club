"use client";

import Navbar from "@/components/layout/Navbar";
import { Shield, Target, Users, Sparkles } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function NosotrosPage() {
    const values = [
        {
            icon: Shield,
            title: "Confidencialidad",
            desc: "Protegemos la privacidad de nuestros socios y anfitriones con los más altos estándares de seguridad digital y ética profesional."
        },
        {
            icon: Target,
            title: "Excelencia",
            desc: "No somos solo un marketplace; somos un club de élite donde cada detalle, desde la vestimenta hasta la conversación, es curado."
        },
        {
            icon: Users,
            title: "Conexión Real",
            desc: "Fomentamos relaciones sociales auténticas basadas en el respeto, la cultura y el intercambio intelectual."
        }
    ];

    return (
        <main className="min-h-screen bg-midnight">
            <Navbar />

            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <Image
                    src="/aura_corporate_hq_1772510083711.png"
                    alt="Aura HQ"
                    fill
                    className="object-cover opacity-40 scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-midnight/0 via-midnight/60 to-midnight" />

                <div className="container mx-auto px-6 relative z-10 text-center space-y-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <span className="text-gold text-xs font-black uppercase tracking-[0.5em] mb-4 block">Sobre Nosotros</span>
                        <h1 className="text-5xl md:text-7xl font-serif text-bone leading-tight">
                            Redefiniendo la <br /> <span className="text-gold">Compañía de Élite</span>
                        </h1>
                    </motion.div>
                </div>
            </section>

            {/* Content Section */}
            <section className="container mx-auto px-6 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="space-y-8">
                        <h2 className="text-4xl font-serif text-bone">Nuestra Misión</h2>
                        <div className="space-y-6 text-bone/70 text-lg leading-relaxed font-light">
                            <p>
                                Aura Social Club nació de una necesidad latente en la alta sociedad: la búsqueda de compañía genuina, culta y distinguida para eventos donde la imagen y la conversación son fundamentales.
                            </p>
                            <p>
                                Como empresa liderada por expertos en hospitalidad y seguridad, hemos creado el primer ecosistema digital que garantiza la confianza absoluta entre anfitriones y clientes, permitiendo que la exclusividad sea accesible a través de la tecnología.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-8 pt-8">
                            <div className="space-y-2">
                                <p className="text-4xl font-serif text-gold">500+</p>
                                <p className="text-[10px] uppercase text-bone/40 tracking-widest font-black">Socios Verificados</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-4xl font-serif text-gold">12</p>
                                <p className="text-[10px] uppercase text-bone/40 tracking-widest font-black">Ciudades Globales</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative aspect-square">
                        <div className="absolute inset-0 border border-gold/20 rounded-3xl -rotate-3 translate-x-4 translate-y-4" />
                        <div className="relative h-full w-full rounded-3xl overflow-hidden border border-gold/40 shadow-2xl">
                            <Image
                                src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
                                alt="Professional Environment"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Grid */}
            <section className="bg-midnight-light/20 py-24 border-y border-gold/10">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h3 className="text-3xl font-serif text-bone mb-4">Pilares de Aura</h3>
                        <div className="w-24 h-1 bg-gold mx-auto opacity-40" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {values.map((v, i) => (
                            <div key={i} className="bg-midnight border border-gold/10 p-10 rounded-3xl hover:border-gold/40 transition-all group">
                                <v.icon className="text-gold mb-6 group-hover:scale-110 transition-transform" size={40} />
                                <h4 className="text-xl font-serif text-bone mb-3">{v.title}</h4>
                                <p className="text-bone/50 text-sm leading-relaxed">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Corporate Call to Action */}
            <section className="container mx-auto px-6 py-32 text-center space-y-12">
                <div className="max-w-2xl mx-auto space-y-6">
                    <Sparkles className="text-gold mx-auto" size={48} />
                    <h2 className="text-4xl font-serif text-bone">Únete a la nueva era de la exclusividad social</h2>
                    <p className="text-bone/60 leading-relaxed italic">
                        "Aura no es un servicio, es un estatus. Una red donde la elegancia y la discreción son nuestra única moneda de cambio."
                    </p>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                    <button className="bg-gold text-midnight px-12 py-5 rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl shadow-gold/20 hover:scale-105 transition-all">
                        Solicitar Membresía
                    </button>
                    <button className="text-gold px-12 py-5 border border-gold/40 rounded-2xl font-bold uppercase tracking-widest hover:bg-gold/5 transition-all">
                        Contáctanos
                    </button>
                </div>
            </section>

            <footer className="py-12 border-t border-gold/10 text-center">
                <p className="text-[10px] text-bone/20 uppercase tracking-[0.5em]">Aura Social Club Corporate • MMXVI</p>
            </footer>
        </main>
    );
}
