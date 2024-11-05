/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable max-depth */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { Injectable, Logger } from '@nestjs/common'
import * as ip from 'ip'
import { isIP } from 'net'
import { UnleashContext } from '../../unleash'
import { UnleashStrategy } from './strategy.interface'

export interface RemoteAddressParameters {
  IPs: string
}

@Injectable()
export class RemoteAddressStrategy
  implements UnleashStrategy<RemoteAddressParameters> {
  name = 'remoteAddress'
  protected readonly logger = new Logger(RemoteAddressStrategy.name)

  // eslint-disable-next-line complexity, sonarjs/cognitive-complexity
  isEnabled(
    parameters: RemoteAddressParameters,
    context: UnleashContext,
  ): boolean {
    const remoteAddress = context.getRemoteAddress()

    if (!parameters.IPs || !remoteAddress) {
      return false
    }

    for (const range of parameters.IPs.split(/\s*,\s*/)) {
      if (range === remoteAddress) {
        return true
      }
      try {
        if (!isIP(range) && ip.cidrSubnet(range).contains(remoteAddress)) {
          return true
        }
      } catch (error: unknown) {
        const resolvedError: Error =
          error instanceof Error ? error : new Error(JSON.stringify(error))
        this.logger.warn(resolvedError.message)
      }
    }

    return false
  }
}
