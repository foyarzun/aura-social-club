import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/landing/Hero";
import FeaturedHosts from "@/components/landing/FeaturedHosts";
import { ShieldCheck, Calendar, Star } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />

      {/* Featured Section */}
      <FeaturedHosts />

      {/* Why Us Section */}
      <section className="py-24 bg-midnight-light/20 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-bone mb-4">¿Por qué Elegir Aura?</h2>
            <div className="w-24 h-1 bg-gold mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: ShieldCheck,
                title: "Confianza Absoluta",
                desc: "Todos nuestros anfitriones pasan por un riguroso proceso de verificación de identidad y antecedentes."
              },
              {
                icon: Calendar,
                title: "Reserva Inteligente",
                desc: "Sistema de calendario integrado con pagos en custodia (Escrow) para tu total tranquilidad."
              },
              {
                icon: Star,
                title: "Exclusividad",
                desc: "Solo los perfiles con mejores valoraciones y mayor profesionalismo forman parte de nuestro club."
              }
            ].map((item, idx) => (
              <div key={idx} className="text-center space-y-4">
                <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center mx-auto border border-gold/20">
                  <item.icon className="text-gold" size={32} />
                </div>
                <h3 className="text-2xl font-serif text-bone">{item.title}</h3>
                <p className="text-bone/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Background blobs */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-gold/5 blur-[100px] rounded-full" />
      </section>

      {/* Footer Placeholder */}
      <footer className="py-12 border-t border-gold/10 text-center text-bone/30 text-[11px] uppercase tracking-widest bg-midnight">
        &copy; 2026 Aura Social Club. Todos los derechos reservados.
      </footer>
    </main>
  );
}
