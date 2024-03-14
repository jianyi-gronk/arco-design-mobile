### 数据录入

# 文件选择器 FilePicker

文件选择器组件

======

> 属性/Props

| 参数             | 描述                                                                                                                       | 类型                                                                                    | 默认值     |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | ---------- |
| className        | 自定义类名                                                                                                                 | string                                                                                  | -          |
| style            | 自定义样式                                                                                                                 | CSSProperties                                                                           | -          |
| files            | 已选择文件列表                                                                                                             | FilePickItem\[\]                                                                        | 必填       |
| accept           | 可以选择的文件类型                                                                                                         | string                                                                                  | 'image/\*' |
| multiple         | 是否支持多选                                                                                                               | boolean                                                                                 | -          |
| capture          | 文件选取模式 Image selection mode \[capture MDN\](https://developer\.mozilla\.org/en\-US/docs/Web/HTML/Attributes/capture) | string \| boolean                                                                       | -          |
| columns          | 一行展示文件张数                                                                                                           | number                                                                                  | 3          |
| gutter           | 格子间的间距                                                                                                               | number                                                                                  | 8          |
| limit            | 最多选择文件张数，超出数量自动隐藏上传按钮，0 表示不做限制                                                                 | number                                                                                  | -          |
| maxSize          | 文件大小限制，单位为 K                                                                                                     | number                                                                                  | -          |
| hideDelete       | 是否隐藏删除 Icon                                                                                                          | boolean                                                                                 | false      |
| hideSelect       | 是否隐藏选择 Icon                                                                                                          | boolean                                                                                 | false      |
| alwaysShowSelect | 是否总是展示选择 Icon，默认情况下当文件数量超出 limit 值时会自动隐藏选择 Icon                                              | boolean                                                                                 | false      |
| disabled         | 禁用选择和删除文件                                                                                                         | boolean                                                                                 | -          |
| deleteIcon       | 自定义删除图标                                                                                                             | ReactNode                                                                               | -          |
| selectIcon       | 自定义选择图标                                                                                                             | ReactNode                                                                               | -          |
| imageProps       | 透传给文件的属性                                                                                                           | Partial\<ImageProps\>                                                                   | -          |
| renderError      | 自定义上传失败展示                                                                                                         | (index?: number) =\> ReactNode                                                          | -          |
| renderLoading    | 自定义上传中展示                                                                                                           | (index?: number) =\> ReactNode                                                          | -          |
| upload           | 上传方法                                                                                                                   | (file: FilePickItem) =\> Promise\<FilePickItem\>                                        | -          |
| onChange         | 已选文件列表发生变化                                                                                                       | (fileList: FilePickItem\[\]) =\> void                                                   | -          |
| onMaxSizeExceed  | 文件超过限制大小                                                                                                           | (file: File) =\> void                                                                   | -          |
| onLimitExceed    | 选择张数超过限制                                                                                                           | (files: File\[\]) =\> void                                                              | -          |
| onClick          | 文件点击                                                                                                                   | (e: MouseEvent\<HTMLElement, MouseEvent\>, image: FilePickItem, index: number) =\> void | -          |
| onLongPress      | 文件长按事件                                                                                                               | (e: TouchEvent\<HTMLElement\>, image: FilePickItem, index: number) =\> void             | -          |
| selectAdapter    | 文件选择适配器                                                                                                             | () =\> Promise\<SelectCallback\>                                                        | -          |
| onSelectClick    | 选图点击事件                                                                                                               | () =\> void                                                                             | -          |
| onDeleteClick    | 删除点击事件                                                                                                               | (index: number) =\> void                                                                | -          |

> 引用/Refs

| 参数 | 描述            | 类型           |
| ---- | --------------- | -------------- |
| dom  | 最外层 DOM 元素 | HTMLDivElement |

> FilePickItem

| 参数   | 描述     | 类型                             | 默认值                 |
| ------ | -------- | -------------------------------- | ---------------------- |
| url    | 文件地址 | string                           | 必填                   |
| file   | 文件文件 | File                             | -                      |
| status | 文件状态 | "loaded" \| "loading" \| "error" | 以文件自身加载状态而定 |

> ImageProps

| 参数            | 描述                                                                                     | 类型                                                                                                                                                                              | 默认值   |
| --------------- | ---------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| style           | 自定义样式                                                                               | CSSProperties                                                                                                                                                                     | -        |
| className       | 自定义类名                                                                               | string                                                                                                                                                                            | -        |
| status          | 指定文件状态，staticLabel=false 时有效                                                   | "loaded" \| "loading" \| "error" \| "init"                                                                                                                                        | -        |
| src             | 文件链接                                                                                 | string                                                                                                                                                                            | 必填     |
| width           | 容器宽度，传数值，默认单位为 px，传字符串则接受传入的单位                                | ReactText                                                                                                                                                                         | -        |
| height          | 容器高度，传数值，默认单位为 px，传字符串则接受传入的单位                                | ReactText                                                                                                                                                                         | -        |
| alt             | 替代文本                                                                                 | string                                                                                                                                                                            | ""       |
| fit             | 文件填充模式(object\-fit)，传 preview\-\*为预览模式，预览模式仅 staticLabel=false 时有效 | "\-moz\-initial" \| "inherit" \| "initial" \| "revert" \| "revert\-layer" \| "unset" \| "contain" \| "cover" \| "fill" \| "none" \| "scale\-down" \| "preview\-y" \| "preview\-x" | "fill"   |
| position        | 文件填充位置(object\-position)                                                           | ObjectPosition\<ReactText\>                                                                                                                                                       | "center" |
| radius          | 文件圆角                                                                                 | ReactText                                                                                                                                                                         | -        |
| bordered        | 是否加边框                                                                               | boolean                                                                                                                                                                           | -        |
| loadingArea     | 自定义展示加载中内容                                                                     | ReactNode                                                                                                                                                                         | -        |
| errorArea       | 自定义展示加载失败内容                                                                   | ReactNode                                                                                                                                                                         | -        |
| showLoading     | 是否展示文件加载中提示                                                                   | boolean                                                                                                                                                                           | -        |
| showError       | 是否展示文件加载失败提示                                                                 | boolean                                                                                                                                                                           | -        |
| animateDuration | 加载完时展现动画时长，staticLabel=false 时有效                                           | number                                                                                                                                                                            | 200      |
| retryTime       | 失败时自动重试次数                                                                       | number                                                                                                                                                                            | 0        |
| forceHttps      | 是否强制使用 https                                                                       | boolean                                                                                                                                                                           | -        |
| boxWidth        | 预览模式下，父容器宽度                                                                   | number                                                                                                                                                                            | -        |
| boxHeight       | 预览模式下，父容器高度                                                                   | number                                                                                                                                                                            | -        |
| topOverlap      | 文件顶层内容                                                                             | ReactNode                                                                                                                                                                         | -        |
| bottomOverlap   | 文件底层内容（placeholder），默认是灰色兜底，传 null 可移除                              | ReactNode                                                                                                                                                                         | -        |
| showImage       | 手动控制是否加载文件                                                                     | boolean                                                                                                                                                                           | -        |
| staticLabel     | 是否直接渲染\<img\>标签，不走加载文件流程                                                | boolean                                                                                                                                                                           | -        |
| nativeProps     | img 标签原生属性，优先级低于单独设置                                                     | DetailedHTMLProps\<ImgHTMLAttributes\<HTMLImageElement\>, HTMLImageElement\>                                                                                                      | -        |
| onChange        | 切换 status 时触发的回调                                                                 | (status: string) =\> void                                                                                                                                                         | -        |
| onClick         | 点击文件时触发的回调                                                                     | (e: MouseEvent\<HTMLElement, MouseEvent\>) =\> void                                                                                                                               | -        |
| onLoad          | 文件加载完毕时触发的回调                                                                 | (e: Event, image: HTMLImageElement) =\> void                                                                                                                                      | -        |
| onError         | 文件加载失败时触发的回调，如果有自动重试则在重试最终失败后触发                           | (e: string \| Event) =\> void                                                                                                                                                     | -        |
| onAutoRetry     | 文件加载失败时自动重试触发的回调                                                         | (e: string \| Event) =\> void                                                                                                                                                     | -        |

> ImageStatus

```
"loaded" | "loading" | "error" | "init"
```

> ObjectPosition

```
string | number | string & {}
```

> SelectCallback

| 参数  | 描述 | 类型            |
| ----- | ---- | --------------- |
| files | -    | AdapterFile\[\] |

> AdapterFile

| 参数 | 描述 | 类型   |
| ---- | ---- | ------ |
| url  | -    | string |
| size | -    | number |
| name | -    | string |
