import { REFERENCE_SHEET } from "./constants"

/**
 * 計画的な学習達成数まとめシートから指定されたチャレンジャー名に紐づくデータを取得する
 */
export function selectAsPlannedData (myName) {
  const asPlannedSheetValues = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(REFERENCE_SHEET.AS_PLANNED).getDataRange().getValues()
  const myData = asPlannedSheetValues.filter(row => row[0] === myName)
  return {
    studyPlanning: myData[0][9] // '平均ポイント'
  }
}

/**
 * カリキュラム外学習数まとめシートから指定されたチャレンジャー名に紐づくデータを取得する
 */
export function selectOriginalStudyData (myName) {
  const originalSheetValues = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(REFERENCE_SHEET.ORIGINAL_STUDY).getDataRange().getValues()
  const myColumnIndex = originalSheetValues[0].findIndex(column => column === myName)
  return {
    studyAutonomy: originalSheetValues[1][myColumnIndex]
  }
}

/**
 * 集いまとめシートから指定されたチャレンジャー名に紐づくデータを取得する
 */
export function selectMeetData (myName) {
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
export function selectProgressData (myName) {
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
export function selectProgressVolumeData (myName) {
  const progressSheetValues = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(REFERENCE_SHEET.PROGRESS_VOLUME).getDataRange().getValues()
  const myData = progressSheetValues.filter(row => row[0] === myName)
  return {
    resultPoint: myData[0][8] // 残数
  }
}

/**
 * 進捗率まとめ（ボリューム）シートから指定されたチャレンジャー名に紐づくデータを取得する
 */
export function selectWebapp2Status (myName) {
  const webapp2StatusSheetValues = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(REFERENCE_SHEET.WEBAPP2_STATUS).getDataRange().getValues()
  const myData = webapp2StatusSheetValues.filter(row => row[0] === myName)
  return {
    progress: myData[0][5], // 進捗率
    resultPoint: myData[0][6] // 残ボリューム
  }
}
