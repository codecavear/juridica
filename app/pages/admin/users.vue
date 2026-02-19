<template>
  <UDashboardPanel>
    <template #header>
      <UDashboardNavbar title="Usuarios">
        <template #right>
          <UInput
            v-model="search"
            placeholder="Buscar por email..."
            icon="i-lucide-search"
            size="sm"
            class="w-64"
          />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <!-- Loading state -->
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
        v-else-if="filteredUsers.length"
        :data="filteredUsers"
        :columns="columns"
      >
        <template #plan-cell="{ row }">
          <div class="flex items-center gap-2">
            <UBadge
              :color="getPlanColor(row.original.plan)"
              variant="subtle"
              size="xs"
            >
              {{ row.original.plan }}
            </UBadge>
            <span
              v-if="row.original.planExpiresAt"
              class="text-xs"
              :class="isExpired(row.original.planExpiresAt) ? 'text-error' : 'text-muted'"
            >
              {{ isExpired(row.original.planExpiresAt) ? 'Expirado' : `hasta ${formatDate(row.original.planExpiresAt)}` }}
            </span>
          </div>
        </template>
        <template #planSource-cell="{ row }">
          <UBadge
            v-if="row.original.planSource !== 'default'"
            color="neutral"
            variant="outline"
            size="xs"
          >
            {{ row.original.planSource }}
          </UBadge>
          <span
            v-else
            class="text-xs text-dimmed"
          >—</span>
        </template>
        <template #createdAt-cell="{ row }">
          {{ formatDate(row.original.createdAt) }}
        </template>
        <template #actions-cell="{ row }">
          <UDropdownMenu :items="getActions(row.original)">
            <UButton
              icon="i-lucide-more-horizontal"
              variant="ghost"
              size="xs"
            />
          </UDropdownMenu>
        </template>
      </UTable>

      <UEmpty
        v-else
        icon="i-lucide-users"
        title="No hay usuarios"
        description="No hay usuarios registrados todavía"
        class="py-12"
      />
    </template>
  </UDashboardPanel>

  <!-- Change Plan Modal -->
  <UModal
    v-model:open="showPlanModal"
    title="Cambiar plan"
    :description="selectedUser?.email || ''"
  >
    <template #body>
      <div class="space-y-4">
        <UFormField label="Plan">
          <USelectMenu
            v-model="newPlan"
            :items="planOptions"
            class="w-full"
          />
        </UFormField>
        <UFormField label="Expira (opcional)">
          <UInput
            v-model="newExpiry"
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
          @click="showPlanModal = false"
        >
          Cancelar
        </UButton>
        <UButton
          color="primary"
          :loading="saving"
          @click="savePlan"
        >
          Guardar
        </UButton>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

interface User {
  id: string
  email: string
  name: string | null
  plan: string
  planSource: string
  planExpiresAt: string | null
  searchesUsedToday: number
  reportsUsedThisMonth: number
  createdAt: string
}

const search = ref('')
const toast = useToast()

const { data: users, status, refresh } = await useFetch<User[]>('/api/admin/users', {
  default: () => []
})

const columns = [
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'name', header: 'Nombre' },
  { accessorKey: 'plan', header: 'Plan' },
  { accessorKey: 'planSource', header: 'Origen' },
  { accessorKey: 'searchesUsedToday', header: 'Búsquedas' },
  { accessorKey: 'reportsUsedThisMonth', header: 'Reportes' },
  { accessorKey: 'createdAt', header: 'Registrado' },
  { accessorKey: 'actions', header: '' }
]

const filteredUsers = computed(() => {
  if (!users.value) return []
  if (!search.value) return users.value
  const q = search.value.toLowerCase()
  return users.value.filter(u =>
    u.email.toLowerCase().includes(q)
    || u.name?.toLowerCase().includes(q)
  )
})

// Plan change modal
const showPlanModal = ref(false)
const selectedUser = ref<User | null>(null)
const newPlan = ref('free')
const newExpiry = ref('')
const saving = ref(false)

const planOptions = ['free', 'basico', 'pro', 'estudio']

function openPlanModal(user: User) {
  selectedUser.value = user
  newPlan.value = user.plan
  newExpiry.value = user.planExpiresAt ? user.planExpiresAt.split('T')[0] : ''
  showPlanModal.value = true
}

async function savePlan() {
  if (!selectedUser.value) return
  saving.value = true
  try {
    await $fetch('/api/admin/update-plan', {
      method: 'POST',
      body: {
        userId: selectedUser.value.id,
        plan: newPlan.value,
        expiresAt: newExpiry.value || undefined
      }
    })
    toast.add({ title: `Plan actualizado a ${newPlan.value}`, color: 'success' })
    showPlanModal.value = false
    await refresh()
  } catch (e: any) {
    toast.add({ title: e?.data?.message || 'Error al actualizar', color: 'error' })
  } finally {
    saving.value = false
  }
}

async function deactivateUser(user: User) {
  if (!confirm(`¿Desactivar a ${user.email}? Se le cambiará al plan free.`)) return
  try {
    await $fetch('/api/admin/deactivate-user', {
      method: 'POST',
      body: { userId: user.id }
    })
    toast.add({ title: `${user.email} desactivado`, color: 'success' })
    await refresh()
  } catch (e: any) {
    toast.add({ title: e?.data?.message || 'Error', color: 'error' })
  }
}

function getPlanColor(plan: string) {
  const colors: Record<string, 'neutral' | 'info' | 'secondary' | 'warning'> = {
    free: 'neutral',
    basico: 'info',
    pro: 'secondary',
    estudio: 'warning'
  }
  return colors[plan] || 'neutral'
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('es-AR')
}

function isExpired(date: string | null) {
  if (!date) return false
  return new Date(date) < new Date()
}

function getActions(user: User) {
  return [
    [{
      label: 'Cambiar plan',
      icon: 'i-lucide-credit-card',
      onSelect: () => openPlanModal(user)
    }],
    [{
      label: 'Desactivar',
      icon: 'i-lucide-user-x',
      color: 'error' as const,
      onSelect: () => deactivateUser(user)
    }]
  ]
}
</script>
