function GameBoard() {
    this.drawCharacterButton = function () {
        let alphabet = [
            ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
            ['i', 'j', 'k', 'l', 'm', 'n', 'o', 'p'],
            ['q', 'r', 's', 't', 'u', 'v', 'w', 'x'],
            ['y','z'],
        ]
        let string;
        string = `<table id='characterButton'>`;
        for (let i = 0; i < alphabet.length; i++) {
            string+=`<tr>`;
            for (let j = 0; j < alphabet[i].length; j++) {
                string += `<td><button id="${i}-${j}" onclick="gameBoard.getClickCharacter('${i}-${j}')">${alphabet[i][j]}</button></td>`;
            }
            string+=`</tr>`;
        }
        string += `</table>`;
        return string;
    }
// Đặt id cho table/ Cho td vào mảng. Làm hàm duyệt mảng lấy giá trị character.   getElementByTagName(td)
    this.drawAnswerArea = function (answer) {
        this.answer = answer.getAnswer();
        let table = "<table><tr>";
        for (let i = 0; i <this.answer.length; i++) {
            table += "<td style='background-color: green; width:20px; height: 20px' ></td>";
        }
        table += "</tr></table>";
        return table;
    }
    this.getClickCharacter = function (character) {
        let char= document.getElementById(character).innerText;
        return char;
    }

    this.checkTrueCharacter = function (character) {
        this.character = this.getClickCharacter();
       alert(this.character);
    }





    
}