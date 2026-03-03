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
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        );
                    } catch {
                        // The `setAll` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
            },
        }
    );

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    try {
        const { host_id, region_id, start_time, end_time, total_price } = await request.json();

        const { data: booking, error: bookingError } = await supabase
            .from("bookings")
            .insert({
                client_id: user.id,
                host_id,
                region_id,
                start_time,
                end_time,
                total_price,
                status: "pending"
            })
            .select()
            .single();

        if (bookingError) throw bookingError;

        const { error: escrowError } = await supabase
            .from("payments_escrow")
            .insert({
                booking_id: booking.id,
                amount: total_price,
                status: "held_in_escrow"
            });

        if (escrowError) throw escrowError;

        return NextResponse.json({ success: true, bookingId: booking.id });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
