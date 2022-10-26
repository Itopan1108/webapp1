
-----
# 技術転換情報

## モダンエンジニアになるための全体的な流れ
- [モダンエンジニアへの道](https://docs.google.com/presentation/d/1cJT-hhNlNq-SFGlPhizejXfNSMBD4hstDt4jO_PCoKQ/edit?usp=sharing)

### 学習フォルダ
- [学習フォルダ@41期](https://drive.google.com/drive/u/0/folders/1qMwGp39L6IWvZBoF6BsAyAMdNJV1OeiE) 
- [学習フォルダ@42期以降](https://drive.google.com/drive/u/0/folders/0ABcZ66YhkvFJUk9PVA)

### 学習状況
- [チャレンジャーの学習状況サマリー](https://docs.google.com/spreadsheets/d/1VEgibQc-pAnlCZaYIv9VoWOMahq2WRImBpO_-Jgvtaw/edit?usp=sharing)

### モダンカリキュラム
- [スキル面カリキュラム](https://docs.google.com/spreadsheets/d/15njtmCsgODhFG3TSwEB_N-qT0-iwIuoWflLp_v5NPXI/edit?usp=sharing)
- [マインド面カリキュラム](https://docs.google.com/spreadsheets/d/1Jkz-43CWY_7l72POo_0Pc-cod1Tdm1OqJxEwJAKrmVc/edit?usp=sharing)
- [モダンチェックについて](https://docs.google.com/document/d/1ggqnW_cnbeb6p0KLCFqINRBpCDdDVSI9DP9jEgxqaNM/edit?usp=sharing)
- [学習スケジュール_テンプレート](https://docs.google.com/spreadsheets/d/1ji-aAjG6m9Nnvg7szjUQmHV-zsZpt_auAoCJbVKqCZo/edit?usp=sharing)

## 現在のモダン界隈メンバー

|  No  |  Name  |  モダンエンジニア  |  技術転換者  |  技術転換候補者  |  モダンチャレンジャ  |  備考  |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- |
|  01  |  橋本 雄一  |  ✔︎  |  -  |  -  |  -  |    |
|  02  |  山下 満里子  |  ✔︎  |  -  |  -  |  -  |    |
|  03  |  櫛村仁志  |  ✔︎  |  -  |  -  |  -  |    |
|  04  |  山川 宏賢  |  ✔︎  |  -  |  -  |  -  |    |
|  05  |  竹田 尚子  |  ✔︎  |  -  |  -  |  -  |    |
|  06  |  牧野 泰山  |  ✔︎  |  -  |  -  |  -  |    |
|  07  |  田中 みつき  |  -  |  ✔︎  |  -  |  -  |    |
|  08  |  柳原 麻里  |  -  |  ✔︎  |  -  |  -  |    |
|  09  |  豊岡 久実  |  -  |  ✔︎  |  -  |  -  |    |
|  10  |  三田村 岳周  |  -  |  ✔︎  |  -  |  -  |    |
|  11  |  見澤 久美子  |  -  |  ✔︎  |  -  |  -  |    |
|  12  |  森竹 理加  |  -  |  ✔︎  |  -  |  -  |    |
|  13  |  宮川 正和  |  -  |  -  |  -  |  ✔︎  |    |
|  14  |  嶋田 久美子  |  -  |  -  |  -  |  ✔︎  |    |
|  15  |  横山 宏明  |  -  |  -  |  -  |  ✔︎  |    |
|  16  |  西埜 明  |  -  |  -  |  -  |  ✔︎  |    |
|  17  |  松尾 啓  |  -  |  -  |  -  |  ✔︎  |  *1  |
|  18  |  帆谷 顕司  |  -  |  -  |  -  |  ✔︎  |  *1  |
|  19  |  野瀬 奈美  |  -  |  -  |  -  |  ✔︎  |    |

*1 役割的に調整に時間が必要そう

-----
# チャレンジャー学習で利用可能なCloudSQL@GCP関連情報
## プロジェクト情報
- プロジェクト名: ESM-GCP-STUDY
- プロジェクトID: esm-gcp-study
- URL: https://console.cloud.google.com/home/dashboard?project=esm-gcp-study&hl=ja&orgonly=true&supportedpurview=organizationId

## 紐付くオーナー情報
- アカウントID: fd-learning@esm.co.jp
- パスワード: fd-learning1101
- 支払先カード: 山川宏賢の社用カード

## インスタンスをCLIで起動・停止する方法
1. `gcloud config list` を実行する
2. account = h-yamakawa@esm.co.jp or fd-learning@esm.co.jp じゃない場合は `gcloud auth login` を実行する
3. project = esm-gcp-study じゃない場合は `gcloud config set project esm-gcp-study` を実行する
4. いずれかを実行する
  - 起動する場合は `gcloud sql instances patch modern-study --activation-policy=ALWAYS` を実行する
  - 停止する場合は `gcloud sql instances patch modern-study --activation-policy=NEVER` を実行する

-----
# その他情報

## モダン関連イベント参加状況
- https://docs.google.com/spreadsheets/d/1D5QsonPehJggw8k0pjhe17jPTPRPXZFexxPtek8bHfk/edit?usp=sharing

## ITS新入社員教育カリキュラム
- https://docs.google.com/spreadsheets/d/1b4wyLE-P7hQFh1ZakeEJffkeCIM8sz--I7o_YiMLu6g/edit#gid=1630613457
