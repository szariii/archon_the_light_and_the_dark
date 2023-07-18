import { Character, Color, Position } from "../interfaces";
import arrayWithCharactersStats from "../data/arrayWithCharactersStats";

class CreateBoard implements CreateBoard {
  readonly arrayWithInformationsAboutCharakters: Array<Character> =
    arrayWithCharactersStats;
  arrayWithCurrentInformationsAboutCharacters: Array<Character> = [];
  rootDiv: HTMLDivElement = document.getElementById("root") as HTMLDivElement;

  yellowCharactersIds: Array<number> = [];
  blueCharactersIds: Array<number> = [];
  arrayWithPlacesOfCharacters: Array<Array<Array<number>>> = [
    [[10], [8], [], [], [], [], [], [26], [28]],
    [[12], [1], [], [], [], [], [], [19], [30]],
    [[14], [2], [], [], [], [], [], [20], [32]],
    [[17], [3], [], [], [], [], [], [21], [34]],
    [[18], [4], [], [], [], [], [], [22], [36]],
    [[16], [5], [], [], [], [], [], [23], [35]],
    [[15], [6], [], [], [], [], [], [24], [33]],
    [[13], [7], [], [], [], [], [], [25], [31]],
    [[11], [9], [], [], [], [], [], [27], [29]],
  ];

  sidesColor: Color = {
    yellow: "#ffff3f",
    blue: "#004a9c",
  };

  constructor(
    playgroundHeight: number,
    playgroundWidth: number,
    movingSide: number,
    startingSide: number
  ) {
    this.playgroundHeight = playgroundHeight;
    this.playgroundWidth = playgroundWidth;
    this.movingSide = movingSide;
    this.startingSide = startingSide;
  }

  renderPlayground() {
    const playground: HTMLDivElement = document.createElement("div");
    //Array with current color of fields
    let arrayWithColorsOfFields: Array<Array<String>> = [
      ["F", "A", "F", "C", "C", "C", "A", "F", "A"],
      ["A", "F", "C", "A", "C", "F", "C", "A", "F"],
      ["F", "C", "A", "F", "C", "A", "F", "C", "A"],
      ["C", "A", "F", "A", "C", "F", "A", "F", "C"],
      ["A", "C", "C", "C", "C", "C", "C", "C", "F"],
      ["C", "A", "F", "A", "C", "F", "A", "F", "C"],
      ["F", "C", "A", "F", "C", "A", "F", "C", "A"],
      ["A", "F", "C", "A", "C", "F", "C", "A", "F"],
      ["F", "A", "F", "C", "C", "C", "A", "F", "A"],
    ];
    //Colors
    //A-the brightest
    //F-the darkest
    playground.id = "playground";
    playground.classList.add("playground");
    const title: HTMLHeadingElement = document.getElementById(
      "title"
    ) as HTMLHeadingElement;
    const board: HTMLDivElement = document.createElement(
      "div"
    ) as HTMLDivElement;
    board.id = "board";
    if (this.movingSide === 0) {
      board.style.borderColor = this.sidesColor.yellow;
      title.style.color = this.sidesColor.yellow;
    } else {
      board.style.borderColor = this.sidesColor.blue;
      title.style.color = this.sidesColor.blue;
    }

    board.classList.add("board");

    const darkFiledsPositions: Array<Position> = [];
    const lightFiledsPositions: Array<Position> = [];
    const arrayWithChangingColorFields: Array<HTMLDivElement> = [];
    const changingFieldsPosition: Array<Position> = [];
    let sideOfChangingColor = 1;
    let colorsChangingArrayIndex = 3;

    for (let i: number = 0; i < this.playgroundHeight; i++) {
      for (let j: number = 0; j < this.playgroundWidth; j++) {
        const createFieldDiv = document.createElement("div");
        createFieldDiv.classList.add("field");
        createFieldDiv.id = `${i}_${j}`;

        if (
          (i === 0 && j === 0) ||
          (i === 0 && j === 2) ||
          (i === 0 && j === 7) ||
          (i === 1 && j === 1) ||
          (i === 1 && j === 5) ||
          (i === 1 && j === 8) ||
          (i === 2 && j === 0) ||
          (i === 2 && j === 3) ||
          (i === 2 && j === 6) ||
          (i === 3 && j === 2) ||
          (i === 3 && j === 5) ||
          (i === 3 && j === 7) ||
          (i === 4 && j === 8) ||
          (i === 5 && j === 2) ||
          (i === 5 && j === 5) ||
          (i === 5 && j === 7) ||
          (i === 6 && j === 0) ||
          (i === 6 && j === 3) ||
          (i === 6 && j === 6) ||
          (i === 7 && j === 1) ||
          (i === 7 && j === 5) ||
          (i === 7 && j === 8) ||
          (i === 8 && j === 0) ||
          (i === 8 && j === 2) ||
          (i === 8 && j === 7)
        ) {
          arrayWithColorsOfFields[i][j] = "F";
          createFieldDiv.classList.add("fieldF");
          darkFiledsPositions.push({ i: i, j: j });
        } else if (
          (i === 0 && j === 1) ||
          (i === 0 && j === 6) ||
          (i === 0 && j === 8) ||
          (i === 1 && j === 0) ||
          (i === 1 && j === 3) ||
          (i === 1 && j === 7) ||
          (i === 2 && j === 2) ||
          (i === 2 && j === 5) ||
          (i === 2 && j === 8) ||
          (i === 3 && j === 1) ||
          (i === 3 && j === 3) ||
          (i === 3 && j === 6) ||
          (i === 4 && j === 0) ||
          (i === 5 && j === 1) ||
          (i === 5 && j === 3) ||
          (i === 5 && j === 6) ||
          (i === 6 && j === 2) ||
          (i === 6 && j === 5) ||
          (i === 6 && j === 8) ||
          (i === 7 && j === 0) ||
          (i === 7 && j === 3) ||
          (i === 7 && j === 7) ||
          (i === 8 && j === 1) ||
          (i === 8 && j === 6) ||
          (i === 8 && j === 8)
        ) {
          arrayWithColorsOfFields[i][j] = "A";
          createFieldDiv.classList.add("fieldA");
          lightFiledsPositions.push({ i: i, j: j });
        } else {
          arrayWithChangingColorFields.push(createFieldDiv);
          changingFieldsPosition.push({ i: i, j: j });
          if (this.startingSide === 0) {
            arrayWithColorsOfFields[i][j] = "D";
            createFieldDiv.classList.add("fieldD");
          } else {
            arrayWithColorsOfFields[i][j] = "C";
            createFieldDiv.classList.add("fieldC");
            sideOfChangingColor = -1;
            colorsChangingArrayIndex = 2;
          }
        }

        if (
          (i === 0 && j === 4) ||
          (i === 4 && j === 0) ||
          (i === 4 && j === 4) ||
          (i === 4 && j === 8) ||
          (i === 8 && j === 4)
        ) {
          const targetImg: HTMLImageElement = document.createElement("img");
          targetImg.src = "./src/src/target.png";
          targetImg.classList.add("target");
          targetImg.width = 30;
          targetImg.height = 30;
          createFieldDiv.appendChild(targetImg);
        }
        board.appendChild(createFieldDiv);
      }
    }

    let index: number = 0;
    setInterval(() => {
      const divsToChange: HTMLCollectionOf<HTMLImageElement> =
        document.getElementsByClassName(
          "target"
        ) as HTMLCollectionOf<HTMLImageElement>;
      if (index % 2 === 0) {
        for (let i = 0; i < divsToChange.length; i++) {
          divsToChange[i].style.display = "inline";
        }
      } else {
        for (let i = 0; i < divsToChange.length; i++) {
          divsToChange[i].style.display = "none";
        }
      }

      index++;
    }, 10);

    playground.appendChild(board);
    this.rootDiv.appendChild(playground);
    return {
      colorsChangingArrayIndex: colorsChangingArrayIndex,
      sideOfChangingColor: sideOfChangingColor,
      changingFieldsPosition: changingFieldsPosition,
      darkFiledsPositions: darkFiledsPositions,
      lightFiledsPositions: lightFiledsPositions,
      arrayWithChangingColorFields: arrayWithChangingColorFields,
      arrayWithColorsOfFields:arrayWithColorsOfFields
    };
  }

  renderCharactersOnPlayground() {
    const firstFieldDiv: HTMLDivElement = document.getElementById(
      `0_0`
    ) as HTMLDivElement;
    const yellowCharactersIds: Array<number> = [];
    const blueCharactersIds: Array<number> = [];
    let arrayWithCurrentInformationsAboutCharacters: Array<Character> =
      this.arrayWithInformationsAboutCharakters.slice();

    for (let i: number = 0; i < this.playgroundHeight; i++) {
      for (let j: number = 0; j < this.playgroundWidth; j++) {
        if (this.arrayWithPlacesOfCharacters[i][j].length !== 0) {
          const characterImage: HTMLImageElement =
            document.createElement("img");
          characterImage.classList.add("character");
          characterImage.width = 48;
          characterImage.height = 48;
          const id: number = this.arrayWithPlacesOfCharacters[i][j][0];
          const informationsAboutCharacter: Character =
            this.arrayWithInformationsAboutCharakters.filter(
              (info) => info.id === id
            )[0];

          if (informationsAboutCharacter.side === 0) {
            yellowCharactersIds.push(informationsAboutCharacter.id);
          } else {
            blueCharactersIds.push(informationsAboutCharacter.id);
          }
          arrayWithCurrentInformationsAboutCharacters =
            arrayWithCurrentInformationsAboutCharacters.map((info) =>
              info.id === id
                ? { ...info, positionI: i, positionJ: j }
                : { ...info }
            );
          characterImage.style.left = `${
            firstFieldDiv.offsetLeft + 1 + j * 50
          }px`;

          characterImage.style.top = `${
            firstFieldDiv.offsetTop + 1 + i * 50
          }px`;

          characterImage.id = id.toString();
          characterImage.src = `./src/src/${informationsAboutCharacter.type}/logo.png`;
          this.rootDiv.appendChild(characterImage);
        }
      }
    }
    return {
      yellowCharactersIds: yellowCharactersIds,
      blueCharactersIds: blueCharactersIds,
      arrayWithCurrentInformationsAboutCharacters:
        arrayWithCurrentInformationsAboutCharacters,
    };
  }
}

interface CreateBoard {
  playgroundHeight: number;
  playgroundWidth: number;
  movingSide: number;
  startingSide: number;
}

export default CreateBoard;
