"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigService = void 0;
const dotenv_1 = require("dotenv");
class ConfigService {
    static env = {};
    static initialize() {
        (0, dotenv_1.config)();
        Object.assign(this.env, process.env);
    }
    /**
     * Получает значение переменной окружения как строку.
     * @param key Ключ переменной
     * @param defaultValue Значение по умолчанию
     */
    static getString(key, defaultValue) {
        const value = this.env[key];
        if (value === undefined) {
            if (defaultValue !== undefined)
                return defaultValue;
            throw new Error(`Environment variable "${key}" is required but not defined`);
        }
        return value;
    }
    /**
     * Получает значение переменной окружения как число.
     * @param key Ключ переменной
     * @param defaultValue Значение по умолчанию
     */
    static getNumber(key, defaultValue) {
        const value = this.getString(key, defaultValue?.toString());
        const parsed = Number(value);
        if (isNaN(parsed)) {
            throw new Error(`Environment variable "${key}" must be a valid number, but got "${value}"`);
        }
        return parsed;
    }
    /**
     * Получает значение переменной окружения как булево значение.
     * @param key Ключ переменной
     * @param defaultValue Значение по умолчанию
     */
    static getBoolean(key, defaultValue) {
        const value = this.getString(key, defaultValue?.toString());
        if (['true', 'false'].includes(value.toLowerCase())) {
            return value.toLowerCase() === 'true';
        }
        throw new Error(`Environment variable "${key}" must be "true" or "false", but got "${value}"`);
    }
    /**
     * Получает значение переменной окружения как массив.
     * @param key Ключ переменной
     * @param separator Разделитель элементов массива (по умолчанию ",")
     * @param defaultValue Значение по умолчанию
     */
    static getArray(key, separator = ',', defaultValue) {
        const value = this.getString(key, defaultValue?.join(separator));
        return value.split(separator).map(item => item.trim());
    }
    /**
     * Получает значение переменной окружения как дату.
     * @param key Ключ переменной
     * @param defaultValue Значение по умолчанию
     */
    static getDate(key, defaultValue) {
        const value = this.getString(key, defaultValue?.toISOString());
        const parsedDate = new Date(value);
        if (isNaN(parsedDate.getTime())) {
            throw new Error(`Environment variable "${key}" must be a valid ISO date, but got "${value}"`);
        }
        return parsedDate;
    }
    /**
     * Получает значение переменной окружения как JSON объект.
     * @param key Ключ переменной
     * @param defaultValue Значение по умолчанию
     */
    static getJSON(key, defaultValue) {
        const value = this.getString(key, defaultValue ? JSON.stringify(defaultValue) : undefined);
        try {
            return JSON.parse(value);
        }
        catch {
            throw new Error(`Environment variable "${key}" must be a valid JSON string, but got "${value}"`);
        }
    }
    /**
     * Проверяет, существует ли переменная окружения.
     * @param key Ключ переменной
     */
    static has(key) {
        return this.env[key] !== undefined;
    }
}
exports.ConfigService = ConfigService;
//# sourceMappingURL=config.service.js.map