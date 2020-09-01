function GameBoard() {
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
                string += `<td ><button class="button" id="${i}-${j}" onclick="gameBoard.navigate('${i}-${j}',answer)">${alphabet[i][j]}</button></td>`;
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
            table += `<td id="${i}" style='background-color: green; width:20px; height: 20px' ></td>`;
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
            this.count++;
        }
        return this.count;
    }
    this.count = 0;
    this.displayTrueCharacter = function (id, answer) {
        let char= document.getElementById(id).innerText;
        for(i=0; i< answer.answer.length; i++){
            if(char==answer.answer[i]){
                document.getElementById(i).innerText= char;
            }
        }
    }
    this.drawHangman = function (id, answer) {
        this.count = this.countFalse(id, answer);
        document.getElementById('hangManImg').attributes[1].value = "../assets/Hangman-" + this.count + ".png";
    }
    this.navigate = function (id, answer) {
        if (this.checkTrueCharacter(id,answer))
            this.displayTrueCharacter(id,answer)
        else {
            this.drawHangman(id,answer);
            this.displayFalseCharacter(id);
        }
    }
    this.displayFalseCharacter =function (id) {
        let string ="";
        string += this.getClickCharacter(id);
        return string;
    }
}

