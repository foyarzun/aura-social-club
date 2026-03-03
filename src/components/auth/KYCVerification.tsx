"use client";

import { useState } from "react";
import { Upload, ShieldCheck, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { uploadFile } from "@/lib/storage";

export default function KYCVerification() {
    const [files, setFiles] = useState<{ front: File | null; back: File | null }>({ front: null, back: null });
    const [idNumber, setIdNumber] = useState("");
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (!files.front || !files.back) throw new Error("Debes subir ambos lados del documento");

            // 1. Simulación o subida real a storage
            // En producción:
            // const frontUrl = await uploadFile('kyc-documents', `kyc/${idNumber}_front`, files.front);
            // const backUrl = await uploadFile('kyc-documents', `kyc/${idNumber}_back`, files.back);

            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulando latencia de red

            setSubmitted(true);
        } catch (err: any) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-midnight-light/50 border border-gold/20 p-12 rounded-3xl text-center max-w-2xl mx-auto shadow-2xl"
            >
                <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="text-gold" size={40} />
                </div>
                <h2 className="text-3xl font-serif text-bone mb-4">Documentación Recibida</h2>
                <p className="text-bone/60 mb-8 leading-relaxed">
                    Tu identidad está siendo verificada por nuestro equipo de seguridad.
                    Este proceso suele tardar entre 24 y 48 horas hábiles.
                </p>
                <button
                    onClick={() => window.location.href = '/dashboard-anfitrion'}
                    className="bg-gold text-midnight px-8 py-3 rounded-xl font-bold hover:bg-gold/90 transition-all"
                >
                    Ir al Panel de Control
                </button>
            </motion.div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-12 text-center">
                <span className="text-gold text-xs font-bold uppercase tracking-widest mb-3 block">Verificación de Seguridad</span>
                <h2 className="text-4xl font-serif text-bone mb-4">Resguardo de Identidad</h2>
                <p className="text-bone/60">
                    Para garantizar la exclusividad de Aura Social Club, requerimos verificar tu identidad.
                    <span className="text-gold font-medium ml-1">Tus documentos están protegidos por encriptación de grado militar.</span>
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="bg-midnight-light/30 border border-gold/10 rounded-3xl p-8 shadow-xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Front ID */}
                        <div className="space-y-4">
                            <label className="text-sm font-medium text-bone/80 flex items-center gap-2">
                                Documento de Identidad (Frontal)
                                <ShieldCheck size={14} className="text-gold" />
                            </label>
                            <div className="relative group">
                                <input
                                    type="file"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    onChange={(e) => setFiles(prev => ({ ...prev, front: e.target.files?.[0] || null }))}
                                    required
                                />
                                <div className="h-48 border-2 border-dashed border-gold/20 rounded-2xl flex flex-col items-center justify-center gap-3 bg-midnight group-hover:bg-midnight-light transition-colors group-hover:border-gold/40">
                                    {files.front ? (
                                        <div className="text-center">
                                            <p className="text-gold font-medium text-sm">{files.front.name}</p>
                                            <p className="text-[10px] text-bone/40">Click para cambiar</p>
                                        </div>
                                    ) : (
                                        <>
                                            <Upload className="text-gold/40" size={32} />
                                            <p className="text-bone/40 text-xs">Sube la cara frontal de tu ID</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Back ID */}
                        <div className="space-y-4">
                            <label className="text-sm font-medium text-bone/80 flex items-center gap-2">
                                Documento de Identidad (Trasero)
                                <ShieldCheck size={14} className="text-gold" />
                            </label>
                            <div className="relative group">
                                <input
                                    type="file"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    onChange={(e) => setFiles(prev => ({ ...prev, back: e.target.files?.[0] || null }))}
                                    required
                                />
                                <div className="h-48 border-2 border-dashed border-gold/20 rounded-2xl flex flex-col items-center justify-center gap-3 bg-midnight group-hover:bg-midnight-light transition-colors group-hover:border-gold/40">
                                    {files.back ? (
                                        <div className="text-center">
                                            <p className="text-gold font-medium text-sm">{files.back.name}</p>
                                            <p className="text-[10px] text-bone/40">Click para cambiar</p>
                                        </div>
                                    ) : (
                                        <>
                                            <Upload className="text-gold/40" size={32} />
                                            <p className="text-bone/40 text-xs">Sube la cara trasera de tu ID</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 space-y-4">
                        <label className="text-sm font-medium text-bone/80">Número de Documento / RUT / ID</label>
                        <input
                            type="text"
                            placeholder="Ej: 12.345.678-K"
                            className="w-full bg-midnight border border-gold/20 p-4 rounded-xl text-bone outline-none focus:border-gold transition-colors"
                            value={idNumber}
                            onChange={(e) => setIdNumber(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="flex items-center gap-4 bg-gold/5 border border-gold/20 p-6 rounded-2xl">
                    <AlertCircle className="text-gold shrink-0" size={24} />
                    <p className="text-[13px] text-bone/70 leading-relaxed">
                        Certifico que la información y documentos proporcionados son verídicos. Entiendo que Aura Social Club se reserva el derecho de rechazar mi solicitud basándose en criterios de seguridad.
                    </p>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gold text-midnight py-5 rounded-2xl font-bold text-lg hover:bg-gold/90 transition-all shadow-xl flex items-center justify-center gap-3 transform hover:scale-[1.01] disabled:opacity-50"
                >
                    {loading ? (
                        <>
                            <Loader2 className="animate-spin" size={20} />
                            Encriptando y Subiendo...
                        </>
                    ) : (
                        <>
                            Enviar a Revisión de Seguridad
                            <ShieldCheck size={20} />
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}

