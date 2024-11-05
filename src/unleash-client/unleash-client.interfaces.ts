import { ModuleMetadata, Type } from '@nestjs/common'
import { AxiosRequestConfig } from 'axios'

export interface UnleashClientModuleOptions {
  baseURL: string
  instanceId: string
  appName: string
  http?: AxiosRequestConfig
}

export interface UnleashClientModuleOptionsFactory {
  createStrategiesOptions():
    | Promise<UnleashClientModuleOptions>
    | UnleashClientModuleOptions
}

export interface UnleashClientModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  inject?: any[]
  useExisting?: Type<UnleashClientModuleOptionsFactory>
  useClass?: Type<UnleashClientModuleOptionsFactory>
  useFactory?: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...args: any[]
  ) => Promise<UnleashClientModuleOptions> | UnleashClientModuleOptions
}
