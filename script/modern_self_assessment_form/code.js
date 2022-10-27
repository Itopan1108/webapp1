// 参照先スプレッドシート
const SELF_ASSESSMENT_ID = '1SwLS5Lx0Ia6k6nIkwjhWwmR3rLdEKwiFNs70teXgeIU'
const FORM_SHEET_NAME = 'フォームの回答 1'
const SETTING_SHEET_NAME = '環境設定シート'

// メッセージ投稿情報
const POST_URL = 'https://hooks.slack.com/services/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' // 本番用（#team-fd-modern-study）
// const POST_URL = 'https://hooks.slack.com/services/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' // テスト用（マイチャンネル）

/**
 * 月初の自己評価アンケート（自己評価編）を送信するトリガー関数
 */
function sendSelfAssessmentForm1Trigger() {
  const prependBlocks = [
		{
			type: 'section',
			text: {
				type: 'mrkdwn',
				text: FORM1_MESSAGE // message.jsに定義
			}
		},
		{
			type: 'divider'
    },
		{
			type: 'section',
			text: {
				type: 'mrkdwn',
				text: '*参考: 前回のモダン自己評価結果*'
			}
		}
  ]

  // 前回の自己評価結果を取得して、メッセージに追加する
  const date = new Date()
  const lastMonth = new Date(date.getFullYear(), date.getMonth()-1, date.getDate())
  const responses = selectSelfAssessmentResponseStatus_(lastMonth)
  const middleBlocks = responses.map(response => (
		{
			type: 'section',
			text: {
				type: 'mrkdwn',
        text: response.answered
          ? `${response.name}さん \n`
            + `学習意欲 ${response.content.studyEagerness} | `
            + `オープン ${response.content.openness} | `
            + `言語力 ${response.content.language} | `
            + `主体性 ${response.content.initiative} | `
            + `協調性 ${response.content.cooperativeness}`
          : `${response.name}さん \n未回答です`
			}
		}
  ))

  const appendBlocks = [
    {
			"type": "section",
			"text": {
				"type": "mrkdwn",
        "text": "※ 前回のモダン自己評価とモダンチェックの詳細は<https://datastudio.google.com/s/rdVaSsI1-8o|モダン学習記録>をご確認ください"
			}
		}
  ]

  notifySlack_([...prependBlocks, ...middleBlocks, ...appendBlocks])

  // 次回トリガーのを設定する
  const FUNC_NAME = 'sendSelfAssessmentForm1Trigger'
  const triggerDate = makeTriggerDate_(1, 8, 30)
  deleteTrigger_(FUNC_NAME)
  setTrigger_(FUNC_NAME, triggerDate)
}

/**
 * 月中の自己評価アンケート（中間ふりかえり編）を送信するトリガー関数
 */
function sendSelfAssessmentForm2Trigger() {
  const prependBlocks = [
		{
			type: 'section',
			text: {
				type: 'mrkdwn',
				text: FORM2_MESSAGE // message.jsに定義
			}
		},
		{
			type: 'divider'
    },
		{
			type: 'section',
			text: {
				type: 'mrkdwn',
				text: '*今月のモダン自己評価がまだの方*'
			}
		}
  ]

  // 自己評価アンケート（自己評価編）の今月の回答状況を取得して、未回答者はメッセージを追加する
  const thisMonth = new Date()
  const responses = selectSelfAssessmentResponseStatus_(thisMonth)
  const noAnswer = responses.filter(response => !response.answered).map(response => response.name + 'さん').join(', ')
  const middleBlocks = [
    {
			type: 'section',
      text: {
        type: 'mrkdwn',
        text: noAnswer
          ? noAnswer + '\n<https://docs.google.com/forms/d/e/1FAIpQLSeOWzS1CjajE0oUiJhuBUGckALA6vHLF37_ZeFZHd20uNqNoQ/viewform|こちらをクリックして>ご回答ください \n'
          : 'なし'
      }
		}
  ]

  const appendBlocks = [
    {
			"type": "section",
			"text": {
				"type": "mrkdwn",
        "text": "※ ご自身で設定した改善・強化TryActionの詳細は<https://datastudio.google.com/s/rdVaSsI1-8o|モダン学習記録>をご確認ください"
			}
		}
  ]

  notifySlack_([...prependBlocks, ...middleBlocks, ...appendBlocks])
  
  // 次回トリガーのを設定する
  const FUNC_NAME = 'sendSelfAssessmentForm2Trigger'
  const triggerDate = makeTriggerDate_(14, 8, 30)
  deleteTrigger_(FUNC_NAME)
  setTrigger_(FUNC_NAME, triggerDate)
}

/**
 * 指定された年月の自己評価アンケート（自己評価編）の回答状況を返す
 */
function selectSelfAssessmentResponseStatus_(targetDate) {
  // 回答データと環境設定データを取得し、それぞれヘッダーを取り除く
  const spreadSheet = SpreadsheetApp.openById(SELF_ASSESSMENT_ID)
  const formValues = spreadSheet.getSheetByName(FORM_SHEET_NAME).getDataRange().getValues()
  const settingValues = spreadSheet.getSheetByName(SETTING_SHEET_NAME).getDataRange().getValues()
  formValues.shift()
  settingValues.shift()

  const targetResponses = formValues.filter(value =>
    value[0].getFullYear() === targetDate.getFullYear() && value[0].getMonth() === targetDate.getMonth()
  )

  return settingValues.map(value => {
    const result = {
      name: value[0],
      answered: false,
      content: {
        studyEagerness: '', // 学習意欲
        openness: '', // オープン
        language: '', // 言語力
        initiative: '', // 主体性
        cooperativeness: '' // 協調性
      }
    }

    const response = targetResponses.find(response => response[1] === value[1])
    if (response) {
      result.answered = true
      result.content.studyEagerness = response[2]
      result.content.openness = response[4]
      result.content.language = response[6]
      result.content.initiative = response[8]
      result.content.cooperativeness = response[10]
    }

    return result
  })
}

/**
 * Slackにメッセージを送信する
 */
function notifySlack_ (blocks) {
    const options = {
      'method': 'post',
      'contentType': 'application/json',
      'payload': JSON.stringify({
        'blocks': blocks
      })
    }

    UrlFetchApp.fetch(POST_URL, options)
}

/**
 * 翌月の指定した日付（休日の場合、翌営業日）、時間のDateオブジェクトを返す
 */
function makeTriggerDate_(day, hour, minute){
  const tempDay = new Date()
  const triggerDate = calcLastBusinessNextDate_(new Date(tempDay.getFullYear(), tempDay.getMonth() + 1, day))
  triggerDate.setHours(hour)
  triggerDate.setMinutes(minute)

  return triggerDate
}

/**
 * 指定した日の翌営業日を算出する
 */
function calcLastBusinessNextDate_(date){
  // 日本の祝日カレンダーを取得
  const calJa = CalendarApp.getCalendarById('ja.japanese#holiday@group.v.calendar.google.com')
 
  // 最終営業日に月末日を代入し、曜日・祝日該当を判定していく
  let businessNextDate = new Date(date)
  for (let i = 1; i < 30; i++) {
    // 月末日の曜日を判定して平日かつ祝日に該当しない場合は最終営業日とする。
    // getDay()メソッド：日曜日を0として土曜日6まで数値を返す
    const dayOWeek = businessNextDate.getDay()
 
    // 条件分岐で日曜日・土曜日・日本の祝日の該当日であった場合は1日翌日にずらす
    if (dayOWeek == 0 || dayOWeek == 6 || calJa.getEventsForDay(businessNextDate).length > 0) {
      businessNextDate.setDate(businessNextDate.getDate() + 1);
      continue
    }
    break
  }
  return businessNextDate //例：Mon May 31 2021 00:00:00 GMT+0900 (Japan Standard Time)
}

/**
 * トリガーを設定する
 */
function setTrigger_(func, triggerDate) {
  ScriptApp.newTrigger(func).timeBased().at(triggerDate).create()
}

/**
 * トリガーを削除する
 */
function deleteTrigger_(func) {
  // このプロジェクトで設定しているトリガーを配列で取得する
  const triggers = ScriptApp.getProjectTriggers();
  
  // 配列を1要素ずつチェックし、実行する関数名が指定されたfuncと同一の場合トリガーを削除する
  for(let i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() == func) {
      ScriptApp.deleteTrigger(triggers[i])
    }
  }
}
