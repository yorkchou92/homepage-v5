export const useAudioPlayerStore = defineStore('audioPlayer', () => {
  const isPlaying = ref(false)
  const isVisible = ref(false)
  const audioElement = ref<HTMLAudioElement | null>(null)

  const play = async () => {
    if (audioElement.value) {
      isVisible.value = true
      try {
        await audioElement.value.play()
        isPlaying.value = true
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
  }

  const setAudioElement = (el: HTMLAudioElement | null) => {
    audioElement.value = el
  }

  return {
    isPlaying,
    isVisible,
    audioElement,
    play,
    pause,
    togglePlay,
    close,
    setAudioElement
  }
})
