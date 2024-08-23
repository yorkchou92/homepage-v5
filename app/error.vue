<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps({
    error: Object as () => NuxtError,
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
    <ZSidebar />
    <div class="content">
        <ZHeader />
        <main>
            <div>
                <ZTitle>Error</ZTitle>
                <ZField :label="error?.statusCode?.toString()">
                    <div class="error-message">
                        <pre>{{ error?.message }}</pre>
                    </div>
                    <br>
                    <ZButton @click="handleError">
                        Back to home
                    </ZButton>
                </ZField>
            </div>
        </main>
    </div>
</template>

<style scoped lang="scss">
.z-field {
    overflow: auto;
}
</style>
