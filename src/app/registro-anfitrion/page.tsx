"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import KYCVerification from "@/components/auth/KYCVerification";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Star, DollarSign, Camera, CheckCircle2, ChevronRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export default function HostOnboardingPage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        fullName: "",
        specialties: [] as string[],
        hourlyRate: 85000,
        bio: "",
    });

    const specialtiesList = ["Gala", "Empresarial", "Cultura", "Cenas", "Viajes", "Eventos"];

    const [loading, setLoading] = useState(false);

    const nextStep = () => setStep(s => s + 1);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/host/profile", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error("Error al guardar el perfil");

            window.location.href = '/dashboard-anfitrion';
        } catch (err) {
            alert("Error al completar el registro. Inténtalo de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-midnight pb-20">
            <Navbar />

            <div className="container mx-auto px-6 pt-32 max-w-4xl">
                {/* Progress Bar */}
                <div className="flex justify-between mb-16 relative">
                    <div className="absolute top-1/2 left-0 w-full h-px bg-gold/10 -translate-y-1/2 z-0" />
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className={cn(
                                "relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500",
                                step >= i ? "bg-gold text-midnight shadow-lg shadow-gold/30" : "bg-midnight border border-gold/20 text-gold/40"
                            )}
                        >
                            {step > i ? <CheckCircle2 size={20} /> : i}
                            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.2em] whitespace-nowrap text-gold/60">
                                {i === 1 ? "Perfil" : i === 2 ? "Servicios" : "Verificación"}
                            </span>
                        </div>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-12"
                        >
                            <div className="text-center space-y-4">
                                <h1 className="text-5xl font-serif text-bone">Comienza tu viaje</h1>
                                <p className="text-bone/40 italic">"La distinción es el único lenguaje que no necesita traducción."</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-gold font-bold">Nombre Artístico / Público</label>
                                        <input
                                            type="text"
                                            placeholder="Ej. Alessandro Silva"
                                            className="w-full bg-midnight-light/30 border border-gold/20 rounded-2xl px-6 py-4 text-bone focus:border-gold outline-none transition-all"
                                            value={formData.fullName}
                                            onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-gold font-bold">Biografía Inspiradora</label>
                                        <textarea
                                            rows={4}
                                            placeholder="Cuéntanos qué hace de tu compañía una experiencia única..."
                                            className="w-full bg-midnight-light/30 border border-gold/20 rounded-2xl px-6 py-4 text-bone focus:border-gold outline-none transition-all resize-none"
                                            value={formData.bio}
                                            onChange={e => setFormData({ ...formData, bio: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col items-center justify-center p-8 bg-gold/5 border border-dashed border-gold/20 rounded-3xl group cursor-pointer hover:bg-gold/10 transition-all">
                                    <div className="w-24 h-24 bg-midnight rounded-full flex items-center justify-center border border-gold/20 mb-4 group-hover:scale-110 transition-transform">
                                        <Camera className="text-gold/40" size={32} />
                                    </div>
                                    <p className="text-xs font-bold text-gold">Subir Foto de Perfil</p>
                                    <p className="text-[10px] text-bone/30 mt-2 text-center uppercase tracking-widest">Formato: JPG, PNG - Max 5MB</p>
                                </div>
                            </div>

                            <button
                                onClick={nextStep}
                                disabled={!formData.fullName || !formData.bio}
                                className="w-full flex items-center justify-center gap-3 bg-gold text-midnight py-5 rounded-2xl font-black uppercase tracking-[0.3em] shadow-xl shadow-gold/20 hover:scale-[1.01] transition-all disabled:opacity-50"
                            >
                                Continuar <ChevronRight size={20} />
                            </button>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-12"
                        >
                            <div className="text-center space-y-4">
                                <h1 className="text-5xl font-serif text-bone">Tus Especialidades</h1>
                                <p className="text-bone/40 italic">Define tu valor y tu presencia en el club.</p>
                            </div>

                            <div className="space-y-8">
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {specialtiesList.map(s => (
                                        <button
                                            key={s}
                                            onClick={() => {
                                                const exists = formData.specialties.includes(s);
                                                setFormData({
                                                    ...formData,
                                                    specialties: exists
                                                        ? formData.specialties.filter(x => x !== s)
                                                        : [...formData.specialties, s]
                                                });
                                            }}
                                            className={cn(
                                                "py-4 rounded-xl border text-xs font-bold uppercase tracking-widest transition-all",
                                                formData.specialties.includes(s)
                                                    ? "bg-gold text-midnight border-gold shadow-lg"
                                                    : "bg-midnight-light/20 border-gold/10 text-bone/60 hover:border-gold/30"
                                            )}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>

                                <div className="bg-midnight-light/30 border border-gold/20 p-8 rounded-3xl text-center space-y-6">
                                    <DollarSign className="text-gold mx-auto" size={32} />
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-gold font-bold">Tarifa por Hora (CLP)</label>
                                        <div className="flex items-center justify-center gap-4">
                                            <input
                                                type="range"
                                                min="50000"
                                                max="300000"
                                                step="5000"
                                                className="w-full max-w-sm accent-gold"
                                                value={formData.hourlyRate}
                                                onChange={e => setFormData({ ...formData, hourlyRate: parseInt(e.target.value) })}
                                            />
                                            <span className="text-2xl font-mono text-bone min-w-[150px]">
                                                {new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(formData.hourlyRate)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button onClick={() => setStep(1)} className="flex-1 py-5 border border-gold/20 rounded-2xl text-gold font-bold uppercase tracking-widest hover:bg-gold/5 transition-all">Volver</button>
                                <button onClick={nextStep} className="flex-[2] flex items-center justify-center gap-3 bg-gold text-midnight py-5 rounded-2xl font-black uppercase tracking-[0.3em] shadow-xl shadow-gold/20">Finalizar Perfil <ChevronRight size={20} /></button>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-12"
                        >
                            <div className="text-center space-y-4">
                                <h1 className="text-5xl font-serif text-bone">Identidad & Seguridad</h1>
                                <p className="text-bone/40 italic">Aura exige la máxima verificación para mantener nuestra comunidad segura.</p>
                            </div>

                            <KYCVerification />

                            <div className="mt-8 flex items-center gap-4 p-6 bg-gold/5 border border-gold/20 rounded-3xl">
                                <Shield className="text-gold shrink-0" size={32} />
                                <div>
                                    <h4 className="text-bone font-bold text-sm">Privacidad Certificada</h4>
                                    <p className="text-[10px] text-bone/50 leading-tight uppercase tracking-wider mt-1">
                                        Tus documentos son encriptados de extremo a extremo y solo serán revisados por nuestro personal de cumplimiento certificado.
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-gold to-amber-600 text-midnight py-5 rounded-2xl font-black uppercase tracking-[0.4em] shadow-2xl shadow-gold/20 hover:scale-[1.01] transition-all disabled:opacity-50"
                            >
                                {loading ? "Procesando..." : "Completar Registro"}
                                {!loading && <Sparkles size={20} className="inline ml-2" />}
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </main>
    );
}
