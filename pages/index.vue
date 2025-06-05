<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex flex-col items-center py-10">
        <h1 class="text-4xl font-extrabold mb-8 text-purple-700 drop-shadow">Casa de Empeño</h1>
        <nav>
            <ul class="flex gap-8 mb-6">
                <li>
                    <NuxtLink
                        to="/clientes"
                        class="text-white px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-400 rounded-2xl font-bold shadow hover:scale-105 hover:from-blue-600 hover:to-blue-500 transition-all duration-200"
                    >
                        Clientes
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink
                        to="/articulos"
                        class="text-white px-6 py-3 bg-gradient-to-r from-pink-500 to-pink-400 rounded-2xl font-bold shadow hover:scale-105 hover:from-pink-600 hover:to-pink-500 transition-all duration-200"
                    >
                        Artículos
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink
                        to="/transacciones"
                        class="text-white px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-400 rounded-2xl font-bold shadow hover:scale-105 hover:from-purple-600 hover:to-purple-500 transition-all duration-200"
                    >
                        Transacciones
                    </NuxtLink>
                </li>
            </ul>
        </nav>
        <slot />
    </div>
</template>

<script setup>
// ...existing code...
</script>
