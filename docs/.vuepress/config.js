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
          { text: 'BOM', link: '/js/BOM/URL.createObjectURL和URL.revokeObjectURL的使用和案例.md' }
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
            '/gc/webpack/module之加载css.md',
            '/gc/webpack/环境变量的设置.md',
            '/gc/webpack/多页面应用.md',
            '/gc/webpack/网站主题切换.md',
            '/gc/webpack/DllPlugin提高打包速度.md',
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
          title: 'BOM',
          collapsable: true,
          children: [
            '/js/BOM/URL.createObjectURL和URL.revokeObjectURL的使用和案例.md'
          ]
        }
      ]
    }
  }
}