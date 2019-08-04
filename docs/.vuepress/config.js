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
          { text: '文件相关', link: '/js/文件相关/URL.createObjectURL和URL.revokeObjectURL的使用和案例.md' }
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
          title: '文件相关',
          collapsable: true,
          children: [
            '/js/文件相关/URL.createObjectURL和URL.revokeObjectURL的使用和案例.md',
            '/js/文件相关/FileReader的使用.md',
            '/js/文件相关/File对象的使用和示例.md',
            '/js/文件相关/前端如何实现文件下载.md'
          ]
        }
      ]
    }
  }
}