import axios from 'axios'
import { API_BASE_URL, MAX_CODE_LINES, MAX_CODE_CHARS } from '../utils/constants'

export interface ExplainRequest {
  code: string
  language?: string
}

export interface ExplainResponse {
  explanation: string
  tokensUsed: number
}

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
})

export async function explainCode(data: ExplainRequest): Promise<ExplainResponse> {
  const lineCount = data.code.split(/\r\n|\r|\n/).length
  const charCount = data.code.length

  if (lineCount > MAX_CODE_LINES) {
    throw new Error(`Code exceeds the maximum limit of ${MAX_CODE_LINES} lines (${lineCount} lines).`)
  }
  if (charCount > MAX_CODE_CHARS) {
    throw new Error(`Code exceeds the maximum limit of ${MAX_CODE_CHARS.toLocaleString()} characters (${charCount} characters).`)
  }

  const res = await api.post<ExplainResponse>('/api/explain', data)
  return res.data
}
