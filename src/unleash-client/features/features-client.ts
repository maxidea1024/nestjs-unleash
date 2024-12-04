import { Injectable } from '@nestjs/common'
import type { UnleashClient } from '../unleash-client'
import type { GetFeaturesResponse } from './features-client.interfaces'

@Injectable()
export class UnleashFeaturesClient {
  constructor(private readonly client: UnleashClient) {}

  getFeatures(): Promise<GetFeaturesResponse> {
    return this.client.get('/features')
  }
}
