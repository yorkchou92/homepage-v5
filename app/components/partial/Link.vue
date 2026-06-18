<script setup lang="ts">
defineProps<{
  to?: string
  noColor?: boolean
}>()
</script>

<template>
    <ZRawLink class="z-link" :class="{ 'no-color': noColor }" :to="to">
        <slot />
    </ZRawLink>
  <Icon v-if="isExtLink(to)" class="external" name="ph:arrow-up-right" />
</template>

<style scoped lang="scss">
.z-link {
    background: linear-gradient(var(--c-primary-3), var(--c-primary-3)) no-repeat center bottom / 100% 0.1em;
    color: var(--c-primary-1);
    transition: background-size 0.2s;

    &:hover {
        border-radius: 0.3em;
        background-size: 100% 100%;
    }

    &.no-color {
        color: inherit;
    }
}

.iconify.external {
    font-size: 0.8em;
    vertical-align: text-top;
    color: var(--c-primary-2);
}
</style>
