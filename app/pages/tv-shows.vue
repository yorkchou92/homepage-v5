<script setup lang="ts">
import type { TVShow } from '~/types/tv-show'

useHead({ title: 'TV Shows' })
definePageMeta({ headerText: '' })

const { data, error, status } = useLazyFetch<TVShow[]>('/api/tv-shows')
</script>

<template>
  <ZTitle>
    <span class="badge-text">Currently Watching</span>
  </ZTitle>

  <template v-if="status === 'pending'">
    <p>加载中…</p>
  </template>
  <template v-else-if="status === 'error'">
    <p>{{ error }}</p>
  </template>
  <div v-else class="shows-grid">
    <div v-for="show in data" :key="show.id" class="show-card">
      <div class="poster">
        <img v-if="show.poster" :src="show.poster" :alt="show.title" />
        <div v-else class="no-poster">No Image</div>
      </div>
      <div class="content">
        <h3>{{ show.title }}</h3>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.shows-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 16px;
}

.show-card {
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;
  background: var(--c-bg-soft);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }

  .poster {
    width: 100%;
    aspect-ratio: 2 / 3;
    overflow: hidden;
    background: var(--c-bg-mute);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .no-poster {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      color: var(--c-text-3);
      font-size: 12px;
    }
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 8px;

    h3 {
      margin: 0;
      font-size: 13px;
      font-weight: 600;
      line-height: 1.3;
      color: var(--c-text-1);
    }

    .description {
      margin: 0;
      font-size: 13px;
      line-height: 1.5;
      color: var(--c-text-2);
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
}
</style>
