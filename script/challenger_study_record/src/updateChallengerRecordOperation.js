import {
  selectChallengerData,
  selectUpdateSheetData,
  selectUpdateWebapp2SheetData
} from './selectSettingDataFromSpreadsheet'
import {
  updateChallengerRecord,
  updateWebapp2Record
} from './updateStudyRecord'

/**
 * スプレッドシートを開いて実行する関数
 * 1つのチャレンジャーシートの該当日付データに集計したデータを貼り付ける
 */
export function updateChallengerRecordOperation() {
  // 環境設定シートからデータを取得する
  const challengerData = selectChallengerData()

  // 更新対象シートの諸々のデータを取得する
  const updateSheetData = selectUpdateSheetData(SpreadsheetApp.getActiveSheet().getName())

  // 開いているシートが各チャレンジャーシート以外の場合は処理を終了する
  if (!challengerData.some(challennger => challennger.name === updateSheetData.name)) {
    Browser.msgBox('このシートでは実行できません。\\n各チャレンジャーシートで実行してください。')
    return
  }

  // 更新対象の確認ダイアログを表示する
  const updateDate = Utilities.formatDate(updateSheetData.thisTimeDate, "JST", "yyyy/MM/dd")
  if (Browser.msgBox(`${updateDate} 分のデータを更新しますが、更新対象合ってますか？`, Browser.Buttons.OK_CANCEL) === 'cancel') {
    return
  }

  // 更新する範囲にすでに値が入っていないか事前チェックする
  const alreadySetValueNum = updateSheetData.thisTimeRange.getValues()[0].reduce((pre, cur) => {
    cur !== '' && pre++
    return pre
  }, 0)
  if (alreadySetValueNum > 0) {
    Browser.msgBox('すでに何か値が設定されていそうなので、\\n更新したいならB列からN列は未入力状態にしてください。')
    return
  }

  // 更新対象シートを更新する
  const githubUserId = challengerData.find(challenger => challenger.name === updateSheetData.name).githubUserId
  const slackUserId = challengerData.find(challenger => challenger.name === updateSheetData.name).slackUserId
  updateChallengerRecord({ ...updateSheetData, githubUserId, slackUserId })

  // Webアプリ開発2の学習記録更新対象者の場合のみ更新する
  const isWebapp2 = challengerData.find(challenger => challenger.name === updateSheetData.name).isWebapp2
  if (isWebapp2) {
    const updateWebapp2SheetData = selectUpdateWebapp2SheetData(updateSheetData.name)
    updateWebapp2Record(updateWebapp2SheetData)
  }
}
