module.exports = {
  title: 'TD-Notes',
  description: "技术开发笔记",
  base: '/',
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
            '/gc/webpack/'
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