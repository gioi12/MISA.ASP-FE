export function generateNextCode(counter) {
  const nextNumber = counter.currentNumber + 1

  const paddedNumber = String(nextNumber).padStart(counter.paddingLength, '0')

  return `${counter.prefix}${paddedNumber}`
}
