/**
 * GitHub username validation rules (per GitHub's own constraints):
 *  - 1 to 39 characters
 *  - Alphanumeric and hyphens only
 *  - Cannot begin or end with a hyphen
 *  - Cannot contain consecutive hyphens
 *
 * Reference: https://docs.github.com/en/get-started/signing-up-for-github
 */

export type ValidationResult =
  | { valid: true; value: string }
  | { valid: false; error: string };

const USERNAME_REGEX = /^(?!-)(?!.*--)[a-zA-Z0-9-]{1,39}(?<!-)$/;

export function validateGithubUsername(input: string): ValidationResult {
  const value = input.trim();

  if (value.length === 0) {
    return { valid: false, error: "Please enter a GitHub username." };
  }
  if (value.length > 39) {
    return {
      valid: false,
      error: "GitHub usernames are 39 characters or fewer.",
    };
  }
  if (value.startsWith("-") || value.endsWith("-")) {
    return {
      valid: false,
      error: "Username can't start or end with a hyphen.",
    };
  }
  if (value.includes("--")) {
    return {
      valid: false,
      error: "Username can't contain consecutive hyphens.",
    };
  }
  if (!/^[a-zA-Z0-9-]+$/.test(value)) {
    return {
      valid: false,
      error: "Only letters, numbers and hyphens are allowed.",
    };
  }
  if (!USERNAME_REGEX.test(value)) {
    return { valid: false, error: "That doesn't look like a valid username." };
  }

  return { valid: true, value };
}
