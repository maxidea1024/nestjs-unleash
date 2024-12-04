import { Injectable } from '@nestjs/common'
import type { UnleashContext } from '../../unleash'
import type { UnleashStrategy } from './strategy.interface'

export interface UserWithIdParameters {
  userIds: string
}

@Injectable()
export class UserWithIdStrategy
  implements UnleashStrategy<UserWithIdParameters>
{
  name = 'userWithId'

  isEnabled(
    parameters: UserWithIdParameters,
    context: UnleashContext,
  ): boolean {
    const userId = context.getUserId()

    if (!userId) {
      return false
    }

    const userIds = parameters.userIds.split(/\s*,\s*/)
    return userIds.includes(userId)
  }
}
