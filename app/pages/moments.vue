<script setup lang="ts">
useHead({ title: 'Moments' })
definePageMeta({ headerText: '' })

interface Moment {
  image: string
  text: string
  date?: string
}

const moments: Moment[] = [
  {
    image: '/moments/Christmas-2025.jpeg',
    text: 'Christmas 2025 - The warmth of the season captured in a single frame.',
    date: '2025'
  },
  {
    image: '/moments/Zoe-2-yrs-old.jpeg',
    text: 'Zoe turns two - Time flies, and little moments become precious memories.',
    date: '2023'
  },
  {
    image: '/moments/Zoe-first-fp-100c.jpeg',
    text: 'Zoe\'s first FP-100C portrait - Instant film magic meets childhood wonder.',
    date: '2026'
  },
  {
    image: '/moments/busan.jpeg',
    text: 'Busan - Where the ocean meets the sky, and worries drift away.',
    date: '2016'
  },
  {
    image: '/moments/jeju.jpeg',
    text: 'One day in Jeju - Sometimes the best moments are the unplanned ones.',
    date: '2017'
  },
  {
    image: '/moments/my-classmates.jpeg',
    text: 'My classmates - Friendships that transcend time and distance.',
    date: '2015'
  },
  {
    image: '/moments/my-first-fp-100.jpeg',
    text: 'My first FP-100 shot - Every photographer remembers their first instant film.',
    date: '2015'
  },
  {
    image: '/moments/new-home.jpeg',
    text: 'New home, new beginnings - A place where memories will be made.',
    date: '2026'
  },
  {
    image: '/moments/park.jpeg',
    text: 'A day at the park - Simple pleasures in the everyday.',
    date: '2016'
  },
  {
    image: '/moments/polaroid-bw.jpeg',
    text: 'Black and white Polaroid - Some moments are timeless.',
    date: '2018'
  },
  {
    image: '/moments/taotao.jpeg',
    text: 'Taotao - My lovely nephew.',
    date: '2018'
  }
]

// Get a random moment
const currentMoment = ref<Moment | null>(null)

const getRandomMoment = () => {
  const randomIndex = Math.floor(Math.random() * moments.length)
  currentMoment.value = moments[randomIndex]
}

// Show a random moment on mount
onMounted(() => {
  getRandomMoment()
})
</script>

<template>
  <ZTitle>
    <span class="badge-text">Moments</span>
  </ZTitle>

  <div v-if="currentMoment" class="moment-container">
    <div class="moment-card">
      <div class="image-wrapper">
        <img
          :src="currentMoment.image"
          :alt="currentMoment.text"
          class="moment-image"
        />
      </div>
      <div class="moment-content">
        <p class="moment-text">{{ currentMoment.text }}</p>
        <span v-if="currentMoment.date" class="moment-date">{{ currentMoment.date }}</span>
      </div>
    </div>

    <button @click="getRandomMoment" class="refresh-button">
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
      </svg>
      Another Moment
    </button>
  </div>
</template>

<style scoped lang="scss">
.moment-container {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.moment-card {
  width: 100%;
  max-width: 600px;
  background: var(--c-bg-2);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.image-wrapper {
  width: 100%;
  aspect-ratio: 3/2;
  overflow: hidden;
  background: var(--c-bg);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
}

.moment-content {
  padding: 24px;
}

.moment-text {
  margin: 0 0 12px 0;
  font-size: 16px;
  line-height: 1.6;
  color: var(--c-text-1);
}

.moment-date {
  font-size: 13px;
  color: var(--c-text-3);
  font-style: italic;
}

.refresh-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: var(--c-bg-2);
  border: none;
  border-radius: 8px;
  color: var(--c-text-1);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: var(--c-bg-3);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: rotate(180deg);
  }
}

@media (max-width: 768px) {
  .moment-card {
    border-radius: 12px;
  }

  .image-wrapper {
    aspect-ratio: 3/4;
  }

  .moment-content {
    padding: 20px;
  }

  .moment-text {
    font-size: 15px;
  }
}
</style>
