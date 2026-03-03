"use client";

import { Wallet, ArrowUpRight, Lock, Clock, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function EscrowWallet() {
    const [data, setData] = useState({ held_in_escrow: 0, released: 0, pending: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch("/api/wallet/stats");
                const json = await res.json();
                if (!json.error) setData(json);
            } catch (e) {
                console.error("Error fetching wallet", e);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const stats = [
        {
            label: "En Garantía",
            amount: data.held_in_escrow,
            icon: Lock,
            description: "Reservas futuras aseguradas",
            color: "text-blue-400",
            bg: "bg-blue-400/10",
        },
        {
            label: "Pendiente de Liberación",
            amount: data.pending,
            icon: Clock,
            description: "Servicios completados < 24h",
            color: "text-amber-400",
            bg: "bg-amber-400/10",
        },
        {
            label: "Disponible",
            amount: data.released,
            icon: CheckCircle2,
            description: "Listo para retirar",
            color: "text-emerald-400",
            bg: "bg-emerald-400/10",
        },
    ];

    const formatCurrency = (val: number) =>
        new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(val);

    return (
        <div className="bg-midnight-light/30 border border-gold/10 rounded-3xl p-8 shadow-2xl backdrop-blur-md">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center border border-gold/20">
                        <Wallet className="text-gold" size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-serif text-bone">Mi Billetera (Escrow)</h3>
                        <p className="text-[11px] uppercase tracking-widest text-gold/60 font-medium">Gestión de Fondos en Garantía</p>
                    </div>
                </div>
                <button className="bg-gold text-midnight px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-gold/90 transition-all">
                    Retirar Fondos
                    <ArrowUpRight size={14} />
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, idx) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="p-6 rounded-2xl bg-midnight border border-gold/5 hover:border-gold/20 transition-all"
                    >
                        <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                            <stat.icon size={20} />
                        </div>
                        <p className="text-bone/40 text-xs uppercase tracking-tight mb-1">{stat.label}</p>
                        <h4 className="text-2xl font-bold text-bone mb-2">{formatCurrency(stat.amount)}</h4>
                        <p className="text-[10px] text-bone/60">{stat.description}</p>
                    </motion.div>
                ))}
            </div>

            <div className="mt-8 pt-8 border-t border-gold/10">
                <div className="flex items-center gap-2 text-[11px] text-bone/40">
                    <Lock size={12} className="text-gold" />
                    <p>Todos los pagos son procesados vía Escrow para proteger tanto al cliente como al anfitrión.</p>
                </div>
            </div>
        </div>
    );
}
