import { HttpModule } from '@nestjs/axios'
import { type DynamicModule, Module, type Provider } from '@nestjs/common'
import type { AxiosRequestConfig } from 'axios'
import {
  UnleashFeaturesClient,
  UnleashMetricsClient,
  UnleashRegisterClient,
} from '.'
import { UnleashStrategiesModule } from '..'
import { UnleashClient } from './unleash-client'
import { UNLEASH_CLIENT_OPTIONS } from './unleash-client.constants'
import type {
  UnleashClientModuleAsyncOptions,
  UnleashClientModuleOptions,
} from './unleash-client.interfaces'

@Module({})
// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class UnleashClientModule {
  private static optionsFactory(
    options: UnleashClientModuleOptions,
  ): AxiosRequestConfig {
    return {
      ...options.http,
      baseURL: options.baseURL,
      headers: {
        ...options.http?.headers,
        'UNLEASH-INSTANCEID': options.instanceId,
        'UNLEASH-APPNAME': options.appName,
      },
    }
  }

  static register(options: UnleashClientModuleOptions): DynamicModule {
    return {
      module: UnleashClientModule,
      imports: [
        HttpModule.register(UnleashClientModule.optionsFactory(options)),
        UnleashStrategiesModule,
      ],
      providers: [{ provide: UNLEASH_CLIENT_OPTIONS, useValue: options }],
    }
  }

  public static registerAsync(
    options: UnleashClientModuleAsyncOptions,
  ): DynamicModule {
    const provider: Provider = {
      provide: UNLEASH_CLIENT_OPTIONS,
      useFactory: options.useFactory!,
      inject: options.inject,
    }
    return {
      module: UnleashStrategiesModule,
      imports: [
        ...(options.imports ?? []),
        HttpModule.registerAsync({
          useFactory: (options: UnleashClientModuleOptions) =>
            UnleashClientModule.optionsFactory(options),
          inject: [UNLEASH_CLIENT_OPTIONS],
        }),
      ],
      providers: [
        provider,
        UnleashStrategiesModule,
        UnleashClient,
        UnleashFeaturesClient,
        UnleashMetricsClient,
        UnleashRegisterClient,
      ],
      exports: [
        provider,
        UnleashClient,
        UnleashFeaturesClient,
        UnleashMetricsClient,
        UnleashRegisterClient,
      ],
    }
  }
}
