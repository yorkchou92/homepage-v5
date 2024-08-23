import type { NavGroup } from '~/types/nav'

const author = {
    name: 'York Chou',
    avatar: 'https://yorkchou.net/assets/images/profile2.png',
    email: 'hi@ykc.im',
    homepage: 'https://ykc.im',
}

export default {
    title: 'York Chou',
    description: 'Simple, Creative.',
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
                // { icon: "ph:pen-nib-duotone", title: "文章", link: "https://blog.zhilu.cyou", external: true },
                // { icon: "ph:code-duotone", title: "项目", link: "/project" },
                { icon: 'ph:code-duotone', title: 'Projects', link: 'https://yorkchou.net/projects.html', external: true },
            ],
        },
        {
            title: 'Online',
            list: [
                { icon: 'ph:telegram-logo', title: 'Telegram', link: 'https://t.me/YorkChou', external: true },
                { icon: 'ph:mastodon-logo', title: 'Mastodon', link: 'https://ix.md/@admin', external: true },
                { icon: 'ph:x-logo', title: 'X', link: 'https://x.com/York_Chou', external: true },
                { icon: 'ph:instagram-logo', title: 'Instagram', link: 'https://www.instagram.com/york_chou/', external: true },
                { icon: 'ph:github-logo', title: 'Github', link: 'https://github.com/yorkchou92', external: true },
            ],
        },
    ],
}
