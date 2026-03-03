import EscrowWallet from "@/components/dashboard/EscrowWallet";
import Navbar from "@/components/layout/Navbar";
import BookingList from "@/components/dashboard/BookingList";
import AvailabilityManager from "@/components/dashboard/AvailabilityManager";
import { Calendar, Users, MessageSquare, Settings, LayoutDashboard, Bell } from "lucide-react";

export const dynamic = "force-dynamic";

export default function DashboardPage() {

    return (
        <main className="min-h-screen bg-midnight">
            <Navbar />

            <div className="flex pt-24 min-h-screen">
                {/* Sidebar */}
                <aside className="w-72 border-r border-gold/10 p-8 hidden lg:block sticky top-24 h-[calc(100vh-6rem)]">
                    <div className="flex items-center gap-4 mb-12 p-2 bg-gold/5 rounded-2xl border border-gold/10">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold to-amber-700" />
                        <div>
                            <p className="text-xs font-black uppercase tracking-[0.2em] text-gold">Alessandro</p>
                            <p className="text-[10px] text-bone/40">Anfitrión Élite</p>
                        </div>
                    </div>

                    <nav className="space-y-3">
                        {[
                            { icon: LayoutDashboard, label: "Vista General", active: true },
                            { icon: Calendar, label: "Mi Calendario", active: false },
                            { icon: Users, label: "Historial Reservas", active: false },
                            { icon: MessageSquare, label: "Conversaciones", active: false },
                            { icon: Settings, label: "Perfil & Cuenta", active: false },
                        ].map((item) => (
                            <button
                                key={item.label}
                                className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold transition-all ${item.active
                                    ? "bg-gold text-midnight shadow-lg shadow-gold/20"
                                    : "text-bone/40 hover:bg-gold/5 hover:text-gold"
                                    }`}
                            >
                                <item.icon size={20} />
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    <div className="absolute bottom-8 left-8 right-8">
                        <div className="p-4 bg-midnight-light/40 border border-gold/10 rounded-2xl">
                            <p className="text-center text-[10px] text-bone/30 uppercase tracking-[0.2em]">Soporte Concierge</p>
                            <button className="w-full mt-3 py-3 bg-midnight text-gold border border-gold/20 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gold/5 transition-all">
                                Doubt Direct
                            </button>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex-1 p-8 lg:p-12 overflow-y-auto">
                    <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-serif text-bone mb-3">Panel de Gestión</h1>
                            <p className="text-bone/40 italic font-light">"La excelencia no es un acto, sino un hábito."</p>
                        </div>
                        <button className="relative p-4 bg-midnight-light/30 border border-gold/20 rounded-2xl text-gold hover:scale-105 transition-all">
                            <Bell size={24} />
                            <span className="absolute top-4 right-4 w-2 h-2 bg-gold rounded-full ring-4 ring-midnight animate-pulse" />
                        </button>
                    </header>

                    <div className="space-y-12">
                        {/* Wallet Section */}
                        <section>
                            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-gold/60 mb-8 flex items-center gap-4">
                                Estado Financiero
                                <div className="flex-1 h-px bg-gold/10" />
                            </h2>
                            <EscrowWallet />
                        </section>

                        <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-12 items-start">
                            {/* Recent Bookings Section */}
                            <section className="bg-midnight-light/20 border border-gold/10 rounded-3xl p-8">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-xl font-serif text-bone flex items-center gap-3">
                                        <Users className="text-gold" size={24} />
                                        Gestión de Reservas
                                    </h3>
                                    <button className="text-[10px] font-black uppercase tracking-widest text-gold/60 hover:text-gold transition-colors">
                                        Ver Todo
                                    </button>
                                </div>
                                <BookingList />
                            </section>

                            {/* Availability Subsection */}
                            <section className="space-y-8">
                                <AvailabilityManager />

                                <div className="p-8 bg-gradient-to-br from-gold/10 to-transparent border border-gold/20 rounded-3xl relative overflow-hidden group">
                                    <div className="relative z-10">
                                        <h4 className="text-gold font-serif text-xl mb-2">Truco de Aura</h4>
                                        <p className="text-bone/60 text-xs leading-relaxed">
                                            Responder en menos de 15 minutos aumenta tus probabilidades de reserva en un 65%.
                                            Mantén tus notificaciones activas.
                                        </p>
                                    </div>
                                    <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-700">
                                        <MessageSquare size={120} className="text-gold" />
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

