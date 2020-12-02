import { UnleashContext } from '../unleash.context'
import { UnleashStrategy } from './strategy.interface'

export class DefaultStrategy implements UnleashStrategy {
  name = 'default'

  isEnabled(_parameters: never, _context: UnleashContext): boolean {
    return true
  }
}
