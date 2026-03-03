"use client";

import { useState, useEffect } from "react";
import { Search, MapPin, Filter, Sparkles, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface FiltersProps {
    onSearch: (filters: any) => void;
}

export default function ExplorarFilters({ onSearch }: FiltersProps) {
    const [region, setRegion] = useState("");
    const [specialty, setSpecialty] = useState("");
    const [rateRange, setRateRange] = useState([0, 200000]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const specialties = [
        { value: "boda", label: "Bodas" },
        { value: "gala", label: "Galas" },
        { value: "empresarial", label: "Eventos Empresariales" },
        { value: "conversacion", label: "Cena/Conversación" },
    ];

    const regions = [
        { id: "cf744654-7164-4458-97c7-508b982142e0", name: "Chile (Todo)" },
        { id: "cf744654-7164-4458-97c7-508b982142e4", name: "Santiago, CL" },
        { id: "cf744654-7164-4458-97c7-508b982142e5", name: "Las Condes, CL" },
        { id: "cf744654-7164-4458-97c7-508b982142e1", name: "Argentina (Todo)" },
    ];

    useEffect(() => {
        onSearch({ region, specialty, minRate: rateRange[0], maxRate: rateRange[1] });
    }, [region, specialty, rateRange]);

    return (
        <div className="sticky top-24 z-30 space-y-4">
            <div className="bg-midnight-light/40 backdrop-blur-xl border border-gold/20 p-4 rounded-3xl shadow-2xl">
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Quick Search */}
                    <div className="flex-1 flex items-center gap-3 bg-midnight/60 border border-gold/10 px-5 py-3 rounded-2xl">
                        <MapPin className="text-gold" size={18} />
                        <select
                            value={region}
                            onChange={(e) => setRegion(e.target.value)}
                            className="bg-transparent border-none outline-none text-bone w-full text-sm appearance-none cursor-pointer"
                        >
                            <option value="" className="bg-midnight">Todas las Regiones</option>
                            {regions.map((r) => (
                                <option key={r.id} value={r.id} className="bg-midnight">{r.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex-1 flex items-center gap-3 bg-midnight/60 border border-gold/10 px-5 py-3 rounded-2xl">
                        <Sparkles className="text-gold" size={18} />
                        <select
                            value={specialty}
                            onChange={(e) => setSpecialty(e.target.value)}
                            className="bg-transparent border-none outline-none text-bone w-full text-sm appearance-none cursor-pointer"
                        >
                            <option value="" className="bg-midnight">Especialidad (Todas)</option>
                            {specialties.map((s) => (
                                <option key={s.value} value={s.value} className="bg-midnight">{s.label}</option>
                            ))}
                        </select>
                    </div>

                    <button
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className={cn(
                            "flex items-center justify-center gap-2 px-6 py-3 rounded-2xl border transition-all text-sm font-medium",
                            isFilterOpen ? "bg-gold text-midnight border-gold" : "bg-midnight/60 border-gold/20 text-gold"
                        )}
                    >
                        <SlidersHorizontal size={18} />
                        Filtros Avanzados
                    </button>
                </div>

                {/* Advanced Filters Drawer */}
                {isFilterOpen && (
                    <div className="mt-6 pt-6 border-t border-gold/10 grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-top-4 duration-300">
                        <div className="space-y-4">
                            <label className="text-xs font-bold uppercase tracking-widest text-gold">Rango de Tarifa (por hora)</label>
                            <div className="flex items-center gap-4">
                                <input
                                    type="range"
                                    min="0"
                                    max="500000"
                                    step="10000"
                                    value={rateRange[1]}
                                    onChange={(e) => setRateRange([rateRange[0], parseInt(e.target.value)])}
                                    className="flex-1 accent-gold h-1.5 bg-gold/10 rounded-full"
                                />
                                <span className="text-bone font-mono text-sm min-w-[100px] text-right">
                                    Hasta {new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(rateRange[1])}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-end gap-4">
                            <button className="flex-1 bg-gold/10 border border-gold/20 text-gold py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-gold/20 transition-all">
                                Guardar Búsqueda
                            </button>
                            <button
                                onClick={() => { setRegion(""); setSpecialty(""); setRateRange([0, 200000]); }}
                                className="flex-1 bg-bone/5 text-bone/60 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-bone/10 transition-all"
                            >
                                Limpiar
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <p className="text-[10px] text-bone/30 uppercase tracking-[0.2em] pl-2">
                Mostrando <span className="text-gold font-bold">128</span> anfitriones disponibles
            </p>
        </div>
    );
}
