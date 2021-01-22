export function eventStopDefault(e: Event): boolean {
  e.stopPropagation()
  e.preventDefault()
  return true
}