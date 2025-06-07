<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex flex-col items-center py-10">
    <h1 class="text-4xl font-extrabold mb-8 text-purple-700 drop-shadow">Casa de Empeño</h1>
    <div class="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
      <div class="bg-white/90 rounded-2xl shadow-lg p-8 flex flex-col items-center border-t-4 border-blue-400">
        <div class="text-5xl mb-2 text-blue-500"><i class="fa-solid fa-users"></i></div>
        <div class="text-2xl font-bold text-blue-700">Clientes</div>
        <div class="text-3xl font-extrabold my-2" v-if="stats">{{ stats.clientes }}</div>
        <NuxtLink to="/clientes" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold shadow hover:bg-blue-600 transition">Ver Clientes</NuxtLink>
      </div>
      <div class="bg-white/90 rounded-2xl shadow-lg p-8 flex flex-col items-center border-t-4 border-pink-400">
        <div class="text-5xl mb-2 text-pink-500"><i class="fa-solid fa-box"></i></div>
        <div class="text-2xl font-bold text-pink-700">Artículos</div>
        <div class="text-3xl font-extrabold my-2" v-if="stats">{{ stats.articulos }}</div>
        <NuxtLink to="/articulos" class="mt-4 px-4 py-2 bg-pink-500 text-white rounded-lg font-semibold shadow hover:bg-pink-600 transition">Ver Artículos</NuxtLink>
      </div>
      <div class="bg-white/90 rounded-2xl shadow-lg p-8 flex flex-col items-center border-t-4 border-purple-400">
        <div class="text-5xl mb-2 text-purple-500"><i class="fa-solid fa-hand-holding-usd"></i></div>
        <div class="text-2xl font-bold text-purple-700">Transacciones</div>
        <div class="text-3xl font-extrabold my-2" v-if="stats">{{ stats.transacciones }}</div>
        <NuxtLink to="/transacciones" class="mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg font-semibold shadow hover:bg-purple-600 transition">Ver Transacciones</NuxtLink>
      </div>
    </div>
    <div class="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
      <div class="bg-white/80 rounded-xl shadow p-6 flex flex-col gap-2">
        <div class="font-semibold text-blue-700 mb-2">Clientes recientes</div>
        <ul>
          <li v-for="c in stats?.ultimosClientes || []" :key="c.id" class="py-1 border-b last:border-b-0 flex justify-between">
            <span>{{ c.nombre }} {{ c.apellido }}</span>
            <span class="text-xs text-gray-400">{{ c.dni }}</span>
          </li>
        </ul>
      </div>
      <div class="bg-white/80 rounded-xl shadow p-6 flex flex-col gap-2">
        <div class="font-semibold text-pink-700 mb-2">Artículos recientes</div>
        <ul>
          <li v-for="a in stats?.ultimosArticulos || []" :key="a.id" class="py-1 border-b last:border-b-0 flex justify-between">
            <span>{{ a.descripcion }}</span>
            <span class="text-xs text-gray-400">Cliente #{{ a.clientes_id }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
      <div class="bg-white/90 rounded-2xl shadow-lg p-6 flex flex-col items-center border-t-4 border-green-400">
        <div class="text-2xl font-bold text-green-700 mb-2">Préstamos Activos</div>
        <div class="text-3xl font-extrabold">{{ stats?.prestamosActivos }}</div>
      </div>
      <div class="bg-white/90 rounded-2xl shadow-lg p-6 flex flex-col items-center border-t-4 border-yellow-400">
        <div class="text-2xl font-bold text-yellow-700 mb-2">Total Prestado</div>
        <div class="text-3xl font-extrabold">${{ stats?.totalPrestado }}</div>
      </div>
      <div class="bg-white/90 rounded-2xl shadow-lg p-6 flex flex-col items-center border-t-4 border-orange-400">
        <div class="text-2xl font-bold text-orange-700 mb-2">Total Intereses</div>
        <div class="text-3xl font-extrabold">${{ stats?.totalInteres }}</div>
      </div>
    </div>
    <div class="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
      <div class="bg-white/90 rounded-2xl shadow-lg p-6 flex flex-col items-center border-t-4 border-blue-300">
        <div class="text-2xl font-bold text-blue-700 mb-2">Artículos Empeñados</div>
        <div class="text-3xl font-extrabold">{{ stats?.articulosEmpeñados }}</div>
      </div>
      <div class="bg-white/90 rounded-2xl shadow-lg p-6 flex flex-col items-center border-t-4 border-pink-300">
        <div class="text-2xl font-bold text-pink-700 mb-2">Artículos Vendidos</div>
        <div class="text-3xl font-extrabold">{{ stats?.articulosVendidos }}</div>
      </div>
    </div>
    <div class="w-full max-w-4xl bg-white/90 rounded-2xl shadow-lg p-8 mt-8">
      <h2 class="text-xl font-bold mb-4 text-purple-700">Transacciones por Mes</h2>
      <div v-if="stats?.transaccionesPorMes?.length" class="overflow-x-auto">
        <table class="w-full text-center">
          <thead>
            <tr class="bg-purple-100 text-purple-800">
              <th class="py-2 px-3 rounded-tl-xl">Mes</th>
              <th class="py-2 px-3 rounded-tr-xl">Cantidad</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="t in stats.transaccionesPorMes" :key="t.mes" class="bg-white hover:bg-purple-50 shadow rounded-xl">
              <td class="py-2 px-3">{{ t.mes }}</td>
              <td class="py-2 px-3">{{ t.total }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="text-gray-400">No hay datos de transacciones mensuales.</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const stats = ref(null);
onMounted(async () => {
  stats.value = await $fetch('/api/dashboard');
});
</script>
