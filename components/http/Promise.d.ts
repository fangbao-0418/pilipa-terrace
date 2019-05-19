interface Promise<T> {
  always: <S = any>(callback: (success: S, error: any) => void) => this
}
