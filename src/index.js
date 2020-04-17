Component({
  /**
 * 允许外部类名，开发者通过设置 以下三个类名 设置自己的样式覆盖组件默认样式
 */
  externalClasses: ['label-class'],
  properties: {
    list: {
      type: Array,
      value: []
    },
    height: {
      type: Number,
      value: 300
    },
    labelHeight: {
      type: Number,
      value: 40
    },
    currentIndex: {
      type: String,
      value: '0'
    },
    colorList: {
      type: Array,
      value: [
        {
          background: 'rgba(114, 172, 209,.2)',
          color: '#fff',
        },
      ]
    }
  },
  data: {
    accordionList: [],
    contentHeight: 0,
    currentIndexTemp: 0
  },
  lifetimes: {
    attached() {
      const contentHeight = this.data.height - this.data.labelHeight * this.data.list.length
      this.setData({
        contentHeight,
        currentIndexTemp: this.data.currentIndex
      })
      this.data.list.forEach((item, index) => {
        const colorItem = this.data.colorList[index % this.data.colorList.length]
        // eslint-disable-next-line
        if (index == this.data.currentIndex) {
          const list = this.data.accordionList
          list.push({
            label: item.label,
            content: item.content,
            contentHeight: this.data.contentHeight,
            background: colorItem.background,
            color: colorItem.color,
          })
          this.setData({
            accordionList: list
          })
        } else {
          const list = this.data.accordionList
          list.push({
            label: item.label,
            content: item.content,
            contentHeight: 0,
            background: colorItem.background,
            color: colorItem.color,
          })
          this.setData({
            accordionList: list
          })
        }
      })
    }
  },
  methods: {
    check(e) {
      const index = e.currentTarget.dataset.index
      const oldKey = 'accordionList[' + this.data.currentIndexTemp + '].contentHeight'
      const nowKey = 'accordionList[' + index + '].contentHeight'
      this.setData({
        [oldKey]: 0,
        [nowKey]: this.data.contentHeight,
        currentIndexTemp: index
      })
    }
  }
})
