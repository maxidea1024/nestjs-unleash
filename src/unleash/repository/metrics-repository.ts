import { Injectable } from '@nestjs/common'
import type { MetricEntity } from '../entity/metric.entity'
import { BaseRepository } from './base-repository'

@Injectable()
export class MetricsRepository extends BaseRepository<MetricEntity> {}
