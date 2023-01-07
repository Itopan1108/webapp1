import { SLACK_INFO } from "./constants"

/**
 * oldestTS ~ latestTS の範囲のslackメッセージを取得する
 */
export function getMessages (token, channelId, oldestTS, latestTS) {
  const URL = "https://slack.com/api/conversations.history"
  const options = {
    "method": "post",
    "payload": {
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
export function getThreads (token, channelId, ts) {
  const URL = "https://slack.com/api/conversations.replies"
  const options = {
    "method": "post",
    "payload": {
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
export function notify (message) {
    const options = {
      "method": "post",
      "contentType": "application/json",
      "payload": JSON.stringify({
        "text": message
      })
    }

    UrlFetchApp.fetch(SLACK_INFO.POST_URL, options)
}
