<template>
  <form class="px-4 sm:px-6 lg:px-8">
    <div class="mt-10 pt-10">
      <h2 class="text-lg font-medium text-gray-900">Product information</h2>
      <div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
        <div>
          <label for="first-name" class="form-label">Name</label>
          <div class="mt-1">
            <input
              id="name"
              type="text"
              name="name"
              autocomplete="name"
              class="form-control"
            />
          </div>
        </div>

        <div>
          <label for="first-name" class="form-label">Price Unity</label>
          <div class="mt-1">
            <input
              id="name"
              type="text"
              name="name"
              autocomplete="name"
              class="form-control"
            />
          </div>
        </div>

        <div>
          <label for="last-name" class="form-label">Price</label>
          <div class="mt-1">
            <input
              id="price"
              type="text"
              name="price"
              autocomplete="price"
              class="form-control"
            />
          </div>
        </div>

        <div>
          <label for="last-name" class="form-label">Suggested price</label>
          <div class="mt-1">
            <input
              id="price"
              type="text"
              name="price"
              autocomplete="price"
              class="form-control"
            />
          </div>
        </div>

        <div>
          <label for="city" class="form-label">Quantity</label>
          <div class="mt-1">
            <input
              id="city"
              type="text"
              name="city"
              autocomplete="address-level2"
              class="form-control"
            />
          </div>
        </div>

        <div>
          <label for="country" class="form-label">Categories</label>
          <div class="mt-1">
            <select
              id="country"
              name="country"
              autocomplete="country-name"
              class="form-control"
            >
              <option>United States</option>
              <option>Canada</option>
              <option>Mexico</option>
            </select>
          </div>
        </div>

        <div>
          <label for="region" class="form-label">Code</label>
          <div class="mt-1">
            <input
              id="region"
              type="text"
              name="region"
              autocomplete="address-level1"
              class="form-control"
            />
          </div>
        </div>

        <div>
          <label for="postal-code" class="form-label">Bar code</label>
          <div class="mt-1">
            <input
              id="postal-code"
              type="text"
              name="postal-code"
              autocomplete="postal-code"
              class="form-control"
            />
          </div>
        </div>

        <div class="sm:col-span-2">
          <label for="phone" class="form-label">Description</label>
          <div class="mt-1">
            <textarea
              id="about"
              name="about"
              rows="3"
              class="form-control"
            ></textarea>
          </div>
          <p class="mt-2 text-sm text-gray-500">
            Write a few sentences about yourself.
          </p>
        </div>
      </div>
    </div>
  </form>
</template>
