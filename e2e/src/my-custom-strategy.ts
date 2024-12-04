import { Injectable } from '@nestjs/common'
import type { UnleashContext, UnleashStrategy } from '../../src'
import type { MyCustomData } from './app.controller'

@Injectable()
export class MyCustomStrategy implements UnleashStrategy {
  name = 'MyCustomStrategy'

  isEnabled(
    _parameters: unknown,
    context: UnleashContext<MyCustomData>,
  ): boolean {
    return context.customData?.foo === 'bar'
  }
}
