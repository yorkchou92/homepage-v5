import type { NavGroup } from '~/types/nav'

const author = {
    name: 'York Chou',
    avatar: '/profile.png',
    email: 'hi@ykc.im',
    homepage: 'https://ykc.im',
}

export default {
    title: 'York Chou',
    description: 'Webmaster | Copywriter | Photographer',
    author,
    language: 'zh-CN',
    timezone: 'Asia/Shanghai',
    favicon: '/icon.png',
    url: 'https://ykc.im',
    blogAtom: 'https://yorkchou.com/feed/atom/',
    footer: {
        copyright: `York Chou © ${new Date().getFullYear()}`,
        message: 'All rights reserved.',
    },
    imageDomains: [
        // 'blog.zhilu.cyou',
        // '7.isyangs.cn',
    ],
    injectHeadLinks: [
        // { rel: 'stylesheet', href: '//s1.hdslb.com/bfs/static/jinkela/long/font/medium.css', media: 'none', onload: 'this.media="all"' },
    ],
    nav: <NavGroup[]> [
        {
            title: '',
            list: [
                { icon: 'ph:house-duotone', title: 'Home', link: '/' },
                { icon: 'ph:pen-nib-duotone', title: 'Writings', link: '/article' },
                { icon: 'ph:code-duotone', title: 'Projects', link: '/projects' },
                { icon: 'ph:camera-duotone', title: 'Moments', link: '/moments' },
                { icon: 'ph:film-slate-duotone', title: 'TV Shows', link: '/tv-shows' },
                { icon: 'ph:music-notes-duotone', title: 'Listening', link: '/listening' },
                { icon: 'ph:hard-drives-duotone', title: 'Nodes', link: '/nodes' },
                // { icon: "ph:pen-nib-duotone", title: "文章", link: "https://blog.zhilu.cyou", external: true },
                // { icon: "ph:code-duotone", title: "项目", link: "/project" },
            ],
        },
        {
            title: 'Online',
            list: [
                { icon: 'ph:telegram-logo', title: 'Telegram', link: 'https://t.me/YorkChou', external: true },
                { icon: 'ph:mastodon-logo', title: 'Mastodon', link: 'https://ix.md/@admin', external: true },
                { icon: 'mdi:sina-weibo', title: 'Weibo', link: 'https://weibo.com/1597548010', external: true },
                { icon: 'ph:instagram-logo', title: 'Instagram', link: 'https://www.instagram.com/york_chou/', external: true },
                { icon: 'ph:github-logo', title: 'Github', link: 'https://github.com/yorkchou92', external: true },
            ],
        },
    ],
}
