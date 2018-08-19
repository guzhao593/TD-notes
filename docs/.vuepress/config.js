function getSidebar (title) {
  const sidebar = {
    'JavaScriptAdvancedProgramming': [{
      title: '《JavaScript高级程序设计》',
      collapsable: false,
      children: [
        '第二章：在HTML中使用script标签',
        '第三章：基本概念',
        '第四章：变量、作用域和内存问题',
        '第六章：面向对象的程序设计'
      ]
    }],
    'css': [{
      title: 'css',
      collapsable: false,
      children: [
        ''
      ]
    }],
    'javascript': [{
      title: 'javascript',
      collapsable: false,
      children: [
        '',
        'javascript基础'
      ]
    }]
  }
  return sidebar[title]
}
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
        editLinkText: '编辑本页',
        lastUpdated: '最后更新时间',
        serviceWorker: {
          updatePopup: {
            message: "New content is available.",
            buttonText: "Refresh"
          }
        },
        nav: [
          {
            text: '文章',
            link: '/Blog/',
            items: [
              {text: 'javascript', link: '/Blog/javascript/'},
              {text: 'vue', link: '/Blog/vue/'},
              {text: 'css', link: '/Blog/css/'},
              {text: 'html', link: '/Blog/html/'},
            ]
          },
          {
            text: '读书',
            link: '/read/',
            items: [
              {text: '《JavaScript高级程序设计》', link: '/read/JavaScriptAdvancedProgramming/第二章：在HTML中使用script标签'},
            ]
          },
          {
            text: '项目',
            link: '/project/'
          },
          {
            text: '简介',
            link: '/default-theme-config/'
          }
        ],
        sidebar: {
          '/Blog/javascript/': getSidebar('javascript'),
          '/Blog/css/': getSidebar('css'),
          '/Blog/vue/': getSidebar('vue'),
          '/read/JavaScriptAdvancedProgramming/': getSidebar('JavaScriptAdvancedProgramming')
        }
      }
    }
  }
}

