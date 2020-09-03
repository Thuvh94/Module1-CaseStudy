function Answer(answer,category){
    this.answer = answer;
    this.category = category;
    // this.number = 0;
    this.setCategory = function (category, number) {
        this.category = category[number];
    }
    this.getCategory = function () {
        return this.category;
    }
    this.setAnswer = function (list,number) {
        let index = 0;
        let answerList = list[number];
        index = Math.floor(Math.random()*answerList.length);
        this.answer = answerList[index];
    }
    this.getAnswer = function () {
        return this.answer;
    }
}