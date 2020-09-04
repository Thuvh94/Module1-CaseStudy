function GameBoard() {
    this.falseTimes = 0;
    this.trueTimes = 0;
    let playerScore = 0;
    let playerTurn = 1;
    this.drawFirstPage = function () {
        let str = `<h1 class="titleText">HANGMAN GAME</h1>`;
        str +=`<p class="subTitleText">Let's learn English together!</p>`;
        str += `<input type="button" value="Play" onclick="gameBoard.drawPlaySelectBoard(category)" id="startBtn" class="firstPageBtn">`;
        str += `<input type="button" value="Review" onclick="gameBoard.drawReviewSelectBoard(category)" id="reviewBtn" class="firstPageBtn">`;
        document.getElementById('mainBoard').innerHTML = str;
    }
    this.drawPlaySelectBoard = function (category) {
        this.category = answer.getCategory();
        playerScore =0;
        playerTurn = 1;
        let selectBoard = "<p class='displayText'>Choose a category: </p>";
        for (let i = 0; i < category.length; i++) {
            selectBoard += `<button id='category" + i +"' onclick='gameBoard.drawGameBoard(${i},category,answerList)'>`;
            selectBoard += "<img class='selectCategoryButton' src='assets/category"+i+".PNG' >"
            selectBoard += "</button>";
        }
        selectBoard+= `<br><br><br><input type="button" class="backButton" value="Back" onclick="gameBoard.drawFirstPage()">`;
        document.getElementById('mainBoard').innerHTML = selectBoard;
    }

    this.drawReviewSelectBoard = function (){
        this.category = answer.getCategory();
        let selectBoard = "<p class='displayText'>Choose a category: </p>";
        for (let i = 0; i < category.length; i++) {
            selectBoard += `<button id='category" + i +"' onclick='gameBoard.drawReviewBoard(${i},category,answerList)'>`;
            selectBoard += "<img class='selectCategoryButton' src='assets/category"+i+".PNG' >"
            selectBoard += "</button>";
        }
        selectBoard += `<br><br><br><input type="button" class="backButton" value="Back" onclick="gameBoard.drawFirstPage()">`;
        document.getElementById('mainBoard').innerHTML = selectBoard;
    }

    this.drawReviewBoard = function (number,category,list) {
        this.setCategory(number,category);
        this.setAnswer(number,list);
        let string ='';
        string+= `<span class="elementText">Category: </span>` + answer.getCategory() +"<br>";
        for (let i = 0; i < list[number].length ; i++) {
            string +=`<a class="elementText" href="https://dictionary.cambridge.org/dictionary/english/`+list[number][i] +`"`+`target="_blank" style="text-decoration: none">`;
            string += list[number][i] +`<a>`+"<br>";
        }
        string+= `<input type="button" class="backButton" value="Back" onclick="gameBoard.drawReviewSelectBoard()">`;
        let num = category.indexOf(answer.getCategory());
        string+= `<input type="button" class = "challengeButton" value="Challenge this category" onclick="gameBoard.drawGameBoard(${num},category,answerList)">`;
        document.getElementById('mainBoard').innerHTML=string;
    }

    this.drawGameBoard = function (number,category,list){
        this.setCategory(number,category);
        this.setAnswer(number,list);
        let table = "<table>";
        table += `<tr><td id="playerTurn" class="turnText"></td></tr>`;
        table += `<tr> <td id="score" class="elementText"></td>`;
        table += `<td id = 'category' class="elementText"></td></tr>`;
        table += "<tr><td rowspan='3'><img  id='hangManImg' src='assets/Hangman-0.png' style='transform: rotateY(180deg)'></td>";
        table += "<td id='answerAreaId'></td></tr>";
        table += "<tr><td id='wrongGuest' class='elementText'>Wrong characters</td></tr>";
        table += "<tr><td id='CharacterButtonTd'></td></tr>";
        table += "<tr><td colspan='2'><button style='float: right' class='switchCategoryBtn' onclick='gameBoard.drawPlaySelectBoard(category)'>Switch Category</button></td></tr>";
        table += "</table>";
        document.getElementById('mainBoard').innerHTML = table;
        this.drawCharacterButton();
        this.drawAnswerArea(answer);
        document.getElementById('score').innerHTML = "Score: " +playerScore +"/"+ this.showMaxScore();
        document.getElementById('playerTurn').innerHTML = "Turn: " +playerTurn;
        document.getElementById('category').innerHTML = answer.getCategory(category);
    }

    this.setCategory = function (number,category) {
        answer.setCategory(category,number) ;
    }
    this.setAnswer = function (number,list) {
        answer.setAnswer(list,number);
    }
    this.drawCharacterButton = function () {
        let alphabet = [
            ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
            ['i', 'j', 'k', 'l', 'm', 'n', 'o', 'p'],
            ['q', 'r', 's', 't', 'u', 'v', 'w', 'x'],
            ['y', 'z'],
        ]
        let string;
        string = `<table id='characterButton'>`;
        for (let i = 0; i < alphabet.length; i++) {
            string += `<tr>`;
            for (let j = 0; j < alphabet[i].length; j++) {
                string += `<td ><button class="characterButton" id="${i}-${j}" onclick="gameBoard.navigate('${i}-${j}',answer)" >${alphabet[i][j]}</button></td>`;
            }
            string += `</tr>`;
        }
        string += `</table>`;
        document.getElementById('CharacterButtonTd').innerHTML = string;
    }

    this.drawAnswerArea = function (answer) {
        this.answer = answer.getAnswer();
        let table = `<table><tr>`;
        for (let i = 0; i < this.answer.length; i++) {
            table += `<td id="${i}" class="answerArea" ></td>`;
        }
        table += `</tr></table>`;
        document.getElementById('answerAreaId').innerHTML = table;
    }

    this.getClickCharacter = function (id) {
        let char = document.getElementById(id).innerText;
        return char;
    }

    this.checkTrueCharacter = function (id, answer) {
        this.character = this.getClickCharacter(id);
        this.answer = answer.getAnswer();
        if (this.answer.indexOf(this.character) >= 0) {
            return true;
        }
    }

    this.countFalse = function (id, answer) {
        if (!this.checkTrueCharacter(id, answer)) {
            this.falseTimes++;
        }
        return this.falseTimes;
    }

    this.displayTrueCharacter = function (id, answer) {
        let char= document.getElementById(id).innerText;
        for(let i=0; i< answer.answer.length; i++){
            if(char===answer.answer[i]){
                document.getElementById(i).innerText= char;
                this.trueTimes++;
            }
        }
    }

    this.drawHangman = function (id, answer) {
        this.count = this.countFalse(id, answer);
        document.getElementById('hangManImg').attributes[1].value = "assets/Hangman-" + this.count + ".png";

    }

    this.navigate = function (id, answer) {
        if (this.checkTrueCharacter(id,answer)){
            this.displayTrueCharacter(id,answer);
            this.checkWin();
            this.confirmPlayNext();
        }
        else {
            this.drawHangman(id,answer);
            this.displayWrongGuest(id);
            this.checkLose();
            this.confirmPlayNext();
        }
        this.disableClickButton(id);
    }
    this.wrongGuest =[];
    this.displayWrongGuest =function (id) {
        let char =this.getClickCharacter(id);
        this.wrongGuest.push(char);
        document.getElementById('wrongGuest').innerHTML = 'Wrong character: '+ this.wrongGuest;
    }

    this.disableClickButton = function (id){
        document.getElementById(id).disabled = true;
        document.getElementById(id).style.backgroundColor = '#A9A9A9';
    }

    this.checkLose = function () {
        if(this.falseTimes ===6){
            return true;
        }
    }
    this.checkWin = function () {
        if(this.trueTimes===answer.answer.length){
            return true;
        }
    }
    this.confirmPlayNext = function () {
        if(this.checkLose()){
            if(confirm('Sorry! You lose this game!\n The answer is "'+answer.getAnswer().toUpperCase()+'"\n Do you want to play next game?')){
                playerTurn++;
                this.playNext();
            }
            else
                this.endGame();
        }
        if(this.checkWin()){
            if(confirm('Congratulation!\n The answer is "'+answer.getAnswer().toUpperCase()+'"\n Do you want to play next game?')){
                playerTurn++;
                playerScore++;
                this.playNext();
            }
            this.endGame();
        }
    }

    this.playNext=function(){
        let topic = answer.getCategory();
        let number = category.indexOf(topic);
        this.clearWrong();
        this.trueTimes = 0;
        this.falseTimes = 0;
        gameBoard.drawGameBoard(number,category,answerList);
        this.drawHangman(0,answer.answer);
    }
    this.clearWrong = function (){
        console.log("Clean Wrong");
        this.wrongGuest = [];
    }
    this.showMaxScore = function () {
        answer.getCategory();
        let num = category.indexOf(answer.getCategory());
        let totalScore = answerList[num].length;
        return totalScore;
    }

    this.endGame = function () {
        gameBoard.drawFirstPage();
    }
}