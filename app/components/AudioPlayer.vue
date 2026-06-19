<script setup lang="ts">
const audioPlayerStore = useAudioPlayerStore()
const audioElement = ref<HTMLAudioElement | null>(null)
const currentTime = ref(0)
const duration = ref(0)

const audioSrc = '/music/when we were young.mp3'

const updateTime = () => {
  if (audioElement.value) {
    currentTime.value = audioElement.value.currentTime
    duration.value = audioElement.value.duration || 0
  }
}

const formatTime = (seconds: number) => {
  if (isNaN(seconds)) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

onMounted(() => {
  if (audioElement.value) {
    audioPlayerStore.setAudioElement(audioElement.value)
    audioElement.value.addEventListener('timeupdate', updateTime)
    audioElement.value.addEventListener('loadedmetadata', updateTime)
  }
})

onUnmounted(() => {
  if (audioElement.value) {
    audioElement.value.removeEventListener('timeupdate', updateTime)
    audioElement.value.removeEventListener('loadedmetadata', updateTime)
  }
})
</script>

<template>
  <div>
    <audio
      ref="audioElement"
      :src="audioSrc"
      @ended="audioPlayerStore.isPlaying = false"
    />

    <Transition name="slide-up">
      <div v-if="audioPlayerStore.isVisible" class="audio-player" :class="{ minimized: audioPlayerStore.isMinimized }">
        <div v-if="!audioPlayerStore.isMinimized" class="player-content">
          <div class="song-info">
            <div class="song-title">When We Were Young</div>
            <div class="song-artist">Adele</div>
          </div>

          <div class="controls">
            <button class="play-button" @click="audioPlayerStore.togglePlay">
              <Icon v-if="!audioPlayerStore.isPlaying" name="ph:play-fill" />
              <Icon v-else name="ph:pause-fill" />
            </button>

            <div class="time-info">
              <span class="time">{{ formatTime(currentTime) }}</span>
              <span class="separator">/</span>
              <span class="time">{{ formatTime(duration) }}</span>
            </div>
          </div>

          <button class="close-button" @click="audioPlayerStore.close">
            <Icon name="ph:x" />
          </button>
        </div>

        <div v-if="!audioPlayerStore.isMinimized" class="progress-bar">
          <div
            class="progress-fill"
            :style="{ width: duration > 0 ? `${(currentTime / duration) * 100}%` : '0%' }"
          />
        </div>

        <!-- Minimized mode: only show pause button -->
        <div v-if="audioPlayerStore.isMinimized" class="mini-player">
          <button class="mini-button" @click="audioPlayerStore.pause">
            <Icon name="ph:pause-fill" />
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.audio-player {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 320px;
  background: var(--c-bg-2);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  z-index: 1000;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &.minimized {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }
}

.player-content {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
}

.song-info {
  flex: 1;
  min-width: 0;
}

.song-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--c-text-1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.song-artist {
  font-size: 12px;
  color: var(--c-text-3);
  margin-top: 2px;
}

.controls {
  display: flex;
  align-items: center;
  gap: 12px;
}

.play-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: transparent;
  color: var(--c-text-1);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: var(--c-bg-3);
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }

  .iconify {
    font-size: 18px;
  }
}

.time-info {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: var(--c-text-2);

  .separator {
    color: var(--c-text-3);
  }
}

.close-button {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  background: transparent;
  color: var(--c-text-3);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: var(--c-bg-3);
    color: var(--c-text-1);
  }

  .iconify {
    font-size: 18px;
  }
}

.progress-bar {
  height: 3px;
  background: var(--c-bg);
  position: relative;
}

.progress-fill {
  height: 100%;
  background: var(--c-primary);
  transition: width 0.1s linear;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from {
  transform: translateY(100px);
  opacity: 0;
}

.slide-up-leave-to {
  transform: translateY(100px);
  opacity: 0;
}

.mini-player {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 8px;
}

.mini-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: transparent;
  color: var(--c-text-1);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: var(--c-bg-3);
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }

  .iconify {
    font-size: 20px;
  }
}

@media (max-width: 768px) {
  .audio-player {
    bottom: 10px;
    right: 10px;
    left: 10px;
    width: auto;

    &.minimized {
      left: auto;
      width: 56px;
      height: 56px;
    }
  }
}
</style>
