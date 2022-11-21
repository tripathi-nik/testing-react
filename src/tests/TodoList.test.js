import { screen, render } from "@testing-library/react";
//import TodoApp from "../components/TodoApp";
import TodoList from "../components/TodoList";

describe("Test For Todo List Data Rendering", () => {
  it("Test for displaying list items", async () => {
    render(
      <TodoList
        dispatch={jest.fn()}
        query=""
        todos={[
          {
            userId: 2,
            id: 35,
            title: "repellendus veritatis molestias dicta incidunt",
            completed: true,
          },
          {
            userId: 2,
            id: 36,
            title:
              "excepturi deleniti adipisci voluptatem et neque optio illum ad",
            completed: true,
          },
          {
            userId: 2,
            id: 37,
            title: "sunt cum tempora",
            completed: false,
          },
          {
            userId: 2,
            id: 38,
            title: "totam quia non",
            completed: false,
          },
          {
            userId: 2,
            id: 39,
            title:
              "doloremque quibusdam asperiores libero corrupti illum qui omnis",
            completed: false,
          },
          {
            userId: 3,
            id: 42,
            title: "rerum perferendis error quia ut eveniet",
            completed: false,
          },
        ]}
      />
    );
    expect(screen.getByTestId("todo-loading")).toBeInTheDocument();
    const renderListing = await screen.findAllByTestId("todo-item");
    expect(screen.queryByTestId("todo-loading")).not.toBeInTheDocument();
    /**Extacting all complete courses */
    const completed = renderListing.filter((elem) =>
      screen
        .getByText(elem.textContent)
        .classList.contains("text-decoration-line-through")
    );
    /***Adding assertion on completed courses */
    expect(completed).toHaveLength(2);
    const completedTitles = completed.map((elem) => elem.textContent);
    expect(completedTitles).toEqual([
      "repellendus veritatis molestias dicta incidunt",
      "excepturi deleniti adipisci voluptatem et neque optio illum ad",
    ]);
    /****Checking checkbox of completed courses to be checked by default */
    completedTitles.forEach(async (elem) =>
      expect(
        await screen.findByRole("checkbox", {
          name: elem,
        })
      ).toBeChecked()
    );
    /**Extracting all pending courses */
    const pending = renderListing.filter(
      (elem) =>
        screen
          .getByText(elem.textContent)
          .classList.contains("text-decoration-line-through") === false
    );
    expect(pending).toHaveLength(4);
    const pendingTitle = pending.map((elem) => elem.textContent);
    expect(pendingTitle).toEqual([
      "sunt cum tempora",
      "totam quia non",
      "doloremque quibusdam asperiores libero corrupti illum qui omnis",
      "rerum perferendis error quia ut eveniet",
    ]);
  });
});