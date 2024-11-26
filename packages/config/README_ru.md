# ConfigService
🚀 Гибкий и мощный инструмент управления конфигурациями для приложений Node.js и NestJS.

[![version](https://img.shields.io/npm/v/@helpful-toolkit/config)](https://www.npmjs.com/package/@helpful-toolkit/config) [![license](https://img.shields.io/npm/l/@helpful-toolkit/config)](https://opensource.org/licenses/Apache-2.0) [![npm](https://img.shields.io/npm/dt/@helpful-toolkit/config)](https://www.npmjs.com/package/@helpful-toolkit/config) [![GitHub issues](https://img.shields.io/github/issues/helpful-toolkit/config)](https://github.com/helpful-toolkit/config/issues)

**[Английская версия / English Version en](./README.md)**

[>> Версия для Nest.js здесь <<](https://github.com/HotsHom/helpful-toolkit/tree/main/packages/config-nest)

## Обзор

`ConfigService` — это легковесный и гибкий инструмент для управления переменными окружения в приложениях Node.js и NestJS. Он позволяет легко управлять значениями конфигураций, такими как строки, числа, булевы значения, массивы и объекты JSON с надежной обработкой ошибок и типобезопасностью. Он полезен в проектах, где часто используются `.env` файлы и предоставляет методы для безопасного извлечения значений.

## Содержание

- [Особенности](#особенности--✨)
- [Установка](#установка--📥)
- [Usage](#использование--🛠)
- [API](#api--📚)
- [License](#лицензия)
- [Related Projects](#связанные-проекты)

## Особенности  ✨

- **Динамическая конфигурация**: Поддерживает гибкую загрузку переменных окружения.
- **Типобезопасные геттеры**: Методы для получения значений конфигураций как строки, числа, булевы значения, массивы и JSON объекты.
- **Обработка ошибок**: Генерирует понятные и детализированные ошибки, если переменная не найдена или имеет некорректный тип.
- **Расширяемость**: Легко расширяется для добавления собственных методов для работы с другими типами конфигураций.

## Установка  📥

Вы можете установить `@helpful-toolkit/config` с помощью вашего предпочтительного менеджера пакетов.
### С помощью `npm`

```bash 
npm install @helpful-toolkit/config    
```  
### С помощью `yarn`

```bash 
yarn add @helpful-toolkit/config    
```  

### С помощью `pnpm`

```bash 
pnpm add @helpful-toolkit/config    
```   
## Использование  🛠

1. **Инициализация**

Перед использованием `ConfigService` необходимо инициализировать его, загрузив переменные окружения:

```typescript 
import { ConfigService } from '@helpful-toolkit/config';    
    
ConfigService.initialize();    
```   
2. **Получение значений конфигураций**

Используйте различные геттеры для извлечения значений из вашего `.env` файла или окружения:  
| Getter | Description | Description |  
|--|--|--|  
| `getString(key)` | Возвращает строковое значение. | `const dbHost = ConfigService.getString('DB_HOST');` |  
| `getNumber(key)` | Возвращает числовое значение. | `const dbPort = ConfigService.getNumber('DB_PORT');` |  
| `getBoolean(key)` | Возвращает булево значение. | `const isEnabled = ConfigService.getBoolean('FEATURE_ENABLED');` |  
| `getArray(key)` | Возвращает массив значений. | `const allowedDomains = ConfigService.getArray('ALLOWED_DOMAINS');` |  
| `getDate(key)` | Возвращает объект Date. | `const expiration = ConfigService.getDate('EXPIRATION_DATE');` |  
| `getJSON(key)` | Возвращает JSON объект. | `const jsonConfig = ConfigService.getJSON('JSON_CONFIG');` |


3. **Обработка ошибок**

Если переменная обязательна и отсутствует, или имеет неверный тип, `ConfigService` выбросит ошибку:

```typescript 
try {  
  const dbHost = ConfigService.getString('DB_HOST');  
} catch (error) {  
  console.error('Config Error:', error.message);  
}  
```   
## API  📚

- `getString(key: string, defaultValue?: string): string`: Извлекает значение переменной как строку.
- `getNumber(key: string, defaultValue?: number): number`: Извлекает значение переменной как число.
- `getBoolean(key: string, defaultValue?: boolean): boolean`: Извлекает значение переменной как булево значение.
- `getArray(key: string, separator: string, defaultValue?: string[]): string[]`: Извлекает значение переменной как массив строк.
- `getDate(key: string, defaultValue?: Date): Date`: Извлекает значение переменной как объект Date
- `getJSON<T>(key: string, defaultValue?: T): T`: Извлекает значение переменной как объект JSON
- `has(key: string): boolean`: Проверяет, существует ли переменная в окружении

## Лицензия

Этот проект лицензирован по лицензии [Apache 2.0 License](https://opensource.org/licenses/Apache-2.0).

## Связанные проекты

- [NestJS](https://nestjs.com/) - Фреймворк для создания эффективных, надежных и масштабируемых серверных приложений.
