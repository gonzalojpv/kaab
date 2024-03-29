<script setup lang="ts">
import usAuth from '@/composables/auth'
import ProductSearch from '@/components/ProductSearch/index.vue'

import { ref } from 'vue'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { useAccountStore } from '@/stores/account'
import { storeToRefs } from 'pinia'

const account = useAccountStore()

const { getCurrentUser } = storeToRefs(account)
const { onLogout } = usAuth()

const sidebarOpen = ref(false)
</script>

<template>
  <div
    class="flex h-16 flex-shrink-0 border-b border-gray-200 bg-white lg:border-none"
  >
    <button
      type="button"
      class="border-r border-gray-200 px-4 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 lg:hidden"
      @click="sidebarOpen = true"
    >
      <span class="sr-only">Open sidebar</span>
      <!-- <Bars3CenterLeftIcon class="h-6 w-6" aria-hidden="true" /> -->
      Bars3CenterLeftIcon
    </button>
    <!-- Search bar -->
    <div
      class="flex flex-1 justify-between px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8"
    >
      <div class="flex flex-1">
        <ProductSearch />
      </div>
      <div class="ml-4 flex items-center md:ml-6">
        <!-- Profile dropdown -->
        <Menu as="div" class="relative ml-3">
          <div>
            <MenuButton
              class="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 lg:rounded-md lg:p-2 lg:hover:bg-gray-50"
            >
              <img
                class="h-8 w-8 rounded-full"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <span
                v-if="getCurrentUser"
                class="ml-3 hidden text-sm font-medium text-gray-700 lg:block"
                ><span class="sr-only">Open user menu for </span
                >{{ getCurrentUser.name }}</span
              >
              <i class="far fa-chevron-down ml-1"></i>
            </MenuButton>
          </div>
          <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <MenuItems
              class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <MenuItem v-slot="{ active }">
                <router-link
                  :to="{ name: 'dashboard.home' }"
                  :class="[
                    active ? 'bg-gray-100' : '',
                    'block px-4 py-2 text-sm text-gray-700'
                  ]"
                  >Dashboard</router-link
                >
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <a
                  href="#"
                  :class="[
                    active ? 'bg-gray-100' : '',
                    'block px-4 py-2 text-sm text-gray-700'
                  ]"
                  @click.prevent="onLogout"
                  >Logout</a
                >
              </MenuItem>
            </MenuItems>
          </transition>
        </Menu>
      </div>
    </div>
  </div>
</template>
