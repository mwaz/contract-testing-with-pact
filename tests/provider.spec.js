const { Verifier } = require("@pact-foundation/pact");
const path = require("path");

// Set up a server to run the consumer tests against
const server = require("../index")

describe("Pact Verification", () => {
    it("verifies the provider", () => {
        const options = {
            provider: "todo_provider",
            providerBaseUrl: "http://localhost:5000",
            disableSSLVerification: true,
            logLevel: 'DEBUG',
            pactUrls: [
                path.resolve(
                    process.cwd(),
                    "tests",
                    "pacts",
                    "todo_consumer-todo_provider.json"
                ),
            ],
        };
        // Verify the provider with the pact file then stop the server
        return new Verifier(options)
            .verifyProvider()
            .then(() => {
                console.log('Pact Verification Complete!');
            }).finally(() => {
                server.close();
            });
    });
});
