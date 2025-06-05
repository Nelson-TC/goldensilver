<template>
  <div class="max-w-lg mx-auto bg-white/90 rounded-2xl shadow-lg p-8 mt-8">
    <h2 class="text-2xl font-bold mb-6 text-blue-700 flex items-center gap-2">
      <span class="inline-block w-3 h-3 bg-blue-400 rounded-full"></span>Agregar Cliente
    </h2>
    <form @submit.prevent="agregarCliente" class="flex flex-col gap-4">
      <label class="font-semibold">Nombre:
        <input v-model="cliente.nombre" required class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 transition" />
      </label>
      <label class="font-semibold">Apellido:
        <input v-model="cliente.apellido" required class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 transition" />
      </label>
      <label class="font-semibold">DNI:
        <input v-model="cliente.dni" required class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 transition" />
      </label>
      <label class="font-semibold">Teléfono:
        <input v-model="cliente.telefono" required class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 transition" />
      </label>
      <label class="font-semibold">Dirección:
        <input v-model="cliente.direccion" required class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 transition" />
      </label>
      <label class="font-semibold">Email:
        <input v-model="cliente.email" type="email" required class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 transition" />
      </label>
      <div class="flex gap-4 mt-4">
        <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold shadow hover:bg-blue-600 transition">Guardar</button>
        <NuxtLink to="/clientes" class="px-4 py-2 bg-gray-200 rounded-lg font-semibold hover:bg-gray-300 transition">Cancelar</NuxtLink>
      </div>
    </form>
    <div v-if="mensaje" :style="{color: mensajeColor}" class="mt-4 font-semibold">{{ mensaje }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const cliente = ref({ nombre: '', apellido: '', dni: '', telefono: '', direccion: '', email: '' });
const mensaje = ref('');
const mensajeColor = ref('green');
async function agregarCliente() {
  try {
    await $fetch('/api/clientes/nuevo', { method: 'POST', body: cliente.value });
    mensaje.value = 'Cliente agregado correctamente';
    mensajeColor.value = 'green';
    setTimeout(() => router.push('/clientes'), 1000);
  } catch (e) {
    mensaje.value = 'Error al agregar cliente';
    mensajeColor.value = 'red';
  }
}
</script>
