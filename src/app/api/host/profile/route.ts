import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const cookieStore = await cookies();
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() { return cookieStore.getAll(); },
            }
        }
    );

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

    try {
        const { fullName, bio, specialties, hourlyRate, profileImage } = await request.json();

        // 1. Actualizar el perfil básico del usuario si es necesario
        const { error: userError } = await supabase
            .from("users")
            .update({ full_name: fullName, avatar_url: profileImage })
            .eq("id", user.id);

        if (userError) throw userError;

        // 2. Crear o actualizar el perfil de anfitrión
        // Usamos upsert para permitir ediciones posteriores
        const { data: hostProfile, error: hostError } = await supabase
            .from("hosts_profiles")
            .upsert({
                user_id: user.id,
                bio,
                specialties,
                hourly_rate: hourlyRate,
                verification_status: "pending", // Empezar siempre pendiente hasta que KYC sea revisado
            })
            .select()
            .single();

        if (hostError) throw hostError;

        return NextResponse.json({ success: true, profile: hostProfile });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
