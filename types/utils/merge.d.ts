declare function mergeWithOptions<A, B, O>(original: A, updates: B, options?: O): A & B & O;
/**
 * Merges properties of one object into another
 * @private
 */
declare function merge<A, B>(original: A, updates: B): A & B;
export { mergeWithOptions, merge };
