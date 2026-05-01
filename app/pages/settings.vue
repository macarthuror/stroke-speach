<script setup lang="ts">
useSeoMeta({
  title: "Ajustes generales",
  description:
    "Página de ajustes generales para configuración visual y comportamiento de la aplicación Mi Voz.",
});
</script>

<template>
  <section
    class="mx-auto w-full max-w-4xl px-6 py-8 text-[#1c1b1b] dark:text-[#f4f4f5]"
  >
    <h2 class="text-2xl font-semibold tracking-tight">Ajustes generales</h2>

    <p class="mt-4 text-sm leading-6 text-[#4b5563] dark:text-[#d1d5db]">
      Esta sección agrupa la configuración general de la app. Puedes usar el
      botón de tema en el header y aquí centralizar futuras preferencias de uso.
    </p>

    <div class="mt-6 space-y-3">
      <div class="rounded-xl border border-default bg-default p-4">
        <p class="text-sm font-medium">Tema visual</p>
        <p class="mt-1 text-sm text-[#4b5563] dark:text-[#d1d5db]">
          Alterna entre modo claro y oscuro con el botón de la esquina superior.
        </p>
      </div>

      <div class="rounded-xl border border-default bg-default p-4">
        <p class="text-sm font-medium">Modo eliminar</p>
        <p class="mt-1 text-sm text-[#4b5563] dark:text-[#d1d5db]">
          Se activa desde el ícono de papelera en el header y se desactiva al
          cambiar de página.
        </p>
      </div>
    </div>
  </section>
</template>
