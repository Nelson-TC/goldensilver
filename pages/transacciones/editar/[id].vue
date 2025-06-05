<template>
  <div class="max-w-lg mx-auto bg-white/90 rounded-2xl shadow-lg p-8 mt-8">
    <h2 class="text-2xl font-bold mb-6 text-purple-700 flex items-center gap-2">
      <span class="inline-block w-3 h-3 bg-purple-400 rounded-full"></span>Editar Transacción
    </h2>
    <form v-if="transaccion" @submit.prevent="editarTransaccion" class="flex flex-col gap-4">
      <label class="font-semibold">Artículo ID:
        <input v-model="transaccion.articulos_id" type="number" required class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300 transition" />
      </label>
      <label class="font-semibold">Tipo:
        <input v-model="transaccion.tipo" required class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300 transition" />
      </label>
      <label class="font-semibold">Fecha:
        <input v-model="transaccion.fecha" type="date" required class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300 transition" />
      </label>
      <label class="font-semibold">Monto:
        <input v-model="transaccion.monto" type="number" step="0.01" required class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300 transition" />
      </label>
      <label class="font-semibold">Interés:
        <input v-model="transaccion.interes" type="number" step="0.01" required class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300 transition" />
      </label>
      <label class="font-semibold">Fecha Límite:
        <input v-model="transaccion.fecha_limite" type="date" required class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300 transition" />
      </label>
      <label class="font-semibold">Estado:
        <input v-model="transaccion.estado" required class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300 transition" />
      </label>
      <div class="flex gap-4 mt-4">
        <button type="submit" class="px-4 py-2 bg-purple-500 text-white rounded-lg font-semibold shadow hover:bg-purple-600 transition">Guardar Cambios</button>
        <NuxtLink to="/transacciones" class="px-4 py-2 bg-gray-200 rounded-lg font-semibold hover:bg-gray-300 transition">Cancelar</NuxtLink>
      </div>
    </form>
    <div v-if="mensaje" :style="{color: mensajeColor}" class="mt-4 font-semibold">{{ mensaje }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();
const transaccion = ref(null);
const mensaje = ref('');
const mensajeColor = ref('green');

async function cargarTransaccion() {
  const id = route.params.id;
  transaccion.value = await $fetch(`/api/transacciones/${id}`);
}
onMounted(cargarTransaccion);

async function editarTransaccion() {
  try {
    await $fetch(`/api/transacciones/${route.params.id}`, { method: 'PUT', body: transaccion.value });
    mensaje.value = 'Transacción actualizada correctamente';
    mensajeColor.value = 'green';
    setTimeout(() => router.push('/transacciones'), 1000);
  } catch (e) {
    mensaje.value = 'Error al actualizar transacción';
    mensajeColor.value = 'red';
  }
}
</script>

<style scoped>
form { max-width: 400px; margin: 1rem 0; display: flex; flex-direction: column; gap: 0.5rem; }
button { margin-top: 1rem; }
</style>
