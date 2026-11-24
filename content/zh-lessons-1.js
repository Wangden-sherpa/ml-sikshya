/* 中文课程 — 第 1 级：基础知识 */
window.zhLesson = (id, z) => {
  const L = COURSE.lessons.find((l) => l.id === id);
  if (!L) return;
  L.title.zh = z.title;
  L.body.zh = z.body;
  (z.code || []).forEach((c, i) => { if (L.code[i] && L.code[i].title && typeof L.code[i].title === 'object') L.code[i].title.zh = c; });
  (z.quiz || []).forEach((q, i) => {
    const Q = L.quiz && L.quiz[i]; if (!Q) return;
    Q.q.zh = q[0];
    if (q[1] && Q.options && !Array.isArray(Q.options)) Q.options.zh = q[1];
    if (Q.explain) Q.explain.zh = q[2];
  });
};

zhLesson('what-is-ml', {
  title: '机器学习是什么？',
  body: `
<p>机器学习（Machine Learning，ML）是一种让计算机<b>从数据中学习规律</b>的方法，而不是按照人类手写的规则去执行。</p>
<div class="box analogy"><b class="t">简单类比</b>想想小孩子是怎么认识“狗”的。没有人给他一本规则手册（“4 条腿 + 尾巴 + 会叫 = 狗”）。孩子看过很多只狗之后，大脑慢慢就找到了规律。机器学习也是这样：我们给计算机看大量例子，它自己找出规律。</div>

<h2>🔁 传统编程 vs 机器学习</h2>
<table>
<tr><th></th><th>传统编程</th><th>机器学习</th></tr>
<tr><td>输入</td><td>数据 + 规则</td><td>数据 + 答案（例子）</td></tr>
<tr><td>输出</td><td>答案</td><td>规则（一个<b>模型</b>）</td></tr>
<tr><td>例子</td><td>“如果邮件里有‘中奖’，就标为垃圾邮件”</td><td>给计算机看 10,000 封标好“垃圾/正常”的邮件，让它自己学会垃圾邮件的样子</td></tr>
</table>
<p>当规则复杂到无法手写时（识别人脸、把尼泊尔语翻译成英语、预测房价），机器学习就是更好的工具。</p>

<h2>🧭 机器学习的三大类型</h2>
<ul>
<li><b>监督学习</b>——给出<i>带正确答案</i>的例子（答案叫做<b>标签</b>），模型学会对新例子做出预测。<br>例如：预测房价、判断邮件是否为垃圾邮件。</li>
<li><b>无监督学习</b>——数据<i>没有答案</i>，模型自己发现其中的结构。<br>例如：把客户分成相似的群体。</li>
<li><b>强化学习</b>——智能体通过<i>试错</i>学习，做对了就获得奖励。<br>例如：机器人学走路、AI 下棋。</li>
</ul>
<p>监督学习里又分两类问题：</p>
<ul>
<li><b>回归</b> → 预测一个<i>数字</i>（价格、温度、分数）。</li>
<li><b>分类</b> → 预测一个<i>类别</i>（垃圾/正常、猫/狗、及格/不及格）。</li>
</ul>

<h2>📦 到处都会见到的关键词</h2>
<table>
<tr><th>术语</th><th>含义</th><th>房价例子</th></tr>
<tr><td>数据集 (Dataset)</td><td>例子的集合</td><td>加德满都卖出的 1,000 套房子</td></tr>
<tr><td>特征 (Feature, X)</td><td>输入的一列</td><td>面积、房间数、到马路的距离</td></tr>
<tr><td>标签 / 目标 (y)</td><td>我们要预测的答案</td><td>价格</td></tr>
<tr><td>模型 (Model)</td><td>学到的规律（一个数学函数）</td><td>价格 ≈ 2.1 × 面积 + 5 × 房间数 …</td></tr>
<tr><td>训练 (Training)</td><td>从数据中学习的过程</td><td>找到 2.1 和 5 这样最好的数字</td></tr>
<tr><td>预测 (Prediction)</td><td>把模型用在新数据上</td><td>估计一套新房子的价格</td></tr>
</table>

<h2>⚙️ 机器学习的工作流程（每个项目都会重复）</h2>
<div class="flow"><span>1. 定义问题</span><i>→</i><span>2. 收集数据</span><i>→</i><span>3. 清洗与探索</span><i>→</i><span>4. 选择模型</span><i>→</i><span>5. 训练</span><i>→</i><span>6. 评估</span><i>→</i><span>7. 部署与改进</span></div>

<h2>🌍 机器学习用在哪里？</h2>
<ul>
<li><b>手机：</b>人脸解锁、输入法联想、相册搜索。</li>
<li><b>金融（支付宝、电子钱包、银行）：</b>欺诈检测、贷款风险评估。</li>
<li><b>医疗：</b>从 X 光片发现疾病、预测病人风险。</li>
<li><b>农业：</b>从叶片照片识别作物病害、预测降雨。</li>
<li><b>娱乐：</b>抖音、YouTube、Netflix 的推荐。</li>
<li><b>语言：</b>ChatGPT/Claude、谷歌翻译（也支持尼泊尔语和中文！）。</li>
</ul>

<h2>💻 你的第一个“会学习”的程序</h2>
<p>下面是一个真正的机器学习模型。我们给它几个“学习时长 → 考试分数”的例子，它学到规律后，预测一个新学生的分数。按 <b>▶ 运行</b>，然后改改数字再运行一次！</p>
<div data-code="0"></div>
<div class="box tip">现在看不懂每一行也没关系。学完“监督学习”这一级后，你就能自己写出这段代码，并解释它内部是怎么工作的。</div>
`,
  code: ['我的第一个机器学习模型'],
  quiz: [
    ['在机器学习中，我们给计算机什么来学习？', ['只有手写的规则', '数据（例子）', '什么都不给——它本来就知道', '只有图片'], '机器学习从数据中学习规律，而不是依靠程序员写的规则。'],
    ['预测明天的气温（一个数字）属于……', ['分类', '回归', '聚类', '强化学习'], '预测连续的数值属于回归。'],
    ['在没有任何标签的情况下把客户分成相似的群体，属于……', ['监督学习', '无监督学习', '回归', '编程'], '没有给出答案，模型自己发现结构——这是无监督学习。'],
  ],
});

zhLesson('python-basics', {
  title: '机器学习的 Python 速成课',
  body: `
<p>Python 是机器学习的第一语言，因为它容易阅读，而且有很棒的库（NumPy、Pandas、scikit-learn、PyTorch）。入门只需要 Python 的一小部分。</p>
<h2>📦 变量与类型</h2>
<p>变量就是一个贴了标签、用来存放值的盒子。</p>
<table><tr><th>类型</th><th>例子</th><th>用途</th></tr>
<tr><td><code>int</code></td><td><code>age = 21</code></td><td>整数</td></tr>
<tr><td><code>float</code></td><td><code>price = 45.5</code></td><td>小数</td></tr>
<tr><td><code>str</code></td><td><code>city = "Pokhara"</code></td><td>文本</td></tr>
<tr><td><code>bool</code></td><td><code>is_spam = True</code></td><td>是 / 否</td></tr>
<tr><td><code>list</code></td><td><code>marks = [70, 85, 90]</code></td><td>有序集合</td></tr>
<tr><td><code>dict</code></td><td><code>{"name": "Sita", "age": 20}</code></td><td>键 → 值</td></tr>
</table>
<div data-code="0"></div>

<h2>🔀 判断与循环</h2>
<p><code>if / elif / else</code> 让程序做选择，<code>for</code> 对每个元素重复执行。Python 用<b>缩进</b>（4 个空格）表示哪些代码属于内部。</p>
<div data-code="1"></div>

<h2>🧩 函数</h2>
<p>函数是可以重复使用的“菜谱”：给它输入，得到输出。在机器学习中，<i>模型</i>本质上就是一个（非常聪明的）函数。</p>
<div data-code="2"></div>

<h2>🏗️ 类（了解概念即可）</h2>
<p>scikit-learn 的模型是<b>对象</b>。先创建一个，再调用它的方法：<code>model = LinearRegression()</code>、<code>model.fit(X, y)</code>、<code>model.predict(X_new)</code>。每个 sklearn 模型都遵循同样的 <b>fit → predict</b> 模式——学会一次，到处可用。</p>
<div class="box tip">练习建议：改一改上面代码里的值，故意把它弄错，然后读读错误信息。冷静地读懂报错，是编程的核心技能。</div>
`,
  code: ['变量、列表、字典', 'if / for', '函数'],
  quiz: [
    ['marks = [10, 20, 30] 时，marks[-1] 返回什么？', null, '负数索引从末尾开始数，-1 就是最后一个元素。'],
    ['Python 怎么知道哪些代码在 for 循环里面？', ['花括号 { }', '缩进（空格）', '分号', '行号'], 'Python 用缩进来划分代码块。'],
    ['几乎所有 scikit-learn 模型都有哪两个方法？', null, 'fit() 从数据中学习，predict() 使用学到的东西。'],
  ],
});

zhLesson('numpy', {
  title: 'NumPy——快速数值计算',
  body: `
<p><b>NumPy</b> 为 Python 提供了超快的<b>数组</b>：一个由数字组成的网格。所有机器学习数据——表格、图像、声音——最终都会变成 NumPy 数组。图像是像素值组成的二维/三维数组；数据集是二维数组（行 = 样本，列 = 特征）。</p>
<div class="box analogy"><b class="t">为什么不用普通列表？</b>列表就像拿铅笔一个数一个数地算。NumPy 像一台能一次算完整列的计算器（这叫<b>向量化</b>）——通常快 50–100 倍。</div>
<h2>🧱 创建数组及其形状</h2>
<p><b>形状 (shape)</b> 告诉你每个维度的大小。100 名学生 × 3 门课的表格，形状是 <code>(100, 3)</code>。机器学习中大多数 bug 都是形状错误，所以要经常打印形状！</p>
<div data-code="0"></div>
<h2>⚡ 向量化运算与广播</h2>
<p>运算会一次作用在每个元素上。<b>广播 (broadcasting)</b> 指 NumPy 会自动把小数组“拉伸”去匹配大数组——例如从每一行减去各列的平均值。</p>
<div data-code="1"></div>
<h2>🎯 索引、切片与筛选</h2>
<p><code>a[行, 列]</code>、<code>a[:, 0]</code>（所有行的第一列），以及 <code>a[a > 50]</code> 这样的布尔掩码，是选取数据时最常用的方式。</p>
<div data-code="2"></div>
<div class="box key"><b class="t">机器学习中最常用的 NumPy 工具</b><code>np.array, .shape, .reshape, np.mean / std / sum (axis=0 或 1), np.dot 或 @（矩阵乘法）, np.random, np.argmax, np.where</code></div>
`,
  code: ['数组与形状', '向量化与广播', '索引与筛选'],
  quiz: [
    ['有 500 行、8 个特征的数据集，形状是……', null, '先是行（样本），再是列（特征）。'],
    ['对形状为 (100, 3) 的数组执行 X.mean(axis=0) 会得到……', ['100 个值——每行一个', '3 个值——每列一个', '只有一个值', '报错'], 'axis=0 沿着行方向压缩，每列得到一个平均值。'],
    ['为什么 NumPy 做数学运算比 Python 列表快？', ['它在优化过的 C 代码中做向量化运算', '它会跳过一些数字', '它使用互联网', '它并不更快'], '整个数组的运算在编译好的 C 代码中执行，而不是慢速的 Python 循环。'],
  ],
});

zhLesson('pandas', {
  title: 'Pandas——处理表格数据',
  body: `
<p><b>Pandas</b> 就是 Python 里的 Excel。它的核心对象是 <b>DataFrame</b>：一张带列名的表格。真正的数据科学家会把 60–80% 的时间花在清洗和探索数据上——用的就是 Pandas。</p>
<h2>📋 创建并探索 DataFrame</h2>
<p>拿到任何数据集，先用 <code>head()</code>、<code>shape</code>、<code>info()</code> 和 <code>describe()</code> 看一看。</p>
<div data-code="0"></div>
<h2>🔍 选择、筛选、分组</h2>
<ul><li><code>df["col"]</code>——取一列</li><li><code>df[df["price"] > 50]</code>——筛选行</li><li><code>df.groupby("city")["price"].mean()</code>——按组汇总（类似数据透视表）</li></ul>
<div data-code="1"></div>
<h2>🧹 清洗脏数据</h2>
<p>真实数据里有<b>缺失值</b>（NaN）、错误的类型和重复行。常见处理：用中位数填充缺失值（<code>fillna</code>）、删除行（<code>dropna</code>）、把文本类别转换为数字（<code>get_dummies</code>，即独热编码）。</p>
<div data-code="2"></div>
<div class="box warn">模型无法读取文本或 NaN。训练前，每个特征都必须是数字，且不能有缺失。</div>
<p>读取真实文件可以写 <code>pd.read_csv("houses.csv")</code>。本网站在代码里直接创建数据，这样一切都能在浏览器中运行。</p>
`,
  code: ['创建与探索', '选择、筛选、分组', '清洗：缺失值与编码'],
  quiz: [
    ['哪条命令能显示数值列的统计摘要（平均值、最小值、最大值……）？', null, 'describe() 给出计数、平均值、标准差、最小值、四分位数和最大值。'],
    ['独热编码 (one-hot encoding) 用来……', ['删除行', '把类别（文本）变成数值型的 0/1 列', '为了好玩把数据变大', '排序数据'], '模型需要数字，所以每个类别都变成自己的 0/1 列。'],
    ['填充数值型缺失值的常用好方法是……', ['用这一列的中位数', '随便一个词', '999999', '永远保留 NaN'], '中位数简单，而且不容易受极端值（异常值）影响。'],
  ],
});

zhLesson('visualization', {
  title: '用 Matplotlib 可视化数据',
  body: `
<p>“一图胜千行。”在建任何模型之前，先<b>把数据画出来</b>。图表能揭示数字背后隐藏的规律、异常值和错误。</p>
<h2>📊 什么问题用什么图？</h2>
<table><tr><th>问题</th><th>图表</th></tr>
<tr><td>一个变量是怎样分布的？</td><td>直方图</td></tr>
<tr><td>两个数字之间有关系吗？</td><td>散点图</td></tr>
<tr><td>某样东西随时间怎样变化？</td><td>折线图</td></tr>
<tr><td>比较不同类别</td><td>柱状图</td></tr></table>
<div data-code="0"></div>
<h2>🔎 散点图揭示关系</h2>
<p>如果点一起往上走，说明特征之间<b>正相关</b>——线性模型很可能有效。按类别给点着色，可以看出类别是否容易分开。</p>
<div data-code="1"></div>
<div class="box tip">图表一定要有标题和坐标轴标签。将来的你（还有你的老板）会感谢你的。</div>
`,
  code: ['折线图、柱状图和直方图', '按类别着色的散点图'],
  quiz: [
    ['想看面积和价格是否相关，最好用哪种图？', null, '散点图能展示两个数值变量之间的关系。'],
    ['直方图展示的是……', ['一个变量的分布', '随时间的变化', '两个类别', '地图'], '它统计每个区间（bin）里有多少个值。'],
  ],
});

zhLesson('math-intuition', {
  title: '机器学习中的数学——先建立直觉',
  body: `
<p>学机器学习不需要你是数学天才，只需要掌握四个概念的<b>直觉</b>。我们先在脑海里画出图景，再看公式。</p>
<h2>1️⃣ 向量与矩阵——用数字表示数据</h2>
<p><b>向量</b>是描述一个事物的一串数字：一套房子 = <code>[面积, 房间数, 房龄]</code>。<b>矩阵</b>把许多向量叠在一起：就是整个数据集。模型的预测常常是一个<b>点积</b>：每个特征乘以一个权重（重要程度），再相加。</p>
<div class="formula">prediction = w₁·x₁ + w₂·x₂ + … + b  =  w · x + b</div>
<h2>2️⃣ 导数——哪个方向是下坡？</h2>
<div class="box analogy"><b class="t">类比：在大雾的山上迷路</b>你在浓雾中的山上，想走到山谷底部。看不远，但能感觉到脚下的坡度。往下坡走一步，再感受一下，再走一步……这个坡度就是<b>导数</b>。模型正是这样学习的（梯度下降）。</div>
<p>导数告诉我们：“如果把这个权重稍微调大一点，误差是变大还是变小？变化有多快？”</p>
<div class="formula">f(x) = x²   →   f'(x) = 2x      （在 x = 3 处斜率为 6：往右走会很快上坡）</div>
<h2>3️⃣ 概率——处理不确定性</h2>
<p>模型很少说“肯定”。它们会说“这封邮件<b>有 92% 的可能</b>是垃圾邮件”。概率是 0 到 1 之间的数。关键概念：平均值、离散程度（标准差），以及钟形的<b>正态分布</b>。</p>
<h2>4️⃣ 统计——均值、方差、相关性</h2>
<ul><li><b>均值</b>：平均数。<b>中位数</b>：中间的值（不易受异常值影响）。</li>
<li><b>方差 / 标准差</b>：数值有多分散。</li>
<li><b>相关系数</b>（−1 到 +1）：两个特征是否一起变化？</li></ul>
<div data-code="0"></div>
<div data-code="1"></div>
<div class="box key"><b class="t">需要记住的</b>数据 = 向量/矩阵。预测 = 加权求和。学习 = 沿着斜率（导数）往下走，降低误差。输出 = 概率。</div>
`,
  code: ['点积与导数', '统计与正态分布'],
  quiz: [
    ['导数告诉我们……', ['斜率——函数变化得有多快', '数据的平均值', '行数', '图表的颜色'], '模型用斜率来判断该往哪个方向调整权重。'],
    ['相关系数为 −0.9 意味着……', ['强相关：一个增大时另一个减小', '没有关系', '弱正相关', '出错了'], '接近 −1 = 很强的负相关。'],
    ['w · x + b 叫做……', ['加权求和（点积加偏置）', '直方图', '数据集', '循环'], '这种加权求和是线性模型和神经元的核心。'],
  ],
});
