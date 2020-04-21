Component({
  options: {
    // multipleSlots: true // 开启多插槽
  },
  /**
   * 允许外部类名，开发者通过设置 以下几个类名 设置自己的样式覆盖组件默认样式
   */
  externalClasses: ['label-class', 'content-class', 'arrow-horizontal', 'arrow-vertical', 'arrow-horizontal-active', 'arrow-vertical-active'],
  properties: {
    /**
     * 列表数据
     */
    list: {
      type: Array,
      value: []
    },
    /**
     * 布局模式
     * vertical 垂直布局
     * horizontal 横向布局
     */
    direction: {
      type: String,
      value: 'vertical'
    },
    /**
     * 手风琴展开模式
     * only 只能同时展开一个子项，其他为闭合状态
     * all 能同时展开多个子项
     */
    collapseType: {
      type: String,
      value: 'only'
    },
    /**
     * 手风琴宽度
     */
    width: {
      type: Number,
      value: 320
    },
    /**
     * 手风琴高度
     * 默认高度根据子项的高度自适应
     * 注意：当设置了height之后，contentHeight将会失效，子项的高度将根据列表个数动态计算
     */
    height: {
      type: Number,
      value: 0
    },
    /**
     * 内容部分高度
     * 只对布局模式为垂直布局时起效
     */
    contentHeight: {
      type: Number,
      value: 200
    },
    /**
     * label高度
     * 只对布局模式为垂直布局时起效
     */
    labelHeight: {
      type: Number,
      value: 40
    },
    /**
     * label宽度
     * 只对布局模式为横向布局时起效
     */
    labelWidth: {
      type: Number,
      value: 40
    },
    /**
     * 默认展开的子项下标
     * 展开模式为only时，只有数组的第一个值有效
     */
    currentIndex: {
      type: Array,
      value: [0]
    },
    /**
     * 动画时间
     * 单位：ms
     */
    duration: {
      type: Number,
      value: 300
    },
    /**
     * 箭头图片资源路径
     * 组件的相对路径，并不是引用这个组件的页面相对路径
     */
    arrowImg: {
      type: String,
      value: './assets/arrow.png'
    },
    /**
     * 各个子项的颜色配置
     * 如果颜色列表个数小于数据列表个数，那么，数据列表回循环使用这个颜色列表
     */
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
    accordionWidth: 0,
    accordionHeight: 0,
    contentHeightTemp: 0,
    contentWidthTemp: 0,
    currentIndexTemp: [],
    durationTemp: 0
  },
  observers: {
    'height, width, direction': function () {
      this.initItem()
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
      this.onlyType()
      this.initItem()
    },
    initItem() {
      const list = []
      const accordionWidth = this.data.width
      const accordionHeight = this.data.height
      this.setData({
        accordionWidth,
        accordionHeight,
      })
      if (this.data.direction === 'vertical') {
        // eslint-disable-next-line
        const contentHeightTemp = this.data.height ? this.data.height - this.data.labelHeight * this.data.list.length : this.data.contentHeight
        // const contentHeightTemp = this.data.contentHeight
        const labelWidth = this.data.width
        const labelHeight = this.data.labelHeight
        this.setData({
          contentHeightTemp,
        })
        this.data.list.forEach((item, index) => {
          const colorItem = this.data.colorList[index % this.data.colorList.length]
          // eslint-disable-next-line
          if (this.data.currentIndexTemp.includes(index)) {
            list.push({
              label: {
                text: item.label,
                width: labelWidth,
                height: labelHeight,
              },
              content: {
                text: item.content,
                width: accordionWidth,
                height: this.data.contentHeightTemp,
              },
              unfold: true,
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
                width: accordionWidth,
                height: 0,
              },
              unfold: false,
              background: colorItem.background,
              color: colorItem.color,
            })
          }
        })
      } else {
        const contentWidthTemp = this.data.width - this.data.labelWidth * this.data.list.length
        const labelWidth = this.data.labelWidth
        const labelHeight = this.data.height
        this.setData({
          contentWidthTemp,
        })
        this.data.list.forEach((item, index) => {
          const colorItem = this.data.colorList[index % this.data.colorList.length]
          // eslint-disable-next-line
          if (this.data.currentIndexTemp[0] == index) {
            list.push({
              label: {
                text: item.label,
                width: labelWidth,
                height: labelHeight,
              },
              content: {
                text: item.content,
                width: contentWidthTemp,
                height: accordionHeight,
              },
              unfold: true,
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
                height: accordionHeight,
              },
              unfold: false,
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
    /**
     * 单条展开模式对currentIndexTemp进行处理
     */
    onlyType() {
      if (this.data.collapseType === 'only') {
        const indexArr = this.data.currentIndexTemp.slice(0, 1)
        this.setData({
          currentIndexTemp: indexArr
        })
      }
    },
    check(e) {
      const direction = this.data.direction === 'vertical'
      const index = e.currentTarget.dataset.index
      if (direction) {
        if (this.data.collapseType === 'only') {
          const oldKey = 'accordionList[' + this.data.currentIndexTemp[0] + '].content.height'
          const oldKeyUnfold = 'accordionList[' + this.data.currentIndexTemp[0] + '].unfold'
          const nowKey = 'accordionList[' + index + '].content.height'
          const nowKeyUnfold = 'accordionList[' + index + '].unfold'
          this.setData({
            [oldKey]: 0,
            [nowKey]: direction ? this.data.contentHeightTemp : this.data.contentWidthTemp,
            [oldKeyUnfold]: false,
            [nowKeyUnfold]: true,
            currentIndexTemp: [index]
          })
        } else if (this.data.collapseType === 'all') {
          const indexArr = this.data.currentIndexTemp
          if (!this.data.currentIndexTemp.includes(index)) {
            indexArr.push(index)
          }
          const nowKey = 'accordionList[' + index + '].content.height'
          const nowKeyUnfold = 'accordionList[' + index + '].unfold'
          const nowUnfold = this.data.accordionList[index].unfold
          this.setData({
            [nowKey]: nowUnfold ? 0 : this.data.contentHeightTemp,
            [nowKeyUnfold]: !nowUnfold,
            currentIndexTemp: indexArr
          })
        }
      } else {
        const oldKey = 'accordionList[' + this.data.currentIndexTemp[0] + '].content.width'
        const oldKeyUnfold = 'accordionList[' + this.data.currentIndexTemp[0] + '].unfold'
        const nowKey = 'accordionList[' + index + '].content.width'
        const nowKeyUnfold = 'accordionList[' + index + '].unfold'
        this.setData({
          [oldKey]: 0,
          [oldKeyUnfold]: false,
          [nowKey]: this.data.contentWidthTemp,
          [nowKeyUnfold]: true,
          currentIndexTemp: [index]
        })
      }
    }
  }
})
