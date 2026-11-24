/* ML Sikshya — Data Lab: upload real-world data (CSV / Excel / JSON), explore it, get suggestions, visualize in 3D and train models. Runs 100% in the browser. */
(() => {
  const MLS = window.MLS;
  const { t, u, h, esc, toast } = MLS;

  Object.assign(MLS.UI, {
    dlIntro: { en: 'Upload your own real-world data and practise everything from the course on it: explore, clean, chart, view in 3D and train a model — with smart suggestions at every step.', ne: 'आफ्नै वास्तविक डाटा अपलोड गरेर कोर्समा सिकेका सबै कुरा अभ्यास गर्नुहोस्: अन्वेषण, सफाइ, चार्ट, 3D दृश्य र मोडेल तालिम — हरेक चरणमा स्मार्ट सुझावसहित।' },
    dlPrivacy: { en: '🔒 Your files never leave your computer — everything runs inside your browser.', ne: '🔒 तपाईंका फाइल कम्प्युटरबाट बाहिर जाँदैनन् — सबै कुरा ब्राउजरभित्रै चल्छ।' },
    dlDrop: { en: 'Drag & drop files here, or click to choose', ne: 'फाइल यहाँ तानेर छोड्नुहोस्, वा छान्न क्लिक गर्नुहोस्' },
    dlTypes: { en: 'CSV, TSV, TXT, Excel (.xlsx), JSON · many files at once · up to ~200 MB each', ne: 'CSV, TSV, TXT, Excel (.xlsx), JSON · एकैपटक धेरै फाइल · हरेक ~२०० MB सम्म' },
    dlSamples: { en: 'No data yet? Try a sample dataset:', ne: 'डाटा छैन? नमुना डाटासेट प्रयास गर्नुहोस्:' },
    dlFiles: { en: 'Your datasets', ne: 'तपाईंका डाटासेट' },
    dlLoading: { en: 'Loading Python + pandas in your browser… (first time 10–30 s)', ne: 'ब्राउजरमा Python + pandas लोड हुँदैछ… (पहिलो पटक १०–३० सेकेन्ड)' },
    dlReading: { en: 'Reading and analysing your data…', ne: 'तपाईंको डाटा पढ्दै र विश्लेषण गर्दै…' },
    dlRows: { en: 'Rows', ne: 'Row' }, dlCols: { en: 'Columns', ne: 'Column' }, dlMissing: { en: 'Missing cells', ne: 'हराएका cell' }, dlDup: { en: 'Duplicate rows', ne: 'दोहोरिएका row' }, dlMem: { en: 'Memory', ne: 'मेमोरी' },
    dlSuggest: { en: '💡 Smart suggestions for this data', ne: '💡 यो डाटाका लागि स्मार्ट सुझाव' },
    dlAskAI: { en: '🤖 Ask the AI tutor about this data', ne: '🤖 यो डाटाबारे AI सहायकलाई सोध्नुहोस्' },
    dlColumns: { en: '🧾 Columns', ne: '🧾 Column हरू' },
    dlPreview: { en: '👀 First rows', ne: '👀 पहिला row हरू' },
    dlCharts: { en: '📊 Charts', ne: '📊 चार्ट' }, dlDraw: { en: 'Draw charts', ne: 'चार्ट बनाउनुहोस्' },
    dl3d: { en: '🧊 Explore in 3D', ne: '🧊 3D मा अन्वेषण' }, dlShow3d: { en: 'Show in 3D', ne: '3D मा देखाउनुहोस्' }, dlColor: { en: 'colour by', ne: 'रङ' }, dlNone: { en: '(none)', ne: '(केही होइन)' },
    dlModel: { en: '🤖 Train a model on your data', ne: '🤖 आफ्नो डाटामा मोडेल तालिम दिनुहोस्' },
    dlTarget: { en: 'What do you want to predict? (target column)', ne: 'के अनुमान गर्न चाहनुहुन्छ? (target column)' },
    dlTrain: { en: '🚀 Build & train model', ne: '🚀 मोडेल बनाएर तालिम दिनुहोस्' },
    dlModelNote: { en: 'This writes a full professional pipeline (cleaning + encoding + Random Forest) as code you can edit and re-run.', ne: 'यसले पूरा पेशेवर pipeline (सफाइ + encoding + Random Forest) लाई बदलेर फेरि चलाउन मिल्ने कोडको रूपमा लेख्छ।' },
    dlWork: { en: '💻 Your workspace', ne: '💻 तपाईंको कार्यस्थल' },
    dlWorkNote: { en: 'Your data is already loaded as the variable df. Write any pandas / scikit-learn code.', ne: 'तपाईंको डाटा df भेरिएबलमा पहिल्यै लोड छ। जुनसुकै pandas / scikit-learn कोड लेख्नुहोस्।' },
    dlRemove: { en: 'Remove', ne: 'हटाउनुहोस्' },
    dlTooBig: { en: 'is very large; it may be slow or fail in the browser.', ne: 'धेरै ठूलो छ; ब्राउजरमा ढिलो वा असफल हुन सक्छ।' },
    dlFail: { en: 'Could not read this file', ne: 'यो फाइल पढ्न सकिएन' },
    dlSessionNote: { en: 'Files stay only while this tab is open. Reloading the page clears them.', ne: 'यो tab खुला रहुन्जेल मात्र फाइल रहन्छन्। पेज reload गर्दा हट्छन्।' },
  });

  const DL = (MLS.datalab = { files: [], current: null, profile: null });

  const PY_HELPERS = String.raw`
import pandas as pd, numpy as np, json, os, warnings
warnings.filterwarnings("ignore")
DATA = {}

def _mls_read(path):
    ext = path.lower().rsplit(".", 1)[-1]
    if ext in ("xlsx", "xlsm", "xls"):
        return pd.read_excel(path)
    if ext == "json":
        try:
            return pd.read_json(path)
        except ValueError:
            return pd.read_json(path, lines=True)
    with open(path, "rb") as f:
        head = f.read(8192)
    enc = "utf-8"
    try:
        sample = head.decode("utf-8")
    except UnicodeDecodeError:
        enc, sample = "latin-1", head.decode("latin-1")
    first = sample.splitlines()[0] if sample else ""
    sep = max([",", ";", "\t", "|"], key=first.count)
    if first.count(sep) == 0:
        sep = ","
    return pd.read_csv(path, sep=sep, encoding=enc, low_memory=False)

def _mls_profile(name):
    df = _mls_read("/data/" + name)
    df.columns = [str(c).strip() for c in df.columns]
    DATA[name] = df
    globals()["df"] = df
    cols = []
    for c in df.columns:
        s = df[c]
        info = {"name": c, "dtype": str(s.dtype), "missing": int(s.isna().sum()), "unique": int(s.nunique(dropna=True))}
        if pd.api.types.is_bool_dtype(s):
            kind = "bool"
        elif pd.api.types.is_numeric_dtype(s):
            kind = "num"
        elif pd.api.types.is_datetime64_any_dtype(s):
            kind = "date"
        else:
            kind = "cat"
            smp = s.dropna().astype(str).head(60)
            if len(smp) and pd.to_numeric(smp.str.replace(",", ""), errors="coerce").notna().mean() > 0.9:
                kind = "numtext"
            elif len(smp) and smp.str.contains(r"\d[-/.]\d").mean() > 0.8 and pd.to_datetime(smp, errors="coerce").notna().mean() > 0.8:
                kind = "date"
        info["kind"] = kind
        if kind == "num":
            d = s.describe()
            for k in ["mean", "std", "min", "max", "50%"]:
                v = d.get(k)
                info[k] = None if v is None or pd.isna(v) else float(v)
            try:
                sk = s.skew()
                info["skew"] = 0.0 if pd.isna(sk) else float(sk)
            except Exception:
                info["skew"] = 0.0
        else:
            vc = s.astype(str).value_counts().head(5)
            info["top"] = [[str(k), int(v)] for k, v in vc.items()]
        cols.append(info)
    num = df.select_dtypes("number")
    pairs = []
    if 2 <= num.shape[1] <= 200:
        cm = num.corr().abs()
        for i, a in enumerate(cm.columns):
            for b in cm.columns[i + 1:]:
                v = cm.loc[a, b]
                if pd.notna(v) and v > 0.9:
                    pairs.append([a, b, round(float(v), 3)])
    return json.dumps({
        "name": name, "rows": int(len(df)), "cols": int(df.shape[1]),
        "dup": int(df.duplicated().sum()), "mem": int(df.memory_usage(deep=True).sum()),
        "columns": cols, "corr": pairs[:10],
        "headCols": [str(c) for c in df.columns][:40],
        "head": df.iloc[:8, :40].astype(str).values.tolist(),
    })

def _mls_charts(name):
    import matplotlib.pyplot as plt
    df = DATA[name]
    num = list(df.select_dtypes("number").columns[:12])
    if num:
        k = len(num); nc = min(4, k); nr = -(-k // nc)
        fig, axes = plt.subplots(nr, nc, figsize=(3.6 * nc, 2.6 * nr))
        axes = np.array(axes).reshape(-1)
        for ax, c in zip(axes, num):
            ax.hist(df[c].dropna(), bins=30, color="#6366f1", edgecolor="white")
            ax.set_title(c, fontsize=10)
        for ax in axes[k:]:
            ax.axis("off")
        fig.suptitle("Distributions of numeric columns", fontweight="bold")
        plt.tight_layout()
    if len(num) >= 2:
        cm = df[num].corr()
        fig, ax = plt.subplots(figsize=(1.5 + 0.65 * len(num), 1 + 0.55 * len(num)))
        im = ax.imshow(cm, cmap="coolwarm", vmin=-1, vmax=1)
        ax.set_xticks(range(len(num))); ax.set_xticklabels(num, rotation=60, ha="right", fontsize=8)
        ax.set_yticks(range(len(num))); ax.set_yticklabels(num, fontsize=8)
        for i in range(len(num)):
            for j in range(len(num)):
                ax.text(j, i, f"{cm.iloc[i, j]:.2f}", ha="center", va="center", fontsize=7)
        plt.colorbar(im); ax.set_title("Correlation heatmap", fontweight="bold")
        plt.tight_layout()
    cats = [c for c in df.columns if df[c].dtype == object and 1 < df[c].nunique() <= 30][:3]
    if cats:
        fig, axes = plt.subplots(1, len(cats), figsize=(4.5 * len(cats), 3.2))
        for ax, c in zip(np.atleast_1d(axes), cats):
            df[c].value_counts().head(12).plot.bar(ax=ax, color="#ec4899")
            ax.set_title(c); ax.tick_params(axis="x", rotation=45, labelsize=8)
        plt.tight_layout()
    miss = df.isna().sum()
    miss = miss[miss > 0].sort_values(ascending=False).head(20)
    if len(miss):
        fig, ax = plt.subplots(figsize=(6, 0.35 * len(miss) + 1))
        (miss / len(df) * 100).sort_values().plot.barh(ax=ax, color="#f59e0b")
        ax.set_xlabel("% missing"); ax.set_title("Missing values", fontweight="bold")
        plt.tight_layout()

def _mls_xyz(name, x, y, z, c):
    df = DATA[name]
    cols = list(dict.fromkeys([x, y, z] + ([c] if c else [])))
    d = df[cols].copy()
    for col in [x, y, z]:
        d[col] = pd.to_numeric(d[col], errors="coerce")
    d = d.dropna(subset=[x, y, z])
    if len(d) > 3000:
        d = d.sample(3000, random_state=0)
    out = {"points": d[[x, y, z]].astype(float).values.tolist()}
    if c:
        if pd.api.types.is_numeric_dtype(d[c]) and d[c].nunique() > 12:
            out.update(colorKind="num", color=d[c].fillna(d[c].median()).astype(float).tolist())
        else:
            s = d[c].astype(str)
            top = s.value_counts().index.tolist()[:11]
            s = s.where(s.isin(top), "other")
            out.update(colorKind="cat", color=s.tolist(), cats=top + (["other"] if (s == "other").any() else []))
    return json.dumps(out)

def _mls_sample(kind):
    from sklearn import datasets
    if kind == "iris":
        b = datasets.load_iris(as_frame=True); d = b.frame; d["target"] = d["target"].map(dict(enumerate(b.target_names))); d = d.rename(columns={"target": "species"})
    elif kind == "wine":
        b = datasets.load_wine(as_frame=True); d = b.frame.rename(columns={"target": "wine_class"})
    elif kind == "breast_cancer":
        b = datasets.load_breast_cancer(as_frame=True); d = b.frame; d["target"] = d["target"].map({0: "malignant", 1: "benign"}); d = d.rename(columns={"target": "diagnosis"})
    elif kind == "diabetes":
        b = datasets.load_diabetes(as_frame=True); d = b.frame.rename(columns={"target": "disease_progression"})
    else:
        rng = np.random.default_rng(2081); n = 600
        city = rng.choice(["Kathmandu", "Lalitpur", "Bhaktapur", "Pokhara", "Butwal", "Biratnagar"], n, p=[.3, .2, .1, .2, .1, .1])
        d = pd.DataFrame({"house_id": np.arange(1, n + 1), "city": city, "land_aana": rng.uniform(2.5, 12, n).round(1),
                          "floors": rng.choice([1, 1.5, 2, 2.5, 3, 4], n), "road_ft": rng.choice([8, 10, 13, 16, 20, 26], n).astype(float),
                          "built_bs": rng.integers(2050, 2081, n), "facing": rng.choice(["East", "West", "North", "South"], n),
                          "parking": rng.choice(["yes", "no"], n, p=[.6, .4])})
        per = pd.Series(city).map({"Kathmandu": 45, "Lalitpur": 40, "Bhaktapur": 30, "Pokhara": 28, "Butwal": 18, "Biratnagar": 15}).values
        d["price_lakh"] = ((per * d.land_aana + 18 * d.floors * d.land_aana ** 0.5 + 2.5 * d.road_ft - 1.2 * (2081 - d.built_bs)
                            + np.where(d.facing == "East", 15, 0) + np.where(d.parking == "yes", 20, 0)) * rng.lognormal(0, 0.12, n)).round(1)
        d.loc[rng.choice(n, 45, replace=False), "road_ft"] = np.nan
        d.loc[rng.choice(n, 25, replace=False), "facing"] = np.nan
        kind = "nepal_houses"
    fname = kind + ".csv"
    d.to_csv("/data/" + fname, index=False)
    return json.dumps([fname, os.path.getsize("/data/" + fname)])
`;

  let pyReady = null;
  function py() {
    if (!pyReady) {
      pyReady = (async () => {
        const p = await MLS.getPy();
        try { p.FS.mkdirTree('/data'); } catch { /* exists */ }
        await p.loadPackage(['pandas', 'numpy']);
        p.runPython(PY_HELPERS);
        return p;
      })();
      pyReady.catch(() => { pyReady = null; });
    }
    return pyReady;
  }
  const fmtBytes = (n) => (n > 1e9 ? (n / 1e9).toFixed(1) + ' GB' : n > 1e6 ? (n / 1e6).toFixed(1) + ' MB' : n > 1e3 ? (n / 1e3).toFixed(0) + ' KB' : n + ' B');
  const safeName = (n) => {
    let s = n.replace(/[^\w.\-]+/g, '_');
    while (DL.files.some((f) => f.name === s)) s = s.replace(/(\.\w+)?$/, (m) => '_2' + m);
    return s;
  };
  const pyStr = (s) => JSON.stringify(String(s));

  // ---------- Suggestions (rule-based, bilingual) ----------
  function suggestions(P) {
    const out = [], add = (en, ne, zh, code) => out.push({ en, ne, zh, code });
    const missCols = P.columns.filter((c) => c.missing > 0);
    const totalMiss = P.columns.reduce((a, c) => a + c.missing, 0);
    if (!totalMiss) add('No missing values — great, the data is complete.', 'कुनै मान हराएको छैन — उत्कृष्ट, डाटा पूरा छ।', '没有缺失值——很好，数据是完整的。');
    missCols.forEach((c) => {
      const pct = (c.missing / P.rows) * 100, n = `<b>${esc(c.name)}</b>`;
      if (pct > 40) add(`${n} is ${pct.toFixed(0)}% missing — consider dropping this column.`, `${n} ${pct.toFixed(0)}% हराएको छ — यो column हटाउने विचार गर्नुहोस्।`, `${n} 缺失了 ${pct.toFixed(0)}%——可以考虑删除这一列。`, `df = df.drop(columns=[${pyStr(c.name)}])`);
      else add(`${n} has ${c.missing} missing values (${pct.toFixed(1)}%) — fill them with the ${c.kind === 'num' ? 'median' : 'most frequent value'}.`, `${n} मा ${c.missing} मान हराएका छन् (${pct.toFixed(1)}%) — ${c.kind === 'num' ? 'median' : 'सबैभन्दा धेरै आउने मान'} ले भर्नुहोस्।`, `${n} 有 ${c.missing} 个缺失值（${pct.toFixed(1)}%）——用${c.kind === 'num' ? '中位数' : '最常见的值'}填充。`,
        c.kind === 'num' ? `df[${pyStr(c.name)}] = df[${pyStr(c.name)}].fillna(df[${pyStr(c.name)}].median())` : `df[${pyStr(c.name)}] = df[${pyStr(c.name)}].fillna(df[${pyStr(c.name)}].mode()[0])`);
    });
    if (P.dup) add(`There are <b>${P.dup}</b> duplicate rows — remove them before training.`, `<b>${P.dup}</b> दोहोरिएका row छन् — तालिम अघि हटाउनुहोस्।`, `有 <b>${P.dup}</b> 行重复数据——训练前请删除。`, 'df = df.drop_duplicates()');
    P.columns.forEach((c) => {
      const n = `<b>${esc(c.name)}</b>`;
      const idLike = /(^|[_\s])(id|uuid)$/i.test(c.name) || (c.unique === P.rows && P.rows > 20 && c.kind === 'cat');
      if (idLike) add(`${n} has a different value in every row (like an ID or a name) — drop it; it can't help predictions.`, `${n} हरेक row मा फरक छ (ID वा नाम जस्तो) — हटाउनुहोस्; यसले अनुमानमा मद्दत गर्दैन।`, `${n} 每一行的值都不同（像编号或姓名）——删除它，它对预测没有帮助。`, `df = df.drop(columns=[${pyStr(c.name)}])`);
      else if (c.unique <= 1) add(`${n} has only one value — it carries no information, drop it.`, `${n} मा एउटै मान छ — कुनै जानकारी छैन, हटाउनुहोस्।`, `${n} 只有一个值——没有信息量，删除它。`, `df = df.drop(columns=[${pyStr(c.name)}])`);
      else if (c.kind === 'numtext') add(`${n} contains numbers stored as text — convert it to numbers.`, `${n} मा text को रूपमा राखिएका संख्या छन् — संख्यामा बदल्नुहोस्।`, `${n} 里的数字是以文本形式保存的——把它转换成数字。`, `df[${pyStr(c.name)}] = pd.to_numeric(df[${pyStr(c.name)}].astype(str).str.replace(",", ""), errors="coerce")`);
      else if (c.kind === 'date') add(`${n} looks like a date — convert it and extract year / month / weekday features.`, `${n} मिति जस्तो देखिन्छ — रूपान्तरण गरेर वर्ष / महिना / बार feature निकाल्नुहोस्।`, `${n} 看起来是日期——转换后提取年 / 月 / 星期等特征。`, `df[${pyStr(c.name)}] = pd.to_datetime(df[${pyStr(c.name)}], errors="coerce")\ndf[${pyStr(c.name + '_month')}] = df[${pyStr(c.name)}].dt.month`);
      else if (c.kind === 'cat' && c.unique > 50) add(`${n} is text with ${c.unique} different values — too many for one-hot encoding; group rare values or drop it.`, `${n} मा ${c.unique} फरक text मान छन् — one-hot का लागि धेरै; दुर्लभ मान समूह बनाउनुहोस् वा हटाउनुहोस्।`, `${n} 有 ${c.unique} 种不同的文本值——太多，不适合独热编码；把少见的值合并或删除这一列。`);
      else if (c.kind === 'cat') add(`${n} is a category (${c.unique} values) — use one-hot encoding before training.`, `${n} श्रेणी हो (${c.unique} मान) — तालिम अघि one-hot encoding प्रयोग गर्नुहोस्।`, `${n} 是类别特征（${c.unique} 个值）——训练前使用独热编码（one-hot）。`, `df = pd.get_dummies(df, columns=[${pyStr(c.name)}], dtype=int)`);
      else if (c.kind === 'num' && Math.abs(c.skew || 0) > 2 && (c.min ?? 0) >= 0) add(`${n} is very skewed (skew ${c.skew.toFixed(1)}) — a log transform often helps.`, `${n} धेरै असमान छ (skew ${c.skew.toFixed(1)}) — log रूपान्तरणले प्रायः मद्दत गर्छ।`, `${n} 分布非常偏斜（偏度 ${c.skew.toFixed(1)}）——对数变换通常有帮助。`, `df[${pyStr(c.name + '_log')}] = np.log1p(df[${pyStr(c.name)}])`);
    });
    P.corr.forEach(([a, b, v]) => add(`<b>${esc(a)}</b> and <b>${esc(b)}</b> are almost identical (correlation ${v}) — you can keep just one.`, `<b>${esc(a)}</b> र <b>${esc(b)}</b> लगभग उस्तै छन् (correlation ${v}) — एउटा मात्र राखे पुग्छ।`, `<b>${esc(a)}</b> 和 <b>${esc(b)}</b> 几乎一样（相关系数 ${v}）——只保留一个即可。`));
    const numCount = P.columns.filter((c) => c.kind === 'num').length;
    if (numCount > 1) add('Numeric columns are on different scales — use StandardScaler for KNN, SVM, logistic regression and neural networks (trees don\'t need it).', 'संख्यात्मक column फरक scale मा छन् — KNN, SVM, logistic regression र न्युरल नेटवर्कका लागि StandardScaler प्रयोग गर्नुहोस् (ट्रीलाई चाहिँदैन)।', '数值列的量纲不同——KNN、SVM、逻辑回归和神经网络要用 StandardScaler 标准化（树模型不需要）。');
    if (P.rows < 300) add(`Only ${P.rows} rows — use cross-validation and simple models to avoid overfitting.`, `${P.rows} row मात्र — overfitting बाट बच्न cross-validation र सरल मोडेल प्रयोग गर्नुहोस्।`, `只有 ${P.rows} 行——用交叉验证和简单模型来避免过拟合。`);
    if (P.rows > 50000) add(`${P.rows.toLocaleString()} rows is big for a browser — the quick model samples 20,000 rows to stay fast.`, `${P.rows.toLocaleString()} row ब्राउजरका लागि ठूलो हो — छिटो होस् भनेर quick model ले २०,००० row नमुना लिन्छ।`, `${P.rows.toLocaleString()} 行对浏览器来说很大——快速模型会抽样 20,000 行以保持速度。`);
    const last = P.columns[P.columns.length - 1];
    if (last) {
      const cls = guessTask(last) === 'classification';
      add(`Possible target to predict: <b>${esc(last.name)}</b> → ${cls ? 'a classification problem' : 'a regression problem'}. Try it in "Train a model" below.`, `अनुमान गर्न सकिने target: <b>${esc(last.name)}</b> → ${cls ? 'classification समस्या' : 'regression समस्या'}। तल "मोडेल तालिम" मा प्रयास गर्नुहोस्।`, `可以预测的目标：<b>${esc(last.name)}</b> → ${cls ? '分类问题' : '回归问题'}。在下面的“训练模型”中试试。`);
    }
    return out;
  }
  const guessTask = (c) => (c.kind === 'num' && c.unique > 15 ? 'regression' : 'classification');

  // ---------- Model code generator ----------
  function modelCode(name, target, task) {
    return `import pandas as pd, numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor

df = DATA[${pyStr(name)}].copy()          # your uploaded file
target = ${pyStr(target)}
task = "${task}"                           # "classification" or "regression"

df = df.dropna(subset=[target]).drop_duplicates()
if len(df) > 20000:
    df = df.sample(20000, random_state=0)  # keep it fast in the browser
y = df[target]
X = df.drop(columns=[target])

# Drop ID-like columns and text columns with too many different values
X = X[[c for c in X.columns if not (X[c].nunique() == len(X) and not pd.api.types.is_float_dtype(X[c]))]]
X = X[[c for c in X.columns if not (X[c].dtype == object and X[c].nunique() > 50)]]
num_cols = X.select_dtypes("number").columns.tolist()
cat_cols = [c for c in X.columns if c not in num_cols]

prep = ColumnTransformer([
    ("num", Pipeline([("impute", SimpleImputer(strategy="median")), ("scale", StandardScaler())]), num_cols),
    ("cat", Pipeline([("impute", SimpleImputer(strategy="most_frequent")),
                      ("onehot", OneHotEncoder(handle_unknown="ignore"))]), cat_cols),
])
Model = RandomForestClassifier if task == "classification" else RandomForestRegressor
model = Pipeline([("prep", prep), ("model", Model(n_estimators=150, random_state=0))])

strat = y if task == "classification" and y.value_counts().min() >= 2 else None
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=0, stratify=strat)
model.fit(X_tr, y_tr)
pred = model.predict(X_te)
print(f"Rows used: {len(df)} | features: {len(num_cols)} numeric + {len(cat_cols)} categorical\\n")

if task == "classification":
    from sklearn.metrics import accuracy_score, f1_score, classification_report
    print(f"Accuracy: {accuracy_score(y_te, pred):.3f}   F1 (weighted): {f1_score(y_te, pred, average='weighted'):.3f}\\n")
    print(classification_report(y_te, pred, zero_division=0))
else:
    from sklearn.metrics import r2_score, mean_absolute_error
    print(f"R²: {r2_score(y_te, pred):.3f}   MAE: {mean_absolute_error(y_te, pred):.3f}")
    plt.figure(figsize=(5, 4))
    plt.scatter(y_te, pred, s=12, alpha=.6)
    lo, hi = min(y_te.min(), pred.min()), max(y_te.max(), pred.max())
    plt.plot([lo, hi], [lo, hi], "r--"); plt.xlabel("actual"); plt.ylabel("predicted"); plt.title("Predicted vs actual")

names = model.named_steps["prep"].get_feature_names_out()
imp = pd.Series(model.named_steps["model"].feature_importances_, index=names).sort_values().tail(15)
plt.figure(figsize=(7, 0.35 * len(imp) + 1))
imp.plot.barh(color="#6366f1"); plt.title("Most important features"); plt.tight_layout()
plt.show()`;
  }

  // ---------- View ----------
  MLS.routes.datalab = () => {
    const el = h(`<div class="wide datalab">
      <div class="page-hero data-hero"><div><h1>📊 ${u('datalab')}</h1><p>${u('dlIntro')}</p><p class="privacy">${u('dlPrivacy')}</p></div><div class="data-orbs"><i></i><i></i><i></i></div></div>
      <div class="card dl-upload">
        <label class="dropzone"><input type="file" multiple accept=".csv,.tsv,.txt,.xlsx,.xlsm,.xls,.json" hidden>
          <div class="dz-icon">📂</div><b>${u('dlDrop')}</b><span class="muted">${u('dlTypes')}</span></label>
        <div class="samples"><span>${u('dlSamples')}</span>
          <button data-s="iris">🌸 Iris</button><button data-s="nepal_houses">🏠 Nepal houses</button><button data-s="breast_cancer">🩺 Breast cancer</button><button data-s="wine">🍷 Wine</button><button data-s="diabetes">💉 Diabetes</button></div>
        <div class="dl-files"></div>
        <div class="muted small">${u('dlSessionNote')}</div>
      </div>
      <div class="dl-status"></div>
      <div class="dl-body"></div>
    </div>`);
    const input = el.querySelector('input[type=file]'), dz = el.querySelector('.dropzone'), status = el.querySelector('.dl-status'), body = el.querySelector('.dl-body'), filesEl = el.querySelector('.dl-files');
    const setStatus = (msg, cls = '') => { status.innerHTML = msg ? `<div class="dl-msg ${cls}">${msg}</div>` : ''; };

    const drawFiles = () => {
      filesEl.innerHTML = DL.files.length ? `<b>${u('dlFiles')}:</b> ` + DL.files.map((f) => `<span class="file-chip ${DL.current === f.name ? 'on' : ''}" data-n="${esc(f.name)}">📄 ${esc(f.name)} <small>${fmtBytes(f.size)}</small><button title="${u('dlRemove')}">×</button></span>`).join('') : '';
      filesEl.querySelectorAll('.file-chip').forEach((c) => {
        c.onclick = (e) => { if (e.target.tagName === 'BUTTON') return; select(c.dataset.n); };
        c.querySelector('button').onclick = async () => {
          const n = c.dataset.n; DL.files = DL.files.filter((f) => f.name !== n);
          try { const p = await py(); p.FS.unlink('/data/' + n); p.runPython(`DATA.pop(${pyStr(n)}, None)`); } catch { /* ignore */ }
          if (DL.current === n) { DL.current = null; DL.profile = null; body.innerHTML = ''; }
          drawFiles();
        };
      });
    };

    async function addFiles(list) {
      const arr = [...list];
      if (!arr.length) return;
      setStatus('⏳ ' + u('dlLoading'));
      let p;
      try { p = await py(); } catch { setStatus('⚠️ ' + u('pyFail'), 'err'); return; }
      let last = null;
      for (const f of arr) {
        if (f.size > 200e6) toast(`${f.name} ${u('dlTooBig')}`);
        const name = safeName(f.name);
        const bytes = new Uint8Array(await f.arrayBuffer());
        p.FS.writeFile('/data/' + name, bytes);
        DL.files.push({ name, size: f.size });
        last = name;
      }
      drawFiles();
      if (last) select(last);
    }

    async function addSample(kind) {
      setStatus('⏳ ' + u('dlLoading'));
      try {
        const p = await py();
        await p.loadPackage(['scikit-learn']);
        const [name, size] = JSON.parse(p.runPython(`_mls_sample(${pyStr(kind)})`));
        if (!DL.files.some((f) => f.name === name)) DL.files.push({ name, size });
        drawFiles(); select(name);
      } catch (e) { setStatus('⚠️ ' + esc(e.message), 'err'); }
    }

    async function select(name) {
      DL.current = name; drawFiles();
      setStatus('⏳ ' + u('dlReading'));
      body.innerHTML = '';
      try {
        const p = await py();
        if (/\.xls[xm]?$/i.test(name)) await p.loadPackage(['openpyxl']).catch(() => {});
        DL.profile = JSON.parse(await p.runPythonAsync(`_mls_profile(${pyStr(name)})`));
        setStatus('');
        drawBody();
      } catch (e) {
        const msg = String(e.message || e).split('\n').filter(Boolean).slice(-2).join(' ');
        setStatus(`⚠️ ${u('dlFail')}: <code>${esc(msg)}</code>`, 'err');
        MLS.lastRun = { code: `# reading ${name}`, text: '', err: msg, at: Date.now() };
      }
    }

    function drawBody() {
      const P = DL.profile;
      const totalMiss = P.columns.reduce((a, c) => a + c.missing, 0);
      const numCols = P.columns.filter((c) => c.kind === 'num');
      const opt = (cols, sel) => cols.map((c) => `<option ${c.name === sel ? 'selected' : ''}>${esc(c.name)}</option>`).join('');
      const sug = suggestions(P);
      body.innerHTML = `
        <div class="stats dl-stats">
          <div class="card stat"><b>${P.rows.toLocaleString()}</b><span>${u('dlRows')}</span></div>
          <div class="card stat"><b>${P.cols}</b><span>${u('dlCols')}</span></div>
          <div class="card stat"><b>${totalMiss.toLocaleString()}</b><span>${u('dlMissing')}</span></div>
          <div class="card stat"><b>${P.dup.toLocaleString()}</b><span>${u('dlDup')}</span></div>
          <div class="card stat"><b>${fmtBytes(P.mem)}</b><span>${u('dlMem')}</span></div>
        </div>
        <div class="card dl-sec"><h2>${u('dlSuggest')}</h2>
          <ul class="sugg">${sug.map((s, i) => `<li><span>${t(s)}</span>${s.code ? `<button class="btn ghost sm" data-i="${i}">⚡ ${t({ en: 'Apply', ne: 'लागू', zh: '应用' })}</button>` : ''}</li>`).join('')}</ul>
          <button class="btn sm ask-ai">${u('dlAskAI')}</button></div>
        <div class="card dl-sec"><h2>${u('dlColumns')}</h2><div class="table-wrap"><table class="dl-table"><tr><th>${t({ en: 'Column', ne: 'Column' })}</th><th>${t({ en: 'Type', ne: 'प्रकार' })}</th><th>${t({ en: 'Missing', ne: 'हराएको' })}</th><th>${t({ en: 'Unique', ne: 'फरक मान' })}</th><th>${t({ en: 'Summary', ne: 'सारांश' })}</th></tr>
          ${P.columns.map((c) => `<tr><td><b>${esc(c.name)}</b></td><td><span class="pill kind-${c.kind}">${c.kind}</span></td><td>${c.missing ? `<span class="miss">${((c.missing / P.rows) * 100).toFixed(1)}%</span>` : '—'}</td><td>${c.unique}</td><td class="small">${c.kind === 'num' ? `mean ${fmt(c.mean)} · min ${fmt(c.min)} · max ${fmt(c.max)}` : (c.top || []).map(([k, v]) => `${esc(k)} (${v})`).join(', ')}</td></tr>`).join('')}</table></div></div>
        <div class="card dl-sec"><h2>${u('dlPreview')}</h2><div class="table-wrap"><table class="dl-table"><tr>${P.headCols.map((c) => `<th>${esc(c)}</th>`).join('')}</tr>${P.head.map((r) => `<tr>${r.map((v) => `<td>${esc(v)}</td>`).join('')}</tr>`).join('')}</table></div></div>
        <div class="card dl-sec"><h2>${u('dlCharts')}</h2><button class="btn sm draw">📊 ${u('dlDraw')}</button><div class="charts"></div></div>
        <div class="card dl-sec"><h2>${u('dl3d')}</h2>${numCols.length >= 3 ? `
          <div class="toolbar">X <select class="x">${opt(numCols, numCols[0].name)}</select> Y <select class="y">${opt(numCols, numCols[1].name)}</select> Z <select class="z">${opt(numCols, numCols[2].name)}</select>
          ${u('dlColor')} <select class="c"><option value="">${u('dlNone')}</option>${opt(P.columns, P.columns[P.columns.length - 1].name)}</select>
          <button class="btn sm show3d">🧊 ${u('dlShow3d')}</button></div><div class="scatter-slot"></div>` : `<p class="muted">${t({ en: 'Needs at least 3 numeric columns.', ne: 'कम्तीमा ३ संख्यात्मक column चाहिन्छ।' })}</p>`}</div>
        <div class="card dl-sec"><h2>${u('dlModel')}</h2><p class="muted">${u('dlModelNote')}</p>
          <div class="toolbar">${u('dlTarget')} <select class="target">${opt(P.columns, P.columns[P.columns.length - 1].name)}</select>
          <select class="task"><option value="classification">classification</option><option value="regression">regression</option></select>
          <button class="btn sm train">${u('dlTrain')}</button></div><div class="model-slot"></div></div>
        <div class="card dl-sec"><h2>${u('dlWork')}</h2><p class="muted">${u('dlWorkNote')}</p><div class="work-slot"></div></div>`;

      // suggestions → apply code into workspace
      const work = MLS.codeBlock(`df = DATA[${pyStr(P.name)}]   # your data (also: pd.read_csv("/data/${P.name}"))\nprint(df.shape)\ndf.head()`, `${P.name} — workspace.py`);
      body.querySelector('.work-slot').appendChild(work);
      body.querySelectorAll('.sugg button').forEach((b) => (b.onclick = () => {
        const ta = work.querySelector('textarea');
        ta.value = `df = DATA[${pyStr(P.name)}]\n${sug[+b.dataset.i].code}\nDATA[${pyStr(P.name)}] = df\nprint("Done ✅ shape:", df.shape)`;
        ta.dispatchEvent(new Event('input'));
        work.scrollIntoView({ behavior: 'smooth', block: 'center' });
        toast(t({ en: 'Code added to your workspace — press ▶ Run', ne: 'कोड कार्यस्थलमा थपियो — ▶ चलाउनुहोस् थिच्नुहोस्' }));
      }));
      body.querySelector('.ask-ai').onclick = () => MLS.openTutor && MLS.openTutor(t({ en: 'Look at my dataset summary and suggest a step-by-step plan: what to clean, which features to build, which target and models to try.', ne: 'मेरो डाटासेटको सारांश हेरेर चरणबद्ध योजना सुझाउनुहोस्: के सफा गर्ने, कुन feature बनाउने, कुन target र मोडेल प्रयास गर्ने।' }));

      body.querySelector('.draw').onclick = async (e) => {
        const box = body.querySelector('.charts'); e.target.disabled = true; box.innerHTML = `<p class="muted">⏳ …</p>`;
        try {
          const p = await py(); await p.loadPackage(['matplotlib']);
          await p.runPythonAsync(`_mls_charts(${pyStr(P.name)})`);
          const imgs = JSON.parse(p.runPython('_mls_figs()'));
          box.innerHTML = imgs.map((b) => `<img src="data:image/png;base64,${b}">`).join('') || '<p class="muted">—</p>';
        } catch (err) { box.innerHTML = `<p class="err">${esc(err.message)}</p>`; }
        e.target.disabled = false;
      };

      const s3 = body.querySelector('.show3d');
      if (s3) s3.onclick = async () => {
        const g = (c) => body.querySelector('.' + c).value;
        const slot = body.querySelector('.scatter-slot');
        try {
          const p = await py();
          const d = JSON.parse(p.runPython(`_mls_xyz(${pyStr(P.name)}, ${pyStr(g('x'))}, ${pyStr(g('y'))}, ${pyStr(g('z'))}, ${g('c') ? pyStr(g('c')) : 'None'})`));
          MLS.ml3d.mount(slot, 'scatter', { ...d, names: [g('x'), g('y'), g('z'), g('c')], height: 460 });
        } catch (err) { slot.innerHTML = `<p class="err">${esc(err.message)}</p>`; }
      };

      const tsel = body.querySelector('.target'), task = body.querySelector('.task');
      const syncTask = () => { const c = P.columns.find((x) => x.name === tsel.value); task.value = guessTask(c); };
      tsel.onchange = syncTask; syncTask();
      body.querySelector('.train').onclick = () => {
        const slot = body.querySelector('.model-slot');
        slot.innerHTML = '';
        const blk = MLS.codeBlock(modelCode(P.name, tsel.value, task.value), `train_${tsel.value}.py`);
        slot.appendChild(blk);
        blk.querySelector('.run').click();
      };
    }

    const fmt = (v) => (v == null ? '—' : Math.abs(v) >= 1000 ? Math.round(v).toLocaleString() : (+v.toFixed(3)).toString());
    const S_lang = () => MLS.S.lang;

    input.onchange = () => { addFiles(input.files); input.value = ''; };
    ['dragenter', 'dragover'].forEach((ev) => dz.addEventListener(ev, (e) => { e.preventDefault(); dz.classList.add('over'); }));
    ['dragleave', 'drop'].forEach((ev) => dz.addEventListener(ev, (e) => { e.preventDefault(); dz.classList.remove('over'); }));
    dz.addEventListener('drop', (e) => addFiles(e.dataTransfer.files));
    el.querySelectorAll('.samples button').forEach((b) => (b.onclick = () => addSample(b.dataset.s)));

    drawFiles();
    if (DL.profile) requestAnimationFrame(drawBody);
    return el;
  };

  // Summary of the current dataset for the AI tutor (schema + stats only — never the raw rows).
  MLS.dataSummary = () => {
    const P = DL.profile; if (!P) return '';
    return `Dataset "${P.name}": ${P.rows} rows × ${P.cols} columns, ${P.dup} duplicate rows.\nColumns:\n` +
      P.columns.slice(0, 60).map((c) => `- ${c.name} [${c.kind}, ${c.dtype}] missing=${c.missing} unique=${c.unique}` + (c.kind === 'num' ? ` mean=${c.mean} min=${c.min} max=${c.max} skew=${(c.skew || 0).toFixed(2)}` : ` top=${(c.top || []).slice(0, 3).map((x) => x[0]).join('|')}`)).join('\n') +
      (P.corr.length ? `\nHighly correlated pairs: ${P.corr.map((x) => x.join('~')).join(', ')}` : '');
  };
})();
