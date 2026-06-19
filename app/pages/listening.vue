<script setup lang="ts">
useHead({ title: 'Listening' })
definePageMeta({ headerText: '' })

interface Song {
  id: string
  title: string
  artist: string
  album?: string
  artwork?: string
  playedAt?: string
}

interface LastFmImage {
  '#text': string
  size: 'small' | 'medium' | 'large' | 'extralarge'
}

interface LastFmTrack {
  name: string
  artist: {
    '#text': string
    mbid?: string
  }
  album: {
    '#text': string
    mbid?: string
  }
  image: LastFmImage[]
  date?: {
    uts: string
    '#text': string
  }
  '@attr'?: {
    nowplaying: 'true'
  }
  mbid?: string
  url: string
}

interface LastFmResponse {
  recenttracks: {
    track: LastFmTrack[]
  }
}

const config = useRuntimeConfig()
const songs = ref<Song[]>([])
const pending = ref(true)
const errorMsg = ref('')

async function load() {
  try {
    const apiKey = config.public.lastfmApiKey
    const username = config.public.lastfmUsername

    if (!apiKey || !username) {
      errorMsg.value = 'Last.fm API not configured'
      pending.value = false
      return
    }

    const url = new URL('https://ws.audioscrobbler.com/2.0/')
    url.searchParams.set('method', 'user.getrecenttracks')
    url.searchParams.set('user', username)
    url.searchParams.set('api_key', apiKey)
    url.searchParams.set('format', 'json')
    url.searchParams.set('limit', '15')

    const data = await $fetch<LastFmResponse>(url.toString())

    if (!data.recenttracks?.track) {
      songs.value = []
      return
    }

    songs.value = data.recenttracks.track
      .filter(track => !track['@attr']?.nowplaying)
      .map((track) => {
        const artwork = track.image.find(img => img.size === 'large' || img.size === 'extralarge')?.['#text']
          || track.image.find(img => img.size === 'medium')?.['#text']
          || ''

        return {
          id: track.mbid || `${track.artist['#text']}-${track.name}-${track.date?.uts || Date.now()}`,
          title: track.name,
          artist: track.artist['#text'],
          album: track.album['#text'] || undefined,
          artwork: artwork || undefined,
          playedAt: track.date?.uts ? new Date(Number(track.date.uts) * 1000).toISOString() : undefined,
        }
      })

    errorMsg.value = ''
  }
  catch (e) {
    errorMsg.value = e instanceof Error ? e.message : String(e)
  }
  finally {
    pending.value = false
  }
}

// Client-only fetch + polling, so the page stays real-time even when statically generated.
let timer: ReturnType<typeof setInterval> | undefined
onMounted(() => {
  load()
  timer = setInterval(load, 60000) // 每60秒刷新一次
})
onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})

function formatPlayTime(playedAt?: string): string {
  if (!playedAt) return ''

  const date = new Date(playedAt)
  const now = new Date()
  const diff = now.getTime() - date.getTime()

  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  return `${days}d ago`
}
</script>

<template>
  <ZTitle>
    <span class="badge-text">Listening</span>
  </ZTitle>

  <template v-if="pending">
    <p class="loading-text">Loading recently played songs...</p>
  </template>
  <template v-else-if="errorMsg">
    <p class="error-text">{{ errorMsg }}</p>
  </template>
  <div v-else class="songs-grid">
    <div
      v-for="song in songs"
      :key="song.id"
      class="song-card"
    >
      <div v-if="song.artwork" class="artwork-wrapper">
        <img
          :src="song.artwork"
          :alt="song.title"
          class="artwork"
        />
      </div>
      <div class="song-info">
        <h3 class="song-title">{{ song.title }}</h3>
        <p class="song-artist">{{ song.artist }}</p>
        <span v-if="song.playedAt" class="play-time">{{ formatPlayTime(song.playedAt) }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.loading-text,
.error-text {
  margin-top: 20px;
  font-size: 14px;
  color: var(--c-text-2);
}

.error-text {
  color: #ef4444;
}

.songs-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  margin-top: 20px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
}

.song-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: var(--c-bg-2);
  border-radius: 12px;
  transition: all 0.3s ease;

  &:hover {
    background: var(--c-bg-3);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .artwork-wrapper {
    flex-shrink: 0;
    width: 80px;
    height: 80px;
    overflow: hidden;
    background: var(--c-bg);
    border-radius: 8px;

    .artwork {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }

  .song-info {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .song-title {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    color: var(--c-text-1);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .song-artist {
    margin: 0;
    font-size: 14px;
    color: var(--c-text-2);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .play-time {
    font-size: 12px;
    color: var(--c-text-3);
  }
}

@media (max-width: 768px) {
  .song-card {
    padding: 12px;
    gap: 12px;

    .artwork-wrapper {
      width: 50px;
      height: 50px;
      border-radius: 6px;
    }

    .song-title {
      font-size: 14px;
    }

    .song-artist {
      font-size: 12px;
    }

    .play-time {
      font-size: 11px;
    }
  }
}
</style>
