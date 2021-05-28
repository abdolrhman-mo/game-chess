const board = document.querySelector(".game-board");
const score = document.querySelector(".score-board p");
const scoreM = document.querySelector(".score-board img");

a = ["a", "b", "c", "d", "e", "f", "g", "h"];

for (let i = 8; i > 0; i--) {
  const row = document.createElement("div");
  row.classList.add("row", `_${i}`);
  board.appendChild(row);
  for (let j = 0; j < a.length; j++) {
    const element = document.createElement("div");
    element.classList.add("square", `_${i}`, `${a[j]}`);
    row.appendChild(element);
  }
}

function piece(name, p, id = "_1") {
  const piece = document.createElement("img");
  piece.setAttribute("src", `images/${name}.png`);
  piece.classList.add("piece", name);
  piece.id = id;
  document.querySelector(p).appendChild(piece);
  return piece;
}

function rock_moves(piece) {
  // posible moves to every vertical position
  for (let i = 1; i < 8; i++) {
    pm.push(`._${i}.${piece.parentElement.classList[2]}`);
  }
  // posible moves to every horizontal position
  for (let i = 0; i < a.length; i++) {
    pm.push(`.${row}.${a[i]}`);
  }
}
function bishop_moves() {
  for (let i = 1; i < 9; i++) {
    pm.push(`._${row_n + i}.${a[column_index + i]}`);
  }
  for (let i = 1; i < 9; i++) {
    pm.push(`._${row_n + i}.${a[column_index - i]}`);
  }
  for (let i = 1; i < 9; i++) {
    pm.push(`._${row_n - i}.${a[column_index - i]}`);
  }
  for (let i = 1; i < 9; i++) {
    pm.push(`._${row_n - i}.${a[column_index + i]}`);
  }
}

function piece_style(arg = true, style = "events", apply = true) {
  document.querySelectorAll(".piece").forEach((piece) => {
    if (style == "events") {
      if (piece.classList[1].includes("w") == arg) {
        if (apply == false) {
          //   piece.style.pointerEvents = "none";
          //   piece.style.display = "none";
        } else {
          //   piece.style.pointerEvents = "all";
          //   piece.style.display = "block";
        }
      }
    } else if (style == "rotate") {
      if (apply == true) {
        piece.style.transform = "rotate(180deg)";
      } else {
        piece.style.transform = "rotate(0deg)";
      }
    }
  });
}

function killed(c, id) {
  // kp = killed piece
  kp = document.querySelector(`.${c}#${id}`);
  //   kp.style.display = "none";
  const wbin = document.querySelector(".white-bin");
  const bbin = document.querySelector(".black-bin");
  if (kp.classList[1].includes("w") == true) {
    wbin.appendChild(kp);
  } else {
    bbin.appendChild(kp);
  }
}

function move(piece) {
  // TODO: Another onclick function to detect the wanted move
  window.addEventListener("click", t);

  function t(e) {
    // wanted move
    wm = "." + e.target.classList[1] + "." + e.target.classList[2];
    console.log("wm: " + wm);
    // possible_moves
    row = piece.parentElement.classList[1];
    row_n = parseInt(row.replace("_", ""));
    column_index = a.indexOf(piece.parentElement.classList[2]);
    // console.log(`index of ${e.target.classList[2]}: ${a.indexOf(e.target.classList[2])}`)
    pm = [];

    if (
      Object.values(piece.classList).includes("wk") ||
      Object.values(piece.classList).includes("bk")
    ) {
      pm.push(`.${row}.${a[column_index - 1]}`);
      pm.push(`.${row}.${a[column_index + 1]}`);

      pm.push(`._${row_n + 1}.${a[column_index - 1]}`);
      pm.push(`._${row_n + 1}.${a[column_index]}`);
      pm.push(`._${row_n + 1}.${a[column_index + 1]}`);

      pm.push(`._${row_n - 1}.${a[column_index - 1]}`);
      pm.push(`._${row_n - 1}.${a[column_index]}`);
      pm.push(`._${row_n - 1}.${a[column_index + 1]}`);
    } else if (
      Object.values(piece.classList).includes("wq") ||
      Object.values(piece.classList).includes("bq")
    ) {
      rock_moves(piece);
      bishop_moves();
    } else if (Object.values(piece.classList).includes("wp")) {
      //   pm.push(`.${row}.${a[column_index - 1]}`);
      //   pm.push(`.${row}.${a[column_index + 1]}`);

      pm.push(`._${row_n + 1}.${a[column_index - 1]}`);
      pm.push(`._${row_n + 1}.${a[column_index]}`);
      pm.push(`._${row_n + 1}.${a[column_index + 1]}`);
      // two steps at a time for first move
      if (Object.values(piece.parentElement.classList).includes("_2")) {
        pm.push(`._4.${piece.parentElement.classList[2]}`);
      }
    } else if (Object.values(piece.classList).includes("bp")) {
      //   pm.push(`.${row}.${a[column_index - 1]}`);
      //   pm.push(`.${row}.${a[column_index + 1]}`);

      pm.push(`._${row_n - 1}.${a[column_index - 1]}`);
      pm.push(`._${row_n - 1}.${a[column_index]}`);
      pm.push(`._${row_n - 1}.${a[column_index + 1]}`);
      // two steps at a time for first move
      if (Object.values(piece.parentElement.classList).includes("_7")) {
        pm.push(`._5.${piece.parentElement.classList[2]}`);
      }
    } else if (
      Object.values(piece.classList).includes("wb") ||
      Object.values(piece.classList).includes("bb")
    ) {
      bishop_moves();
    } else if (
      Object.values(piece.classList).includes("wn") ||
      Object.values(piece.classList).includes("bn")
    ) {
      pm.push(`._${row_n + 2}.${a[column_index + 1]}`);
      pm.push(`._${row_n + 2}.${a[column_index - 1]}`);
      pm.push(`._${row_n - 2}.${a[column_index + 1]}`);
      pm.push(`._${row_n - 2}.${a[column_index - 1]}`);
      // #@$%#@%^#$
      pm.push(`._${row_n - 1}.${a[column_index + 2]}`);
      pm.push(`._${row_n - 1}.${a[column_index - 2]}`);
      pm.push(`._${row_n + 1}.${a[column_index + 2]}`);
      pm.push(`._${row_n + 1}.${a[column_index - 2]}`);
    } else if (
      Object.values(piece.classList).includes("wr") ||
      Object.values(piece.classList).includes("br")
    ) {
      rock_moves(piece);
    }

    console.log("pm: " + pm);

    // for (let i = 0; i < pm.length; i++) {
    //   ps = document.querySelector(pm[i]);
    //   console.log("ps.childNode: " + ps.childNodes[0]);
    //   if (ps.childNodes[0] == undefined) {
    //     // check if square already has an indication
    //     let indication = document.createElement("div");
    //     indication.classList.add("indication");
    //     ps.appendChild(indication);
    //   }
    // }

    // T H E   M O V E
    pieces = [
      "bp",
      "bk",
      "bq",
      "bb",
      "bn",
      "br",
      "wp",
      "wk",
      "wq",
      "wb",
      "wn",
      "wr",
    ];
    for (let i = 0; i < pieces.length; i++) {
      if (wm.includes(pieces[i])) {
        killed(pieces[i], e.target.id);
        document
          .querySelector(`.${pieces[i]}#${e.target.id}`)
          .parentElement.appendChild(piece);
        killing = true;
      } else {
        killing = false;
      }
    }
    if (killing == false) {
      for (let i = 0; i < pm.length; i++) {
        let position = pm[i];
        if (position == wm) {
          new Audio("se.mp3").play();
          document.querySelector(position).appendChild(piece);
          if (white_turn === true) {
            white_turn = false;
          } else {
            white_turn = true;
          }
          // TODO: Add local data base to save changes
          break;
        }
      }
    }

    window.removeEventListener("click", t);
    console.log("****************************");
  }
}

// P L A C E   T H E   P I E C I E S
wk = piece("wk", "._1.e");
bk = piece("bk", "._8.e");
wq = piece("wq", "._1.d");
bq = piece("bq", "._8.d");

wb1 = piece("wb", "._1.c");
bb1 = piece("bb", "._8.c");
wb2 = piece("wb", "._1.f");
bb2 = piece("bb", "._8.f");

wn1 = piece("wn", "._1.b");
bn1 = piece("bn", "._8.b");
wn2 = piece("wn", "._1.g");
bn2 = piece("bn", "._8.g");

wr1 = piece("wr", "._1.a");
br1 = piece("br", "._8.a");
wr2 = piece("wr", "._1.h");
br2 = piece("br", "._8.h");

for (let i = 0; i < a.length; i++) {
  wp = piece("wp", `._2.${a[i]}`, (id = `_${i}`));
}
for (let i = 0; i < a.length; i++) {
  bp = piece("bp", `._7.${a[i]}`, (id = `_${i}`));
}

let indication = document.createElement("div");
indication.classList.add("indication");

wpieces = [];

white_turn = true;

setInterval(() => {
  if (white_turn) {
    // posible movies
    wpieces = [];
    wpieces.push("wp", "wk", "wq", "wb", "wn", "wr");
    // killing stuff
    piece_style(true, "events", true);
    piece_style(false, "events", false);
    // styling stuff
    setTimeout(() => {
      score.textContent = "It's White's Turn";
      scoreM.setAttribute("src", "images/wp.png");
      board.style.transform = "rotate(0deg)";
      piece_style(false, "rotate", false);
    }, 2000);
  } else {
    // posible movies
    wpieces = [];
    wpieces.push("bp", "bk", "bq", "bb", "bn", "br");
    // kinlling stuff
    piece_style(false, "events", true);
    piece_style(true, "events", false);
    // styling stuff
    setTimeout(() => {
      score.textContent = "It's Black's Turn";
      scoreM.setAttribute("src", "images/bp.png");
      board.style.transform = "rotate(180deg)";
      piece_style(false, "rotate", true);
    }, 2000);
  }
}, 5);

// M O V I N G   F U N C T I O N
window.addEventListener("click", (e) => {
  console.log("****************************");
  // detect the piece
  if (e.target.localName == "img") {
    // selected_piece
    sp = e.target;
    for (let i = 0; i < wpieces.length; i++) {
      if (Object.values(sp.classList).includes(wpieces[i])) {
        console.log(`Selected Piece: ${wpieces[i]}`);
        move(sp);
        break;
      }
    }
  }
  console.log("****************************");
});
