<template>
  <div class="max-w-lg mx-auto bg-white/90 rounded-2xl shadow-lg p-8 mt-8">
    <h2 class="text-2xl font-bold mb-6 text-pink-700 flex items-center gap-2">
      <span class="inline-block w-3 h-3 bg-pink-400 rounded-full"></span>Editar Artículo
    </h2>
    <form v-if="articulo" @submit.prevent="editarArticulo" class="flex flex-col gap-4">
      <label class="font-semibold">Artículo ID:
        <input v-model="articulo.articulo_id" type="number" required class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 transition" />
      </label>
      <label class="font-semibold">Estado:
        <input v-model="articulo.estado" required class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 transition" />
      </label>
      <label class="font-semibold">Fecha Alta:
        <input v-model="articulo.fecha_alta" type="date" required class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 transition" />
      </label>
      <label class="font-semibold">Valor Tasado:
        <input v-model="articulo.valor_tasado" type="number" step="0.01" required class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 transition" />
      </label>
      <label class="font-semibold">Descripción:
        <input v-model="articulo.descripcion" required class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 transition" />
      </label>
      <label class="font-semibold">ID Cliente:
        <input v-model="articulo.clientes_id" type="number" required class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 transition" />
      </label>
      <div class="flex gap-4 mt-4">
        <button type="submit" class="px-4 py-2 bg-pink-500 text-white rounded-lg font-semibold shadow hover:bg-pink-600 transition">Guardar Cambios</button>
        <NuxtLink to="/articulos" class="px-4 py-2 bg-gray-200 rounded-lg font-semibold hover:bg-gray-300 transition">Cancelar</NuxtLink>
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
const articulo = ref(null);
const mensaje = ref('');
const mensajeColor = ref('green');

async function cargarArticulo() {
  const id = route.params.id;
  articulo.value = await $fetch(`/api/articulos/${id}`);
}
onMounted(cargarArticulo);

async function editarArticulo() {
  try {
    await $fetch(`/api/articulos/${route.params.id}`, { method: 'PUT', body: articulo.value });
    mensaje.value = 'Artículo actualizado correctamente';
    mensajeColor.value = 'green';
    setTimeout(() => router.push('/articulos'), 1000);
  } catch (e) {
    mensaje.value = 'Error al actualizar artículo';
    mensajeColor.value = 'red';
  }
}
</script>
