Page({
  data: {
    width: 320,
    height: 300,
    direction: 'vertical',
    list: [
      {
        label: '账号无法登陆，提示账号已被冻结/禁用？',
        content: '通常是指您的账号因违反平台相关规定的情况下，平台管理人员对您的账号进行了登陆或使用限制，遇到该情况时，您可联系平台在线客服或拨打平台客服电话寻求帮助，我们将依据的账号相关信息给与适当处理通常是指您的账号因违反平台相关规定的情况下，平台管理人员对您的账号进行了登陆或使用限制，遇到该情况时，您可联系平台在线客服或拨打平台客服电话寻求帮助，我们将依据的账号相关信息给与适当处理'
      },
      {
        label: '企业信息变更了怎么办？',
        content: '遇到该情况时，您可联系平台在线客服或拨打平台客服电话寻求帮助，我们将依据的账号型关信息给与适当处理'
      },
      {
        label: '已发布的任务可以随时终止吗？',
        content: '已发布的任务可以在任务管理模块中进行管理，任务在“待审核”与“已通过”状态是可关闭，如遇到必须关闭情况，您可联系平台在线客服或拨打平台客服电话寻求帮助，我们将依据的任务相关信息给与适当处理）'
      }
    ],
    colorList: [
      {
        background: 'rgba(114, 172, 209,.2)',
        color: '#fff',
      },
      {
        background: 'rgba(114, 12, 209,.2)',
        color: '#fff',
      },
      {
        background: 'rgba(114, 172, 30,.2)',
        color: '#fff',
      }
    ]
  },
  changeWidth() {
    this.setData({
      width: this.data.width == 280 ? 320 : 280
    })
  },
  changeHeight() {
    this.setData({
      height: this.data.height == 500 ? 300 : 500
    })
  },
  changeDirection() {
    this.setData({
      direction: this.data.direction === 'horizontal' ? 'vertical' : 'horizontal'
    })
  }
})
