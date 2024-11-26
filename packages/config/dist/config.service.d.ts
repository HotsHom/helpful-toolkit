export declare class ConfigService {
    private static readonly env;
    static initialize(): void;
    /**
     * Получает значение переменной окружения как строку.
     * @param key Ключ переменной
     * @param defaultValue Значение по умолчанию
     */
    static getString(key: string, defaultValue?: string): string;
    /**
     * Получает значение переменной окружения как число.
     * @param key Ключ переменной
     * @param defaultValue Значение по умолчанию
     */
    static getNumber(key: string, defaultValue?: number): number;
    /**
     * Получает значение переменной окружения как булево значение.
     * @param key Ключ переменной
     * @param defaultValue Значение по умолчанию
     */
    static getBoolean(key: string, defaultValue?: boolean): boolean;
    /**
     * Получает значение переменной окружения как массив.
     * @param key Ключ переменной
     * @param separator Разделитель элементов массива (по умолчанию ",")
     * @param defaultValue Значение по умолчанию
     */
    static getArray(key: string, separator?: string, defaultValue?: string[]): string[];
    /**
     * Получает значение переменной окружения как дату.
     * @param key Ключ переменной
     * @param defaultValue Значение по умолчанию
     */
    static getDate(key: string, defaultValue?: Date): Date;
    /**
     * Получает значение переменной окружения как JSON объект.
     * @param key Ключ переменной
     * @param defaultValue Значение по умолчанию
     */
    static getJSON<T = any>(key: string, defaultValue?: T): T;
    /**
     * Проверяет, существует ли переменная окружения.
     * @param key Ключ переменной
     */
    static has(key: string): boolean;
}
//# sourceMappingURL=config.service.d.ts.map