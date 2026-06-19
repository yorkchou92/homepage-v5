export const useAudioPlayerStore = defineStore('audioPlayer', () => {
  const isPlaying = ref(false)
  const isVisible = ref(false)
  const isMinimized = ref(false)
  const audioElement = ref<HTMLAudioElement | null>(null)

  const play = async () => {
    if (audioElement.value) {
      isVisible.value = true
      isMinimized.value = false
      try {
        await audioElement.value.play()
        isPlaying.value = true
        // Auto minimize after 3 seconds
        setTimeout(() => {
          if (isPlaying.value) {
            isMinimized.value = true
          }
        }, 3000)
      } catch (error) {
        console.error('Failed to play audio:', error)
        isPlaying.value = false
      }
    }
  }

  const pause = () => {
    if (audioElement.value) {
      audioElement.value.pause()
      isPlaying.value = false
      isMinimized.value = false
    }
  }

  const togglePlay = () => {
    if (isPlaying.value) {
      pause()
    } else {
      play()
    }
  }

  const close = () => {
    pause()
    if (audioElement.value) {
      audioElement.value.currentTime = 0
    }
    isVisible.value = false
    isMinimized.value = false
  }

  const setAudioElement = (el: HTMLAudioElement | null) => {
    audioElement.value = el
  }

  return {
    isPlaying,
    isVisible,
    isMinimized,
    audioElement,
    play,
    pause,
    togglePlay,
    close,
    setAudioElement
  }
})
