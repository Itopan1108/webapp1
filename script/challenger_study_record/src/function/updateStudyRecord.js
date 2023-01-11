import {
  selectAsPlannedData,
  selectOriginalStudyData,
  selectMeetData,
  selectProgressData,
  selectProgressVolumeData,
  selectWebapp2Status
} from "./selectActiveDataFromSpreadsheet"
import {
  selectGithubStudyCommitData,
  selectStudyChannelPostData,
  selectGithubReportPostData
} from "./selectActiveDataFromSlackChannel"

/**
 * 更新対象シートを更新する
 */
export function updateChallengerRecord ({ name, githubUserId, slackUserId, lastTimeDate, thisTimeDate, lastTimeRange, thisTimeRange, isWebapp }) {
  // 各種シートからチャレンジャー名に紐づくデータを取得する
  const asPlannedData = selectAsPlannedData(name)
  const originalStudyData = selectOriginalStudyData(name)
  const meetData = selectMeetData(name)
  const progressData = selectProgressData(name)
  const progressVolumeData = selectProgressVolumeData(name)

  // Slackからメッセージを取得する範囲（タイムスタンプ）を取得する
  const oldestTS = String(lastTimeDate.getTime() / 1000) // FROM: 前回更新対象日の0時0分0秒　ミリ秒→秒
  const latestTS = String(thisTimeDate.getTime() / 1000) // TO: 更新対象日付の0時0分0秒　ミリ秒→秒

  // 各種slackチャンネルからチャレンジャー名に紐づくデータを取得する
  const githubStudyCommitData = selectGithubStudyCommitData(githubUserId, oldestTS, latestTS)
  const studyChannelPostData = selectStudyChannelPostData(slackUserId, oldestTS, latestTS)
  const githubReportPostData = selectGithubReportPostData(githubUserId, oldestTS, latestTS)

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
  updateThisTimeValues[0][12] = isWebapp ? Number(progressVolumeData.resultPoint) : '' // 実績残り課題数

  // 更新データをスプレッドシートに反映する
  thisTimeRange.setValues(updateThisTimeValues)
}

/**
 * Webアプリ開発2の更新対象シートを更新する
 */
export function updateWebapp2Record ({ name, thisTimeRange }) {
  // 各種シートからチャレンジャー名に紐づくデータを取得する
  const webapp2StatusData = selectWebapp2Status(name)

  // 更新データを作成する
  const updateThisTimeValues = thisTimeRange.getValues()
  updateThisTimeValues[0][0] = Number(webapp2StatusData.progress) // 進捗率
  updateThisTimeValues[0][1] = Number(webapp2StatusData.resultPoint) // 実績残り課題数

  // 更新データをスプレッドシートに反映する
  thisTimeRange.setValues(updateThisTimeValues)
}
