import { act } from "react-dom/test-utils";

import mount from "@test/mount";

import { useStore } from "./index";

const HookWrapper = ({ hook }) => {
  const val = hook();
  // @ts-expect-error add custom property to access in the wrapper
  return <div hook={val} />;
};

describe("zustand useStore Hook", () => {
  type HookReturnType = ReturnType<typeof useStore>;

  const wrapper = mount(<HookWrapper hook={useStore} />);

  const { inc, dec } = (
    wrapper.find("div").props() as {
      hook: HookReturnType;
    }
  ).hook;

  it("should set initial count to 1", () => {
    const { count } = (
      wrapper.find("div").props() as {
        hook: HookReturnType;
      }
    ).hook;
    expect(count).toEqual(1);
  });
  it("should inc count by 2", () => {
    act(() => {
      inc();
    });

    wrapper.update();

    const { count } = (
      wrapper.find("div").props() as {
        hook: HookReturnType;
      }
    ).hook;

    expect(count).toEqual(2);
  });
  it("should inc count by 1", () => {
    act(() => {
      dec();
    });

    wrapper.update();

    const { count } = (
      wrapper.find("div").props() as {
        hook: HookReturnType;
      }
    ).hook;

    expect(count).toEqual(1);
  });
});
