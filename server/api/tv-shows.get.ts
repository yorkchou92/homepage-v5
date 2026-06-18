import type { TVShow } from '~/types/tv-show'

interface TraktShow {
  show: {
    ids: {
      trakt: number
      slug: string
      tvdb: number
      imdb: string
      tmdb: number
    }
    title: string
    year: number
    overview: string
  }
}

interface TMDBShow {
  id: number
  name: string
  overview: string
  poster_path: string
}

async function getTraktWatching(clientId: string, username: string): Promise<TraktShow[]> {
  const resp = await fetch(`https://api.trakt.tv/users/${username}/watchlist/shows?extended=full`, {
    headers: {
      'trakt-api-version': '2',
      'trakt-api-key': clientId,
      'User-Agent': 'HomePage/1.0 (https://ykc.im)',
    },
  })

  console.log('[Trakt API] Status:', resp.status)

  if (!resp.ok) {
    const text = await resp.text()
    console.error('[Trakt API] Error response:', text)
    throw new Error(`Trakt API returned ${resp.status}: ${text}`)
  }

  const data = await resp.json()
  console.log('[Trakt API] Got', Array.isArray(data) ? data.length : 'non-array', 'shows')
  return data
}

async function getTMDBShowDetails(tmdbId: number, apiKey: string): Promise<TMDBShow> {
  const resp = await fetch(
    `https://api.themoviedb.org/3/tv/${tmdbId}?api_key=${apiKey}&language=zh-CN`,
  )

  if (!resp.ok) {
    throw new Error(`TMDB API error: ${resp.statusText}`)
  }

  return resp.json()
}

export default defineCachedEventHandler(async (_event) => {
  const config = useRuntimeConfig()

  const clientId = config.public.traktClientId
  const tmdbKey = config.tmdbApiKey

  if (!clientId) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Missing NUXT_PUBLIC_TRAKT_CLIENT_ID environment variable',
    })
  }

  if (!tmdbKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Missing NUXT_TMDB_API_KEY environment variable',
    })
  }

  try {
    const traktShows = await getTraktWatching(clientId, 'yorkchou')

    if (!Array.isArray(traktShows) || traktShows.length === 0) {
      console.log('[TV Shows API] No shows found in watchlist')
      return []
    }

    const tvShows: TVShow[] = await Promise.all(
      traktShows.slice(0, 12).map(async (item) => {
        const tmdbId = item.show.ids.tmdb
        const tmdbDetails = await getTMDBShowDetails(tmdbId, tmdbKey)

        return {
          id: String(item.show.ids.trakt),
          title: tmdbDetails.name,
          poster: tmdbDetails.poster_path
            ? `https://image.tmdb.org/t/p/w342${tmdbDetails.poster_path}`
            : '',
          description: tmdbDetails.overview,
          tmdbId,
        }
      }),
    )

    return tvShows
  }
  catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error('[TV Shows API] Error:', message)
    throw createError({
      statusCode: 500,
      statusMessage: `TV Shows API error: ${message}`,
    })
  }
}, {
  maxAge: 60 * 60 * 6,
})

