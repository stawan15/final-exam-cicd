<template>
  <div class="h-full flex flex-col p-6 space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-white mb-1">Invoices</h2>
        <p class="text-surface-400 text-sm">Create and manage your billing</p>
      </div>
      <button @click="isModalOpen = true" class="px-4 py-2.5 bg-primary-600 hover:bg-primary-500 text-white text-sm font-medium rounded-xl shadow-glow transition-colors flex items-center gap-2">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
        New Invoice
      </button>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="glass-card p-5">
        <div class="text-surface-400 text-sm font-medium mb-2">Total Outstanding</div>
        <div class="text-2xl font-bold text-white">${{ totalOutstanding.toLocaleString(undefined, { minimumFractionDigits: 2 }) }}</div>
      </div>
      <div class="glass-card p-5">
        <div class="text-surface-400 text-sm font-medium mb-2">Overdue</div>
        <div class="text-2xl font-bold text-accent-red">${{ totalOverdue.toLocaleString(undefined, { minimumFractionDigits: 2 }) }}</div>
      </div>
      <div class="glass-card p-5 border border-primary-500/30">
        <div class="text-surface-400 text-sm font-medium mb-2">Paid Total</div>
        <div class="text-2xl font-bold text-accent-green">${{ totalPaid.toLocaleString(undefined, { minimumFractionDigits: 2 }) }}</div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex items-center justify-center py-20 flex-1">
      <div class="w-8 h-8 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin"></div>
    </div>

    <!-- Invoices List -->
    <div v-else-if="invoices.length > 0" class="glass-card flex-1 overflow-auto">
      <table class="w-full text-left">
        <thead class="bg-surface-800/50 text-surface-400 text-sm border-b border-surface-700">
          <tr>
            <th class="p-4 font-medium">Invoice Number</th>
            <th class="p-4 font-medium">Client</th>
            <th class="p-4 font-medium">Amount</th>
            <th class="p-4 font-medium">Due Date</th>
            <th class="p-4 font-medium">Status</th>
            <th class="p-4 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-surface-800/50 text-sm">
          <tr v-for="inv in invoices" :key="inv.id" class="hover:bg-surface-800/30 transition-colors group">
            <td class="p-4 text-white font-mono">{{ inv.invoice_number }}</td>
            <td class="p-4 text-surface-200">{{ inv.client_name }}</td>
            <td class="p-4 text-white font-medium">${{ parseFloat(inv.amount).toLocaleString(undefined, { minimumFractionDigits: 2 }) }}</td>
            <td class="p-4 text-surface-400">{{ formatDate(inv.due_date) }}</td>
            <td class="p-4">
              <span :class="['px-2.5 py-1 rounded-full text-xs font-medium', getStatusClass(inv.status)]">
                {{ inv.status }}
              </span>
            </td>
            <td class="p-4 text-right space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button v-if="inv.status !== 'Paid'" @click="markAsPaid(inv.id)" class="px-3 py-1 bg-accent-green/20 text-accent-green hover:bg-accent-green/30 rounded text-xs font-medium transition-colors">Mark Paid</button>
              <button @click="deleteInvoice(inv.id)" class="px-3 py-1 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded text-xs font-medium transition-colors">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Empty State -->
    <div v-else class="glass-card flex-1 p-8 flex flex-col items-center justify-center text-center">
      <div class="w-16 h-16 rounded-full bg-surface-800 flex items-center justify-center mb-4">
        <svg class="w-8 h-8 text-surface-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
      </div>
      <h3 class="text-xl font-bold text-white mb-2">No active invoices found</h3>
      <p class="text-surface-400 max-w-sm mb-6">Create your first invoice to start getting paid.</p>
      <button @click="isModalOpen = true" class="px-4 py-2 bg-primary-600/20 text-primary-400 font-medium rounded-lg hover:bg-primary-600/30 transition-colors text-sm">
        Create Invoice
      </button>
    </div>

    <!-- Create Invoice Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-950/80 backdrop-blur-sm">
      <div class="bg-surface-900 border border-surface-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-fade-in flex flex-col max-h-[90vh]">
        <div class="p-5 border-b border-surface-800 flex items-center justify-between shrink-0">
          <h3 class="text-lg font-semibold text-white">Create Invoice</h3>
          <button @click="isModalOpen = false" class="text-surface-400 hover:text-white transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <form @submit.prevent="submitInvoice" class="p-5 space-y-4 overflow-y-auto">
          <div>
            <label class="block text-sm font-medium text-surface-300 mb-1.5">Client Name</label>
            <input v-model="form.client_name" required type="text" class="w-full px-3 py-2 bg-surface-950 border border-surface-800 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors" placeholder="e.g. Acme Corp">
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-surface-300 mb-1.5">Invoice Number</label>
              <input v-model="form.invoice_number" required type="text" class="w-full px-3 py-2 bg-surface-950 border border-surface-800 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors" placeholder="INV-001">
            </div>
            <div>
              <label class="block text-sm font-medium text-surface-300 mb-1.5">Amount ($)</label>
              <input v-model.number="form.amount" required type="number" step="0.01" class="w-full px-3 py-2 bg-surface-950 border border-surface-800 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors" placeholder="0.00">
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-surface-300 mb-1.5">Status</label>
              <select v-model="form.status" required class="w-full px-3 py-2 bg-surface-950 border border-surface-800 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors">
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
                <option value="Overdue">Overdue</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-surface-300 mb-1.5">Due Date</label>
              <input v-model="form.due_date" required type="date" class="w-full px-3 py-2 bg-surface-950 border border-surface-800 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors">
            </div>
          </div>
          
          <div class="pt-4 flex gap-3">
            <button type="button" @click="isModalOpen = false" class="flex-1 px-4 py-2 border border-surface-700 hover:bg-surface-800 text-white rounded-xl transition-colors font-medium text-sm">Cancel</button>
            <button type="submit" :disabled="isSubmitting" class="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-500 disabled:opacity-50 text-white rounded-xl shadow-glow transition-colors font-medium text-sm">
              {{ isSubmitting ? 'Creating...' : 'Create Invoice' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { invoiceService } from '../services/invoiceService'

const invoices = ref([])
const isLoading = ref(true)
const isModalOpen = ref(false)
const isSubmitting = ref(false)

const form = ref({
  client_name: '',
  invoice_number: `INV-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
  amount: null,
  status: 'Pending',
  due_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 14 days from now
})

onMounted(() => {
  fetchInvoices()
})

async function fetchInvoices() {
  isLoading.value = true
  try {
    invoices.value = await invoiceService.getInvoices()
  } catch (error) {
    console.error('Failed to load invoices')
  } finally {
    isLoading.value = false
  }
}

async function submitInvoice() {
  isSubmitting.value = true
  try {
    const newInvoice = await invoiceService.createInvoice(form.value)
    invoices.value.unshift(newInvoice)
    isModalOpen.value = false
    // reset form
    form.value = {
      client_name: '',
      invoice_number: `INV-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      amount: null,
      status: 'Pending',
      due_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    }
  } catch (error) {
    alert('Failed to create invoice')
  } finally {
    isSubmitting.value = false
  }
}

async function markAsPaid(id) {
  try {
    const updated = await invoiceService.updateInvoiceStatus(id, 'Paid')
    const idx = invoices.value.findIndex(i => i.id === id)
    if (idx !== -1) invoices.value[idx].status = 'Paid'
  } catch (error) {
    alert('Failed to update status')
  }
}

async function deleteInvoice(id) {
  if (!confirm('Are you sure you want to delete this invoice?')) return
  try {
    await invoiceService.deleteInvoice(id)
    invoices.value = invoices.value.filter(i => i.id !== id)
  } catch (error) {
    alert('Failed to delete invoice')
  }
}

// Computed stats
const totalOutstanding = computed(() => {
  return invoices.value.filter(i => i.status === 'Pending').reduce((sum, i) => sum + parseFloat(i.amount), 0)
})

const totalOverdue = computed(() => {
  return invoices.value.filter(i => i.status === 'Overdue').reduce((sum, i) => sum + parseFloat(i.amount), 0)
})

const totalPaid = computed(() => {
  return invoices.value.filter(i => i.status === 'Paid').reduce((sum, i) => sum + parseFloat(i.amount), 0)
})

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

function getStatusClass(status) {
  const map = {
    'Paid': 'bg-accent-green/20 text-accent-green',
    'Pending': 'bg-surface-500/20 text-surface-300',
    'Overdue': 'bg-accent-red/20 text-accent-red'
  }
  return map[status] || 'bg-surface-500/20 text-surface-300'
}
</script>
