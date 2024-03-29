<script setup lang="ts">
const transactions = [
  {
    id: 1,
    name: 'Payment to Molly Sanders',
    href: '#',
    amount: '$20,000',
    currency: 'USD',
    status: 'success',
    date: 'July 11, 2020',
    datetime: '2020-07-11'
  }
  // More transactions...
]

const statusStyles = {
  success: 'bg-green-100 text-green-800',
  processing: 'bg-yellow-100 text-yellow-800',
  failed: 'bg-gray-100 text-gray-800'
}
</script>

<template>
  <!-- Activity list (smallest breakpoint only) -->
  <div class="shadow sm:hidden">
    <ul
      role="list"
      class="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden"
    >
      <li v-for="transaction in transactions" :key="transaction.id">
        <a
          :href="transaction.href"
          class="block bg-white px-4 py-4 hover:bg-gray-50"
        >
          <span class="flex items-center space-x-4">
            <span class="flex flex-1 space-x-2 truncate">
              <!-- <BanknotesIcon class="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" /> -->
              BanknotesIcon
              <span class="flex flex-col truncate text-sm text-gray-500">
                <span class="truncate">{{ transaction.name }}</span>
                <span
                  ><span class="font-medium text-gray-900">{{
                    transaction.amount
                  }}</span>
                  {{ transaction.currency }}</span
                >
                <time :datetime="transaction.datetime">{{
                  transaction.date
                }}</time>
              </span>
            </span>
            <!-- <ChevronRightIcon class="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" /> -->
            ChevronRightIcon
          </span>
        </a>
      </li>
    </ul>

    <nav
      class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3"
      aria-label="Pagination"
    >
      <div class="flex flex-1 justify-between">
        <a
          href="#"
          class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
          >Previous</a
        >
        <a
          href="#"
          class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
          >Next</a
        >
      </div>
    </nav>
  </div>

  <!-- Activity table (small breakpoint and up) -->
  <div class="hidden sm:block">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div class="mt-2 flex flex-col">
        <div
          class="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg"
        >
          <table class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th
                  class="bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                  scope="col"
                >
                  Transaction
                </th>
                <th
                  class="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900"
                  scope="col"
                >
                  Amount
                </th>
                <th
                  class="hidden bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900 md:block"
                  scope="col"
                >
                  Status
                </th>
                <th
                  class="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900"
                  scope="col"
                >
                  Date
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <tr
                v-for="transaction in transactions"
                :key="transaction.id"
                class="bg-white"
              >
                <td
                  class="w-full max-w-0 whitespace-nowrap px-6 py-4 text-sm text-gray-900"
                >
                  <div class="flex">
                    <a
                      :href="transaction.href"
                      class="group inline-flex space-x-2 truncate text-sm"
                    >
                      <!-- <BanknotesIcon class="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" aria-hidden="true" /> -->
                      BanknotesIcon
                      <p
                        class="truncate text-gray-500 group-hover:text-gray-900"
                      >
                        {{ transaction.name }}
                      </p>
                    </a>
                  </div>
                </td>
                <td
                  class="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500"
                >
                  <span class="font-medium text-gray-900">{{
                    transaction.amount
                  }}</span>
                  {{ transaction.currency }}
                </td>
                <td
                  class="hidden whitespace-nowrap px-6 py-4 text-sm text-gray-500 md:block"
                >
                  <span
                    :class="[
                      statusStyles[transaction.status],
                      'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize'
                    ]"
                    >{{ transaction.status }}</span
                  >
                </td>
                <td
                  class="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500"
                >
                  <time :datetime="transaction.datetime">{{
                    transaction.date
                  }}</time>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- Pagination -->
          <nav
            class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
            aria-label="Pagination"
          >
            <div class="hidden sm:block">
              <p class="text-sm text-gray-700">
                Showing
                {{ ' ' }}
                <span class="font-medium">1</span>
                {{ ' ' }}
                to
                {{ ' ' }}
                <span class="font-medium">10</span>
                {{ ' ' }}
                of
                {{ ' ' }}
                <span class="font-medium">20</span>
                {{ ' ' }}
                results
              </p>
            </div>
            <div class="flex flex-1 justify-between sm:justify-end">
              <a
                href="#"
                class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >Previous</a
              >
              <a
                href="#"
                class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >Next</a
              >
            </div>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>
