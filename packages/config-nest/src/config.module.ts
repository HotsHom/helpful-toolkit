import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@helpful-toolkit/config'

@Global()
@Module({
	providers: [
		{
			provide: 'CONFIG_SERVICE',
			useFactory: () => {
				ConfigService.initialize(); // Автоматически инициализируем
				return ConfigService;
			},
		},
	],
	exports: ['CONFIG_SERVICE'],
})
export class ConfigModule {}
