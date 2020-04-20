Page({
  data: {
    width: 320,
    height: 300,
    list: [
      {
        label: '第yi条',
        content: '123'
      },
      {
        label: '第二条',
        content: '2222'
      },
      {
        label: '第3条',
        content: '2222'
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
      width: 300
    })
  },
  changeHeight() {
    this.setData({
      height: 500
    })
  }
})
