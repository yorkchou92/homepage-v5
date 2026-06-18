<script setup lang="ts">
useHead({ title: '' })
definePageMeta({
    alias: ['/'],
    title: 'Home',
})
const appConfig = useAppConfig()
</script>

<template>
    <ZLAvatar class="avatar" />
    <div class="wrapper">
        <ZField label="<span style='font-size: 3rem;'>👋</span>">
            <h1 style="font-size: 3rem;">
                Hello,<br>I'm <mark>{{ appConfig.author.name }}</mark>
            </h1>
            <p class="desc">
                {{ appConfig.description }}
            </p>
            <div>
              <ZButton icon="ph:files-duotone" to="https://yorkchou.com">
                Blog
              </ZButton>
              <ZButton icon="ph:images" to="https://gallery.gy">
                Gallery
              </ZButton>
            </div>
        </ZField>

        <ZField label="i am">
          <p>
            Webmaster of
          <ZLink to="https://pj.ax">
            PJ.AX
          </ZLink> and
         <ZLink to="https://ip.uy">
            IP.UY
         </ZLink>
          </p>
          <p>
            Operator of
            <ZLink to="https://ix.md">
              Information eXchange
            </ZLink>
          </p>
          <p>
            Founder of
            <ZLink to="https://lastpill.com">
              Last Pill Studio
            </ZLink>
          </p>
        </ZField>

        <ZField label="about me">
            <p>
              Based in <b>Shanghai, China</b>. I am an operations engineer and a father. My career journey includes roles as a full-time editor and a telecommunications engineer. These experiences have profoundly shaped my current self.
            </p>
            <p>
              Photography is my passion, with a focus on portrait and landscape. I have a particular affinity for <b>Polaroids</b>, as capturing beautiful moments offers me immense joy.
            </p>
            <p>
              In my leisure time, I indulge in watching <ZLink to="/tv-shows" no-color class="tv-link"><b>TV shows</b></ZLink>, which is my preferred method of relaxation. My commute is usually accompanied by a playlist on <b>Apple Music</b>, and my favorite song is <b>"When We Were Young"</b> by Adele.
            </p>
        </ZField>
        <ZField label="find me at">
            <p>
                <ZRawLink to="https://t.me/YorkChou">
                  <span class="mark-t"><Icon name="ph:telegram-logo" /> <b>Telegram</b></span>
                </ZRawLink>
                &emsp;
                <ZRawLink to="https://ix.md/@admin">
                  <span class="mark-m"><Icon name="ph:mastodon-logo" /> <b>Mastodon</b></span>
                </ZRawLink>
                &emsp;
                <ZRawLink to="https://weibo.com/1597548010">
                  <span class="mark-x"><Icon name="mdi:sina-weibo" /> <b>Weibo</b></span>
                </ZRawLink>
            </p>
            <p>
              <ZRawLink to="https://www.instagram.com/york_chou/">
                <span class="mark-i"><Icon name="ph:instagram-logo" /> <b>Instagram</b></span>
              </ZRawLink>
              &emsp;
              <ZRawLink to="https://github.com/yorkchou92">
                <span class="mark-g"><Icon name="ph:github-logo" /> <b>Github</b></span>
              </ZRawLink>
            </p>
        </ZField>
    </div>
</template>

<style scoped lang="scss">
.avatar {
    position: fixed;
    opacity: 0.2;
    top: 0;
    right: 20vw;
    margin-right: -0.4em;
    font-size: min(100vw, 60vh);
    z-index: -1;
}

.desc {
    margin: 1rem 0;
    font-size: 1.5rem;
    color: var(--c-text-2);
}
</style>
