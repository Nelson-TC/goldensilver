<template>
  <div class="max-w-6xl mx-auto bg-white/80 rounded-2xl shadow-lg p-8 mt-6">
    <NuxtLink to="/" class="text-green-600 font-bold mb-4 inline-block hover:underline">← Volver al Inicio</NuxtLink>
    <h2 class="text-2xl font-bold mb-6 text-pink-700 flex items-center gap-2">
      <span class="inline-block w-3 h-3 bg-pink-400 rounded-full"></span>Artículos
    </h2>
    <div class="flex flex-wrap gap-4 mb-4">
      <NuxtLink to="/articulos/nuevo" class="px-4 py-2 bg-pink-500 text-white rounded-lg font-semibold shadow hover:bg-pink-600 transition">Agregar Artículo</NuxtLink>
      <a href="/api/articulos/export-csv" class="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold shadow hover:bg-green-600 transition" download>Exportar CSV</a>
      <a href="/api/articulos/export-xlsx" class="px-4 py-2 bg-yellow-500 text-white rounded-lg font-semibold shadow hover:bg-yellow-600 transition" download>Exportar Excel</a>
    </div>
    <table class="w-full border-separate border-spacing-y-2">
      <thead>
        <tr class="bg-pink-100 text-pink-800">
          <th class="py-2 px-3 rounded-tl-xl">ID</th><th>Estado</th><th>Fecha Alta</th><th>Valor Tasado</th><th>Descripción</th><th>ID Cliente</th><th class="rounded-tr-xl">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="articulo in articulos" :key="articulo.id" class="bg-white hover:bg-pink-50 shadow rounded-xl">
          <td class="py-2 px-3">{{ articulo.id }}</td>
          <td>{{ articulo.estado }}</td>
          <td>{{ dayjs(articulo.fecha_alta).format("DD/MM/YYYY") }}</td>
          <td>{{ articulo.valor_tasado }}</td>
          <td>{{ articulo.descripcion }}</td>
          <td>{{ articulo.clientes_id }}</td>
          <td>
            <NuxtLink :to="`/articulos/editar/${articulo.id}`" class="text-pink-600 font-bold hover:underline">Editar</NuxtLink> |
            <button @click="confirmarEliminacion(articulo)" class="text-red-600 font-bold hover:underline">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="mostrarModal" class="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div class="bg-white p-8 rounded-xl shadow-xl text-center">
        <p class="mb-4 text-lg">¿Estás seguro de que deseas eliminar el artículo <b>#{{ articuloAEliminar?.id }}</b>?</p>
        <button @click="eliminarArticulo(articuloAEliminar.id)" class="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold mr-2 hover:bg-red-600 transition">Sí, eliminar</button>
        <button @click="mostrarModal = false" class="px-4 py-2 bg-gray-200 rounded-lg font-semibold hover:bg-gray-300 transition">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import dayjs from 'dayjs';
import { ref, onMounted } from 'vue';
const articulos = ref([]);
const mostrarModal = ref(false);
const articuloAEliminar = ref(null);
async function cargarArticulos() {
  articulos.value = await $fetch('/api/articulos');
}
onMounted(cargarArticulos);
function confirmarEliminacion(articulo) {
  articuloAEliminar.value = articulo;
  mostrarModal.value = true;
}
async function eliminarArticulo(id) {
  await $fetch(`/api/articulos/${id}`, { method: 'DELETE' });
  mostrarModal.value = false;
  articuloAEliminar.value = null;
  cargarArticulos();
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
