import { screen, render } from "@testing-library/react";
import TodoItem from "../components/TodoItem";
import userEvent from "@testing-library/user-event";
import React from "react";
jest.mock("../api/todos", () => ({
  toggleTodo: jest.fn(() =>
    Promise.resolve({
      data: {
        userId: 2,
        id: 35,
        title: "repellendus veritatis molestias dicta incidunt",
        completed: false,
      },
    }).reject({
      status: 404,
      data: {
        userId: 2,
        id: 35,
        title: "repellendus veritatis molestias dicta incidunt",
        completed: true,
      },
    })
  ),
}));
describe("Testing for course action interchange between completed and not completed also deletion of course", () => {
  it("test for completed cousre changes to not completed on checkbox uncheck and after successfull response", async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <TodoItem
        key="35"
        todo={{
          userId: 2,
          id: 35,
          title: "repellendus veritatis molestias dicta incidunt",
          completed: true,
        }}
        dispatch={jest.fn()}
      />
    );

    let labelText = screen.getByText(
      /repellendus veritatis molestias dicta incidunt/i
    );
    expect(labelText).toHaveClass("text-decoration-line-through");
    let checkItem = await screen.findByRole("checkbox", {
      name: /repellendus veritatis molestias dicta incidunt/i,
    });
    expect(checkItem).toBeChecked();

    await user.click(checkItem);

    Promise.resolve().then(() => {
      rerender(
        <TodoItem
          key="35"
          todo={{
            userId: 2,
            id: 35,
            title: "repellendus veritatis molestias dicta incidunt",
            completed: false,
          }}
          dispatch={jest.fn()}
        />
      );
    });
    let check = await screen.findByRole("checkbox", {
      name: /repellendus veritatis molestias dicta incidunt/i,
    });
    expect(check).not.toBeChecked();

    expect(check).toBeEnabled();
    expect(
      screen.getByText(/^repellendus veritatis molestias.*$/i)
    ).not.toHaveClass("text-decoration-line-through");
  });
  it("completed course to not be retained to its original state after a failure", async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <TodoItem
        key="35"
        todo={{
          userId: 2,
          id: 35,
          title: "repellendus veritatis molestias dicta incidunt",
          completed: true,
        }}
        dispatch={jest.fn()}
      />
    );
    let checkItem = await screen.findByRole("checkbox", {
      name: /repellendus veritatis molestias dicta incidunt/i,
    });
    expect(checkItem).toBeChecked();

    await user.click(checkItem);

    Promise.reject().catch(() => {
      rerender(
        <TodoItem
          key="35"
          todo={{
            userId: 2,
            id: 35,
            title: "repellendus veritatis molestias dicta incidunt",
            completed: true,
          }}
          dispatch={jest.fn()}
        />
      );
    });
    let check = await screen.findByRole("checkbox", {
      name: /repellendus veritatis molestias dicta incidunt/i,
    });
    expect(check).toBeChecked();
    expect(check).toBeEnabled();
  });

  it("test for not completed course to be changes to completed on checking and vice versa", () => {});
  it("test for topic to be deleted when clicked on delete icon", () => {});
});
