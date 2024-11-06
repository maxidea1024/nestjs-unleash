export interface GetFeaturesResponse {
  version: number
  features: Feature[]
}

// TODO: parent features

export interface Feature {
  name: string
  description: string
  enabled: boolean
  strategies: Strategy[]
  createdAt: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  variants: any

  type?: string
  stale?: boolean
  strategy?: string
  parameters?: Parameters
}

export interface Strategy {
  name: string
  parameters: Parameters
}

export interface Parameters {
  [name: string]: string | number
}
