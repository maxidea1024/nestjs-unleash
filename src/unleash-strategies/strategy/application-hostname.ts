import { Injectable } from '@nestjs/common'
import { hostname as osHostname } from 'os'
import type { UnleashContext } from '../../unleash'
import type { UnleashStrategy } from './strategy.interface'

export interface HostnameParameters {
  hostNames: string
}

@Injectable()
export class ApplicationHostnameStrategy
  implements UnleashStrategy<HostnameParameters>
{
  name = 'applicationHostname'
  hostname = osHostname()

  isEnabled(parameters: HostnameParameters, _context: UnleashContext): boolean {
    if (!parameters.hostNames) {
      return false
    }

    return parameters.hostNames
      .toLowerCase()
      .split(/\s*,\s*/)
      .includes(this.hostname)
  }
}
