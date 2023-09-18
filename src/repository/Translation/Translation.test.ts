import { describe, expect, it, test } from "bun:test";
import { TranslationMap } from "../../dto";
import { Translation } from ".";

describe('Translation', () => {
    const validMap: TranslationMap = new Map<string, string>([['test', 'This is a test']]);
 
    it('should return the valid value given a key that exists', () => {
        const testValue = validMap.get('test');

        const t = new Translation(validMap);
        expect(t.get('test')).toBe(testValue);
    });

    it('should return the key itself if it could not be found', () => {
        const key = 'key';
        
        const t = new Translation(validMap);
        expect(t.get(key)).toBe(key);
    });
});
