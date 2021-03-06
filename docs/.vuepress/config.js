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
          { text: '数据类型', link: '/js/数据类型/数据类型的转换.md' },
          { text: '异步操作', link: '/js/异步操作/JavaScript的执行机制.md' },
          { text: '文件相关', link: '/js/文件相关/URL.createObjectURL和URL.revokeObjectURL的使用和案例.md' },
          { text: '其他', link: '/js/其他/MutationObserve的使用和应用.md' },
        ] 
      },
      { text: 'http', items: [
          { text: 'http', link: '/http/简单的HTTP协议.md' }
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
            '/js/文件相关/Blob对象.md',
            '/js/文件相关/FileReader的使用.md',
            '/js/文件相关/File对象的使用和示例.md',
            '/js/文件相关/前端如何实现文件下载.md'
          ]
        },
        {
          title: '数据类型',
          collapsable: true,
          children: [
            '/js/数据类型/数据类型的转换.md'
          ]
        },
        {
          title: '异步操作',
          collapsable: true,
          children: [
            '/js/异步操作/JavaScript的执行机制.md'
          ]
        },
        {
          title: '其他',
          collapsable: true,
          children: [
            '/js/其他/MutationObserve的使用和应用.md',
            '/js/其他/Data URLs.md'
          ]
        }
      ],
      '/http/': [
        {
          title: 'http',
          collapsable: true,
          children: [
            '/http/简单的HTTP协议.md',
            '/http/HTTP的首部字段.md',
            '/http/HTTP状态码.md',
            '/http/网络基础TCPIP.md',
            '/http/URI与URL.md'
          ]
        }
      ]
    }
  }
}