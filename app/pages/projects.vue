<script setup lang="ts">
useHead({ title: 'Projects' })
definePageMeta({ headerText: '' })

interface Project {
  name: string
  description: string
  tag: string
  link: string
}

const projects: Project[] = [
  {
    name: 'Hello World',
    description: 'My Blog - Powered by Typecho. Mainly about network technology and application.',
    tag: 'Life',
    link: 'https://yorkchou.com'
  },
  {
    name: 'Gallery',
    description: 'My Gallery - Powered by ImageVue X3.',
    tag: 'Life',
    link: 'https://gallery.gy'
  },
  {
    name: 'HisLife',
    description: 'A life blog - Powered by WordPress.',
    tag: 'Life',
    link: 'https://hislife.in'
  },
  {
    name: 'York Chou',
    description: 'My Personal Page.',
    tag: 'Life',
    link: 'https://ykc.im'
  },
  {
    name: 'YK.CI',
    description: 'About Me.',
    tag: 'Life',
    link: 'https://yk.ci'
  },
  {
    name: 'PJ.AX',
    description: 'CDN for pjax.',
    tag: 'Service',
    link: 'https://pj.ax'
  },
  {
    name: 'iBiB',
    description: 'A Burn After Reading service.',
    tag: 'Service',
    link: 'https://ibib.bid'
  },
  {
    name: 'DOT',
    description: 'Personal Collection.',
    tag: 'Service',
    link: 'https://dot.tg'
  },
  {
    name: 'Opage',
    description: 'Homepage based on Material Design & Vue.js.',
    tag: 'Service',
    link: 'https://ko.mk'
  },
  {
    name: 'Network',
    description: 'A Self-Hosted Proxy Service.',
    tag: 'Network',
    link: 'https://yorkchou.network'
  },
  {
    name: 'Uptime',
    description: 'Uptime Monitor - Powered by UptimeRobot.',
    tag: 'Network',
    link: 'https://uptime.yorkchou.network'
  },
  {
    name: 'Dash',
    description: 'Nezha Dashboard - Powered by Komari&Vercel.',
    tag: 'Network',
    link: 'https://dash.st'
  },
  {
    name: 'Probe',
    description: 'Powered by Komari.',
    tag: 'Network',
    link: 'https://probe.icu'
  },
  {
    name: 'Detect Media',
    description: 'Media Unlock Status Monitor.',
    tag: 'Network',
    link: 'https://detect.media/public-dashboards/cd56868aa2864b5a808189c5dd5ce23d'
  },
  {
    name: 'VPS AD',
    description: 'Taking affiliate kickbacks while pretending to review VPS providers.',
    tag: 'Experimental',
    link: 'https://vps.ad'
  },
  {
    name: 'Root',
    description: 'Haven\'t decided what to do with this site yet, so here\'s a cool-looking page for now.',
    tag: 'Experimental',
    link: 'https://root.al'
  },
  {
    name: 'Polaroid',
    description: 'Infuse your photos with the essence of the past.',
    tag: 'Experimental',
    link: 'https://p.olaro.id'
  },
  {
    name: 'INSTAX',
    description: 'Generate and print instax photos.',
    tag: 'Experimental',
    link: 'https://inst.ax'
  },
  {
    name: 'IX',
    description: 'Information Exchange - A mastodon instance.',
    tag: 'Experimental',
    link: 'https://ix.md'
  },
  {
    name: 'Last Pill',
    description: 'Take the pill.',
    tag: 'Experimental',
    link: 'https://lastpill.com'
  }
]
</script>

<template>
  <ZTitle>
    <span class="badge-text">Projects</span>
  </ZTitle>

  <div class="projects-grid">
    <a
      v-for="project in projects"
      :key="project.name"
      :href="project.link"
      target="_blank"
      rel="noopener noreferrer"
      class="project-card"
    >
      <div class="card-content">
        <div class="card-main">
          <div class="title-row">
            <h3 class="project-name">{{ project.name }}</h3>
            <span class="project-link">{{ project.link }}</span>
          </div>
          <p class="project-description">{{ project.description }}</p>
        </div>
        <div class="project-tag">{{ project.tag }}</div>
      </div>
    </a>
  </div>
</template>

<style scoped lang="scss">
.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-top: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.project-card {
  display: block;
  padding: 20px;
  background: var(--c-bg-2);
  border-radius: 12px;
  transition: all 0.3s ease;
  text-decoration: none;
  color: inherit;

  &:hover {
    background: var(--c-bg-3);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .card-content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 16px;
  }

  .card-main {
    flex: 1;
  }

  .title-row {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 8px;
  }

  .project-name {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: var(--c-text-1);
  }

  .project-link {
    font-size: 12px;
    color: var(--c-text-3);
  }

  .project-description {
    margin: 0;
    font-size: 14px;
    line-height: 1.6;
    color: var(--c-text-2);
  }

  .project-tag {
    flex-shrink: 0;
    font-size: 12px;
    color: var(--c-text-3);
    padding: 4px 8px;
    background: var(--c-bg);
    border-radius: 4px;
  }
}
</style>
