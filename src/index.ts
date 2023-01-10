class Game implements Game {
  //Playground height
  playgroundHeight: number = 9;

  //Playground Width
  playgroundWidth: number = 9;

  //Starting side
  startingSide: number = 1;
  //Starting colors:
  // 0 - light (yellow)
  // 1 - dark (blue)

  //Colors of sides
  sidesColor: Color = {
    yellow: "#ffff3f",
    blue: "#004a9c",
  };

  //Places of characters
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

  //Array with current color of fields
  arrayWithColorsOfFields: Array<Array<String>> = [
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

  //Change width/height position
  changePosition: number = 50;

  //Position of cursor
  cursorPosition: Position = { i: 0, j: 0 };

  //Root div
  rootDiv: HTMLDivElement = document.getElementById("root") as HTMLDivElement;

  //Current moving side
  movingSide: number = 0;

  //information about offset of field
  offsetField: OffsetField = {
    x: 0,
    y: 0,
  };

  //Keylogger
  keyLogger: Array<KeysInformations> = [
    //light side
    { key: "ArrowLeft", clicked: false },
    { key: "ArrowUp", clicked: false },
    { key: "ArrowRight", clicked: false },
    { key: "ArrowDown", clicked: false },
    { key: "Slash", clicked: false },
    { key: "AltRight", clicked: false },
    //dark side
    { key: "KeyW", clicked: false },
    { key: "KeyD", clicked: false },
    { key: "KeyS", clicked: false },
    { key: "KeyA", clicked: false },
    { key: "KeyZ", clicked: false },
    { key: "KeyC", clicked: false },
  ];

  //Array with Intervals and timeouts informations
  intervalsIds: Array<IntervalInformations> = [];

  //Selceted Character
  selectedCharacter: Character = {
    id: 1,
    type: "Knight",
    moves: 3,
    typeOfMoves: "Ground",
    HP: 4.5,
    speed: 1,
    attackPower: 5,
    attackRate: 1.5,
    photo: "./src/src/Knight.png",
    horizontalWidthAttack: 2,
    verticalWidthAttack: 4,
    side: 0,
  };

  //Executed moves
  executedMoves: number = 0;

  //Passed road
  passedFields: Array<Position> = [];

  //Temporary position
  temporaryPosition: Position = { i: -1, j: -1 };

  //Array with informations about audios
  audioArray: Array<AudioInformation> = [];

  //Array with fields that change colors every round
  arrayWithChangingColorFields: Array<HTMLDivElement> = [];

  //change color side
  sideOfChangingColor: number = 1;
  //-1 - to light
  //1 - to dark

  //Changing colors
  colorsChangingArray: Array<string> = ["A", "B", "C", "D", "E", "F"];

  //Current place in colorsChangingArray
  colorsChangingArrayIndex: number = 3;

  //Number of rounds x2
  round: number = 1;

  //Spells for yellow side
  spellsYellowSide: Array<SpellInformation> = [
    {
      id: 0,
      name: "Teleport",
      function: (whichTime: number) => this.teleportSpell(whichTime),
    },
    {
      id: 1,
      name: "Heal",
      function: (whichTime: number) => this.healSpell(whichTime),
    },
    {
      id: 2,
      name: "Revive",
      function: (whichTime: number) => this.reviveSpell(whichTime),
    },
    {
      id: 3,
      name: "Exchange",
      function: (whichTime: number) => this.exchangeSpell(whichTime),
    },
    {
      id: 4,
      name: "Shift Time",
      function: (whichTime: number) => this.shiftTimeSpell(whichTime),
    },
    {
      id: 5,
      name: "Summon Elemental",
      function: (whichTime: number) => {
        this.summonElementalSpell(whichTime);
      },
    },
    {
      id: 6,
      name: "Imprison",
      function: (whichTime: number) => {
        this.imprisonSpell(whichTime);
      },
    },
    {
      id: 7,
      name: "Cease conjuring",
      function: (whichTime: number) => this.ceaseConjuringSpell(whichTime),
    },
  ];

  //Spells for blue side
  spellsBlueSide: Array<SpellInformation> = [
    {
      id: 0,
      name: "Teleport",
      function: (whichTime: number) => this.teleportSpell(whichTime),
    },
    {
      id: 1,
      name: "Heal",
      function: (whichTime: number) => this.healSpell(whichTime),
    },
    {
      id: 2,
      name: "Revive",
      function: (whichTime: number) => this.reviveSpell(whichTime),
    },
    {
      id: 3,
      name: "Exchange",
      function: (whichTime: number) => this.exchangeSpell(whichTime),
    },
    {
      id: 4,
      name: "Shift Time",
      function: (whichTime: number) => this.shiftTimeSpell(whichTime),
    },
    {
      id: 5,
      name: "Summon Elemental",
      function: (whichTime: number) => {
        this.summonElementalSpell(whichTime);
      },
    },
    {
      id: 6,
      name: "Imprison",
      function: (whichTime: number) => {
        this.imprisonSpell(whichTime);
      },
    },
    {
      id: 7,
      name: "Cease conjuring",
      function: (whichTime: number) => this.ceaseConjuringSpell(whichTime),
    },
  ];

  //count spells used by yellow side
  spellsUsedYellowSide: number = 0;

  //count spells used by yellow blue
  spellsUsedBlueSide: number = 0;

  //Fighting characters infoermations
  fightingCharactersInformations: FightingCharactersTypes = {
    yellow: {
      id: 1,
      type: "Knight",
      moves: 3,
      typeOfMoves: "Ground",
      HP: 4.5,
      speed: 1,
      attackPower: 5,
      attackRate: 1.5,
      photo: "./src/src/Knight.png",
      horizontalWidthAttack: 2,
      verticalWidthAttack: 4,
      side: 0,
    },
    blue: {
      id: 1,
      type: "Knight",
      moves: 3,
      typeOfMoves: "Ground",
      HP: 4.5,
      speed: 1,
      attackPower: 5,
      attackRate: 1.5,
      photo: "./src/src/Knight.png",
      horizontalWidthAttack: 2,
      verticalWidthAttack: 4,
      side: 0,
    },
  };

  //Bonus HP from place where you
  fieldColorBonus: Array<FieldColorInforamtion> = [
    {
      color: "A",
      bonusYellow: 7,
      bonusBlue: 0,
    },
    {
      color: "B",
      bonusYellow: 6,
      bonusBlue: 1,
    },
    {
      color: "C",
      bonusYellow: 4,
      bonusBlue: 3,
    },
    {
      color: "D",
      bonusYellow: 3,
      bonusBlue: 4,
    },
    {
      color: "E",
      bonusYellow: 1,
      bonusBlue: 6,
    },
    {
      color: "F",
      bonusYellow: 0,
      bonusBlue: 7,
    },
  ];

  //hp of fighting characters
  hpFightInfo: HpFightinfo = {
    yellow: 0,
    blue: 0,
  };

  //Is fighting SHapeshifter
  //1 - true
  //0 - false
  fightingShapeshifter = 0;

  //places of plants
  //phase:
  //0 - invisible
  //1 - slower
  //2 - blocker
  arrayWithPlacesOfPlants: Array<PlantsPlaces> = [];

  //Reloaded
  //1 - ready to fire
  //0 - not ready
  readyToFireYellow = 1;

  readyToFireBlue = 1;

  //Length of bullet
  bulletLength = 10;

  powerPointsPositions: Array<Position> = [
    {
      i: 0,
      j: 4,
    },
    {
      i: 4,
      j: 0,
    },
    { i: 4, j: 4 },
    { i: 4, j: 8 },
    { i: 8, j: 4 },
  ];

  currentCharacterSpellsInfo: CurrentCharacterSpellsInfo = {
    index: 0,
    spellsArray: [],
    maxValue: 0,
  };

  teleportCharacter = -1;

  arrayWithPassedFields: Array<Position> = [];

  magicCharacter: Character = {
    id: 1,
    type: "Knight",
    moves: 3,
    typeOfMoves: "Ground",
    HP: 4.5,
    speed: 1,
    attackPower: 5,
    attackRate: 1.5,
    photo: "./src/src/Knight.png",
    horizontalWidthAttack: 2,
    verticalWidthAttack: 4,
    side: 0,
  };

  arrayWithSummonElementalCharactersToUse: Array<number> = [37, 38, 39, 40];

  arrayWithSummonElementalIds: Array<number> = [37, 38, 39, 40];

  imprisonYellow = -1;

  imprisonBlue = -1;

  roundsToDraw = 24;

  //Computer side
  //-1 - none
  //0-light
  //1-dark
  computerSide = -1;

  //possible possitions of characters
  arrayWithPossibleCharactersPossitions: Array<Array<Array<number>>> = [
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
  ];

  temporaryArrayForShortestWay: Array<Array<Array<number>>> = [
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
  ];

  yellowCharactersIds: Array<number> = [];

  blueCharactersIds: Array<number> = [];

  lightFiledsPositions: Array<Position> = [];

  darkFiledsPositions: Array<Position> = [];

  changingFieldsPosition: Array<Position> = [];

  //Block move computer in fight because he shoot
  block = false;

  //temporary banshee attack
  bansheeAttackFlag = false;

  shortestWayPositions: Array<Position> = [];

  endBattleFlag: boolean = false;

  constructor(
    computerSide: number,
    startingSide: number,
    onlyPlayground: boolean
  ) {
    this.startingSide = startingSide;
    this.movingSide = startingSide;
    this.computerSide = computerSide;
    this.startGame(onlyPlayground);
  }

  startGame(onlyPlayground: boolean) {
    this.arrayWithCurrentInformationsAboutCharacters =
      this.arrayWithInformationsAboutCharakters.slice();
    this.renderPlayground();
    this.renderCharactersOnPlayground();
    if (onlyPlayground === false) {
      this.createCursor();
    }
  }

  startMovingByComputer = () => {
    let yourArmy = this.yellowCharactersIds;
    let enemyArmy = this.blueCharactersIds;
    let yourFields = this.lightFiledsPositions;
    const changingFields = this.changingFieldsPosition;
    let enemyFields = this.darkFiledsPositions;
    let yourMagicSpells = this.spellsYellowSide;

    if (this.movingSide === 1) {
      yourArmy = this.blueCharactersIds;
      enemyArmy = this.yellowCharactersIds;
      yourFields = this.darkFiledsPositions;
      enemyFields = this.lightFiledsPositions;
      yourMagicSpells = this.spellsBlueSide;
    }

    this.arrayWithPossibleCharactersPossitions = [
      [[], [], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], [], []],
    ];

    this.arrayWithPlacesOfCharacters.forEach((row, i) => {
      row.forEach((arr, j) => {
        if (arr.length === 1) {
          const character =
            this.arrayWithCurrentInformationsAboutCharacters.filter(
              (char) => char.id === arr[0]
            )[0];
          if (character.typeOfMoves === "Ground") {
            this.findPossiblePlacesForGroundCharacters(
              arr[0],
              i,
              j,
              character.moves,
              yourArmy,
              enemyArmy
            );
          } else {
            this.checkFieldsForFlyingAndTeleportingCharacters(
              arr[0],
              i,
              j,
              character.moves,
              yourArmy,
              enemyArmy
            );
          }
        }
      });
    });

    this.choosBestTaktics(
      yourArmy,
      enemyArmy,
      yourFields,
      changingFields,
      enemyFields,
      yourMagicSpells
    );
  };

  choosBestTaktics = (
    yourArmy: Array<number>,
    enemyArmy: Array<number>,
    yourFields: Array<Position>,
    changingFields: Array<Position>,
    enemyFields: Array<Position>,
    yourMagicSpells: Array<SpellInformation>
  ) => {
    let flagToMakeNextAction = true;
    //Odkomentuj po skończeniu

    if (yourMagicSpells.filter((ele) => ele.id === 0).length) {
      //Teleport
      flagToMakeNextAction = this.teleportSpellComputer();
      console.log(flagToMakeNextAction);
    }

    if (flagToMakeNextAction === true) {
      //easy frag
      flagToMakeNextAction = this.easyFrag(
        yourArmy,
        enemyArmy,
        yourFields,
        changingFields
      );
    }

    let currentColor = this.colorsChangingArrayIndex <= 2;
    let turningToYourColor = this.sideOfChangingColor === -1;

    if (this.movingSide === 1) {
      currentColor = this.colorsChangingArrayIndex >= 3;
      turningToYourColor = this.sideOfChangingColor === 1;
    }

    console.log(this.colorsChangingArrayIndex);
    console.log(this.sideOfChangingColor);
    let yourAlivedArmyLnegth = this.arrayWithCurrentInformationsAboutCharacters
      .filter((ele) => ele.side === this.movingSide)
      .filter((ele) => ele.HP > 0)
      .filter((ele) => ele.id < 37);
    console.log(this.arrayWithCurrentInformationsAboutCharacters);
    console.log("tu powinno wejsc");
    console.log(currentColor);
    console.log(turningToYourColor);
    if (
      flagToMakeNextAction === true &&
      turningToYourColor &&
      currentColor &&
      yourAlivedArmyLnegth.length > 4
    ) {
      //take power points
      flagToMakeNextAction = this.tryToTakePowerPoints(yourArmy, enemyArmy);
      console.log("no to wchodzimy");
    }

    if (flagToMakeNextAction === true) {
      //find filed in your color
      this.findFiledInYourColor(yourArmy, yourFields);
    }
  };

  findFiledInYourColor = (
    yourArmy: Array<number>,
    yourFields: Array<Position>
  ) => {
    let selectedCharacterId = -1;
    let targetPosition: Position = { i: -1, j: -1 };
    yourFields.forEach((ele) => {
      if (this.arrayWithPlacesOfCharacters[ele.i][ele.j].length !== 0) {
        this.arrayWithPossibleCharactersPossitions[ele.i][ele.j].forEach(
          (char) => {
            const possibleCharacter =
              this.arrayWithCurrentInformationsAboutCharacters.filter(
                (val) => val.id === char
              )[0];
            if (
              possibleCharacter.side === this.movingSide &&
              possibleCharacter.positionI !== ele.i &&
              possibleCharacter.positionJ !== ele.j
            ) {
              const currentPosition: Position = {
                i: possibleCharacter.positionI as number,
                j: possibleCharacter.positionJ as number,
              };
              let characterOnYourColor = false;
              yourFields.forEach((val) => {
                console.log(val);

                if (JSON.stringify(currentPosition) === JSON.stringify(val)) {
                  console.log("jet tu");
                  characterOnYourColor = true;
                }
              });

              if (characterOnYourColor === false) {
                selectedCharacterId = char;
                targetPosition = { i: ele.i, j: ele.j };
              } else {
                if (selectedCharacterId === -1) {
                  selectedCharacterId = char;
                  targetPosition = { i: ele.i, j: ele.j };
                }
              }
            }
          }
        );
      } else {
        this.arrayWithPossibleCharactersPossitions[ele.i][ele.j].forEach(
          (char) => {
            const possibleCharacter =
              this.arrayWithCurrentInformationsAboutCharacters.filter(
                (val) => val.id === char
              )[0];
            if (possibleCharacter.side === this.movingSide) {
              const currentPosition: Position = {
                i: possibleCharacter.positionI as number,
                j: possibleCharacter.positionJ as number,
              };
              let characterOnYourColor = false;
              yourFields.forEach((val) => {
                console.log(val);

                if (JSON.stringify(currentPosition) === JSON.stringify(val)) {
                  console.log("jet tu");
                  characterOnYourColor = true;
                }
              });

              if (characterOnYourColor === false) {
                selectedCharacterId = char;
                targetPosition = { i: ele.i, j: ele.j };
              } else {
                if (selectedCharacterId === -1) {
                  selectedCharacterId = char;
                  targetPosition = { i: ele.i, j: ele.j };
                }
              }
            }
          }
        );
      }
    });

    if (selectedCharacterId !== -1) {
      const characterInformations =
        this.arrayWithCurrentInformationsAboutCharacters.filter(
          (ele) => ele.id === selectedCharacterId
        )[0];
      console.log(characterInformations);
      const characterInfoForFunctionI =
        (characterInformations.positionI as number) - this.cursorPosition.i;
      const characterInfoForFunctionJ =
        (characterInformations.positionJ as number) - this.cursorPosition.j;
      const timeToWait = this.moveCursorByComputer(
        characterInfoForFunctionI,
        characterInfoForFunctionJ
      );
      console.log(timeToWait);
      setTimeout(() => {
        this.clickCursorByComputer();
        setTimeout(() => {
          this.moveIconByComputer(
            selectedCharacterId,
            targetPosition.i,
            targetPosition.j
          );
        }, 400);
      }, 200 * (timeToWait + 2));
      return false;
    } else {
      return true;
    }
  };

  easyFrag = (
    yourArmy: Array<number>,
    enemyArmy: Array<number>,
    yourFields: Array<Position>,
    changingFields: Array<Position>
  ) => {
    let attackingCharacterId = -1;
    let targetPosition: Position = { i: -1, j: -1 };
    yourFields.forEach((ele) => {
      if (this.arrayWithPlacesOfCharacters[ele.i][ele.j].length !== 0) {
        const characterOnField =
          this.arrayWithCurrentInformationsAboutCharacters.filter(
            (char) =>
              char.id === this.arrayWithPlacesOfCharacters[ele.i][ele.j][0]
          )[0];
        if (characterOnField.side !== this.movingSide) {
          this.arrayWithPossibleCharactersPossitions[ele.i][ele.j].forEach(
            (char) => {
              if (yourArmy.includes(char)) {
                attackingCharacterId = char;
                targetPosition = { i: ele.i, j: ele.j };
              }
            }
          );
        }
      }
    });

    let goodFields: Array<number> = [0, 1];
    if (this.movingSide === 1) {
      goodFields = [4, 5];
    }

    if (
      attackingCharacterId === -1 &&
      goodFields.includes(this.colorsChangingArrayIndex)
    ) {
      changingFields.forEach((ele) => {
        if (this.arrayWithPlacesOfCharacters[ele.i][ele.j].length !== 0) {
          const characterOnField =
            this.arrayWithCurrentInformationsAboutCharacters.filter(
              (char) =>
                char.id === this.arrayWithPlacesOfCharacters[ele.i][ele.j][0]
            )[0];
          if (characterOnField.side !== this.movingSide) {
            this.arrayWithPossibleCharactersPossitions[ele.i][ele.j].forEach(
              (value) => {
                if (yourArmy.includes(value)) {
                  attackingCharacterId = value;
                  targetPosition = { i: ele.i, j: ele.j };
                }
              }
            );
          }
        }
      });
    }

    if (attackingCharacterId !== -1) {
      const characterInformations =
        this.arrayWithCurrentInformationsAboutCharacters.filter(
          (ele) => ele.id === attackingCharacterId
        )[0];
      console.log(characterInformations);
      const characterInfoForFunctionI =
        (characterInformations.positionI as number) - this.cursorPosition.i;
      const characterInfoForFunctionJ =
        (characterInformations.positionJ as number) - this.cursorPosition.j;
      const timeToWait = this.moveCursorByComputer(
        characterInfoForFunctionI,
        characterInfoForFunctionJ
      );
      console.log(timeToWait);
      setTimeout(() => {
        this.clickCursorByComputer();
        setTimeout(() => {
          this.moveIconByComputer(
            attackingCharacterId,
            targetPosition.i,
            targetPosition.j
          );
        }, 400);
      }, 200 * (timeToWait + 2));
      return false;
    } else {
      return true;
    }
  };

  tryToTakePowerPoints = (
    yourArmy: Array<number>,
    enemyArmy: Array<number>
  ) => {
    const powerPointsWhichYouCanTake: Array<Position> = [];
    const powerPointsWhichYouCanFight: Array<Position> = [];
    this.powerPointsPositions.forEach((ele) => {
      const place = this.arrayWithPlacesOfCharacters[ele.i][ele.j];
      if (place.length === 0) {
        powerPointsWhichYouCanTake.push(ele);
      } else {
        if (enemyArmy.includes(place[0])) {
          powerPointsWhichYouCanFight.push(ele);
        }
      }
    });

    console.log(powerPointsWhichYouCanTake);
    let placeWhichYouWillTake: Position = { i: -1, j: -1 };
    let attackingCharacterId = -1;
    powerPointsWhichYouCanTake.forEach((ele) => {
      const possiblePlaceToTake =
        this.arrayWithPossibleCharactersPossitions[ele.i][ele.j];
      possiblePlaceToTake.forEach((value) => {
        if (yourArmy.includes(value)) {
          const character =
            this.arrayWithCurrentInformationsAboutCharacters.filter(
              (ele) => ele.id === value
            )[0];
          const positionObject: Position = {
            i: character.positionI as number,
            j: character.positionJ as number,
          };
          let characterOnPowerPoint = false;
          console.log(positionObject);
          this.powerPointsPositions.forEach((val) => {
            console.log(val);

            if (JSON.stringify(positionObject) === JSON.stringify(val)) {
              console.log("zaliczony");
              characterOnPowerPoint = true;
            }
          });
          if (characterOnPowerPoint === false) {
            placeWhichYouWillTake = { i: ele.i, j: ele.j };
            attackingCharacterId = value;
          }
        }
      });
    });

    if (attackingCharacterId === -1) {
      powerPointsWhichYouCanFight.forEach((ele) => {
        const possiblePlaceToTake =
          this.arrayWithPossibleCharactersPossitions[ele.i][ele.j];
        possiblePlaceToTake.forEach((value) => {
          if (yourArmy.includes(value)) {
            const character =
              this.arrayWithCurrentInformationsAboutCharacters.filter(
                (ele) => ele.id === value
              )[0];
            const positionObject: Position = {
              i: character.positionI as number,
              j: character.positionJ as number,
            };
            let characterOnPowerPoint = false;
            console.log(positionObject);
            this.powerPointsPositions.forEach((val) => {
              console.log(val);

              if (JSON.stringify(positionObject) === JSON.stringify(val)) {
                console.log("zaliczony");
                characterOnPowerPoint = true;
              }
            });
            if (characterOnPowerPoint === false) {
              placeWhichYouWillTake = { i: ele.i, j: ele.j };
              attackingCharacterId = value;
            }
          }
        });
      });
    }

    if (attackingCharacterId !== -1) {
      const characterInformations =
        this.arrayWithCurrentInformationsAboutCharacters.filter(
          (ele) => ele.id === attackingCharacterId
        )[0];
      const characterInfoForFunctionI =
        (characterInformations.positionI as number) - this.cursorPosition.i;
      const characterInfoForFunctionJ =
        (characterInformations.positionJ as number) - this.cursorPosition.j;
      const timeToWait = this.moveCursorByComputer(
        characterInfoForFunctionI,
        characterInfoForFunctionJ
      );
      console.log(timeToWait);
      setTimeout(() => {
        this.clickCursorByComputer();
        setTimeout(() => {
          this.moveIconByComputer(
            attackingCharacterId,
            placeWhichYouWillTake.i,
            placeWhichYouWillTake.j
          );
        }, 400);
      }, 200 * (timeToWait + 2));
      return false;
    } else {
      return true;
    }
  };

  moveIconByComputer = (id: number, targetI: number, targetJ: number) => {
    const characterInfo =
      this.arrayWithCurrentInformationsAboutCharacters.filter(
        (ele) => ele.id === id
      )[0];
    const sourceI = characterInfo.positionI;
    const sourceJ = characterInfo.positionJ;
    if (characterInfo.typeOfMoves === "Ground") {
      const delay = this.findShortestWayForMovingIcon(
        id,
        sourceI as number,
        sourceJ as number,
        characterInfo.moves,
        targetI,
        targetJ
      );
      setTimeout(() => {
        if (this.movingSide === 0) {
          this.keyLogger = this.keyLogger.map((ele) =>
            ele.key === "Slash" ? { ...ele, clicked: true } : { ...ele }
          );
        } else {
          this.keyLogger = this.keyLogger.map((ele) =>
            ele.key === "KeyC" ? { ...ele, clicked: true } : { ...ele }
          );
        }
        this.iconsActions();
        this.keyLogger = this.keyLogger.map((ele) => ({
          ...ele,
          clicked: false,
        }));
      }, (delay + 2) * 200);
    } else {
      //if(characterInfo.typeOfMoves==="Fly"){
      console.log(targetI);
      console.log(targetJ);
      console.log(characterInfo.type);
      const delay = this.findShrtestWayForFlyingIcon(
        id,
        sourceI as number,
        sourceJ as number,
        characterInfo.moves,
        targetI,
        targetJ
      );
      setTimeout(() => {
        if (this.movingSide === 0) {
          this.keyLogger = this.keyLogger.map((ele) =>
            ele.key === "Slash" ? { ...ele, clicked: true } : { ...ele }
          );
        } else {
          this.keyLogger = this.keyLogger.map((ele) =>
            ele.key === "KeyC" ? { ...ele, clicked: true } : { ...ele }
          );
        }
        this.iconsActions();
        this.keyLogger = this.keyLogger.map((ele) => ({
          ...ele,
          clicked: false,
        }));
      }, (delay + 2) * 200);
    }
  };

  findShrtestWayForFlyingIcon = (
    id: number,
    sourceI: number,
    sourceJ: number,
    numberOfMoves: number,
    targetI: number,
    targetJ: number
  ) => {
    const arrayWithPositions: Array<Position> = [];
    while (sourceI !== targetI) {
      if (sourceI > targetI) {
        sourceI = sourceI - 1;
      } else {
        sourceI = sourceI + 1;
      }

      let position: Position = { i: sourceI, j: sourceJ };
      arrayWithPositions.push(position);
    }

    while (sourceJ !== targetJ) {
      if (sourceJ > targetJ) {
        sourceJ = sourceJ - 1;
      } else {
        sourceJ = sourceJ + 1;
      }

      let position: Position = { i: sourceI, j: sourceJ };
      arrayWithPositions.push(position);
    }
    console.log(arrayWithPositions.reverse());
    arrayWithPositions.reverse().forEach((ele, index) => {
      setTimeout(() => {
        this.moveIcon(ele.i, ele.j, id);
      }, 200 * index);
    });

    return arrayWithPositions.length;
  };

  findShortestWayForMovingIcon = (
    id: number,
    placeI: number,
    placeJ: number,
    numberOfMoves: number,
    targetI: number,
    targetJ: number
  ) => {
    // -3 - enemy character

    this.temporaryArrayForShortestWay = this.arrayWithPlacesOfCharacters.map(
      (arr) =>
        arr.map((ele) => {
          return ele.slice();
        })
    );
    this.temporaryArrayForShortestWay.map((row) =>
      row.map((arr) => {
        if (arr.length === 1) {
          return (arr[0] = -3);
        } else {
          return (arr[0] = 10000);
        }
      })
    );
    this.findShortestWay(placeI, placeJ, numberOfMoves, id);
    console.log(this.temporaryArrayForShortestWay);
    console.log(this.temporaryArrayForShortestWay[targetI][targetJ]);
    this.temporaryArrayForShortestWay[placeI][placeJ][0] = 0;
    this.shortestWayPositions = [];
    this.shortestWayPositions.push({ i: targetI, j: targetJ });
    console.log(this.temporaryArrayForShortestWay[targetI][targetJ]);
    this.lookingForShortestWay(targetI, targetJ, 100);
    console.log(this.shortestWayPositions);

    this.shortestWayPositions.reverse().forEach((ele, index) => {
      setTimeout(() => {
        this.moveIcon(ele.i, ele.j, id);
      }, 200 * index);
    });

    return this.shortestWayPositions.length;
  };

  moveIcon = (targetI: number, targetJ: number, id: number) => {
    const characterInfo =
      this.arrayWithCurrentInformationsAboutCharacters.filter(
        (ele) => ele.id === id
      )[0];
    const side = characterInfo.side;
    const sourceI = characterInfo.positionI as number;
    const sourceJ = characterInfo.positionJ as number;
    console.log(characterInfo.positionI, characterInfo.positionJ);

    let shortCutKeyLogger: KeyLoggerShortcut = {
      up: "ArrowUp",
      down: "ArrowDown",
      left: "ArrowLeft",
      right: "ArrowRight",
      attack: "Slash",
    };
    if (side === 1) {
      shortCutKeyLogger = {
        up: "KeyW",
        down: "KeyS",
        left: "KeyA",
        right: "KeyD",
        attack: "KeyC",
      };
    }

    if (targetI > sourceI) {
      this.keyLogger = this.keyLogger.map((ele) =>
        ele.key === shortCutKeyLogger.down
          ? { ...ele, clicked: true }
          : { ...ele }
      );
    } else if (targetI < sourceI) {
      this.keyLogger = this.keyLogger.map((ele) =>
        ele.key === shortCutKeyLogger.up
          ? { ...ele, clicked: true }
          : { ...ele }
      );
    }

    if (targetJ > sourceJ) {
      this.keyLogger = this.keyLogger.map((ele) =>
        ele.key === shortCutKeyLogger.right
          ? { ...ele, clicked: true }
          : { ...ele }
      );
    } else if (targetJ < sourceJ) {
      this.keyLogger = this.keyLogger.map((ele) =>
        ele.key === shortCutKeyLogger.left
          ? { ...ele, clicked: true }
          : { ...ele }
      );
    }

    this.iconsActions();
    this.arrayWithCurrentInformationsAboutCharacters =
      this.arrayWithCurrentInformationsAboutCharacters.map((ele) =>
        ele.id == id
          ? { ...ele, positionI: targetI, positionJ: targetJ }
          : { ...ele }
      );
    this.keyLogger = this.keyLogger.map((ele) => ({ ...ele, clicked: false }));
  };

  lookingForShortestWay(i: number, j: number, index: number) {
    let shortestWayIndex: { index: number; posI: number; posJ: number } = {
      index: index,
      posI: -1,
      posJ: -1,
    };

    if (i + 1 < this.playgroundWidth) {
      if (
        this.temporaryArrayForShortestWay[i + 1][j][0] !== -3 &&
        this.temporaryArrayForShortestWay[i + 1][j][0] !== 0 &&
        this.temporaryArrayForShortestWay[i + 1][j][0] < shortestWayIndex.index
      ) {
        shortestWayIndex = {
          index: this.temporaryArrayForShortestWay[i + 1][j][0],
          posI: i + 1,
          posJ: j,
        };
      }
    }

    if (i - 1 >= 0) {
      if (
        this.temporaryArrayForShortestWay[i - 1][j][0] !== -3 &&
        this.temporaryArrayForShortestWay[i - 1][j][0] !== 0 &&
        this.temporaryArrayForShortestWay[i - 1][j][0] < shortestWayIndex.index
      ) {
        shortestWayIndex = {
          index: this.temporaryArrayForShortestWay[i - 1][j][0],
          posI: i - 1,
          posJ: j,
        };
      }
    }

    if (j + 1 < this.playgroundHeight) {
      if (
        this.temporaryArrayForShortestWay[i][j + 1][0] !== -1 &&
        this.temporaryArrayForShortestWay[i][j + 1][0] !== -3 &&
        this.temporaryArrayForShortestWay[i][j + 1][0] !== 0 &&
        this.temporaryArrayForShortestWay[i][j + 1][0] < shortestWayIndex.index
      ) {
        shortestWayIndex = {
          index: this.temporaryArrayForShortestWay[i][j + 1][0],
          posI: i,
          posJ: j + 1,
        };
      }
    }

    if (j - 1 >= 0) {
      if (
        this.temporaryArrayForShortestWay[i][j - 1][0] !== -1 &&
        this.temporaryArrayForShortestWay[i][j - 1][0] !== -3 &&
        this.temporaryArrayForShortestWay[i][j - 1][0] !== 0 &&
        this.temporaryArrayForShortestWay[i][j - 1][0] < shortestWayIndex.index
      ) {
        shortestWayIndex = {
          index: this.temporaryArrayForShortestWay[i][j - 1][0],
          posI: i,
          posJ: j - 1,
        };
      }
    }

    if (shortestWayIndex.index !== index) {
      console.log("array: ", this.temporaryArrayForShortestWay);
      this.shortestWayPositions.push({
        i: shortestWayIndex.posI,
        j: shortestWayIndex.posJ,
      });
      if (shortestWayIndex.index != 0) {
        this.lookingForShortestWay(
          shortestWayIndex.posI,
          shortestWayIndex.posJ,
          shortestWayIndex.index
        );
      }
    }

    console.log(shortestWayIndex);
  }

  teleportSpellComputer = () => {
    let flagToMakeNextAction = true;
    let yourMagicGuyId = 18;
    if (this.movingSide === 1) {
      yourMagicGuyId = 36;
    }
    const magicGuyCharacter =
      this.arrayWithCurrentInformationsAboutCharacters.filter(
        (ele) => ele.id === yourMagicGuyId
      )[0];
    if (magicGuyCharacter.HP > 0) {
      let yourAssassins =
        this.arrayWithCurrentInformationsAboutCharacters.filter(
          (ele) => ele.type === "Unicorn"
        );
      let enemyAssasins =
        this.arrayWithCurrentInformationsAboutCharacters.filter(
          (ele) => ele.type === "Basilisk"
        );

      let yourColor = "A";
      if (this.movingSide === 1) {
        yourAssassins = this.arrayWithCurrentInformationsAboutCharacters.filter(
          (ele) => ele.type === "Basilisk"
        );
        enemyAssasins = this.arrayWithCurrentInformationsAboutCharacters.filter(
          (ele) => ele.type === "Unicorn"
        );

        yourColor = "F";
      }
      if (yourAssassins.length > 0 && enemyAssasins.length > 0) {
        const yourCharacter = this.compareCharactersInArray(yourAssassins);
        const enemyCharacter =
          this.compareCharactersInArrayWithFields(enemyAssasins);
        if (
          this.arrayWithColorsOfFields[enemyCharacter.positionI as number][
            enemyCharacter.positionJ as number
          ] === yourColor
        ) {
          flagToMakeNextAction = false;
          this.startTeleportMagic(
            yourCharacter,
            enemyCharacter,
            magicGuyCharacter
          );
        }
      }
    }
    return flagToMakeNextAction;
  };

  startTeleportMagic = (
    yourCharacter: Character,
    enemyCharacter: Character,
    magicGuyCharacter: Character
  ) => {
    const magicGuyPositionI = magicGuyCharacter.positionI as number;
    const magicGuyPositionJ = magicGuyCharacter.positionJ as number;

    const iIndex = magicGuyPositionI - this.cursorPosition.i;
    const jIndex = magicGuyPositionJ - this.cursorPosition.j;
    console.log(iIndex);

    this.moveCursorByComputer(iIndex, jIndex);
    setTimeout(() => {
      this.clickCursor();
      this.startMagic();
      if (this.movingSide === 0) {
        this.spellsYellowSide[0].function(0);
      } else {
        this.spellsBlueSide[0].function(0);
      }

      const yourCharacterPositionI =
        (yourCharacter.positionI as number) - this.cursorPosition.i;
      const yourCharacterPositionJ =
        (yourCharacter.positionJ as number) - this.cursorPosition.j;
      this.moveCursorByComputer(yourCharacterPositionI, yourCharacterPositionJ);

      setTimeout(() => {
        if (this.movingSide === 0) {
          this.keyLogger = this.keyLogger.map((ele) =>
            ele.key === "Slash" ? { ...ele, clicked: true } : { ...ele }
          );
        } else {
          this.keyLogger = this.keyLogger.map((ele) =>
            ele.key === "KeyC" ? { ...ele, clicked: true } : { ...ele }
          );
        }
        console.log("kilk");
        this.cursorActions(true, 1);
        this.keyLogger = this.keyLogger.map((ele) => ({
          ...ele,
          clicked: false,
        }));

        const enemyCharacterPositionI =
          (enemyCharacter.positionI as number) - this.cursorPosition.i;
        const enemyCharacterPositionJ =
          (enemyCharacter.positionJ as number) - this.cursorPosition.j;
        this.moveCursorByComputer(
          enemyCharacterPositionI,
          enemyCharacterPositionJ
        );
        setTimeout(() => {
          if (this.movingSide === 0) {
            this.keyLogger = this.keyLogger.map((ele) =>
              ele.key === "Slash" ? { ...ele, clicked: true } : { ...ele }
            );
          } else {
            this.keyLogger = this.keyLogger.map((ele) =>
              ele.key === "KeyC" ? { ...ele, clicked: true } : { ...ele }
            );
          }
          console.log("kilk");
          this.cursorActions(true, 2);
          //fight
        }, 200 * (Math.abs(enemyCharacterPositionI) + Math.abs(enemyCharacterPositionJ) + 2));
      }, 200 * (Math.abs(yourCharacterPositionI) + Math.abs(yourCharacterPositionJ) + 2));
    }, 200 * (Math.abs(iIndex) + Math.abs(jIndex) + 2));
  };

  clickCursorByComputer = () => {
    if (this.movingSide === 0) {
      this.keyLogger = this.keyLogger.map((ele) =>
        ele.key === "Slash" ? { ...ele, clicked: true } : { ...ele }
      );
    } else {
      this.keyLogger = this.keyLogger.map((ele) =>
        ele.key === "KeyC" ? { ...ele, clicked: true } : { ...ele }
      );
    }
    this.cursorActions(false, 0);
    this.keyLogger = this.keyLogger.map((ele) => ({ ...ele, clicked: false }));
  };

  moveCursorByComputer = (iIndex: number, jIndex: number) => {
    if (iIndex < 0) {
      if (this.movingSide === 0) {
        this.keyLogger = this.keyLogger.map((ele) =>
          ele.key === "ArrowUp" ? { ...ele, clicked: true } : { ...ele }
        );
      } else {
        this.keyLogger = this.keyLogger.map((ele) =>
          ele.key === "KeyW" ? { ...ele, clicked: true } : { ...ele }
        );
      }
    } else {
      if (this.movingSide === 0) {
        this.keyLogger = this.keyLogger.map((ele) =>
          ele.key === "ArrowDown" ? { ...ele, clicked: true } : { ...ele }
        );
      } else {
        this.keyLogger = this.keyLogger.map((ele) =>
          ele.key === "KeyS" ? { ...ele, clicked: true } : { ...ele }
        );
      }
    }

    for (let i = 0; i < Math.abs(iIndex); i++) {
      setTimeout(() => {
        this.cursorActions(false, 0);
      }, 0 + 200 * i);
    }

    setTimeout(() => {
      this.keyLogger = this.keyLogger.map((ele) => ({
        ...ele,
        clicked: false,
      }));

      if (jIndex < 0) {
        if (this.movingSide === 0) {
          this.keyLogger = this.keyLogger.map((ele) =>
            ele.key === "ArrowLeft" ? { ...ele, clicked: true } : { ...ele }
          );
        } else {
          this.keyLogger = this.keyLogger.map((ele) =>
            ele.key === "KeyA" ? { ...ele, clicked: true } : { ...ele }
          );
        }
      } else {
        if (this.movingSide === 0) {
          this.keyLogger = this.keyLogger.map((ele) =>
            ele.key === "ArrowRight" ? { ...ele, clicked: true } : { ...ele }
          );
        } else {
          this.keyLogger = this.keyLogger.map((ele) =>
            ele.key === "KeyD" ? { ...ele, clicked: true } : { ...ele }
          );
        }
      }

      console.log(this.keyLogger);
      for (let j = 0; j < Math.abs(jIndex); j++) {
        setTimeout(() => {
          this.cursorActions(false, 0);
        }, 0 + 200 * j);
      }
      setTimeout(() => {
        this.keyLogger = this.keyLogger.map((ele) => ({
          ...ele,
          clicked: false,
        }));
      }, 200 * Math.abs(jIndex));
    }, 200 * Math.abs(iIndex));
    return Math.abs(iIndex) + Math.abs(jIndex);
  };

  //fightComputer
  startFightByComputer = (side: string) => {
    console.log("no siema");
    let enemySide = "yellow";
    let yourCharacter = this.fightingCharactersInformations.blue;
    if (side === "yellow") {
      enemySide = "blue";
      yourCharacter = this.fightingCharactersInformations.yellow;
    }

    const computerFightAI = setInterval(() => {
      if (this.block === false) {
        if (
          yourCharacter.type === "Goblin" ||
          yourCharacter.type === "Knight" ||
          yourCharacter.type === "Banshee" ||
          yourCharacter.type === "Phoenix"
        ) {
          this.computerShortFightInterval(side, enemySide, yourCharacter);
        } else {
          this.computerLongFightInterval(side, enemySide);
        }
      }
    }, 50);

    this.intervalsIds.push({
      name: "computerFightAI",
      id: computerFightAI,
    });
  };

  computerShortFightInterval = (
    side: string,
    enemySide: string,
    yourCharacter: Character
  ) => {
    let shortCutKeyLogger: KeyLoggerShortcut = {
      up: "ArrowUp",
      down: "ArrowDown",
      left: "ArrowLeft",
      right: "ArrowRight",
      attack: "Slash",
    };
    if (side === "blue") {
      shortCutKeyLogger = {
        up: "KeyW",
        down: "KeyS",
        left: "KeyA",
        right: "KeyD",
        attack: "KeyC",
      };
    }
    const yourCharacterImg = document.getElementById(side) as HTMLImageElement;
    const enemyCharacterImg = document.getElementById(
      enemySide
    ) as HTMLImageElement;
    const centerPointOfYourCharacterI =
      parseInt(yourCharacterImg.style.top.split("px")[0]) + 25;
    const centerPointOfYourCharacterJ =
      parseInt(yourCharacterImg.style.left.split("px")[0]) + 25;

    const centerPointOfEnemyCharacterI =
      parseInt(enemyCharacterImg.style.top.split("px")[0]) + 25;
    const centerPointOfEnemyCharacterJ =
      parseInt(enemyCharacterImg.style.left.split("px")[0]) + 25;
    // console.log(yourCharacterImg)

    //Vertical
    const verticalLong = this.checkVertical(
      centerPointOfYourCharacterJ,
      centerPointOfEnemyCharacterJ
    );

    //Horizontal
    const horizontalLong = this.checkHorizontal(
      centerPointOfYourCharacterI,
      centerPointOfEnemyCharacterI
    );

    let readyToFire = this.readyToFireYellow;
    if (side === "blue") {
      readyToFire = this.readyToFireBlue;
    }

    let minValue = verticalLong;
    let closeSide = "vertical";
    if (Math.abs(horizontalLong) < Math.abs(minValue)) {
      minValue = horizontalLong;
      closeSide = "horizontal";
    }

    if (readyToFire === 1 || this.bansheeAttackFlag === true) {
      //try to attack
      if (Math.abs(verticalLong) < 70 && Math.abs(horizontalLong) < 70) {
        //atttack
        //if(closeSide==="horizontal"){
        if (horizontalLong < 50) {
          this.keyLogger = this.keyLogger.map((ele) =>
            ele.key === shortCutKeyLogger.attack
              ? { ...ele, clicked: true }
              : { ...ele }
          );
          if (centerPointOfYourCharacterJ > centerPointOfEnemyCharacterJ) {
            this.keyLogger = this.keyLogger.map((ele) =>
              ele.key === shortCutKeyLogger.left
                ? { ...ele, clicked: true }
                : { ...ele }
            );
          } else {
            this.keyLogger = this.keyLogger.map((ele) =>
              ele.key === shortCutKeyLogger.right
                ? { ...ele, clicked: true }
                : { ...ele }
            );
          }
        }
        // if(centerPointOfYourCharacterI>centerPointOfEnemyCharacterI){
        //   this.keyLogger=this.keyLogger.map(ele=>ele.key===shortCutKeyLogger.up?({...ele, clicked:true }):({...ele}))
        // }else{
        //   this.keyLogger=this.keyLogger.map(ele=>ele.key===shortCutKeyLogger.down?({...ele, clicked:true }):({...ele}))
        // }

        //}else if(closeSide==="vertical"){
        if (verticalLong < 50) {
          this.keyLogger = this.keyLogger.map((ele) =>
            ele.key === shortCutKeyLogger.attack
              ? { ...ele, clicked: true }
              : { ...ele }
          );
          if (centerPointOfYourCharacterI > centerPointOfEnemyCharacterI) {
            this.keyLogger = this.keyLogger.map((ele) =>
              ele.key === shortCutKeyLogger.up
                ? { ...ele, clicked: true }
                : { ...ele }
            );
          } else {
            this.keyLogger = this.keyLogger.map((ele) =>
              ele.key === shortCutKeyLogger.down
                ? { ...ele, clicked: true }
                : { ...ele }
            );
          }

          // if(centerPointOfYourCharacterJ>centerPointOfEnemyCharacterJ){
          //   this.keyLogger=this.keyLogger.map(ele=>ele.key===shortCutKeyLogger.left?({...ele, clicked:true }):({...ele}))
          // }else{
          //   this.keyLogger=this.keyLogger.map(ele=>ele.key===shortCutKeyLogger.right?({...ele, clicked:true }):({...ele}))
          // }
        }
      } else {
        //try take better position
        if (closeSide === "horizontal") {
          if (centerPointOfYourCharacterJ > centerPointOfEnemyCharacterJ) {
            this.keyLogger = this.keyLogger.map((ele) =>
              ele.key === shortCutKeyLogger.left
                ? { ...ele, clicked: true }
                : { ...ele }
            );
          } else {
            this.keyLogger = this.keyLogger.map((ele) =>
              ele.key === shortCutKeyLogger.right
                ? { ...ele, clicked: true }
                : { ...ele }
            );
          }
        } else if (closeSide === "vertical") {
          if (centerPointOfYourCharacterI > centerPointOfEnemyCharacterI) {
            this.keyLogger = this.keyLogger.map((ele) =>
              ele.key === shortCutKeyLogger.up
                ? { ...ele, clicked: true }
                : { ...ele }
            );
          } else {
            this.keyLogger = this.keyLogger.map((ele) =>
              ele.key === shortCutKeyLogger.down
                ? { ...ele, clicked: true }
                : { ...ele }
            );
          }
        }
      }
    } else {
      //run away
      if (closeSide === "horizontal") {
        if (centerPointOfYourCharacterJ < centerPointOfEnemyCharacterJ) {
          this.keyLogger = this.keyLogger.map((ele) =>
            ele.key === shortCutKeyLogger.left
              ? { ...ele, clicked: true }
              : { ...ele }
          );
        } else {
          this.keyLogger = this.keyLogger.map((ele) =>
            ele.key === shortCutKeyLogger.right
              ? { ...ele, clicked: true }
              : { ...ele }
          );
        }
      } else if (closeSide === "vertical") {
        if (centerPointOfYourCharacterI < centerPointOfEnemyCharacterI) {
          this.keyLogger = this.keyLogger.map((ele) =>
            ele.key === shortCutKeyLogger.up
              ? { ...ele, clicked: true }
              : { ...ele }
          );
        } else {
          this.keyLogger = this.keyLogger.map((ele) =>
            ele.key === shortCutKeyLogger.down
              ? { ...ele, clicked: true }
              : { ...ele }
          );
        }
      }
    }

    if (
      this.keyLogger.filter((ele) => ele.key === shortCutKeyLogger.attack)[0]
        .clicked
    ) {
      if (yourCharacter.type === "Banshee") {
        this.bansheeAttackFlag = true;
        setTimeout(() => {
          this.bansheeAttackFlag = false;
        }, 700);
      } else if (yourCharacter.type === "Phoenix") {
        this.block = true;
        setTimeout(() => {
          this.block = false;
        }, 1000);
      } else {
        this.block = true;
        setTimeout(() => {
          this.block = false;
        }, 200);
      }
    }
    this.fightMoving(side);
    this.keyLogger = this.keyLogger.map((ele) =>
      ele.key === shortCutKeyLogger.attack ||
      ele.key === shortCutKeyLogger.down ||
      ele.key === shortCutKeyLogger.up ||
      ele.key === shortCutKeyLogger.left ||
      ele.key === shortCutKeyLogger.right
        ? { ...ele, clicked: false }
        : { ...ele }
    );
  };

  computerLongFightInterval = (side: string, enemySide: string) => {
    let shortCutKeyLogger: KeyLoggerShortcut = {
      up: "ArrowUp",
      down: "ArrowDown",
      left: "ArrowLeft",
      right: "ArrowRight",
      attack: "Slash",
    };
    if (side === "blue") {
      shortCutKeyLogger = {
        up: "KeyW",
        down: "KeyS",
        left: "KeyA",
        right: "KeyD",
        attack: "KeyC",
      };
    }
    const yourCharacterImg = document.getElementById(side) as HTMLImageElement;
    const enemyCharacterImg = document.getElementById(
      enemySide
    ) as HTMLImageElement;
    if (document.getElementById(side) && document.getElementById(enemySide)) {
      const centerPointOfYourCharacterI =
        parseInt(yourCharacterImg.style.top.split("px")[0]) + 25;
      const centerPointOfYourCharacterJ =
        parseInt(yourCharacterImg.style.left.split("px")[0]) + 25;

      const centerPointOfEnemyCharacterI =
        parseInt(enemyCharacterImg.style.top.split("px")[0]) + 25;
      const centerPointOfEnemyCharacterJ =
        parseInt(enemyCharacterImg.style.left.split("px")[0]) + 25;
      // console.log(yourCharacterImg)
      // console.log(enemyCharacterImg)

      //Vertical
      const verticalLong = this.checkVertical(
        centerPointOfYourCharacterJ,
        centerPointOfEnemyCharacterJ
      );

      //Horizontal
      const horizontalLong = this.checkHorizontal(
        centerPointOfYourCharacterI,
        centerPointOfEnemyCharacterI
      );
      //Cross
      // let crossLong = 100
      // let flagCross="CrossLeftUpToRightDown"
      // if(centerPointOfYourCharacterI>centerPointOfEnemyCharacterI){
      //   if(centerPointOfYourCharacterJ>centerPointOfEnemyCharacterJ){
      //     crossLong=this.checkCrossLeftUpToRightDown(centerPointOfYourCharacterJ, centerPointOfEnemyCharacterJ,centerPointOfYourCharacterI,centerPointOfEnemyCharacterI)
      //   }else{
      //     crossLong=this.checkCrossLeftDownToRightUp(centerPointOfYourCharacterJ, centerPointOfEnemyCharacterJ,centerPointOfYourCharacterI,centerPointOfEnemyCharacterI)
      //     flagCross="CrossLeftDownToRightUp"
      //   }
      // }else{
      //   if(centerPointOfYourCharacterJ<centerPointOfEnemyCharacterJ){
      //     crossLong=this.checkCrossLeftDownToRightUp(centerPointOfYourCharacterJ, centerPointOfEnemyCharacterJ,centerPointOfYourCharacterI,centerPointOfEnemyCharacterI)
      //     flagCross="CrossLeftDownToRightUp"
      //   }else{
      //     crossLong=this.checkCrossLeftUpToRightDown(centerPointOfYourCharacterJ, centerPointOfEnemyCharacterJ,centerPointOfYourCharacterI,centerPointOfEnemyCharacterI)
      //   }
      // }

      let minValue = verticalLong;
      let closeSide = "vertical";
      if (Math.abs(horizontalLong) < Math.abs(minValue)) {
        minValue = horizontalLong;
        closeSide = "horizontal";
      }

      // if(Math.abs(crossLong)<Math.abs(minValue)){
      //   minValue=crossLong
      //   closeSide = flagCross
      // }

      let readyToFire = this.readyToFireYellow;
      if (side === "blue") {
        readyToFire = this.readyToFireBlue;
      }

      // console.log(minValue)
      // console.log(closeSide)
      if (readyToFire === 1) {
        //try to shoot or take better position to it
        if (closeSide === "horizontal") {
          if (Math.abs(minValue) < 25) {
            this.keyLogger = this.keyLogger.map((ele) =>
              ele.key === shortCutKeyLogger.attack
                ? { ...ele, clicked: true }
                : { ...ele }
            );
            if (centerPointOfYourCharacterJ > centerPointOfEnemyCharacterJ) {
              this.keyLogger = this.keyLogger.map((ele) =>
                ele.key === shortCutKeyLogger.left
                  ? { ...ele, clicked: true }
                  : { ...ele }
              );
            } else {
              this.keyLogger = this.keyLogger.map((ele) =>
                ele.key === shortCutKeyLogger.right
                  ? { ...ele, clicked: true }
                  : { ...ele }
              );
            }
          } else {
            if (centerPointOfYourCharacterI > centerPointOfEnemyCharacterI) {
              this.keyLogger = this.keyLogger.map((ele) =>
                ele.key === shortCutKeyLogger.up
                  ? { ...ele, clicked: true }
                  : { ...ele }
              );
            } else {
              this.keyLogger = this.keyLogger.map((ele) =>
                ele.key === shortCutKeyLogger.down
                  ? { ...ele, clicked: true }
                  : { ...ele }
              );
            }
          }
        } else if (closeSide === "vertical") {
          if (Math.abs(minValue) < 25) {
            this.keyLogger = this.keyLogger.map((ele) =>
              ele.key === shortCutKeyLogger.attack
                ? { ...ele, clicked: true }
                : { ...ele }
            );
            if (centerPointOfYourCharacterI > centerPointOfEnemyCharacterI) {
              this.keyLogger = this.keyLogger.map((ele) =>
                ele.key === shortCutKeyLogger.up
                  ? { ...ele, clicked: true }
                  : { ...ele }
              );
            } else {
              this.keyLogger = this.keyLogger.map((ele) =>
                ele.key === shortCutKeyLogger.down
                  ? { ...ele, clicked: true }
                  : { ...ele }
              );
            }
          } else {
            if (centerPointOfYourCharacterJ > centerPointOfEnemyCharacterJ) {
              this.keyLogger = this.keyLogger.map((ele) =>
                ele.key === shortCutKeyLogger.left
                  ? { ...ele, clicked: true }
                  : { ...ele }
              );
            } else {
              this.keyLogger = this.keyLogger.map((ele) =>
                ele.key === shortCutKeyLogger.right
                  ? { ...ele, clicked: true }
                  : { ...ele }
              );
            }
          }
        }
      } else {
        //run away
        if (closeSide === "horizontal") {
          if (centerPointOfYourCharacterI > centerPointOfEnemyCharacterI) {
            this.keyLogger = this.keyLogger.map((ele) =>
              ele.key === shortCutKeyLogger.down
                ? { ...ele, clicked: true }
                : { ...ele }
            );
          } else {
            this.keyLogger = this.keyLogger.map((ele) =>
              ele.key === shortCutKeyLogger.up
                ? { ...ele, clicked: true }
                : { ...ele }
            );
          }
        } else if (closeSide === "vertical") {
          if (centerPointOfYourCharacterJ > centerPointOfEnemyCharacterJ) {
            this.keyLogger = this.keyLogger.map((ele) =>
              ele.key === shortCutKeyLogger.right
                ? { ...ele, clicked: true }
                : { ...ele }
            );
          } else {
            this.keyLogger = this.keyLogger.map((ele) =>
              ele.key === shortCutKeyLogger.left
                ? { ...ele, clicked: true }
                : { ...ele }
            );
          }
        }
      }

      // console.log("verticalLong",verticalLong)
      // console.log("horizontalLong",horizontalLong)
      // console.log("crossLong",crossLong)
      // console.log(this.keyLogger)
      if (
        this.keyLogger.filter((ele) => ele.key === shortCutKeyLogger.attack)[0]
          .clicked
      ) {
        this.block = true;
        setTimeout(() => {
          this.block = false;
        }, 200);
      }
      this.fightMoving(side);
      this.keyLogger = this.keyLogger.map((ele) =>
        ele.key === shortCutKeyLogger.attack ||
        ele.key === shortCutKeyLogger.down ||
        ele.key === shortCutKeyLogger.up ||
        ele.key === shortCutKeyLogger.left ||
        ele.key === shortCutKeyLogger.right
          ? { ...ele, clicked: false }
          : { ...ele }
      );
    }
  };

  checkVertical = (
    centerPointOfYourCharacterJ: number,
    centerPointOfEnemyCharacterJ: number
  ) => {
    return centerPointOfYourCharacterJ - centerPointOfEnemyCharacterJ;
  };

  checkHorizontal = (
    centerPointOfYourCharacterI: number,
    centerPointOfEnemyCharacterI: number
  ) => {
    return centerPointOfYourCharacterI - centerPointOfEnemyCharacterI;
  };

  checkCrossLeftDownToRightUp = (
    centerPointOfYourCharacterJ: number,
    centerPointOfEnemyCharacterJ: number,
    centerPointOfYourCharacterI: number,
    centerPointOfEnemyCharacterI: number
  ) => {
    const top = this.checkVertical(
      centerPointOfYourCharacterJ,
      centerPointOfEnemyCharacterJ
    );
    const left = this.checkHorizontal(
      centerPointOfYourCharacterI,
      centerPointOfEnemyCharacterI
    );
    return top - left;
  };

  checkCrossLeftUpToRightDown = (
    centerPointOfYourCharacterJ: number,
    centerPointOfEnemyCharacterJ: number,
    centerPointOfYourCharacterI: number,
    centerPointOfEnemyCharacterI: number
  ) => {
    const top = this.checkVertical(
      centerPointOfYourCharacterJ,
      centerPointOfEnemyCharacterJ
    );
    const left = this.checkHorizontal(
      centerPointOfYourCharacterI,
      centerPointOfEnemyCharacterI
    );
    return top + left;
  };

  //

  compareCharactersInArray = (charactersArray: Array<Character>) => {
    console.log(charactersArray);
    const max = charactersArray.reduce(function (prev, current) {
      return prev.HP > current.HP ? prev : current;
    }); //returns object
    console.log(max);
    return max;
  };

  compareCharactersInArrayWithFields = (charactersArray: Array<Character>) => {
    console.log(charactersArray);

    const max = charactersArray.reduce((prev, current) => {
      const indexOfColorFiledPrevie =
        this.arrayWithColorsOfFields[prev.positionI as number][
          prev.positionJ as number
        ];
      const hpBonusPrev = this.fieldColorBonus.filter(
        (ele) => ele.color === indexOfColorFiledPrevie
      )[0];

      const indexOfColorFiledCurrent =
        this.arrayWithColorsOfFields[current.positionI as number][
          current.positionJ as number
        ];
      const hpBonusCurrent = this.fieldColorBonus.filter(
        (ele) => ele.color === indexOfColorFiledCurrent
      )[0];

      let hpWithFiledsPrev = prev.HP + hpBonusPrev.bonusYellow;
      let hpWithFiledsCurrent = current.HP + hpBonusCurrent.bonusYellow;
      if (this.movingSide === 1) {
        hpWithFiledsPrev = prev.HP + hpBonusPrev.bonusBlue;
        hpWithFiledsCurrent = current.HP + hpBonusCurrent.bonusBlue;
      }
      //const hpBonusFromField =

      return hpWithFiledsPrev > hpWithFiledsCurrent ? prev : current;
    }); //returns object
    console.log(max);
    return max;
  };

  findPossiblePlacesForGroundCharacters = (
    id: number,
    placeI: number,
    placeJ: number,
    numberOfMoves: number,
    yourArmy: Array<number>,
    enemyArmy: Array<number>
  ) => {
    // -4 - friendly character
    // -3 - enemy character

    let tempYourArray = yourArmy;
    if (enemyArmy.includes(id)) {
      tempYourArray = enemyArmy;
    }

    this.temporaryArrayForShortestWay = this.arrayWithPlacesOfCharacters.map(
      (arr) =>
        arr.map((ele) => {
          return ele.slice();
        })
    );
    this.temporaryArrayForShortestWay.map((row) =>
      row.map((arr) => {
        if (arr.length === 1) {
          if (tempYourArray.includes(arr[0])) {
            return (arr[0] = -4);
          } else {
            return (arr[0] = -3);
          }
        } else {
          return (arr[0] = 10000);
        }
      })
    );
    this.findShortestWay(placeI, placeJ, numberOfMoves, id);
    //console.log(this.temporaryArrayForShortestWay.map(row=>row.map(ele=>ele[0])))
    //arrayWithPossibleCharactersPossitions
    this.temporaryArrayForShortestWay[placeI][placeJ][0] = 1;
    this.temporaryArrayForShortestWay.forEach((row, i) =>
      row.forEach((ele, j) => {
        if (ele[0] > -3 && ele[0] <= numberOfMoves) {
          this.arrayWithPossibleCharactersPossitions[i][j].push(id);
        }
      })
    );
  };

  findShortestWay = (
    placeI: number,
    placeJ: number,
    numberOfMoves: number,
    id: number
  ) => {
    let startsArray: Array<Position> = [];
    if (placeI + 1 < 9) {
      if (this.temporaryArrayForShortestWay[placeI + 1][placeJ][0] === 10000) {
        startsArray.push({ i: placeI + 1, j: placeJ });
        this.temporaryArrayForShortestWay[placeI + 1][placeJ] = [1];
      }

      if (
        this.temporaryArrayForShortestWay[placeI + 1][placeJ][0] === -3 &&
        this.arrayWithPossibleCharactersPossitions[placeI + 1][placeJ].includes(
          id
        ) === false
      ) {
        this.arrayWithPossibleCharactersPossitions[placeI + 1][placeJ].push(id);
      }
    }

    if (placeI - 1 > -1) {
      if (this.temporaryArrayForShortestWay[placeI - 1][placeJ][0] === 10000) {
        startsArray.push({ i: placeI - 1, j: placeJ });
        this.temporaryArrayForShortestWay[placeI - 1][placeJ] = [1];
      }
      if (
        this.temporaryArrayForShortestWay[placeI - 1][placeJ][0] === -3 &&
        this.arrayWithPossibleCharactersPossitions[placeI - 1][placeJ].includes(
          id
        ) === false
      ) {
        this.arrayWithPossibleCharactersPossitions[placeI - 1][placeJ].push(id);
      }
    }

    if (placeJ - 1 > -1) {
      if (this.temporaryArrayForShortestWay[placeI][placeJ - 1][0] === 10000) {
        startsArray.push({ i: placeI, j: placeJ - 1 });
        this.temporaryArrayForShortestWay[placeI][placeJ - 1] = [1];
      }

      if (
        this.temporaryArrayForShortestWay[placeI][placeJ - 1][0] === -3 &&
        this.arrayWithPossibleCharactersPossitions[placeI][placeJ - 1].includes(
          id
        ) === false
      ) {
        this.arrayWithPossibleCharactersPossitions[placeI][placeJ - 1].push(id);
      }
    }

    if (placeJ + 1 < 9) {
      if (this.temporaryArrayForShortestWay[placeI][placeJ + 1][0] === 10000) {
        startsArray.push({ i: placeI, j: placeJ + 1 });
        this.temporaryArrayForShortestWay[placeI][placeJ + 1] = [1];
      }

      if (
        this.temporaryArrayForShortestWay[placeI][placeJ + 1][0] === -3 &&
        this.arrayWithPossibleCharactersPossitions[placeI][placeJ + 1].includes(
          id
        ) === false
      ) {
        this.arrayWithPossibleCharactersPossitions[placeI][placeJ + 1].push(id);
      }
    }

    for (let index = 0; index < startsArray.length; index++) {
      this.countMovesForChoosenStartField(
        startsArray[index].i,
        startsArray[index].j,
        2,
        numberOfMoves,
        id
      );
    }
  };

  countMovesForChoosenStartField(
    i: number,
    j: number,
    indexNumber: number,
    numberOfMoves: number,
    id: number
  ) {
    let arrayPlacesToCheck: Array<MoveCounter> = this.checkNeiberhoodFields(
      i,
      j,
      indexNumber,
      numberOfMoves,
      id
    );

    while (arrayPlacesToCheck.length > 0) {
      let temporaryArray: Array<MoveCounter> = this.checkNeiberhoodFields(
        arrayPlacesToCheck[0].i,
        arrayPlacesToCheck[0].j,
        arrayPlacesToCheck[0].indexNumber + 1,
        numberOfMoves,
        id
      );
      arrayPlacesToCheck.shift();
      temporaryArray.map((obj) => arrayPlacesToCheck.push(obj));
    }
  }

  checkNeiberhoodFields(
    i: number,
    j: number,
    indexNumber: number,
    numberOfMoves: number,
    id: number
  ) {
    let nextArray: Array<MoveCounter> = [];
    if (i + 1 < 9) {
      if (
        this.temporaryArrayForShortestWay[i + 1][j][0] === -3 &&
        numberOfMoves >= indexNumber &&
        this.arrayWithPossibleCharactersPossitions[i + 1][j].includes(id) ===
          false
      ) {
        this.arrayWithPossibleCharactersPossitions[i + 1][j].push(id);
      }

      if (
        this.temporaryArrayForShortestWay[i + 1][j][0] > -1 &&
        this.temporaryArrayForShortestWay[i + 1][j][0] > indexNumber
      ) {
        this.temporaryArrayForShortestWay[i + 1][j][0] = indexNumber;
        let obj = { i: i + 1, j: j, indexNumber: indexNumber };
        nextArray.push(obj);
      }
    }

    if (i - 1 >= 0) {
      if (
        this.temporaryArrayForShortestWay[i - 1][j][0] > -1 &&
        this.temporaryArrayForShortestWay[i - 1][j][0] > indexNumber
      ) {
        this.temporaryArrayForShortestWay[i - 1][j][0] = indexNumber;
        let obj = { i: i - 1, j: j, indexNumber: indexNumber };
        nextArray.push(obj);
      }

      if (
        this.temporaryArrayForShortestWay[i - 1][j][0] === -3 &&
        numberOfMoves >= indexNumber &&
        this.arrayWithPossibleCharactersPossitions[i - 1][j].includes(id) ===
          false
      ) {
        this.arrayWithPossibleCharactersPossitions[i - 1][j].push(id);
      }
    }

    if (j + 1 < 9) {
      if (
        this.temporaryArrayForShortestWay[i][j + 1][0] > -1 &&
        this.temporaryArrayForShortestWay[i][j + 1][0] > indexNumber
      ) {
        this.temporaryArrayForShortestWay[i][j + 1][0] = indexNumber;
        let obj = { i: i, j: j + 1, indexNumber: indexNumber };
        nextArray.push(obj);
      }

      if (
        this.temporaryArrayForShortestWay[i][j + 1][0] === -3 &&
        numberOfMoves >= indexNumber &&
        this.arrayWithPossibleCharactersPossitions[i][j + 1].includes(id) ===
          false
      ) {
        this.arrayWithPossibleCharactersPossitions[i][j + 1].push(id);
      }
    }

    if (j - 1 >= 0) {
      if (
        this.temporaryArrayForShortestWay[i][j - 1][0] > -1 &&
        this.temporaryArrayForShortestWay[i][j - 1][0] > indexNumber
      ) {
        this.temporaryArrayForShortestWay[i][j - 1][0] = indexNumber;
        let obj = { i: i, j: j - 1, indexNumber: indexNumber };
        nextArray.push(obj);
      }

      if (
        this.temporaryArrayForShortestWay[i][j - 1][0] === -3 &&
        numberOfMoves >= indexNumber &&
        this.arrayWithPossibleCharactersPossitions[i][j - 1].includes(id) ===
          false
      ) {
        this.arrayWithPossibleCharactersPossitions[i][j - 1].push(id);
      }
    }
    return nextArray;
  }

  checkFieldsForFlyingAndTeleportingCharacters = (
    id: number,
    placeI: number,
    placeJ: number,
    numberOfMoves: number,
    yourArmy: Array<number>,
    enemyArmy: Array<number>
  ) => {
    let tempYourArray = yourArmy;
    if (enemyArmy.includes(id)) {
      tempYourArray = enemyArmy;
    }

    this.arrayWithPossibleCharactersPossitions[placeI][placeJ].push(id);
    for (let i = placeI - numberOfMoves; i <= placeI + numberOfMoves; i++) {
      if (i > -1 && i < 9) {
        for (let j = placeJ - numberOfMoves; j <= placeJ + numberOfMoves; j++) {
          if (j > -1 && j < 9) {
            if (this.arrayWithPlacesOfCharacters[i][j].length === 0) {
              this.arrayWithPossibleCharactersPossitions[i][j].push(id);
            } else {
              if (
                tempYourArray.includes(
                  this.arrayWithPlacesOfCharacters[i][j][0]
                ) !== true
              ) {
                this.arrayWithPossibleCharactersPossitions[i][j].push(id);
              }
            }
          }
        }
      }
    }
  };

  startMagic = () => {
    window.onkeydown = () => {};
    window.onkeyup = () => {};

    this.keyLogger = this.keyLogger.map((ele) => ({ ...ele, clicked: false }));

    this.intervalsIds
      .filter((ele) => ele.name === "moveCursorInterval")
      .forEach((ele) => {
        clearInterval(ele.id);
      });

    this.intervalsIds = this.intervalsIds.filter(
      (ele) => ele.name !== "moveCursorInterval"
    );
    if (document.getElementById("textInfo")) {
      const textInfoDiv = document.getElementById("textInfo") as HTMLDivElement;
      textInfoDiv.remove();
    }

    const newTextInfoDiv = document.createElement("div");
    newTextInfoDiv.id = "textInfo";
    const header = document.createElement("h2");
    header.innerText = "Select a spell";
    newTextInfoDiv.appendChild(header);

    let index = 0;
    let maxValue = this.spellsYellowSide.length;
    let spellsArray = this.spellsYellowSide;
    if (this.movingSide === 1) {
      maxValue = this.spellsBlueSide.length;
      spellsArray = this.spellsBlueSide;
    }

    if (index === maxValue) {
      index = 0;
    }

    if (index === -1) {
      index = maxValue - 1;
    }

    this.currentCharacterSpellsInfo = {
      index: 0,
      maxValue: maxValue,
      spellsArray: spellsArray,
    };

    const selectedSpellInfo = document.createElement("h2");
    selectedSpellInfo.id = "selectedSpell";
    selectedSpellInfo.innerText = `${spellsArray[index].name}`;
    newTextInfoDiv.appendChild(selectedSpellInfo);

    this.rootDiv.appendChild(newTextInfoDiv);

    window.onkeydown = () => {
      this.changeSpell(event as KeyboardEvent);
    };
  };

  changeSpell = (event: KeyboardEvent) => {
    console.log(event);
    if (this.movingSide === 0) {
      if (event.code === "ArrowUp") {
        let newIndex = this.currentCharacterSpellsInfo.index - 1;
        if (newIndex < 0) {
          newIndex = this.currentCharacterSpellsInfo.maxValue - 1;
        }
        this.currentCharacterSpellsInfo = {
          ...this.currentCharacterSpellsInfo,
          index: newIndex,
        };
        this.changeSpellOnWindow();
      } else if (event.code === "ArrowDown") {
        let newIndex = this.currentCharacterSpellsInfo.index + 1;
        if (newIndex === this.currentCharacterSpellsInfo.maxValue) {
          newIndex = 0;
        }
        this.currentCharacterSpellsInfo = {
          ...this.currentCharacterSpellsInfo,
          index: newIndex,
        };
        this.changeSpellOnWindow();
      } else if (event.code === "Slash") {
        this.currentCharacterSpellsInfo.spellsArray[
          this.currentCharacterSpellsInfo.index
        ].function(0);
      }
    } else {
      if (event.code === "KeyW") {
        let newIndex = this.currentCharacterSpellsInfo.index - 1;
        if (newIndex < 0) {
          newIndex = this.currentCharacterSpellsInfo.maxValue - 1;
        }
        this.currentCharacterSpellsInfo = {
          ...this.currentCharacterSpellsInfo,
          index: newIndex,
        };
        this.changeSpellOnWindow();
      } else if (event.code === "KeyS") {
        let newIndex = this.currentCharacterSpellsInfo.index + 1;
        if (newIndex === this.currentCharacterSpellsInfo.maxValue) {
          newIndex = 0;
        }
        this.currentCharacterSpellsInfo = {
          ...this.currentCharacterSpellsInfo,
          index: newIndex,
        };
        this.changeSpellOnWindow();
      } else if (event.code === "KeyC") {
        this.currentCharacterSpellsInfo.spellsArray[
          this.currentCharacterSpellsInfo.index
        ].function(0);
      }
    }
  };

  changeSpellOnWindow = () => {
    const textInfoDiv = document.getElementById("textInfo") as HTMLDivElement;
    const oldSelectedSpell = document.getElementById(
      "selectedSpell"
    ) as HTMLDivElement;
    oldSelectedSpell.remove();

    const newSelectedSpell = document.createElement("h2");
    newSelectedSpell.id = "selectedSpell";
    newSelectedSpell.innerText = `${
      this.currentCharacterSpellsInfo.spellsArray[
        this.currentCharacterSpellsInfo.index
      ].name
    }`;
    textInfoDiv.appendChild(newSelectedSpell);
  };

  selectPowerPointInMagic = () => {
    const div = document.getElementById("bodyText") as HTMLHeadingElement;
    div.innerText = "Power points are proof against magic";
    setTimeout(() => {
      const textInfo = document.getElementById("textInfo") as HTMLDivElement;
      textInfo.remove();
      const newTextInfo = document.createElement("div");
      newTextInfo.id = "textInfo";
      const header = document.createElement("h2");
      header.innerText = "Spell is canceled. choose another";
      newTextInfo.appendChild(header);
      this.rootDiv.appendChild(newTextInfo);
      setTimeout(() => {
        this.startMagic();
      }, 1000);
    }, 1000);
  };

  ceaseConjuringSpell = (whichTime: number) => {
    window.onkeydown = () => {};
    const textInfo = document.getElementById("textInfo") as HTMLDivElement;
    textInfo.remove();

    const newTextInfo = document.createElement("div");
    newTextInfo.id = "textInfo";
    const header = document.createElement("h2");
    header.id = "header";
    header.innerText = "Cease conjuring";
    newTextInfo.appendChild(header);

    const bodyText = document.createElement("h2");
    bodyText.id = "bodyText";
    bodyText.innerText = "It is done";
    newTextInfo.appendChild(bodyText);
    this.rootDiv.appendChild(newTextInfo);
    setTimeout(() => {
      const textInfo = document.getElementById("textInfo") as HTMLDivElement;
      textInfo.remove();
      window.onkeydown = () => {
        this.changeKeyPositions(
          event as KeyboardEvent,
          true,
          "cursor",
          false,
          0
        );
      };

      window.onkeyup = () => {
        this.changeKeyPositions(
          event as KeyboardEvent,
          false,
          "cursor",
          false,
          0
        );
      };
    }, 1000);
  };

  imprisonSpell = (whichTime: number) => {
    if (whichTime === 0) {
      const oldTextInfo = document.getElementById(
        "textInfo"
      ) as HTMLImageElement;
      oldTextInfo.remove();

      const newTextInfo = document.createElement("div");
      newTextInfo.id = "textInfo";
      const header = document.createElement("h2");
      header.id = "header";
      header.innerText = "Imprison";

      const bodyText = document.createElement("h2");
      bodyText.id = "bodyText";
      let flagSensOfSpell = true;
      if (this.movingSide === 0) {
        //colorsChangingArrayIndex
        if (this.colorsChangingArrayIndex === 5) {
          flagSensOfSpell = false;
        }
      } else {
        if (this.colorsChangingArrayIndex === 0) {
          flagSensOfSpell = false;
        }
      }

      if (flagSensOfSpell === false) {
        bodyText.innerText = "That spell would be wasted at this time";
        setTimeout(() => {
          const bodyText = document.getElementById(
            "bodyText"
          ) as HTMLHeadElement;
          bodyText.remove();

          const header = document.getElementById(
            "header"
          ) as HTMLHeadingElement;
          header.innerText = "Spell is canceled. Choose another";

          setTimeout(() => {
            this.startMagic();
          }, 1000);
        }, 1000);
      } else {
        bodyText.innerText = "Which foe will you imprison?";
        window.onkeydown = () => {
          this.changeKeyPositions(
            event as KeyboardEvent,
            true,
            "cursor",
            true,
            1
          );
        };

        window.onkeyup = () => {
          this.changeKeyPositions(
            event as KeyboardEvent,
            false,
            "cursor",
            true,
            1
          );
        };
      }

      newTextInfo.appendChild(header);
      newTextInfo.appendChild(bodyText);
      this.rootDiv.appendChild(newTextInfo);
    } else if (whichTime === 1) {
      console.log("impriosn");
      console.log(this.cursorPosition);

      const clickOnPowerPoint = this.powerPointsPositions
        .filter((ele) => ele.i === this.cursorPosition.i)
        .filter((ele) => ele.j === this.cursorPosition.j);
      if (clickOnPowerPoint.length !== 0) {
        this.selectPowerPointInMagic();
      } else {
        const characterId =
          this.arrayWithPlacesOfCharacters[this.cursorPosition.i][
            this.cursorPosition.j
          ][0];
        if (
          this.arrayWithCurrentInformationsAboutCharacters.filter(
            (ele) => ele.id === characterId
          )[0].side !== this.movingSide
        ) {
          const bodyText = document.getElementById(
            "bodyText"
          ) as HTMLHeadingElement;
          bodyText.innerText = "It is done";

          this.usedSpell("Imprison");

          if (this.movingSide === 0) {
            this.imprisonBlue = characterId;
          } else {
            this.imprisonYellow = characterId;
          }

          setTimeout(() => {
            this.endRound();
          }, 1000);
        }
      }
    }
  };

  summonElementalSpell = (whichTime: number) => {
    let oppositeSide = 1;
    if (this.movingSide === 1) {
      oppositeSide = 0;
    }
    let enemyOutOfPowerPoint = false;
    this.arrayWithPlacesOfCharacters.forEach((row, indexI) => {
      row.forEach((ele, indexJ) => {
        if (ele.length === 1) {
          const findedCharacter =
            this.arrayWithCurrentInformationsAboutCharacters.filter(
              (char) => char.id === ele[0]
            )[0];
          if (findedCharacter.side === oppositeSide) {
            let enemyOnPowerPoint = false;
            this.powerPointsPositions.forEach((pos) => {
              if (
                pos.i === findedCharacter.positionI &&
                pos.j === findedCharacter.positionJ
              ) {
                enemyOnPowerPoint = true;
              }
            });

            if (enemyOnPowerPoint === false) {
              enemyOutOfPowerPoint = true;
            }
          }
        }
      });
    });

    if (enemyOutOfPowerPoint !== false) {
      let choosSummonElementalFlag = false;
      while (choosSummonElementalFlag === false) {
        const summonElementalId = this.getRandomInt(37, 40);
        console.log(summonElementalId);
        if (
          this.arrayWithSummonElementalCharactersToUse.filter(
            (ele) => ele === summonElementalId
          ).length !== 0
        ) {
          choosSummonElementalFlag = true;
          this.magicCharacter = this.arrayWithCurrentInformationsAboutCharacters
            .filter((ele) => ele.id === summonElementalId)
            .map((ele) => ({ ...ele, side: this.movingSide }))[0];
          this.arrayWithCurrentInformationsAboutCharacters =
            this.arrayWithCurrentInformationsAboutCharacters.map((ele) =>
              ele.id === summonElementalId
                ? { ...ele, side: this.movingSide }
                : { ...ele }
            );
          this.arrayWithSummonElementalCharactersToUse =
            this.arrayWithSummonElementalCharactersToUse.filter(
              (ele) => ele !== summonElementalId
            );

          const firstField = document.getElementById("0_0") as HTMLDivElement;

          const characterImg = document.createElement("img");
          characterImg.width = 50;
          characterImg.height = 50;
          characterImg.classList.add("character");
          characterImg.id = `${this.magicCharacter.id}`;
          if (this.movingSide === 0) {
            this.temporaryPosition = { i: 4, j: -2 };
            characterImg.src = `./src/src/${this.magicCharacter.type}/right_0.png`;
          } else {
            this.temporaryPosition = { i: 4, j: 10 };
            characterImg.src = `./src/src/${this.magicCharacter.type}/left_0.png`;
          }

          characterImg.style.top = `${
            firstField.offsetTop + this.temporaryPosition.i * 50
          }px`;
          characterImg.style.left = `${
            firstField.offsetLeft + this.temporaryPosition.j * 50
          }px`;
          this.rootDiv.appendChild(characterImg);

          const oldInfoText = document.getElementById(
            "textInfo"
          ) as HTMLDivElement;
          oldInfoText.remove();

          const infoText = document.createElement("div");
          infoText.id = "textInfo";
          const header = document.createElement("h2");
          header.id = "header";
          header.innerText = `An ${this.magicCharacter.type} elemental appears!`;
          infoText.appendChild(header);

          const body = document.createElement("h2");
          body.innerText = "Send it to the target";
          body.id = "bodyText";
          infoText.appendChild(body);
          this.rootDiv.appendChild(infoText);

          window.onkeydown = () => {
            this.changeKeyPositions(
              event as KeyboardEvent,
              true,
              "summonElemental",
              false,
              0
            );
          };

          window.onkeyup = () => {
            this.changeKeyPositions(
              event as KeyboardEvent,
              false,
              "summonElemental",
              false,
              0
            );
          };
        }
      }
    } else {
      const oldTextInfo = document.getElementById("textInfo") as HTMLDivElement;
      oldTextInfo.remove();

      const newTextInfo = document.createElement("div");
      newTextInfo.id = "textInfo";
      const header = document.createElement("h2");
      header.id = "header";
      header.innerText = "Summon elemental";
      newTextInfo.appendChild(header);

      const bodyText = document.createElement("h2");
      bodyText.id = "bodyText";
      bodyText.innerText = "Power points are proof against magic";
      newTextInfo.appendChild(bodyText);
      this.rootDiv.appendChild(newTextInfo);

      setTimeout(() => {
        const header = document.getElementById("header") as HTMLHeadingElement;
        header.innerText = "Spell is canceled. Choose another";

        const bodyText = document.getElementById(
          "bodyText"
        ) as HTMLHeadingElement;
        bodyText.remove();
        setTimeout(() => {
          this.startMagic();
        }, 1000);
      }, 1000);
    }
  };

  reviveSpell = (whichTime: number) => {
    let idYourMage = 18; //yellow side
    if (this.movingSide === 1) {
      idYourMage = 36;
    }
    const mageCharacter =
      this.arrayWithCurrentInformationsAboutCharacters.filter(
        (ele) => ele.id === idYourMage
      )[0];
    const magePositionI = mageCharacter.positionI as number;
    const magePositionJ = mageCharacter.positionJ as number;

    const arrayWithPassedFieldsLocal: Array<Position> = [];

    console.log(this.intervalsIds);
    window.onkeydown = () => {};
    window.onkeyup = () => {};
    this.keyLogger = this.keyLogger.map((ele) => ({ ...ele, clicked: false }));

    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        if (
          magePositionI + i > -1 &&
          magePositionI + i < this.playgroundHeight &&
          magePositionJ + j > -1 &&
          magePositionJ + j < this.playgroundWidth
        ) {
          if (
            this.arrayWithPlacesOfCharacters[magePositionI + i][
              magePositionJ + j
            ].length === 0
          ) {
            let isPowerPoint = false;
            this.powerPointsPositions.forEach((ele) => {
              if (ele.i === magePositionI + i && ele.j === magePositionJ + j) {
                isPowerPoint = true;
              }
            });

            if (isPowerPoint === false) {
              arrayWithPassedFieldsLocal.push({
                i: magePositionI + i,
                j: magePositionJ + j,
              });
            }
          }
        }
      }
    }

    if (arrayWithPassedFieldsLocal.length === 0) {
      const textInfo = document.getElementById("textInfo") as HTMLDivElement;
      textInfo.remove();
      const newTextInfo = document.createElement("div");
      newTextInfo.id = "textInfo";
      const header1 = document.createElement("h2");
      header1.innerText = "Alas, master, there is no opening in the";

      const header2 = document.createElement("h2");
      header2.innerText = "charmed square. Conjure another spell";

      newTextInfo.appendChild(header1);
      newTextInfo.appendChild(header2);
      this.rootDiv.appendChild(newTextInfo);

      setTimeout(() => {
        const textInfo = document.getElementById("textInfo") as HTMLDivElement;
        textInfo.remove();
        const newTextInfo = document.createElement("div");
        newTextInfo.id = "textInfo";

        const header = document.createElement("h2");
        header.innerText = "Spell is canceled. Choose another";
        newTextInfo.appendChild(header);
        this.rootDiv.appendChild(newTextInfo);
        setTimeout(() => {
          this.startMagic();
        }, 1000);
      }, 2000);
    } else {
      const arrayWithDeadCharacters: Array<DeadCharacter> = [];
      this.arrayWithCurrentInformationsAboutCharacters.forEach((ele, index) => {
        if (
          ele.side === this.movingSide &&
          ele.HP < 0 &&
          arrayWithDeadCharacters.filter(
            (value) => value.character.type === ele.type
          ).length === 0
        ) {
          arrayWithDeadCharacters.push({ index: index, character: ele });
        }
      });
      console.log(arrayWithDeadCharacters);
      if (arrayWithDeadCharacters.length === 0) {
        const textInfo = document.getElementById("textInfo") as HTMLDivElement;
        textInfo.remove();
        const newTextInfo = document.createElement("div");
        newTextInfo.id = "textInfo";
        const header1 = document.createElement("h2");
        header1.innerText = "Happily, master, all your icons live.";

        const header2 = document.createElement("h2");
        header2.innerText = "Please conjure a different spell";

        newTextInfo.appendChild(header1);
        newTextInfo.appendChild(header2);
        this.rootDiv.appendChild(newTextInfo);

        setTimeout(() => {
          const textInfo = document.getElementById(
            "textInfo"
          ) as HTMLDivElement;
          textInfo.remove();
          const newTextInfo = document.createElement("div");
          newTextInfo.id = "textInfo";

          const header = document.createElement("h2");
          header.innerText = "Spell is canceled. Choose another";
          newTextInfo.appendChild(header);
          this.rootDiv.appendChild(newTextInfo);
          setTimeout(() => {
            this.startMagic();
          }, 1000);
        }, 2000);
      } else {
        const oldTextInfo = document.getElementById(
          "textInfo"
        ) as HTMLDivElement;
        oldTextInfo.remove();

        const newTextInfo = document.createElement("div");
        newTextInfo.id = "textInfo";
        const header = document.createElement("h2");
        header.innerText = "Revive";

        const body = document.createElement("h2");
        body.id = "bodyText";
        body.innerText = "What icon will you revive?";

        newTextInfo.appendChild(header);
        newTextInfo.appendChild(body);

        this.rootDiv.appendChild(newTextInfo);

        const deadCharactersDiv = document.createElement("div");
        deadCharactersDiv.classList.add("deadCharacterDiv");

        const firstFiled = document.getElementById(`0_0`) as HTMLDivElement;
        deadCharactersDiv.style.top = `${firstFiled.offsetTop}px`;
        if (this.movingSide === 0) {
          deadCharactersDiv.style.left = `${firstFiled.offsetLeft - 99}px`;
        } else {
          deadCharactersDiv.style.left = `${firstFiled.offsetLeft + 501}px`;
        }

        arrayWithDeadCharacters.forEach((ele) => {
          const characterImg = document.createElement("img");
          characterImg.src = `./src/src/${ele.character.type}/logo.png`;
          characterImg.width = 48;
          characterImg.height = 48;
          characterImg.id = `${ele.character.id}`;
          deadCharactersDiv.appendChild(characterImg);
        });

        this.rootDiv.appendChild(deadCharactersDiv);
        const cursor = document.getElementById("cursor") as HTMLDivElement;
        cursor.remove();

        const newCursor = document.createElement("div");
        newCursor.classList.add("cursor");
        newCursor.id = "cursor";
        newCursor.style.top = `${firstFiled.offsetTop + 374}px`;
        if (this.movingSide === 0) {
          newCursor.style.left = `${firstFiled.offsetLeft - 110}px`;
          newCursor.style.borderColor = this.sidesColor.yellow;
        } else {
          newCursor.style.left = `${firstFiled.offsetLeft + 490}px`;
          newCursor.style.borderColor = this.sidesColor.blue;
        }
        this.rootDiv.appendChild(newCursor);
        let selectedCharacterIndex = 8;

        window.onkeydown = (ev: KeyboardEvent) => {
          console.log("dalej keydown");
          const cursorDiv = document.getElementById("cursor") as HTMLDivElement;

          if (this.movingSide === 0) {
            if (ev.code === "ArrowUp") {
              if (selectedCharacterIndex > 0) {
                cursorDiv.style.top = `${
                  parseInt(cursorDiv.style.top.split("px")[0]) - 48
                }px`;
                selectedCharacterIndex = selectedCharacterIndex - 1;
              }
            } else if (ev.code === "ArrowDown") {
              if (selectedCharacterIndex < 9) {
                cursorDiv.style.top = `${
                  parseInt(cursorDiv.style.top.split("px")[0]) + 48
                }px`;
                selectedCharacterIndex = selectedCharacterIndex + 1;
              }
            } else if (ev.code === "Slash") {
              if (arrayWithDeadCharacters.length > selectedCharacterIndex) {
                window.onkeydown = () => {};
                this.magicCharacter =
                  arrayWithDeadCharacters[selectedCharacterIndex].character;
                this.arrayWithPassedFields = arrayWithPassedFieldsLocal;

                arrayWithDeadCharacters.forEach((ele) => {
                  const characterImageToRemove = document.getElementById(
                    `${ele.character.id}`
                  ) as HTMLImageElement;
                  characterImageToRemove.remove();
                });

                const selectedCharacterImg = document.createElement("img");
                selectedCharacterImg.id = `${arrayWithDeadCharacters[selectedCharacterIndex].character.id}`;
                selectedCharacterImg.src = `./src/src/${arrayWithDeadCharacters[selectedCharacterIndex].character.type}/logo.png`;
                selectedCharacterImg.width = 48;
                selectedCharacterImg.height = 48;
                selectedCharacterImg.style.top = `${
                  parseInt(cursorDiv.style.top.split("px")[0]) + 11
                }px`;
                selectedCharacterImg.style.left = `${
                  parseInt(cursorDiv.style.left.split("px")[0]) + 11
                }px`;
                selectedCharacterImg.classList.add("character");
                this.rootDiv.appendChild(selectedCharacterImg);

                const bodyText = document.getElementById(
                  "bodyText"
                ) as HTMLHeadingElement;
                bodyText.innerText = "Place it within the charmed square";

                if (this.movingSide === 0) {
                  this.temporaryPosition = { i: selectedCharacterIndex, j: -2 };
                } else {
                  this.temporaryPosition = { i: selectedCharacterIndex, j: 10 };
                }

                window.onkeydown = () => {
                  this.changeKeyPositions(
                    event as KeyboardEvent,
                    true,
                    "revive",
                    false,
                    0
                  );
                };

                window.onkeyup = () => {
                  this.changeKeyPositions(
                    event as KeyboardEvent,
                    false,
                    "revive",
                    false,
                    0
                  );
                };
              }
            }
          } else {
            if (ev.code === "KeyW") {
              if (selectedCharacterIndex > 0) {
                cursorDiv.style.top = `${
                  parseInt(cursorDiv.style.top.split("px")[0]) - 48
                }px`;
                selectedCharacterIndex = selectedCharacterIndex - 1;
              }
            } else if (ev.code === "KeyS") {
              if (selectedCharacterIndex < 8) {
                cursorDiv.style.top = `${
                  parseInt(cursorDiv.style.top.split("px")[0]) + 48
                }px`;
                selectedCharacterIndex = selectedCharacterIndex + 1;
              }
            } else if (ev.code === "KeyC") {
              if (arrayWithDeadCharacters.length > selectedCharacterIndex) {
                window.onkeydown = () => {};
                this.magicCharacter =
                  arrayWithDeadCharacters[selectedCharacterIndex].character;
                this.arrayWithPassedFields = arrayWithPassedFieldsLocal;

                arrayWithDeadCharacters.forEach((ele) => {
                  const characterImageToRemove = document.getElementById(
                    `${ele.character.id}`
                  ) as HTMLImageElement;
                  characterImageToRemove.remove();
                });

                const selectedCharacterImg = document.createElement("img");
                selectedCharacterImg.id = `${arrayWithDeadCharacters[selectedCharacterIndex].character.id}`;
                selectedCharacterImg.src = `./src/src/${arrayWithDeadCharacters[selectedCharacterIndex].character.type}/logo.png`;
                selectedCharacterImg.width = 48;
                selectedCharacterImg.height = 48;
                selectedCharacterImg.style.top = `${
                  parseInt(cursorDiv.style.top.split("px")[0]) + 11
                }px`;
                selectedCharacterImg.style.left = `${
                  parseInt(cursorDiv.style.left.split("px")[0]) + 11
                }px`;
                selectedCharacterImg.classList.add("character");
                this.rootDiv.appendChild(selectedCharacterImg);

                const bodyText = document.getElementById(
                  "bodyText"
                ) as HTMLHeadingElement;
                bodyText.innerText = "Place it within the charmed square";

                if (this.movingSide === 0) {
                  this.temporaryPosition = { i: selectedCharacterIndex, j: -2 };
                } else {
                  this.temporaryPosition = { i: selectedCharacterIndex, j: 10 };
                }

                window.onkeydown = () => {
                  this.changeKeyPositions(
                    event as KeyboardEvent,
                    true,
                    "revive",
                    false,
                    0
                  );
                };

                window.onkeyup = () => {
                  this.changeKeyPositions(
                    event as KeyboardEvent,
                    false,
                    "revive",
                    false,
                    0
                  );
                };
              }
            }
          }
        };
      }
    }
  };

  exchangeSpell = (whichTime: number) => {
    console.log(whichTime);
    if (whichTime === 0) {
      const textInfo = document.getElementById("textInfo") as HTMLDivElement;
      textInfo.remove();
      const newTextInfo = document.createElement("div");
      newTextInfo.id = "textInfo";
      const header = document.createElement("h2");
      header.innerText = "Exchange";

      const body = document.createElement("h2");
      body.innerText = "Choose an icon to transpose";
      body.id = "bodyText";
      newTextInfo.appendChild(header);
      newTextInfo.appendChild(body);
      this.rootDiv.appendChild(newTextInfo);
      window.onkeydown = () => {
        this.changeKeyPositions(
          event as KeyboardEvent,
          true,
          "cursor",
          true,
          1
        );
      };

      window.onkeyup = () => {
        this.changeKeyPositions(
          event as KeyboardEvent,
          false,
          "cursor",
          true,
          1
        );
      };
    } else if (whichTime === 1) {
      if (
        this.arrayWithPlacesOfCharacters[this.cursorPosition.i][
          this.cursorPosition.j
        ].length === 1
      ) {
        const characterToTeleport =
          this.arrayWithPlacesOfCharacters[this.cursorPosition.i][
            this.cursorPosition.j
          ][0];
        this.teleportCharacter = characterToTeleport;
        let powerPointFlag = false;
        this.powerPointsPositions.forEach((ele) => {
          if (
            ele.i === this.cursorPosition.i &&
            ele.j === this.cursorPosition.j
          ) {
            powerPointFlag = true;
          }
        });

        window.onkeyup = () => {};
        window.onkeydown = () => {};
        this.keyLogger = this.keyLogger.map((ele) => ({
          ...ele,
          clicked: false,
        }));
        if (powerPointFlag === false) {
          const div = document.getElementById("bodyText") as HTMLHeadingElement;
          div.innerText = "Exchange it with which icon?";
          window.onkeydown = () => {
            this.changeKeyPositions(
              event as KeyboardEvent,
              true,
              "cursor",
              true,
              2
            );
          };

          window.onkeyup = () => {
            this.changeKeyPositions(
              event as KeyboardEvent,
              false,
              "cursor",
              true,
              2
            );
          };
        } else {
          this.selectPowerPointInMagic();
        }
      }
    } else if (whichTime === 2) {
      console.log(this.cursorPosition);
      let powerPointFlag = false;
      this.powerPointsPositions.forEach((ele) => {
        if (
          ele.i === this.cursorPosition.i &&
          ele.j === this.cursorPosition.j
        ) {
          powerPointFlag = true;
        }
      });
      if (powerPointFlag === false) {
        if (
          this.arrayWithPlacesOfCharacters[this.cursorPosition.i][
            this.cursorPosition.j
          ].length === 1
        ) {
          window.onkeydown = () => {};
          window.onkeyup = () => {};
          this.keyLogger = this.keyLogger.map((ele) => ({
            ...ele,
            clicked: false,
          }));

          const firstCharacter: Character =
            this.arrayWithCurrentInformationsAboutCharacters.filter(
              (ele) => ele.id === this.teleportCharacter
            )[0];
          const secondCharacter: Character =
            this.arrayWithCurrentInformationsAboutCharacters.filter(
              (ele) =>
                ele.id ===
                this.arrayWithPlacesOfCharacters[this.cursorPosition.i][
                  this.cursorPosition.j
                ][0]
            )[0];

          console.log(firstCharacter);
          console.log(secondCharacter);

          const firstCharacterI = firstCharacter.positionI as number;
          const firstCharacterJ = firstCharacter.positionJ as number;

          const secondCharacterI = secondCharacter.positionI as number;
          const secondCharacterJ = secondCharacter.positionJ as number;

          console.log(this.arrayWithPlacesOfCharacters);
          console.log(this.arrayWithCurrentInformationsAboutCharacters);

          this.arrayWithCurrentInformationsAboutCharacters =
            this.arrayWithCurrentInformationsAboutCharacters.map((ele) =>
              ele.id === firstCharacter.id
                ? {
                    ...ele,
                    positionI: secondCharacterI,
                    positionJ: secondCharacterJ,
                  }
                : { ...ele }
            );
          this.arrayWithCurrentInformationsAboutCharacters =
            this.arrayWithCurrentInformationsAboutCharacters.map((ele) =>
              ele.id === secondCharacter.id
                ? {
                    ...ele,
                    positionI: firstCharacterI,
                    positionJ: firstCharacterJ,
                  }
                : { ...ele }
            );

          this.arrayWithPlacesOfCharacters[firstCharacterI][firstCharacterJ] = [
            secondCharacter.id,
          ];
          this.arrayWithPlacesOfCharacters[secondCharacterI][secondCharacterJ] =
            [firstCharacter.id];
          console.log(this.arrayWithCurrentInformationsAboutCharacters);
          console.log(this.arrayWithPlacesOfCharacters);

          const firstCharacterImg = document.getElementById(
            `${firstCharacter.id}`
          ) as HTMLImageElement;
          const secondCharacterImg = document.getElementById(
            `${secondCharacter.id}`
          ) as HTMLImageElement;

          firstCharacterImg.style.visibility = "hidden";
          secondCharacterImg.style.visibility = "hidden";

          const firstImgTop = firstCharacterImg.style.top;
          const firstImgLeft = firstCharacterImg.style.left;

          const secondImgTop = secondCharacterImg.style.top;
          const secondImgLeft = secondCharacterImg.style.left;

          firstCharacterImg.style.top = secondImgTop;
          firstCharacterImg.style.left = secondImgLeft;

          secondCharacterImg.style.top = firstImgTop;
          secondCharacterImg.style.left = firstImgLeft;

          this.usedSpell("Exchange");

          setTimeout(() => {
            firstCharacterImg.style.visibility = "visible";
            secondCharacterImg.style.visibility = "visible";

            this.endRound();
          }, 1000);
        }
      } else {
        this.selectPowerPointInMagic();
      }
    }
  };

  usedSpell = (spellName: string) => {
    this.roundsToDraw = 24;
    if (this.movingSide === 0) {
      this.spellsUsedYellowSide = this.spellsUsedYellowSide + 1;
      this.spellsYellowSide = this.spellsYellowSide.filter(
        (ele) => ele.name !== spellName
      );
    } else {
      this.spellsUsedBlueSide = this.spellsUsedBlueSide + 1;
      this.spellsBlueSide = this.spellsBlueSide.filter(
        (ele) => ele.name !== spellName
      );
    }
  };

  shiftTimeSpell = (whichTime: number) => {
    //sideOfChangingColor
    if (this.sideOfChangingColor === 1) {
      this.sideOfChangingColor = -1;
    } else {
      this.sideOfChangingColor = 1;
    }
    const textInfo = document.getElementById("textInfo") as HTMLDivElement;
    textInfo.remove();
    const newTextInfo = document.createElement("div");
    newTextInfo.id = "textInfo";
    const header = document.createElement("h2");
    header.innerText = "Teleport";

    const body = document.createElement("h2");
    body.innerText = "The flow of time is reversed";
    body.id = "bodyText";
    newTextInfo.appendChild(header);
    newTextInfo.appendChild(body);
    this.rootDiv.appendChild(newTextInfo);
    window.onkeydown = () => {};
    window.onkeyup = () => {};
    this.keyLogger = this.keyLogger.map((ele) => ({ ...ele, clicked: false }));
    this.usedSpell("Shift Time");
    setTimeout(() => {
      this.endRound();
    }, 1000);
  };

  teleportSpell = (whichTime: number) => {
    console.log(whichTime);
    if (whichTime === 0) {
      if (document.getElementById("textInfo")) {
        const textInfo = document.getElementById("textInfo") as HTMLDivElement;
        textInfo.remove();
      }
      const newTextInfo = document.createElement("div");
      newTextInfo.id = "textInfo";
      const header = document.createElement("h2");
      header.innerText = "Teleport";

      const body = document.createElement("h2");
      body.innerText = "Which icon will you teleport?";
      body.id = "bodyText";
      newTextInfo.appendChild(header);
      newTextInfo.appendChild(body);
      this.rootDiv.appendChild(newTextInfo);
      window.onkeydown = () => {
        this.changeKeyPositions(
          event as KeyboardEvent,
          true,
          "cursor",
          true,
          1
        );
      };

      window.onkeyup = () => {
        this.changeKeyPositions(
          event as KeyboardEvent,
          false,
          "cursor",
          true,
          1
        );
      };
    } else if (whichTime === 1) {
      if (
        this.arrayWithPlacesOfCharacters[this.cursorPosition.i][
          this.cursorPosition.j
        ].length === 1
      ) {
        const characterToTeleport =
          this.arrayWithPlacesOfCharacters[this.cursorPosition.i][
            this.cursorPosition.j
          ][0];
        console.log("czesc drugi if");
        console.log(
          this.arrayWithCurrentInformationsAboutCharacters.filter(
            (ele) => ele.id === characterToTeleport
          )[0].side
        );
        console.log(this.selectedCharacter.side);
        if (
          this.arrayWithCurrentInformationsAboutCharacters.filter(
            (ele) => ele.id === characterToTeleport
          )[0].side === this.selectedCharacter.side
        ) {
          console.log("czesc first if");

          this.teleportCharacter = characterToTeleport;
          let powerPointFlag = false;
          this.powerPointsPositions.forEach((ele) => {
            if (
              ele.i === this.cursorPosition.i &&
              ele.j === this.cursorPosition.j
            ) {
              powerPointFlag = true;
            }
          });

          window.onkeyup = () => {};
          window.onkeydown = () => {};
          this.keyLogger = this.keyLogger.map((ele) => ({
            ...ele,
            clicked: false,
          }));
          if (powerPointFlag === false) {
            const div = document.getElementById(
              "bodyText"
            ) as HTMLHeadingElement;
            div.innerText = "Where will you teleport it?";
            window.onkeydown = () => {
              this.changeKeyPositions(
                event as KeyboardEvent,
                true,
                "cursor",
                true,
                2
              );
            };

            window.onkeyup = () => {
              this.changeKeyPositions(
                event as KeyboardEvent,
                false,
                "cursor",
                true,
                2
              );
            };
          } else {
            this.selectPowerPointInMagic();
          }
        }
      }
    } else if (whichTime === 2) {
      console.log(this.cursorPosition);
      let powerPointFlag = false;
      this.powerPointsPositions.forEach((ele) => {
        if (
          ele.i === this.cursorPosition.i &&
          ele.j === this.cursorPosition.j
        ) {
          powerPointFlag = true;
        }
      });
      if (powerPointFlag === false) {
        console.log("Zmiana miejsca");
        console.log(
          this.arrayWithPlacesOfCharacters[this.cursorPosition.i][
            this.cursorPosition.j
          ]
        );
        const character: Character =
          this.arrayWithCurrentInformationsAboutCharacters.filter(
            (ele) => ele.id === this.teleportCharacter
          )[0];
        if (
          this.arrayWithPlacesOfCharacters[this.cursorPosition.i][
            this.cursorPosition.j
          ].length === 0
        ) {
          window.onkeydown = () => {};
          window.onkeyup = () => {};
          this.usedSpell("Teleport");
          this.selectPlaceTeleport(
            this.cursorPosition.i,
            this.cursorPosition.j,
            character
          );
        } else {
          const idCharacterOnSelectedPlace =
            this.arrayWithPlacesOfCharacters[this.cursorPosition.i][
              this.cursorPosition.j
            ][0];
          const characterOnSelectedPlace =
            this.arrayWithCurrentInformationsAboutCharacters.filter(
              (ele) => ele.id === idCharacterOnSelectedPlace
            )[0];
          if (characterOnSelectedPlace.side !== character.side) {
            window.onkeydown = () => {};
            window.onkeyup = () => {};
            this.usedSpell("Teleport");
            this.selectPlaceTeleport(
              this.cursorPosition.i,
              this.cursorPosition.j,
              character
            );
          }
        }
      } else {
        this.selectPowerPointInMagic();
      }
    }
  };

  healSpell = (whichTime: number) => {
    console.log(whichTime);
    if (whichTime === 0) {
      const textInfo = document.getElementById("textInfo") as HTMLDivElement;
      textInfo.remove();
      const newTextInfo = document.createElement("div");
      newTextInfo.id = "textInfo";
      const header = document.createElement("h2");
      header.innerText = "Heal";

      const body = document.createElement("h2");
      body.innerText = "Which icon will you heal?";
      body.id = "bodyText";
      newTextInfo.appendChild(header);
      newTextInfo.appendChild(body);
      this.rootDiv.appendChild(newTextInfo);
      window.onkeydown = () => {
        this.changeKeyPositions(
          event as KeyboardEvent,
          true,
          "cursor",
          true,
          1
        );
      };

      window.onkeyup = () => {
        this.changeKeyPositions(
          event as KeyboardEvent,
          false,
          "cursor",
          true,
          1
        );
      };
    } else {
      if (
        this.arrayWithPlacesOfCharacters[this.cursorPosition.i][
          this.cursorPosition.j
        ].length === 1
      ) {
        const characterToHealId =
          this.arrayWithPlacesOfCharacters[this.cursorPosition.i][
            this.cursorPosition.j
          ][0];
        if (
          this.arrayWithCurrentInformationsAboutCharacters.filter(
            (ele) => ele.id === characterToHealId
          )[0].side === this.selectedCharacter.side
        ) {
          let powerPointFlag = false;
          this.powerPointsPositions.forEach((ele) => {
            if (
              ele.i === this.cursorPosition.i &&
              ele.j === this.cursorPosition.j
            ) {
              powerPointFlag = true;
            }
          });

          window.onkeyup = () => {};
          window.onkeydown = () => {};
          this.keyLogger = this.keyLogger.map((ele) => ({
            ...ele,
            clicked: false,
          }));
          if (powerPointFlag === false) {
            const div = document.getElementById(
              "bodyText"
            ) as HTMLHeadingElement;
            div.innerText = "It is done";
            this.arrayWithCurrentInformationsAboutCharacters =
              this.arrayWithCurrentInformationsAboutCharacters.map((value) =>
                value.id === characterToHealId
                  ? {
                      ...value,
                      HP: this.arrayWithInformationsAboutCharakters.filter(
                        (ele) => ele.id === characterToHealId
                      )[0].HP,
                    }
                  : { ...value }
              );
            this.usedSpell("Heal");
            setTimeout(() => {
              this.endRound();
            }, 1000);
          } else {
            this.selectPowerPointInMagic();
          }
        }
      }
    }
  };

  phoenixAttack = (colorSide: string) => {
    let enemyColor = "blue";
    if (colorSide === "blue") {
      enemyColor = "yellow";
    }

    const characterImg = document.getElementById(
      `${colorSide}`
    ) as HTMLImageElement;
    let src = "./src/src/";

    if (this.fightingShapeshifter === 1 && colorSide === "blue") {
      src += `Shapeshifter/Phoenix/`;
    } else {
      src += `Phoenix/`;
    }

    characterImg.src = `${src}attack_0.png`;
    characterImg.style.visibility = "hidden";

    const phoenixPointX = parseInt(characterImg.style.left.split("px")[0]) + 25;
    const phoenixPointY = parseInt(characterImg.style.top.split("px")[0]) + 25;

    const attack = document.createElement("img");
    attack.id = `bullet${colorSide}`;
    attack.src = `${src}attack_0.png`;
    attack.width = 50;
    attack.height = 50;
    attack.style.top = `${phoenixPointY - 25}px`;
    attack.style.left = `${phoenixPointX - 25}px`;
    attack.classList.add("cloudAttack");
    this.rootDiv.appendChild(attack);

    this.phoenixCloseAttack(colorSide, enemyColor);

    setTimeout(() => {
      const bullet = document.getElementById(
        `bullet${colorSide}`
      ) as HTMLImageElement;
      bullet.src = `${src}attack_1.png`;
      bullet.width = 100;
      bullet.height = 100;
      bullet.style.top = `${phoenixPointY - 50}px`;
      bullet.style.left = `${phoenixPointX - 50}px`;
      this.phoenixMediumAttack(colorSide, enemyColor);
    }, 200);

    setTimeout(() => {
      const bullet = document.getElementById(
        `bullet${colorSide}`
      ) as HTMLImageElement;
      bullet.src = `${src}attack_2.png`;
      bullet.height = 100;
      bullet.width = 200;
      bullet.style.top = `${phoenixPointY - 50}px`;
      bullet.style.left = `${phoenixPointX - 100}px`;
      this.phoenixLongAttack(colorSide, enemyColor);
    }, 400);

    setTimeout(() => {
      const bullet = document.getElementById(
        `bullet${colorSide}`
      ) as HTMLImageElement;
      bullet.src = `${src}attack_1.png`;
      bullet.width = 100;
      bullet.height = 100;
      bullet.style.top = `${phoenixPointY - 50}px`;
      bullet.style.left = `${phoenixPointX - 50}px`;
      this.phoenixMediumAttack(colorSide, enemyColor);
    }, 600);

    setTimeout(() => {
      const bullet = document.getElementById(
        `bullet${colorSide}`
      ) as HTMLImageElement;
      bullet.width = 50;
      bullet.height = 50;
      bullet.style.top = `${phoenixPointY - 25}px`;
      bullet.style.left = `${phoenixPointX - 25}px`;
      bullet.src = `${src}attack_0.png`;
      this.phoenixCloseAttack(colorSide, enemyColor);
    }, 800);

    setTimeout(() => {
      const characterImg = document.getElementById(
        `${colorSide}`
      ) as HTMLImageElement;
      characterImg.style.visibility = "visible";
      characterImg.src = `${src}/up_1.png`;
      const bullet = document.getElementById(
        `bullet${colorSide}`
      ) as HTMLImageElement;
      bullet.remove();

      let attackRate = this.fightingCharactersInformations.yellow.attackRate;
      let audioSrc = "./src/src/light_reloaded.wav";
      if (colorSide === "blue") {
        attackRate = this.fightingCharactersInformations.blue.attackRate;
        audioSrc = "./src/src/dark_reloaded.wav";
      }

      const reload = setTimeout(() => {
        if (colorSide === "blue") {
          this.readyToFireBlue = 1;
        } else {
          this.readyToFireYellow = 1;
        }
        this.readyToFireBlue = 1;
        const fireReadyAudio = new Audio();
        fireReadyAudio.src = audioSrc;
        fireReadyAudio.play();
      }, 1000 / attackRate);

      this.intervalsIds.push({
        id: reload,
        name: "reload",
      });
    }, 1000);
  };

  phoenixCloseAttack = (colorSide: string, enemyColor: string) => {
    if (document.getElementById(`${enemyColor}`)) {
      const characterImg = document.getElementById(
        `bullet${colorSide}`
      ) as HTMLImageElement;
      const phoenixPointX =
        parseInt(characterImg.style.left.split("px")[0]) + 25;
      const phoenixPointY =
        parseInt(characterImg.style.top.split("px")[0]) + 25;

      const enemyCharacterImg = document.getElementById(
        `${enemyColor}`
      ) as HTMLImageElement;
      const enemyPointX =
        parseInt(enemyCharacterImg.style.left.split("px")[0]) + 25;
      const enemyPointY =
        parseInt(enemyCharacterImg.style.top.split("px")[0]) + 25;

      const lengthBetweenCenterPoints = Math.sqrt(
        Math.pow(phoenixPointX - enemyPointX, 2) +
          Math.pow(phoenixPointY - enemyPointY, 2)
      );
      const sumOfLengthR = 50;

      if (lengthBetweenCenterPoints < sumOfLengthR) {
        let enemyType = this.fightingCharactersInformations.yellow.type;
        let enemyAttack = document.getElementById("bulletyellow");
        if (colorSide === "yellow") {
          enemyType = this.fightingCharactersInformations.blue.type;
          enemyAttack = document.getElementById("bulletblue");
        }
        console.log(enemyAttack);
        if (enemyType !== "Phoenix" || !enemyAttack) {
          this.giveDamage(colorSide);
        }
      }
    }
  };

  phoenixMediumAttack = (colorSide: string, enemyColor: string) => {
    const bulletImg = document.getElementById(
      `bullet${colorSide}`
    ) as HTMLImageElement;
    const phoenixPointX = parseInt(bulletImg.style.left.split("px")[0]);
    const phoenixPointY = parseInt(bulletImg.style.top.split("px")[0]);

    const arrayWithPoints: Array<PositionOfDemagePoints> = [];

    //1
    arrayWithPoints.push({
      x: phoenixPointX + 55,
      y: phoenixPointY,
    });

    //2
    arrayWithPoints.push({
      x: phoenixPointX + 81,
      y: phoenixPointY + 10,
    });

    //3
    arrayWithPoints.push({
      x: phoenixPointX + 97,
      y: phoenixPointY + 17,
    });

    //4
    arrayWithPoints.push({
      x: phoenixPointX + 97,
      y: phoenixPointY + 51,
    });

    //5
    arrayWithPoints.push({
      x: phoenixPointX + 97,
      y: phoenixPointY + 83,
    });

    //6
    arrayWithPoints.push({
      x: phoenixPointX + 80,
      y: phoenixPointY + 90,
    });

    //7
    arrayWithPoints.push({
      x: phoenixPointX + 52,
      y: phoenixPointY + 100,
    });

    //8
    arrayWithPoints.push({
      x: phoenixPointX + 22,
      y: phoenixPointY + 92,
    });

    //9
    arrayWithPoints.push({
      x: phoenixPointX,
      y: phoenixPointY + 83,
    });

    //10
    arrayWithPoints.push({
      x: phoenixPointX,
      y: phoenixPointY + 52,
    });

    //11
    arrayWithPoints.push({
      x: phoenixPointX,
      y: phoenixPointY + 17,
    });

    //12
    arrayWithPoints.push({
      x: phoenixPointX + 33,
      y: phoenixPointY + 7,
    });

    //13
    arrayWithPoints.push({
      x: phoenixPointX + 33,
      y: phoenixPointY + 36,
    });

    //14
    arrayWithPoints.push({
      x: phoenixPointX + 71,
      y: phoenixPointY + 36,
    });

    //15
    arrayWithPoints.push({
      x: phoenixPointX + 71,
      y: phoenixPointY + 70,
    });

    //16
    arrayWithPoints.push({
      x: phoenixPointX + 33,
      y: phoenixPointY + 70,
    });

    //17
    arrayWithPoints.push({
      x: phoenixPointX + 50,
      y: phoenixPointY + 50,
    });

    if (document.getElementById(`${enemyColor}`)) {
      const enemyCharacterImage = document.getElementById(
        `${enemyColor}`
      ) as HTMLImageElement;

      const enemyX: number =
        parseInt(enemyCharacterImage.style.left.split("px")[0]) + 25;
      const enemyY: number =
        parseInt(enemyCharacterImage.style.top.split("px")[0]) + 25;

      let lengthBetweenCenterPoints = 100;

      arrayWithPoints.forEach((ele) => {
        let temp = Math.sqrt(
          Math.pow(ele.x - enemyX, 2) + Math.pow(ele.y - enemyY, 2)
        );

        if (temp < lengthBetweenCenterPoints) {
          lengthBetweenCenterPoints = temp;
        }
      });

      if (lengthBetweenCenterPoints < 25) {
        //Hit enemy
        let enemyType = this.fightingCharactersInformations.yellow.type;
        let enemyAttack = document.getElementById("bulletyellow");
        if (colorSide === "yellow") {
          enemyType = this.fightingCharactersInformations.blue.type;
          enemyAttack = document.getElementById("bulletblue");
        }
        if (enemyType !== "Phoenix" || !enemyAttack) {
          this.giveDamage(colorSide);
        }
      }
    }
  };

  phoenixLongAttack = (colorSide: string, enemyColor: string) => {
    const bulletImg = document.getElementById(
      `bullet${colorSide}`
    ) as HTMLImageElement;
    const phoenixPointX = parseInt(bulletImg.style.left.split("px")[0]);
    const phoenixPointY = parseInt(bulletImg.style.top.split("px")[0]);

    const arrayWithPoints: Array<PositionOfDemagePoints> = [];

    //1
    arrayWithPoints.push({
      x: phoenixPointX,
      y: phoenixPointY + 16,
    });

    //2
    arrayWithPoints.push({
      x: phoenixPointX,
      y: phoenixPointY + 50,
    });

    //3
    arrayWithPoints.push({
      x: phoenixPointX,
      y: phoenixPointY + 84,
    });

    //4
    arrayWithPoints.push({
      x: phoenixPointX + 27,
      y: phoenixPointY + 11,
    });

    //5
    arrayWithPoints.push({
      x: phoenixPointX + 27,
      y: phoenixPointY + 89,
    });

    //6
    arrayWithPoints.push({
      x: phoenixPointX + 38,
      y: phoenixPointY + 33,
    });

    //7
    arrayWithPoints.push({
      x: phoenixPointX + 38,
      y: phoenixPointY + 64,
    });

    //8
    arrayWithPoints.push({
      x: phoenixPointX + 52,
      y: phoenixPointY + 8,
    });

    //9
    arrayWithPoints.push({
      x: phoenixPointX + 52,
      y: phoenixPointY + 95,
    });

    //10
    arrayWithPoints.push({
      x: phoenixPointX + 76,
      y: phoenixPointY + 4,
    });

    //11
    arrayWithPoints.push({
      x: phoenixPointX + 76,
      y: phoenixPointY + 30,
    });

    //12
    arrayWithPoints.push({
      x: phoenixPointX + 76,
      y: phoenixPointY + 66,
    });

    //13
    arrayWithPoints.push({
      x: phoenixPointX + 76,
      y: phoenixPointY + 100,
    });

    //14
    arrayWithPoints.push({
      x: phoenixPointX + 114,
      y: phoenixPointY,
    });

    //15
    arrayWithPoints.push({
      x: phoenixPointX + 114,
      y: phoenixPointY + 30,
    });

    //16
    arrayWithPoints.push({
      x: phoenixPointX + 114,
      y: phoenixPointY + 69,
    });

    //17
    arrayWithPoints.push({
      x: phoenixPointX + 123,
      y: phoenixPointY + 100,
    });

    //18
    arrayWithPoints.push({
      x: phoenixPointX + 148,
      y: phoenixPointY + 5,
    });

    //19
    arrayWithPoints.push({
      x: phoenixPointX + 148,
      y: phoenixPointY + 93,
    });

    //20
    arrayWithPoints.push({
      x: phoenixPointX + 160,
      y: phoenixPointY + 32,
    });

    //21
    arrayWithPoints.push({
      x: phoenixPointX + 157,
      y: phoenixPointY + 69,
    });

    //22
    arrayWithPoints.push({
      x: phoenixPointX + 173,
      y: phoenixPointY + 11,
    });

    //23
    arrayWithPoints.push({
      x: phoenixPointX + 173,
      y: phoenixPointY + 89,
    });

    //24
    arrayWithPoints.push({
      x: phoenixPointX + 200,
      y: phoenixPointY + 17,
    });

    //25
    arrayWithPoints.push({
      x: phoenixPointX + 200,
      y: phoenixPointY + 50,
    });

    //26
    arrayWithPoints.push({
      x: phoenixPointX + 200,
      y: phoenixPointY + 83,
    });

    if (document.getElementById(`${enemyColor}`)) {
      const enemyCharacterImage = document.getElementById(
        `${enemyColor}`
      ) as HTMLImageElement;

      const enemyX: number =
        parseInt(enemyCharacterImage.style.left.split("px")[0]) + 25;
      const enemyY: number =
        parseInt(enemyCharacterImage.style.top.split("px")[0]) + 25;

      let lengthBetweenCenterPoints = 100;

      arrayWithPoints.forEach((ele) => {
        let temp = Math.sqrt(
          Math.pow(ele.x - enemyX, 2) + Math.pow(ele.y - enemyY, 2)
        );

        if (temp < lengthBetweenCenterPoints) {
          lengthBetweenCenterPoints = temp;
        }
      });

      if (lengthBetweenCenterPoints < 25) {
        //Hit enemy
        let enemyType = this.fightingCharactersInformations.yellow.type;
        let enemyAttack = document.getElementById("bulletyellow");
        if (colorSide === "yellow") {
          enemyType = this.fightingCharactersInformations.blue.type;
          enemyAttack = document.getElementById("bulletblue");
        }
        if (enemyType !== "Phoenix" || !enemyAttack) {
          this.giveDamage(colorSide);
        }
      }
    }
  };

  bansheeAttack = (
    colorSide: string,
    attackSide: string,
    character: Character
  ) => {
    const attack = document.createElement("img");
    attack.id = `bulletblue`;
    attack.src = "./src/src/Banshee/attack.png";
    attack.width = 200;
    attack.height = 100;
    attack.classList.add("cloudAttack");
    const blueCharacterImg = document.getElementById(
      "blue"
    ) as HTMLImageElement;
    attack.style.top = `${
      parseInt(blueCharacterImg.style.top.split("px")[0]) + 25 - 50
    }px`;
    attack.style.left = `${
      parseInt(blueCharacterImg.style.left.split("px")[0]) + 25 - 100
    }px`;

    this.rootDiv.appendChild(attack);

    const attackAudio = new Audio("./src/src/Banshee/attack.wav");
    attackAudio.loop = true;
    attackAudio.play();

    const moveAttackInterval = setInterval(() => {
      if (document.getElementById("blue")) {
        const blueCharacterImg = document.getElementById(
          "blue"
        ) as HTMLImageElement;
        const attack = document.getElementById(
          `bulletblue`
        ) as HTMLImageElement;

        attack.style.top = `${
          parseInt(blueCharacterImg.style.top.split("px")[0]) + 25 - 50
        }px`;
        attack.style.left = `${
          parseInt(blueCharacterImg.style.left.split("px")[0]) + 25 - 100
        }px`;
      }
    }, 50);

    this.attackBansheeFunction(colorSide);

    const attackInterval = setInterval(() => {
      this.attackBansheeFunction(colorSide);
    }, 100);

    setTimeout(() => {
      clearInterval(moveAttackInterval);
      clearInterval(attackInterval);
      const attackingCloud = document.getElementById(
        `bulletblue`
      ) as HTMLImageElement;
      attackingCloud.remove();
      attackAudio.pause();

      const reload = setTimeout(() => {
        this.readyToFireBlue = 1;
        const fireReadyAudio = new Audio();
        fireReadyAudio.src = "./src/src/dark_reloaded.wav";
        fireReadyAudio.play();
      }, 1000 / this.fightingCharactersInformations.blue.attackRate);

      this.intervalsIds.push({
        id: reload,
        name: "reload",
      });
    }, 700);
  };

  attackBansheeFunction = (colorSide: string) => {
    const attack = document.getElementById(`bulletblue`) as HTMLImageElement;
    const pointsArray: Array<PositionOfDemagePoints> = [];

    //1
    pointsArray.push({
      x: parseInt(attack.style.left.split("px")[0]) + 125,
      y: parseInt(attack.style.top.split("px")[0]),
    });

    //2
    pointsArray.push({
      x: parseInt(attack.style.left.split("px")[0]) + 150,
      y: parseInt(attack.style.top.split("px")[0]) + 7,
    });

    //3
    pointsArray.push({
      x: parseInt(attack.style.left.split("px")[0]) + 174,
      y: parseInt(attack.style.top.split("px")[0]) + 27,
    });

    //4
    pointsArray.push({
      x: parseInt(attack.style.left.split("px")[0]) + 200,
      y: parseInt(attack.style.top.split("px")[0]) + 39,
    });

    //5
    pointsArray.push({
      x: parseInt(attack.style.left.split("px")[0]) + 200,
      y: parseInt(attack.style.top.split("px")[0]) + 59,
    });

    //6
    pointsArray.push({
      x: parseInt(attack.style.left.split("px")[0]) + 174,
      y: parseInt(attack.style.top.split("px")[0]) + 71,
    });

    //7
    pointsArray.push({
      x: parseInt(attack.style.left.split("px")[0]) + 150,
      y: parseInt(attack.style.top.split("px")[0]) + 91,
    });

    //8
    pointsArray.push({
      x: parseInt(attack.style.left.split("px")[0]) + 125,
      y: parseInt(attack.style.top.split("px")[0]) + 97,
    });

    //9
    pointsArray.push({
      x: parseInt(attack.style.left.split("px")[0]) + 76,
      y: parseInt(attack.style.top.split("px")[0]) + 100,
    });

    //10
    pointsArray.push({
      x: parseInt(attack.style.left.split("px")[0]) + 52,
      y: parseInt(attack.style.top.split("px")[0]) + 93,
    });

    //11
    pointsArray.push({
      x: parseInt(attack.style.left.split("px")[0]) + 27,
      y: parseInt(attack.style.top.split("px")[0]) + 74,
    });

    //12
    pointsArray.push({
      x: parseInt(attack.style.left.split("px")[0]) + 2,
      y: parseInt(attack.style.top.split("px")[0]) + 62,
    });

    //13
    pointsArray.push({
      x: parseInt(attack.style.left.split("px")[0]) + 2,
      y: parseInt(attack.style.top.split("px")[0]) + 43,
    });

    //14
    pointsArray.push({
      x: parseInt(attack.style.left.split("px")[0]) + 27,
      y: parseInt(attack.style.top.split("px")[0]) + 30,
    });

    //15
    pointsArray.push({
      x: parseInt(attack.style.left.split("px")[0]) + 52,
      y: parseInt(attack.style.top.split("px")[0]) + 11,
    });

    //16
    pointsArray.push({
      x: parseInt(attack.style.left.split("px")[0]) + 76,
      y: parseInt(attack.style.top.split("px")[0]) + 5,
    });

    //center
    pointsArray.push({
      x: parseInt(attack.style.left.split("px")[0]) + 100,
      y: parseInt(attack.style.top.split("px")[0]) + 50,
    });
    if (document.getElementById(`yellow`)) {
      const enemyCharacterImage = document.getElementById(
        "yellow"
      ) as HTMLImageElement;

      const enemyX: number =
        parseInt(enemyCharacterImage.style.left.split("px")[0]) + 25;
      const enemyY: number =
        parseInt(enemyCharacterImage.style.top.split("px")[0]) + 25;

      let lengthBetweenCenterPoints = 100;

      pointsArray.forEach((ele) => {
        let temp = Math.sqrt(
          Math.pow(ele.x - enemyX, 2) + Math.pow(ele.y - enemyY, 2)
        );

        if (temp < lengthBetweenCenterPoints) {
          lengthBetweenCenterPoints = temp;
        }
      });

      if (lengthBetweenCenterPoints < 25) {
        //Hit enemy
        let enemyType = this.fightingCharactersInformations.yellow.type;
        let enemyAttack = document.getElementById("bulletyellow");
        if (colorSide === "yellow") {
          enemyType = this.fightingCharactersInformations.blue.type;
          enemyAttack = document.getElementById("bulletblue");
        }
        if (enemyType !== "Phoenix" || !enemyAttack) {
          this.giveDamage(colorSide);
        }
      }
    }
  };

  //Attack by diffrent characters
  attackOperation = (
    i: number,
    j: number,
    colorSide: string,
    attackSide: string
  ) => {
    const characterImgElement = document.getElementById(
      `${colorSide}`
    ) as HTMLImageElement;

    //clear move
    for (let i = 0; i < this.intervalsIds.length; i++) {
      if (this.intervalsIds[i].name === `${colorSide}MovingAnimationinterval`) {
        clearInterval(this.intervalsIds[i].id);
      } else if (this.intervalsIds[i].name === `moveTimeout${colorSide}`) {
        clearTimeout(this.intervalsIds[i].id);
      }
    }

    this.intervalsIds = this.intervalsIds
      .filter((ele) => ele.name !== `${colorSide}MovingAnimationinterval`)
      .filter((ele) => ele.name !== `moveTimeout${colorSide}`);

    let flagToSetTimeout: boolean = true;
    let timeoutMultipler = 1;
    if (colorSide === "yellow") {
      if (this.computerSide !== 0) {
        const takeInterval = this.intervalsIds.filter(
          (ele) => ele.name === "fightingIntervalsYellow"
        );
        takeInterval.forEach((ele) => {
          clearInterval(ele.id);
        });

        this.intervalsIds = this.intervalsIds.filter(
          (ele) => ele.name !== "fightingIntervalsYellow"
        );
      }

      this.readyToFireYellow = 0;
      characterImgElement.src = `./src/src/${this.fightingCharactersInformations.yellow.type}/attack${attackSide}.png`;

      const audio = new Audio();
      audio.src = `./src/src/${this.fightingCharactersInformations.yellow.type}/attack.wav`;
      audio.play();
      //Yellows types of attacks
      if (this.fightingCharactersInformations.yellow.type === "Knight") {
        this.pawnsAttack(
          colorSide,
          attackSide,
          this.fightingCharactersInformations.yellow
        );
      } else if (
        this.fightingCharactersInformations.yellow.type === "Archer" ||
        this.fightingCharactersInformations.yellow.type === "Unicorn" ||
        this.fightingCharactersInformations.yellow.type === "Valkyrie"
      ) {
        this.lineShooter(
          colorSide,
          attackSide,
          this.fightingCharactersInformations.yellow,
          false
        );
      } else if (
        this.fightingCharactersInformations.yellow.type === "Air" ||
        this.fightingCharactersInformations.yellow.type === "Djinn" ||
        this.fightingCharactersInformations.yellow.type === "Fire" ||
        this.fightingCharactersInformations.yellow.type === "Golem" ||
        this.fightingCharactersInformations.yellow.type === "Earth" ||
        this.fightingCharactersInformations.yellow.type === "Water" ||
        this.fightingCharactersInformations.yellow.type === "Wizard"
      ) {
        this.lineShooter(
          colorSide,
          attackSide,
          this.fightingCharactersInformations.yellow,
          true
        );
      } else if (
        this.fightingCharactersInformations.yellow.type === "Phoenix"
      ) {
        this.phoenixAttack(colorSide);
        timeoutMultipler = 3.35;
      }

      console.log(this.fightingCharactersInformations.yellow);
      console.log(this.fightingCharactersInformations.blue);

      if (this.fightingCharactersInformations.yellow.type !== "Phoenix") {
        const reload = setTimeout(() => {
          this.readyToFireYellow = 1;
          const fireReadyAudio = new Audio();
          fireReadyAudio.src = "./src/src/light_reloaded.wav";
          fireReadyAudio.play();
        }, 1000 / this.fightingCharactersInformations.yellow.attackRate);

        this.intervalsIds.push({
          id: reload,
          name: "reload",
        });
      }
    } else {
      if (this.fightingCharactersInformations.blue.type !== "Banshee") {
        if (this.computerSide !== 1) {
          const takeInterval = this.intervalsIds.filter(
            (ele) => ele.name === "fightingIntervalsBlue"
          );

          takeInterval.forEach((ele) => {
            clearInterval(ele.id);
          });
          //clearInterval(takeInterval.id);

          this.intervalsIds = this.intervalsIds.filter(
            (ele) => ele.name !== "fightingIntervalsBlue"
          );
        }
      }

      this.readyToFireBlue = 0;

      //is shapeshifter
      if (this.fightingShapeshifter === 1) {
        characterImgElement.src = `./src/src/Shapeshifter/${this.fightingCharactersInformations.blue.type}/attack${attackSide}.png`;

        //audio
        const audio = new Audio();
        audio.src = `./src/src/Shapeshifter/${this.fightingCharactersInformations.blue.type}/attack.wav`;
        audio.play();

        if (this.fightingCharactersInformations.blue.type === "Knight") {
          this.pawnsAttack(
            colorSide,
            attackSide,
            this.fightingCharactersInformations.blue
          );
        } else if (
          this.fightingCharactersInformations.blue.type === "Archer" ||
          this.fightingCharactersInformations.blue.type === "Unicorn" ||
          this.fightingCharactersInformations.blue.type === "Valkyrie"
        ) {
          this.lineShooter(
            colorSide,
            attackSide,
            this.fightingCharactersInformations.blue,
            false
          );
        } else if (
          this.fightingCharactersInformations.blue.type === "Air" ||
          this.fightingCharactersInformations.blue.type === "Djinn" ||
          this.fightingCharactersInformations.blue.type === "Fire" ||
          this.fightingCharactersInformations.blue.type === "Golem" ||
          this.fightingCharactersInformations.blue.type === "Earth" ||
          this.fightingCharactersInformations.blue.type === "Water" ||
          this.fightingCharactersInformations.blue.type === "Wizard"
        ) {
          this.lineShooter(
            colorSide,
            attackSide,
            this.fightingCharactersInformations.blue,
            true
          );
        } else if (
          this.fightingCharactersInformations.blue.type === "Phoenix"
        ) {
          timeoutMultipler = 3.35;
          this.phoenixAttack(colorSide);
        }
      } else {
        if (this.fightingCharactersInformations.blue.type !== "Banshee") {
          characterImgElement.src = `./src/src/${this.fightingCharactersInformations.blue.type}/attack${attackSide}.png`;
        }

        //audio
        const audio = new Audio();
        audio.src = `./src/src/${this.fightingCharactersInformations.blue.type}/attack.wav`;
        audio.play();

        if (this.fightingCharactersInformations.blue.type === "Goblin") {
          this.pawnsAttack(
            colorSide,
            attackSide,
            this.fightingCharactersInformations.blue
          );
        } else if (
          this.fightingCharactersInformations.blue.type === "Basilisk" ||
          this.fightingCharactersInformations.blue.type === "Dragon" ||
          this.fightingCharactersInformations.blue.type === "Manticore" ||
          this.fightingCharactersInformations.blue.type === "Sorceress"
        ) {
          this.lineShooter(
            colorSide,
            attackSide,
            this.fightingCharactersInformations.blue,
            false
          );
        } else if (
          this.fightingCharactersInformations.blue.type === "Air" ||
          this.fightingCharactersInformations.blue.type === "Fire" ||
          this.fightingCharactersInformations.blue.type === "Troll" ||
          this.fightingCharactersInformations.blue.type === "Earth" ||
          this.fightingCharactersInformations.blue.type === "Water"
        ) {
          this.lineShooter(
            colorSide,
            attackSide,
            this.fightingCharactersInformations.blue,
            true
          );
        } else if (
          this.fightingCharactersInformations.blue.type === "Banshee"
        ) {
          flagToSetTimeout = false;
          this.bansheeAttack(
            colorSide,
            attackSide,
            this.fightingCharactersInformations.blue
          );
        }
      }

      if (
        this.fightingCharactersInformations.blue.type !== "Banshee" &&
        this.fightingCharactersInformations.blue.type !== "Phoenix"
      ) {
        const reload = setTimeout(() => {
          this.readyToFireBlue = 1;
          const fireReadyAudio = new Audio();
          fireReadyAudio.src = "./src/src/dark_reloaded.wav";
          fireReadyAudio.play();
        }, 1000 / this.fightingCharactersInformations.blue.attackRate);

        this.intervalsIds.push({
          id: reload,
          name: "reload",
        });
      }
    }

    console.log(this.intervalsIds);

    if (flagToSetTimeout === true) {
      //change move look
      setTimeout(() => {
        console.log(this.intervalsIds);
        const characterImage = document.getElementById(
          `${colorSide}`
        ) as HTMLImageElement;
        const arrayWithPath = characterImage.src.split("/");

        let path = ``;
        if (colorSide === "yellow") {
          if (this.computerSide !== 0 && this.endBattleFlag === false) {
            console.log("Dodaje interval HEHE");
            const fightingIntervalYellow = setInterval(() => {
              this.fightMoving("yellow");
            }, 50 / this.fightingCharactersInformations.yellow.speed);

            this.intervalsIds.push({
              name: "fightingIntervalsYellow",
              id: fightingIntervalYellow,
            });
          }

          path = `./src/src/${this.fightingCharactersInformations.yellow.type}/`;
        } else {
          if (this.computerSide !== 1 && this.endBattleFlag === false) {
            const fightingIntervalBlue = setInterval(() => {
              this.fightMoving("blue");
            }, 50 / this.fightingCharactersInformations.blue.speed);

            this.intervalsIds.push({
              name: "fightingIntervalsBlue",
              id: fightingIntervalBlue,
            });
          }

          path = `./src/src/${this.fightingCharactersInformations.blue.type}/`;

          if (this.fightingShapeshifter === 1) {
            path = `./src/src/Shapeshifter/${this.fightingCharactersInformations.blue.type}/`;
          }
        }

        if (timeoutMultipler === 1) {
          const lastSide = arrayWithPath[arrayWithPath.length - 1].substring(6);
          if (lastSide.charAt(0) === `U`) {
            console.log("weszlo w up");
            characterImage.src = `${path}up_0.png`;
          } else if (lastSide.charAt(0) === `R`) {
            console.log("weszlo w right");
            characterImage.src = `${path}right_0.png`;
          } else if (lastSide.charAt(0) === `L`) {
            console.log("weszlo w left");
            characterImage.src = `${path}left_0.png`;
          } else if (lastSide.charAt(0) === `D`) {
            console.log("weszlo w else");
            characterImage.src = `${path}down_0.png`;
          }
        }
      }, 300 * timeoutMultipler);
    }
  };

  bulletAnimation = (
    character: Character,
    colorSide: string,
    attackingSide: string
  ) => {
    let path: string = "./src/src/";
    if (colorSide === "blue" && this.fightingShapeshifter === 1) {
      path += "Shapeshifter/";
    }

    //h = horizontal (poziomo) left/width
    //v = vertical (pionowo) top/height
    let simplySide = "h";

    if (attackingSide === "Up" || attackingSide === "Down") {
      simplySide = "v";
    }

    if (document.getElementById(`bullet${colorSide}`)) {
      const bulletImg = document.getElementById(
        `bullet${colorSide}`
      ) as HTMLImageElement;

      bulletImg.src = `${path}${character.type}/bullet_0.png`;
      if (simplySide === "h") {
        bulletImg.width = (character.horizontalWidthAttack as number) * 3;
      } else {
        bulletImg.height = (character.verticalWidthAttack as number) * 3;
      }
    }
    console.log("bullet_0");
    const timeoutBulletAnimation1 = setTimeout(() => {
      const bulletImg = document.getElementById(
        `bullet${colorSide}`
      ) as HTMLImageElement;
      bulletImg.src = `${path}${character.type}/bullet_1.png`;
      console.log("bullet_1");
      if (simplySide === "h") {
        if (
          character.type === "Golem" ||
          character.type === "Troll" ||
          character.type === "Earth"
        ) {
          bulletImg.width = (character.horizontalWidthAttack as number) * 3;
        } else {
          bulletImg.width = (character.horizontalMinWidth as number) * 3;
        }
      } else {
        if (
          character.type === "Air" ||
          character.type === "Djinn" ||
          character.type === "Golem" ||
          character.type === "Troll" ||
          character.type === "Earth"
        ) {
          bulletImg.height = (character.verticalWidthAttack as number) * 3;
        } else {
          bulletImg.height = (character.verticalMinWidth as number) * 3;
        }
      }
    }, 100);

    const timeoutBulletAnimation2 = setTimeout(() => {
      const bulletImg = document.getElementById(
        `bullet${colorSide}`
      ) as HTMLImageElement;
      bulletImg.src = `${path}${character.type}/bullet_2.png`;
      console.log("bullet_2");
      if (simplySide === "h") {
        if (character.type === "Air" || character.type === "Djinn") {
          bulletImg.width = (character.horizontalMinWidth as number) * 3;
        } else {
          bulletImg.width = (character.horizontalWidthAttack as number) * 3;
        }
      } else {
        bulletImg.height = (character.verticalWidthAttack as number) * 3;
      }
    }, 200);

    const timeoutBulletAnimation3 = setTimeout(() => {
      const bulletImg = document.getElementById(
        `bullet${colorSide}`
      ) as HTMLImageElement;
      bulletImg.src = `${path}${character.type}/bullet_3.png`;
      console.log("bullet_3");
      if (simplySide === "h") {
        bulletImg.width = (character.horizontalWidthAttack as number) * 3;
      } else {
        bulletImg.height = (character.verticalWidthAttack as number) * 3;
      }
    }, 300);

    this.intervalsIds.push({
      id: timeoutBulletAnimation1,
      name: `timeoutBulletAnimation${colorSide}`,
    });

    this.intervalsIds.push({
      id: timeoutBulletAnimation2,
      name: `timeoutBulletAnimation${colorSide}`,
    });

    this.intervalsIds.push({
      id: timeoutBulletAnimation3,
      name: `timeoutBulletAnimation${colorSide}`,
    });
  };

  lineShooter = (
    colorSide: string,
    attackSide: string,
    character: Character,
    changingBulletLook: boolean
  ) => {
    const characterImgElement: HTMLImageElement = document.getElementById(
      `${colorSide}`
    ) as HTMLImageElement;
    const bullet = document.createElement("img");

    let bulletImg: string = attackSide;
    if (
      attackSide === "LeftUp" ||
      attackSide === "LeftDown" ||
      attackSide === "RightUp" ||
      attackSide === "RightDown"
    ) {
      bulletImg = "Left";
    }

    if (changingBulletLook === true) {
      bullet.src = `./src/src/${character.type}/bullet_0.png`;
      this.bulletAnimation(character, colorSide, attackSide);
      const bulletAnimationInterval = setInterval(() => {
        this.bulletAnimation(character, colorSide, attackSide);
      }, 400);

      this.intervalsIds.push({
        name: `bulletAnimationInterval${colorSide}`,
        id: bulletAnimationInterval,
      });
    } else {
      if (colorSide === "yellow") {
        bullet.src = `./src/src/${character.type}/bullet${bulletImg}.png`;
      } else {
        if (this.fightingShapeshifter === 1) {
          bullet.src = `./src/src/Shapeshifter/${character.type}/bullet${bulletImg}.png`;
        } else {
          bullet.src = `./src/src/${character.type}/bullet${bulletImg}.png`;
        }
      }
    }

    console.log(bullet.style.top);

    let degree = 0;
    let moveY = 0;
    let moveX = 0;

    if (attackSide === "LeftUp") {
      bullet.height = (character.horizontalWidthAttack as number) * 3;
      bullet.style.top = `${
        parseInt(characterImgElement.style.top.split("px")[0]) -
        (character.horizontalWidthAttack as number)
      }px`;
      bullet.style.left = `${
        parseInt(characterImgElement.style.left.split("px")[0]) - 10
      }px`;
      bullet.style.transform = "rotate(45deg)";
      degree = 45;
      moveX = -1;
      moveY = -1;
    } else if (attackSide === "RightDown") {
      bullet.height = (character.horizontalWidthAttack as number) * 3;
      bullet.style.top = `${
        parseInt(characterImgElement.style.top.split("px")[0]) -
        (character.horizontalWidthAttack as number) +
        50
      }px`;
      bullet.style.left = `${
        parseInt(characterImgElement.style.left.split("px")[0]) + 50
      }px`;
      bullet.style.transform = "rotate(225deg)";
      degree = 225;
      moveX = 1;
      moveY = 1;
    } else if (attackSide === "RightUp") {
      bullet.height = (character.horizontalWidthAttack as number) * 3;
      bullet.style.top = `${
        parseInt(characterImgElement.style.top.split("px")[0]) -
        (character.horizontalWidthAttack as number)
      }px`;
      bullet.style.left = `${
        parseInt(characterImgElement.style.left.split("px")[0]) + 50
      }px`;
      bullet.style.transform = "rotate(135deg)";
      degree = 135;
      moveX = 1;
      moveY = -1;
    } else if (attackSide === "LeftDown") {
      bullet.height = (character.horizontalWidthAttack as number) * 3;
      bullet.style.top = `${
        parseInt(characterImgElement.style.top.split("px")[0]) -
        (character.horizontalWidthAttack as number) +
        50
      }px`;
      bullet.style.left = `${
        parseInt(characterImgElement.style.left.split("px")[0]) - 10
      }px`;
      bullet.style.transform = "rotate(315deg)";
      degree = 315;
      moveX = -1;
      moveY = 1;
    } else if (attackSide === "Up") {
      bullet.width = (character.verticalWidthAttack as number) * 3;
      bullet.style.top = `${
        parseInt(characterImgElement.style.top.split("px")[0]) - 10
      }px`;
      bullet.style.left = `${
        parseInt(characterImgElement.style.left.split("px")[0]) +
        25 -
        bullet.width / 2
      }px`;
      moveY = -1;
    } else if (attackSide === "Down") {
      bullet.width = (character.verticalWidthAttack as number) * 3;
      bullet.style.top = `${
        parseInt(characterImgElement.style.top.split("px")[0]) + 60
      }px`;
      bullet.style.left = `${
        parseInt(characterImgElement.style.left.split("px")[0]) +
        25 -
        bullet.width / 2
      }px`;
      moveY = 1;
    } else if (attackSide === "Left") {
      console.log(character.horizontalWidthAttack);
      bullet.height = (character.horizontalWidthAttack as number) * 3;
      bullet.style.top = `${
        parseInt(characterImgElement.style.top.split("px")[0]) -
        (character.horizontalWidthAttack as number) +
        25
      }px`;
      bullet.style.left = `${
        parseInt(characterImgElement.style.left.split("px")[0]) - 10
      }px`;
      moveX = -1;
    } else if (attackSide === "Right") {
      bullet.height = (character.horizontalWidthAttack as number) * 3;
      bullet.style.top = `${
        parseInt(characterImgElement.style.top.split("px")[0]) -
        (character.horizontalWidthAttack as number) +
        25
      }px`;
      bullet.style.left = `${
        parseInt(characterImgElement.style.left.split("px")[0]) + 50
      }px`;
      moveX = 1;
    }

    console.log(bullet.style.top);

    bullet.classList.add("bullet");
    bullet.id = `bullet${colorSide}`;
    bullet.style.transitionProperty = "width,height";
    bullet.style.transitionTimingFunction = "linear";
    bullet.style.transitionDuration = `${Math.round(
      30 / (character.shotSpeed as number)
    )}ms`;
    this.rootDiv.appendChild(bullet);
    this.bulletCollision(
      attackSide,
      colorSide,
      character,
      degree,
      moveX,
      moveY
    );

    const bulletInterval = setInterval(() => {
      this.moveLineBullet(
        attackSide,
        colorSide,
        character,
        degree,
        moveX,
        moveY
      );
    }, Math.round(30 / (character.shotSpeed as number)));
    console.log(this.intervalsIds);
    this.intervalsIds.push({
      name: `bulletInterval${colorSide}`,
      id: bulletInterval,
    });
  };

  moveLineBullet = (
    attackSide: string,
    colorSide: string,
    character: Character,
    degree: number,
    moveX: number,
    moveY: number
  ) => {
    if (document.getElementById(`bullet${colorSide}`)) {
      const jump = 40;
      const bulletImg = document.getElementById(
        `bullet${colorSide}`
      ) as HTMLImageElement;
      bulletImg.style.top = `${
        parseInt(bulletImg.style.top.split("px")[0]) + moveY * jump
      }px`;
      bulletImg.style.left = `${
        parseInt(bulletImg.style.left.split("px")[0]) + moveX * jump
      }px`;
      this.bulletCollision(
        attackSide,
        colorSide,
        character,
        degree,
        moveX,
        moveY
      );
    }
  };

  //give demage to character
  giveDamage = (colorSide: string) => {
    let demageGiven: number;
    let enemyColor: string;
    let bigLetter: string;
    let hpLeft: number;
    console.log(this.hpFightInfo);

    if (colorSide === "yellow") {
      demageGiven = this.fightingCharactersInformations.yellow.attackPower;
      hpLeft = this.hpFightInfo.blue - demageGiven;
      this.hpFightInfo = {
        ...this.hpFightInfo,
        blue: this.hpFightInfo.blue - demageGiven,
      };
      enemyColor = "blue";
      bigLetter = "Blue";

      const audio = new Audio();
      audio.src = "./src/src/light_target.wav";
      audio.play();
    } else {
      demageGiven = this.fightingCharactersInformations.blue.attackPower;
      hpLeft = this.hpFightInfo.yellow - demageGiven;
      this.hpFightInfo = {
        ...this.hpFightInfo,
        yellow: this.hpFightInfo.yellow - demageGiven,
      };
      enemyColor = "yellow";
      bigLetter = "Yellow";

      if (this.fightingCharactersInformations.blue.type !== "Banshee") {
        const audio = new Audio();
        audio.src = "./src/src/dark_target.wav";
        audio.play();
      }
    }

    console.log(hpLeft);
    if (hpLeft > 0) {
      const hpDiv = document.getElementById(
        `hp${enemyColor}`
      ) as HTMLImageElement;
      const difference = demageGiven * 15;
      hpDiv.style.height = `${
        parseInt(hpDiv.style.height.split("px")[0]) - difference
      }px`;
      hpDiv.style.marginTop = `${
        parseInt(hpDiv.style.marginTop.split("px")[0]) + difference
      }px`;
    } else {
      const hpDiv = document.getElementById(
        `hp${enemyColor}`
      ) as HTMLImageElement;
      hpDiv.style.height = `0px`;
      const characterImg = document.getElementById(
        `${enemyColor}`
      ) as HTMLImageElement;
      characterImg.remove();

      this.intervalsIds.forEach((ele) => {
        if (
          ele.name === `${enemyColor}MovingAnimationinterval` ||
          ele.name === `fightingIntervals${bigLetter}`
        ) {
          clearInterval(ele.id);
        } else if (ele.name === `moveTimeout${enemyColor}`) {
          clearTimeout(ele.id);
        }
      });

      this.intervalsIds = this.intervalsIds
        .filter((ele) => ele.name !== `${enemyColor}MovingAnimationinterval`)
        .filter((ele) => ele.name !== `moveTimeout${enemyColor}`)
        .filter((ele) => ele.name !== `fightingIntervals${bigLetter}`);

      console.log(this.intervalsIds);

      const intervalToFinishBattle = setInterval(() => {
        if (
          !document.getElementById("bulletyellow") &&
          !document.getElementById("bulletblue")
        ) {
          this.endBattle();
        }
      }, 100);

      this.intervalsIds.push({
        id: intervalToFinishBattle,
        name: "intervalToFinishBattle",
      });
    }
  };

  //end battle
  endBattle = () => {
    this.endBattleFlag = true;
    console.log("fightihn shapesigfter  ", this.fightingShapeshifter);
    window.onkeydown = null;
    window.onkeyup = null;

    this.keyLogger = this.keyLogger.map((ele) => ({ ...ele, clicked: false }));

    this.readyToFireBlue = 1;
    this.readyToFireYellow = 1;

    console.log(this.intervalsIds);
    console.log(this.audioArray);

    this.intervalsIds.forEach((ele) => {
      if (
        ele.name === `yellowMovingAnimationinterval` ||
        ele.name === `fightingIntervalsYellow` ||
        ele.name === `blueMovingAnimationinterval` ||
        ele.name === `fightingIntervalsBlue` ||
        ele.name === "plantsInterval" ||
        ele.name === "intervalToFinishBattle" ||
        ele.name === "computerFightAI"
      ) {
        clearInterval(ele.id);
        console.log(ele.name);
      } else if (
        ele.name === `moveTimeoutyellow` ||
        ele.name === `moveTimeoutblue` ||
        ele.name === "plantTimeout" ||
        ele.name === "reload"
      ) {
        clearTimeout(ele.id);
      }
    });

    this.audioArray.forEach((ele) => {
      ele.htmlElement.pause();
    });

    this.audioArray = [];

    this.intervalsIds = [];

    let i: number = -1;
    let j: number = -1;
    this.arrayWithPlacesOfCharacters.forEach((arr, indexI) => {
      arr.forEach((ele, indexJ) => {
        if (ele.length === 2) {
          i = indexI;
          j = indexJ;
        }
      });
    });

    console.log(i, j);
    let winningSide = false;

    if (
      this.hpFightInfo.yellow < this.fightingCharactersInformations.yellow.HP
    ) {
      this.arrayWithCurrentInformationsAboutCharacters =
        this.arrayWithCurrentInformationsAboutCharacters.map((ele) =>
          ele.id === this.fightingCharactersInformations.yellow.id
            ? { ...ele, HP: this.hpFightInfo.yellow }
            : { ...ele }
        );
    }

    const characterimgYellow = document.getElementById(
      `${this.fightingCharactersInformations.yellow.id}`
    ) as HTMLImageElement;

    if (
      this.arrayWithSummonElementalIds.filter(
        (ele) => ele === this.fightingCharactersInformations.yellow.id
      ).length === 0
    ) {
      if (this.hpFightInfo.yellow > 0) {
        winningSide = true;
        this.arrayWithPlacesOfCharacters[i][j] = [
          this.fightingCharactersInformations.yellow.id,
        ];
        characterimgYellow.src = `./src/src/${this.fightingCharactersInformations.yellow.type}/logo.png`;
      } else {
        characterimgYellow.remove();
      }
    } else {
      characterimgYellow.remove();
    }

    if (this.fightingShapeshifter === 0) {
      if (this.hpFightInfo.blue < this.fightingCharactersInformations.blue.HP) {
        this.arrayWithCurrentInformationsAboutCharacters =
          this.arrayWithCurrentInformationsAboutCharacters.map((ele) =>
            ele.id === this.fightingCharactersInformations.blue.id
              ? { ...ele, HP: this.hpFightInfo.blue }
              : { ...ele }
          );
      }
    }

    let characterimgBlue = document.getElementById(
      `${this.fightingCharactersInformations.blue.id}`
    ) as HTMLImageElement;

    if (this.fightingShapeshifter === 1) {
      characterimgBlue = document.getElementById(`34`) as HTMLImageElement;
    }

    if (
      this.arrayWithSummonElementalIds.filter(
        (ele) => ele === this.fightingCharactersInformations.blue.id
      ).length === 0 ||
      this.fightingShapeshifter === 1
    ) {
      if (this.hpFightInfo.blue > 0) {
        winningSide = true;
        this.arrayWithPlacesOfCharacters[i][j] = [
          this.fightingCharactersInformations.blue.id,
        ];

        if (this.fightingShapeshifter === 1) {
          characterimgBlue.src = `./src/src/Shapeshifter/logo.png`;
          this.arrayWithPlacesOfCharacters[i][j] = [34];
        } else {
          characterimgBlue.src = `./src/src/${this.fightingCharactersInformations.blue.type}/logo.png`;
          this.arrayWithPlacesOfCharacters[i][j] = [
            this.fightingCharactersInformations.blue.id,
          ];
        }
      } else {
        characterimgBlue.remove();
      }
    } else {
      characterimgBlue.remove();
    }

    if (winningSide === false) {
      this.arrayWithPlacesOfCharacters[i][j] = [];
    }

    console.log(this.arrayWithCurrentInformationsAboutCharacters);
    console.log(this.arrayWithPlacesOfCharacters);

    setTimeout(() => {
      for (let index = 0; index < 14; index++) {
        const plant = document.getElementById(
          `plant_${index}`
        ) as HTMLImageElement;
        plant.remove();
      }

      const leftColumn = document.getElementById(
        "leftColumn"
      ) as HTMLDivElement;
      const rightColumn = document.getElementById(
        "rightColumn"
      ) as HTMLDivElement;
      const battlefield = document.getElementById(
        "battleField"
      ) as HTMLDivElement;
      leftColumn.style.visibility = "hidden";
      rightColumn.style.visibility = "hidden";
      battlefield.style.visibility = "hidden";

      for (let index = 0; index < 40; index++) {
        if (document.getElementById(`${index}`)) {
          const img = document.getElementById(`${index}`) as HTMLImageElement;
          img.style.visibility = "visible";
        }
      }
    }, 200);

    setTimeout(() => {
      const fieldOnBoard = document.getElementById(
        `${i}_${j}`
      ) as HTMLImageElement;
      if (document.getElementById("hpyellow")) {
        const hpYellowDiv = document.getElementById(
          "hpyellow"
        ) as HTMLImageElement;
        hpYellowDiv.remove();
      }

      if (document.getElementById("hpblue")) {
        const hpBlueDiv = document.getElementById("hpblue") as HTMLImageElement;
        hpBlueDiv.remove();
      }

      if (document.getElementById("yellow")) {
        const yellowCharacter = document.getElementById(
          "yellow"
        ) as HTMLImageElement;
        yellowCharacter.src = `./src/src/${this.fightingCharactersInformations.yellow.type}/right_0.png`;
        yellowCharacter.classList.add("fightingCharacterPrepareToBattle");
        yellowCharacter.classList.remove("fightingCharacters");

        yellowCharacter.style.top = `${fieldOnBoard.offsetTop}px`;
        yellowCharacter.style.left = `${fieldOnBoard.offsetLeft}px`;
      }

      if (document.getElementById("blue")) {
        const blueCharacter = document.getElementById(
          "blue"
        ) as HTMLImageElement;
        blueCharacter.src = `./src/src/${this.fightingCharactersInformations.blue.type}/left_0.png`;

        if (this.fightingShapeshifter === 1) {
          blueCharacter.src = `./src/src/Shapeshifter/${this.fightingCharactersInformations.blue.type}/left_0.png`;
        }

        blueCharacter.classList.add("fightingCharacterPrepareToBattle");
        blueCharacter.classList.remove("fightingCharacters");
        blueCharacter.style.top = `${fieldOnBoard.offsetTop}px`;
        blueCharacter.style.left = `${fieldOnBoard.offsetLeft}px`;
      }

      setTimeout(() => {
        this.fightingShapeshifter = 0;
        if (document.getElementById("yellow")) {
          const character = document.getElementById(
            "yellow"
          ) as HTMLImageElement;
          character.remove();
        }

        if (document.getElementById("blue")) {
          const character = document.getElementById("blue") as HTMLImageElement;
          character.remove();
        }

        const battleArena = document.getElementById(
          "battleArena"
        ) as HTMLDivElement;
        battleArena.remove();
        const title = document.getElementById("title") as HTMLHeadingElement;
        title.style.visibility = "visible";
        this.endRound();
      }, 1500);
    }, 400);
  };

  bulletCollision = (
    attackSide: string,
    colorSide: string,
    character: Character,
    degree: number,
    moveX: number,
    moveY: number
  ) => {
    console.log(colorSide);
    let enemyColor = "";
    if (colorSide === "yellow") {
      enemyColor = "blue";
    } else {
      enemyColor = "yellow";
    }

    const bullet = document.getElementById(
      `bullet${colorSide}`
    ) as HTMLImageElement;
    const bulletHeight = bullet.offsetHeight;
    const bulletWidth = bullet.offsetWidth;

    //collision points
    let point1Y = 100;
    let point1X = 100;

    let point2Y = 100;
    let point2X = 100;

    let point3Y = 100;
    let point3X = 100;

    let point4Y = 400;
    let point4X = 600;

    let point5Y = 400;
    let point5X = 600;

    if (character.type === "Knight" || character.type === "Goblin") {
      if (attackSide === "LeftDown" || attackSide === "RightUp") {
        point1Y = parseInt(bullet.style.top.split("px")[0]);
        point1X = parseInt(bullet.style.left.split("px")[0]) + bulletWidth;
        point3Y = parseInt(bullet.style.top.split("px")[0]) + bulletHeight;
        point3X = parseInt(bullet.style.left.split("px")[0]);
      } else {
        point1Y = parseInt(bullet.style.top.split("px")[0]);
        point1X = parseInt(bullet.style.left.split("px")[0]);
        point3Y = parseInt(bullet.style.top.split("px")[0]) + bulletHeight;
        point3X = parseInt(bullet.style.left.split("px")[0]) + bulletWidth;
      }

      point2Y = parseInt(bullet.style.top.split("px")[0]) + bulletHeight / 2;
      point2X = parseInt(bullet.style.left.split("px")[0]) + bulletWidth / 2;
    } else {
      point2Y = parseInt(bullet.style.top.split("px")[0]) + bulletHeight / 2;
      point2X = parseInt(bullet.style.left.split("px")[0]) + bulletWidth / 2;
      if (
        attackSide === "LeftDown" ||
        attackSide === "RightUp" ||
        attackSide === "LeftUp" ||
        attackSide === "RightDown"
      ) {
        const temp1Y = parseInt(bullet.style.top.split("px")[0]);
        const temp1X = parseInt(bullet.style.left.split("px")[0]);

        const Values1 = this.calculateCords(
          temp1X,
          temp1Y,
          bulletWidth,
          bulletHeight,
          degree
        );
        point1Y = Values1.y;
        point1X = Values1.x;

        const temp3Y = parseInt(bullet.style.top.split("px")[0]) + bulletHeight;
        const temp3X = parseInt(bullet.style.left.split("px")[0]);

        const Values3 = this.calculateCords(
          temp3X,
          temp3Y,
          bulletWidth,
          bulletHeight,
          degree
        );
        point3Y = Values3.y;
        point3X = Values3.x;

        const temp4Y = parseInt(bullet.style.top.split("px")[0]);
        const temp4X = parseInt(bullet.style.left.split("px")[0]) + bulletWidth;

        const Values4 = this.calculateCords(
          temp4X,
          temp4Y,
          bulletWidth,
          bulletHeight,
          degree
        );
        point4Y = Values4.y;
        point4X = Values4.x;

        const temp5Y = parseInt(bullet.style.top.split("px")[0]) + bulletHeight;
        const temp5X = parseInt(bullet.style.left.split("px")[0]);

        const Values5 = this.calculateCords(
          temp5X,
          temp5Y,
          bulletWidth,
          bulletHeight,
          degree
        );
        point5Y = Values5.y;
        point5X = Values5.x;
      } else {
        point1Y = parseInt(bullet.style.top.split("px")[0]);
        point1X = parseInt(bullet.style.left.split("px")[0]);
        point3Y = parseInt(bullet.style.top.split("px")[0]) + bulletHeight;
        point3X = parseInt(bullet.style.left.split("px")[0]) + bulletWidth;

        point4Y = parseInt(bullet.style.top.split("px")[0]);
        point4X = parseInt(bullet.style.left.split("px")[0]) + bulletWidth;

        point5Y = parseInt(bullet.style.top.split("px")[0]) + bulletHeight;
        point5X = parseInt(bullet.style.left.split("px")[0]);
      }
    }

    //Check for collision
    let flagCollision: boolean = false;
    let flagDeleteCollision: boolean = false;

    const divBattlefield: HTMLDivElement = document.getElementById(
      "battleField"
    ) as HTMLDivElement;

    //Sprawdz czy działa
    const ceilOfArena = divBattlefield.offsetTop + 10 + 10;

    const floorOfArena = ceilOfArena + 480;

    const leftSideOfArena = divBattlefield.offsetLeft + 10 + 50;

    const rightSideOfArena = leftSideOfArena + 880;

    if (
      ceilOfArena > point1Y ||
      ceilOfArena > point2Y ||
      ceilOfArena > point3Y ||
      ceilOfArena > point4Y ||
      ceilOfArena > point5Y ||
      floorOfArena < point1Y ||
      floorOfArena < point2Y ||
      floorOfArena < point3Y ||
      floorOfArena < point4Y ||
      floorOfArena < point5Y
    ) {
      (flagCollision = true), (flagDeleteCollision = true);
    }

    if (
      leftSideOfArena > point1X ||
      leftSideOfArena > point2X ||
      leftSideOfArena > point3X ||
      leftSideOfArena > point4X ||
      leftSideOfArena > point5X ||
      rightSideOfArena < point1X ||
      rightSideOfArena < point2X ||
      rightSideOfArena < point3X ||
      rightSideOfArena < point4X ||
      rightSideOfArena < point5X
    ) {
      (flagCollision = true), (flagDeleteCollision = true);
    }

    this.arrayWithPlacesOfPlants.forEach((ele) => {
      if (ele.phase === 2 || ele.phase === 1) {
        let lengthBetweenCenterPoints = Math.sqrt(
          Math.pow(point1X - (ele.x + 20), 2) +
            Math.pow(point1Y - (ele.y + 20), 2)
        );

        let temp = Math.sqrt(
          Math.pow(point2X - (ele.x + 20), 2) +
            Math.pow(point2Y - (ele.y + 20), 2)
        );

        if (temp < lengthBetweenCenterPoints) {
          lengthBetweenCenterPoints = temp;
        }

        temp = Math.sqrt(
          Math.pow(point3X - (ele.x + 20), 2) +
            Math.pow(point3Y - (ele.y + 20), 2)
        );

        if (temp < lengthBetweenCenterPoints) {
          lengthBetweenCenterPoints = temp;
        }

        temp = Math.sqrt(
          Math.pow(point4X - (ele.x + 20), 2) +
            Math.pow(point4Y - (ele.y + 20), 2)
        );

        if (temp < lengthBetweenCenterPoints) {
          lengthBetweenCenterPoints = temp;
        }

        temp = Math.sqrt(
          Math.pow(point5X - (ele.x + 20), 2) +
            Math.pow(point5Y - (ele.y + 20), 2)
        );

        if (temp < lengthBetweenCenterPoints) {
          lengthBetweenCenterPoints = temp;
        }

        if (lengthBetweenCenterPoints < 20) {
          console.log("x:", ele.x + 20, " y:", ele.y + 20);
          if (
            ele.phase === 1 &&
            character.type !== "Knight" &&
            character.type !== "Goblin"
          ) {
            bullet.style.top = `${
              parseInt(bullet.style.top.split("px")[0]) - moveY * 15
            }px`;
            bullet.style.left = `${
              parseInt(bullet.style.left.split("px")[0]) - moveX * 15
            }px`;
          } else if (ele.phase === 2) {
            flagCollision = true;
            flagDeleteCollision = true;
          }
        }
      }
    });

    if (flagCollision === false) {
      if (document.getElementById(`${enemyColor}`)) {
        const enemyCharactter = document.getElementById(
          `${enemyColor}`
        ) as HTMLImageElement;
        const enemyX: number =
          parseInt(enemyCharactter.style.left.split("px")[0]) + 25;
        const enemyY: number =
          parseInt(enemyCharactter.style.top.split("px")[0]) + 25;

        let lengthBetweenCenterPoints = Math.sqrt(
          Math.pow(point1X - enemyX, 2) + Math.pow(point1Y - enemyY, 2)
        );

        let temp = Math.sqrt(
          Math.pow(point2X - enemyX, 2) + Math.pow(point2Y - enemyY, 2)
        );

        if (temp < lengthBetweenCenterPoints) {
          lengthBetweenCenterPoints = temp;
        }

        temp = Math.sqrt(
          Math.pow(point3X - enemyX, 2) + Math.pow(point3Y - enemyY, 2)
        );

        if (temp < lengthBetweenCenterPoints) {
          lengthBetweenCenterPoints = temp;
        }

        if (character.type !== "Goblin" && character.type !== "Knight") {
          temp = Math.sqrt(
            Math.pow(point4X - enemyX, 2) + Math.pow(point4Y - enemyY, 2)
          );

          if (temp < lengthBetweenCenterPoints) {
            lengthBetweenCenterPoints = temp;
          }

          temp = Math.sqrt(
            Math.pow(point5X - enemyX, 2) + Math.pow(point5Y - enemyY, 2)
          );

          if (temp < lengthBetweenCenterPoints) {
            lengthBetweenCenterPoints = temp;
          }
        }

        if (lengthBetweenCenterPoints < 25) {
          //Hit enemy
          flagDeleteCollision = true;
          let enemyType = this.fightingCharactersInformations.yellow.type;
          let enemyAttack = document.getElementById("bulletyellow");
          if (colorSide === "yellow") {
            enemyType = this.fightingCharactersInformations.blue.type;
            enemyAttack = document.getElementById("bulletblue");
          }

          if (enemyType !== "Phoenix" || !enemyAttack) {
            this.giveDamage(colorSide);
          }
        }
      }
    }

    if (character.type === "Knight" || character.type === "Goblin") {
      if (flagDeleteCollision === true) {
        setTimeout(() => {
          const bullet = document.getElementById(
            `bullet${colorSide}`
          ) as HTMLImageElement;
          bullet.remove();
        }, 25);
      }

      setTimeout(() => {
        if (document.getElementById(`bullet${colorSide}`)) {
          const bullet = document.getElementById(
            `bullet${colorSide}`
          ) as HTMLImageElement;
          console.log(bullet);
          bullet.remove();
        }
      }, 300);
    } else {
      if (flagDeleteCollision === true) {
        //delete bullet
        setTimeout(() => {
          const bullet = document.getElementById(
            `bullet${colorSide}`
          ) as HTMLImageElement;
          bullet.remove();
        }, 25);

        const intervalToDelete: Array<IntervalInformations> =
          this.intervalsIds.filter(
            (ele) => ele.name === `bulletInterval${colorSide}`
          );
        intervalToDelete.forEach((ele) => {
          clearInterval(ele.id);
        });

        this.intervalsIds = this.intervalsIds.filter(
          (ele) => ele.name !== `bulletInterval${colorSide}`
        );

        const intervalAnimationToDelete: Array<IntervalInformations> =
          this.intervalsIds.filter(
            (ele) => ele.name === `bulletAnimationInterval${colorSide}`
          );
        intervalAnimationToDelete.forEach((ele) => {
          clearInterval(ele.id);
        });

        this.intervalsIds = this.intervalsIds.filter(
          (ele) => ele.name !== `bulletAnimationInterval${colorSide}`
        );

        this.intervalsIds = this.intervalsIds.filter(
          (ele) => ele.name !== `bulletInterval${colorSide}`
        );

        const timeoutAnimationToDelete: Array<IntervalInformations> =
          this.intervalsIds.filter(
            (ele) => ele.name === `timeoutBulletAnimation${colorSide}`
          );
        timeoutAnimationToDelete.forEach((ele) => {
          clearInterval(ele.id);
        });

        this.intervalsIds = this.intervalsIds.filter(
          (ele) => ele.name !== `timeoutBulletAnimation${colorSide}`
        );
      }
    }
  };

  calculateCords = (
    x: number,
    y: number,
    width: number,
    height: number,
    degree: number
  ) => {
    console.log(degree);
    let center = {
      x: x + width / 2,
      y: y + height / 2,
    };

    let vector = {
      x: x - center.x,
      y: y - center.y,
    };

    let rotationMatrix = [
      [this.cos(degree), -this.sin(degree)],
      [this.sin(degree), this.cos(degree)],
    ];

    let rotatedVector = {
      x: vector.x * rotationMatrix[0][0] + vector.y * rotationMatrix[0][1],
      y: vector.x * rotationMatrix[1][0] + vector.y * rotationMatrix[1][1],
    };

    return {
      x: center.x + rotatedVector.x,
      y: center.y + rotatedVector.y,
    };
  };

  sin = (x: number) => {
    return Math.sin((x / 180) * Math.PI);
  };

  cos = (x: number) => {
    return Math.cos((x / 180) * Math.PI);
  };

  pawnsAttack = (
    colorSide: string,
    attackSide: string,
    character: Character
  ) => {
    const characterImgElement: HTMLImageElement = document.getElementById(
      `${colorSide}`
    ) as HTMLImageElement;
    console.log("weszlo w knightArrack");
    const sword = document.createElement("img");

    if (colorSide === "yellow") {
      sword.src = `./src/src/${character.type}/bullet${attackSide}.png`;
    } else {
      if (this.fightingShapeshifter === 1) {
        sword.src = `./src/src/Shapeshifter/${character.type}/bullet${attackSide}.png`;
      } else {
        sword.src = `./src/src/${character.type}/bullet${attackSide}.png`;
      }
    }

    if (attackSide === "LeftUp") {
      sword.width =
        (character.verticalWidthAttack as number) * this.bulletLength;
      sword.height =
        (character.horizontalWidthAttack as number) * this.bulletLength;
      sword.style.top = `${
        parseInt(characterImgElement.style.top.split("px")[0]) -
        (character.horizontalWidthAttack as number) * this.bulletLength +
        15
      }px`;
      sword.style.left = `${
        parseInt(characterImgElement.style.left.split("px")[0]) -
        (character.verticalWidthAttack as number) * this.bulletLength +
        10
      }px`;
      if (character.type === "Goblin") {
        sword.style.top = `${
          parseInt(characterImgElement.style.top.split("px")[0]) -
          (character.horizontalWidthAttack as number) * this.bulletLength +
          10
        }px`;
      }
    } else if (attackSide === "RightDown") {
      sword.width =
        (character.verticalWidthAttack as number) * this.bulletLength;
      sword.height =
        (character.horizontalWidthAttack as number) * this.bulletLength;
      sword.style.top = `${
        parseInt(characterImgElement.style.top.split("px")[0]) -
        (character.horizontalWidthAttack as number) * this.bulletLength +
        5 +
        50
      }px`;
      sword.style.left = `${
        parseInt(characterImgElement.style.left.split("px")[0]) -
        (character.verticalWidthAttack as number) * this.bulletLength +
        30 +
        50
      }px`;
    } else if (attackSide === "RightUp") {
      sword.width =
        (character.verticalWidthAttack as number) * this.bulletLength;
      sword.height =
        (character.horizontalWidthAttack as number) * this.bulletLength;
      sword.style.left = `${
        parseInt(characterImgElement.style.left.split("px")[0]) -
        (character.verticalWidthAttack as number) * this.bulletLength +
        30 +
        50
      }px`;
      sword.style.top = `${
        parseInt(characterImgElement.style.top.split("px")[0]) -
        (character.horizontalWidthAttack as number) * this.bulletLength +
        15
      }px`;
      if (character.type === "Goblin") {
        sword.style.top = `${
          parseInt(characterImgElement.style.top.split("px")[0]) -
          (character.horizontalWidthAttack as number) * this.bulletLength +
          10
        }px`;
      }
    } else if (attackSide === "LeftDown") {
      sword.width =
        (character.verticalWidthAttack as number) * this.bulletLength;
      sword.height =
        (character.horizontalWidthAttack as number) * this.bulletLength;
      sword.style.top = `${
        parseInt(characterImgElement.style.top.split("px")[0]) -
        (character.horizontalWidthAttack as number) * this.bulletLength +
        5 +
        50
      }px`;
      sword.style.left = `${
        parseInt(characterImgElement.style.left.split("px")[0]) -
        (character.verticalWidthAttack as number) * this.bulletLength +
        10
      }px`;
    } else if (attackSide === "Up") {
      sword.height =
        (character.verticalWidthAttack as number) * this.bulletLength;
      sword.width =
        (character.horizontalWidthAttack as number) * this.bulletLength - 5;
      sword.style.top = `${
        parseInt(characterImgElement.style.top.split("px")[0]) -
        (character.verticalWidthAttack as number) * this.bulletLength
      }px`;
      sword.style.left = `${
        parseInt(characterImgElement.style.left.split("px")[0]) -
        (character.horizontalWidthAttack as number) * this.bulletLength +
        50
      }px`;
    } else if (attackSide === "Down") {
      sword.height =
        (character.verticalWidthAttack as number) * this.bulletLength;
      sword.width =
        (character.horizontalWidthAttack as number) * this.bulletLength - 5;
      sword.style.top = `${
        parseInt(characterImgElement.style.top.split("px")[0]) -
        (character.verticalWidthAttack as number) * this.bulletLength +
        85
      }px`;
      sword.style.left = `${
        parseInt(characterImgElement.style.left.split("px")[0]) -
        (character.horizontalWidthAttack as number) * this.bulletLength +
        40
      }px`;
    } else if (attackSide === "Left") {
      sword.width =
        (character.verticalWidthAttack as number) * this.bulletLength;
      sword.height =
        (character.horizontalWidthAttack as number) * this.bulletLength - 10;
      sword.style.top = `${
        parseInt(characterImgElement.style.top.split("px")[0]) -
        (character.horizontalWidthAttack as number) * this.bulletLength +
        40
      }px`;
      sword.style.left = `${
        parseInt(characterImgElement.style.left.split("px")[0]) -
        (character.verticalWidthAttack as number) * this.bulletLength +
        2
      }px`;
    } else if (attackSide === "Right") {
      sword.width =
        (character.verticalWidthAttack as number) * this.bulletLength;
      sword.height =
        (character.horizontalWidthAttack as number) * this.bulletLength - 10;
      sword.style.top = `${
        parseInt(characterImgElement.style.top.split("px")[0]) -
        (character.horizontalWidthAttack as number) * this.bulletLength +
        40
      }px`;
      sword.style.left = `${
        parseInt(characterImgElement.style.left.split("px")[0]) -
        (character.verticalWidthAttack as number) * this.bulletLength +
        90
      }px`;
    }

    sword.classList.add("bullet");
    sword.id = `bullet${colorSide}`;
    this.rootDiv.appendChild(sword);

    this.bulletCollision(attackSide, colorSide, character, 0, 0, 0);
  };

  attackCharacter = (side: string) => {
    console.log(this.keyLogger);
    if (side === "yellow") {
      if (this.fightingCharactersInformations.yellow.type === "Phoenix") {
        if (this.readyToFireYellow === 1) {
          this.attackOperation(-1, -1, side, "LeftUp");
        }
      } else {
        if (
          //Left-Up
          this.keyLogger[0].clicked === true &&
          this.keyLogger[1].clicked === true
        ) {
          if (this.readyToFireYellow === 1) {
            this.attackOperation(-1, -1, side, "LeftUp");
          }
        } else if (
          //Left-Down
          this.keyLogger[0].clicked === true &&
          this.keyLogger[3].clicked === true
        ) {
          //this.moveFightingCharacters(1 * moveJump, -1 * moveJump, "yellow");

          if (this.readyToFireYellow === 1) {
            this.attackOperation(1, -1, side, "LeftDown");
          }
        } else if (
          //Right-Up
          this.keyLogger[2].clicked === true &&
          this.keyLogger[1].clicked === true
        ) {
          //this.moveFightingCharacters(-1 * moveJump, 1 * moveJump, "yellow");

          if (this.readyToFireYellow === 1) {
            this.attackOperation(-1, 1, side, "RightUp");
          }
        } else if (
          //Right-Down
          this.keyLogger[2].clicked === true &&
          this.keyLogger[3].clicked === true
        ) {
          //this.moveFightingCharacters(1 * moveJump, 1 * moveJump, "yellow");
          if (this.readyToFireYellow === 1) {
            this.attackOperation(1, 1, side, "RightDown");
          }
          //Left
        } else if (this.keyLogger[0].clicked === true) {
          //this.moveFightingCharacters(0 * moveJump, -1 * moveJump, "yellow");
          if (this.readyToFireYellow === 1) {
            this.attackOperation(0, -1, side, "Left");
          }
          //Right
        } else if (this.keyLogger[2].clicked === true) {
          //this.moveFightingCharacters(0 * moveJump, 1 * moveJump, "yellow");
          if (this.readyToFireYellow === 1) {
            this.attackOperation(0, 1, side, "Right");
          }
          //Up
        } else if (this.keyLogger[1].clicked === true) {
          //this.moveFightingCharacters(-1 * moveJump, 0 * moveJump, "yellow");
          if (this.readyToFireYellow === 1) {
            this.attackOperation(-1, 0, side, "Up");
          }
          //Down
        } else if (this.keyLogger[3].clicked === true) {
          //this.moveFightingCharacters(1 * moveJump, 0 * moveJump, "yellow");
          if (this.readyToFireYellow === 1) {
            this.attackOperation(1, 0, side, "Down");
          }
        }
      }
    } else {
      //Blue side
      if (
        this.fightingCharactersInformations.blue.type === "Banshee" ||
        this.fightingCharactersInformations.blue.type === "Phoenix"
      ) {
        if (this.readyToFireBlue === 1) {
          this.attackOperation(-1, -1, side, "LeftUp");
        }
      } else {
        if (
          //Up-Left
          this.keyLogger[6].clicked === true &&
          this.keyLogger[9].clicked === true
        ) {
          //this.moveFightingCharacters(-1 * moveJump, -1 * moveJump, "blue");
          if (this.readyToFireBlue === 1) {
            this.attackOperation(-1, -1, side, "LeftUp");
          }
        } else if (
          //Down-Left
          this.keyLogger[8].clicked === true &&
          this.keyLogger[9].clicked === true
        ) {
          //this.moveFightingCharacters(1 * moveJump, -1 * moveJump, "blue");
          if (this.readyToFireBlue === 1) {
            this.attackOperation(1, -1, side, "LeftDown");
          }
        } else if (
          //Up-Right
          this.keyLogger[6].clicked === true &&
          this.keyLogger[7].clicked === true
        ) {
          //this.moveFightingCharacters(-1 * moveJump, 1 * moveJump, "blue");
          if (this.readyToFireBlue === 1) {
            this.attackOperation(-1, 1, side, "RightUp");
          }
        } else if (
          //Down-Right
          this.keyLogger[8].clicked === true &&
          this.keyLogger[7].clicked === true
        ) {
          //this.moveFightingCharacters(1 * moveJump, 1 * moveJump, "blue");
          if (this.readyToFireBlue === 1) {
            this.attackOperation(1, 1, side, "RightDown");
          }
          //Left
        } else if (this.keyLogger[9].clicked === true) {
          //this.moveFightingCharacters(0 * moveJump, -1 * moveJump, "blue");
          if (this.readyToFireBlue === 1) {
            this.attackOperation(0, -1, side, "Left");
          }
          //Right
        } else if (this.keyLogger[7].clicked === true) {
          //this.moveFightingCharacters(0 * moveJump, 1 * moveJump, "blue");
          if (this.readyToFireBlue === 1) {
            this.attackOperation(0, 1, side, "Right");
          }
          //Up
        } else if (this.keyLogger[6].clicked === true) {
          //this.moveFightingCharacters(-1 * moveJump, 0 * moveJump, "blue");
          if (this.readyToFireBlue === 1) {
            this.attackOperation(-1, 0, side, "Up");
          }
          //Down
        } else if (this.keyLogger[8].clicked === true) {
          //this.moveFightingCharacters(1 * moveJump, 0 * moveJump, "blue");
          if (this.readyToFireBlue === 1) {
            this.attackOperation(1, 0, side, "Down");
          }
        }
      }
    }
  };

  fightMoving(side: string) {
    //Yellow side
    //Click
    const moveJump = 15;
    if (side === "yellow") {
      if (this.keyLogger[4].clicked === true) {
        this.attackCharacter(side);
      } else if (
        //Left-Up
        this.keyLogger[0].clicked === true &&
        this.keyLogger[1].clicked === true
      ) {
        this.moveFightingCharacters(-1 * moveJump, -1 * moveJump, "yellow");
      } else if (
        //Left-Down
        this.keyLogger[0].clicked === true &&
        this.keyLogger[3].clicked === true
      ) {
        this.moveFightingCharacters(1 * moveJump, -1 * moveJump, "yellow");
      } else if (
        //Right-Up
        this.keyLogger[2].clicked === true &&
        this.keyLogger[1].clicked === true
      ) {
        this.moveFightingCharacters(-1 * moveJump, 1 * moveJump, "yellow");
      } else if (
        //Right-Down
        this.keyLogger[2].clicked === true &&
        this.keyLogger[3].clicked === true
      ) {
        this.moveFightingCharacters(1 * moveJump, 1 * moveJump, "yellow");
        //Left
      } else if (this.keyLogger[0].clicked === true) {
        this.moveFightingCharacters(0 * moveJump, -1 * moveJump, "yellow");
        //Right
      } else if (this.keyLogger[2].clicked === true) {
        this.moveFightingCharacters(0 * moveJump, 1 * moveJump, "yellow");
        //Up
      } else if (this.keyLogger[1].clicked === true) {
        this.moveFightingCharacters(-1 * moveJump, 0 * moveJump, "yellow");
        //Down
      } else if (this.keyLogger[3].clicked === true) {
        this.moveFightingCharacters(1 * moveJump, 0 * moveJump, "yellow");
      }

      if (
        this.keyLogger[4].clicked === false &&
        this.keyLogger[0].clicked === true
      ) {
        //Left
        this.movingYellowFight(side, "Left");
      } else if (
        this.keyLogger[4].clicked === false &&
        this.keyLogger[2].clicked === true
      ) {
        //Right
        this.movingYellowFight(side, "Right");
      } else if (
        this.keyLogger[4].clicked === false &&
        this.keyLogger[1].clicked === true
      ) {
        //Up
        this.movingYellowFight(side, "Up");
      } else if (
        this.keyLogger[4].clicked === false &&
        this.keyLogger[3].clicked === true
      ) {
        //Down
        this.movingYellowFight(side, "Down");
      } else {
        //clear move
        for (let i = 0; i < this.intervalsIds.length; i++) {
          if (this.intervalsIds[i].name === `${side}MovingAnimationinterval`) {
            clearInterval(this.intervalsIds[i].id);
            const imgElement: HTMLImageElement = document.getElementById(
              `${side}`
            ) as HTMLImageElement;
            imgElement.src = `./src/src/${this.fightingCharactersInformations.yellow.type}/${this.intervalsIds[i].movingSide}_0.png`;
          } else if (this.intervalsIds[i].name === `moveTimeout${side}`) {
            clearTimeout(this.intervalsIds[i].id);
          }
        }

        this.intervalsIds = this.intervalsIds
          .filter((ele) => ele.name !== `${side}MovingAnimationinterval`)
          .filter((ele) => ele.name !== `moveTimeout${side}`);
      }

      if (
        this.keyLogger[4].clicked === false &&
        (this.keyLogger[0].clicked === true ||
          this.keyLogger[1].clicked === true ||
          this.keyLogger[2].clicked === true ||
          this.keyLogger[3].clicked === true)
      ) {
        const playingMove: Array<AudioInformation> = this.audioArray.filter(
          (ele) => ele.name === `fight${side}`
        );
        if (playingMove.length === 0) {
          const audio = new Audio(
            `./src/src/${this.fightingCharactersInformations.yellow.type}/walk.wav`
          );
          audio.play();
          audio.loop = true;
          this.audioArray.push({
            htmlElement: audio,
            name: `fight${side}`,
          });
        }
      } else {
        this.audioArray.forEach((ele) => {
          if (ele.name === `fight${side}`) {
            ele.htmlElement.pause();
          }
        });

        this.audioArray = this.audioArray.filter(
          (ele) => ele.name !== `fight${side}`
        );
      }
    } else {
      //Blue side
      //Clicked
      if (this.keyLogger[11].clicked === true) {
        this.attackCharacter(side);
      } else if (
        //Up-Left
        this.keyLogger[6].clicked === true &&
        this.keyLogger[9].clicked === true
      ) {
        this.moveFightingCharacters(-1 * moveJump, -1 * moveJump, "blue");
      } else if (
        //Down-Left
        this.keyLogger[8].clicked === true &&
        this.keyLogger[9].clicked === true
      ) {
        this.moveFightingCharacters(1 * moveJump, -1 * moveJump, "blue");
      } else if (
        //Up-Right
        this.keyLogger[6].clicked === true &&
        this.keyLogger[7].clicked === true
      ) {
        this.moveFightingCharacters(-1 * moveJump, 1 * moveJump, "blue");
      } else if (
        //Down-Right
        this.keyLogger[8].clicked === true &&
        this.keyLogger[7].clicked === true
      ) {
        this.moveFightingCharacters(1 * moveJump, 1 * moveJump, "blue");
        //Left
      } else if (this.keyLogger[9].clicked === true) {
        this.moveFightingCharacters(0 * moveJump, -1 * moveJump, "blue");
        //Right
      } else if (this.keyLogger[7].clicked === true) {
        this.moveFightingCharacters(0 * moveJump, 1 * moveJump, "blue");
        //Up
      } else if (this.keyLogger[6].clicked === true) {
        this.moveFightingCharacters(-1 * moveJump, 0 * moveJump, "blue");
        //Down
      } else if (this.keyLogger[8].clicked === true) {
        this.moveFightingCharacters(1 * moveJump, 0 * moveJump, "blue");
      }

      if (
        this.keyLogger[11].clicked === false &&
        this.keyLogger[9].clicked === true
      ) {
        //Left
        this.movingYellowFight(side, "Left");
      } else if (
        this.keyLogger[11].clicked === false &&
        this.keyLogger[7].clicked === true
      ) {
        //Right
        this.movingYellowFight(side, "Right");
      } else if (
        this.keyLogger[11].clicked === false &&
        this.keyLogger[6].clicked === true
      ) {
        //Up
        this.movingYellowFight(side, "Up");
      } else if (
        this.keyLogger[11].clicked === false &&
        this.keyLogger[8].clicked === true
      ) {
        //Down
        this.movingYellowFight(side, "Down");
      } else {
        //clear move
        for (let i = 0; i < this.intervalsIds.length; i++) {
          if (this.intervalsIds[i].name === `${side}MovingAnimationinterval`) {
            clearInterval(this.intervalsIds[i].id);

            if (this.fightingShapeshifter === 1) {
              const imgElement: HTMLImageElement = document.getElementById(
                `${side}`
              ) as HTMLImageElement;
              imgElement.src = `./src/src/Shapeshifter/${this.fightingCharactersInformations.blue.type}/${this.intervalsIds[i].movingSide}_0.png`;
            } else {
              const imgElement: HTMLImageElement = document.getElementById(
                `${side}`
              ) as HTMLImageElement;
              imgElement.src = `./src/src/${this.fightingCharactersInformations.blue.type}/${this.intervalsIds[i].movingSide}_0.png`;
            }
          } else if (this.intervalsIds[i].name === `moveTimeout${side}`) {
            clearTimeout(this.intervalsIds[i].id);
          }
        }

        this.intervalsIds = this.intervalsIds
          .filter((ele) => ele.name !== `${side}MovingAnimationinterval`)
          .filter((ele) => ele.name !== `moveTimeout${side}`);
      }

      if (
        this.keyLogger[11].clicked === false &&
        (this.keyLogger[9].clicked === true ||
          this.keyLogger[8].clicked === true ||
          this.keyLogger[7].clicked === true ||
          this.keyLogger[6].clicked === true)
      ) {
        const playingMove: Array<AudioInformation> = this.audioArray.filter(
          (ele) => ele.name === `fight${side}`
        );
        if (playingMove.length === 0) {
          const audio = new Audio(
            `./src/src/${this.fightingCharactersInformations.yellow.type}/walk.wav`
          );
          audio.play();
          audio.loop = true;
          this.audioArray.push({
            htmlElement: audio,
            name: `fight${side}`,
          });
        }
      } else {
        this.audioArray.forEach((ele) => {
          if (ele.name === `fight${side}`) {
            ele.htmlElement.pause();
          }
        });

        this.audioArray = this.audioArray.filter(
          (ele) => ele.name !== `fight${side}`
        );
      }
    }
  }

  movingYellowFight = (side: string, movingSide: string) => {
    const movingAnimation: Array<IntervalInformations> =
      this.intervalsIds.filter(
        (ele) =>
          ele.name === `${side}MovingAnimationinterval` &&
          ele.movingSide === movingSide
      );
    if (movingAnimation.length === 0) {
      for (let i = 0; i < this.intervalsIds.length; i++) {
        if (this.intervalsIds[i].name === `${side}MovingAnimationinterval`) {
          clearInterval(this.intervalsIds[i].id);
        } else if (this.intervalsIds[i].name === `moveTimeout${side}`) {
          clearTimeout(this.intervalsIds[i].id);
        }
      }

      this.intervalsIds = this.intervalsIds
        .filter((ele) => ele.name !== `${side}MovingAnimationinterval`)
        .filter((ele) => ele.name !== `moveTimeout${side}`);

      let characterType: string = "";
      if (side === "yellow") {
        characterType = this.fightingCharactersInformations.yellow.type;
      } else {
        characterType = this.fightingCharactersInformations.blue.type;
      }

      this.animationFightingCharacter(side, characterType, movingSide);
      const movingAnimationinterval = setInterval(() => {
        this.animationFightingCharacter(side, characterType, movingSide);
      }, 200);

      this.intervalsIds.push({
        name: `${side}MovingAnimationinterval`,
        id: movingAnimationinterval,
        movingSide: movingSide,
      });
    }
  };

  moveFightingCharacters = (i: number, j: number, side: string) => {
    const div: HTMLDivElement = document.getElementById(
      "battleField"
    ) as HTMLDivElement;

    const characterImg: HTMLImageElement = document.getElementById(
      `${side}`
    ) as HTMLImageElement;

    if (
      document.getElementById("battleField") &&
      document.getElementById(`${side}`)
    ) {
      //Sprawdz czy działa
      const ceilOfArena = div.offsetTop + 10 + 10;

      const floorOfArena = ceilOfArena + 480 - 50;

      const leftSideOfArena = div.offsetLeft + 10 + 50;

      const rightSideOfArena = leftSideOfArena + 880 - 50;

      if (
        characterImg.offsetTop + i >= ceilOfArena &&
        characterImg.offsetTop + i <= floorOfArena
      ) {
        characterImg.style.top = `${characterImg.offsetTop + i}px`;
      } else {
        if (characterImg.offsetTop + i <= ceilOfArena) {
          characterImg.style.top = `${ceilOfArena}px`;
        } else {
          characterImg.style.top = `${floorOfArena}px`;
        }
      }

      if (
        characterImg.offsetLeft + j >= leftSideOfArena &&
        characterImg.offsetLeft + j <= rightSideOfArena
      ) {
        characterImg.style.left = `${characterImg.offsetLeft + j}px`;
      } else {
        if (characterImg.offsetLeft + j <= leftSideOfArena) {
          characterImg.style.left = `${leftSideOfArena}px`;
        } else {
          characterImg.style.left = `${rightSideOfArena}px`;
        }
      }

      for (let index = 0; index < 14; index++) {
        this.isCollidePlant(
          document.getElementById(`${side}`) as HTMLImageElement,
          document.getElementById(`plant_${index}`) as HTMLImageElement,
          i,
          j,
          side
        );
      }
    }
  };

  isCollidePlant = (
    character: HTMLImageElement,
    plant: HTMLImageElement,
    i: number,
    j: number,
    side: string
  ) => {
    //character
    const xValue1: number = parseInt(character.style.left.split("px")[0]);
    const yValue1: number = parseInt(character.style.top.split("px")[0]);
    const r1: number = 25;

    //plant
    const xValue2: number = parseInt(plant.style.left.split("px")[0]);
    const yValue2: number = parseInt(plant.style.top.split("px")[0]);
    const r2: number = 15;

    const lengthBetweenCenterPoints = Math.sqrt(
      Math.pow(xValue1 - xValue2, 2) + Math.pow(yValue1 - yValue2, 2)
    );
    const sumOfLengthR = r1 + r2;

    if (lengthBetweenCenterPoints < sumOfLengthR) {
      const id: number = parseInt(plant.id.split("_")[1]);
      const blockedPlantInformation: PlantsPlaces =
        this.arrayWithPlacesOfPlants.filter((ele) => ele.id === id)[0];
      if (blockedPlantInformation.phase === 1) {
        //slower
        if (i > 0) {
          character.style.top = `${yValue1 - 7}px`;
        }
        if (i < 0) {
          character.style.top = `${yValue1 + 7}px`;
        }

        if (j > 0) {
          character.style.left = `${xValue1 - 7}px`;
        }

        if (j < 0) {
          character.style.left = `${xValue1 + 7}px`;
        }
      } else if (blockedPlantInformation.phase === 2) {
        //blocker
        const differencBettweenValues = Math.round(
          sumOfLengthR - lengthBetweenCenterPoints
        );
        character.style.top = `${yValue1 - i}px`;
        character.style.left = `${xValue1 - j}px`;
      }
    }
  };

  animationFightingCharacter = (
    colorSide: string,
    characterType: string,
    side: string
  ) => {
    if (this.fightingShapeshifter === 1 && colorSide === "blue") {
      const img: HTMLImageElement = document.getElementById(
        `${colorSide}`
      ) as HTMLImageElement;
      img.src = `./src/src/Shapeshifter/${characterType}/${side}_0.png`;

      const timeout1 = setTimeout(() => {
        img.src = `./src/src/Shapeshifter/${characterType}/${side}_1.png`;
      }, 50);

      const timeout2 = setTimeout(() => {
        if (side === "Down" || side === "Up") {
          img.src = `./src/src/Shapeshifter/${characterType}/${side}_0.png`;
        } else {
          img.src = `./src/src/Shapeshifter/${characterType}/${side}_2.png`;
        }
      }, 100);

      const timeout3 = setTimeout(() => {
        if (side === "Down" || side === "Up") {
          img.src = `./src/src/Shapeshifter/${characterType}/${side}_2.png`;
        } else {
          img.src = `./src/src/Shapeshifter/${characterType}/${side}_3.png`;
        }
      }, 150);

      const timeout4 = setTimeout(() => {
        img.src = `./src/src/Shapeshifter/${characterType}/${side}_0.png`;
      }, 200);

      this.intervalsIds.push({
        id: timeout1,
        name: `moveTimeout${colorSide}`,
        movingSide: side,
      });

      this.intervalsIds.push({
        id: timeout2,
        name: `moveTimeout${colorSide}`,
        movingSide: side,
      });

      this.intervalsIds.push({
        id: timeout3,
        name: `moveTimeout${colorSide}`,
        movingSide: side,
      });

      this.intervalsIds.push({
        id: timeout4,
        name: `moveTimeout${colorSide}`,
        movingSide: side,
      });
    } else {
      const img: HTMLImageElement = document.getElementById(
        `${colorSide}`
      ) as HTMLImageElement;
      if (document.getElementById(`${colorSide}`)) {
        img.src = `./src/src/${characterType}/${side}_0.png`;

        const timeout1 = setTimeout(() => {
          img.src = `./src/src/${characterType}/${side}_1.png`;
        }, 50);

        const timeout2 = setTimeout(() => {
          if (side === "Down" || side === "Up") {
            img.src = `./src/src/${characterType}/${side}_0.png`;
          } else {
            img.src = `./src/src/${characterType}/${side}_2.png`;
          }
        }, 100);

        const timeout3 = setTimeout(() => {
          if (side === "Down" || side === "Up") {
            img.src = `./src/src/${characterType}/${side}_2.png`;
          } else {
            img.src = `./src/src/${characterType}/${side}_3.png`;
          }
        }, 150);

        const timeout4 = setTimeout(() => {
          img.src = `./src/src/${characterType}/${side}_0.png`;
        }, 200);

        this.intervalsIds.push({
          id: timeout1,
          name: `moveTimeout${colorSide}`,
          movingSide: side,
        });

        this.intervalsIds.push({
          id: timeout2,
          name: `moveTimeout${colorSide}`,
          movingSide: side,
        });

        this.intervalsIds.push({
          id: timeout3,
          name: `moveTimeout${colorSide}`,
          movingSide: side,
        });

        this.intervalsIds.push({
          id: timeout4,
          name: `moveTimeout${colorSide}`,
          movingSide: side,
        });
      }
    }
  };

  //Start battle
  startBattle = (i: number, j: number) => {
    this.endBattleFlag = false;
    this.roundsToDraw = 24;
    const fightingCharacters: Array<number> =
      this.arrayWithPlacesOfCharacters[i][j];

    if (document.getElementById("textInfo")) {
      const textInfo: HTMLDivElement = document.getElementById(
        "textInfo"
      ) as HTMLDivElement;
      textInfo.remove();
    }

    for (
      let i = 0;
      i < this.arrayWithCurrentInformationsAboutCharacters.length;
      i++
    ) {
      if (
        document.getElementById(
          `${this.arrayWithCurrentInformationsAboutCharacters[i].id}`
        )
      ) {
        const othersCharacters: HTMLImageElement = document.getElementById(
          `${this.arrayWithCurrentInformationsAboutCharacters[i].id}`
        ) as HTMLImageElement;
        othersCharacters.style.visibility = "hidden";
      }
    }

    window.onkeydown = () => {};
    window.onkeyup = () => {};

    for (let i = 0; i < this.intervalsIds.length; i++) {
      if (this.intervalsIds[i].name === "moveTimeout") {
        clearTimeout(this.intervalsIds[i].id);
      } else {
        clearInterval(this.intervalsIds[i].id);
      }
    }
    this.intervalsIds = [];

    this.cleanMovingAudio("Yellow");
    this.cleanMovingAudio("Blue");

    for (let i = 0; i < fightingCharacters.length; i++) {
      console.log(fightingCharacters);
      const characterInformation: Character =
        this.arrayWithCurrentInformationsAboutCharacters.filter(
          (ele) => ele.id === fightingCharacters[i]
        )[0];
      if (characterInformation.type === "Shapeshifter") {
        this.fightingShapeshifter = 1;
      }
      const characterImg: HTMLImageElement = document.createElement("img");
      characterImg.width = 50;
      characterImg.height = 50;
      characterImg.classList.add("fightingCharacterPrepareToBattle");

      if (characterInformation.side === 0) {
        this.fightingCharactersInformations.yellow = characterInformation;
        characterImg.id = "yellow";
        characterImg.src = `./src/src/${characterInformation.type}/right_0.png`;
      } else {
        characterImg.id = "blue";
        if (this.fightingShapeshifter === 1) {
          let index = 0;
          if (i === 0) {
            index = 1;
          } else {
            index = 0;
          }

          const enemyCharacter: Character =
            this.arrayWithInformationsAboutCharakters.filter(
              (ele) => ele.id === fightingCharacters[index]
            )[0];

          console.log(enemyCharacter);

          this.fightingCharactersInformations.blue = enemyCharacter;
          characterImg.src = `./src/src/Shapeshifter/${enemyCharacter.type}/left_0.png`;
        } else {
          this.fightingCharactersInformations.blue = characterInformation;
          characterImg.src = `./src/src/${characterInformation.type}/left_0.png`;
        }
      }

      const logoImage: HTMLImageElement = document.getElementById(
        `${fightingCharacters[i]}`
      ) as HTMLImageElement;

      characterImg.style.top = `${logoImage.offsetTop}px`;
      characterImg.style.left = `${logoImage.offsetLeft}px`;

      logoImage.style.visibility = "hidden";

      this.rootDiv.appendChild(characterImg);
    }

    const battleArenaDiv: HTMLDivElement = document.createElement("div");
    battleArenaDiv.id = "battleArena";
    battleArenaDiv.classList.add(`field${this.arrayWithColorsOfFields[i][j]}`);
    battleArenaDiv.style.width = "50px";
    battleArenaDiv.style.height = "50px";
    battleArenaDiv.classList.add("battleArena");

    const battleField: HTMLDivElement = document.getElementById(
      `${i}_${j}`
    ) as HTMLDivElement;

    battleArenaDiv.style.top = `${battleField.offsetTop}px`;
    battleArenaDiv.style.left = `${battleField.offsetLeft}px`;

    this.rootDiv.appendChild(battleArenaDiv);

    this.arrayWithPlacesOfPlants = [];

    //random places of plants
    let index = 0;
    while (index < 14) {
      const randomX = this.getRandomInt(200, 880);
      const randomY = this.getRandomInt(80, 510);
      let addFlag = true;
      for (let j = 0; j < this.arrayWithPlacesOfPlants.length; j++) {
        if (
          randomX - 100 < this.arrayWithPlacesOfPlants[j].x &&
          randomX + 100 > this.arrayWithPlacesOfPlants[j].x &&
          randomY - 100 < this.arrayWithPlacesOfPlants[j].y &&
          randomY + 100 > this.arrayWithPlacesOfPlants[j].y
        ) {
          addFlag = false;
        }
      }

      if (addFlag === true) {
        this.arrayWithPlacesOfPlants.push({
          id: index,
          x: randomX,
          y: randomY,
          phase: 2,
        });
        index = index + 1;
      }
    }

    setTimeout(() => {
      const smallBattleField: HTMLDivElement = document.getElementById(
        "battleArena"
      ) as HTMLDivElement;

      const board: HTMLDivElement = document.getElementById(
        "board"
      ) as HTMLDivElement;

      smallBattleField.style.top = `${board.offsetTop}px`;
      smallBattleField.style.left = "300px";
      smallBattleField.style.height = "470px";
      smallBattleField.style.width = "490px";

      const yellowCharacter: HTMLImageElement = document.getElementById(
        "yellow"
      ) as HTMLImageElement;
      yellowCharacter.style.top = "220px";
      yellowCharacter.style.left = "300px";

      const blueCharacter: HTMLImageElement = document.getElementById(
        "blue"
      ) as HTMLImageElement;

      blueCharacter.style.top = "320px";
      blueCharacter.style.left = "740px";
    }, 1000);

    setTimeout(() => {
      this.bigBattleField(i, j, this.arrayWithColorsOfFields[i][j][0]);
    }, 3000);
  };

  bigBattleField = (i: number, j: number, fieldColor: string) => {
    const yellowCharacter: HTMLImageElement = document.getElementById(
      "yellow"
    ) as HTMLImageElement;
    yellowCharacter.style.left = "115px";

    const blueCharacter: HTMLImageElement = document.getElementById(
      "blue"
    ) as HTMLImageElement;
    blueCharacter.style.left = "932px";

    const title: HTMLHeadingElement = document.getElementById(
      "title"
    ) as HTMLHeadingElement;
    title.style.visibility = "hidden";

    const battleArena: HTMLDivElement = document.getElementById(
      "battleArena"
    ) as HTMLDivElement;

    battleArena.style.top = "10px";
    battleArena.style.left = "50px";
    battleArena.style.height = "600px";
    battleArena.style.width = "1000px";

    setTimeout(() => {
      let homeFightPenaltyYellow = 0;
      let homeFightPenaltyBlue = 0;
      if (i === 4 && j === 0) {
        homeFightPenaltyYellow = this.spellsUsedYellowSide;
      } else if (i === 4 && j === 8) {
        homeFightPenaltyBlue = this.spellsUsedBlueSide;
      }

      const placeBonus: FieldColorInforamtion = this.fieldColorBonus.filter(
        (ele) => ele.color === fieldColor
      )[0];

      const columnDivLeft = document.createElement("div");
      columnDivLeft.style.backgroundColor = "#8c1a65";
      columnDivLeft.id = "leftColumn";
      columnDivLeft.style.height = "500px";
      columnDivLeft.style.width = "10px";
      columnDivLeft.classList.add("elementsOfBattleArena");
      battleArena.appendChild(columnDivLeft);

      this.hpFightInfo = {
        yellow:
          this.fightingCharactersInformations.yellow.HP +
          placeBonus.bonusYellow -
          homeFightPenaltyYellow,
        blue:
          this.fightingCharactersInformations.blue.HP +
          placeBonus.bonusBlue -
          homeFightPenaltyBlue,
      };

      const hpHeightColumnYellow = this.hpFightInfo.yellow * 15;
      const hpColumnYellow = document.createElement("div");
      hpColumnYellow.id = "hpyellow";
      hpColumnYellow.style.backgroundColor = this.sidesColor.yellow;
      hpColumnYellow.style.marginTop = `${500 - hpHeightColumnYellow}px`;
      hpColumnYellow.style.height = `${hpHeightColumnYellow}px`;
      hpColumnYellow.style.width = "10px";
      hpColumnYellow.classList.add("elementsOfBattleArena");

      battleArena.appendChild(hpColumnYellow);

      const battleField = document.createElement("div");
      battleField.id = "battleField";
      battleField.style.border = "10px solid #8c1a65";
      battleField.style.width = "900px";
      battleField.style.height = "500px";
      battleField.classList.add("battleField");
      battleField.classList.add("elementsOfBattleArena");

      battleArena.appendChild(battleField);

      const hpHeightColumnBlue = this.hpFightInfo.blue * 15;
      const hpColumnBlue = document.createElement("div");
      hpColumnBlue.id = "hpblue";
      hpColumnBlue.style.backgroundColor = this.sidesColor.blue;
      hpColumnBlue.style.marginTop = `${500 - hpHeightColumnBlue}px`;
      hpColumnBlue.style.height = `${hpHeightColumnBlue}px`;
      hpColumnBlue.style.width = "10px";
      hpColumnBlue.classList.add("elementsOfBattleArena");
      battleArena.appendChild(hpColumnBlue);

      const columnDivRight = document.createElement("div");
      columnDivRight.style.backgroundColor = "#8c1a65";
      columnDivRight.id = "rightColumn";
      columnDivRight.style.height = "500px";
      columnDivRight.style.width = "10px";
      columnDivRight.classList.add("elementsOfBattleArena");
      battleArena.appendChild(columnDivRight);

      for (let i = 0; i < this.arrayWithPlacesOfPlants.length; i++) {
        const plantImg = document.createElement("img");
        plantImg.id = `plant_${this.arrayWithPlacesOfPlants[i].id}`;
        const colorOfPlant = this.getRandomInt(0, 2);
        plantImg.src = `./src/src/plant_${colorOfPlant}.png`;
        plantImg.width = 40;
        plantImg.height = 40;
        plantImg.classList.add("plant");
        plantImg.style.top = `${this.arrayWithPlacesOfPlants[i].y}px`;
        plantImg.style.left = `${this.arrayWithPlacesOfPlants[i].x}px`;
        this.rootDiv.appendChild(plantImg);
      }

      yellowCharacter.classList.add("fightingCharacters");
      yellowCharacter.classList.remove("fightingCharacterPrepareToBattle");

      blueCharacter.classList.add("fightingCharacters");
      blueCharacter.classList.remove("fightingCharacterPrepareToBattle");

      this.changePlant();

      const plantInterval = setInterval(() => {
        this.intervalsIds = this.intervalsIds.filter(
          (ele) => ele.name !== "plantTimeout"
        );
        this.changePlant();
      }, 10000);

      this.intervalsIds.push({
        id: plantInterval,
        name: "plantsInterval",
      });

      this.keyLogger = this.keyLogger.map((ele) => ({
        ...ele,
        clicked: false,
      }));

      window.onkeydown = () => {
        this.changeKeyPositions(
          event as KeyboardEvent,
          true,
          "fight",
          false,
          0
        );
      };

      window.onkeyup = () => {
        this.changeKeyPositions(
          event as KeyboardEvent,
          false,
          "fight",
          false,
          0
        );
      };

      if (this.computerSide === 0) {
        this.startFightByComputer("yellow");
      }

      if (this.computerSide === 1) {
        this.startFightByComputer("blue");
      }
    }, 2000);
  };

  isColideChangePlant = (
    character: HTMLImageElement,
    plant: HTMLImageElement
  ) => {
    //character
    const xValue1: number = parseInt(character.style.left.split("px")[0]);
    const yValue1: number = parseInt(character.style.top.split("px")[0]);
    const r1: number = 25;

    //plant
    const xValue2: number = parseInt(plant.style.left.split("px")[0]);
    const yValue2: number = parseInt(plant.style.top.split("px")[0]);
    const r2: number = 15;

    const lengthBetweenCenterPoints = Math.sqrt(
      Math.pow(xValue1 - xValue2, 2) + Math.pow(yValue1 - yValue2, 2)
    );
    const sumOfLengthR = r1 + r2;

    if (lengthBetweenCenterPoints < sumOfLengthR) {
      if (character.id === "yellow") {
        character.style.left = `${xValue2 - 50}px`;
      } else {
        character.style.left = `${xValue2 + 40}px`;
      }
    }
  };

  //change plant interval
  changePlant = () => {
    const arrayOfSelectedPlants: Array<number> = [];

    const arrayOfSelectedPlantsHtmlElements: Array<HTMLImageElement> = [];

    let index = 0;
    while (index < 7) {
      const selectedPlant = this.getRandomInt(0, 13);
      if (
        arrayOfSelectedPlants.filter((ele) => ele === selectedPlant).length ===
        0
      ) {
        arrayOfSelectedPlants.push(selectedPlant);
        const imageHtmlElement: HTMLImageElement = document.getElementById(
          `plant_${selectedPlant}`
        ) as HTMLImageElement;
        arrayOfSelectedPlantsHtmlElements.push(imageHtmlElement);
        index = index + 1;
      }
    }

    for (let i = 0; i < arrayOfSelectedPlantsHtmlElements.length; i++) {
      arrayOfSelectedPlantsHtmlElements[i].style.opacity = "0.3";
      this.arrayWithPlacesOfPlants = this.arrayWithPlacesOfPlants.map((ele) =>
        ele.id === arrayOfSelectedPlants[i] ? { ...ele, phase: 1 } : { ...ele }
      );
    }

    const plantTimeout_1 = setTimeout(() => {
      for (let i = 0; i < arrayOfSelectedPlantsHtmlElements.length; i++) {
        arrayOfSelectedPlantsHtmlElements[i].style.opacity = "0";
        this.arrayWithPlacesOfPlants = this.arrayWithPlacesOfPlants.map((ele) =>
          ele.id === arrayOfSelectedPlants[i]
            ? { ...ele, phase: 0 }
            : { ...ele }
        );
      }
    }, 2500);

    const plantTimeout_2 = setTimeout(() => {
      for (let i = 0; i < arrayOfSelectedPlantsHtmlElements.length; i++) {
        arrayOfSelectedPlantsHtmlElements[i].style.opacity = "0.3";
        this.arrayWithPlacesOfPlants = this.arrayWithPlacesOfPlants.map((ele) =>
          ele.id === arrayOfSelectedPlants[i]
            ? { ...ele, phase: 1 }
            : { ...ele }
        );
      }
    }, 5000);

    const plantTimeout_3 = setTimeout(() => {
      for (let i = 0; i < arrayOfSelectedPlantsHtmlElements.length; i++) {
        arrayOfSelectedPlantsHtmlElements[i].style.opacity = "1";
        this.arrayWithPlacesOfPlants = this.arrayWithPlacesOfPlants.map((ele) =>
          ele.id === arrayOfSelectedPlants[i]
            ? { ...ele, phase: 2 }
            : { ...ele }
        );

        this.isColideChangePlant(
          document.getElementById("yellow") as HTMLImageElement,
          arrayOfSelectedPlantsHtmlElements[i]
        );

        this.isColideChangePlant(
          document.getElementById("blue") as HTMLImageElement,
          arrayOfSelectedPlantsHtmlElements[i]
        );
      }
    }, 7500);

    this.intervalsIds.push(
      {
        id: plantTimeout_1,
        name: "plantTimeout",
      },
      {
        id: plantTimeout_2,
        name: "plantTimeout",
      },
      {
        id: plantTimeout_3,
        name: "plantTimeout",
      }
    );
  };

  clickCursor() {
    if (
      this.arrayWithPlacesOfCharacters[this.cursorPosition.i][
        this.cursorPosition.j
      ][0] !== undefined
    ) {
      const id: number =
        this.arrayWithPlacesOfCharacters[this.cursorPosition.i][
          this.cursorPosition.j
        ][0];

      let imprisonedFlag = false;
      if (this.movingSide === 0) {
        if (this.imprisonYellow === id) {
          imprisonedFlag = true;
        }
      } else {
        if (this.imprisonBlue === id) {
          imprisonedFlag = true;
        }
      }

      if (imprisonedFlag === false) {
        const characterInfo: Character =
          this.arrayWithCurrentInformationsAboutCharacters.filter(
            (info) => info.id === id
          )[0];
        if (characterInfo.side === this.movingSide) {
          let moveFlag: boolean = false;

          if (characterInfo.typeOfMoves === "Ground") {
            if (this.cursorPosition.i - 1 >= 0) {
              const sitingCharacterId =
                this.arrayWithPlacesOfCharacters[this.cursorPosition.i - 1][
                  this.cursorPosition.j
                ][0];
              if (sitingCharacterId !== undefined) {
                const sitingCharacterInfo: Character =
                  this.arrayWithCurrentInformationsAboutCharacters.filter(
                    (info) => info.id === sitingCharacterId
                  )[0];
                if (sitingCharacterInfo.side !== this.movingSide) {
                  moveFlag = true;
                }
              } else {
                moveFlag = true;
              }
            }
            if (this.cursorPosition.i + 1 < this.playgroundHeight) {
              const sitingCharacterId =
                this.arrayWithPlacesOfCharacters[this.cursorPosition.i + 1][
                  this.cursorPosition.j
                ][0];
              if (sitingCharacterId !== undefined) {
                const sitingCharacterInfo: Character =
                  this.arrayWithCurrentInformationsAboutCharacters.filter(
                    (info) => info.id === sitingCharacterId
                  )[0];
                if (sitingCharacterInfo.side !== this.movingSide) {
                  moveFlag = true;
                }
              } else {
                moveFlag = true;
              }
            }
            if (this.cursorPosition.j - 1 >= 0) {
              const sitingCharacterId =
                this.arrayWithPlacesOfCharacters[this.cursorPosition.i][
                  this.cursorPosition.j - 1
                ][0];
              if (sitingCharacterId !== undefined) {
                const sitingCharacterInfo: Character =
                  this.arrayWithCurrentInformationsAboutCharacters.filter(
                    (info) => info.id === sitingCharacterId
                  )[0];
                if (sitingCharacterInfo.side !== this.movingSide) {
                  moveFlag = true;
                }
              } else {
                moveFlag = true;
              }
            }
            if (this.cursorPosition.j + 1 < this.playgroundHeight) {
              const sitingCharacterId =
                this.arrayWithPlacesOfCharacters[this.cursorPosition.i][
                  this.cursorPosition.j + 1
                ][0];
              if (sitingCharacterId !== undefined) {
                const sitingCharacterInfo: Character =
                  this.arrayWithCurrentInformationsAboutCharacters.filter(
                    (info) => info.id === sitingCharacterId
                  )[0];
                if (sitingCharacterInfo.side !== this.movingSide) {
                  moveFlag = true;
                }
              } else {
                moveFlag = true;
              }
            }
          } else {
            for (let i: number = 0; i <= characterInfo.moves; i++) {
              for (let j: number = 0; j <= characterInfo.moves; j++) {
                if (
                  this.cursorPosition.i - i >= 0 &&
                  this.cursorPosition.j - j >= 0
                ) {
                  const sitingCharacterId =
                    this.arrayWithPlacesOfCharacters[this.cursorPosition.i - i][
                      this.cursorPosition.j - j
                    ][0];
                  if (sitingCharacterId !== undefined) {
                    const sitingCharacterInfo: Character =
                      this.arrayWithCurrentInformationsAboutCharacters.filter(
                        (info) => info.id === sitingCharacterId
                      )[0];
                    if (sitingCharacterInfo.side !== this.movingSide) {
                      moveFlag = true;
                      break;
                    }
                  } else {
                    moveFlag = true;
                    break;
                  }
                }

                if (
                  this.cursorPosition.i + i < this.playgroundHeight &&
                  this.cursorPosition.j - j >= 0
                ) {
                  const sitingCharacterId =
                    this.arrayWithPlacesOfCharacters[this.cursorPosition.i + i][
                      this.cursorPosition.j - j
                    ][0];
                  if (sitingCharacterId !== undefined) {
                    const sitingCharacterInfo: Character =
                      this.arrayWithCurrentInformationsAboutCharacters.filter(
                        (info) => info.id === sitingCharacterId
                      )[0];
                    if (sitingCharacterInfo.side !== this.movingSide) {
                      moveFlag = true;
                      break;
                    }
                  } else {
                    moveFlag = true;
                    break;
                  }
                }

                if (
                  this.cursorPosition.i + i < this.playgroundHeight &&
                  this.cursorPosition.j + j < this.playgroundHeight
                ) {
                  const sitingCharacterId =
                    this.arrayWithPlacesOfCharacters[this.cursorPosition.i + i][
                      this.cursorPosition.j + j
                    ][0];
                  if (sitingCharacterId !== undefined) {
                    const sitingCharacterInfo: Character =
                      this.arrayWithCurrentInformationsAboutCharacters.filter(
                        (info) => info.id === sitingCharacterId
                      )[0];
                    if (sitingCharacterInfo.side !== this.movingSide) {
                      moveFlag = true;
                      break;
                    }
                  } else {
                    moveFlag = true;
                    break;
                  }
                }

                if (
                  this.cursorPosition.i - i >= 0 &&
                  this.cursorPosition.j + j < this.playgroundHeight
                ) {
                  const sitingCharacterId =
                    this.arrayWithPlacesOfCharacters[this.cursorPosition.i - i][
                      this.cursorPosition.j + j
                    ][0];
                  if (sitingCharacterId !== undefined) {
                    const sitingCharacterInfo: Character =
                      this.arrayWithCurrentInformationsAboutCharacters.filter(
                        (info) => info.id === sitingCharacterId
                      )[0];
                    if (sitingCharacterInfo.side !== this.movingSide) {
                      moveFlag = true;
                      break;
                    }
                  } else {
                    moveFlag = true;
                    break;
                  }
                }

                if (this.cursorPosition.i - i >= 0) {
                  const sitingCharacterId =
                    this.arrayWithPlacesOfCharacters[this.cursorPosition.i - i][
                      this.cursorPosition.j
                    ][0];
                  if (sitingCharacterId !== undefined) {
                    const sitingCharacterInfo: Character =
                      this.arrayWithCurrentInformationsAboutCharacters.filter(
                        (info) => info.id === sitingCharacterId
                      )[0];
                    if (sitingCharacterInfo.side !== this.movingSide) {
                      moveFlag = true;
                      break;
                    }
                  } else {
                    moveFlag = true;
                    break;
                  }
                }
                if (this.cursorPosition.i + i < this.playgroundHeight) {
                  const sitingCharacterId =
                    this.arrayWithPlacesOfCharacters[this.cursorPosition.i + i][
                      this.cursorPosition.j
                    ][0];
                  if (sitingCharacterId !== undefined) {
                    const sitingCharacterInfo: Character =
                      this.arrayWithCurrentInformationsAboutCharacters.filter(
                        (info) => info.id === sitingCharacterId
                      )[0];
                    if (sitingCharacterInfo.side !== this.movingSide) {
                      moveFlag = true;
                      break;
                    }
                  } else {
                    moveFlag = true;
                    break;
                  }
                }
                if (this.cursorPosition.j - j >= 0) {
                  const sitingCharacterId =
                    this.arrayWithPlacesOfCharacters[this.cursorPosition.i][
                      this.cursorPosition.j - j
                    ][0];
                  if (sitingCharacterId !== undefined) {
                    const sitingCharacterInfo: Character =
                      this.arrayWithCurrentInformationsAboutCharacters.filter(
                        (info) => info.id === sitingCharacterId
                      )[0];
                    if (sitingCharacterInfo.side !== this.movingSide) {
                      moveFlag = true;
                      break;
                    }
                  } else {
                    moveFlag = true;
                    break;
                  }
                }
                if (this.cursorPosition.j + j < this.playgroundHeight) {
                  const sitingCharacterId =
                    this.arrayWithPlacesOfCharacters[this.cursorPosition.i][
                      this.cursorPosition.j + j
                    ][0];
                  if (sitingCharacterId !== undefined) {
                    const sitingCharacterInfo: Character =
                      this.arrayWithCurrentInformationsAboutCharacters.filter(
                        (info) => info.id === sitingCharacterId
                      )[0];
                    if (sitingCharacterInfo.side !== this.movingSide) {
                      moveFlag = true;
                      break;
                    }
                  } else {
                    moveFlag = true;
                    break;
                  }
                }
              }
              if (moveFlag === true) {
                break;
              }
            }
          }
          for (let i = 0; i < this.intervalsIds.length; i++) {
            if (this.intervalsIds[i].name === "moveCursorInterval") {
              clearInterval(this.intervalsIds[i].id);
            }
          }
          this.intervalsIds = this.intervalsIds.filter(
            (id) => id.name !== "moveCursorInterval"
          );

          this.keyLogger = this.keyLogger.map((key) => ({
            ...key,
            clicked: false,
          }));

          window.onkeydown = () => {};

          window.onkeyup = () => {};

          if (moveFlag === true) {
            const divTextInfo: HTMLDivElement = document.createElement("div");
            divTextInfo.id = "textInfo";

            const characterInfoH2: HTMLHeadingElement =
              document.createElement("h2");
            characterInfoH2.innerText = `${characterInfo.type} (${characterInfo.typeOfMoves} ${characterInfo.moves})`;
            divTextInfo.appendChild(characterInfoH2);
            this.rootDiv.appendChild(divTextInfo);

            this.executedMoves = 0;

            this.selectedCharacter = characterInfo;

            this.temporaryPosition = {
              i: this.cursorPosition.i,
              j: this.cursorPosition.j,
            };

            this.passedFields = [];

            this.passedFields.push({
              i: this.cursorPosition.i,
              j: this.cursorPosition.j,
            }); //= this.passedFields.push({i:this.cursorPosition.i, j: this.cursorPosition.j})

            window.onkeydown = () => {
              this.changeKeyPositions(
                event as KeyboardEvent,
                true,
                "icon",
                false,
                0
              );
            };

            window.onkeyup = () => {
              this.changeKeyPositions(
                event as KeyboardEvent,
                false,
                "icon",
                false,
                0
              );
            };
          } else {
            const divTextInfo: HTMLDivElement = document.createElement("div");
            divTextInfo.id = "textInfo";

            const characterInfoH2: HTMLHeadingElement =
              document.createElement("h2");
            characterInfoH2.innerText = `${characterInfo.type} (${characterInfo.typeOfMoves} ${characterInfo.moves})`;
            divTextInfo.appendChild(characterInfoH2);

            const communicate = document.createElement("h2");
            communicate.innerHTML = "Alas, master, this icon cannot move";
            divTextInfo.appendChild(communicate);
            this.rootDiv.appendChild(divTextInfo);

            setTimeout(() => {
              const infoDiv: HTMLDivElement = document.getElementById(
                "textInfo"
              ) as HTMLDivElement;
              infoDiv.remove();

              window.onkeydown = () => {
                this.changeKeyPositions(
                  event as KeyboardEvent,
                  true,
                  "cursor",
                  false,
                  0
                );
              };

              window.onkeyup = () => {
                this.changeKeyPositions(
                  event as KeyboardEvent,
                  false,
                  "cursor",
                  false,
                  0
                );
              };
            }, 2000);
          }
        }
      } else {
        if (document.getElementById("communicate")) {
          const communicate = document.getElementById(
            "communicate"
          ) as HTMLHeadingElement;
          communicate.remove();
        }

        const newCommunciate = document.createElement("h2");
        newCommunciate.id = "communicate";
        newCommunciate.innerText = "Alas, this icon is imprisoned";
        this.rootDiv.appendChild(newCommunciate);
        setTimeout(() => {
          if (document.getElementById("communicate")) {
            const communicate = document.getElementById(
              "communicate"
            ) as HTMLHeadingElement;
            communicate.remove();
          }
        }, 1000);
      }
    }
  }

  //Actions for icons based on thiers type of move
  iconsActions() {
    if (
      this.keyLogger[0].clicked === false &&
      this.keyLogger[1].clicked === false &&
      this.keyLogger[2].clicked === false &&
      this.keyLogger[3].clicked === false
    ) {
      this.cleanMovingAudio("Yellow");
    }

    if (
      this.keyLogger[6].clicked === false &&
      this.keyLogger[7].clicked === false &&
      this.keyLogger[8].clicked === false &&
      this.keyLogger[9].clicked === false
    ) {
      this.cleanMovingAudio("Blue");
    }

    if (this.selectedCharacter.typeOfMoves === "Ground") {
      this.moveGroundCharacters();
    } else if (this.selectedCharacter.typeOfMoves === "Fly") {
      this.moveFlyCharacters();
    } else {
      this.moveTeleportCharacter();
    }
  }

  moveTeleportCharacter = () => {
    if (this.movingSide === 0) {
      if (
        //Left-Up
        this.keyLogger[0].clicked === true &&
        this.keyLogger[1].clicked === true
      ) {
        if (this.temporaryPosition.j > 0 && this.temporaryPosition.i > 0) {
          this.checkSelectedFieldTeleport(
            this.temporaryPosition.i - 1,
            this.temporaryPosition.j - 1
          );
        }
      } else if (
        //Left-Down
        this.keyLogger[0].clicked === true &&
        this.keyLogger[3].clicked === true
      ) {
        if (
          this.temporaryPosition.j > 0 &&
          this.temporaryPosition.i < this.playgroundHeight - 1
        ) {
          this.checkSelectedFieldTeleport(
            this.temporaryPosition.i + 1,
            this.temporaryPosition.j - 1
          );
        }
      } else if (
        //Right-Up
        this.keyLogger[2].clicked === true &&
        this.keyLogger[1].clicked === true
      ) {
        if (
          this.temporaryPosition.j < this.playgroundWidth - 1 &&
          this.temporaryPosition.i > 0
        ) {
          this.checkSelectedFieldTeleport(
            this.temporaryPosition.i - 1,
            this.temporaryPosition.j + 1
          );
        }
      } else if (
        //Right-Down
        this.keyLogger[2].clicked === true &&
        this.keyLogger[3].clicked === true
      ) {
        if (
          this.temporaryPosition.j < this.playgroundWidth - 1 &&
          this.temporaryPosition.i < this.playgroundHeight - 1
        ) {
          this.checkSelectedFieldTeleport(
            this.temporaryPosition.i + 1,
            this.temporaryPosition.j + 1
          );
        }
        //Left
      } else if (this.keyLogger[0].clicked === true) {
        if (this.temporaryPosition.j > 0) {
          this.checkSelectedFieldTeleport(
            this.temporaryPosition.i,
            this.temporaryPosition.j - 1
          );
        }
        //Up
      } else if (this.keyLogger[1].clicked === true) {
        if (this.temporaryPosition.i > 0) {
          this.checkSelectedFieldTeleport(
            this.temporaryPosition.i - 1,
            this.temporaryPosition.j
          );
        }
        //Right
      } else if (this.keyLogger[2].clicked === true) {
        if (this.temporaryPosition.j < this.playgroundWidth - 1) {
          this.checkSelectedFieldTeleport(
            this.temporaryPosition.i,
            this.temporaryPosition.j + 1
          );
        }
        //Down
      } else if (this.keyLogger[3].clicked === true) {
        if (this.temporaryPosition.i < this.playgroundHeight - 1) {
          this.checkSelectedFieldTeleport(
            this.temporaryPosition.i + 1,
            this.temporaryPosition.j
          );
        }
        //Click
      } else if (this.keyLogger[4].clicked === true) {
        //this.clickCursor();
        this.selectPlaceTeleport(
          this.temporaryPosition.i,
          this.temporaryPosition.j,
          this.selectedCharacter
        );
      }
    } else {
      if (
        //Up-Left
        this.keyLogger[6].clicked === true &&
        this.keyLogger[9].clicked === true
      ) {
        if (this.temporaryPosition.j > 0 && this.temporaryPosition.i > 0) {
          this.checkSelectedFieldTeleport(
            this.temporaryPosition.i - 1,
            this.temporaryPosition.j - 1
          );
        }
      } else if (
        //Down-Left
        this.keyLogger[8].clicked === true &&
        this.keyLogger[9].clicked === true
      ) {
        if (
          this.temporaryPosition.j > 0 &&
          this.temporaryPosition.i < this.playgroundHeight - 1
        ) {
          this.checkSelectedFieldTeleport(
            this.temporaryPosition.i + 1,
            this.temporaryPosition.j - 1
          );
        }
      } else if (
        //Up-Right
        this.keyLogger[6].clicked === true &&
        this.keyLogger[7].clicked === true
      ) {
        if (
          this.temporaryPosition.j < this.playgroundWidth - 1 &&
          this.temporaryPosition.i > 0
        ) {
          this.checkSelectedFieldTeleport(
            this.temporaryPosition.i - 1,
            this.temporaryPosition.j + 1
          );
        }
      } else if (
        //Down-Right
        this.keyLogger[8].clicked === true &&
        this.keyLogger[7].clicked === true
      ) {
        if (
          this.temporaryPosition.j < this.playgroundWidth - 1 &&
          this.temporaryPosition.i < this.playgroundHeight - 1
        ) {
          this.checkSelectedFieldTeleport(
            this.temporaryPosition.i + 1,
            this.temporaryPosition.j + 1
          );
        }
        //Left
      } else if (this.keyLogger[9].clicked === true) {
        if (this.temporaryPosition.j > 0) {
          this.checkSelectedFieldTeleport(
            this.temporaryPosition.i,
            this.temporaryPosition.j - 1
          );
        }
        //Up
      } else if (this.keyLogger[6].clicked === true) {
        if (this.temporaryPosition.i > 0) {
          this.checkSelectedFieldTeleport(
            this.temporaryPosition.i - 1,
            this.temporaryPosition.j
          );
        }
        //Right
      } else if (this.keyLogger[7].clicked === true) {
        if (this.temporaryPosition.j < this.playgroundWidth - 1) {
          this.checkSelectedFieldTeleport(
            this.temporaryPosition.i,
            this.temporaryPosition.j + 1
          );
        }
        //Down
      } else if (this.keyLogger[8].clicked === true) {
        if (this.temporaryPosition.i < this.playgroundHeight - 1) {
          this.checkSelectedFieldTeleport(
            this.temporaryPosition.i + 1,
            this.temporaryPosition.j
          );
        }
        //Click
      } else if (this.keyLogger[11].clicked === true) {
        //selectPlaceGroundFly
        this.selectPlaceTeleport(
          this.temporaryPosition.i,
          this.temporaryPosition.j,
          this.selectedCharacter
        );
      }
    }
  };

  checkSelectedFieldTeleport = (i: number, j: number) => {
    let moveFlag = true;
    if (
      i - (this.selectedCharacter.positionI as number) >
        this.selectedCharacter.moves ||
      -1 * this.selectedCharacter.moves >
        i - (this.selectedCharacter.positionI as number)
    ) {
      moveFlag = false;
    }

    if (
      j - (this.selectedCharacter.positionJ as number) >
        this.selectedCharacter.moves ||
      -1 * this.selectedCharacter.moves >
        j - (this.selectedCharacter.positionJ as number)
    ) {
      moveFlag = false;
    }

    if (document.getElementById("communicate")) {
      const communicateDiv: HTMLHeadingElement = document.getElementById(
        "communicate"
      ) as HTMLHeadingElement;
      communicateDiv.remove();
    }

    if (moveFlag === true) {
      const imgIconElement: HTMLImageElement = document.getElementById(
        `cursor`
      ) as HTMLImageElement;
      imgIconElement.style.left = `${
        parseInt(imgIconElement.style.left.split("px")[0]) +
        (j - this.temporaryPosition.j) * 50
      }px`;
      imgIconElement.style.top = `${
        parseInt(imgIconElement.style.top.split("px")[0]) +
        (i - this.temporaryPosition.i) * 50
      }px`;
      this.temporaryPosition = { i: i, j: j };
    } else {
      const textInfo: HTMLDivElement = document.getElementById(
        "textInfo"
      ) as HTMLDivElement;
      const communicate: HTMLHeadingElement = document.createElement("h2");
      communicate.id = "communicate";
      communicate.innerText = "You have moved your limit";
      textInfo.appendChild(communicate);
    }
  };

  selectPlaceTeleport = (
    positionI: number,
    positionJ: number,
    character: Character
  ) => {
    if (this.arrayWithPlacesOfCharacters[positionI][positionJ].length !== 0) {
      if (
        this.arrayWithPlacesOfCharacters[positionI][positionJ][0] !==
        character.id
      ) {
        const sittingCharacter =
          this.arrayWithCurrentInformationsAboutCharacters.filter(
            (ele) =>
              ele.id ===
              this.arrayWithPlacesOfCharacters[positionI][positionJ][0]
          )[0];
        if (sittingCharacter.side !== this.movingSide) {
          //BATTLE FILED

          this.arrayWithPlacesOfCharacters[character.positionI as number][
            character.positionJ as number
          ].splice(0, 1);
          this.arrayWithPlacesOfCharacters[positionI][positionJ].push(
            character.id
          );
          this.arrayWithCurrentInformationsAboutCharacters =
            this.arrayWithCurrentInformationsAboutCharacters.map((info) =>
              info.id === character.id
                ? {
                    ...info,
                    positionI: positionI,
                    positionJ: positionJ,
                  }
                : info
            );

          this.startBattle(positionI, positionJ);
          setTimeout(() => {
            const fightingField = document.getElementById(
              `${positionI}_${positionJ}`
            ) as HTMLDivElement;
            const teleportedCharacteriImg = document.getElementById(
              `${character.id}`
            ) as HTMLImageElement;
            teleportedCharacteriImg.style.top = `${
              fightingField.offsetTop + 1
            }px`;
            teleportedCharacteriImg.style.left = `${
              fightingField.offsetLeft + 1
            }px`;
          }, 1000);
        }

        //this.teleportAction(character,positionI,positionJ,"fight")
      } else {
        //magic
        let noSpellsFlag = false;
        if (character.side === 0) {
          if (this.spellsYellowSide.length === 1) {
            noSpellsFlag = true;
          }
        } else {
          if (this.spellsBlueSide.length === 1) {
            noSpellsFlag = true;
          }
        }

        if (noSpellsFlag === false) {
          this.startMagic();
        } else {
          window.onkeydown = () => {};
          window.onkeyup = () => {};
          this.keyLogger = this.keyLogger.map((ele) => ({
            ...ele,
            clicked: false,
          }));
          for (let i = 0; i < this.intervalsIds.length; i++) {
            if (
              this.intervalsIds[i].name === "moveCursorInterval" ||
              this.intervalsIds[i].name === "iconsActions"
            ) {
              clearInterval(this.intervalsIds[i].id);
            }
          }
          this.intervalsIds = this.intervalsIds.filter(
            (id) => id.name !== "iconsActions"
          );

          const communicate = document.createElement("h2");
          communicate.id = "communicate";
          communicate.innerText = "Oh, woe! Your spells are gone!";
          this.rootDiv.appendChild(communicate);

          setTimeout(() => {
            const communicate = document.getElementById(
              "communicate"
            ) as HTMLHeadingElement;
            communicate.remove();

            const textinfo = document.getElementById(
              "textInfo"
            ) as HTMLDivElement;
            textinfo.remove();

            window.onkeydown = () => {
              this.changeKeyPositions(
                event as KeyboardEvent,
                true,
                "cursor",
                false,
                0
              );
            };

            window.onkeyup = () => {
              this.changeKeyPositions(
                event as KeyboardEvent,
                false,
                "cursor",
                false,
                0
              );
            };
          }, 1000);
        }
      }
    } else {
      //   //free place

      //   const hoverDivOldPlace: HTMLDivElement = document.createElement("div");
      //   const imageOldPlace: HTMLImageElement = document.getElementById(
      //     `${character.id}`
      //   ) as HTMLImageElement;
      //   imageOldPlace.id = `oldPlace`;
      //   imageOldPlace.style.zIndex = "1";
      //   hoverDivOldPlace.id = "hoverOldPlace";
      //   hoverDivOldPlace.classList.add("hoverDiv");

      //   const divFieldOldPlace: HTMLDivElement = document.getElementById(
      //     `${character.positionI}_${character.positionJ}`
      //   ) as HTMLDivElement;

      //   hoverDivOldPlace.style.top = `${divFieldOldPlace.offsetTop + 50}px`;
      //   hoverDivOldPlace.style.left = `${divFieldOldPlace.offsetLeft}px`;
      //   hoverDivOldPlace.style.width = "50px";
      //   hoverDivOldPlace.style.height = "0px";

      //   const colorOfField: string =
      //     this.arrayWithColorsOfFields[
      //       character.positionI as number
      //     ][character.positionJ as number][0];

      //   hoverDivOldPlace.classList.add(`field${colorOfField}`);

      //   this.rootDiv.appendChild(hoverDivOldPlace);

      //   const audio = new Audio("./src/src/teleport.wav");
      //   audio.play();

      //   const cleaningPlace = setInterval(() => {
      //     const getHoverDiv: HTMLDivElement = document.getElementById(
      //       "hoverOldPlace"
      //     ) as HTMLDivElement;
      //     getHoverDiv.style.top = `${getHoverDiv.offsetTop - 5}px`;
      //     getHoverDiv.style.height = `${
      //       parseInt(getHoverDiv.style.height.split("px")[0]) + 5
      //     }px`;
      //   }, 100);

      //   setTimeout(() => {
      //     clearInterval(cleaningPlace);

      //     const oldPlace: HTMLDivElement = document.getElementById(
      //       "oldPlace"
      //     ) as HTMLDivElement;
      //     oldPlace.remove();
      //     const getHoverDiv: HTMLDivElement = document.getElementById(
      //       "hoverOldPlace"
      //     ) as HTMLDivElement;
      //     getHoverDiv.remove();
      //     audio.pause();
      //   }, 1000);

      //   //new place

      //   const newPlaceImg: HTMLImageElement = document.createElement("img");
      //   newPlaceImg.style.zIndex = "1";
      //   newPlaceImg.width = 48;
      //   newPlaceImg.height = 48;
      //   newPlaceImg.classList.add("character");
      //   newPlaceImg.id = character.id.toString();
      //   if (character.side === 0) {
      //     newPlaceImg.src = `./src/src/${character.type}/right_0.png`;
      //   } else {
      //     newPlaceImg.src = `./src/src/${character.type}/left_0.png`;
      //   }

      //   const newFiledDiv: HTMLDivElement = document.getElementById(
      //     `${positionI}_${positionJ}`
      //   ) as HTMLDivElement;

      //   newPlaceImg.style.top = `${newFiledDiv.offsetTop + 1}px`;
      //   newPlaceImg.style.left = `${newFiledDiv.offsetLeft + 1}px`;
      //   this.rootDiv.appendChild(newPlaceImg);

      //   const hoverDivNewPlace: HTMLDivElement = document.createElement("div");
      //   hoverDivNewPlace.style.height = "50px";
      //   hoverDivNewPlace.style.width = "50px";
      //   hoverDivNewPlace.classList.add("hoverDiv");
      //   hoverDivNewPlace.id = "hoverNewPlace";
      //   hoverDivNewPlace.style.top = `${newFiledDiv.offsetTop}px`;
      //   hoverDivNewPlace.style.left = `${newFiledDiv.offsetLeft}px`;

      //   const colorSymbolNewPlace: string =
      //     this.arrayWithColorsOfFields[positionI][
      //       positionJ
      //     ][0];
      //   hoverDivNewPlace.classList.add(`field${colorSymbolNewPlace}`);

      //   this.rootDiv.appendChild(hoverDivNewPlace);

      //   const cleaningNewPlace = setInterval(() => {
      //     const getHoverDiv: HTMLDivElement = document.getElementById(
      //       "hoverNewPlace"
      //     ) as HTMLDivElement;
      //     getHoverDiv.style.height = `${
      //       parseInt(getHoverDiv.style.height.split("px")[0]) - 5
      //     }px`;
      //   }, 100);

      //   setTimeout(() => {
      //     clearInterval(cleaningNewPlace);
      //     const getHoverDiv: HTMLDivElement = document.getElementById(
      //       "hoverNewPlace"
      //     ) as HTMLDivElement;
      //     getHoverDiv.remove();

      //     const getImgElement: HTMLImageElement = document.getElementById(
      //       `${character.id}`
      //     ) as HTMLImageElement;
      //     getImgElement.style.zIndex = "";
      //     getImgElement.src = `./src/src/${character.type}/logo.png`;
      //     //end round
      //     this.endRound();
      //   }, 1000);

      //   this.arrayWithPlacesOfCharacters[
      //     character.positionI as number
      //   ][character.positionJ as number].splice(0, 1);
      //   this.arrayWithPlacesOfCharacters[positionI][
      //     positionJ
      //   ].push(character.id);
      //   this.arrayWithCurrentInformationsAboutCharacters =
      //     this.arrayWithCurrentInformationsAboutCharacters.map((info) =>
      //       info.id === character.id
      //         ? {
      //             ...info,
      //             positionI: positionI,
      //             positionJ: positionJ,
      //           }
      //         : info
      //     );
      this.teleportAction(character, positionI, positionJ, "endRound");
    }
  };

  teleportAction = (
    character: Character,
    positionI: number,
    positionJ: number,
    afterTeleport: string
  ) => {
    //free place

    const hoverDivOldPlace: HTMLDivElement = document.createElement("div");
    const imageOldPlace: HTMLImageElement = document.getElementById(
      `${character.id}`
    ) as HTMLImageElement;
    imageOldPlace.id = `oldPlace`;
    imageOldPlace.style.zIndex = "1";
    hoverDivOldPlace.id = "hoverOldPlace";
    hoverDivOldPlace.classList.add("hoverDiv");

    const divFieldOldPlace: HTMLDivElement = document.getElementById(
      `${character.positionI}_${character.positionJ}`
    ) as HTMLDivElement;

    hoverDivOldPlace.style.top = `${divFieldOldPlace.offsetTop + 50}px`;
    hoverDivOldPlace.style.left = `${divFieldOldPlace.offsetLeft}px`;
    hoverDivOldPlace.style.width = "50px";
    hoverDivOldPlace.style.height = "0px";

    const colorOfField: string =
      this.arrayWithColorsOfFields[character.positionI as number][
        character.positionJ as number
      ][0];

    hoverDivOldPlace.classList.add(`field${colorOfField}`);

    this.rootDiv.appendChild(hoverDivOldPlace);

    const audio = new Audio("./src/src/teleport.wav");
    audio.play();

    const cleaningPlace = setInterval(() => {
      const getHoverDiv: HTMLDivElement = document.getElementById(
        "hoverOldPlace"
      ) as HTMLDivElement;
      getHoverDiv.style.top = `${getHoverDiv.offsetTop - 5}px`;
      getHoverDiv.style.height = `${
        parseInt(getHoverDiv.style.height.split("px")[0]) + 5
      }px`;
    }, 100);

    setTimeout(() => {
      clearInterval(cleaningPlace);

      const oldPlace: HTMLDivElement = document.getElementById(
        "oldPlace"
      ) as HTMLDivElement;
      oldPlace.remove();
      const getHoverDiv: HTMLDivElement = document.getElementById(
        "hoverOldPlace"
      ) as HTMLDivElement;
      getHoverDiv.remove();
      audio.pause();
    }, 1000);

    //new place

    const newPlaceImg: HTMLImageElement = document.createElement("img");
    newPlaceImg.style.zIndex = "1";
    newPlaceImg.width = 48;
    newPlaceImg.height = 48;
    newPlaceImg.classList.add("character");
    newPlaceImg.id = character.id.toString();
    if (character.side === 0) {
      newPlaceImg.src = `./src/src/${character.type}/right_0.png`;
    } else {
      newPlaceImg.src = `./src/src/${character.type}/left_0.png`;
    }

    const newFiledDiv: HTMLDivElement = document.getElementById(
      `${positionI}_${positionJ}`
    ) as HTMLDivElement;

    newPlaceImg.style.top = `${newFiledDiv.offsetTop + 1}px`;
    newPlaceImg.style.left = `${newFiledDiv.offsetLeft + 1}px`;
    this.rootDiv.appendChild(newPlaceImg);

    const hoverDivNewPlace: HTMLDivElement = document.createElement("div");
    hoverDivNewPlace.style.height = "50px";
    hoverDivNewPlace.style.width = "50px";
    hoverDivNewPlace.classList.add("hoverDiv");
    hoverDivNewPlace.id = "hoverNewPlace";
    hoverDivNewPlace.style.top = `${newFiledDiv.offsetTop}px`;
    hoverDivNewPlace.style.left = `${newFiledDiv.offsetLeft}px`;

    const colorSymbolNewPlace: string =
      this.arrayWithColorsOfFields[positionI][positionJ][0];
    hoverDivNewPlace.classList.add(`field${colorSymbolNewPlace}`);

    this.rootDiv.appendChild(hoverDivNewPlace);

    this.arrayWithPlacesOfCharacters[character.positionI as number][
      character.positionJ as number
    ].splice(0, 1);
    this.arrayWithPlacesOfCharacters[positionI][positionJ].push(character.id);
    this.arrayWithCurrentInformationsAboutCharacters =
      this.arrayWithCurrentInformationsAboutCharacters.map((info) =>
        info.id === character.id
          ? {
              ...info,
              positionI: positionI,
              positionJ: positionJ,
            }
          : info
      );

    const cleaningNewPlace = setInterval(() => {
      const getHoverDiv: HTMLDivElement = document.getElementById(
        "hoverNewPlace"
      ) as HTMLDivElement;
      getHoverDiv.style.height = `${
        parseInt(getHoverDiv.style.height.split("px")[0]) - 5
      }px`;
    }, 100);

    setTimeout(() => {
      clearInterval(cleaningNewPlace);
      const getHoverDiv: HTMLDivElement = document.getElementById(
        "hoverNewPlace"
      ) as HTMLDivElement;
      getHoverDiv.remove();

      const getImgElement: HTMLImageElement = document.getElementById(
        `${character.id}`
      ) as HTMLImageElement;
      getImgElement.style.zIndex = "";
      getImgElement.src = `./src/src/${character.type}/logo.png`;
      //end round
      if (afterTeleport === "endRound") {
        this.endRound();
      } else {
        this.startBattle(positionI, positionJ);
      }
    }, 1000);
  };

  healing = (indexOfSite: number) => {
    console.log(this.arrayWithCurrentInformationsAboutCharacters);
    this.powerPointsPositions.forEach((ele) => {
      const arrayIdCharacter = this.arrayWithPlacesOfCharacters[ele.i][ele.j];
      if (arrayIdCharacter.length !== 0) {
        const idCharacter = arrayIdCharacter[0];

        if (
          this.arrayWithCurrentInformationsAboutCharacters.filter(
            (ele) => ele.id === idCharacter
          )[0].side === indexOfSite
        ) {
          if (
            this.arrayWithCurrentInformationsAboutCharacters.filter(
              (ele) => ele.id === idCharacter
            )[0].HP <
            this.arrayWithInformationsAboutCharakters.filter(
              (ele) => ele.id === idCharacter
            )[0].HP
          ) {
            this.arrayWithCurrentInformationsAboutCharacters =
              this.arrayWithCurrentInformationsAboutCharacters.map((value) =>
                value.id === idCharacter
                  ? { ...value, HP: value.HP + 1 }
                  : { ...value }
              );
          }
        }
      }
    });
    console.log(this.arrayWithCurrentInformationsAboutCharacters);
  };

  endRound = () => {
    const cursor: HTMLDivElement = document.getElementById(
      "cursor"
    ) as HTMLDivElement;
    cursor.remove();
    for (let i = 0; i < this.intervalsIds.length; i++) {
      if (this.intervalsIds[i].name === "moveTimeout") {
        clearTimeout(this.intervalsIds[i].id);
      } else {
        clearInterval(this.intervalsIds[i].id);
      }
    }
    this.intervalsIds = [];

    const endGameWin = this.winGame() as boolean;

    if (this.round > 50) {
      this.roundsToDraw = this.roundsToDraw - 1;
      if (this.roundsToDraw === 0) {
        if (document.getElementById("textInfo")) {
          const textInfo = document.getElementById(
            "textInfo"
          ) as HTMLDivElement;
          textInfo.remove();
        }

        const newTextInfo = document.createElement("div");
        newTextInfo.id = "textInfo";
        const header = document.createElement("h2");
        header.id = "header";
        //draw
        header.innerText = "The game is ended... It is a tie";
        newTextInfo.appendChild(header);
        this.rootDiv.appendChild(newTextInfo);
      } else {
        if (document.getElementById("textInfo")) {
          const textInfo = document.getElementById(
            "textInfo"
          ) as HTMLDivElement;
          textInfo.remove();
        }

        const newTextinfo = document.createElement("div");
        newTextinfo.id = "textInfo";
        const header = document.createElement("h2");
        header.id = "header";
        header.innerText = `Make progress or it will be draw in ${Math.ceil(
          this.roundsToDraw / 2
        )} rounds`;
        newTextinfo.appendChild(header);
        this.rootDiv.appendChild(newTextinfo);
        setTimeout(() => {
          const oldTextInfo = document.getElementById(
            "textInfo"
          ) as HTMLDivElement;
          oldTextInfo.remove();
        }, 1000);
      }
    }

    if (endGameWin === false && this.roundsToDraw > 0) {
      if (this.round % 2 === 0) {
        if (this.colorsChangingArrayIndex + this.sideOfChangingColor === 6) {
          this.sideOfChangingColor = -1;
        } else if (
          this.colorsChangingArrayIndex + this.sideOfChangingColor ===
          -1
        ) {
          this.sideOfChangingColor = 1;
        }

        this.colorsChangingArrayIndex =
          this.colorsChangingArrayIndex + this.sideOfChangingColor;

        if (this.colorsChangingArrayIndex === 5) {
          this.imprisonBlue = -1;
        }

        if (this.colorsChangingArrayIndex === 0) {
          this.imprisonYellow = -1;
        }

        for (let i = 0; i < this.arrayWithChangingColorFields.length; i++) {
          const fieldDiv = this.arrayWithChangingColorFields[i];
          fieldDiv.removeAttribute("class");
          fieldDiv.classList.add("field");
          fieldDiv.classList.add(
            `field${this.colorsChangingArray[this.colorsChangingArrayIndex]}`
          );
          const idArray = fieldDiv.id.split("_");
          this.arrayWithColorsOfFields[parseInt(idArray[0])][
            parseInt(idArray[1])
          ] = this.colorsChangingArray[this.colorsChangingArrayIndex];
        }
      }
      this.round = this.round + 1;

      const board: HTMLDivElement = document.getElementById(
        "board"
      ) as HTMLDivElement;
      const title: HTMLHeadingElement = document.getElementById(
        "title"
      ) as HTMLHeadingElement;

      if (this.movingSide === 0) {
        const audio = new Audio();
        audio.src = "./src/src/startRoundDark.wav";
        audio.play();
        this.healing(0);
        this.movingSide = 1;
        board.style.borderColor = this.sidesColor.blue;
        title.style.color = this.sidesColor.blue;
      } else {
        const audio = new Audio();
        audio.src = "./src/src/startRoundLight.wav";
        audio.play();
        this.healing(1);
        this.movingSide = 0;
        board.style.borderColor = this.sidesColor.yellow;
        title.style.color = this.sidesColor.yellow;
      }

      if (document.getElementById("textInfo")) {
        const textInfo: HTMLDivElement = document.getElementById(
          "textInfo"
        ) as HTMLDivElement;
        textInfo.remove();
      }

      this.createCursor();

      window.onkeydown = () => {
        this.changeKeyPositions(
          event as KeyboardEvent,
          true,
          "cursor",
          false,
          0
        );
      };

      window.onkeyup = () => {
        this.changeKeyPositions(
          event as KeyboardEvent,
          false,
          "cursor",
          false,
          0
        );
      };
    }
  };

  winGame = () => {
    let endGameFlag = false;
    const arrayTakenPowerPoints: Array<number> = [];
    this.powerPointsPositions.forEach((ele) => {
      if (this.arrayWithPlacesOfCharacters[ele.i][ele.j].length === 0) {
        arrayTakenPowerPoints.push(-1);
      } else {
        const characterId = this.arrayWithPlacesOfCharacters[ele.i][ele.j][0];
        const characterSide =
          this.arrayWithCurrentInformationsAboutCharacters.filter(
            (ele) => ele.id === characterId
          )[0].side;
        arrayTakenPowerPoints.push(characterSide);
      }
    });

    let winFlagPowerPoints = true;
    arrayTakenPowerPoints.forEach((ele) => {
      if (ele !== arrayTakenPowerPoints[0]) {
        winFlagPowerPoints = false;
      }
    });

    if (winFlagPowerPoints === true && arrayTakenPowerPoints[0] !== -1) {
      if (document.getElementById("textInfo")) {
        const textInfo = document.getElementById("textInfo") as HTMLDivElement;
        textInfo.remove();
      }

      const newTextInfo = document.createElement("div");
      newTextInfo.id = "textInfo";
      const header = document.createElement("h2");
      header.id = "header";

      if (arrayTakenPowerPoints[0] === 0) {
        //yellow Win
        header.innerText = "The game is ended... The light side wins";
      } else {
        //blue win
        header.innerText = "The game is ended... The dark side wins";
      }

      newTextInfo.appendChild(header);
      this.rootDiv.appendChild(newTextInfo);
      endGameFlag = true;
    }

    if (endGameFlag === false) {
      let lightCharacterAlived = false;
      let darkCharacterAlived = false;

      this.arrayWithPlacesOfCharacters.forEach((row) => {
        row.forEach((arr) => {
          if (arr.length !== 0) {
            const characterId = arr[0];
            const characterInformations =
              this.arrayWithCurrentInformationsAboutCharacters.filter(
                (ele) => ele.id === characterId
              )[0];
            if (characterInformations.side === 0) {
              if (characterInformations.id !== this.imprisonYellow) {
                lightCharacterAlived = true;
              }
            } else {
              if (characterInformations.id !== this.imprisonBlue) {
                darkCharacterAlived = true;
              }
            }
          }
        });
      });

      if (lightCharacterAlived === false || darkCharacterAlived === false) {
        if (document.getElementById("textInfo")) {
          const textInfo = document.getElementById(
            "textInfo"
          ) as HTMLDivElement;
          textInfo.remove();
        }

        const newTextInfo = document.createElement("div");
        newTextInfo.id = "textInfo";
        const header = document.createElement("h2");
        header.id = "header";

        if (lightCharacterAlived !== false && darkCharacterAlived === false) {
          //yellow wins
          header.innerText = "The game is ended... The light side wins";
        } else if (
          lightCharacterAlived === false &&
          darkCharacterAlived !== false
        ) {
          //blue wins
          header.innerText = "The game is ended... The dark side wins";
        } else {
          //draw
          header.innerText = "The game is ended... It is a tie";
        }

        newTextInfo.appendChild(header);
        this.rootDiv.appendChild(newTextInfo);
        endGameFlag = true;
      }

      return endGameFlag;
    }
  };

  cleanMovingAudio = (side: string) => {
    const audiosToClear: Array<AudioInformation> = this.audioArray.filter(
      (ele) => ele.name === `walk${side}`
    );
    if (audiosToClear.length !== 0) {
      for (let i = 0; i < audiosToClear.length; i++) {
        audiosToClear[i].htmlElement.pause();
      }

      this.audioArray = this.audioArray.filter(
        (ele) => ele.name !== `walk${side}`
      );
    }
  };

  selectPlaceGroundFly = () => {
    if (
      this.arrayWithPlacesOfCharacters[this.temporaryPosition.i][
        this.temporaryPosition.j
      ].length !== 0
    ) {
      const sittingCharacter =
        this.arrayWithCurrentInformationsAboutCharacters.filter(
          (ele) =>
            ele.id ===
            this.arrayWithPlacesOfCharacters[this.temporaryPosition.i][
              this.temporaryPosition.j
            ][0]
        )[0];

      if (
        this.arrayWithPlacesOfCharacters[this.temporaryPosition.i][
          this.temporaryPosition.j
        ][0] !== this.selectedCharacter.id &&
        sittingCharacter.side !== this.movingSide
      ) {
        //BATTLE FILED

        this.arrayWithPlacesOfCharacters[
          this.selectedCharacter.positionI as number
        ][this.selectedCharacter.positionJ as number].splice(0, 1);
        this.arrayWithPlacesOfCharacters[this.temporaryPosition.i][
          this.temporaryPosition.j
        ].push(this.selectedCharacter.id);
        this.arrayWithCurrentInformationsAboutCharacters =
          this.arrayWithCurrentInformationsAboutCharacters.map((info) =>
            info.id === this.selectedCharacter.id
              ? {
                  ...info,
                  positionI: this.temporaryPosition.i,
                  positionJ: this.temporaryPosition.j,
                }
              : info
          );

        this.startBattle(this.temporaryPosition.i, this.temporaryPosition.j);
      }
    } else {
      //free place
      this.arrayWithPlacesOfCharacters[
        this.selectedCharacter.positionI as number
      ][this.selectedCharacter.positionJ as number].splice(0, 1);
      this.arrayWithPlacesOfCharacters[this.temporaryPosition.i][
        this.temporaryPosition.j
      ].push(this.selectedCharacter.id);
      this.arrayWithCurrentInformationsAboutCharacters =
        this.arrayWithCurrentInformationsAboutCharacters.map((info) =>
          info.id === this.selectedCharacter.id
            ? {
                ...info,
                positionI: this.temporaryPosition.i,
                positionJ: this.temporaryPosition.j,
              }
            : info
        );

      const characterImg: HTMLImageElement = document.getElementById(
        `${this.selectedCharacter.id}`
      ) as HTMLImageElement;
      characterImg.src = `./src/src/${this.selectedCharacter.type}/logo.png`;
      //end round
      this.endRound();
    }
  };

  moveFlyCharacters = () => {
    if (this.movingSide === 0) {
      if (
        //Left-Up
        this.keyLogger[0].clicked === true &&
        this.keyLogger[1].clicked === true
      ) {
        if (this.temporaryPosition.j > 0 && this.temporaryPosition.i > 0) {
          this.checkSelectedFieldFly(
            this.temporaryPosition.i - 1,
            this.temporaryPosition.j - 1,
            "left",
            "Yellow"
          );
        } else {
          this.cleanMovingAudio("Yellow");
        }
      } else if (
        //Left-Down
        this.keyLogger[0].clicked === true &&
        this.keyLogger[3].clicked === true
      ) {
        if (
          this.temporaryPosition.j > 0 &&
          this.temporaryPosition.i < this.playgroundHeight - 1
        ) {
          this.checkSelectedFieldFly(
            this.temporaryPosition.i + 1,
            this.temporaryPosition.j - 1,
            "left",
            "Yellow"
          );
        } else {
          this.cleanMovingAudio("Yellow");
        }
      } else if (
        //Right-Up
        this.keyLogger[2].clicked === true &&
        this.keyLogger[1].clicked === true
      ) {
        if (
          this.temporaryPosition.j < this.playgroundWidth - 1 &&
          this.temporaryPosition.i > 0
        ) {
          this.checkSelectedFieldFly(
            this.temporaryPosition.i - 1,
            this.temporaryPosition.j + 1,
            "right",
            "Yellow"
          );
        } else {
          this.cleanMovingAudio("Yellow");
        }
      } else if (
        //Right-Down
        this.keyLogger[2].clicked === true &&
        this.keyLogger[3].clicked === true
      ) {
        if (
          this.temporaryPosition.j < this.playgroundWidth - 1 &&
          this.temporaryPosition.i < this.playgroundHeight - 1
        ) {
          this.checkSelectedFieldFly(
            this.temporaryPosition.i + 1,
            this.temporaryPosition.j + 1,
            "right",
            "Yellow"
          );
        } else {
          this.cleanMovingAudio("Yellow");
        }
        //Left
      } else if (this.keyLogger[0].clicked === true) {
        if (this.temporaryPosition.j > 0) {
          this.checkSelectedFieldFly(
            this.temporaryPosition.i,
            this.temporaryPosition.j - 1,
            "left",
            "Yellow"
          );
        } else {
          this.cleanMovingAudio("Yellow");
        }
        //Up
      } else if (this.keyLogger[1].clicked === true) {
        if (this.temporaryPosition.i > 0) {
          this.checkSelectedFieldFly(
            this.temporaryPosition.i - 1,
            this.temporaryPosition.j,
            "up",
            "Yellow"
          );
        } else {
          this.cleanMovingAudio("Yellow");
        }
        //Right
      } else if (this.keyLogger[2].clicked === true) {
        if (this.temporaryPosition.j < this.playgroundWidth - 1) {
          this.checkSelectedFieldFly(
            this.temporaryPosition.i,
            this.temporaryPosition.j + 1,
            "right",
            "Yellow"
          );
        } else {
          this.cleanMovingAudio("Yellow");
        }
        //Down
      } else if (this.keyLogger[3].clicked === true) {
        if (this.temporaryPosition.i < this.playgroundHeight - 1) {
          this.checkSelectedFieldFly(
            this.temporaryPosition.i + 1,
            this.temporaryPosition.j,
            "down",
            "Yellow"
          );
        } else {
          this.cleanMovingAudio("Yellow");
        }
        //Click
      } else if (this.keyLogger[4].clicked === true) {
        this.selectPlaceGroundFly();
      }
    } else {
      if (
        //Up-Left
        this.keyLogger[6].clicked === true &&
        this.keyLogger[9].clicked === true
      ) {
        if (this.temporaryPosition.j > 0 && this.temporaryPosition.i > 0) {
          this.checkSelectedFieldFly(
            this.temporaryPosition.i - 1,
            this.temporaryPosition.j - 1,
            "left",
            "Blue"
          );
        } else {
          this.cleanMovingAudio("Blue");
        }
      } else if (
        //Down-Left
        this.keyLogger[8].clicked === true &&
        this.keyLogger[9].clicked === true
      ) {
        if (
          this.temporaryPosition.j > 0 &&
          this.temporaryPosition.i < this.playgroundHeight - 1
        ) {
          this.checkSelectedFieldFly(
            this.temporaryPosition.i + 1,
            this.temporaryPosition.j - 1,
            "left",
            "Blue"
          );
        } else {
          this.cleanMovingAudio("Blue");
        }
      } else if (
        //Up-Right
        this.keyLogger[6].clicked === true &&
        this.keyLogger[7].clicked === true
      ) {
        if (
          this.temporaryPosition.j < this.playgroundWidth - 1 &&
          this.temporaryPosition.i > 0
        ) {
          this.checkSelectedFieldFly(
            this.temporaryPosition.i - 1,
            this.temporaryPosition.j + 1,
            "right",
            "Blue"
          );
        } else {
          this.cleanMovingAudio("Blue");
        }
      } else if (
        //Down-Right
        this.keyLogger[8].clicked === true &&
        this.keyLogger[7].clicked === true
      ) {
        if (
          this.temporaryPosition.j < this.playgroundWidth - 1 &&
          this.temporaryPosition.i < this.playgroundHeight - 1
        ) {
          this.checkSelectedFieldFly(
            this.temporaryPosition.i + 1,
            this.temporaryPosition.j + 1,
            "right",
            "Blue"
          );
        } else {
          this.cleanMovingAudio("Blue");
        }
        //Left
      } else if (this.keyLogger[9].clicked === true) {
        if (this.temporaryPosition.j > 0) {
          this.checkSelectedFieldFly(
            this.temporaryPosition.i,
            this.temporaryPosition.j - 1,
            "left",
            "Blue"
          );
        } else {
          this.cleanMovingAudio("Blue");
        }
        //Up
      } else if (this.keyLogger[6].clicked === true) {
        if (this.temporaryPosition.i > 0) {
          this.checkSelectedFieldFly(
            this.temporaryPosition.i - 1,
            this.temporaryPosition.j,
            "up",
            "Blue"
          );
        } else {
          this.cleanMovingAudio("Blue");
        }
        //Right
      } else if (this.keyLogger[7].clicked === true) {
        if (this.temporaryPosition.j < this.playgroundWidth - 1) {
          this.checkSelectedFieldFly(
            this.temporaryPosition.i,
            this.temporaryPosition.j + 1,
            "right",
            "Blue"
          );
        } else {
          this.cleanMovingAudio("Blue");
        }
        //Down
      } else if (this.keyLogger[8].clicked === true) {
        if (this.temporaryPosition.i < this.playgroundHeight - 1) {
          this.checkSelectedFieldFly(
            this.temporaryPosition.i + 1,
            this.temporaryPosition.j,
            "down",
            "Blue"
          );
        } else {
          this.cleanMovingAudio("Blue");
        }
        //Click
      } else if (this.keyLogger[11].clicked === true) {
        //selectPlaceGroundFly
        this.selectPlaceGroundFly();
      }
    }
  };

  checkSelectedFieldFly = (
    i: number,
    j: number,
    side: string,
    colorSide: string
  ) => {
    //robic potem i dodac do moveFl;yCharacte
    let moveFlag = true;
    if (
      i - (this.selectedCharacter.positionI as number) >
        this.selectedCharacter.moves ||
      -1 * this.selectedCharacter.moves >
        i - (this.selectedCharacter.positionI as number)
    ) {
      moveFlag = false;
    }

    if (
      j - (this.selectedCharacter.positionJ as number) >
        this.selectedCharacter.moves ||
      -1 * this.selectedCharacter.moves >
        j - (this.selectedCharacter.positionJ as number)
    ) {
      moveFlag = false;
    }

    if (document.getElementById("communicate")) {
      const communicateDiv: HTMLHeadingElement = document.getElementById(
        "communicate"
      ) as HTMLHeadingElement;
      communicateDiv.remove();
    }

    if (moveFlag === true) {
      const imgIconElement: HTMLImageElement = document.getElementById(
        `${this.selectedCharacter.id}`
      ) as HTMLImageElement;
      imgIconElement.style.left = `${
        parseInt(imgIconElement.style.left.split("px")[0]) +
        (j - this.temporaryPosition.j) * 50
      }px`;
      imgIconElement.style.top = `${
        parseInt(imgIconElement.style.top.split("px")[0]) +
        (i - this.temporaryPosition.i) * 50
      }px`;
      this.moveCharacterAnimation(
        this.selectedCharacter.type,
        this.selectedCharacter.id,
        side,
        colorSide
      );
      this.temporaryPosition = { i: i, j: j };
    } else {
      const textInfo: HTMLDivElement = document.getElementById(
        "textInfo"
      ) as HTMLDivElement;
      const communicate: HTMLHeadingElement = document.createElement("h2");
      communicate.id = "communicate";
      communicate.innerText = "You have moved your limit";
      textInfo.appendChild(communicate);
      this.cleanMovingAudio(colorSide);
    }
  };

  //Move Ground Characters
  moveGroundCharacters = () => {
    if (this.movingSide === 0) {
      if (this.keyLogger[4].clicked === true) {
        //Click
        this.selectPlaceGroundFly();
      } else if (this.keyLogger[0].clicked === true) {
        //Left
        if (this.temporaryPosition.j > 0) {
          this.checkSelectedFieldGround(
            this.temporaryPosition.i,
            this.temporaryPosition.j - 1,
            "left",
            "Yellow"
          );
        } else {
          this.cleanMovingAudio("Yellow");
        }
        //Up
      } else if (this.keyLogger[1].clicked === true) {
        if (this.temporaryPosition.i > 0) {
          this.checkSelectedFieldGround(
            this.temporaryPosition.i - 1,
            this.temporaryPosition.j,
            "up",
            "Yellow"
          );
        } else {
          this.cleanMovingAudio("Yellow");
        }
        //Right
      } else if (this.keyLogger[2].clicked === true) {
        if (this.temporaryPosition.j < this.playgroundWidth - 1) {
          this.checkSelectedFieldGround(
            this.temporaryPosition.i,
            this.temporaryPosition.j + 1,
            "right",
            "Yellow"
          );
        } else {
          this.cleanMovingAudio("Yellow");
        }
        //Down
      } else if (this.keyLogger[3].clicked === true) {
        if (this.temporaryPosition.i < this.playgroundHeight - 1) {
          this.checkSelectedFieldGround(
            this.temporaryPosition.i + 1,
            this.temporaryPosition.j,
            "down",
            "Yellow"
          );
        } else {
          this.cleanMovingAudio("Yellow");
        }
      }
    } else {
      //Left
      if (this.keyLogger[9].clicked === true) {
        if (this.temporaryPosition.j > 0) {
          this.checkSelectedFieldGround(
            this.temporaryPosition.i,
            this.temporaryPosition.j - 1,
            "left",
            "Blue"
          );
        } else {
          this.cleanMovingAudio("Blue");
        }
        //Up
      } else if (this.keyLogger[6].clicked === true) {
        if (this.temporaryPosition.i > 0) {
          this.checkSelectedFieldGround(
            this.temporaryPosition.i - 1,
            this.temporaryPosition.j,
            "up",
            "Blue"
          );
        } else {
          this.cleanMovingAudio("Blue");
        }
        //Right
      } else if (this.keyLogger[7].clicked === true) {
        if (this.temporaryPosition.j < this.playgroundWidth - 1) {
          this.checkSelectedFieldGround(
            this.temporaryPosition.i,
            this.temporaryPosition.j + 1,
            "right",
            "Blue"
          );
        } else {
          this.cleanMovingAudio("Blue");
        }
        //Down
      } else if (this.keyLogger[8].clicked === true) {
        if (this.temporaryPosition.i < this.playgroundHeight - 1) {
          this.checkSelectedFieldGround(
            this.temporaryPosition.i + 1,
            this.temporaryPosition.j,
            "down",
            "Blue"
          );
        } else {
          this.cleanMovingAudio("Blue");
        }
        //Click
      } else if (this.keyLogger[11].clicked === true) {
        this.selectPlaceGroundFly();
      }
    }
  };

  checkSelectedFieldGround = (
    i: number,
    j: number,
    side: string,
    colorSide: string
  ) => {
    const rightNowSittingField = this.passedFields[0];
    const charactersOnField: Array<number> =
      this.arrayWithPlacesOfCharacters[rightNowSittingField.i][
        rightNowSittingField.j
      ];

    const imgIconElement: HTMLImageElement = document.getElementById(
      `${this.selectedCharacter.id}`
    ) as HTMLImageElement;

    if (
      charactersOnField.length > 0 &&
      charactersOnField[0] !== this.selectedCharacter.id
    ) {
      if (
        JSON.stringify(this.passedFields[1]) === JSON.stringify({ i: i, j: j })
      ) {
        imgIconElement.style.left = `${
          parseInt(imgIconElement.style.left.split("px")[0]) +
          (j - this.temporaryPosition.j) * 50
        }px`;
        imgIconElement.style.top = `${
          parseInt(imgIconElement.style.top.split("px")[0]) +
          (i - this.temporaryPosition.i) * 50
        }px`;
        this.moveCharacterAnimation(
          this.selectedCharacter.type,
          this.selectedCharacter.id,
          side,
          colorSide
        );
        this.executedMoves = this.executedMoves - 1;
        this.passedFields.splice(0, 1);
        this.temporaryPosition = { i: i, j: j };
        return;
      }
      if (document.getElementById("communicate")) {
        const communicateDiv: HTMLHeadingElement = document.getElementById(
          "communicate"
        ) as HTMLHeadingElement;
        communicateDiv.remove();
      }

      const divTextInfo: HTMLDivElement = document.getElementById(
        "textInfo"
      ) as HTMLDivElement;
      const communicateH2: HTMLHeadElement = document.createElement("h2");
      communicateH2.innerText = "Do you challenge this foe?";
      communicateH2.id = "communicate";
      divTextInfo.appendChild(communicateH2);
      return;
    }

    if (this.passedFields.length > 1) {
      if (
        JSON.stringify(this.passedFields[1]) === JSON.stringify({ i: i, j: j })
      ) {
        imgIconElement.style.left = `${
          parseInt(imgIconElement.style.left.split("px")[0]) +
          (j - this.temporaryPosition.j) * 50
        }px`;
        imgIconElement.style.top = `${
          parseInt(imgIconElement.style.top.split("px")[0]) +
          (i - this.temporaryPosition.i) * 50
        }px`;

        this.moveCharacterAnimation(
          this.selectedCharacter.type,
          this.selectedCharacter.id,
          side,
          colorSide
        );
        this.passedFields.splice(0, 1);
        this.executedMoves = this.executedMoves - 1;
        this.temporaryPosition = { i: i, j: j };
        return;
      }
    }
    if (this.arrayWithPlacesOfCharacters[i][j][0] !== undefined) {
      const neiberhoodId: number = this.arrayWithPlacesOfCharacters[i][j][0];
      const neiberhoodCharacterInfo: Character =
        this.arrayWithCurrentInformationsAboutCharacters.filter(
          (info) => info.id === neiberhoodId
        )[0];
      if (
        neiberhoodCharacterInfo.side === this.movingSide &&
        neiberhoodCharacterInfo.id !== this.selectedCharacter.id
      ) {
        if (document.getElementById("communicate")) {
          const communicateDiv: HTMLHeadingElement = document.getElementById(
            "communicate"
          ) as HTMLHeadingElement;
          communicateDiv.remove();
        }

        const communicate: HTMLHeadingElement = document.createElement("h2");
        communicate.id = "communicate";
        communicate.innerHTML = "The square ahead is occupied";
        this.cleanMovingAudio(colorSide);
        this.rootDiv.appendChild(communicate);
        return;
      }
    }
    if (this.executedMoves < this.selectedCharacter.moves) {
      this.moveCharacterAnimation(
        this.selectedCharacter.type,
        this.selectedCharacter.id,
        side,
        colorSide
      );
      imgIconElement.style.left = `${
        parseInt(imgIconElement.style.left.split("px")[0]) +
        (j - this.temporaryPosition.j) * 50
      }px`;
      imgIconElement.style.top = `${
        parseInt(imgIconElement.style.top.split("px")[0]) +
        (i - this.temporaryPosition.i) * 50
      }px`;
      this.executedMoves = this.executedMoves + 1;
      this.temporaryPosition = { i: i, j: j };
      this.passedFields.unshift({ i: i, j: j });
    } else {
      if (document.getElementById("communicate")) {
        const communicateDiv: HTMLHeadingElement = document.getElementById(
          "communicate"
        ) as HTMLHeadingElement;
        communicateDiv.remove();
      }

      const communicate: HTMLHeadingElement = document.createElement("h2");
      communicate.id = "communicate";
      communicate.innerHTML = "You Have moved your limit";
      this.rootDiv.appendChild(communicate);
      this.cleanMovingAudio(colorSide);
    }
  };

  createCursor() {
    const cursor: HTMLDivElement = document.createElement("div");
    cursor.classList.add("cursor");
    cursor.id = "cursor";
    const firstDivField: HTMLDivElement = document.getElementById(
      `0_0`
    ) as HTMLDivElement;

    if (this.movingSide === 0) {
      cursor.style.borderColor = this.sidesColor.yellow;
      this.cursorPosition = { i: 4, j: -3 };
    } else {
      cursor.style.borderColor = this.sidesColor.blue;
      this.cursorPosition = { i: 4, j: 11 };
    }

    this.offsetField = {
      x: firstDivField.offsetLeft,
      y: firstDivField.offsetTop,
    };

    cursor.style.top = `${
      this.offsetField.y - 10 + this.cursorPosition.i * 50
    }px`;
    cursor.style.left = `${
      this.offsetField.x - 10 + this.cursorPosition.j * 50
    }px`;

    if (this.computerSide !== this.movingSide) {
      window.onkeydown = () => {
        this.changeKeyPositions(
          event as KeyboardEvent,
          true,
          "cursor",
          false,
          0
        );
      };

      window.onkeyup = () => {
        this.changeKeyPositions(
          event as KeyboardEvent,
          false,
          "cursor",
          false,
          0
        );
      };
    } else {
      this.startMovingByComputer();
    }

    this.rootDiv.appendChild(cursor);
  }

  changeKeyPositions(
    e: KeyboardEvent,
    value: boolean,
    target: string,
    useMagic: boolean,
    whichTime: number
  ) {
    if (e.code === "ArrowLeft" && this.computerSide !== 0) {
      this.keyLogger = this.keyLogger.map((key) =>
        key.key === e.code
          ? { ...key, clicked: value }
          : { ...key, clicked: key.clicked }
      );
    } else if (e.code === "ArrowUp" && this.computerSide !== 0) {
      this.keyLogger = this.keyLogger.map((key) =>
        key.key === e.code
          ? { ...key, clicked: value }
          : { ...key, clicked: key.clicked }
      );
    } else if (e.code === "ArrowRight" && this.computerSide !== 0) {
      this.keyLogger = this.keyLogger.map((key) =>
        key.key === e.code
          ? { ...key, clicked: value }
          : { ...key, clicked: key.clicked }
      );
    } else if (e.code === "ArrowDown" && this.computerSide !== 0) {
      this.keyLogger = this.keyLogger.map((key) =>
        key.key === e.code
          ? { ...key, clicked: value }
          : { ...key, clicked: key.clicked }
      );
    } else if (e.code === "Slash" && this.computerSide !== 0) {
      this.keyLogger = this.keyLogger.map((key) =>
        key.key === e.code
          ? { ...key, clicked: value }
          : { ...key, clicked: key.clicked }
      );
    } else if (e.code === "AltRight" && this.computerSide !== 0) {
      this.keyLogger = this.keyLogger.map((key) =>
        key.key === e.code
          ? { ...key, clicked: value }
          : { ...key, clicked: key.clicked }
      );
    } else if (e.code === "KeyA" && this.computerSide !== 1) {
      this.keyLogger = this.keyLogger.map((key) =>
        key.key === e.code
          ? { ...key, clicked: value }
          : { ...key, clicked: key.clicked }
      );
    } else if (e.code === "KeyW" && this.computerSide !== 1) {
      this.keyLogger = this.keyLogger.map((key) =>
        key.key === e.code
          ? { ...key, clicked: value }
          : { ...key, clicked: key.clicked }
      );
    } else if (e.code === "KeyD" && this.computerSide !== 1) {
      this.keyLogger = this.keyLogger.map((key) =>
        key.key === e.code
          ? { ...key, clicked: value }
          : { ...key, clicked: key.clicked }
      );
    } else if (e.code === "KeyS" && this.computerSide !== 1) {
      this.keyLogger = this.keyLogger.map((key) =>
        key.key === e.code
          ? { ...key, clicked: value }
          : { ...key, clicked: key.clicked }
      );
    } else if (e.code === "KeyC" && this.computerSide !== 1) {
      this.keyLogger = this.keyLogger.map((key) =>
        key.key === e.code
          ? { ...key, clicked: value }
          : { ...key, clicked: key.clicked }
      );
    } else if (e.code === "KeyZ" && this.computerSide !== 1) {
      this.keyLogger = this.keyLogger.map((key) =>
        key.key === e.code
          ? { ...key, clicked: value }
          : { ...key, clicked: key.clicked }
      );
    }

    if (e.repeat === false) {
      if (target === "cursor" && this.movingSide !== this.computerSide) {
        for (let i = 0; i < this.intervalsIds.length; i++) {
          if (
            this.intervalsIds[i].name === "moveCursorInterval" ||
            this.intervalsIds[i].name === "iconsActions"
          ) {
            clearInterval(this.intervalsIds[i].id);
          }
        }
        this.intervalsIds = this.intervalsIds.filter(
          (id) => id.name !== "moveCursorInterval"
        );

        const moveCursorInterval = setInterval(() => {
          this.cursorActions(useMagic, whichTime);
        }, 200);

        this.intervalsIds.push({
          name: "moveCursorInterval",
          id: moveCursorInterval,
        });
        this.cursorActions(useMagic, whichTime);
      } else if (target === "icon" && this.movingSide !== this.computerSide) {
        if (document.getElementById("communicate") && value === true) {
          const communicateDiv: HTMLHeadingElement = document.getElementById(
            "communicate"
          ) as HTMLHeadingElement;
          communicateDiv.remove();
        }

        for (let i = 0; i < this.intervalsIds.length; i++) {
          if (
            this.intervalsIds[i].name === "moveCursorInterval" ||
            this.intervalsIds[i].name === "iconsActions"
          ) {
            clearInterval(this.intervalsIds[i].id);
          }
        }
        this.intervalsIds = this.intervalsIds.filter(
          (id) => id.name !== "iconsActions"
        );

        const iconsActionsInterval = setInterval(() => {
          this.iconsActions();
        }, 200);

        this.intervalsIds.push({
          name: "iconsActions",
          id: iconsActionsInterval,
        });

        this.iconsActions();
      } else if (target === "fight") {
        // console.log(          this.intervalsIds.filter(
        //   (ele) => ele.name === "fightingIntervalsBlue"
        // ).length === 0)
        // console.log(          this.intervalsIds.filter(
        //   (ele) => ele.name === "fightingIntervalsYellow"
        // ).length === 0)
        // console.log()
        // console.log()
        if (
          this.intervalsIds.filter(
            (ele) => ele.name === "fightingIntervalsBlue"
          ).length === 0 &&
          this.intervalsIds.filter(
            (ele) => ele.name === "fightingIntervalsYellow"
          ).length === 0 &&
          (!document.getElementById(`bulletyellow`) ||
            this.computerSide === 0) &&
          (!document.getElementById(`bulletblue`) || this.computerSide === 1) &&
          this.endBattleFlag === false
        ) {
          console.log("fight po if");
          if (this.computerSide !== 0) {
            const fightingIntervalYellow = setInterval(() => {
              this.fightMoving("yellow");
            }, 50 / this.fightingCharactersInformations.yellow.speed);

            this.intervalsIds.push({
              name: "fightingIntervalsYellow",
              id: fightingIntervalYellow,
            });
          }

          if (this.computerSide !== 1) {
            const fightingIntervalBlue = setInterval(() => {
              this.fightMoving("blue");
            }, 50 / this.fightingCharactersInformations.blue.speed);

            this.intervalsIds.push({
              name: "fightingIntervalsBlue",
              id: fightingIntervalBlue,
            });
          }
        }
      } else if (
        (target === "revive" || target === "summonElemental") &&
        this.movingSide !== this.computerSide
      ) {
        console.log("wchodzi w revive");
        if (document.getElementById("communicate") && value === true) {
          const communicateDiv: HTMLHeadingElement = document.getElementById(
            "communicate"
          ) as HTMLHeadingElement;
          communicateDiv.remove();
        }

        for (let i = 0; i < this.intervalsIds.length; i++) {
          if (
            this.intervalsIds[i].name === "actionMagicCharacter" ||
            this.intervalsIds[i].name === "iconsActions"
          ) {
            clearInterval(this.intervalsIds[i].id);
          }
        }
        this.intervalsIds = this.intervalsIds.filter(
          (id) => id.name !== "iconsActions"
        );

        const actionMagicCharacterInterval = setInterval(() => {
          this.actionMagicCharacter(target);
        }, 200);

        this.intervalsIds.push({
          name: "actionMagicCharacter",
          id: actionMagicCharacterInterval,
        });

        this.actionMagicCharacter(target);
      }
    }
  }

  //moveRevievCharacter
  actionMagicCharacter(target: string) {
    if (
      this.keyLogger[0].clicked === false &&
      this.keyLogger[1].clicked === false &&
      this.keyLogger[2].clicked === false &&
      this.keyLogger[3].clicked === false
    ) {
      this.cleanMovingAudio("Yellow");
    }

    if (
      this.keyLogger[6].clicked === false &&
      this.keyLogger[7].clicked === false &&
      this.keyLogger[8].clicked === false &&
      this.keyLogger[9].clicked === false
    ) {
      this.cleanMovingAudio("Blue");
    }

    this.moveMagicCharacter(target);
  }

  moveActionMagicCharacter = (
    i: number,
    j: number,
    side: string,
    colorSide: string
  ) => {
    console.log(this.magicCharacter);
    const imgIconElement: HTMLImageElement = document.getElementById(
      `${this.magicCharacter.id}`
    ) as HTMLImageElement;
    imgIconElement.style.left = `${
      parseInt(imgIconElement.style.left.split("px")[0]) +
      (j - this.temporaryPosition.j) * 50
    }px`;
    imgIconElement.style.top = `${
      parseInt(imgIconElement.style.top.split("px")[0]) +
      (i - this.temporaryPosition.i) * 50
    }px`;
    this.moveCharacterAnimation(
      this.magicCharacter.type,
      this.magicCharacter.id,
      side,
      colorSide
    );
    this.temporaryPosition = { i: i, j: j };
  };

  checkSelectedFieldRevive = () => {
    console.log(this.temporaryPosition);
    console.log(this.arrayWithPassedFields);
    console.log(this.magicCharacter);
    let charmedSquareFlag = false;

    let powerPointFlag = false;
    this.powerPointsPositions.forEach((ele) => {
      if (
        ele.i === this.temporaryPosition.i &&
        ele.j === this.temporaryPosition.j
      ) {
        powerPointFlag = true;
      }
    });

    if (powerPointFlag !== false) {
      window.onkeydown = () => {};
      window.onkeyup = () => {};

      const bodyText = document.getElementById(
        "bodyText"
      ) as HTMLHeadingElement;
      bodyText.innerText = "Power points are proof against magic";

      setTimeout(() => {
        window.onkeydown = () => {
          this.changeKeyPositions(
            event as KeyboardEvent,
            true,
            "revive",
            false,
            0
          );
        };

        window.onkeyup = () => {
          this.changeKeyPositions(
            event as KeyboardEvent,
            false,
            "revive",
            false,
            0
          );
        };
      }, 1000);
    }

    this.arrayWithPassedFields.forEach((ele) => {
      if (
        ele.i === this.temporaryPosition.i &&
        ele.j === this.temporaryPosition.j
      ) {
        charmedSquareFlag = true;
      }
    });

    if (charmedSquareFlag !== false && powerPointFlag === false) {
      window.onkeydown = () => {};
      window.onkeyup = () => {};
      this.keyLogger = this.keyLogger.map((ele) => ({
        ...ele,
        clicked: false,
      }));

      const characterImg = document.getElementById(
        `${this.magicCharacter.id}`
      ) as HTMLImageElement;
      characterImg.src = `./src/src/${this.magicCharacter.type}/logo.png`;

      this.arrayWithPlacesOfCharacters[this.temporaryPosition.i][
        this.temporaryPosition.j
      ] = [this.magicCharacter.id];

      let temporaryArr =
        this.arrayWithCurrentInformationsAboutCharacters.filter(
          (ele) => ele.id !== this.magicCharacter.id
        );
      const newCharacter = this.arrayWithInformationsAboutCharakters.filter(
        (ele) => ele.id === this.magicCharacter.id
      )[0];
      newCharacter.positionI = this.temporaryPosition.i;
      newCharacter.positionJ = this.temporaryPosition.j;
      temporaryArr.push(newCharacter);
      this.arrayWithCurrentInformationsAboutCharacters = temporaryArr;
      this.usedSpell("Revive");
      this.endRound();
    }
  };

  checkSelectedFieldSummonElemental = () => {
    if (
      this.temporaryPosition.i > -1 &&
      this.temporaryPosition.i < 9 &&
      this.temporaryPosition.j > -1 &&
      this.temporaryPosition.j < 9
    ) {
      const arrayWithCharactersOnSelectedField =
        this.arrayWithPlacesOfCharacters[this.temporaryPosition.i][
          this.temporaryPosition.j
        ];
      if (arrayWithCharactersOnSelectedField.length === 1) {
        if (
          this.arrayWithCurrentInformationsAboutCharacters.filter(
            (ele) => ele.id === arrayWithCharactersOnSelectedField[0]
          )[0].side !== this.movingSide
        ) {
          this.arrayWithPlacesOfCharacters[this.temporaryPosition.i][
            this.temporaryPosition.j
          ].push(this.magicCharacter.id);
          this.arrayWithCurrentInformationsAboutCharacters =
            this.arrayWithCurrentInformationsAboutCharacters.map((info) =>
              info.id === this.magicCharacter.id
                ? {
                    ...info,
                    positionI: this.temporaryPosition.i,
                    positionJ: this.temporaryPosition.j,
                  }
                : info
            );
          this.usedSpell("Summon Elemental");
          this.startBattle(this.temporaryPosition.i, this.temporaryPosition.j);
        }
      }
    }
  };

  moveMagicCharacter = (target: string) => {
    if (this.movingSide === 0) {
      if (
        //Left-Up
        this.keyLogger[0].clicked === true &&
        this.keyLogger[1].clicked === true
      ) {
        if (this.temporaryPosition.j > 0 && this.temporaryPosition.i > 0) {
          this.moveActionMagicCharacter(
            this.temporaryPosition.i - 1,
            this.temporaryPosition.j - 1,
            "left",
            "Yellow"
          );
        } else {
          this.cleanMovingAudio("Yellow");
        }
      } else if (
        //Left-Down
        this.keyLogger[0].clicked === true &&
        this.keyLogger[3].clicked === true
      ) {
        if (
          this.temporaryPosition.j > 0 &&
          this.temporaryPosition.i < this.playgroundHeight - 1
        ) {
          this.moveActionMagicCharacter(
            this.temporaryPosition.i + 1,
            this.temporaryPosition.j - 1,
            "left",
            "Yellow"
          );
        } else {
          this.cleanMovingAudio("Yellow");
        }
      } else if (
        //Right-Up
        this.keyLogger[2].clicked === true &&
        this.keyLogger[1].clicked === true
      ) {
        if (
          this.temporaryPosition.j < this.playgroundWidth - 1 &&
          this.temporaryPosition.i > 0
        ) {
          this.moveActionMagicCharacter(
            this.temporaryPosition.i - 1,
            this.temporaryPosition.j + 1,
            "right",
            "Yellow"
          );
        } else {
          this.cleanMovingAudio("Yellow");
        }
      } else if (
        //Right-Down
        this.keyLogger[2].clicked === true &&
        this.keyLogger[3].clicked === true
      ) {
        if (
          this.temporaryPosition.j < this.playgroundWidth - 1 &&
          this.temporaryPosition.i < this.playgroundHeight - 1
        ) {
          this.moveActionMagicCharacter(
            this.temporaryPosition.i + 1,
            this.temporaryPosition.j + 1,
            "right",
            "Yellow"
          );
        } else {
          this.cleanMovingAudio("Yellow");
        }
        //Left
      } else if (this.keyLogger[0].clicked === true) {
        if (this.temporaryPosition.j > 0) {
          this.moveActionMagicCharacter(
            this.temporaryPosition.i,
            this.temporaryPosition.j - 1,
            "left",
            "Yellow"
          );
        } else {
          this.cleanMovingAudio("Yellow");
        }
        //Up
      } else if (this.keyLogger[1].clicked === true) {
        if (this.temporaryPosition.i > 0) {
          this.moveActionMagicCharacter(
            this.temporaryPosition.i - 1,
            this.temporaryPosition.j,
            "up",
            "Yellow"
          );
        } else {
          this.cleanMovingAudio("Yellow");
        }
        //Right
      } else if (this.keyLogger[2].clicked === true) {
        if (this.temporaryPosition.j < this.playgroundWidth - 1) {
          this.moveActionMagicCharacter(
            this.temporaryPosition.i,
            this.temporaryPosition.j + 1,
            "right",
            "Yellow"
          );
        } else {
          this.cleanMovingAudio("Yellow");
        }
        //Down
      } else if (this.keyLogger[3].clicked === true) {
        if (this.temporaryPosition.i < this.playgroundHeight - 1) {
          this.moveActionMagicCharacter(
            this.temporaryPosition.i + 1,
            this.temporaryPosition.j,
            "down",
            "Yellow"
          );
        } else {
          this.cleanMovingAudio("Yellow");
        }
        //Click
      } else if (this.keyLogger[4].clicked === true) {
        if (target === "summonElemental") {
          this.checkSelectedFieldSummonElemental();
        } else {
          this.checkSelectedFieldRevive();
        }
      }
    } else {
      if (
        //Up-Left
        this.keyLogger[6].clicked === true &&
        this.keyLogger[9].clicked === true
      ) {
        if (this.temporaryPosition.j > 0 && this.temporaryPosition.i > 0) {
          this.moveActionMagicCharacter(
            this.temporaryPosition.i - 1,
            this.temporaryPosition.j - 1,
            "left",
            "Blue"
          );
        } else {
          this.cleanMovingAudio("Blue");
        }
      } else if (
        //Down-Left
        this.keyLogger[8].clicked === true &&
        this.keyLogger[9].clicked === true
      ) {
        if (
          this.temporaryPosition.j > 0 &&
          this.temporaryPosition.i < this.playgroundHeight - 1
        ) {
          this.moveActionMagicCharacter(
            this.temporaryPosition.i + 1,
            this.temporaryPosition.j - 1,
            "left",
            "Blue"
          );
        } else {
          this.cleanMovingAudio("Blue");
        }
      } else if (
        //Up-Right
        this.keyLogger[6].clicked === true &&
        this.keyLogger[7].clicked === true
      ) {
        if (
          this.temporaryPosition.j < this.playgroundWidth - 1 &&
          this.temporaryPosition.i > 0
        ) {
          this.moveActionMagicCharacter(
            this.temporaryPosition.i - 1,
            this.temporaryPosition.j + 1,
            "right",
            "Blue"
          );
        } else {
          this.cleanMovingAudio("Blue");
        }
      } else if (
        //Down-Right
        this.keyLogger[8].clicked === true &&
        this.keyLogger[7].clicked === true
      ) {
        if (
          this.temporaryPosition.j < this.playgroundWidth - 1 &&
          this.temporaryPosition.i < this.playgroundHeight - 1
        ) {
          this.moveActionMagicCharacter(
            this.temporaryPosition.i + 1,
            this.temporaryPosition.j + 1,
            "right",
            "Blue"
          );
        } else {
          this.cleanMovingAudio("Blue");
        }
        //Left
      } else if (this.keyLogger[9].clicked === true) {
        if (this.temporaryPosition.j > 0) {
          this.moveActionMagicCharacter(
            this.temporaryPosition.i,
            this.temporaryPosition.j - 1,
            "left",
            "Blue"
          );
        } else {
          this.cleanMovingAudio("Blue");
        }
        //Up
      } else if (this.keyLogger[6].clicked === true) {
        if (this.temporaryPosition.i > 0) {
          this.moveActionMagicCharacter(
            this.temporaryPosition.i - 1,
            this.temporaryPosition.j,
            "up",
            "Blue"
          );
        } else {
          this.cleanMovingAudio("Blue");
        }
        //Right
      } else if (this.keyLogger[7].clicked === true) {
        if (this.temporaryPosition.j < this.playgroundWidth - 1) {
          this.moveActionMagicCharacter(
            this.temporaryPosition.i,
            this.temporaryPosition.j + 1,
            "right",
            "Blue"
          );
        } else {
          this.cleanMovingAudio("Blue");
        }
        //Down
      } else if (this.keyLogger[8].clicked === true) {
        if (this.temporaryPosition.i < this.playgroundHeight - 1) {
          this.moveActionMagicCharacter(
            this.temporaryPosition.i + 1,
            this.temporaryPosition.j,
            "down",
            "Blue"
          );
        } else {
          this.cleanMovingAudio("Blue");
        }
        //Click
      } else if (this.keyLogger[11].clicked === true) {
        if (target === "summonElemental") {
          this.checkSelectedFieldSummonElemental();
        } else {
          this.checkSelectedFieldRevive();
        }
      }
    }
  };

  cursorActions(useMagic: boolean, whichTime: number) {
    if (this.movingSide === 0) {
      if (
        //Left-Up
        this.keyLogger[0].clicked === true &&
        this.keyLogger[1].clicked === true
      ) {
        if (this.cursorPosition.j > 0 && this.cursorPosition.i > 0) {
          this.cursorPosition = {
            i: this.cursorPosition.i - 1,
            j: this.cursorPosition.j - 1,
          };
        }
      } else if (
        //Left-Down
        this.keyLogger[0].clicked === true &&
        this.keyLogger[3].clicked === true
      ) {
        if (
          this.cursorPosition.j > 0 &&
          this.cursorPosition.i < this.playgroundHeight - 1
        ) {
          this.cursorPosition = {
            i: this.cursorPosition.i + 1,
            j: this.cursorPosition.j - 1,
          };
        }
        //
      } else if (
        //Right-Up
        this.keyLogger[2].clicked === true &&
        this.keyLogger[1].clicked === true
      ) {
        if (
          this.cursorPosition.j < this.playgroundWidth - 1 &&
          this.cursorPosition.i > 0
        ) {
          this.cursorPosition = {
            i: this.cursorPosition.i - 1,
            j: this.cursorPosition.j + 1,
          };
        }
      } else if (
        //Right-Down
        this.keyLogger[2].clicked === true &&
        this.keyLogger[3].clicked === true
      ) {
        if (
          this.cursorPosition.j < this.playgroundWidth - 1 &&
          this.cursorPosition.i < this.playgroundHeight - 1
        ) {
          this.cursorPosition = {
            i: this.cursorPosition.i + 1,
            j: this.cursorPosition.j + 1,
          };
        }
        //Left
      } else if (this.keyLogger[0].clicked === true) {
        if (this.cursorPosition.j > 0) {
          this.cursorPosition = {
            i: this.cursorPosition.i,
            j: this.cursorPosition.j - 1,
          };
        }
        //Up
      } else if (this.keyLogger[1].clicked === true) {
        if (this.cursorPosition.i > 0) {
          this.cursorPosition = {
            i: this.cursorPosition.i - 1,
            j: this.cursorPosition.j,
          };
        }
        //Right
      } else if (this.keyLogger[2].clicked === true) {
        if (this.cursorPosition.j < this.playgroundWidth - 1) {
          this.cursorPosition = {
            i: this.cursorPosition.i,
            j: this.cursorPosition.j + 1,
          };
        }
        //Down
      } else if (this.keyLogger[3].clicked === true) {
        if (this.cursorPosition.i < this.playgroundHeight - 1) {
          this.cursorPosition = {
            i: this.cursorPosition.i + 1,
            j: this.cursorPosition.j,
          };
        }
        //Click
      } else if (this.keyLogger[4].clicked === true) {
        if (useMagic === false) {
          this.clickCursor();
        } else {
          this.currentCharacterSpellsInfo.spellsArray[
            this.currentCharacterSpellsInfo.index
          ].function(whichTime);
        }
      }
    } else {
      if (
        //Up-Left
        this.keyLogger[6].clicked === true &&
        this.keyLogger[9].clicked === true
      ) {
        if (this.cursorPosition.j > 0 && this.cursorPosition.i > 0) {
          this.cursorPosition = {
            i: this.cursorPosition.i - 1,
            j: this.cursorPosition.j - 1,
          };
        }
      } else if (
        //Down-Left
        this.keyLogger[8].clicked === true &&
        this.keyLogger[9].clicked === true
      ) {
        if (
          this.cursorPosition.j > 0 &&
          this.cursorPosition.i < this.playgroundHeight - 1
        ) {
          this.cursorPosition = {
            i: this.cursorPosition.i + 1,
            j: this.cursorPosition.j - 1,
          };
        }
      } else if (
        //Up-Right
        this.keyLogger[6].clicked === true &&
        this.keyLogger[7].clicked === true
      ) {
        if (
          this.cursorPosition.j < this.playgroundWidth - 1 &&
          this.cursorPosition.i > 0
        ) {
          this.cursorPosition = {
            i: this.cursorPosition.i - 1,
            j: this.cursorPosition.j + 1,
          };
        }
      } else if (
        //Down-Right
        this.keyLogger[8].clicked === true &&
        this.keyLogger[7].clicked === true
      ) {
        if (
          this.cursorPosition.j < this.playgroundWidth - 1 &&
          this.cursorPosition.i < this.playgroundHeight - 1
        ) {
          this.cursorPosition = {
            i: this.cursorPosition.i + 1,
            j: this.cursorPosition.j + 1,
          };
        }
        //Left
      } else if (this.keyLogger[9].clicked === true) {
        if (this.cursorPosition.j > 0) {
          this.cursorPosition = {
            i: this.cursorPosition.i,
            j: this.cursorPosition.j - 1,
          };
        }
        //Up
      } else if (this.keyLogger[6].clicked === true) {
        if (this.cursorPosition.i > 0) {
          this.cursorPosition = {
            i: this.cursorPosition.i - 1,
            j: this.cursorPosition.j,
          };
        }
        //Right
      } else if (this.keyLogger[7].clicked === true) {
        if (this.cursorPosition.j < this.playgroundWidth - 1) {
          this.cursorPosition = {
            i: this.cursorPosition.i,
            j: this.cursorPosition.j + 1,
          };
        }
        //Down
      } else if (this.keyLogger[8].clicked === true) {
        if (this.cursorPosition.i < this.playgroundHeight - 1) {
          this.cursorPosition = {
            i: this.cursorPosition.i + 1,
            j: this.cursorPosition.j,
          };
        }
        //Click
      } else if (this.keyLogger[11].clicked === true) {
        if (useMagic === false) {
          this.clickCursor();
        } else {
          this.currentCharacterSpellsInfo.spellsArray[
            this.currentCharacterSpellsInfo.index
          ].function(whichTime);
        }
      }
    }
    const divCursor: HTMLDivElement = document.getElementById(
      "cursor"
    ) as HTMLDivElement;
    divCursor.style.top = `${
      this.offsetField.y - 10 + this.cursorPosition.i * 50
    }px`;
    divCursor.style.left = `${
      this.offsetField.x - 10 + this.cursorPosition.j * 50
    }px`;
  }

  //side:
  //right
  //left
  //up
  //down

  //colorSide:
  //Yellow
  //Blue
  moveCharacterAnimation(
    characterType: string,
    id: number,
    side: string,
    colorSide: string
  ) {
    //const colorSide = "Yellow";
    for (let i = 0; i < this.intervalsIds.length; i++) {
      if (this.intervalsIds[i].name === "moveTimeout") {
        clearTimeout(this.intervalsIds[i].id);
      }
    }
    this.intervalsIds = this.intervalsIds.filter(
      (inter) => inter.name !== "moveTimeout"
    );

    const arrayWithPlayingAudio: Array<AudioInformation> =
      this.audioArray.filter((ele) => ele.name === `walk${colorSide}`);

    if (arrayWithPlayingAudio.length === 0) {
      const audio: HTMLAudioElement = new Audio(
        `./src/src/${characterType}/walk.wav`
      );
      audio.loop = true;
      audio.play();
      this.audioArray.push({ name: `walk${colorSide}`, htmlElement: audio });
    }

    const img: HTMLImageElement = document.getElementById(
      `${id}`
    ) as HTMLImageElement;
    img.src = `./src/src/${characterType}/${side}_0.png`;

    const timeout1 = setTimeout(() => {
      img.src = `./src/src/${characterType}/${side}_1.png`;
    }, 50);

    const timeout2 = setTimeout(() => {
      if (side === "down" || side === "up") {
        img.src = `./src/src/${characterType}/${side}_0.png`;
      } else {
        img.src = `./src/src/${characterType}/${side}_2.png`;
      }
    }, 100);

    const timeout3 = setTimeout(() => {
      if (side === "down" || side === "up") {
        img.src = `./src/src/${characterType}/${side}_2.png`;
      } else {
        img.src = `./src/src/${characterType}/${side}_3.png`;
      }
    }, 150);

    const timeout4 = setTimeout(() => {
      img.src = `./src/src/${characterType}/${side}_0.png`;
    }, 200);

    this.intervalsIds.push({
      id: timeout1,
      name: "moveTimeout",
    });

    this.intervalsIds.push({
      id: timeout2,
      name: "moveTimeout",
    });

    this.intervalsIds.push({
      id: timeout3,
      name: "moveTimeout",
    });

    this.intervalsIds.push({
      id: timeout4,
      name: "moveTimeout",
    });
  }

  renderCharactersOnPlayground() {
    const firstFieldDiv: HTMLDivElement = document.getElementById(
      `0_0`
    ) as HTMLDivElement;

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
            this.yellowCharactersIds.push(informationsAboutCharacter.id);
          } else {
            this.blueCharactersIds.push(informationsAboutCharacter.id);
          }
          this.arrayWithCurrentInformationsAboutCharacters =
            this.arrayWithCurrentInformationsAboutCharacters.map((info) =>
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
  }

  renderPlayground() {
    const playground: HTMLDivElement = document.createElement("div");
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
          this.arrayWithColorsOfFields[i][j] = "F";
          createFieldDiv.classList.add("fieldF");
          this.darkFiledsPositions.push({ i: i, j: j });
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
          this.arrayWithColorsOfFields[i][j] = "A";
          createFieldDiv.classList.add("fieldA");
          this.lightFiledsPositions.push({ i: i, j: j });
        } else {
          this.arrayWithChangingColorFields.push(createFieldDiv);
          this.changingFieldsPosition.push({ i: i, j: j });
          if (this.startingSide === 0) {
            this.arrayWithColorsOfFields[i][j] = "D";
            createFieldDiv.classList.add("fieldD");
            this.sideOfChangingColor = 1;
            this.colorsChangingArrayIndex = 3;
          } else {
            this.arrayWithColorsOfFields[i][j] = "C";
            createFieldDiv.classList.add("fieldC");
            this.sideOfChangingColor = -1;
            this.colorsChangingArrayIndex = 2;
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
  }

  //Random int number from range
  getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  readonly arrayWithInformationsAboutCharakters: Array<Character> = [
    {
      id: 1,
      type: "Knight",
      moves: 3,
      typeOfMoves: "Ground",
      HP: 4.5,
      speed: 1,
      attackPower: 5,
      attackRate: 1.5,
      photo: "./src/src/Knight.png",
      horizontalWidthAttack: 2,
      verticalWidthAttack: 4,
      side: 0,
    },
    {
      id: 2,
      type: "Knight",
      moves: 3,
      typeOfMoves: "Ground",
      HP: 4.5,
      speed: 1,
      attackPower: 5,
      attackRate: 1.5,
      photo: "./src/src/Knight.png",
      horizontalWidthAttack: 2,
      verticalWidthAttack: 4,
      side: 0,
    },
    {
      id: 3,
      type: "Knight",
      moves: 3,
      typeOfMoves: "Ground",
      HP: 4.5,
      speed: 1,
      attackPower: 5,
      attackRate: 1.5,
      photo: "./src/src/Knight.png",
      horizontalWidthAttack: 2,
      verticalWidthAttack: 4,
      side: 0,
    },
    {
      id: 4,
      type: "Knight",
      moves: 3,
      typeOfMoves: "Ground",
      HP: 4.5,
      speed: 1,
      attackPower: 5,
      attackRate: 1.5,
      photo: "./src/src/Knight.png",
      horizontalWidthAttack: 2,
      verticalWidthAttack: 4,
      side: 0,
    },
    {
      id: 5,
      type: "Knight",
      moves: 3,
      typeOfMoves: "Ground",
      HP: 4.5,
      speed: 1,
      attackPower: 5,
      attackRate: 1.5,
      photo: "./src/src/Knight.png",
      horizontalWidthAttack: 2,
      verticalWidthAttack: 4,
      side: 0,
    },
    {
      id: 6,
      type: "Knight",
      moves: 3,
      typeOfMoves: "Ground",
      HP: 4.5,
      speed: 1,
      attackPower: 5,
      attackRate: 1.5,
      photo: "./src/src/Knight.png",
      horizontalWidthAttack: 2,
      verticalWidthAttack: 4,
      side: 0,
    },
    {
      id: 7,
      type: "Knight",
      moves: 3,
      typeOfMoves: "Ground",
      HP: 4.5,
      speed: 1,
      attackPower: 5,
      attackRate: 1.5,
      photo: "./src/src/Knight.png",
      horizontalWidthAttack: 2,
      verticalWidthAttack: 4,
      side: 0,
    },

    {
      id: 8,
      type: "Archer",
      moves: 3,
      typeOfMoves: "Ground",
      HP: 4.5,
      speed: 1,
      attackPower: 5,
      shotSpeed: 7 / 10,
      attackRate: 3 / 4,
      horizontalWidthAttack: 1,
      verticalWidthAttack: 2,
      photo: "./src/src/Archer.png",
      side: 0,
    },

    {
      id: 9,
      type: "Archer",
      moves: 3,
      typeOfMoves: "Ground",
      HP: 4.5,
      speed: 1,
      attackPower: 5,
      shotSpeed: 7 / 10,
      attackRate: 3 / 4,
      horizontalWidthAttack: 1,
      verticalWidthAttack: 2,
      photo: "./src/src/Archer.png",
      side: 0,
    },

    {
      id: 10,
      type: "Valkyrie",
      moves: 3,
      typeOfMoves: "Fly",
      HP: 7.5,
      speed: 1,
      attackPower: 7,
      shotSpeed: 1 / 2,
      attackRate: 3 / 4,
      horizontalWidthAttack: 1,
      verticalWidthAttack: 4,
      photo: "./src/src/Valkyrie.png",
      side: 0,
    },

    {
      id: 11,
      type: "Valkyrie",
      moves: 3,
      typeOfMoves: "Fly",
      HP: 7.5,
      speed: 1,
      attackPower: 7,
      shotSpeed: 1 / 2,
      attackRate: 3 / 4,
      horizontalWidthAttack: 1,
      verticalWidthAttack: 4,
      photo: "./src/src/Valkyrie.png",
      side: 0,
    },

    {
      id: 12,
      type: "Golem",
      moves: 3,
      typeOfMoves: "Ground",
      HP: 14.5,
      speed: 75 / 100,
      attackPower: 10,
      shotSpeed: 1 / 2,
      attackRate: 3 / 5,
      horizontalWidthAttack: 8,
      verticalWidthAttack: 12,
      photo: "./src/src/Golem.png",
      side: 0,
    },
    {
      id: 13,
      type: "Golem",
      moves: 3,
      typeOfMoves: "Ground",
      HP: 14.5,
      speed: 75 / 100,
      attackPower: 10,
      shotSpeed: 1 / 2,
      attackRate: 3 / 5,
      horizontalWidthAttack: 8,
      verticalWidthAttack: 12,
      photo: "./src/src/Golem.png",
      side: 0,
    },

    {
      id: 14,
      type: "Unicorn",
      moves: 4,
      typeOfMoves: "Ground",
      HP: 8.5,
      speed: 1,
      attackPower: 7,
      shotSpeed: 1,
      attackRate: 1,
      horizontalWidthAttack: 1,
      verticalWidthAttack: 2,
      photo: "./src/src/Unicorn.png",
      side: 0,
    },

    {
      id: 15,
      type: "Unicorn",
      moves: 4,
      typeOfMoves: "Ground",
      HP: 8.5,
      speed: 1,
      attackPower: 7,
      shotSpeed: 1,
      attackRate: 1,
      horizontalWidthAttack: 1,
      verticalWidthAttack: 2,
      photo: "./src/src/Unicorn.png",
      side: 0,
    },

    {
      id: 16,
      type: "Phoenix",
      moves: 5,
      typeOfMoves: "Fly",
      HP: 11.5,
      speed: 1,
      attackPower: 2,
      attackRate: 3 / 5,
      horizontalWidthAttack: 64,
      verticalWidthAttack: 32,
      photo: "./src/src/Phoenix.png",
      side: 0,
    },
    {
      id: 17,
      type: "Djinn",
      moves: 4,
      typeOfMoves: "Fly",
      HP: 14.5,
      speed: 1,
      attackPower: 6,
      shotSpeed: 8 / 10,
      attackRate: 2 / 3,
      horizontalWidthAttack: 7,
      horizontalMinWidth: 5,
      verticalWidthAttack: 8,
      photo: "./src/src/Djinni.png",
      side: 0,
    },
    {
      id: 18,
      type: "Wizard",
      moves: 3,
      typeOfMoves: "Teleport",
      HP: 9.5,
      speed: 1,
      attackPower: 10,
      shotSpeed: 8 / 10,
      attackRate: 3 / 4,
      horizontalWidthAttack: 6,
      verticalMinWidth: 8,
      verticalWidthAttack: 12,
      photo: "./src/src/Wizard.png",
      side: 0,
    },

    {
      id: 19,
      type: "Goblin",
      moves: 3,
      typeOfMoves: "Ground",
      HP: 4.5,
      speed: 1,
      attackPower: 5,
      attackRate: 3 / 2,
      horizontalWidthAttack: 2,
      verticalWidthAttack: 4,
      photo: "./src/src/Goblin.png",
      side: 1,
    },

    {
      id: 20,
      type: "Goblin",
      moves: 3,
      typeOfMoves: "Ground",
      HP: 4.5,
      speed: 1,
      attackPower: 5,
      attackRate: 3 / 2,
      horizontalWidthAttack: 2,
      verticalWidthAttack: 4,
      photo: "./src/src/Goblin.png",
      side: 1,
    },

    {
      id: 21,
      type: "Goblin",
      moves: 3,
      typeOfMoves: "Ground",
      HP: 4.5,
      speed: 1,
      attackPower: 5,
      attackRate: 3 / 2,
      horizontalWidthAttack: 2,
      verticalWidthAttack: 4,
      photo: "./src/src/Goblin.png",
      side: 1,
    },

    {
      id: 22,
      type: "Goblin",
      moves: 3,
      typeOfMoves: "Ground",
      HP: 4.5,
      speed: 1,
      attackPower: 5,
      attackRate: 3 / 2,
      horizontalWidthAttack: 2,
      verticalWidthAttack: 4,
      photo: "./src/src/Goblin.png",
      side: 1,
    },

    {
      id: 23,
      type: "Goblin",
      moves: 3,
      typeOfMoves: "Ground",
      HP: 4.5,
      speed: 1,
      attackPower: 5,
      attackRate: 3 / 2,
      horizontalWidthAttack: 2,
      verticalWidthAttack: 4,
      photo: "./src/src/Goblin.png",
      side: 1,
    },

    {
      id: 24,
      type: "Goblin",
      moves: 3,
      typeOfMoves: "Ground",
      HP: 4.5,
      speed: 1,
      attackPower: 5,
      attackRate: 3 / 2,
      horizontalWidthAttack: 2,
      verticalWidthAttack: 4,
      photo: "./src/src/Goblin.png",
      side: 1,
    },

    {
      id: 25,
      type: "Goblin",
      moves: 3,
      typeOfMoves: "Ground",
      HP: 4.5,
      speed: 1,
      attackPower: 5,
      attackRate: 3 / 2,
      horizontalWidthAttack: 2,
      verticalWidthAttack: 4,
      photo: "./src/src/Goblin.png",
      side: 1,
    },

    {
      id: 26,
      type: "Manticore",
      moves: 3,
      typeOfMoves: "Ground",
      HP: 7.5,
      speed: 1,
      attackPower: 4,
      shotSpeed: 1 / 2,
      attackRate: 3 / 4,
      horizontalWidthAttack: 5,
      verticalWidthAttack: 10,
      photo: "./src/src/Manticore.png",
      side: 1,
    },
    {
      id: 27,
      type: "Manticore",
      moves: 3,
      typeOfMoves: "Ground",
      HP: 7.5,
      speed: 1,
      attackPower: 4,
      shotSpeed: 1 / 2,
      attackRate: 3 / 4,
      horizontalWidthAttack: 5,
      verticalWidthAttack: 10,
      photo: "./src/src/Manticore.png",
      side: 1,
    },
    {
      id: 28,
      type: "Banshee",
      moves: 3,
      typeOfMoves: "Fly",
      HP: 7.5,
      speed: 1,
      attackPower: 1,
      attackRate: 3 / 5,
      horizontalWidthAttack: 64,
      verticalWidthAttack: 32,
      photo: "./src/src/Banshee.png",
      side: 1,
    },
    {
      id: 29,
      type: "Banshee",
      moves: 3,
      typeOfMoves: "Fly",
      HP: 7.5,
      speed: 1,
      attackPower: 1,
      attackRate: 3 / 5,
      horizontalWidthAttack: 64,
      verticalWidthAttack: 32,
      photo: "./src/src/Banshee.png",
      side: 1,
    },
    {
      id: 30,
      type: "Troll",
      moves: 3,
      typeOfMoves: "Ground",
      HP: 13.5,
      speed: 3 / 4,
      attackPower: 10,
      shotSpeed: 1 / 2,
      attackRate: 3 / 5,
      horizontalWidthAttack: 8,
      verticalWidthAttack: 12,
      photo: "./src/src/Troll.png",
      side: 1,
    },
    {
      id: 31,
      type: "Troll",
      moves: 3,
      typeOfMoves: "Ground",
      HP: 13.5,
      speed: 3 / 4,
      attackPower: 10,
      shotSpeed: 1 / 2,
      attackRate: 3 / 5,
      horizontalWidthAttack: 8,
      verticalWidthAttack: 12,
      photo: "./src/src/Troll.png",
      side: 1,
    },
    {
      id: 32,
      type: "Basilisk",
      moves: 3,
      typeOfMoves: "Ground",
      HP: 5.5,
      speed: 1,
      attackPower: 9,
      shotSpeed: 1,
      attackRate: 1,
      horizontalWidthAttack: 3,
      verticalWidthAttack: 10,
      photo: "./src/src/Basilisk.png",
      side: 1,
    },
    {
      id: 33,
      type: "Basilisk",
      moves: 3,
      typeOfMoves: "Ground",
      HP: 5.5,
      speed: 1,
      attackPower: 9,
      shotSpeed: 1,
      attackRate: 1,
      horizontalWidthAttack: 3,
      verticalWidthAttack: 10,
      photo: "./src/src/Basilisk.png",
      side: 1,
    },
    {
      id: 34,
      type: "Shapeshifter",
      moves: 5,
      typeOfMoves: "Fly",
      HP: 0.5,
      speed: 0,
      attackPower: 0,
      attackRate: 0,
      photo: "./src/src/Shapeshifter.png",
      side: 1,
    },
    {
      id: 35,
      type: "Dragon",
      moves: 4,
      typeOfMoves: "Fly",
      HP: 16.5,
      speed: 1,
      attackPower: 11,
      shotSpeed: 7 / 10,
      attackRate: 1 / 2,
      horizontalWidthAttack: 4,
      verticalWidthAttack: 6,
      photo: "./src/src/Dragon.png",
      side: 1,
    },
    {
      id: 36,
      type: "Sorceress",
      moves: 3,
      typeOfMoves: "Teleport",
      HP: 9.5,
      speed: 1,
      attackPower: 8,
      shotSpeed: 9 / 10,
      attackRate: 3 / 4,
      horizontalWidthAttack: 2,
      verticalWidthAttack: 4,
      photo: "./src/src/Sorceress.png",
      side: 1,
    },

    {
      id: 37,
      type: "Air",
      moves: 9,
      typeOfMoves: "Fly",
      HP: 11.5,
      speed: 1,
      attackPower: 5,
      shotSpeed: 7 / 10,
      attackRate: 6 / 7,
      horizontalMinWidth: 5,
      horizontalWidthAttack: 7,
      verticalWidthAttack: 8,
      photo: "",
      side: -1,
    },

    {
      id: 38,
      type: "Water",
      moves: 9,
      typeOfMoves: "Fly",
      HP: 13.5,
      speed: 1,
      attackPower: 6,
      shotSpeed: 1 / 2,
      attackRate: 3 / 5,
      horizontalMinWidth: 3,
      horizontalWidthAttack: 6,
      verticalMinWidth: 4,
      verticalWidthAttack: 10,
      photo: "",
      side: -1,
    },
    {
      id: 39,
      type: "Earth",
      moves: 9,
      typeOfMoves: "Fly",
      HP: 16.5,
      speed: 3 / 4,
      attackPower: 9,
      shotSpeed: 1 / 2,
      attackRate: 3 / 5,
      horizontalWidthAttack: 8,
      verticalWidthAttack: 12,
      photo: "",
      side: -1,
    },

    {
      id: 40,
      type: "Fire",
      moves: 9,
      typeOfMoves: "Fly",
      HP: 9.5,
      speed: 1,
      attackPower: 9,
      shotSpeed: 4 / 5,
      attackRate: 1,
      horizontalMinWidth: 3,
      horizontalWidthAttack: 6,
      verticalMinWidth: 4,
      verticalWidthAttack: 10,
      photo: "",
      side: -1,
    },
  ];

  arrayWithCurrentInformationsAboutCharacters: Array<Character> = [];
}

interface Character {
  id: number;
  type: string;
  moves: number;
  typeOfMoves: string;
  HP: number;
  speed: number;
  attackPower: number;
  attackRate: number;
  photo: string;
  side: number;
  shotSpeed?: number;
  horizontalWidthAttack?: number;
  verticalWidthAttack?: number;
  horizontalMinWidth?: number;
  verticalMinWidth?: number;
  positionI?: number;
  positionJ?: number;
}

interface KeyLoggerShortcut {
  down: string;
  up: string;
  right: string;
  left: string;
  attack: string;
}

interface Position {
  i: number;
  j: number;
}

interface Color {
  yellow: string;
  blue: string;
}

interface OffsetField {
  x: number;
  y: number;
}

interface KeysInformations {
  key: string;
  clicked: boolean;
}

interface IntervalInformations {
  name: string;
  id: number;
  movingSide?: string;
}

interface AudioInformation {
  name: string;
  htmlElement: HTMLAudioElement;
}

interface FightingCharactersTypes {
  yellow: Character;
  blue: Character;
}

interface FieldColorInforamtion {
  color: string;
  bonusYellow: number;
  bonusBlue: number;
}

interface HpFightinfo {
  yellow: number;
  blue: number;
}

interface PlantsPlaces {
  id: number;
  x: number;
  y: number;
  phase: number;
}

interface PositionOfDemagePoints {
  x: number;
  y: number;
}

interface SpellInformation {
  id: number;
  name: string;
  function: Function;
}

interface CurrentCharacterSpellsInfo {
  index: number;
  spellsArray: Array<SpellInformation>;
  maxValue: number;
}

interface DeadCharacter {
  index: number;
  character: Character;
}

interface MoveCounter {
  i: number;
  j: number;
  indexNumber: number;
}

interface Game {
  computerSide: number;
  startingSide: number;
  onlyPlayground: boolean;
}

export default Game;
