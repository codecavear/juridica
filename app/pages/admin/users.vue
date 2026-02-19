<template>
  <UDashboardPage>
    <UDashboardPanel>
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

      <UDashboardPanelContent>
        <UTable
          :data="filteredUsers"
          :columns="columns"
        >
          <template #plan-cell="{ row }">
            <UBadge
              :color="getPlanColor(row.original.plan)"
              variant="subtle"
              size="xs"
            >
              {{ row.original.plan }}
            </UBadge>
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

        <div
          v-if="users.length === 0"
          class="text-center py-12"
        >
          <UIcon
            name="i-lucide-users"
            class="w-12 h-12 text-muted mx-auto mb-4"
          />
          <p class="text-muted">
            No hay usuarios registrados
          </p>
        </div>
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
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
  searchesUsedToday: number
  reportsUsedThisMonth: number
  createdAt: string
}

const search = ref('')
const users = ref<User[]>([])

const columns = [
  { key: 'email', label: 'Email' },
  { key: 'name', label: 'Nombre' },
  { key: 'plan', label: 'Plan' },
  { key: 'searchesUsedToday', label: 'Búsquedas hoy' },
  { key: 'reportsUsedThisMonth', label: 'Reportes mes' },
  { key: 'createdAt', label: 'Registrado' },
  { key: 'actions', label: '' }
]

const filteredUsers = computed(() => {
  if (!search.value) return users.value
  return users.value.filter(u =>
    u.email.toLowerCase().includes(search.value.toLowerCase())
    || u.name?.toLowerCase().includes(search.value.toLowerCase())
  )
})

function getPlanColor(plan: string) {
  const colors: Record<string, string> = {
    free: 'neutral',
    basico: 'blue',
    pro: 'purple',
    estudio: 'amber'
  }
  return colors[plan] || 'neutral'
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('es-AR')
}

function getActions(user: User) {
  return [
    [{
      label: 'Ver detalles',
      icon: 'i-lucide-eye'
    }],
    [{
      label: 'Cambiar plan',
      icon: 'i-lucide-credit-card'
    }],
    [{
      label: 'Eliminar',
      icon: 'i-lucide-trash',
      color: 'red' as const
    }]
  ]
}

async function loadUsers() {
  try {
    const data = await $fetch('/api/admin/users')
    users.value = data
  } catch (error) {
    console.error('Error loading users:', error)
  }
}

onMounted(() => {
  loadUsers()
})
</script>
