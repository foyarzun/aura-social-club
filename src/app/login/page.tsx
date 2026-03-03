"use client";

import { supabase } from "@/lib/supabase";
import { ShieldCheck, LogIn } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { motion } from "framer-motion";

export default function LoginPage() {
    const handleGoogleLogin = async () => {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
    };

    return (
        <main className="min-h-screen bg-midnight flex flex-col">
            <Navbar />

            <div className="flex-1 flex items-center justify-center p-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md bg-midnight-light/30 border border-gold/20 p-12 rounded-3xl shadow-2xl backdrop-blur-xl text-center"
                >
                    <div className="w-20 h-20 bg-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-gold/20">
                        <LogIn className="text-gold" size={32} />
                    </div>

                    <h1 className="text-4xl font-serif text-bone mb-4">Bienvenido a Aura</h1>
                    <p className="text-bone/50 mb-12 text-sm leading-relaxed">
                        Ingresa para reservar acompañantes exclusivos y gestionar tu perfil en el club más prestigioso.
                    </p>

                    <div className="space-y-4">
                        <button
                            onClick={handleGoogleLogin}
                            className="w-full bg-white text-black py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-zinc-200 transition-all transform hover:scale-[1.02]"
                        >
                            <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google" />
                            Continuar con Google
                        </button>

                        <div className="relative py-4">
                            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gold/10"></div></div>
                            <div className="relative flex justify-center text-xs uppercase"><span className="bg-midnight-light/30 px-2 text-bone/30 tracking-widest">Seguridad</span></div>
                        </div>

                        <div className="flex items-center gap-3 text-left p-4 bg-gold/5 border border-gold/10 rounded-2xl">
                            <ShieldCheck className="text-gold shrink-0" size={24} />
                            <p className="text-[11px] text-bone/60 leading-tight">
                                Utilizamos encriptación de grado bancario. Nunca publicaremos nada en tus redes sociales.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>

            <footer className="py-8 text-center text-bone/20 text-[10px] uppercase tracking-[0.3em]">
                Acceso Exclusivo • Aura Social Club
            </footer>
        </main>
    );
}
