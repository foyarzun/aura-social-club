"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CheckCircle2, Clock, MapPin, User, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BookingList() {
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchBookings = async () => {
        try {
            const res = await fetch("/api/host/bookings");
            const data = await res.json();
            if (!data.error) setBookings(data);
        } catch (e) {
            console.error("Error fetching bookings", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleComplete = async (id: string) => {
        try {
            const res = await fetch("/api/host/bookings", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status: "completed" }),
            });
            if (res.ok) fetchBookings(); // Refresh list
        } catch (e) {
            console.error("Error completing booking", e);
        }
    };

    if (loading) return <div className="text-bone/20 animate-pulse py-12 text-center uppercase tracking-widest text-xs">Cargando Reservas...</div>;

    return (
        <div className="space-y-4">
            {bookings.length === 0 ? (
                <div className="py-12 text-center text-bone/30 italic text-sm">No tienes reservas registradas.</div>
            ) : (
                bookings.map((booking) => (
                    <div
                        key={booking.id}
                        className="group flex flex-col md:flex-row items-start md:items-center justify-between p-5 bg-midnight rounded-2xl border border-gold/5 hover:border-gold/20 transition-all gap-4"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center border border-gold/20 overflow-hidden">
                                {booking.client?.avatar_url ? (
                                    <img src={booking.client.avatar_url} alt="Client" className="w-full h-full object-cover" />
                                ) : (
                                    <User className="text-gold/40" size={24} />
                                )}
                            </div>
                            <div>
                                <h4 className="text-bone font-medium flex items-center gap-2">
                                    {booking.client?.full_name || "Cliente Premium"}
                                    <span className={cn(
                                        "text-[9px] px-2 py-0.5 rounded-full font-bold uppercase",
                                        booking.status === 'pending' && "bg-amber-400/10 text-amber-400",
                                        booking.status === 'confirmed' && "bg-blue-400/10 text-blue-400",
                                        booking.status === 'completed' && "bg-emerald-400/10 text-emerald-400",
                                        booking.status === 'cancelled' && "bg-red-400/10 text-red-400",
                                    )}>
                                        {booking.status === 'pending' ? 'Pendiente' :
                                            booking.status === 'confirmed' ? 'Confirmado' :
                                                booking.status === 'completed' ? 'Finalizado' : 'Cancelado'}
                                    </span>
                                </h4>
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-[11px] text-bone/40">
                                    <span className="flex items-center gap-1">
                                        <Clock size={12} className="text-gold/60" />
                                        {format(new Date(booking.start_time), "d 'de' MMMM, HH:mm", { locale: es })}
                                    </span>
                                    <span className="flex items-center gap-1 italic">
                                        {new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(booking.total_price)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 w-full md:w-auto mt-2 md:mt-0">
                            {booking.status === 'confirmed' && (
                                <button
                                    onClick={() => handleComplete(booking.id)}
                                    className="flex-1 md:flex-none bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-2 rounded-xl text-xs font-bold hover:bg-emerald-500/20 transition-all flex items-center justify-center gap-2"
                                >
                                    <CheckCircle2 size={14} />
                                    Marcar Finalizado
                                </button>
                            )}
                            <button className="p-2 bg-bone/5 border border-gold/10 rounded-xl text-gold/60 hover:text-gold hover:bg-gold/10 transition-all">
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
