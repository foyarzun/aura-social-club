"use client";

import { useState } from "react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays, isBefore, startOfToday } from "date-fns";
import { es } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Clock, ShieldCheck, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface BookingCalendarProps {
    hourlyRate: number;
    hostId: string;
}

export default function BookingCalendar({ hourlyRate, hostId }: BookingCalendarProps) {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [step, setStep] = useState(1); // 1: Date, 2: Time/Confirm
    const [isLoading, setIsLoading] = useState(false);

    const handleBooking = async () => {
        setIsLoading(true);
        try {
            // Mock region_id (Santiago) for the demo
            const region_id = "cf744654-7164-4458-97c7-508b982142e4";

            const [hours, minutes] = selectedTime!.split(":");
            const start = new Date(selectedDate);
            start.setHours(parseInt(hours), parseInt(minutes), 0, 0);

            const end = new Date(start);
            end.setHours(start.getHours() + 1);

            const response = await fetch("/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    host_id: hostId,
                    region_id,
                    start_time: start.toISOString(),
                    end_time: end.toISOString(),
                    total_price: hourlyRate,
                }),
            });

            if (!response.ok) throw new Error("Error al procesar la reserva");

            alert("¡Reserva solicitada con éxito! Revisa tu correo.");
            setStep(1);
        } catch (err) {
            alert("Debes iniciar sesión para reservar.");
        } finally {
            setIsLoading(false);
        }
    };


    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

    const onDateClick = (day: Date) => {
        if (isBefore(day, startOfToday())) return;
        setSelectedDate(day);
        setStep(2);
    };

    const renderHeader = () => (
        <div className="flex items-center justify-between px-2 mb-6">
            <h3 className="text-bone font-serif text-xl capitalize">
                {format(currentMonth, "MMMM yyyy", { locale: es })}
            </h3>
            <div className="flex gap-2">
                <button onClick={prevMonth} className="p-2 hover:bg-gold/10 rounded-full text-gold transition-colors">
                    <ChevronLeft size={20} />
                </button>
                <button onClick={nextMonth} className="p-2 hover:bg-gold/10 rounded-full text-gold transition-colors">
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );

    const renderDays = () => {
        const days = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
        return (
            <div className="grid grid-cols-7 mb-2">
                {days.map((day) => (
                    <div key={day} className="text-center text-[10px] uppercase tracking-widest text-gold/40 font-bold">
                        {day}
                    </div>
                ))}
            </div>
        );
    };

    const renderCells = () => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);

        const rows = [];
        let days = [];
        let day = startDate;
        let formattedDate = "";

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, "d");
                const cloneDay = day;
                const isDisabled = !isSameMonth(day, monthStart) || isBefore(day, startOfToday());
                const isSelected = isSameDay(day, selectedDate);

                days.push(
                    <div
                        key={day.toString()}
                        className={cn(
                            "relative h-12 flex items-center justify-center cursor-pointer transition-all duration-300 rounded-xl m-1 text-sm",
                            isDisabled ? "text-bone/10 cursor-not-allowed" : "text-bone hover:bg-gold/20",
                            isSelected ? "bg-gold text-midnight font-bold shadow-[0_0_20px_rgba(196,167,125,0.4)]" : ""
                        )}
                        onClick={() => !isDisabled && onDateClick(cloneDay)}
                    >
                        {formattedDate}
                        {isSelected && <motion.div layoutId="active" className="absolute inset-0 border-2 border-gold rounded-xl" />}
                    </div>
                );
                day = addDays(day, 1);
            }
            rows.push(<div className="grid grid-cols-7" key={day.toString()}>{days}</div>);
            days = [];
        }
        return <div className="calendar-body">{rows}</div>;
    };

    return (
        <div className="bg-midnight-light/40 backdrop-blur-xl border border-gold/20 rounded-3xl p-6 shadow-2xl overflow-hidden min-h-[500px] flex flex-col">
            <AnimatePresence mode="wait">
                {step === 1 ? (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex-1"
                    >
                        {renderHeader()}
                        {renderDays()}
                        {renderCells()}

                        <div className="mt-8 p-4 bg-gold/5 border border-gold/10 rounded-2xl flex items-center gap-3">
                            <ShieldCheck className="text-gold" size={20} />
                            <p className="text-[11px] text-bone/60 leading-tight">
                                Tus datos de contacto solo se revelarán al anfitrión tras la confirmación del pago en custodia.
                            </p>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex-1 flex flex-col"
                    >
                        <button onClick={() => setStep(1)} className="text-gold text-xs font-bold uppercase tracking-widest mb-6 flex items-center gap-2 hover:translate-x-[-4px] transition-transform">
                            <ChevronLeft size={14} /> Volver al Calendario
                        </button>

                        <h3 className="text-bone font-serif text-2xl mb-2">Selecciona un Horario</h3>
                        <p className="text-bone/40 text-sm mb-8 capitalize">{format(selectedDate, "EEEE, d 'de' MMMM", { locale: es })}</p>

                        <div className="grid grid-cols-3 gap-3 mb-8">
                            {["18:00", "19:00", "20:00", "21:00", "22:00", "23:00"].map((time) => (
                                <button
                                    key={time}
                                    onClick={() => setSelectedTime(time)}
                                    className={cn(
                                        "py-3 rounded-xl border transition-all flex items-center justify-center gap-2 text-sm font-medium",
                                        selectedTime === time ? "bg-gold text-midnight border-gold font-bold" : "bg-midnight border-gold/10 text-bone hover:border-gold/40"
                                    )}
                                >
                                    <Clock size={14} />
                                    {time}
                                </button>
                            ))}
                        </div>

                        <div className="mt-auto space-y-4 pt-6 border-t border-gold/10">
                            <div className="flex justify-between items-center text-bone/60 text-sm">
                                <span>Reserva por 1 hora</span>
                                <span className="font-mono">{new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(hourlyRate)}</span>
                            </div>
                            <div className="flex justify-between items-center text-gold font-bold text-xl">
                                <span>Total Estimado</span>
                                <span>{new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(hourlyRate)}</span>
                            </div>

                            <button
                                disabled={!selectedTime || isLoading}
                                onClick={handleBooking}
                                className="w-full bg-gold text-midnight py-4 rounded-xl font-black uppercase tracking-[0.2em] shadow-lg shadow-gold/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
                            >
                                {isLoading ? "Procesando..." : "Solicitar Aura"}
                                {!isLoading && <Zap size={18} className="group-hover:translate-y-[-2px] transition-transform" />}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
