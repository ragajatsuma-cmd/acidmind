<div align="center">
  <h1>🧪 AcidMind</h1>
  <p><strong>日本語ドキュメント</strong> ·
    <a href="../../README.md">English</a> |
    <a href="README.ko.md">한국어</a> |
    <a href="README.zh-CN.md">简体中文</a> |
    <a href="README.pt-BR.md">Português</a> |
    <a href="README.es.md">Español</a>
  </p>
</div>

# AcidMind

AIコーディングエージェントのための8つの専門批評スキル。1つのルーター。凡庸なレビューはゼロ。

レンズなしでコードをレビューするAIエージェントは、いつも同じ無難な段落を出力します：称賛、些細な指摘数件、曖昧な締め。AcidMindは、あなたが本当に聞きたかった質問に答えるスペシャリストでそれを置き換えます。アーキテクチャの懸念にはアーキテクチャレビューを、機能には空状態を含む実ユーザー視点の検証を、リリース前のアプリには実際の攻撃者のように攻撃し、ハードニング計画と共に返却します。

すべてのレビューは、機械的に導出された一行の判定で終わります：

> **Gate: SHIP | FIX FIRST | DO NOT SHIP**

スキルは必要なときだけロードされます。コードレビューに必要なコンテキストは5ファイル分のみです。

## スキルファミリー

| スキル | ペルソナ | 答える問い | コマンド |
|---|---|---|---|
| `ruthless-critic` | 🧪 酸のテスト（ROAST / AUTOPSY / HONEST レジスタ） | このアーティファクトは具体的にどこで壊れるか？ | `/grill-me`, `/autopsy`, `/tellingtruth`, `/honest` |
| `design-critic` | 🧠 設計者 | この構造は次の3つの要件変更に耐えられるか？ | `/designcritic` |
| `feature-critic` | 🔪 解剖者 | この機能は全状態で実ユーザーに動作するか？ | `/featurecritic` |
| `badass-critic` | 💻 パフォーマンスエンジニア | どの負荷で、どう測って限界か？ | `/badass` |
| `security-critic` | 😠🥷 インシデント指揮官 + 雇われ攻撃者（Protocol A 災害シミュレーション / Protocol B レッドチーム） | 何が致命的に破綻しうるか？誰がどう侵入するか？ | `/heartattack`, `/blackhat`, `/pentest` |
| `autocritic-skill` | 🎭 監査人 | このSKILL.mdは正しく発火し有用な出力を出すか？ | `/auditskill` |
| `unified-critic` | 🧩 パネル進行役 | 全レンズの所見を1つの報告書に統合すると？ | `/acidmind` |
| `secondthought-critic` | 🤔 実行直前のブレーキ | **毎セッション自動ロード:** 意見や計画を言うと、エージェントが実行する前に批評します | 自動, `/wait` |

共通する3つの性質：デフォルトで読み取り専用 · スコープは重複しない · 目的ゲート（目的なき手法こそが所見）。

## クイックスタート

```bash
npx github:ragajatsuma-cmd/acidmind init                    # core（5スキル）
npx github:ragajatsuma-cmd/acidmind init --edition security # + security-critic（6）
npx github:ragajatsuma-cmd/acidmind init --all              # full（8）
```

Claude Code プラグイン：

```bash
/plugin marketplace add https://github.com/ragajatsuma-cmd/acidmind
/plugin install acidmind@acidmind
```

アップデート：

```bash
npx github:ragajatsuma-cmd/acidmind status   # インストール済み vs 最新
npx github:ragajatsuma-cmd/acidmind update   # 自動更新
```

## 責任ある利用

`security-critic` Protocol B は、ユーザーが所有または書面による許可を得たターゲットのみを攻撃します。それ以外は拒否します。実行可能なエクスプロイトを作成せず、インストール済みの Strix/Wallbreaker エージェントを通してのみ委譲します。残り7スキルは、明示的な依頼がない限り純粋な読み取り専用診断ツールです。

## ライセンス

MIT — [LICENSE](../../LICENSE) を参照。
