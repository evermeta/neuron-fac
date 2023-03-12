export const addSessionVariable = (sessionInfo, key, value) => {
  sessionInfo.parameters[key] = value
}

export const strWebhookAnswer = outputParameters => {
  return JSON.stringify({
    sessionInfo: {
      parameters: outputParameters
    }
  })
}
