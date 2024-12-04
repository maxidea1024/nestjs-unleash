import { Injectable } from '@nestjs/common'
import type { UnleashContext } from '../../unleash'
import { normalizedValue } from '../util'
import type { UnleashStrategy } from './strategy.interface'

export interface GradualRolloutSessionIdParameters {
  percentage: `${number}`
  groupId: string
}

@Injectable()
export class GradualRolloutSessionIdStrategy
  implements UnleashStrategy<GradualRolloutSessionIdParameters>
{
  name = 'gradualRolloutSessionId'

  isEnabled(
    parameters: GradualRolloutSessionIdParameters,
    context: UnleashContext,
  ): boolean {
    const sessionId = context.getSessionId()

    if (!sessionId) {
      return false
    }

    const percentage = Number.parseInt(parameters.percentage, 10)
    const normalizedId = normalizedValue(sessionId, parameters.groupId)
    return percentage > 0 && normalizedId <= percentage
  }
}
