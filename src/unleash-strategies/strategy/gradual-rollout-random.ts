import { Injectable } from '@nestjs/common'
import type { UnleashContext } from '../../unleash'
import { randomGenerator } from '../util'
import type { UnleashStrategy } from './strategy.interface'

export interface GradualRolloutRandomParameters {
  percentage: `${number}`
}

@Injectable()
export class GradualRolloutRandomStrategy
  implements UnleashStrategy<GradualRolloutRandomParameters>
{
  name = 'gradualRolloutRandom'

  isEnabled(
    parameters: GradualRolloutRandomParameters,
    _context: UnleashContext,
  ): boolean {
    const percentage = Number.parseInt(parameters.percentage, 10)
    return percentage >= randomGenerator()
  }
}
