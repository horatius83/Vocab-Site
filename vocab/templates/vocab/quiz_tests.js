QUnit.test("Utility.splitIntoSections_test", function(assert) {
    var lst = [0,1,2,3,4,5,6,7];
    var sections = Utility.splitIntoSections(lst,3)
    var expectedLst = [[0,1,2], [3,4,5], [6,7]];
    assert.ok(sections.length == expectedLst.length, "List length was correct!");
    for(var i=0; i<3; i++) {
        assert.ok(sections[i].length == expectedLst[i].length, "Section length was correct!");
        for(j=0; j<sections[i].length; j++) {
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
});

