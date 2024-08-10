export interface Storage {
  cleanupDb(): Promise<void>
  closeDb(): Promise<void>
}
