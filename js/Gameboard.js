function GameBoard() {
    this.drawCharacterButton = function () {
        let alphabet = "abcdefghijklmnopqrstuvwxyz";
        let string;
        string = "<table>";
        string += "<tr>";
        for (let i = 0; i < alphabet.length; i++) {
            string += "<td><button>"+alphabet[i]+"</button></td>";
        }
        string += "</tr>";
        string += "</table>";
        document.write(string);
    }

    this.drawAnswerArea = function (answer) {
        this.answer = answer.getAnswer();
        let table = "<table><tr>";
        for (let i = 0; i <this.answer.length; i++) {
            table += "<td style='background-color: green; width:20px; height: 20px'></td>";
        }
        table += "</tr></table>";
        document.write(table);
    }
    this.checkTrueCharacter = function (character) {
        answer = answer.getAnswer();
        this.character = character;
        if (answer.indexOf(character) < 0)
            return false;
        return true;
    }
    this.countFalse = function () {
        let count =0;
        if(!checkTrueCharacter){
            while (count < 6){
                count++;
                drawHangMan(count);
            }
        }
    }
    this.drawHangMan = function () {

    }




    
}