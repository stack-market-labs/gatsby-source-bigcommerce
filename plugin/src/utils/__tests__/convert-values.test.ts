import {
  convertNumberToString,
  convertObjectToString,
  convertStringToCamelCase,
  convertStringToConstantCase,
  convertStringToKebabCase,
  convertStringToLowercase,
  convertStringToObject,
  convertStringToSentenceCase,
  convertStringToSnakeCase,
  convertStringToTitleCase,
  convertStringToUppercase,
} from "../convert-values";

describe("Convert values", () => {
  describe("Convert string to lowercase", () => {
    it("converts uppercase strings to lowercase", () => {
      expect(convertStringToLowercase("HELLO")).toBe("hello");
    });

    it("converts mixed-case strings to lowercase", () => {
      expect(convertStringToLowercase("Hello")).toBe("hello");
    });

    it("keeps lowercase strings unchanged", () => {
      expect(convertStringToLowercase("hello")).toBe("hello");
    });

    it("returns empty string when input is empty", () => {
      expect(convertStringToLowercase("")).toBe("");
    });
  });

  describe("Convert string to uppercase", () => {
    it("converts lowercase strings to uppercase", () => {
      expect(convertStringToUppercase("hello")).toBe("HELLO");
    });

    it("converts mixed-case strings to uppercase", () => {
      expect(convertStringToUppercase("Hello")).toBe("HELLO");
    });

    it("keeps uppercase strings unchanged", () => {
      expect(convertStringToUppercase("HELLO")).toBe("HELLO");
    });

    it("returns empty string when input is empty", () => {
      expect(convertStringToUppercase("")).toBe("");
    });
  });

  describe("Convert string to titlecase", () => {
    it("converts lowercase strings to titlecase", () => {
      expect(convertStringToTitleCase("hello")).toBe("Hello");
    });

    it("converts mixed-case strings to uppercase", () => {
      expect(convertStringToTitleCase("HELLO")).toBe("Hello");
    });

    it("keeps uppercase strings unchanged", () => {
      expect(convertStringToTitleCase("Hello")).toBe("Hello");
    });

    it("returns empty string when input is empty", () => {
      expect(convertStringToTitleCase("")).toBe("");
    });
  });

  describe("Convert string to camelcase", () => {
    it("converts spaced strings to camel case", () => {
      expect(convertStringToCamelCase("Hello World")).toBe("helloWorld");
    });

    it("converts kebab-case strings to camel case", () => {
      expect(convertStringToCamelCase("hello-world")).toBe("helloWorld");
    });

    it("converts snake_case strings to camel case", () => {
      expect(convertStringToCamelCase("hello_world")).toBe("helloWorld");
    });

    it("returns an empty string for an empty input", () => {
      expect(convertStringToCamelCase("")).toBe("");
    });
  });

  describe("Convert string to snakecase", () => {
    it("converts spaced strings to snake case", () => {
      expect(convertStringToSnakeCase("Hello World")).toBe("hello_world");
    });

    it("converts camelCase strings to snake case", () => {
      expect(convertStringToSnakeCase("helloWorld")).toBe("hello_world");
    });

    it("converts kebab-case strings to snake case", () => {
      expect(convertStringToSnakeCase("hello-world")).toBe("hello_world");
    });

    it("returns an empty string for an empty input", () => {
      expect(convertStringToSnakeCase("")).toBe("");
    });
  });

  describe("Convert string to kebabcase", () => {
    it("converts spaced strings to kebab case", () => {
      expect(convertStringToKebabCase("Hello World")).toBe("hello-world");
    });

    it("converts camelCase strings to kebab case", () => {
      expect(convertStringToKebabCase("helloWorld")).toBe("hello-world");
    });

    it("converts snake_case strings to kebab case", () => {
      expect(convertStringToKebabCase("hello_world")).toBe("hello-world");
    });

    it("returns an empty string for an empty input", () => {
      expect(convertStringToKebabCase("")).toBe("");
    });
  });

  describe("Convert string to constantcase", () => {
    it("converts spaced strings to constant case", () => {
      expect(convertStringToConstantCase("Hello World")).toBe("HELLO_WORLD");
    });

    it("converts camelCase strings to constant case", () => {
      expect(convertStringToConstantCase("helloWorld")).toBe("HELLO_WORLD");
    });

    it("converts kebab-case strings to constant case", () => {
      expect(convertStringToConstantCase("hello-world")).toBe("HELLO_WORLD");
    });

    it("converts snake_case strings to constant case", () => {
      expect(convertStringToConstantCase("hello_world")).toBe("HELLO_WORLD");
    });

    it("returns an empty string for an empty input", () => {
      expect(convertStringToConstantCase("")).toBe("");
    });
  });

  describe("Convert string to sentence case", () => {
    it("capitalizes the first letter of a lowercase sentence", () => {
      expect(convertStringToSentenceCase("hello world")).toBe("Hello world");
    });

    it("capitalizes the first letter and makes the rest lowercase for a mixed case string", () => {
      expect(convertStringToSentenceCase("hELLo wOrld")).toBe("Hello world");
    });

    it("converts an uppercase sentence to sentence case", () => {
      expect(convertStringToSentenceCase("HELLO WORLD")).toBe("Hello world");
    });

    it("retains numeric characters at the start of a sentence", () => {
      expect(convertStringToSentenceCase("12345 hello world")).toBe(
        "12345 hello world"
      );
    });

    it("capitalizes the first letter after a non-alpha character in the string", () => {
      expect(convertStringToSentenceCase("!hello world")).toBe("!hello world");
    });

    it("returns an empty string for an empty input", () => {
      expect(convertStringToSentenceCase("")).toBe("");
    });

    it("handles single word input correctly", () => {
      expect(convertStringToSentenceCase("HELLO")).toBe("Hello");
      expect(convertStringToSentenceCase("hello")).toBe("Hello");
      expect(convertStringToSentenceCase("hELLo")).toBe("Hello");
    });
  });

  describe("Convert string to object", () => {
    it("converts valid JSON strings with key-value pairs to objects", () => {
      const str = '{"a": 1, "b": 2}';
      expect(convertStringToObject(str)).toEqual({ a: 1, b: 2 });
    });

    it("converts valid JSON strings with nested objects", () => {
      const str = '{"a": {"nestedKey": "nestedValue"}, "b": 2}';
      expect(convertStringToObject(str)).toEqual({
        a: { nestedKey: "nestedValue" },
        b: 2,
      });
    });

    it("converts valid JSON strings with arrays to objects", () => {
      const str = '{"a": [1, 2, 3]}';
      expect(convertStringToObject(str)).toEqual({ a: [1, 2, 3] });
    });

    it("converts empty strings to empty objects", () => {
      expect(convertStringToObject("")).toEqual({});
    });

    it("throws an error when trying to convert malformed JSON", () => {
      const str = '{"a": 1, "b": 2';
      expect(() => convertStringToObject(str)).toThrowError();
    });

    it("throws an error for non-JSON strings", () => {
      const str = "This is just a plain string";
      expect(() => convertStringToObject(str)).toThrowError();
    });
  });

  describe("Convert object to string", () => {
    it("converts objects to JSON strings", () => {
      const obj = { a: 1, b: 2 };
      expect(convertObjectToString(obj)).toBe('{"a":1,"b":2}');
    });

    it("converts empty objects to empty strings", () => {
      expect(convertObjectToString({})).toBe("");
    });
  });

  describe("Convert number to string", () => {
    it("converts positive integers to strings", () => {
      expect(convertNumberToString(123)).toBe("123");
    });

    it("converts negative integers to strings", () => {
      expect(convertNumberToString(-123)).toBe("-123");
    });

    it("converts floats to strings", () => {
      expect(convertNumberToString(123.456)).toBe("123.456");
    });
  });
});
