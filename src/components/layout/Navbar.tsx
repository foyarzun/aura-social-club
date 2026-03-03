"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { User, LogOut, LayoutDashboard } from "lucide-react";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user ?? null);
        };

        checkUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            subscription.unsubscribe();
        };
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        window.location.href = "/";
    };

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
                isScrolled ? "bg-midnight/80 backdrop-blur-md border-b border-gold/20" : "bg-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-2xl font-serif font-bold text-gold tracking-tighter">AURA</span>
                    <span className="text-xs uppercase tracking-[0.2em] text-bone/60 mt-1">Social Club</span>
                </Link>

                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-bone/80">
                    <Link href="/explorar" className="hover:text-gold transition-colors">Explorar</Link>
                    <Link href="/nosotros" className="hover:text-gold transition-colors">Nosotros</Link>
                    <Link href="/membresia" className="hover:text-gold transition-colors">Membresía</Link>
                </div>

                <div className="flex items-center gap-4">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <Link
                                href="/dashboard-anfitrion"
                                className="hidden md:flex items-center gap-2 text-gold/80 hover:text-gold transition-colors text-sm font-bold uppercase tracking-widest"
                            >
                                <LayoutDashboard size={14} />
                                Panel
                            </Link>
                            <div className="group relative">
                                <div className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center bg-gold/5 cursor-pointer overflow-hidden">
                                    {user.user_metadata?.avatar_url ? (
                                        <img src={user.user_metadata.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <User size={18} className="text-gold" />
                                    )}
                                </div>
                                {/* Simple Dropdown on hover */}
                                <div className="absolute right-0 top-full mt-2 w-48 bg-midnight border border-gold/20 rounded-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all shadow-2xl">
                                    <p className="px-4 py-2 text-[10px] text-bone/40 uppercase font-bold border-b border-gold/10 mb-2">Mi Cuenta</p>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-bone/60 hover:bg-gold/10 hover:text-gold transition-colors"
                                    >
                                        <LogOut size={14} /> Cerrar Sesión
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="text-sm font-medium hover:text-gold transition-colors"
                            >
                                Iniciar Sesión
                            </Link>
                            <Link
                                href="/registro-anfitrion"
                                className="bg-gold text-midnight px-5 py-2 rounded-full text-sm font-bold hover:bg-gold/90 transition-all transform hover:scale-105"
                            >
                                Ser Anfitrión
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

