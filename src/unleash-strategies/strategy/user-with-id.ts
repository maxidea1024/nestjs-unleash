import { Injectable } from '@nestjs/common'
import { UnleashContext } from '../unleash.context'
import { UnleashStrategy } from './strategy.interface'

export interface UserWithIdParameters {
  userIds: string
}

@Injectable()
export class UserWithIdStrategy implements UnleashStrategy {
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
