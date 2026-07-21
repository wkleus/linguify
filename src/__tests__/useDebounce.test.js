import { renderHook, act } from "@testing-library/react";
import useDebounce from "../hooks/useDebounce";

// renderHook  – mounts  hook in isolation, without needing component
// act -> wraps state updates so React flushes them before asserting
// jest.useFakeTimers –> replaces setTimeout/clearTimeout with controllable fakes (-> no waiting time of real ms in tests)

describe("useDebounce", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  // TEST 1: no early update -> debounced value must not change before delay expires
  test("does not update the debounced value before the delay expires", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "hello", delay: 500 } },
    );

    rerender({ value: "world", delay: 500 });

    // Advance time but stay just under threshold
    act(() => jest.advanceTimersByTime(499));

    expect(result.current).toBe("hello");
  });

  // TEST 2: update after delay -> debounced value must update exactly when delay expires
  test("updates the debounced value after the delay expires", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "hello", delay: 500 } },
    );

    rerender({ value: "world", delay: 500 });

    act(() => jest.advanceTimersByTime(500));

    expect(result.current).toBe("world");
  });

  // TEST 3: timer reset on rapid changes = CORE debounce behaviour: rapid changes extend the wait -> only last value should come through after one full delay period
  test("resets the timer when value changes before delay expires", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "a", delay: 500 } },
    );

    rerender({ value: "b", delay: 500 });
    act(() => jest.advanceTimersByTime(300)); // 300ms in – timer resets on next change

    rerender({ value: "c", delay: 500 });
    act(() => jest.advanceTimersByTime(300)); // another 300ms – still under 500ms from "c"

    // "b" was never debounced, "c" hasn't settled yet
    expect(result.current).toBe("a");

    // Let full delay expire from last change
    act(() => jest.advanceTimersByTime(200));

    expect(result.current).toBe("c");
  });
});

// NOTE: What tests should prove:
// TEST 1: value does not update before delay expires - debounce is active
// TEST 2: value updates once delay expires - debounce resolves correctly
// TEST 3: timer resets on rapid input - only last value comes through (= core behaviour)

// To run this single test suite - 2 options:
// npm test -- useDebounce
// npm test -- --watch useDebounce
