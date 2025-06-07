<template>
  <div class="max-w-6xl mx-auto bg-white/80 rounded-2xl shadow-lg p-8 mt-6">
    <NuxtLink to="/" class="text-green-600 font-bold mb-4 inline-block hover:underline">← Volver al Inicio</NuxtLink>
    <h2 class="text-2xl font-bold mb-6 text-blue-700 flex items-center gap-2">
      <span class="inline-block w-3 h-3 bg-blue-400 rounded-full"></span>Clientes
    </h2>
    <div class="flex flex-wrap gap-4 mb-4">
      <NuxtLink to="/clientes/nuevo" class="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold shadow hover:bg-blue-600 transition">Agregar Cliente</NuxtLink>
      <a href="/api/clientes/export-csv" class="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold shadow hover:bg-green-600 transition" download>Exportar CSV</a>
      <a href="/api/clientes/export-xlsx" class="px-4 py-2 bg-yellow-500 text-white rounded-lg font-semibold shadow hover:bg-yellow-600 transition" download>Exportar Excel</a>
    </div>
    <table class="w-full border-separate border-spacing-y-2">
      <thead>
        <tr class="bg-blue-100 text-blue-800">
          <th class="py-2 px-3 rounded-tl-xl">ID</th><th>Nombre</th><th>Apellido</th><th>DNI</th><th>Teléfono</th><th>Dirección</th><th>Email</th><th class="rounded-tr-xl">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cliente in clientes" :key="cliente.id" class="bg-white hover:bg-blue-50 shadow rounded-xl">
          <td class="py-2 px-3">{{ cliente.id }}</td>
          <td>{{ cliente.nombre }}</td>
          <td>{{ cliente.apellido }}</td>
          <td>{{ cliente.dni }}</td>
          <td>{{ cliente.telefono }}</td>
          <td>{{ cliente.direccion }}</td>
          <td>{{ cliente.email }}</td>
          <td>
            <NuxtLink :to="`/clientes/editar/${cliente.id}`" class="text-blue-600 font-bold hover:underline">Editar</NuxtLink> |
            <button @click="confirmarEliminacion(cliente)" class="text-red-600 font-bold hover:underline">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="mostrarModal" class="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div class="bg-white p-8 rounded-xl shadow-xl text-center">
        <p class="mb-4 text-lg">¿Estás seguro de que deseas eliminar al cliente <b>{{ clienteAEliminar?.nombre }} {{ clienteAEliminar?.apellido }}</b>?</p>
        <button @click="eliminarCliente(clienteAEliminar.id)" class="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold mr-2 hover:bg-red-600 transition">Sí, eliminar</button>
        <button @click="mostrarModal = false" class="px-4 py-2 bg-gray-200 rounded-lg font-semibold hover:bg-gray-300 transition">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const clientes = ref([]);
const mostrarModal = ref(false);
const clienteAEliminar = ref(null);
async function cargarClientes() {
  clientes.value = await $fetch('/api/clientes');
}
onMounted(cargarClientes);
function confirmarEliminacion(cliente) {
  clienteAEliminar.value = cliente;
  mostrarModal.value = true;
}
async function eliminarCliente(id) {
  await $fetch(`/api/clientes/${id}`, { method: 'DELETE' });
  mostrarModal.value = false;
  clienteAEliminar.value = null;
  cargarClientes();
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
