import { render, screen, within } from "@testing-library/react-native";
import RepositoryListContainer from "../../src/components/RepositoryListContainer";
import { formatCount } from "../../src/components/RepositoryItem";

describe("RepositoryList", () => {
  describe("RepositoryListContainer", () => {
    it("renders repository information correctly", () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
        },
        edges: [
          {
            node: {
              id: "jaredpalmer.formik",
              fullName: "jaredpalmer/formik",
              description: "Build forms in React, without the tears",
              language: "TypeScript",
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars2.githubusercontent.com/u/4060187?v=4",
            },
            cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
          },
          {
            node: {
              id: "async-library.react-async",
              fullName: "async-library/react-async",
              description: "Flexible promise-based React data loader",
              language: "JavaScript",
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars1.githubusercontent.com/u/54310907?v=4",
            },
            cursor:
              "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          },
        ],
      };

      const repositoryNodes = repositories.edges.map((edge) => edge.node);
      render(<RepositoryListContainer repositories={repositoryNodes} />);

      const repositoryItems = screen.getAllByTestId("repositoryItem");
      const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;
      const [firstNode, secondNode] = repositoryNodes;

      expect(firstRepositoryItem).toBeDefined();
      expect(secondRepositoryItem).toBeDefined();

      const first = within(firstRepositoryItem);
      const second = within(secondRepositoryItem);

      expect(first.getByText(firstNode.fullName)).toBeDefined();
      expect(first.getByText(firstNode.description)).toBeDefined();
      expect(first.getByText(firstNode.language)).toBeDefined();
      expect(first.getByTestId("Stars")).toHaveTextContent(
        formatCount(firstNode.stargazersCount)
      );
      expect(first.getByTestId("Forks")).toHaveTextContent(
        formatCount(firstNode.forksCount)
      );
      expect(first.getByTestId("Reviews")).toHaveTextContent(
        formatCount(firstNode.reviewCount)
      );
      expect(first.getByTestId("Rating")).toHaveTextContent(
        formatCount(firstNode.ratingAverage)
      );

      expect(second.getByText(secondNode.fullName)).toBeDefined();
      expect(second.getByText(secondNode.description)).toBeDefined();
      expect(second.getByText(secondNode.language)).toBeDefined();
      expect(second.getByTestId("Stars")).toHaveTextContent(
        formatCount(secondNode.stargazersCount)
      );
      expect(second.getByTestId("Forks")).toHaveTextContent(
        formatCount(secondNode.forksCount)
      );
      expect(second.getByTestId("Reviews")).toHaveTextContent(
        formatCount(secondNode.reviewCount)
      );
      expect(second.getByTestId("Rating")).toHaveTextContent(
        formatCount(secondNode.ratingAverage)
      );
    });
  });
});
