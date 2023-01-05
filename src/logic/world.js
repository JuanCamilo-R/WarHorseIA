export class World {
  constructor() {
    this.world = []; //Matrix
    this.firstBonus = [];
    this.secondBonus = [];
    this.thirdBonus = [];
  }

  setWorld(world) {
    this.world = world;
  }

  getWorld() {
    return this.world;
  }

  equalPositions(arrA, arrB) {
    return arrA[0] == arrB[0] && arrA[1] == arrB[1];
  }

  generateBonusPositions() {
    this.firstBonus = [this.getRandom(), this.getRandom()];
    this.secondBonus = [this.getRandom(), this.getRandom()];
    this.thirdBonus = [this.getRandom(), this.getRandom()];
    while (
      !this.checkAdjacency(
        this.firstBonus,
        this.secondBonus,
        this.thirdBonus
      ) ||
      this.equalPositions(this.firstBonus, this.secondBonus) ||
      this.equalPositions(this.secondBonus, this.thirdBonus) ||
      this.equalPositions(this.firstBonus, this.thirdBonus)
    ) {
      this.firstBonus = [this.getRandom(), this.getRandom()];
      this.secondBonus = [this.getRandom(), this.getRandom()];
      this.thirdBonus = [this.getRandom(), this.getRandom()];
    }
  }

  generateHorsePositions() {
    this.redHorse = [this.getRandom(), this.getRandom()];
    this.greenHorse = [this.getRandom(), this.getRandom()];
  }

  fillWorld() {
    this.generateBonusPositions();
    this.generateHorsePositions();
    while (
      this.equalPositions(this.redHorse, this.greenHorse) ||
      this.equalPositions(this.redHorse, this.firstBonus) ||
      this.equalPositions(this.redHorse, this.secondBonus) ||
      this.equalPositions(this.redHorse, this.thirdBonus) ||
      this.equalPositions(this.greenHorse, this.firstBonus) ||
      this.equalPositions(this.greenHorse, this.secondBonus) ||
      this.equalPositions(this.greenHorse, this.thirdBonus)
    ) {
      this.generateHorsePositions();
    }

    for (let i = 0; i < 8; i++) {
      let rows = [];
      for (let j = 0; j < 8; j++) {
        if (
          (this.firstBonus[0] == i && this.firstBonus[1] == j) ||
          (this.secondBonus[0] == i && this.secondBonus[1] == j) ||
          (this.thirdBonus[0] == i && this.thirdBonus[1] == j)
        ) {
          rows.push(3);
        } else if (this.redHorse[0] == i && this.redHorse[1] == j) {
          rows.push(1);
        } else if (this.greenHorse[0] == i && this.greenHorse[1] == j) {
          rows.push(2);
        } else {
          rows.push(0);
        }
      }
      this.world.push(rows);
    }
  }

  printWorld() {
    let arrText = "";
    let world = this.getWorld();
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        arrText += world[i][j] + " ";
      }
      console.log(arrText);
      arrText = "";
    }

    console.log("First Bonus: ", this.firstBonus);
    console.log("Second Bonus: ", this.secondBonus);
    console.log("Third bonus: ", this.thirdBonus);
    console.log("Green horse: ", this.greenHorse);
    console.log("Red horse: ", this.redHorse);
  }

  checkAdjacency(firstPos, secondPos, thirdPos) {
    if (this.sameRow(firstPos, secondPos)) {
      if (this.sameRow(secondPos, thirdPos)) {
        if (this.sameRow(firstPos, thirdPos)) {
          if (this.sameColumn(firstPos, secondPos)) {
            if (this.sameColumn(secondPos, thirdPos)) {
              if (this.sameColumn(firstPos, thirdPos)) {
                if (this.sameDiagonal(firstPos, secondPos)) {
                  if (this.sameDiagonal(secondPos, thirdPos)) {
                    if (this.sameDiagonal(firstPos, thirdPos)) {
                      return true; //Everything is okay
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    return false;
  }

  sameRow(posA, posB) {
    if (posA[0] == posB[0]) {
      if (posA[1] + 1 != posB[1] && posA[1] - 1 != posB[1]) {
        return true;
      }
      /** 
      if (posA[0] + 1 != posB[0] && posA[0] - 1 != posB[0]) {
        return true;
      }
      */

      return false;
    }
    return true;
  }

  sameColumn(posA, posB) {
    if (posA[1] == posB[1]) {
      if (posA[0] + 1 != posB[0] && posA[0] - 1 != posB[0]) {
        return true;
      }
      /** 
      if (posA[1] + 1 != posB[1] && posA[1] - 1 != posB[1]) {
        return true;
      }
      */

      return false;
    }
    return true;
  }

  sameDiagonal(posA, posB) {
    if (posA[0] - 1 == posB[0] && posA[1] + 1 == posB[1]) {
      return false;
    } else if (posA[0] + 1 == posB[0] && posA[1] + 1 == posB[1]) {
      return false;
    } else if (posA[0] - 1 == posB[0] && posA[1] - 1 == posB[1]) {
      return false;
    } else if (posA[0] + 1 == posB[0] && posA[1] - 1 == posB[1]) {
      return false;
    } else {
      return true;
    }
  }

  getRandom() {
    return Math.floor(Math.random() * 8);
  }
}
