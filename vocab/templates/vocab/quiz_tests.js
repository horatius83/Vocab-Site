QUnit.test("hello test", function(assert) {
    assert.ok(1 == "1", "Passed!");
});

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

