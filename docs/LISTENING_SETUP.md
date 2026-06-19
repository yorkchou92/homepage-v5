# Listening Page - Last.fm Integration Guide

## Overview
The Listening page displays your recently played songs from Last.fm with album artwork, song titles, artists, and play times.

## Setup Instructions

### 1. Get Last.fm API Credentials

1. Go to https://www.last.fm/api/account/create
2. Fill in the application details:
   - **Application name**: Your website name (e.g., "YKC Homepage")
   - **Application description**: Brief description
   - **Callback URL**: Your website URL (e.g., https://ykc.im)
3. Submit the form and you'll receive:
   - **API Key** (required)
   - **Shared Secret** (not needed for read-only access)

### 2. Configure Environment Variables

Edit `.env.local` and update these values:

```env
# Last.fm API Configuration
NUXT_PUBLIC_LASTFM_API_KEY=your_actual_api_key_here
NUXT_PUBLIC_LASTFM_USERNAME=your_lastfm_username
```

Replace:
- `your_actual_api_key_here` with your API key from step 1
- `your_lastfm_username` with your Last.fm username

### 3. Test the Integration

1. Restart your dev server:
   ```bash
   npm run dev
   ```

2. Visit http://localhost:3000/listening

3. You should see your recently played tracks with:
   - Album artwork (if available)
   - Song title
   - Artist name
   - Relative play time (e.g., "30m ago", "2h ago")

## Features

- **Album Artwork**: Displays large/medium size album covers from Last.fm
- **Responsive Grid**: Auto-adjusts columns based on screen size
- **Hover Effects**: Cards lift on hover with smooth transitions
- **Time Formatting**: Shows when each song was played in relative time
- **Caching**: API responses are cached for 15 minutes
- **Error Handling**: Graceful fallback if API is unavailable

## API Details

- **Endpoint**: `user.getrecenttracks`
- **Data Source**: Last.fm API
- **Rate Limit**: Reasonable usage (avoid excessive calls)
- **Cache Duration**: 15 minutes
- **Max Tracks**: 20 most recent

## Troubleshooting

### No songs showing up?
- Check that you've set the correct Last.fm username
- Verify your API key is correct
- Make sure you have scrobbled some tracks recently
- Check browser console for error messages

### Images not loading?
- Last.fm provides artwork when available from their database
- Some tracks may not have artwork (especially rare/indie music)
- Cards without artwork will show text-only

### API errors?
- Check that your API key is valid and active
- Ensure your Last.fm username is spelled correctly
- Last.fm API is free but requires reasonable usage

## Notes

- Last.fm API is completely free (no paid subscription required)
- Much easier to set up compared to Apple Music API
- Requires you to use Last.fm for scrobbling your music
- Works with any music player that supports Last.fm scrobbling
