const className = "valid"; // Normal case
const maliciousClassName = "(a+)+" + "a".repeat(100); // Malicious input with catastrophic backtracking

function testRegExpPerformance(input) {
    console.time('RegExp Test');
    const regex = new RegExp("\\s|^" + input + "\\s|$");
    const testStr = "a".repeat(100);
    regex.test(testStr);
    console.timeEnd('RegExp Test');
}

console.log("Testing with normal input:");
testRegExpPerformance(className);

console.log("\nTesting with malicious input:");
testRegExpPerformance(maliciousClassName);