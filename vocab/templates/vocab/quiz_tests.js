'use strict';

QUnit.test("Utility.splitIntoSections_test", function(assert) {
    var lst = [0,1,2,3,4,5,6,7];
    var sections = Utility.splitIntoSections(lst,3)
    var expectedLst = [[0,1,2], [3,4,5], [6,7]];
    assert.ok(sections.length == expectedLst.length, "List length was correct!");
    for(var i=0; i<3; i++) {
        assert.ok(sections[i].length == expectedLst[i].length, "Section length was correct!");
        for(var j=0; j<sections[i].length; j++) {
            assert.ok(sections[i][j] == expectedLst[i][j], "Section content was the same!");
        }
    }
});

QUnit.test("Utility.range_test", function(assert) {
    var experimentalResult = Utility.range(0,7,1);
    assert.ok(experimentalResult.length == 8, "Array had " + experimentalResult.length + " , expected 8");
    for(var i=0;i<experimentalResult.length;++i) {
        assert.ok(i == experimentalResult[i], "Iterate-by-one: Experimental result was " + experimentalResult[i] + ", expected result was " + i)
    }
    
    var experimentalResult2 = Utility.range(0,0,0);
    assert.ok(experimentalResult2.length == 0 , "Range 0 did not return an empty list, it returned " + experimentalResult2);

    var experimentalResult3 = Utility.range(10,0,-1);
    for(var i=0;i<=10;i++) {
        assert.ok((10 - i) == experimentalResult3[i], "Iterate-by-negative-one: Experimental result was " + experimentalResult3[i] + " but expected result was " + i);
    }

    var experimentalResult4 = Utility.range(0,7,2);
    var expectedResult = [0,2,4,6];
    assert.ok(experimentalResult4.length == expectedResult.length, "Expected result array length was " + expectedResult.length + " but experimental result array length was " + experimentalResult4.length);
    for(var i=0;i<expectedResult.length;++i) {
        assert.ok(expectedResult[i] == experimentalResult4[i], "Iterate-by-two: Experimental result was " + experimentalResult4[i] + " but expected result was " + expectedResult[i]);
    }

    var experimentalResult5 = Utility.range(0,4);
    assert.ok(experimentalResult5.length == 5, 'Array-length with default step argument was correct');
    for(var i=0;i<=4;i++) {
        assert.ok(experimentalResult5[i] == i, "Array value with default step argument " + experimentalResult5[i] + " at index " + i + " is correct."); 
    }
});

QUnit.test("Utility.repeat test", function(assert) {
    var expectedResult = [1, 1, 1, 1];
    var experimentalResult = Utility.repeat(4,1);
    for(var i=0;i<expectedResult.length;i++) {
        assert.ok(expectedResult[i] == experimentalResult[i], "Expected result was " + expectedResult[i] + " experimental result was " + experimentalResult[i]);
    }

    var experimentalResult2 = Utility.repeat(0,5);
    assert.ok(experimentalResult2.length === 0, "Expected an empty list when repeating zero times")

    var experimentalResult3 = Utility.repeat(-5,8);
    assert.ok(experimentalResult3.length === 0, "Expected an empty list when repeating a negative number of times");
});

QUnit.test('Utility.findFirstOf test', function(assert) {
    var dataSet = [0,1,2,3,4,5];
    var expectedResult = 2;
    var experimentalResult = Utility.findFirstOf(dataSet, function(x) { return x == 2;});
    assert.ok(experimentalResult[0], 'Expected result to be true');
    assert.ok(experimentalResult[1] === expectedResult, "Expected value was " + expectedResult + ", experimental result was " + experimentalResult);

    var dataSet2 = []
    var experimentalResult2 = Utility.findFirstOf(dataSet2, function(x) { return x == 2;});
    assert.ok(experimentalResult2[0] == false, 'Expected result to be false');
    assert.ok(experimentalResult2[1] == undefined, 'Finding a value in an empty list should return undefined');

    var experimentalResult3 = Utility.findFirstOf(dataSet, function(x) { return x == 6;});
    assert.ok(experimentalResult3[0] == false, 'Expected result to be false');
    assert.ok(experimentalResult3[1] == undefined, 'If unable to find value, return undefined');
});

QUnit.test('Utility.findFirstWithIndex test', function(assert) {
    var dataSet = [0,1,2,3,4,5];
    var expectedResult = 2;
    var experimentalResult = Utility.findFirstWithIndex(dataSet, function(i, x) { return x == 2;});
    assert.ok(experimentalResult[0], 'Expected result to be true');
    assert.ok(experimentalResult[1] === expectedResult, "Expected value was " + expectedResult + ", experimental result was " + experimentalResult);
    assert.ok(experimentalResult[2] === expectedResult, "Expected value was " + expectedResult + ", experimental result was " + experimentalResult);

    var dataSet2 = []
    var experimentalResult2 = Utility.findFirstOf(dataSet2, function(x) { return x == 2;});
    assert.ok(experimentalResult2[0] == false, 'Expected result to be false')
    assert.ok(experimentalResult2[1] == undefined, 'Finding a value in an empty list should return undefined')
    assert.ok(experimentalResult2[2] == undefined, 'Finding a value in an empty list should return undefined')

    var experimentalResult3 = Utility.findFirstOf(dataSet, function(x) { return x == 6;});
    assert.ok(experimentalResult3[0] == false, 'Expected result to be false');
    assert.ok(experimentalResult3[1] == undefined, 'If unable to find value, return undefined');
    assert.ok(experimentalResult3[2] == undefined, 'If unable to find value, return undefined');
});

