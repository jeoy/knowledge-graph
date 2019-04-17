## dp是物理单位吗？

dp，全称是Density-independent Pixels, 设备独立像素, 在大多的android开发书籍里面是这么定义的:

>  an abstract unit that is based on the physical density of the screen. These units are relative to a 160 dpi screen, so one dp is one pixel on a 160 dpi screen.

维基百科里的[定义](https://en.wikipedia.org/wiki/Device-independent_pixel):

> A device-independent pixel (also: density-independent pixel, dip, dp) is a physical unit of measurement based on a coordinate system held by a computer and represents an abstraction of a pixel for use by an application that an underlying system then converts to physical pixels.

根据上面的描述，维基百科甚至直接说了他是一个物理单位(physical unit of measurement), physical unit of measurement 就类似于`cm, mm, inch`这样的东西了.

然而在实际应用过程中，很少有人把当`dp`做物理单位使用，不同于`pt`,  `pt`在印刷行业等同于`1/72inch`(photoshop可查), 在IOS中，苹果公司定义`1pt = 1/163 inch`

> An iOS point is equivalent to 1/163 of an inch.

详见[Mobile design 101: pixels, points and resolutions](https://medium.com/@fluidui/mobile-design-101-pixels-points-and-resolutions-f60413035243)

那么
## dp到底是不是物理单位呢？ 如果是应该等于多长？

下面分两个部分来讨论：
- 为什么dp是物理单位？
- 为什么dp不是物理单位？

## 为什么dp是物理单位

根据dp的定义，1dp大小等同于160ppi屏幕上的1个物理像素大小. 这里需要说一下ppi的概念,

#### ppi
ppi（pixels per inch）在概念上等同于 dpi(dot per inch), 只是应用领域的区别，在用像素显示的显示器上，这里统一用ppi来解释。

我们常把ppi理解为`像素密度`， 大家有没有想过为什么单位长度指标用来表示密度？

这里讲得啰嗦了一点，但概念落到实处对理解问题比较有帮助, `ppi`不是表示屏幕上能放多少个像素，而是线密度，表示对角线有多少个像素的长度.

举个🌰， 4.7英寸的屏幕，分辨率是1334x750，对应的ppi是326

  <img src="https://user-gold-cdn.xitu.io/2019/4/17/16a2999f1cb94528?w=720&h=360&f=jpeg&s=34014" />


ppi是通过  

```
 Math.sqrt(1334 * 1334 + 750 * 750) / 4.7
```
计算得到的，密度为什么可以用线密度来衡量, 这个原因很简单：

<bold>像素是方形的</bold>，所以用屏幕对角线的长度来表示就足够了。

#### 计算dp的尺寸
通过ppi的定义, 我们应该就能很方便的计算dp的尺寸了：

160ppi屏幕上，每英寸对角线上有160个物理像素的长度，所以1个物理像素 = 1 / 160 inch，

根据dp的定义 1dp = 160ppi 屏幕上一个物理像素的长度 = 1 / 160 inch.

那么看起来 dp确实是一个物理尺寸，并且就等同于1 / 160 inch, 用一个更加熟悉的单位，也就是 0.015875cm.

#### 但是，
很多地方并没有把dp当做一个物理尺寸用，

看下面的这个表格

```
+---------+-------------+---------------+-------------+--------------------+
| Unit    | Description | Units Per     | Density     | Same Physical Size |
|         |             | Physical Inch | Independent | On Every Screen    |
+---------+-------------+---------------+-------------+--------------------+
| px      | Pixels      | Varies        | No          | No                 |
+---------+-------------+---------------+-------------+--------------------+
| in      | Inches      | 1             | Yes         | Yes                |
+---------+-------------+---------------+-------------+--------------------+
| mm      | Millimeters | 25.4          | Yes         | Yes                |
+---------+-------------+---------------+-------------+--------------------+
| pt      | Points      | 72            | Yes         | Yes                |
+---------+-------------+---------------+-------------+--------------------+
| dp      | Density     | ~160          | Yes         | No                 |
|         | Independent |               |             |                    |
|         | Pixels      |               |             |                    |
+---------+-------------+---------------+-------------+--------------------+
| sp      | Scale       | ~160          | Yes         | No                 |
|         | Independent |               |             |                    |
|         | Pixels      |               |             |                    |
+---------+-------------+---------------+-------------+--------------------+
```

这张表格来自这个问题的回答: [What is the difference between “px”, “dip”, “dp” and “sp”?](https://stackoverflow.com/a/2025541/10139109)，

在dp这一栏，可以看到 Same Physical Size On Every Screen 是 No, 意思就是他不是物理单位，那么为什么呢？


## 为什么dp不是物理单位

看一下android对屏幕密度的的范围定义:

```
+----------------+----------------+
| Density Bucket | Screen Density |
+----------------+----------------+
| ldpi           | 120 dpi        |
+----------------+----------------+
| mdpi           | 160 dpi        |
+----------------+----------------+
| hdpi           | 240 dpi        |
+----------------+----------------+
| xhdpi          | 320 dpi        |
+----------------+----------------+
| xxhdpi         | 480 dpi        |
+----------------+----------------+
| xxxhdpi        | 640 dpi        |
+----------------+----------------+
```
这里是官方给出的`Bucket`的定义， 但是我们都知道，为什么android这么难搞，因为android厂商太多了，怎么说来着，他们都有自己的想法。

引用一段说明：

>  That being said, most phone screens do not fit in perfectly into any bucket. What happens then is that android fits them into the closest bucket which can cause the number of pixel per dp to stray from the bucket amount.

也就是说不同厂商不一定就能完全生产符合160ppi的屏幕，只能划分一个范围就近放进 bucket 里面去了，是不是很像桶排序

google很无奈，最后就变成了这样：

```
+----------------+----------------+
| Density Bucket | Screen Density |
+----------------+----------------+
| ldpi           | 120 dpi        |
+----------------+----------------+
| mdpi           | 120-160 dpi    |
+----------------+----------------+
| tvdpi          | 160-213 dpi    |
+----------------+----------------+
| hdpi           | 213-240 dpi    |
+----------------+----------------+
| xhdpi          | 240-320 dpi    |
+----------------+----------------+
| xxhdpi         | 320-480 dpi    |
+----------------+----------------+
| xxxhdpi        | 480-640 dp     |
+----------------+----------------+
\\你们爱怎么玩怎么玩，我们都包容了。
```

因此，在实际使用中，dp不能完全等同于 1/160inch, 而是在这个值周围浮动，所以上面的表格用了 `~160` 这个符号, （🍎公司看了一下pt，表示笑而不语)



### Reference
- [Mobile design 101: pixels, points and resolutions](https://medium.com/@fluidui/mobile-design-101-pixels-points-and-resolutions-f60413035243)
- [wiki Device-independent_pixel](https://en.wikipedia.org/wiki/Device-independent_pixel)
- [material.io Density & resolution](https://material.io/design/layout/density-resolution.html#pixel-density-on-android)
- [pixels-per-inch](https://www.omnicalculator.com/other/pixels-per-inch)
