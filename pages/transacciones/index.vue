<template>
  <div class="max-w-6xl mx-auto bg-white/80 rounded-2xl shadow-lg p-8 mt-6">
    <NuxtLink to="/" class="text-green-600 font-bold mb-4 inline-block hover:underline">← Volver al Inicio</NuxtLink>
    <h2 class="text-2xl font-bold mb-6 text-purple-700 flex items-center gap-2">
      <span class="inline-block w-3 h-3 bg-purple-400 rounded-full"></span>Transacciones
    </h2>
    <NuxtLink to="/transacciones/nuevo" class="mb-4 inline-block px-4 py-2 bg-purple-500 text-white rounded-lg font-semibold shadow hover:bg-purple-600 transition">Agregar Transacción</NuxtLink>
    <table class="w-full border-separate border-spacing-y-2">
      <thead>
        <tr class="bg-purple-100 text-purple-800">
          <th class="py-2 px-3 rounded-tl-xl">ID</th><th>Artículo</th><th>Tipo</th><th>Fecha</th><th>Monto</th><th>Interés</th><th>Fecha Límite</th><th>Estado</th><th class="rounded-tr-xl">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="transaccion in transacciones" :key="transaccion.id" class="bg-white hover:bg-purple-50 shadow rounded-xl">
          <td class="py-2 px-3">{{ transaccion.id }}</td>
          <td>{{ transaccion.articulos_id }}</td>
          <td>{{ transaccion.tipo }}</td>
          <td>{{ transaccion.fecha }}</td>
          <td>{{ transaccion.monto }}</td>
          <td>{{ transaccion.interes }}</td>
          <td>{{ transaccion.fecha_limite }}</td>
          <td>{{ transaccion.estado }}</td>
          <td>
            <NuxtLink :to="`/transacciones/editar/${transaccion.id}`" class="text-purple-600 font-bold hover:underline">Editar</NuxtLink> |
            <button @click="confirmarEliminacion(transaccion)" class="text-red-600 font-bold hover:underline">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="mostrarModal" class="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div class="bg-white p-8 rounded-xl shadow-xl text-center">
        <p class="mb-4 text-lg">¿Estás seguro de que deseas eliminar la transacción <b>#{{ transaccionAEliminar?.id }}</b>?</p>
        <button @click="eliminarTransaccion(transaccionAEliminar.id)" class="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold mr-2 hover:bg-red-600 transition">Sí, eliminar</button>
        <button @click="mostrarModal = false" class="px-4 py-2 bg-gray-200 rounded-lg font-semibold hover:bg-gray-300 transition">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import dayjs from 'dayjs';
import { ref, onMounted } from 'vue';
const transacciones = ref([]);
const mostrarModal = ref(false);
const transaccionAEliminar = ref(null);
async function cargarTransacciones() {
  transacciones.value = await $fetch('/api/transacciones');
}
onMounted(cargarTransacciones);
function confirmarEliminacion(transaccion) {
  transaccionAEliminar.value = transaccion;
  mostrarModal.value = true;
}
async function eliminarTransaccion(id) {
  await $fetch(`/api/transacciones/${id}`, { method: 'DELETE' });
  mostrarModal.value = false;
  transaccionAEliminar.value = null;
  cargarTransacciones();
}
</script>

<style scoped>
table { width: 100%; border-collapse: collapse; }
th, td { border: 1px solid #ccc; padding: 0.5rem; }
.modal-overlay {
  position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
  background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center;
  z-index: 1000;
}
.modal {
  background: #fff; padding: 2rem; border-radius: 8px; box-shadow: 0 2px 8px #0002;
  min-width: 300px; text-align: center;
}
.modal button { margin: 0 1rem; }
</style>
