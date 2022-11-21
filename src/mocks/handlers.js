import { rest } from "msw";
export const handlers = [
  rest.get("http://localhost:4200/todos", (req, res, ctx) => {
    return res(
      ctx.json([
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
      ])
    );
  }),
  rest.put("http://localhost:4200/35", (req, res, ctx) => {
    return res(
      ctx
        .json({
          userId: 2,
          id: 35,
          title: "repellendus veritatis molestias dicta incidunt",
          completed: true,
        })
        .status(200)
    );
  }),
];
