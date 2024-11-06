import { UnleashContext } from '../../unleash'
import { UnleashStrategy } from './strategy.interface'

export class DefaultStrategy implements UnleashStrategy<never> {
  name = 'default'

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isEnabled(parameters: never, context: UnleashContext): boolean {
    return true
  }
}
