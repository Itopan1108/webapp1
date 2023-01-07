/**
 * スプレッドシートを開いた時に起動する関数
 * カスタムメニューを追加する
 */
export default function onOpen () {
  SpreadsheetApp
    .getActiveSpreadsheet()
    .addMenu("カスタムメニュー", [
      {name: "今開いてるシートのチャレンジャー記録を更新する", functionName: "updateChallengerRecordOperation"}
    ])
}
