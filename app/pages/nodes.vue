<script setup lang="ts">
import type { ServerNode } from '~/types/node'

useHead({ title: 'Nodes' })
definePageMeta({ headerText: '' })

const PROBE = 'https://probe.icu'

interface NodesResponse {
  status: string
  message: string
  data: ServerNode[]
}

interface LatestStatus {
  online: boolean
}

interface RpcResponse {
  result: Record<string, LatestStatus>
}

const nodes = ref<ServerNode[]>([])
const statusMap = ref<Record<string, LatestStatus>>({})
const pending = ref(true)
const errorMsg = ref('')

async function load() {
  try {
    const [list, status] = await Promise.all([
      $fetch<NodesResponse>(`${PROBE}/api/nodes`),
      $fetch<RpcResponse>(`${PROBE}/api/rpc2`, {
        method: 'POST',
        body: {
          jsonrpc: '2.0',
          method: 'common:getNodesLatestStatus',
          params: {},
          id: 1,
        },
      }),
    ])

    nodes.value = (list.data || [])
      .filter(node => !node.hidden)
      .sort((a, b) => a.weight - b.weight)
    statusMap.value = status.result || {}
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
  timer = setInterval(load, 15000)
})
onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})

function isOnline(uuid: string): boolean {
  return statusMap.value[uuid]?.online === true
}

function formatBytes(bytes: number): string {
  if (!bytes) return '—'
  const gb = bytes / 1024 ** 3
  if (gb < 1) {
    return `${Math.round(bytes / 1024 ** 2)} MB`
  }
  return `${gb.toFixed(gb < 10 ? 1 : 0)} GB`
}

function shortOS(os: string): string {
  return os.replace(/ GNU\/Linux/, '').replace(/ LTS/, '')
}
</script>

<template>
  <ZTitle>
    <span class="badge-text">Nodes</span>
  </ZTitle>

  <template v-if="pending">
    <p>加载中…</p>
  </template>
  <template v-else-if="errorMsg">
    <p>{{ errorMsg }}</p>
  </template>
  <div v-else class="nodes-grid">
    <div
      v-for="node in nodes"
      :key="node.uuid"
      class="node-card"
    >
      <div class="card-header">
        <div class="title-row">
          <span class="region">{{ node.region }}</span>
          <h3 class="node-name">{{ node.name }}</h3>
        </div>
        <div class="status-group">
          <span
            class="status-dot"
            :class="isOnline(node.uuid) ? 'online' : 'offline'"
            :title="isOnline(node.uuid) ? 'Online' : 'Offline'"
          />
          <span class="node-group">{{ node.group }}</span>
        </div>
      </div>

      <p class="node-cpu">{{ node.cpu_name }}</p>

      <div class="node-specs">
        <span class="spec">
          <Icon name="ph:cpu-duotone" />
          {{ node.cpu_cores }} {{ node.cpu_cores > 1 ? 'Cores' : 'Core' }}
        </span>
        <span class="spec">
          <Icon name="ph:memory-duotone" />
          {{ formatBytes(node.mem_total) }}
        </span>
        <span class="spec">
          <Icon name="ph:hard-drives-duotone" />
          {{ formatBytes(node.disk_total) }}
        </span>
      </div>

      <div class="node-footer">
        <span class="meta">{{ shortOS(node.os) }}</span>
        <span class="meta">{{ node.virtualization }} · {{ node.arch }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.nodes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
  margin-top: 20px;
}

.node-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  background: var(--c-bg-2);
  border-radius: 12px;
  transition: all 0.3s ease;

  &:hover {
    background: var(--c-bg-3);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
  }

  .title-row {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
  }

  .region {
    font-size: 18px;
    line-height: 1;
  }

  .node-name {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    color: var(--c-text-1);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .status-group {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
  }

  .status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;

    &.online {
      background: #22c55e;
      box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.6);
      animation: pulse-online 1.6s infinite;
    }

    &.offline {
      background: #ef4444;
      box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.6);
      animation: pulse-offline 1.6s infinite;
    }
  }

  .node-group {
    font-size: 12px;
    color: var(--c-text-3);
    padding: 4px 8px;
    background: var(--c-bg);
    border-radius: 4px;
    white-space: nowrap;
  }

  .node-cpu {
    margin: 0;
    font-size: 13px;
    line-height: 1.5;
    color: var(--c-text-2);
  }

  .node-specs {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
    font-size: 13px;
    color: var(--c-text-2);

    .spec {
      display: inline-flex;
      align-items: center;
      gap: 4px;

      .iconify {
        font-size: 16px;
      }
    }
  }

  .node-footer {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    margin-top: 2px;
    font-size: 12px;
    color: var(--c-text-3);

    .meta {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}

@keyframes pulse-online {
  0% {
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.6);
  }
  70% {
    box-shadow: 0 0 0 6px rgba(34, 197, 94, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
  }
}

@keyframes pulse-offline {
  0% {
    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.6);
  }
  70% {
    box-shadow: 0 0 0 6px rgba(239, 68, 68, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
  }
}
</style>
