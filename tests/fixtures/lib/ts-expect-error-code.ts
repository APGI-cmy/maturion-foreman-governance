export function testFunction() {
  // @ts-expect-error - intentional type error for testing
  const x: number = "string";
  return true;
}
