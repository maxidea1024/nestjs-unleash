import { Inject, Injectable, Logger } from '@nestjs/common'
import { name, version } from '../../../package.json'
import type { UnleashClient } from '../unleash-client'
import { UNLEASH_CLIENT_OPTIONS } from '../unleash-client.constants'
import type { UnleashClientModuleOptions } from '../unleash-client.interfaces'
import type {
  UnleashRegisterClientReponsePayload,
  UnleashRegisterClientRequestPayload,
} from './register-client.interfaces'

@Injectable()
export class UnleashRegisterClient {
  protected readonly logger = new Logger(UnleashRegisterClient.name)

  constructor(
    @Inject(UNLEASH_CLIENT_OPTIONS)
    private readonly clientOptions: UnleashClientModuleOptions,
    private readonly client: UnleashClient,
  ) {}

  async register(interval: number, strategies: string[]): Promise<void> {
    const payload = {
      appName: this.clientOptions.appName,
      instanceId: this.clientOptions.instanceId,
      interval,
      sdkVersion: `${name}@${version}`,
      started: new Date().toISOString(),
      strategies,
    }

    this.logger.debug(`Registering ${JSON.stringify(payload)})`)

    await this.client.post<
      UnleashRegisterClientReponsePayload,
      UnleashRegisterClientRequestPayload
    >('/register', payload)
  }
}
