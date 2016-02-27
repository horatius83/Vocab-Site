var quizText = `{
    "name": ".\Italian\Italian5.json",
    "vocab": [
        {
            "answer": "ha",
            "failed": 0,
            "lastAsked": 1445533916.2659762,
            "question": "Carlo ___ due sorelle.",
            "tried": 1
        },
        {
            "answer": "nipoti",
            "failed": 0,
            "lastAsked": 1445533938.204976,
            "question": "Io ho una nipote -> Io ho due ___",
            "tried": 1
        },
        {
            "answer": "Giorgio e Pete hanno sempre sonno.",
            "failed": 1,
            "lastAsked": 1445534063.6969762,
            "question": "What is the definition of \\"Giorgio and Pete are always sleepy.\\"?",
            "tried": 2
        },
        {
            "answer": "I am always in a hurry, too.",
            "failed": 0,
            "lastAsked": 1445533934.044976,
            "question": "Given the definition \\"Anche io ho sempre fretta.\\", what is the word?",
            "tried": 1
        },
        {
            "answer": "Maria ha sempre freddo.",
            "failed": 1,
            "lastAsked": 1445534068.915976,
            "question": "What is the definition of \\"Maria is always cold.\\"?",
            "tried": 2
        },
        {
            "answer": "bambini",
            "failed": 0,
            "lastAsked": 1445533907.566976,
            "question": "Io ho un bambino -> Io ho due ___",
            "tried": 1
        },
        {
            "answer": "sorelle",
            "failed": 0,
            "lastAsked": 1445533910.385976,
            "question": "Plural of sorella",
            "tried": 1
        },
        {
            "answer": "ha",
            "failed": 0,
            "lastAsked": 1445534049.4969761,
            "question": "Marta ___ due sorelle.",
            "tried": 1
        },
        {
            "answer": "ho",
            "failed": 0,
            "lastAsked": 1445534072.2759762,
            "question": "Io ___ due sorelle.",
            "tried": 1
        },
        {
            "answer": "abbiamo",
            "failed": 0,
            "lastAsked": 1445534097.993976,
            "question": "Noi ___ due sorelle.",
            "tried": 1
        },
        {
            "answer": "madri",
            "failed": 0,
            "lastAsked": 1445534093.9339762,
            "question": "Plural of madre",
            "tried": 1
        },
        {
            "answer": "Loro hanno voglia di un caffe'.",
            "failed": 1,
            "lastAsked": 1445534182.8089762,
            "question": "What is the definition of \\"They feel like having a coffee.\\"?",
            "tried": 2
        }
    ]
}`;
var quizJson = JSON.parse(quizText);

var Utility = {
    /**
     * Split a list into sections of a given length
     *
     * @method splitIntoSections
     * @param lst {List} a list of elements
     * @param lengthOfSection {Int} the length of each section
     * @return {List} a list of lists of the requested length
     */
    splitIntoSections : function(lst, lengthOfSection) {
        // given a list, split it into sub-lists of a given length
        var returnList = [];
        for(var i=0;i<lst.length;i+=lengthOfSection) {
            returnList.push(lst.slice(i,i+lengthOfSection));
        }
        return returnList;
    },
    /**
     * Use the Duestenfeld shuffle to randomize a list
     *
     * @method shuffle 
     * @param arry {List} a list to be shuffled
     * @return {List} a shuffled list
     */
    shuffle : function(arry) {
        var rv = arry.slice(0,arry.length);
        for(var i=rv.length-1;i>0;i--) {
            var j = Math.floor(Math.random() * (i+1));
            var temp = rv[i];
            rv[i] = rv[j];
            rv[j] = temp;
        }
        return rv;
    },
    range : function(begin, end, step) {
            if(step === undefined) {
                step = 1;
            }
            var rv = [];
            if(step > 0) {
                for(var i=begin;i<=end;i+=step) {
                    rv.push(i);
                }
            } else if(step < 0) {
                for(var i=begin;i>=end;i+=step) {
                    rv.push(i);
                }
            }
            return rv;
    },
    repeat : function(times, value) {
        var rv = [];
        if(times < 0) {
            return [];
        }
        for(var i=0;i<times;i++) {
            rv.push(value);
        }
        return rv;
    },
    findFirstOf : function(lst, predicate) {
        for(var i=0;i<lst.length;i++) {
            if(predicate(lst[i])) {
                return [true, lst[i]];
            }
        }
        return [false, undefined];
    },
    findFirstWithIndex : function(lst, predicate, startingIndex) {
        startingIndex |= 0;
        for(var i=startingIndex; i<lst.length; i++) {
            if(predicate(i,lst[i])) {
                return [true, i, lst[i]];
            }
        }
        return [false, undefined, undefined];
    },
    makeRing : function(lst,index) {
        return lst.slice(index+1,lst.length).concat(lst.slice(0,index));
    }
};

function createQuiz() {
    var u = Utility;

    this.testIsRunning = function() {
        return this.section.index < this.indices.length && this.section.questionIndex < this.indices[this.section.index].length;  
    };
    /**
     * Get the current question node including question, answer
     * and stats
     *
     * @method getCurrentQuestion
     * @return {Object} an object containing the question, the answer and
     * any relevent stats
     */
    this.getCurrentQuestion = function() {
        if(this.testIsRunning()) {
            var index = this.indices[this.section.index][this.section.questionIndex].index;
            return this.questions[index];
        }
    };
    /**
     * Go to the next question, if we're reviewing then go to the next question
     * that was wrong the last time through
     * @method gotoNextQuestion
     */
    this.gotoNextQuestion = function() {
        // Clear the answer
        this.clearUserAnswer();
        // If we're going to the next question, we're no longer reviewing
        this.state.isReviewing = false;
                    
        // Get the next question
        var currentIndex = this.section.questionIndex;
        // Search in the remaining list
        var isFalse = function(i, x) { return !x.result; };
        // Search for the first wrong answer
        var nextQuestion = u.findFirstWithIndex(this.indices[this.section.index], isFalse, this.section.questionIndex+1);
        if(!nextQuestion[0]) { // go back to the beginning of the list
            this.indices[this.section.index] = u.shuffle(this.indices[this.section.index]); // shuffle the list
            nextQuestion = u.findFirstWithIndex(this.indices[this.section.index], isFalse); // find the first wrong answer
        }
        if(nextQuestion[0]) {
            this.section.questionIndex = nextQuestion[1]; // The next question is the next wrong answer
        } else { // There are no more false questions in this section
            this.section.index += 1;
            this.section.questionIndex = 0;
            if(this.section.index === this.indices.length) {
                this.state.hasFinished = true;
                this.state.isAsking = false;
                this.state.isChecking = false;
                this.state.isReviewing = false;
                this.state.showStats = false;
            }
        }
    };
    /**
     * Get the number of times this question has been attempted
     * vs. the number of times the answer was incorrect
     * @method getAverage
     */
    this.getAverage = function() {
        if(this.testIsRunning()) {
            var question = this.getCurrentQuestion();
            var tried = question['tried'];
            var failed = question['failed'];
            return failed / tried;
        }
    };
    this.getUserAnswer = function() {
        var userAnswer = document.querySelector('#answer').value;
        return userAnswer;
    };
    this.clearUserAnswer = function() {
        var userAnswerTextField = document.querySelector('#answer');
        userAnswerTextField.value = '';
        userAnswerTextField.focus();
    };
    this.checkAnswer = function() {
        var actualAnswer = this.getCurrentQuestion()['answer'];
        var userAnswer = this.getUserAnswer();
        var question = this.getCurrentQuestion()['question'];
        question['tried'] += 1;
        question['lastTried'] = new Date().getTime();

        if(actualAnswer === userAnswer) {
            if(!this.state.isReviewing) {
                this.indices[this.section.index][this.section.questionIndex].result = true;
            }
            this.gotoNextQuestion();
        } else {
            this.state.isAsking = false;
            this.state.isChecking = true;
        }
    };
    this.answerWas = function(wasTrue) { 
        if(wasTrue) {
            if(!this.state.isReviewing) {
                this.indices[this.section.index][this.section.questionIndex].result = true;
            }
            this.gotoNextQuestion();
            this.state.isAsking = true;
            this.state.isChecking = false;
        } else {
            this.state.isAsking = true;
            this.state.isChecking = false;
            this.state.isReviewing = true;
            this.clearUserAnswer();
        }
    };
    function getTotalTried() {
        var sectionIndex = this.section.index;
        var questionIndex = this.section.questionIndex;
        var lst = this.indices;
        if(sectionIndex < lst.length && questionIndex < lst[sectionIndex].length) {
            return lst.slice(0,sectionIndex)
                .reduce(function(acc,x) {
                    return acc + x.length;
                }, questionIndex + 1);
        }
        return -1;
    };
    function getTotalQuestions() {
        var lst = this.indices;
        return lst.reduce(function(acc, x) { return acc + x.length},0);
    };
    this.section = {
        'index': 0, 
        'questionIndex': 0, 
        'size': 8, 
        'allCorrect': function() {
            for(var i=0;i<this.indices[this.section.index].length;i++) {
                if(this.indices[this.section.index][i].result == false) {
                    return false;
                }
            }
            return true;
        }, 
    };
    this.state = {'isAsking': true, 'isChecking': false, 'isReviewing' : false, 'hasFinished' : false, 'showStats' : true};
    this.title = quizJson['name'];
    this.questions = quizJson['vocab'];
    this.indices = u.splitIntoSections(u.shuffle(u.range(0,quizJson['vocab'].length-1)),this.section.size)
        .map(function(lst) { 
            return lst.map(function(x) { 
                return { 'index' : x, 'result' : false}})});
    this.questions.current = this.getCurrentQuestion()['question'];
}

(function(){
    var quizApp = angular.module('quizApp', []);
    quizApp.controller('QuizController', createQuiz);
})();
