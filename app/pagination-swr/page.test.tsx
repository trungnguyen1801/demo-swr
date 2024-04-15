import React from "react";
import { render, waitFor } from "@testing-library/react";
import Page from "./page";

jest.mock("swr", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("Page component", () => {
  test("renders loading state", async () => {
    const { getByText } = render(<Page />);
    expect(getByText("loading...")).toBeInTheDocument();
  });

  test("renders error state", async () => {
    const mockError = new Error("Failed to fetch");
    require("swr").default.mockImplementationOnce(() => ({
      data: undefined,
      error: mockError,
      isLoading: false,
    }));

    const { getByText } = render(<Page />);
    expect(getByText("Error")).toBeInTheDocument();
  });

  test("renders data correctly", async () => {
    const mockData = {
      results: [
        {
          "name": "Serenno",
          "rotation_period": "unknown",
          "orbital_period": "unknown",
          "diameter": "unknown",
          "climate": "unknown",
          "gravity": "unknown",
          "terrain": "rainforests, rivers, mountains",
          "surface_water": "unknown",
          "population": "unknown",
          "residents": [
              "https://swapi.dev/api/people/67/"
          ],
          "films": [],
          "created": "2014-12-20T16:52:13.357000Z",
          "edited": "2014-12-20T20:58:18.510000Z",
          "url": "https://swapi.dev/api/planets/52/"
        },
        {
          "name": "Concord Dawn",
          "rotation_period": "unknown",
          "orbital_period": "unknown",
          "diameter": "unknown",
          "climate": "unknown",
          "gravity": "unknown",
          "terrain": "jungles, forests, deserts",
          "surface_water": "unknown",
          "population": "unknown",
          "residents": [
              "https://swapi.dev/api/people/69/"
          ],
          "films": [],
          "created": "2014-12-20T16:54:39.909000Z",
          "edited": "2014-12-20T20:58:18.512000Z",
          "url": "https://swapi.dev/api/planets/53/"
      },
      ],
      previous: "https://swapi.dev/api/planets/?page=1",
      next: "https://swapi.dev/api/planets/?page=3",
    };
    require("swr").default.mockImplementationOnce(() => ({
      data: mockData,
      error: undefined,
      isLoading: false,
    }));

    const { getByText } = render(<Page />);
    await waitFor(() => {
      expect(getByText("Page 1")).toBeInTheDocument();
    });
  });
});
