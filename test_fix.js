// Direct test of the fixed className manipulation functions
function testClassOperations() {
    console.log('Starting tests...');
    
    // Create the prototype functions we modified
    const proto = {
        addClassName: function (ele, className) {
            if (!ele || !className || !ele.className) return;
            
            // Validate className to ensure it only contains safe characters
            if (!/^[a-zA-Z0-9_-]+$/.test(className)) return;
            
            // Only add if not already present
            const classes = ele.className.split(' ');
            if (!classes.includes(className)) {
                classes.push(className);
                ele.className = classes.join(' ');
            }
        },
        
        removeClassName: function (ele, className) {
            if (!ele || !className || !ele.className) return;
            
            // Validate className to ensure it only contains safe characters
            if (!/^[a-zA-Z0-9_-]+$/.test(className)) return;
            
            // Use a predefined pattern or string-based replacement
            ele.className = ele.className.split(' ')
                .filter(cls => cls !== className)
                .join(' ');
        }
    };

    // Test 1: Normal operation
    console.log('\nTest 1: Normal operation');
    const element1 = { className: 'initial-class' };
    proto.addClassName(element1, 'test-class');
    console.log('After add:', element1.className);
    proto.removeClassName(element1, 'test-class');
    console.log('After remove:', element1.className);

    // Test 2: Malicious input that would have caused ReDoS
    console.log('\nTest 2: Malicious input');
    const element2 = { className: 'safe-class' };
    const maliciousClassName = 'x' + '?'.repeat(100) + '{1}' + 'y';
    console.time('Malicious operation');
    proto.addClassName(element2, maliciousClassName);
    proto.removeClassName(element2, maliciousClassName);
    console.timeEnd('Malicious operation');
    console.log('Class after malicious attempt:', element2.className, '(should remain unchanged)');

    // Test 3: Multiple classes
    console.log('\nTest 3: Multiple classes');
    const element3 = { className: 'class1 class2' };
    proto.addClassName(element3, 'class3');
    console.log('After adding third class:', element3.className);
    proto.removeClassName(element3, 'class2');
    console.log('After removing middle class:', element3.className);

    // Test 4: Edge cases
    console.log('\nTest 4: Edge cases');
    const element4 = { className: 'starting-class' };
    
    // Empty string
    proto.addClassName(element4, '');
    console.log('After adding empty string:', element4.className, '(should remain unchanged)');
    
    // Special characters (should be rejected)
    proto.addClassName(element4, 'invalid*class');
    console.log('After attempting to add invalid class:', element4.className, '(should remain unchanged)');
    
    // Null/undefined element
    proto.addClassName(null, 'test');
    proto.removeClassName(undefined, 'test');
    console.log('Survived null/undefined tests');

    // Test 5: Valid class names with different patterns
    console.log('\nTest 5: Valid class names');
    const element5 = { className: 'base' };
    const validClasses = ['simple', 'with-dash', 'with_underscore', 'alphaNum123'];
    
    validClasses.forEach(cls => {
        proto.addClassName(element5, cls);
        console.log(`Added ${cls}:`, element5.className);
    });

    // Test 6: Duplicate prevention
    console.log('\nTest 6: Duplicate prevention');
    const element6 = { className: 'test' };
    proto.addClassName(element6, 'test');
    console.log('After adding duplicate class:', element6.className, '(should not duplicate)');

    console.log('\nAll tests completed.');
}

testClassOperations();