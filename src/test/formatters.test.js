import { describe, it, expect } from 'vitest';
import { escapeSVG, formatGender, formatDate, isValidName } from '../utils/formatters';

describe('formatters', () => {
  describe('escapeSVG', () => {
    it('should escape special XML characters', () => {
      expect(escapeSVG('<script>alert("xss")</script>')).toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;');
      expect(escapeSVG("Homer & Marge's")).toBe("Homer &amp; Marge&apos;s");
      expect(escapeSVG('Test & "quote"')).toBe('Test &amp; &quot;quote&quot;');
    });

    it('should handle null and undefined', () => {
      expect(escapeSVG(null)).toBe('');
      expect(escapeSVG(undefined)).toBe('');
      expect(escapeSVG('')).toBe('');
    });

    it('should convert to string', () => {
      expect(escapeSVG(123)).toBe('123');
      expect(escapeSVG(true)).toBe('true');
    });
  });

  describe('formatGender', () => {
    it('should format male gender', () => {
      expect(formatGender('Male')).toBe('👨 Male');
      expect(formatGender('male')).toBe('👨 Male');
      expect(formatGender('m')).toBe('👨 Male');
      expect(formatGender('M')).toBe('👨 Male');
    });

    it('should format female gender', () => {
      expect(formatGender('Female')).toBe('👩 Female');
      expect(formatGender('female')).toBe('👩 Female');
      expect(formatGender('f')).toBe('👩 Female');
      expect(formatGender('F')).toBe('👩 Female');
    });

    it('should handle invalid input', () => {
      expect(formatGender('')).toBe('');
      expect(formatGender(null)).toBe('');
      expect(formatGender(undefined)).toBe('');
      expect(formatGender(123)).toBe('');
      expect(formatGender('unknown')).toBe('');
    });
  });

  describe('formatDate', () => {
    it('should format date without weekday', () => {
      const date = '1989-12-17';
      const formatted = formatDate(date, false);
      expect(formatted).toBe('December 17, 1989');
    });

    it('should format date with weekday', () => {
      const date = '1989-12-17';
      const formatted = formatDate(date, true);
      expect(formatted).toBe('Sunday, December 17, 1989');
    });

    it('should handle empty date', () => {
      expect(formatDate('')).toBe('');
      expect(formatDate(null)).toBe('');
      expect(formatDate(undefined)).toBe('');
    });
  });

  describe('isValidName', () => {
    it('should validate valid names', () => {
      expect(isValidName('Homer Simpson')).toBe(true);
      expect(isValidName('Marge')).toBe(true);
    });

    it('should reject invalid names', () => {
      expect(isValidName('')).toBe(false);
      expect(isValidName('   ')).toBe(false);
      expect(isValidName(null)).toBe(false);
      expect(isValidName(undefined)).toBe(false);
      expect(isValidName(123)).toBe(false);
    });
  });
});
