# Configuración de Base de Datos - Aura Social Club

He gestionado la arquitectura de datos completa para soportar el sistema de filtros regionales y la lógica de Escrow.

## Pasos para la creación en Supabase:

1.  **Acceder a Supabase:** Ve a tu proyecto de Supabase.
2.  **SQL Editor:** Abre el "SQL Editor" en el menú lateral.
3.  **Ejecutar Schema:** Copia y pega el contenido de `schema.sql` (ubicado en tu carpeta raíz) y presiona **RUN**.
    *   Este script creará las tablas, tipos ENUM, triggers de Escrow y la función de filtrado jerárquico.
4.  **Habilitar RPC:** La función `filter_hosts_by_region_and_specialty` está lista para ser consumida desde Next.js usando `supabase.rpc()`.

## Sistema de Filtros Configurado:

-   **Filtrado Jerárquico:** Si seleccionas "Chile", el sistema automáticamente incluirá anfitriones de "Santiago", "Las Condes", etc., gracias a la consulta recursiva (Common Table Expression) en PostgreSQL.
-   **Seguridad Escrow Automática:** He configurado un Trigger (`tr_release_escrow`) que libera los fondos al anfitrión automáticamente cuando el estado de una reserva cambia a `completed`, asegurando que no haya errores humanos en la liberación de pagos.
-   **Políticas RLS:** Los documentos de identidad (KYC) están protegidos. Solo usuarios con rol `admin` pueden consultarlos.

## Próximo Paso en el Frontend:
Para usar datos reales en la página `/explorar`, simplemente reemplaza el mock en `src/app/explorar/page.tsx` por:

```typescript
const { data, error } = await supabase.rpc('filter_hosts_by_region_and_specialty', {
  p_region_id: filters.region,
  p_specialty: filters.specialty
});
```
