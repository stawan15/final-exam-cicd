<template>
  <div class="h-full flex flex-col p-6 space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-white mb-1">Cards</h2>
        <p class="text-surface-400 text-sm">Manage physical and virtual corporate cards</p>
      </div>
      <button @click="isModalOpen = true" class="px-4 py-2.5 bg-primary-600 hover:bg-primary-500 text-white text-sm font-medium rounded-xl shadow-glow transition-colors">
        Issue Virtual Card
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex items-center justify-center py-20 flex-1">
      <div class="w-8 h-8 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin"></div>
    </div>

    <div v-else-if="cards.length > 0" class="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1">
      
      <!-- Cards List -->
      <div class="lg:col-span-1 space-y-4 overflow-y-auto max-h-[calc(100vh-180px)] pr-2 custom-scrollbar">
        <div 
          v-for="card in cards" 
          :key="card.id"
          @click="selectedCard = card"
          :class="['relative w-full aspect-[1.586/1] rounded-2xl p-6 text-white overflow-hidden group cursor-pointer transition-all', selectedCard?.id === card.id ? 'shadow-glow scale-[1.02] border-primary-500' : 'border border-surface-700 bg-surface-800/60 hover:bg-surface-800 opacity-80 hover:opacity-100']"
        >
          <!-- Active Card Gradient Background -->
          <div v-if="selectedCard?.id === card.id" class="absolute inset-0 bg-gradient-to-br from-[#1a1c29] via-[#312e81] to-[#6366f1] z-0"></div>
          
          <div class="relative z-10 h-full flex flex-col justify-between">
            <div class="flex justify-between items-start">
              <div class="font-medium truncate max-w-[150px]">{{ card.card_network }} {{ card.card_type }}</div>
              <div :class="['px-2 py-0.5 rounded text-[10px] uppercase font-bold', card.card_type === 'Virtual' ? 'bg-surface-700 text-surface-300' : 'bg-white/20 text-white']">{{ card.card_type }}</div>
            </div>
            <div class="mt-auto">
              <div class="font-mono text-lg tracking-widest mb-1 text-white/90">**** **** **** {{ card.last_four }}</div>
              <div class="flex justify-between items-end">
                <div>
                  <div class="text-[10px] text-white/50 uppercase tracking-wider mb-0.5">Card Holder</div>
                  <div class="font-medium tracking-wide text-xs truncate max-w-[100px]">{{ card.cardholder_name }}</div>
                </div>
                <div>
                  <div class="text-[10px] text-white/50 uppercase tracking-wider mb-0.5">Expires</div>
                  <div class="font-medium tracking-wide text-xs">{{ card.expiry }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Card Details -->
      <div v-if="selectedCard" class="lg:col-span-2 glass-card p-6 h-fit">
        <div class="flex items-center justify-between mb-8 pb-6 border-b border-surface-800/50">
          <div>
            <h3 class="text-xl font-bold text-white mb-1">{{ selectedCard.card_network }} {{ selectedCard.card_type }} Card</h3>
            <p class="text-surface-400 text-sm">Issued to {{ selectedCard.cardholder_name }}</p>
          </div>
          <div class="flex items-center gap-2">
            <span v-if="selectedCard.status === 'active'" class="px-2.5 py-1 bg-accent-green/20 text-accent-green rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 bg-accent-green rounded-full"></span> Active
            </span>
            <span v-else class="px-2.5 py-1 bg-orange-500/20 text-orange-500 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 bg-orange-500 rounded-full"></span> Frozen
            </span>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-8 mb-8">
          <div>
            <div class="text-sm text-surface-400 mb-1">Current Balance</div>
            <div class="text-2xl font-bold text-white">${{ parseFloat(selectedCard.balance).toLocaleString(undefined, { minimumFractionDigits: 2 }) }}</div>
            <!-- Progress bar -->
            <div class="w-full h-2 bg-surface-800 rounded-full mt-3 overflow-hidden border border-surface-700">
              <!-- Dummy limit visualization -->
              <div class="h-full bg-primary-500 w-[15%] rounded-full shadow-glow"></div>
            </div>
            <div class="text-xs text-surface-500 mt-2">of $5,000 limit</div>
          </div>
          <div>
            <div class="text-sm text-surface-400 mb-1">Status</div>
            <div class="text-white font-medium mb-1 flex items-center gap-2">
               <svg v-if="selectedCard.status === 'active'" class="w-4 h-4 text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
               <svg v-else class="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
               {{ selectedCard.status === 'active' ? 'Good Standing' : 'Temporarily Frozen' }}
            </div>
          </div>
        </div>

        <h4 class="text-sm font-bold text-white uppercase tracking-wider mb-4">Card Settings</h4>
        <div class="space-y-3">
          <div class="flex items-center justify-between p-4 bg-surface-900/50 rounded-xl border border-surface-800 transition-colors hover:bg-surface-800/50">
            <div>
              <div class="text-white font-medium">Freeze Card</div>
              <div class="text-sm text-surface-400">Temporarily block all new purchases</div>
            </div>
            <!-- Toggle Switch -->
            <button @click="toggleCardStatus" :class="['w-11 h-6 rounded-full relative cursor-pointer transition-colors', selectedCard.status === 'frozen' ? 'bg-primary-600' : 'bg-surface-700']">
              <div :class="['absolute top-1 w-4 h-4 bg-white rounded-full transition-transform', selectedCard.status === 'frozen' ? 'right-1' : 'left-1 bg-surface-400']"></div>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="glass-card flex-1 p-8 flex flex-col items-center justify-center text-center">
      <div class="w-16 h-16 rounded-full bg-surface-800 flex items-center justify-center mb-4">
        <svg class="w-8 h-8 text-surface-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
      </div>
      <h3 class="text-xl font-bold text-white mb-2">No active cards</h3>
      <p class="text-surface-400 max-w-sm mb-6">Issue a virtual card instantly to start managing company spending securely.</p>
      <button @click="isModalOpen = true" class="px-4 py-2 bg-primary-600/20 text-primary-400 font-medium rounded-lg hover:bg-primary-600/30 transition-colors text-sm">
        Issue Virtual Card
      </button>
    </div>

    <!-- Issue Card Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-950/80 backdrop-blur-sm">
      <div class="bg-surface-900 border border-surface-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-fade-in">
        <div class="p-5 border-b border-surface-800 flex items-center justify-between">
          <h3 class="text-lg font-semibold text-white">Issue New Card</h3>
          <button @click="isModalOpen = false" class="text-surface-400 hover:text-white transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <form @submit.prevent="submitCard" class="p-5 space-y-4">
          <div>
            <label class="block text-sm font-medium text-surface-300 mb-1.5">Cardholder Name</label>
            <input v-model="form.cardholder_name" required type="text" class="w-full px-3 py-2 bg-surface-950 border border-surface-800 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors" placeholder="e.g. John Doe">
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-surface-300 mb-1.5">Card Type</label>
              <select v-model="form.card_type" required class="w-full px-3 py-2 bg-surface-950 border border-surface-800 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors">
                <option value="Virtual">Virtual</option>
                <option value="Physical">Physical</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-surface-300 mb-1.5">Network</label>
              <select v-model="form.card_network" required class="w-full px-3 py-2 bg-surface-950 border border-surface-800 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors">
                <option value="Visa">Visa</option>
                <option value="Mastercard">Mastercard</option>
              </select>
            </div>
          </div>
          <div class="p-4 bg-primary-900/10 border border-primary-500/20 rounded-xl space-y-2">
            <div class="text-sm font-medium text-primary-400 flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Instant Issuance
            </div>
            <p class="text-xs text-surface-400 leading-relaxed">
              Virtual cards are generated instantly and can be used for online purchases immediately after creation.
            </p>
          </div>
          <div class="pt-4 flex gap-3">
            <button type="button" @click="isModalOpen = false" class="flex-1 px-4 py-2 border border-surface-700 hover:bg-surface-800 text-white rounded-xl transition-colors font-medium text-sm">Cancel</button>
            <button type="submit" :disabled="isSubmitting" class="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-500 disabled:opacity-50 text-white rounded-xl shadow-glow transition-colors font-medium text-sm">
              {{ isSubmitting ? 'Issuing...' : 'Issue Card' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { cardService } from '../services/cardService'

const cards = ref([])
const selectedCard = ref(null)
const isLoading = ref(true)
const isModalOpen = ref(false)
const isSubmitting = ref(false)

const form = ref({
  cardholder_name: '',
  card_type: 'Virtual',
  card_network: 'Visa'
})

onMounted(() => {
  fetchCards()
})

async function fetchCards() {
  isLoading.value = true
  try {
    cards.value = await cardService.getCards()
    if (cards.value.length > 0 && !selectedCard.value) {
      selectedCard.value = cards.value[0]
    }
  } catch (error) {
    console.error('Failed to load cards')
  } finally {
    isLoading.value = false
  }
}

async function submitCard() {
  isSubmitting.value = true
  try {
    // Generate dummy random card details for the creation payload
    // In a real app, the backend payment provider generates these
    const newCard = await cardService.issueCard({
      ...form.value,
      last_four: Math.floor(1000 + Math.random() * 9000).toString(),
      expiry: `12/${new Date().getFullYear() + 4 - 2000}` // 4 years from now
    })
    cards.value.unshift(newCard)
    selectedCard.value = newCard
    isModalOpen.value = false
    form.value = { cardholder_name: '', card_type: 'Virtual', card_network: 'Visa' }
  } catch (error) {
    alert('Failed to issue card')
  } finally {
    isSubmitting.value = false
  }
}

async function toggleCardStatus() {
  if (!selectedCard.value) return
  
  const newStatus = selectedCard.value.status === 'active' ? 'frozen' : 'active'
  try {
    const updated = await cardService.updateCardStatus(selectedCard.value.id, newStatus)
    selectedCard.value.status = newStatus
    const idx = cards.value.findIndex(c => c.id === selectedCard.value.id)
    if (idx !== -1) cards.value[idx].status = newStatus
  } catch (error) {
    alert('Failed to update card status')
  }
}
</script>
<style>
/* Custom Scrollbar for cards list */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}
.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
}
</style>
