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
      <div class="p-6">
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

        <UEmpty
          v-if="users.length === 0"
          icon="i-lucide-users"
          title="No hay usuarios"
          description="No hay usuarios registrados todavía"
          class="py-12"
        />
      </div>
    </template>
  </UDashboardPanel>
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
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'name', header: 'Nombre' },
  { accessorKey: 'plan', header: 'Plan' },
  { accessorKey: 'searchesUsedToday', header: 'Búsquedas hoy' },
  { accessorKey: 'reportsUsedThisMonth', header: 'Reportes mes' },
  { accessorKey: 'createdAt', header: 'Registrado' },
  { accessorKey: 'actions', header: '' }
]

const filteredUsers = computed(() => {
  if (!search.value) return users.value
  return users.value.filter(u =>
    u.email.toLowerCase().includes(search.value.toLowerCase())
    || u.name?.toLowerCase().includes(search.value.toLowerCase())
  )
})

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

function getActions(_user: User) {
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
      color: 'error' as const
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
