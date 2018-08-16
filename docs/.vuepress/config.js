module.exports = {
  base: '/TD-notes/',
  dest: 'vuepress',
  port: '7878',
  locales: {
    '/': {
      lang: 'en-US',
      title: 'TD-notes',
      description: '开发笔记'
    }
  },
  head: [
    ['link', { rel: 'icon', href: `/logo.png` }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: `/icons/apple-touch-icon-152x152.png` }],
    ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
    ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
  ],
  serviceWorker: true,
  theme: 'vue',
  themeConfig: {
    repo: 'guzhao593/TD-notes',
    editLinks: true,
    docsDir: 'docs',
    // #697 Provided by the official algolia team.
    algolia: {
      apiKey: '3a539aab83105f01761a137c61004d85',
      indexName: 'vuepress'
    },
    locales: {
      '/': {
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: 'Last Updated',
        serviceWorker: {
          updatePopup: {
            message: "New content is available.",
            buttonText: "Refresh"
          }
        },
        nav: [
          {
            text: 'Blog',
            items: [
              {text: 'javascript', link: '/Blog/javascript'},
              {text: 'vue', link: '/Blog/vue'},
              {text: 'webpack', link: '/Blog/webpack'},
              {text: 'css', link: '/Blog/css/'},
              {text: 'html', link: '/Blog/html'},
            ]
          },
          {
            text: 'project',
            link: '/config/'
          },
          {
            text: 'profile',
            link: '/default-theme-config/'
          }
        ],
        sidebar: {
          '/Blog/javascript': [
            {
              title: 'javascript',
              collapsable: false,
              children: [
                'javascript'
              ]
            }
          ],
          '/Blog/css/': [
            {
              title: 'css',
              collapsable: false,
              children: [
                ''
              ]
            }
          ]
        }
      }
    }
  }
}

