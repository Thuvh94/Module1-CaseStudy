function GameBoard() {
    this.falseTimes = 0;
    this.trueTimes = 0;
    this.drawPlaySelectBoard = function (category) {
        this.category = answer.getCategory();
        let selectBoard = "";
        for (let i = 0; i < category.length; i++) {
            selectBoard += `<button id='category" + i +"' onclick='gameBoard.drawGameBoard(${i},category,answerList)'>`;
            selectBoard += "<img class='selectCategoryButton' src='../assets/category"+i+".PNG' >"
            selectBoard += "</button>";
        }
        document.getElementById('mainBoard').innerHTML = selectBoard;
    }

    this.drawReviewSelectBoard = function (){
        this.category = answer.getCategory();
        let selectBoard = "";
        for (let i = 0; i < category.length; i++) {
            selectBoard += `<button id='category" + i +"' onclick='gameBoard.drawReviewBoard(${i},category,answerList)'>`;
            selectBoard += "<img class='selectCategoryButton' src='../assets/category"+i+".PNG' >"
            selectBoard += "</button>";
        }
        document.getElementById('mainBoard').innerHTML = selectBoard;
        document.getElementById('buttonPosition').innerHTML= "";
    }

    this.drawReviewBoard = function (number,category,list) {
        this.setCategory(number,category);
        this.setAnswer(number,list);
        let string ='';
        string+= "Category: " + answer.getCategory() +"<br>";
        for (let i = 0; i < list[number].length ; i++) {
                string +=`<a href="https://dictionary.cambridge.org/dictionary/english/`+list[number][i] +`"`+`target="_blank" style="text-decoration: none">`;
                string += list[number][i] +`<a>`+"<br>";
        } document.getElementById('mainBoard').innerHTML = string;
        let btn = '';
        btn += `<input type="button" value="Back" onclick="gameBoard.drawReviewSelectBoard()">`;
        document.getElementById('buttonPosition').innerHTML=btn;
    }

    this.drawGameBoard = function (number,category,list){
        this.setCategory(number,category);
        this.setAnswer(number,list);
        let table = "<table style='border: 1px solid black' >";
        table += "<tr><td rowspan='4'><img  id='hangManImg' src='../assets/Hangman-0.png' style='transform: rotateY(180deg)'></td>";
        table += "<td id = 'category'></td></tr>";
        table += "<tr><td id='answerAreaId'></td></tr>";
        table += "<tr><td id='wrongGuest'>Wrong characters</td></tr>";
        table += "<tr><td id='CharacterButtonTd'></td></tr></table>";
        document.getElementById('mainBoard').innerHTML = table;
        this.drawCharacterButton();
        this.drawAnswerArea(answer);
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
                string += `<td ><button class="button" id="${i}-${j}" onclick="gameBoard.navigate('${i}-${j}',answer)" >${alphabet[i][j]}</button></td>`;
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
        document.getElementById('hangManImg').attributes[1].value = "../assets/Hangman-" + this.count + ".png";

    }

    this.navigate = function (id, answer) {
        if (this.checkTrueCharacter(id,answer)){
            this.displayTrueCharacter(id,answer);
            this.checkWin();
        }
        else {
            this.drawHangman(id,answer);
            this.displayWrongGuest(id);
            this.checkLose();
        }
        this.disableClickButton(id);
    }
    this.wrongGuest ='Wrong character: ';
    this.displayWrongGuest =function (id) {
        this.wrongGuest += " "+this.getClickCharacter(id);
        document.getElementById('wrongGuest').innerHTML = this.wrongGuest;
    }

    this.disableClickButton = function (id){
        document.getElementById(id).disabled = true;
        document.getElementById(id).style.backgroundColor = '#A9A9A9';
    }

    this.checkLose = function () {
        if(this.falseTimes ===6){
            alert ('You lose!\n The answer is "'+answer.getAnswer().toUpperCase()+'"');
        }
    }
    this.checkWin = function () {
        if(this.trueTimes===answer.answer.length)
            alert('You Win!');
    }
}