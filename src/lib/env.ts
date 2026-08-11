/**
 * Validated configuration container for application environment variables.
 * Uses static property access on process.env to ensure Next.js compiler
 * can properly substitute NEXT_PUBLIC_ prefixed environment variables on the client side.
 */
export const env = {
  /**
   * Retrieves the validated Supabase API URL.
   * @throws {Error} If NEXT_PUBLIC_SUPABASE_URL is not defined.
   */
  SUPABASE_URL: (): string => {
    const value = process.env.NEXT_PUBLIC_SUPABASE_URL
    if (!value) {
      throw new Error('Missing required environment variable: NEXT_PUBLIC_SUPABASE_URL')
    }
    return value
  },

  /**
   * Retrieves the validated Supabase Anon API key.
   * @throws {Error} If NEXT_PUBLIC_SUPABASE_ANON_KEY is not defined.
   */
  SUPABASE_ANON_KEY: (): string => {
    const value = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!value) {
      throw new Error('Missing required environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY')
    }
    return value
  },

  /**
   * Retrieves the optional Gemini API key.
   */
  GEMINI_API_KEY: (): string | undefined => {
    return process.env.GEMINI_API_KEY
  },
}
