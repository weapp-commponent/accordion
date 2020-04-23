# accordion （手风琴）
微信小程序端的手风琴效果组件  
<p style="color: #F56C6C">微信基础版本库大于2.6.1</p>  

[项目地址](https://github.com/weapp-commponent/accordion)

## 效果演示

## 使用方法
### 安装accordion
开启微信的npm构建 [文档](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html)然后安装
```
npm install --save miniprogtram-accordion
```

### 在需要使用 accordion 的页面 .json 中添加 accordion 自定义组件配置
```json
{
  "usingComponents": {
    "accordion": "miniprogtram-accordion"
  }
}
```

### 在需要使用 accordion 的页面 .wxml 中引用 accordion
例：
```xml
<accordion
  list="{{list}}"
  colorList="{{colorList}}"
  label-class="leabel"
  content-class="content"
  >
  </accordion>
```

## 组件属性
### list
子项列表数据
> 必填  
> 类型：Array  
> 默认：[]  

格式：
``` javascript
[
  {
    label: '', // 手风琴子项label
    content: '', // 手风琴子项内容，支持小程序rich-text组件的nodes写法
  },
  {
    label: '', // 手风琴子项label
    content: '', // 手风琴子项内容，支持小程序rich-text组件的nodes写法
  },
  ...
]
```

### direction
布局模式，决定手风琴是横向布局还是垂直布局
> 非必填  
> 类型：String  
> 默认：vertical
> 可选值：vertical (垂直布局) , horizontal (横向布局)

例：
```javascript
<accordion
  list="{{list}}"
  direction="vertical"
  >
  </accordion>
```

![direction](http://img.coderdong.cn//weApp/accordion_001.gif)


### collapseType
手风琴展开模式,
> 非必填  
> 类型：String  
> 默认：only
> 可选值：only (只能同时展开一个子项，其他为闭合状态) , all (能同时展开多个子项)
<p style="color: #F56C6C;">注意：对于布局模式为horizontal横向布局时，该选项无效，只有only模式 ps:考虑到小程序端页面宽度本身就比较小</p>
例：
```javascript
<accordion
  list="{{list}}"
  collapseType="all"
  >
  </accordion>
```

![collapseType](http://img.coderdong.cn//weApp/accordion_002.gif)

### width
手风琴宽度,
> 非必填  
> 类型：Number  
> 默认：320
> 支持动态改变宽度，改变宽度之后组件会自动计算并改变组件宽度
例：
```javascript
<accordion
  list="{{list}}"
  width="{{width}}"
  >
  </accordion>
<view style="margin-top:20px;">
  <button bind:tap="changeWidth">改变宽度</button>
</view>
```

![width](http://img.coderdong.cn//weApp/accordion_003.gif)

### height
手风琴高度
> 非必填  
> 类型：Number  
> 默认：默认高度根据子项的高度自适应
> 支持动态改变宽度，改变宽度之后组件会自动计算并改变组件宽度
<p style="color: #F56C6C;">注意：当设置了height之后，contentHeight（后面将会讲到的属性）将会失效，子项的高度将根据列表个数动态计算</p>
例：
```javascript
<accordion
  list="{{list}}"
  height="{{height}}"
  >
  </accordion>
<view style="margin-top:20px;">
  <button bind:tap="changeHeight">改变高度</button>
</view>
```

![height](http://img.coderdong.cn//weApp/accordion_004.gif)


### contentHeight
手风琴子项内容部分高度
> 非必填  
> 类型：Number  
> 默认：200
<p style="color: #F56C6C;">注意：只对布局模式为垂直布局时起效，并且不要和height同时使用</p>


### labelHeight
手风琴子项标题部分高度
> 非必填  
> 类型：Number  
> 默认：40
<p style="color: #F56C6C;">注意：只对布局模式为垂直布局时起效</p>


### labelWidth
手风琴子项标题部分宽度
> 非必填  
> 类型：Number  
> 默认：40
<p style="color: #F56C6C;">注意：只对布局模式为横向布局时起效</p>

### currentIndex
默认展开的子项下标
> 非必填  
> 类型：Array  
> 默认：[0]
<p style="color: #F56C6C;">注意：展开模式为only时，只有数组的第一个值有效;布局为横向布局时，只有数组的第一个值有效</p>

例：
```javascript
<accordion
  list="{{list}}"
  collapseType="all"
  currentIndex="{{[1,2]}}"
  >
  </accordion>
```
![currentIndex](http://img.coderdong.cn//weApp/accordion_005.gif)

### duration
动画过渡时间
> 非必填  
> 类型：Number  
> 默认: 300(ms)

### arrowImg
箭头图片资源路径
> 非必填  
> 类型：String  
> 默认: '' , 当路径为空时，不显示箭头

<p style="color: #F56C6C;">注意：组件的相对路径，并不是引用这个组件的页面相对路径</p>

### colorList
各个子项的颜色配置
> 非必填  
> 类型：Array  
> 默认: [
          {
            background: 'rgba(114, 172, 209,.2)',
            color: '#fff',
          }
        ]


### label-class
自定义子项标题部分样式  
在引用组件的页面编写自定义样式，然后设置组件的label-class属性为自定义的类名
<p style="color: #F56C6C;">注意：css的background，height , width属性设置将会无效，如果需要设置请分别用组件的colorList, labelHeight, labelWidth, height, width 属性设置</p>

例：
```javascript
// 引入组件的页面.wxml
<accordion
  list="{{list}}"
  label-class="leabel"
  >
  </accordion>
```

```css
// 引入组件的页面.wxss
.leabel {
  padding: 5px;
  color: red;
  font-size: 12px;
  line-height: 20px;
}
```
![label-class](http://img.coderdong.cn//weApp/accordion_006.gif)

### content-class
自定义子项内容部分样式  
在引用组件的页面编写自定义样式，然后设置组件的content-class属性为自定义的类名
<p style="color: #F56C6C;">注意：css的background，height , width属性设置将会无效，如果需要设置请分别用组件的colorList, contentHeight, height, width 属性设置</p>

例：
```javascript
// 引入组件的页面.wxml
<accordion
  list="{{list}}"
  content-class="content"
  >
  </accordion>
```

```css
// 引入组件的页面.wxss
.content {
  padding: 10px 20px;
  line-height: 30px;
  font-size: 14px;
  color: red;
}
```
![content-class](http://img.coderdong.cn//weApp/accordion_007.gif)

### arrow-horizontal 和 arrow-horizontal-active
分别为横向布局时子项未展开和展开时的自定义样式  
在引用组件的页面编写自定义样式，然后设置组件的arrow-horizontal, arrow-horizontal-active属性为自定义的类名  
支持绝对定位（推荐）


### arrow-vertical 和 arrow-vertical-active
分别为垂直布局时子项未展开和展开时的自定义样式  
在引用组件的页面编写自定义样式，然后设置组件的arrow-vertical, arrow-vertical-active属性为自定义的类名  
支持绝对定位（推荐）