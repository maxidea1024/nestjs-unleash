import { Injectable } from '@nestjs/common'
import type { ToggleEntity } from '../entity/toggle.entity'
import { BaseRepository } from './base-repository'

@Injectable()
export class ToggleRepository extends BaseRepository<ToggleEntity> {}
