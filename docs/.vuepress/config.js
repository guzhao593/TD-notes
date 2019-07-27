module.exports = {
  title: 'TD-Notes',
  description: "技术开发笔记",
  base: '/',
  port: 8899,
  themeConfig: {
    nav: [
      { text: '工程', items: [
          { text: 'webpack', link: '/gc/webpack/' },
          { text: 'git', link: '/gc/git/' },
        ] 
      },
      { text: 'js', items: [
          { text: 'webpack', link: '/js/webpack/' },
          { text: 'git', link: '/js/git/' },
        ] 
      }
    ],
    sidebar: {
      '/gc/': [
        {
          title: 'webpack',
          collapsable: true,
          children: [
            '/gc/webpack/',
            '/gc/webpack/环境变量的设置.md',
            '/gc/webpack/多页面应用.md',
            '/gc/webpack/Gzip打包.md'
          ]
        },
        {
          title: 'git',
          collapsable: true,
          children: [
            '/gc/git/'
          ]
        }
      ],
      '/js/': [
        {
          title: 'base',
          collapsable: true,
          children: [
            '/js/webpack/'
          ]
        },
        {
          title: 'pro',
          collapsable: true,
          children: [
            '/js/git/'
          ]
        }
      ]
    }
  }
}