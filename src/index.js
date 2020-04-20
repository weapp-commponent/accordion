Component({
  options: {
    // multipleSlots: true // 开启多插槽
  },
  /**
   * 允许外部类名，开发者通过设置 以下几个类名 设置自己的样式覆盖组件默认样式
   */
  externalClasses: ['label-class', 'content-class', 'arrow--horizontal', 'arrow--vertical', 'arrow__active'],
  properties: {
    list: {
      type: Array,
      value: []
    },
    direction: {
      type: String,
      value: 'vertical'
    },
    width: {
      type: Number,
      value: 320
    },
    height: {
      type: Number,
      value: 300
    },
    labelHeight: {
      type: Number,
      value: 40
    },
    labelWidth: {
      type: Number,
      value: 40
    },
    currentIndex: {
      type: String,
      value: '0'
    },
    duration: {
      type: Number,
      value: 300
    },
    arrowImg: {
      type: String,
      value: './assets/arrow.png'
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
    contentWidth: 0,
    currentIndexTemp: 0,
    durationTemp: 0
  },
  observers: {
    'height, width': function () {
      this.initItme()
    }
  },
  lifetimes: {
    attached() {
      this.init()
    }
  },
  methods: {
    init() {
      const durationTemp = Number.parseFloat(this.data.duration / 1000).toFixed(2)
      this.setData({
        durationTemp,
        currentIndexTemp: this.data.currentIndex
      })
      this.initItme()
    },
    initItme() {
      const list = []
      if (this.data.direction === 'vertical') {
        const contentHeight = this.data.height - this.data.labelHeight * this.data.list.length
        const labelWidth = this.data.width
        const labelHeight = this.data.labelHeight
        this.setData({
          contentHeight
        })
        this.data.list.forEach((item, index) => {
          const colorItem = this.data.colorList[index % this.data.colorList.length]
          // eslint-disable-next-line
          if (index == this.data.currentIndexTemp) {
            list.push({
              label: {
                text: item.label,
                width: labelWidth,
                height: labelHeight,
              },
              content: {
                text: item.content,
                width: this.data.width,
                height: this.data.contentHeight,
              },
              background: colorItem.background,
              color: colorItem.color,
            })
          } else {
            list.push({
              label: {
                text: item.label,
                width: labelWidth,
                height: labelHeight,
              },
              content: {
                text: item.content,
                width: this.data.width,
                height: 0,
              },
              background: colorItem.background,
              color: colorItem.color,
            })
          }
        })
      } else {
        const contentWidth = this.data.width - this.data.labelWidth * this.data.list.length
        const labelWidth = this.data.labelWidth
        const labelHeight = this.data.height
        this.setData({
          contentWidth,
        })
        this.data.list.forEach((item, index) => {
          const colorItem = this.data.colorList[index % this.data.colorList.length]
          // eslint-disable-next-line
          if (index == this.data.currentIndexTemp) {
            list.push({
              label: {
                text: item.label,
                width: labelWidth,
                height: labelHeight,
              },
              content: {
                text: item.content,
                width: this.data.contentWidth,
                height: this.data.height,
              },
              background: colorItem.background,
              color: colorItem.color,
            })
          } else {
            list.push({
              label: {
                text: item.label,
                width: labelWidth,
                height: labelHeight,
              },
              content: {
                text: item.content,
                width: 0,
                height: this.data.height,
              },
              background: colorItem.background,
              color: colorItem.color,
            })
          }
        })
      }
      this.setData({
        accordionList: list
      })
    },
    check(e) {
      const direction = this.data.direction === 'vertical'
      const index = e.currentTarget.dataset.index
      const oldKey = 'accordionList[' + this.data.currentIndexTemp + '].content.' + (direction ? 'height' : 'width')
      const nowKey = 'accordionList[' + index + '].content.' + (direction ? 'height' : 'width')
      this.setData({
        [oldKey]: 0,
        [nowKey]: direction ? this.data.contentHeight : this.data.contentWidth,
        currentIndexTemp: index
      })
    }
  }
})
