interface Promise<T> {
  /**
   * Attaches callbacks for the resolution and/or rejection of the P.
   * @param onfulfilled The callback to execute when the P is resolved.
   * @param onrejected The callback to execute when the P is rejected.
   * @returns A P for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;

  /**
   * Attaches a callback for only the rejection of the P.
   * @param onrejected The callback to execute when the P is rejected.
   * @returns A P for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>

  always<TResult1 = T>(callback: (success?: TResult1, error?: any) => TResult1 | any): Promise<TResult1>
}
