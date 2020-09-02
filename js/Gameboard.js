function GameBoard() {
    this.falseTimes = 0;
    this.trueTimes = 0;
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
        return string;
    }

    this.drawAnswerArea = function (answer) {
        this.answer = answer.getAnswer();
        let table = `<table><tr>`;
        for (let i = 0; i < this.answer.length; i++) {
            table += `<td id="${i}" class="answerArea" ></td>`;
        }
        table += `</tr></table>`;
        return table;
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
            alert ('You lose!');
        }
    }
    this.checkWin = function () {
        if(this.trueTimes===answer.answer.length)
            alert('You Win!');
    }
}

