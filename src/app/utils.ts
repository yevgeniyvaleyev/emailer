export function removeItemFromList<T> (list: T[], index: number): T[] {
  return [
    ...list.slice(0, index),
    ...list.slice(index + 1)
  ]
}
