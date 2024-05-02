<template>
    <main id="content" role="main" class="main">
              <!-- Content -->
      <div class="content container-fluid">
        <!-- Page Header -->
            <div class="card">
                <JsonEditorVue
                v-model="jsonObject"
                :options="{
                    mode: 'tree',
                    modes: ['tree', 'code', 'form', 'text'],
                    onError: handleJsonError,
                }"
                ></JsonEditorVue>
            </div>
      </div>
      </main>
  </template>
  
<script>

export default {
  data() {
    return {
      jsonObject: {}, // Store the JSON object
    };
  },
  methods: {
    handleJsonError(err) {
      console.error('JSON editor error:', err);
    },
  },
};
</script>

<style>
/* Add any custom styles for the JSON editor here */
</style>