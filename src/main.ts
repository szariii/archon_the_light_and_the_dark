import Game from ".";
import CreateBoard from "./components/createBoard";

class Intro {
  rootDiv = document.getElementById("root") as HTMLDivElement;

  //players options
  //-1 - pvp
  //0-computer light
  //1-computer dark

  playerOptions: OptionInfo = {
    index: -1,
    text: "TWO-PLAYERS",
  };

  //Starting side
  //0 - light
  //1 - dark
  startingSide: OptionInfo = {
    index: 0,
    text: "LIGHT FIRST",
  };
  constructor() {
    const title = document.getElementById("title") as HTMLHeadingElement;
    title.style.display = "none";
    this.firstInteraction();
  }

  firstInteraction = () => {
    this.rootDiv.style.marginLeft = "0";
    const btn = document.getElementById("btn") as HTMLButtonElement;
    btn.onclick = () => {
      this.firstVideo();
    };
  };

  firstVideo = () => {
    const startingCommunicat = document.getElementById(
      "startingCommunicat"
    ) as HTMLHeadingElement;
    startingCommunicat.remove();

    this.rootDiv.style.marginLeft = "200px";

    const video = document.createElement("video");
    video.width = 800;
    video.style.margin = "0";
    video.id = "video";
    video.autoplay;
    video.src = "./src/src/firstVideo.mp4";
    video.play();
    video.onended = () => {
      this.secondVideo();
    };
    this.rootDiv.appendChild(video);
    window.onkeydown = () => {
      video.onended = () => {};
      this.secondVideo();
    };
  };

  secondVideo = () => {
    const video = document.getElementById("video") as HTMLVideoElement;
    video.src = "./src/src/secondVideo.mp4";
    //video.width = 1000;
    video.play();
    //this.rootDiv.style.marginLeft = "200px";
    video.onended = () => {
      this.selectOptions();
    };
    this.rootDiv.appendChild(video);
    window.onkeydown = () => {
      video.onended = () => {};
      this.selectOptions();
    };
  };

  selectOptions = () => {
    const video = document.getElementById("video") as HTMLVideoElement;
    video.remove();
    this.rootDiv.style.marginLeft = "300px";

    const title = document.getElementById("title") as HTMLHeadingElement;
    title.style.display = "block";
    //new Game(this.playerOptions.index, this.startingSide.index, true);
    const createBoard = new CreateBoard(9,9,0,1)
    createBoard.renderPlayground()
    createBoard.renderCharactersOnPlayground()
    

    const playersOptions = document.createElement("h2");
    playersOptions.innerText = `Arrow up:  ${this.playerOptions.text}`;
    playersOptions.id = "playersOptions";

    const sideOptions = document.createElement("h2");
    sideOptions.innerText = `Arrow down:  ${this.startingSide.text}`;
    sideOptions.id = "sideOptions";

    const startGameOption = document.createElement("h2");
    startGameOption.innerText = `Slash:  Start Game`;
    startGameOption.id = "startGame";

    this.rootDiv.appendChild(playersOptions);
    this.rootDiv.appendChild(sideOptions);
    this.rootDiv.appendChild(startGameOption);
    window.onkeydown = () => {
      this.changeOption(event as KeyboardEvent);
    };
  };

  changeOption = (event: KeyboardEvent) => {
    if (event.code === "ArrowUp") {
      if (this.playerOptions.index === -1) {
        this.playerOptions = {
          index: 0,
          text: "COMPUTER LIGHT",
        };
      } else if (this.playerOptions.index === 0) {
        this.playerOptions = {
          index: 1,
          text: "COMPUTER DARK",
        };
      } else if (this.playerOptions.index === 1) {
        this.playerOptions = {
          index: -1,
          text: "TWO-PLAYERS",
        };
      }

      this.changeInfoOnInterface();
    } else if (event.code === "ArrowDown") {
      if (this.startingSide.index === 0) {
        this.startingSide = {
          index: 1,
          text: "DARK FIRST",
        };
      } else {
        this.startingSide = {
          index: 0,
          text: "LIGHT FIRST",
        };
      }
      this.changeInfoOnInterface();
    } else if (event.code === "Slash") {
      const rootDiv = document.getElementById("root") as HTMLDivElement;
      rootDiv.remove();
      const newRootDiv = document.createElement("div");
      newRootDiv.id = "root";
      const body = document.getElementById("body") as HTMLBodyElement;
      const title = document.createElement("h1");
      title.innerText = "Archon";
      title.id = "title";
      newRootDiv.appendChild(title);
      body.appendChild(newRootDiv);

      window.onkeydown = () => {};
      new Game(this.playerOptions.index, this.startingSide.index, false);
      //game(sadas)
    }
  };

  changeInfoOnInterface = () => {
    const playersOptions = document.getElementById(
      "playersOptions"
    ) as HTMLHeadingElement;
    playersOptions.innerText = `Arrow up:  ${this.playerOptions.text}`;

    const sideOptions = document.getElementById(
      "sideOptions"
    ) as HTMLHeadingElement;
    sideOptions.innerText = `Arrow down:  ${this.startingSide.text}`;
  };
}

interface OptionInfo {
  index: number;
  text: string;
}

new Intro();
