function Answer(answer,category,difficulty){
    this.answer = answer;
    this.category = category;
    this.difficulty = difficulty;
    this.setAnswer = function (answer) {
        this.answer = answer;
    }
    this.getAnswer = function () {
        return this.answer;
    }
    this.setCategory = function (category) {
        this.category = category;
    }
    this.getCategory = function () {
        return this.category;
    }
    this.setDifficulty = function (difficulty) {
        this.difficulty = difficulty;
    }
}