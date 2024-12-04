import type { UnleashContext } from '../../unleash'
import type { UnleashStrategy } from './strategy.interface'

export class DefaultStrategy implements UnleashStrategy<never> {
  name = 'default'

  isEnabled(_parameters: never, _context: UnleashContext): boolean {
    return true
  }
}
