<script setup lang="ts">
import { ref } from 'vue'
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot
} from '@headlessui/vue'

const sidebarOpen = ref(false)

const navigation = [
  {
    name: 'Home',
    href: { name: 'dashboard.home' },
    icon: 'far fa-home',
    current: true
  },
  {
    name: 'Products',
    href: { name: 'product.list' },
    icon: 'far fa-list-alt',
    current: false
  },
  {
    name: 'Checkout',
    href: { name: 'checkout.index' },
    icon: 'far fa-cash-register',
    current: false
  },
  {
    name: 'Reports',
    href: { name: 'report.index' },
    icon: 'far fa-file-chart-line',
    current: false
  }
]
</script>

<template>
  <TransitionRoot as="template" :show="sidebarOpen">
    <Dialog
      as="div"
      class="relative z-40 lg:hidden"
      @close="sidebarOpen = false"
    >
      <TransitionChild
        as="template"
        enter="transition-opacity ease-linear duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-600 bg-opacity-75" />
      </TransitionChild>

      <div class="fixed inset-0 z-40 flex">
        <TransitionChild
          as="template"
          enter="transition ease-in-out duration-300 transform"
          enter-from="-translate-x-full"
          enter-to="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leave-from="translate-x-0"
          leave-to="-translate-x-full"
        >
          <DialogPanel
            class="relative flex w-full max-w-xs flex-1 flex-col bg-magenta pt-5 pb-4"
          >
            <TransitionChild
              as="template"
              enter="ease-in-out duration-300"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="ease-in-out duration-300"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <div class="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  class="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  @click="sidebarOpen = false"
                >
                  <span class="sr-only">Close sidebar</span>
                  <!-- <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" /> -->
                  XMarkIcon
                </button>
              </div>
            </TransitionChild>
            <div class="flex flex-shrink-0 items-center px-4">
              <img
                class="h-8 w-auto"
                src="@/assets/images/logo.png"
                alt="Easywire logo"
              />
            </div>
            <nav
              class="mt-5 h-full flex-shrink-0 divide-y divide-cyan-800 overflow-y-auto"
              aria-label="Sidebar"
            >
              <div class="space-y-1 px-2">
                <router-link
                  v-for="item in navigation"
                  :key="item.name"
                  :to="item.href"
                  :class="[
                    item.current
                      ? 'bg-cyan-800 text-white'
                      : 'hover:magenta-soft text-white hover:text-white',
                    'group flex items-center rounded-md px-2 py-2 text-base font-medium'
                  ]"
                  :aria-current="item.current ? 'page' : undefined"
                >
                  <i
                    :class="item.icon"
                    class="mr-4 flex-shrink-0 text-cyan-200"
                    aria-hidden="true"
                  ></i>
                  {{ item.name }}
                </router-link>
              </div>
            </nav>
          </DialogPanel>
        </TransitionChild>
        <div class="w-14 flex-shrink-0" aria-hidden="true">
          <!-- Dummy element to force sidebar to shrink to fit close icon -->
        </div>
      </div>
    </Dialog>
  </TransitionRoot>

  <!-- Static sidebar for desktop -->
  <div class="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
    <!-- Sidebar component, swap this element with another sidebar if you like -->
    <div class="flex flex-grow flex-col overflow-y-auto bg-magenta pt-5 pb-4">
      <div class="flex flex-shrink-0 items-center px-4">
        <img
          class="h-8 w-auto"
          src="@/assets/images/logo.png"
          alt="Easywire logo"
        />
      </div>
      <nav
        class="mt-5 flex flex-1 flex-col divide-y divide-magenta-soft overflow-y-auto"
        aria-label="Sidebar"
      >
        <div class="space-y-1 px-2">
          <router-link
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            :class="[
              item.current
                ? 'bg-cyan-800 text-white'
                : 'text-white hover:bg-magenta-soft hover:text-white',
              'group flex items-center rounded-md px-2 py-2 text-sm font-medium leading-6'
            ]"
            :aria-current="item.current ? 'page' : undefined"
          >
            <i
              :class="item.icon"
              class="mr-4 flex-shrink-0 text-cyan-200"
              aria-hidden="true"
            />
            {{ item.name }}
          </router-link>
        </div>
      </nav>
    </div>
  </div>
</template>
