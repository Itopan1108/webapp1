import { REFERENCE_SHEET } from "../common/constants"

/**
 * 環境設定シートのデータを取得する
 */
export function selectChallengerData () {
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
export function selectUpdateSheetData (name) {
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
export function selectUpdateWebapp2SheetData(name) {
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
