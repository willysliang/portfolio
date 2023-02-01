/**
 * @ Author: willysliang
 * @ Create Time: 2023-01-27 10:55:17
 * @ Modified by: willysliang
 * @ Modified time: 2023-01-29 18:53:22
 * @ Description: 社区列表和学习社区列表模拟数据
 */

const list = [
  {
    title: '掘金',
    desc: '一个帮助开发者成长的社区',
    url: 'https://juejin.cn/',
    logo: 'https://qiqihao.oss-cn-beijing.aliyuncs.com/static/coderutil/icon/juejin.png',
  },
  {
    title: 'SF思否',
    desc: '思否是中国领先的开发者技术社区',
    url: 'https://segmentfault.com/',
    logo: 'http://coderutil.oss-cn-beijing.aliyuncs.com/bbs-image/file_87feae864e274579824d7398a588e042.png',
  },
  {
    title: 'CSDN',
    desc: '中文最大的技术社区',
    url: 'https://www.csdn.net/',
    logo: 'https://qiqihao.oss-cn-beijing.aliyuncs.com/static/coderutil/icon/csdn.png',
  },
  {
    title: '开源中国',
    desc: '目前国内最大的开源技术社区',
    url: 'https://www.oschina.net/',
    logo: 'https://qiqihao.oss-cn-beijing.aliyuncs.com/static/coderutil/icon/oschina.ico',
  },
  {
    title: 'StackOverflow',
    desc: '全球最大的技术问答社区',
    url: 'https://stackoverflow.com/',
    logo: 'https://qiqihao.oss-cn-beijing.aliyuncs.com/static/coderutil/icon/stackoverflow.svg',
  },
  {
    title: '菜鸟教程',
    desc: '学的不仅是技术，更是梦想',
    url: 'https://www.runoob.com/',
    logo: 'https://static.runoob.com/images/favicon.ico',
  },
]

const studyList = [
  {
    title: 'GitHub',
    desc: '世界最大的开源代码共享社区',
    url: 'https://github.com/',
    logo: 'https://qiqihao.oss-cn-beijing.aliyuncs.com/static/coderutil/icon/github.svg',
  },
  {
    title: 'Gitchat',
    desc: 'IT知识分享平台',
    url: 'https://gitbook.cn/',
    logo: 'https://qiqihao.oss-cn-beijing.aliyuncs.com/static/coderutil/icon/gitchat.png',
  },
  {
    title: 'Gitee',
    desc: '中国最大的开源代码共享社区',
    url: 'https://gitee.com/',
    logo: 'https://qiqihao.oss-cn-beijing.aliyuncs.com/static/coderutil/icon/gitee.png',
  },
  {
    title: '慕课网',
    desc: '程序员的梦工厂',
    url: 'https://www.imooc.com/',
    logo: 'https://qiqihao.oss-cn-beijing.aliyuncs.com/static/coderutil/icon/imooc.png',
  },
  {
    title: '掘金',
    desc: '一个帮助开发者成长的社区',
    url: 'https://juejin.cn/',
    logo: 'https://qiqihao.oss-cn-beijing.aliyuncs.com/static/coderutil/icon/juejin.png',
  },
  {
    title: 'CSDN',
    desc: '中文最大的技术社区',
    url: 'https://www.csdn.net/',
    logo: 'https://qiqihao.oss-cn-beijing.aliyuncs.com/static/coderutil/icon/csdn.png',
  },
]

export default [
  {
    url: '/list/getResouceList',
    type: 'get',
    response() {
      return {
        code: 200,
        msg: 'success',
        data: {
          list,
          studyList,
        },
      }
    },
  },
]
