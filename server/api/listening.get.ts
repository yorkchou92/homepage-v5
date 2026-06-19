interface Song {
  id: string
  title: string
  artist: string
  album?: string
  artwork?: string
  playedAt?: string
}

/**
 * Last.fm API Configuration Guide:
 *
 * To use real Last.fm API, you need:
 * 1. Register for a free Last.fm API account at https://www.last.fm/api/account/create
 * 2. Get your API key (no paid subscription required)
 * 3. Set your Last.fm username
 *
 * Environment variables needed in .env.local:
 * - NUXT_PUBLIC_LASTFM_API_KEY: Your Last.fm API key
 * - NUXT_PUBLIC_LASTFM_USERNAME: Your Last.fm username
 *
 * API Endpoint:
 * GET http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks
 *
 * The API provides album artwork in three sizes: small, medium, large
 */

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
    '@attr': {
      user: string
      totalPages: string
      page: string
      total: string
      perPage: string
    }
  }
}

async function getLastFmRecentTracks(
  apiKey: string,
  username: string,
  limit = 20,
): Promise<Song[]> {
  const url = new URL('http://ws.audioscrobbler.com/2.0/')
  url.searchParams.set('method', 'user.getrecenttracks')
  url.searchParams.set('user', username)
  url.searchParams.set('api_key', apiKey)
  url.searchParams.set('format', 'json')
  url.searchParams.set('limit', String(limit))

  const response = await fetch(url.toString(), {
    headers: {
      'User-Agent': 'HomePage/1.0 (https://ykc.im)',
    },
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`Last.fm API error: ${response.status} ${text}`)
  }

  const data: LastFmResponse = await response.json()

  if (!data.recenttracks?.track) {
    return []
  }

  return data.recenttracks.track
    .filter(track => !track['@attr']?.nowplaying) // 过滤掉正在播放的
    .map((track) => {
      // 获取最大尺寸的封面图
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
}

export default defineCachedEventHandler(async (_event) => {
  const config = useRuntimeConfig()

  const apiKey = config.public.lastfmApiKey
  const username = config.public.lastfmUsername

  console.log('[Last.fm API] Config:', { apiKey: apiKey ? '✓' : '✗', username })

  if (!apiKey || !username) {
    console.warn('[Last.fm API] Missing API key or username')
    return []
  }

  try {
    console.log('[Last.fm API] Fetching recent tracks...')
    const songs = await getLastFmRecentTracks(apiKey, username, 15)
    console.log(`[Last.fm API] Fetched ${songs.length} recent tracks`)
    return songs
  }
  catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error('[Last.fm API] Error:', message)
    throw createError({
      statusCode: 500,
      statusMessage: `Last.fm API error: ${message}`,
    })
  }
}, {
  maxAge: 60 * 15, // 15分钟缓存
})
