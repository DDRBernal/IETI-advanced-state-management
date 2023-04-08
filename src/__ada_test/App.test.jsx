import { describe, expect, it } from "vitest";
import { Light } from "../components/Light";
import { SmartHome } from "../components/SmartHome";
import { App } from "../App";
import { render, userEvent } from "../../test-config/utils";
import fs from "fs";
import path from "path";
import { smartDevicesReducer } from "../reducers/smartDevicesReducer";
import { SmartHomeContext } from "../SmartHomeContext";

describe("__AdaTest: Reducer", () => {
  it("Light component must not use on value from props", () => {
    const { asFragment } = render(<Light id={0} isOn={true} />);
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          data-testid="light-0"
          id="0"
          style="border: 1px solid gray; padding: 2rem; font-size: 3rem; background: rgb(68, 68, 68);"
        >
          ⚫️
        </button>
      </DocumentFragment>
    `);
  });

  it("SmartHome component must not use values from props", () => {
    const { asFragment } = render(<SmartHome firstLightOn={true} />);
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <section
          style="font-size: 5rem; display: grid; grid-template-columns: min-content min-content; gap: 3px; align-items: center; padding-top: 1rem;"
        >
          <button
            data-testid="light-0"
            id="0"
            style="border: 1px solid gray; padding: 2rem; font-size: 3rem; background: rgb(68, 68, 68);"
          >
            ⚫️
          </button>
          <button
            data-testid="light-1"
            id="1"
            style="border: 1px solid gray; padding: 2rem; font-size: 3rem; background: rgb(68, 68, 68);"
          >
            ⚫️
          </button>
          <button
            data-testid="light-2"
            id="2"
            style="border: 1px solid gray; padding: 2rem; font-size: 3rem; background: rgb(68, 68, 68);"
          >
            ⚫️
          </button>
        </section>
      </DocumentFragment>
    `);
  });

  it("App component must use 'SmartHomeContext.Provider'", async () => {
    try {
      const data = fs.readFileSync(
        path.resolve(__dirname, "../App.jsx"),
        "utf8"
      );
      const assertion = /\<SmartHomeContext\.Provider/.test(data);
      expect(assertion).toBeTruthy();
    } catch (err) {
      expect.fail();
    }
  });

  it("Light component must read from context", async () => {
    const { asFragment } = render(
      <SmartHomeContext.Provider value={{ lights: [false, true] }}>
        <Light id={1} />
      </SmartHomeContext.Provider>
    );
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <button
          data-testid="light-1"
          id="1"
          style="border: 1px solid gray; padding: 2rem; font-size: 3rem; background: rgb(238, 238, 238);"
        >
          💡
        </button>
      </DocumentFragment>
    `);
  });

  it("SmartHome component must read from context", async () => {
    const { asFragment } = render(
      <SmartHomeContext.Provider value={{ lights: [false, true, false] }}>
        <SmartHome />
      </SmartHomeContext.Provider>
    );
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <section
          style="font-size: 5rem; display: grid; grid-template-columns: min-content min-content; gap: 3px; align-items: center; padding-top: 1rem;"
        >
          <button
            data-testid="light-0"
            id="0"
            style="border: 1px solid gray; padding: 2rem; font-size: 3rem; background: rgb(68, 68, 68);"
          >
            ⚫️
          </button>
          <button
            data-testid="light-1"
            id="1"
            style="border: 1px solid gray; padding: 2rem; font-size: 3rem; background: rgb(238, 238, 238);"
          >
            💡
          </button>
          <button
            data-testid="light-2"
            id="2"
            style="border: 1px solid gray; padding: 2rem; font-size: 3rem; background: rgb(68, 68, 68);"
          >
            ⚫️
          </button>
        </section>
      </DocumentFragment>
    `);
  });

  it("the reducer updates the proper value for 'allOn' action", () => {
    const expectedState = { lights: [true, true, true] };
    const reducedState = smartDevicesReducer(
      { lights: [true, false, false] },
      { type: "allOn" }
    );
    expect(expectedState).toEqual(reducedState);
  });

  it("the reducer updates the proper value for 'allOff' action", () => {
    const expectedState = { lights: [false, false, false] };
    const reducedState = smartDevicesReducer(
      { lights: [true, false, false] },
      { type: "allOff" }
    );
    expect(expectedState).toEqual(reducedState);
  });

  it("the reducer updates the proper value for 'toggle' action", () => {
    const expectedState = { lights: [true, true, false] };
    const reducedState = smartDevicesReducer(
      { lights: [true, false, false] },
      { type: "toggle", payload: 1 }
    );
    expect(expectedState).toEqual(reducedState);
  });

  it("SmartHome component must not use props", async () => {
    try {
      const data = fs.readFileSync(
        path.resolve(__dirname, "../components/SmartHome.jsx"),
        "utf8"
      );
      const assertion = /SmartHome\(props/.test(data);
      expect(assertion).toBeFalsy();
    } catch (err) {
      expect.fail();
    }
  });

  it("Clicking on a light must turn it on", async () => {
    const { getByTestId, asFragment } = render(<App />);

    const lightButton = getByTestId("light-1");

    await userEvent.click(lightButton);

    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div>
          <div>
            <button>
              All Off
            </button>
            <button>
              All On
            </button>
          </div>
          <section
            style="font-size: 5rem; display: grid; grid-template-columns: min-content min-content; gap: 3px; align-items: center; padding-top: 1rem;"
          >
            <button
              data-testid="light-0"
              id="0"
              style="border: 1px solid gray; padding: 2rem; font-size: 3rem; background: rgb(68, 68, 68);"
            >
              ⚫️
            </button>
            <button
              data-testid="light-1"
              id="1"
              style="border: 1px solid gray; padding: 2rem; font-size: 3rem; background: rgb(238, 238, 238);"
            >
              💡
            </button>
            <button
              data-testid="light-2"
              id="2"
              style="border: 1px solid gray; padding: 2rem; font-size: 3rem; background: rgb(238, 238, 238);"
            >
              💡
            </button>
          </section>
        </div>
      </DocumentFragment>
    `);
  });

  it("Clicking on all lights on must turn all lights on", async () => {
    const { asFragment, getByText } = render(<App />);

    const allOnButton = getByText("All On");

    await userEvent.click(allOnButton);

    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div>
          <div>
            <button>
              All Off
            </button>
            <button>
              All On
            </button>
          </div>
          <section
            style="font-size: 5rem; display: grid; grid-template-columns: min-content min-content; gap: 3px; align-items: center; padding-top: 1rem;"
          >
            <button
              data-testid="light-0"
              id="0"
              style="border: 1px solid gray; padding: 2rem; font-size: 3rem; background: rgb(238, 238, 238);"
            >
              💡
            </button>
            <button
              data-testid="light-1"
              id="1"
              style="border: 1px solid gray; padding: 2rem; font-size: 3rem; background: rgb(238, 238, 238);"
            >
              💡
            </button>
            <button
              data-testid="light-2"
              id="2"
              style="border: 1px solid gray; padding: 2rem; font-size: 3rem; background: rgb(238, 238, 238);"
            >
              💡
            </button>
          </section>
        </div>
      </DocumentFragment>
    `);
  });

  it("Clicking on all lights off must turn all lights off", async () => {
    const { asFragment, getByText } = render(<App />);

    const allOnButton = getByText("All Off");

    await userEvent.click(allOnButton);

    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div>
          <div>
            <button>
              All Off
            </button>
            <button>
              All On
            </button>
          </div>
          <section
            style="font-size: 5rem; display: grid; grid-template-columns: min-content min-content; gap: 3px; align-items: center; padding-top: 1rem;"
          >
            <button
              data-testid="light-0"
              id="0"
              style="border: 1px solid gray; padding: 2rem; font-size: 3rem; background: rgb(68, 68, 68);"
            >
              ⚫️
            </button>
            <button
              data-testid="light-1"
              id="1"
              style="border: 1px solid gray; padding: 2rem; font-size: 3rem; background: rgb(68, 68, 68);"
            >
              ⚫️
            </button>
            <button
              data-testid="light-2"
              id="2"
              style="border: 1px solid gray; padding: 2rem; font-size: 3rem; background: rgb(68, 68, 68);"
            >
              ⚫️
            </button>
          </section>
        </div>
      </DocumentFragment>
    `);
  });
});
