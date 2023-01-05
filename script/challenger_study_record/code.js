// 参照しているシート名
const REFERENCE_SHEET = {
  AS_PLANNED: '計画的な学習達成数まとめ',
  ORIGINAL_STUDY: 'カリキュラム外学習数まとめ',
  MEET: '集いまとめ',
  PROGRESS: '進捗率まとめ',
  PROGRESS_VOLUME: '進捗率まとめ（ボリューム）',
  WEBAPP2_STATUS: 'Webアプリ開発2状況まとめ',
  SETTING: '環境設定シート'
}

//Slack関連情報
// メッセージ取得情報
const ESM_FD_TOKEN = "xoxp-3963306992470-4007513038819-4119166819828-1fcf363207500ce1e830678cbecfaf40"
const NOTIFY_MODERN_STUDY_CHANNEL_ID = "C042NE3A2NS"
const TEAM_MODERN_STUDY_CHANNEL_ID = "C042V2TBNTC"
const NOTIFY_MODERN_DX_CHANNEL_ID = "C042V2T9GLA"
// メッセージ投稿情報
const POST_URL = 'https://hooks.slack.com/services/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'

/**
 * スプレッドシートを開いた時に起動する関数
 * カスタムメニューを追加する
 */
function onOpen () {
  SpreadsheetApp
    .getActiveSpreadsheet()
    .addMenu("カスタムメニュー", [
      {name: "今開いてるシートのチャレンジャー記録を更新する", functionName: "updateChallengerRecordOperation"}
    ])
}

/**
 * トリガーで実行する関数
 * 全てのチャレンジャーシートの該当日付データに集計したデータを貼り付ける
 */
export function updateChallengerRecordTrigger () {
  try {
    // 環境設定シートからデータを取得する
    const challengerData = selectChallengerData_()

    // challengerDataを元に各チャレンジャーごとにシートを更新する
    for (challenger of challengerData) {
      // 更新対象シートの諸々のデータを取得する
      const updateSheetData = selectUpdateSheetData_(challenger.name)

      // 開いているシートが各チャレンジャーシート以外の場合は処理を終了する
      if (!challengerData.some(challennger => challennger.name === updateSheetData.name)) {
        throw new Error(`チャレンジャーシート以外のシートで処理が実行されました シート名: ${challenger.name}`)
      }

      // 更新する範囲にすでに値が入っていないか事前チェックする
      const alreadySetValueNum = updateSheetData.thisTimeRange.getValues()[0].reduce((pre, cur) => {
        cur !== '' && pre++
        return pre
      }, 0)
      if (alreadySetValueNum > 0) {
        throw new Error(`更新行にすでに何か値が設定されています シート名: ${challenger.name}`)
      }

      // 更新対象シートを更新する
      const githubUserId = challenger.githubUserId
      const slackUserId = challenger.slackUserId
      updateChallengerRecord_({ ...updateSheetData, githubUserId, slackUserId })

      // Webアプリ開発2の学習記録更新対象者の場合のみ更新する
      if (challenger.isWebapp2) {
        const updateWebapp2SheetData = selectUpdateWebapp2SheetData_(challenger.name)
        updateWebapp2Record_(updateWebapp2SheetData)
      }
    }

    // team_modern_studyチャンネルに完了メッセージを投稿する
    let message = "<!channel> \n\n"
    message += "チャレンジャーの学習記録を更新したよっ\n"
    message += "みんな見てみてね :baby_chick:\n"
    message += "\n"
    message += "https://datastudio.google.com/s/rdVaSsI1-8o\n"
    notifySlack_(message)
  } catch {
    // team_modern_studyチャンネルにエラーメッセージを投稿する
    let message = "チャレンジャーの学習記録を更新しようとしたらエラーが発生したよっ :cry:\n"
    message += "エラーになったシート名: " + challenger.name
    notifySlack_(message)
  }
}

/**
 * スプレッドシートを開いて実行する関数
 * 1つのチャレンジャーシートの該当日付データに集計したデータを貼り付ける
 */
function updateChallengerRecordOperation() {
  // 環境設定シートからデータを取得する
  const challengerData = selectChallengerData_()

  // 更新対象シートの諸々のデータを取得する
  const updateSheetData = selectUpdateSheetData_(SpreadsheetApp.getActiveSheet().getName())

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
  updateChallengerRecord_({ ...updateSheetData, githubUserId, slackUserId })

  // Webアプリ開発2の学習記録更新対象者の場合のみ更新する
  const isWebapp2 = challengerData.find(challenger => challenger.name === updateSheetData.name).isWebapp2
  if (isWebapp2) {
    const updateWebapp2SheetData = selectUpdateWebapp2SheetData_(updateSheetData.name)
    updateWebapp2Record_(updateWebapp2SheetData)
  }
}

/**
 * 環境設定シートのデータを取得する
 */
function selectChallengerData_ () {
  // 環境設定シートを取得し、ヘッダーを取り除く
  const settingSheetValues = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(REFERENCE_SHEET.SETTING).getDataRange().getValues()
  settingSheetValues.shift()

  return settingSheetValues.map(setting => {
    return {
      name: setting[0],
      githubUserId: setting[1],
      slackUserId: setting[2],
      isWebapp2: setting[3]
    }
  })
}

/**
 * 更新対象シートの諸々のデータを取得する
 */
function selectUpdateSheetData_ (name) {
  // 開いているシートとシート名を取得する
  const mySheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name)
  const mySheetValues = mySheet.getDataRange().getValues()

  // データがなかったら処理終了する
  if (!(mySheetValues.length > 1 || mySheetValues[0].length > 1)) {
    return {
      name: mySheet.getName(),
      lastTimeDate: null,
      thisTimeDate: null,
      lastTimeRange: null,
      thisTimeRange: null
    }
  }

  // 更新する学習記録範囲を特定する
  const updateRowNum = 1
  const updateRow = mySheetValues.findIndex(row => row[0] > new Date())
  const updateColumn = 2 // 計画的な学習達成数から
  const updateNumColumn = mySheetValues[0].length - 6 // 実績残り課題数まで

  return {
    name: mySheet.getName(),
    lastTimeDate: mySheetValues[updateRow - 2][0],
    thisTimeDate: mySheetValues[updateRow - 1][0],
    lastTimeRange: mySheet.getRange(updateRow - 1, updateColumn, updateRowNum, updateNumColumn),
    thisTimeRange: mySheet.getRange(updateRow, updateColumn, updateRowNum, updateNumColumn)
  }
}

/**
 * Webアプリ開発2の更新対象シートの諸々のデータを取得する
 */
function selectUpdateWebapp2SheetData_(name) {
  // 開いているシートとシート名を取得する
  const mySheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(`${name}_Web2`)
  const mySheetValues = mySheet.getDataRange().getValues()

  // データがなかったら処理終了する
  if (!(mySheetValues.length > 1 || mySheetValues[0].length > 1)) {
    return {
      name,
      thisTimeRange: null
    }
  }

  // 更新する学習記録範囲を特定する
  const updateRowNum = 1
  const updateRow = mySheetValues.findIndex(row => row[0] > new Date())
  const updateColumn = 2 // 進捗率から
  const updateNumColumn = mySheetValues[0].length - 6 // 実績残り課題数まで

  return {
    name,
    thisTimeRange: mySheet.getRange(updateRow, updateColumn, updateRowNum, updateNumColumn)
  }
}

/**
 * 更新対象シートを更新する
 */
function updateChallengerRecord_ ({ name, githubUserId, slackUserId, lastTimeDate, thisTimeDate, lastTimeRange, thisTimeRange }) {
  // 各種シートからチャレンジャー名に紐づくデータを取得する
  const asPlannedData = selectAsPlannedData_(name)
  const originalStudyData = selectOriginalStudyData_(name)
  const meetData = selectMeetData_(name)
  const progressData = selectProgressData_(name)
  const progressVolumeData = selectProgressVolumeData_(name)

  // Slackからメッセージを取得する範囲（タイムスタンプ）を取得する
  const oldestTS = String(lastTimeDate.getTime() / 1000) // FROM: 前回更新対象日の0時0分0秒　ミリ秒→秒
  const latestTS = String(thisTimeDate.getTime() / 1000) // TO: 更新対象日付の0時0分0秒　ミリ秒→秒

  // 各種slackチャンネルからチャレンジャー名に紐づくデータを取得する
  const githubStudyCommitData = selectGithubStudyCommitData_(githubUserId, oldestTS, latestTS)
  const studyChannelPostData = selectStudyChannelPostData_(slackUserId, oldestTS, latestTS)
  const githubReportPostData = selectGithubReportPostData_(githubUserId, oldestTS, latestTS)

  // 更新データを作成する
  const updateLastTimeValues = lastTimeRange.getValues()
  const updateThisTimeValues = thisTimeRange.getValues()
  updateThisTimeValues[0][0] = Number(asPlannedData.studyPlanning) // 計画的な学習達成数
  updateThisTimeValues[0][1] = Number(originalStudyData.studyAutonomy) // カリキュラム外学習数
  updateThisTimeValues[0][2] = Number(githubStudyCommitData.num) + updateLastTimeValues[0][2] // 学習リポジトリコミット数@GitHub
  updateThisTimeValues[0][3] = Number(meetData.meetJoin)// 集い参加回数
  updateThisTimeValues[0][4] = Number(meetData.meetFacilitation)// 集いファシリ回数
  updateThisTimeValues[0][5] = Number(studyChannelPostData.num) + updateLastTimeValues[0][5] // StudyChannel登場数@slack
  updateThisTimeValues[0][6] = Number(githubReportPostData.num) + updateLastTimeValues[0][6] // ふりかえり報告数@GitHub
  updateThisTimeValues[0][7] = Number(progressData.gasEdu)// GAS-EDU
  updateThisTimeValues[0][8] = Number(progressData.github)// GitHub
  updateThisTimeValues[0][9] = Number(progressData.unixLinux)// UNIX/Linux
  updateThisTimeValues[0][10] = Number(progressData.npm)// npm
  updateThisTimeValues[0][11] = Number(progressData.webApp)// WebApp
  updateThisTimeValues[0][12] = Number(progressVolumeData.resultPoint)// 実績残り課題数

  // 更新データをスプレッドシートに反映する
  thisTimeRange.setValues(updateThisTimeValues)
}

/**
 * Webアプリ開発2の更新対象シートを更新する
 */
function updateWebapp2Record_({ name, thisTimeRange }) {
  // 各種シートからチャレンジャー名に紐づくデータを取得する
  const webapp2StatusData = selectWebapp2Status_(name)

  // 更新データを作成する
  const updateThisTimeValues = thisTimeRange.getValues()
  updateThisTimeValues[0][0] = Number(webapp2StatusData.progress) // 進捗率
  updateThisTimeValues[0][1] = Number(webapp2StatusData.resultPoint) // 実績残り課題数

  // 更新データをスプレッドシートに反映する
  thisTimeRange.setValues(updateThisTimeValues)
}

/**
 * 計画的な学習達成数まとめシートから指定されたチャレンジャー名に紐づくデータを取得する
 */
function selectAsPlannedData_ (myName) {
  const asPlannedSheetValues = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(REFERENCE_SHEET.AS_PLANNED).getDataRange().getValues()
  const myData = asPlannedSheetValues.filter(row => row[0] === myName)
  return {
    studyPlanning: myData[0][9] // '平均ポイント'
  }
}

/**
 * カリキュラム外学習数まとめシートから指定されたチャレンジャー名に紐づくデータを取得する
 */
function selectOriginalStudyData_ (myName) {
  const originalSheetValues = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(REFERENCE_SHEET.ORIGINAL_STUDY).getDataRange().getValues()
  const myColumnIndex = originalSheetValues[0].findIndex(column => column === myName)
  return {
    studyAutonomy: originalSheetValues[1][myColumnIndex]
  }
}

/**
 * 集いまとめシートから指定されたチャレンジャー名に紐づくデータを取得する
 */
function selectMeetData_ (myName) {
  const meetSheetValues = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(REFERENCE_SHEET.MEET).getDataRange().getValues()
  const myData = meetSheetValues.filter(row => row[0] === myName)
  return {
    meetJoin: myData[0][1],
    meetFacilitation: myData[0][2]
  }
}

/**
 * 進捗率まとめシートから指定されたチャレンジャー名に紐づくデータを取得する
 */
function selectProgressData_ (myName) {
  const progressSheetValues = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(REFERENCE_SHEET.PROGRESS).getDataRange().getValues()
  const myData = progressSheetValues.filter(row => row[0] === myName)
  return {
    gasEdu: myData[0][1], // GAS-EDU
    github: myData[0][2] + myData[0][3], // GitHub, GIT-EDUのどちらか1つしかやらないため
    unixLinux: myData[0][4], // UNIX/Linux
    npm: myData[0][5], // npm
    webApp: myData[0][6], // Webアプリ開発
  }
}

/**
 * 進捗率まとめ（ボリューム）シートから指定されたチャレンジャー名に紐づくデータを取得する
 */
 function selectProgressVolumeData_ (myName) {
  const progressSheetValues = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(REFERENCE_SHEET.PROGRESS_VOLUME).getDataRange().getValues()
  const myData = progressSheetValues.filter(row => row[0] === myName)
  return {
    resultPoint: myData[0][8] // 残数
  }
 }


/**
 * 進捗率まとめ（ボリューム）シートから指定されたチャレンジャー名に紐づくデータを取得する
 */
 function selectWebapp2Status_ (myName) {
  const webapp2StatusSheetValues = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(REFERENCE_SHEET.WEBAPP2_STATUS).getDataRange().getValues()
  const myData = webapp2StatusSheetValues.filter(row => row[0] === myName)
  return {
    progress: myData[0][5], // 進捗率
    resultPoint: myData[0][6] // 残ボリューム
  }
}

/**
 * notify_modern_studyチャンネルからチャレンジャー名に紐づくGitHubログ数を取得する
 */
function selectGithubStudyCommitData_ (githubUserId, oldestTS, latestTS) {
  // notify_modern_studyのメッセージを取得する
  const messages = getMessageAtSlack_(ESM_FD_TOKEN, NOTIFY_MODERN_STUDY_CHANNEL_ID, oldestTS, latestTS)

  // messageがない場合は処理終了
  if (!messages?.length) {
    return { num: 0 }
  }

  // GitHubアクティビティのカウント数を返す
  return {
    num: messages
      .filter(message => message.bot_profile?.name === "GitHub")
      .filter(message => message.attachments?.[0].fallback.includes(`by ${githubUserId}`))
      .length
  }
}

/**
 * team_modern_studyチャンネルからチャレンジャー名に紐づくメッセージ投稿数を取得する
 */
function selectStudyChannelPostData_ (slackUserId, oldestTS, latestTS) {
  // team_modern_studyのメッセージを取得する
  const messages = getMessageAtSlack_(ESM_FD_TOKEN, TEAM_MODERN_STUDY_CHANNEL_ID, oldestTS, latestTS)
  
  // messageがない場合は処理終了
  if (!messages?.length) {
    return { num: 0 }
  }

  // 取得したメッセージ情報にスレッド情報も加える
  let messageWithThread = []
  messages.forEach((message) => {
    const threadMessage = getThreadAtSlack_(ESM_FD_TOKEN, TEAM_MODERN_STUDY_CHANNEL_ID, message.ts)
    messageWithThread = messageWithThread.concat(threadMessage)
  })

  // slackへの投稿数カウントする
  return {
    num:  messageWithThread.filter(message => message.user === slackUserId).length
  }
}

/**
 * notify_modern_dxチャンネルからチャレンジャー名に紐づくGitHubログ数を取得する
 */
function selectGithubReportPostData_ (githubUserId, oldestTS, latestTS) {
  // notify_modern_dxのメッセージを取得する
  const messages = getMessageAtSlack_(ESM_FD_TOKEN, NOTIFY_MODERN_DX_CHANNEL_ID, oldestTS, latestTS)

  // messageがない場合は処理終了
  if (!messages?.length) {
    return { num: 0 }
  }

  // GitHubアクティビティのカウント数を返す
  return {
    num: messages
      .filter(message => message.bot_profile?.name === "GitHub")
      .filter(message => message.attachments?.[0].pretext.startsWith("New issue created") || message.attachments?.[0].pretext.startsWith("New comment on issue"))
      .filter(message => message.attachments?.[0].pretext.includes(githubUserId))
      .length
  }
}

/**
 * oldestTS ~ latestTS の範囲のslackメッセージを取得する
 */
function getMessageAtSlack_ (token, channelId, oldestTS, latestTS) {
  const URL = "https://slack.com/api/conversations.history"
  const options = {
    'method': 'post',
    'payload': {
      "token": token,
      "channel": channelId,
      "oldest": oldestTS,
      "latest": latestTS,
      "limit": "1000"
    }
  }
  
  // 投稿データを取得
  const response = UrlFetchApp.fetch(URL, options)
  return JSON.parse(response).messages
}

/**
 * 指定されたtsに紐づくスレッド情報を取得する
 */
function getThreadAtSlack_ (token, channelId, ts) {
  const URL = "https://slack.com/api/conversations.replies"
  const options = {
    'method': 'post',
    'payload': {
      "token": token,
      "channel": channelId,
      "ts": ts
    }
  }
  
  // 投稿データを取得
  const response = UrlFetchApp.fetch(URL, options)
  return JSON.parse(response).messages
}

/**
 * Slackにメッセージを送信する
 */
function notifySlack_ (message) {
    const options = {
      "method": "post",
      "contentType": "application/json",
      "payload": JSON.stringify({
        "text": message
      })
    }

    UrlFetchApp.fetch(POST_URL, options)
}

/**
 * シート名を取得する（スプレッドシートのセル内で使用する関数）
 */
function sheetName() {
  return SpreadsheetApp.getActiveSheet().getName();
}
