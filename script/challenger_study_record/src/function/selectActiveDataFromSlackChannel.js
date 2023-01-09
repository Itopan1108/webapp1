import * as slack from "../common/slack"
import { SLACK_INFO } from "../common/constants"

/**
 * notify_modern_studyチャンネルからチャレンジャー名に紐づくGitHubログ数を取得する
 */
export function selectGithubStudyCommitData (githubUserId, oldestTS, latestTS) {
  const token = SLACK_INFO.ESM_FD_TOKEN
  const channelId = SLACK_INFO.NOTIFY_MODERN_STUDY_CHANNEL_ID

  // notify_modern_studyのメッセージを取得する
  const messages = slack.getMessages(token, channelId, oldestTS, latestTS)

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
export function selectStudyChannelPostData (slackUserId, oldestTS, latestTS) {
  const token = SLACK_INFO.ESM_FD_TOKEN
  const channelId = SLACK_INFO.TEAM_MODERN_STUDY_CHANNEL_ID

  // team_modern_studyのメッセージを取得する
  const messages = slack.getMessages(token, channelId, oldestTS, latestTS)
  
  // messageがない場合は処理終了
  if (!messages?.length) {
    return { num: 0 }
  }

  // 取得したメッセージ情報にスレッド情報も加える
  let messageWithThread = []
  messages.forEach((message) => {
    const threadMessage = slack.getThreads(token, channelId, message.ts)
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
export function selectGithubReportPostData (githubUserId, oldestTS, latestTS) {
  const token = SLACK_INFO.ESM_FD_TOKEN
  const channelId = SLACK_INFO.NOTIFY_MODERN_DX_CHANNEL_ID

  // notify_modern_dxのメッセージを取得する
  const messages = slack.getMessages(token, channelId, oldestTS, latestTS)

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
