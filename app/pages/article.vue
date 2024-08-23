<script setup lang="ts">
useHead({ title: 'Writings' })
definePageMeta({ headerText: '' })

const { data, error, status } = useLazyFetch('/api/feed/blog')

const articles = computed(() => data.value.slice(0, 11))
</script>

<template>
    <ZTitle icon="👀">
        <span class="badge-text">Read more at my blog
            <ZRawLink to="https://yorkchou.com/"><mark>Hello World</mark></ZRawLink>
        </span>
    </ZTitle>

    <template v-if="status === 'pending'">
        <p>加载中…</p>
    </template>
    <template v-else-if="status === 'error'">
        <p>{{ error }}</p>
    </template>
    <div v-else class="article-list">
        <ZArticle v-for="article in articles" :key="article.id" v-bind="article" />
    </div>
</template>

<style scoped lang="scss">
.article-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 8px;
}

.article-more {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin: 16px 0;
    font-size: min(2rem, 6vw);
    font-weight: bold;

    a {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        opacity: 0.2;
        padding: 0.3em 0.5em;
        border-radius: 8px;
        transition: all 0.2s;

        &:hover {
            opacity: 1;
            background-color: var(--c-primary-soft);
            color: var(--c-primary-1);
        }
    }
}
</style>
