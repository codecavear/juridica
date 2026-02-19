<template>
  <UDashboardPanel>
    <template #header>
      <UDashboardNavbar title="Cupones">
        <template #right>
          <UButton
            color="primary"
            icon="i-lucide-plus"
            @click="openCreate"
          >
            Crear cupón
          </UButton>
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div
        v-if="status === 'pending'"
        class="flex justify-center py-12"
      >
        <UIcon
          name="i-lucide-loader-2"
          class="text-3xl text-muted animate-spin"
        />
      </div>

      <UTable
        v-else-if="coupons?.length"
        :data="coupons"
        :columns="columns"
      >
        <template #code-cell="{ row }">
          <code class="text-sm font-mono font-bold">{{ row.original.code }}</code>
        </template>
        <template #plan-cell="{ row }">
          <UBadge
            :color="getPlanColor(row.original.plan)"
            variant="subtle"
            size="xs"
          >
            {{ row.original.plan }}
          </UBadge>
        </template>
        <template #usage-cell="{ row }">
          <div class="flex items-center gap-2">
            <span class="text-sm">{{ row.original.usedCount }} / {{ row.original.maxUses }}</span>
            <UProgress
              :model-value="(row.original.usedCount / row.original.maxUses) * 100"
              size="xs"
              :color="row.original.usedCount >= row.original.maxUses ? 'error' : 'primary'"
              class="w-16"
            />
          </div>
        </template>
        <template #durationDays-cell="{ row }">
          {{ row.original.durationDays }} días
        </template>
        <template #expiresAt-cell="{ row }">
          <span
            v-if="row.original.expiresAt"
            :class="isExpired(row.original.expiresAt) ? 'text-error' : 'text-muted'"
          >
            {{ isExpired(row.original.expiresAt) ? 'Expirado' : formatDate(row.original.expiresAt) }}
          </span>
          <span
            v-else
            class="text-dimmed"
          >Sin límite</span>
        </template>
        <template #link-cell="{ row }">
          <UButton
            variant="ghost"
            size="xs"
            icon="i-lucide-copy"
            @click="copyLink(row.original.code)"
          />
        </template>
      </UTable>

      <UEmpty
        v-else
        icon="i-lucide-ticket"
        title="Sin cupones"
        description="Creá tu primer cupón para compartir"
        class="py-12"
      />
    </template>
  </UDashboardPanel>

  <!-- Create Coupon Modal -->
  <UModal
    v-model:open="showModal"
    title="Crear cupón"
  >
    <template #body>
      <div class="space-y-4">
        <UFormField label="Código">
          <UInput
            v-model="form.code"
            placeholder="LAUNCH2026"
            class="w-full font-mono"
          />
        </UFormField>
        <UFormField label="Plan">
          <USelectMenu
            v-model="form.plan"
            :items="['basico', 'pro', 'estudio']"
            class="w-full"
          />
        </UFormField>
        <UFormField label="Duración (días)">
          <UInput
            v-model.number="form.durationDays"
            type="number"
            placeholder="180"
            class="w-full"
          />
        </UFormField>
        <UFormField label="Máximo de usos">
          <UInput
            v-model.number="form.maxUses"
            type="number"
            placeholder="100"
            class="w-full"
          />
        </UFormField>
        <UFormField label="Expira (opcional)">
          <UInput
            v-model="form.expiresAt"
            type="date"
            class="w-full"
          />
        </UFormField>
      </div>
    </template>
    <template #footer>
      <div class="flex justify-end gap-2">
        <UButton
          variant="outline"
          color="neutral"
          @click="showModal = false"
        >
          Cancelar
        </UButton>
        <UButton
          color="primary"
          :loading="saving"
          :disabled="!form.code || !form.plan || !form.durationDays || !form.maxUses"
          @click="createCoupon"
        >
          Crear
        </UButton>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })

interface Coupon {
  id: string
  code: string
  plan: string
  durationDays: number
  maxUses: number
  usedCount: number
  expiresAt: string | null
  createdAt: string
}

const toast = useToast()
const { data: coupons, status, refresh } = await useFetch<Coupon[]>('/api/admin/coupons', {
  default: () => []
})

const columns = [
  { accessorKey: 'code', header: 'Código' },
  { accessorKey: 'plan', header: 'Plan' },
  { accessorKey: 'durationDays', header: 'Duración' },
  { accessorKey: 'usage', header: 'Uso' },
  { accessorKey: 'expiresAt', header: 'Expira' },
  { accessorKey: 'link', header: '' }
]

const showModal = ref(false)
const saving = ref(false)
const form = ref({
  code: '',
  plan: 'pro',
  durationDays: 180,
  maxUses: 100,
  expiresAt: ''
})

function openCreate() {
  form.value = { code: '', plan: 'pro', durationDays: 180, maxUses: 100, expiresAt: '' }
  showModal.value = true
}

async function createCoupon() {
  saving.value = true
  try {
    await $fetch('/api/admin/coupons', {
      method: 'POST',
      body: {
        code: form.value.code,
        plan: form.value.plan,
        durationDays: form.value.durationDays,
        maxUses: form.value.maxUses,
        expiresAt: form.value.expiresAt || undefined
      }
    })
    toast.add({ title: `Cupón ${form.value.code} creado`, color: 'success' })
    showModal.value = false
    await refresh()
  } catch (e: any) {
    toast.add({ title: e?.data?.message || 'Error al crear cupón', color: 'error' })
  } finally {
    saving.value = false
  }
}

function copyLink(code: string) {
  navigator.clipboard.writeText(`https://juridica.ar?cupon=${code}`)
  toast.add({ title: 'Link copiado', color: 'success', icon: 'i-lucide-check' })
}

function getPlanColor(plan: string) {
  const colors: Record<string, 'info' | 'secondary' | 'warning'> = {
    basico: 'info',
    pro: 'secondary',
    estudio: 'warning'
  }
  return colors[plan] || 'info'
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('es-AR')
}

function isExpired(date: string | null) {
  if (!date) return false
  return new Date(date) < new Date()
}
</script>
