"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, Calendar as CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AvailabilityManager() {
    const [activeDays, setActiveDays] = useState(["Lun", "Mar", "Mié", "Jue", "Vie"]);
    const days = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

    const toggleDay = (day: string) => {
        setActiveDays(prev =>
            prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
        );
    };

    return (
        <div className="bg-midnight-light/20 border border-gold/10 rounded-3xl p-8">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-serif text-bone flex items-center gap-2">
                    <CalendarIcon className="text-gold" size={20} />
                    Mi Disponibilidad
                </h3>
                <button className="text-xs text-gold font-bold uppercase tracking-widest border-b border-gold/20 pb-0.5 hover:border-gold transition-all">
                    Guardar Configuración
                </button>
            </div>

            <div className="space-y-8">
                <div className="flex flex-wrap gap-3">
                    {days.map(day => {
                        const isActive = activeDays.includes(day);
                        return (
                            <button
                                key={day}
                                onClick={() => toggleDay(day)}
                                className={cn(
                                    "w-12 h-12 rounded-xl border flex items-center justify-center text-sm font-bold transition-all",
                                    isActive
                                        ? "bg-gold text-midnight border-gold shadow-lg shadow-gold/20"
                                        : "bg-midnight border-gold/10 text-bone/40 hover:border-gold/30"
                                )}
                            >
                                {day}
                            </button>
                        );
                    })}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-midnight rounded-2xl border border-gold/5 space-y-3">
                        <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-gold/60">
                            <Clock size={12} /> Horario Base
                        </div>
                        <div className="flex items-center gap-4 text-bone font-medium">
                            <span className="text-2xl">18:00</span>
                            <span className="text-gold/20">—</span>
                            <span className="text-2xl">02:00</span>
                        </div>
                    </div>

                    <div className="p-4 bg-midnight rounded-2xl border border-gold/5 flex items-center gap-4">
                        <div className="flex-1">
                            <p className="text-xs font-bold text-bone mb-1">Días Festivos</p>
                            <p className="text-[10px] text-bone/40 leading-tight">¿Disponible en feriados y fechas especiales?</p>
                        </div>
                        <div className="w-12 h-6 bg-gold/10 rounded-full relative cursor-pointer border border-gold/20">
                            <div className="absolute right-1 top-1 w-4 h-4 bg-gold rounded-full" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
