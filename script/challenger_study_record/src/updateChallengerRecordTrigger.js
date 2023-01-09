import * as slack from "./common/slack"
import {
  selectChallengerData,
  selectUpdateSheetData,
  selectUpdateWebapp2SheetData
} from "./function/selectSettingDataFromSpreadsheet"
import {
  updateChallengerRecord,
  updateWebapp2Record
} from "./function/updateStudyRecord"

/**
 * トリガーで実行する関数
 * 全てのチャレンジャーシートの該当日付データに集計したデータを貼り付ける
 */
export default function updateChallengerRecordTrigger () {
  try {
    // 環境設定シートからデータを取得する
    const challengerData = selectChallengerData()

    // challengerDataを元に各チャレンジャーごとにシートを更新する
    for (const challenger of challengerData) {
      // 更新対象シートの諸々のデータを取得する
      const updateSheetData = selectUpdateSheetData(challenger.name)

      // 開いているシートが各チャレンジャーシート以外の場合は処理を終了する
      if (!challengerData.some(challenger => challenger.name === updateSheetData.name)) {
        throw new Error(`チャレンジャーシート以外のシートで処理が実行されました シート名: ${challenger.name}`)
      }

      // 更新する範囲にすでに値が入っていないか事前チェックする
      const alreadySetValueNum = updateSheetData.thisTimeRange.getValues()[0].reduce((pre, cur) => {
        cur !== "" && pre++
        return pre
      }, 0)
      if (alreadySetValueNum > 0) {
        throw new Error(`更新行にすでに何か値が設定されています シート名: ${challenger.name}`)
      }

      // 更新対象シートを更新する
      const githubUserId = challenger.githubUserId
      const slackUserId = challenger.slackUserId
      updateChallengerRecord({ ...updateSheetData, githubUserId, slackUserId })

      // Webアプリ開発2の学習記録更新対象者の場合のみ更新する
      if (challenger.isWebapp2) {
        const updateWebapp2SheetData = selectUpdateWebapp2SheetData(challenger.name)
        updateWebapp2Record(updateWebapp2SheetData)
      }
    }

    // team_modern_studyチャンネルに完了メッセージを投稿する
    let message = "<!channel> \n\n"
    message += "チャレンジャーの学習記録を更新したよっ\n"
    message += "みんな見てみてね :baby_chick:\n"
    message += "\n"
    message += "https://datastudio.google.com/s/rdVaSsI1-8o\n"
    slack.notify(message)
  } catch (e) {
    // team_modern_studyチャンネルにエラーメッセージを投稿する
    let message = "チャレンジャーの学習記録を更新しようとしたらエラーが発生したよっ :cry:\n"
    message += e
    slack.notify(message)
  }
}
