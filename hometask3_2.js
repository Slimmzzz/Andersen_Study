function createDebounceFunction(callback, delay) {
  let timeoutId;

  return function(...arguments) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...arguments), delay);
  };
}