# Config Helper For Nest.js (env manager)
🚀 A flexible and powerful configuration management tool for Node.js and NestJS applications.    
[![version](https://img.shields.io/npm/v/@helpful-toolkit/config)](https://www.npmjs.com/package/@helpful-toolkit/config) [![license](https://img.shields.io/npm/l/@helpful-toolkit/config)](https://opensource.org/licenses/Apache-2.0) [![npm](https://img.shields.io/npm/dt/@helpful-toolkit/config)](https://www.npmjs.com/package/@helpful-toolkit/config) [![GitHub issues](https://img.shields.io/github/issues/HotsHom/helpful-toolkit)](https://github.com/HotsHom/helpful-toolkit/issues)

**[Русская версия / Russian Version 🇷🇺](./README_ru.md)**

[>> Version for Node.js here <<](https://github.com/HotsHom/helpful-toolkit/tree/main/packages/config)

## Overview

`ConfigService` is a lightweight, flexible tool for managing environment variables in Node.js and NestJS applications. It provides a simple yet powerful API for accessing values from `.env` files, with full support for validation, type safety, and extensibility.

## Table of Contents

- [Features](#features--✨)
- [Installation](#installation--📥)
- [Usage](#usage--🛠)
- [API](#api--📚)
- [License](#license)
- [Related Projects](#related-projects)

## Features  ✨

- **Dynamic configuration**: Load and manage environment variables with ease.
- **Type-safe getters**: Retrieve values with proper type validation (string, number, boolean, etc.).
- **Customizable**: Easily extendable with new configuration methods.
- **Error handling**: Provides clear errors when variables are missing or have incorrect types.

## Installation  📥

You can install `@helpful-toolkit/config` using your preferred package manager.
### Using `npm`

```bash 
npm install @helpful-toolkit/config @helpful-toolkit/config-nest    
```  
### Using `yarn`

```bash 
yarn add @helpful-toolkit/config @helpful-toolkit/config-nest  
```  

### Using `pnpm`

```bash 
pnpm add @helpful-toolkit/config @helpful-toolkit/config-nest    
```   
## Usage  🛠

1. **Initialization**

Before using `ConfigService`, you need to import ConfigModule.

```typescript 
import { Module } from '@nestjs/common';
import { ConfigModule } from '@helpful-toolkit/config-nest';

@Module({
  imports: [ConfigModule],
})
export class AppModule {}
```   
Use ConfigService via DI:
```typescript
import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@helpful-toolkit/config';

@Injectable()
export class AppService {
  constructor(@Inject('CONFIG_SERVICE') private readonly configService: typeof ConfigService) {}

  getDatabaseHost(): string {
    return this.configService.getString('DB_HOST');
  }
}
```
2. **Getting Configuration Values**

Use the various getters to retrieve values from your `.env` or environment:    
| Getter | Description | Description |  
|--|--|--|  
| `getString(key)` | Returns a string value. | `const dbHost = ConfigService.getString('DB_HOST');` |  
| `getNumber(key)` | Returns a numeric value. | `const dbPort = ConfigService.getNumber('DB_PORT');` |  
| `getBoolean(key)` | Returns a boolean value. | `const isEnabled = ConfigService.getBoolean('FEATURE_ENABLED');` |  
| `getArray(key)` | Returns an array of values. | `const allowedDomains = ConfigService.getArray('ALLOWED_DOMAINS');` |  
| `getDate(key)` | Returns a Date object. | `const expiration = ConfigService.getDate('EXPIRATION_DATE');` |  
| `getJSON(key)` | Returns a JSON object. | `const jsonConfig = ConfigService.getJSON('JSON_CONFIG');` |


3. **Error Handling**

If a required environment variable is not found, or has an invalid type, the `ConfigService` will throw an error:

```typescript 
try {  
  const dbHost = ConfigService.getString('DB_HOST');  
} catch (error) {  
  console.error('Config Error:', error.message);  
}  
```   
## API  📚

- `getString(key: string, defaultValue?: string): string`: Returns the value of the variable as a string.
- `getNumber(key: string, defaultValue?: number): number`: Returns the value of the variable as a number.
- `getBoolean(key: string, defaultValue?: boolean): boolean`: Returns the value of the variable as a boolean.
- `getArray(key: string, separator: string, defaultValue?: string[]): string[]`: Returns the value of the variable as an array.
- `getDate(key: string, defaultValue?: Date): Date`: Returns the value of the variable as a Date object.
- `getJSON<T>(key: string, defaultValue?: T): T`: Returns the value of the variable as a JSON object.
- `has(key: string): boolean`: Checks whether the variable exists in the environment.

## License

This project is licensed under the [Apache 2.0 License](https://opensource.org/licenses/Apache-2.0).

## Related Projects

- [NestJS](https://nestjs.com/) - A framework for building efficient, reliable, and scalable server-side applications.
