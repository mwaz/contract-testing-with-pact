const path = require("path");
const TodoManager = require("../client");
const { PactV3, MatchersV3 } = require("@pact-foundation/pact");

// Set up a server to run the consumer tests against
const server = require("../index")

describe("Test", () => {
  // pact mock server url
  const mock_port = 1234;
  const mock_server_url = "http://127.0.0.1:" + mock_port;
  // pact instance
  const provider = new PactV3({
    consumer: "todo_consumer",
    provider: "todo_provider",
    port: mock_port,
    dir: path.resolve(process.cwd(), "tests", "pacts"),
    logLevel: "DEBUG",
  });

  // Expected response from the provider
  const EXPECTED_BODY = {
    title: "Learn React Native",
    description:
      "React Native is a framework for building native apps using React.",
    isCompleted: false,
    urgency: "high",
    id: 1,
  };

  // Fetch all todos
  it("test: getAllTodos", () => {
    // interaction
    provider
      // Set up expected request
      .uponReceiving("a GET request to get all todos")
      .withRequest({
        method: "GET",
        path: "/todos",
      })
      // Set up expected response
      .willRespondWith({
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
        body: MatchersV3.eachLike(EXPECTED_BODY),
      });
    // Verify request
    return provider.executeTest(() => { 
      // Make request to the mock server
      const todos = new TodoManager(mock_server_url);
      return todos.getAllTodos().then((response) => {
        // Verify response
        expect(response).toEqual([EXPECTED_BODY]);
      });
    }).finally(() => {
      server.close();
  });
  });
});