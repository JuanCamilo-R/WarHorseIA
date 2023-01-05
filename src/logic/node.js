export class Node {
  EMPTY = 0;
  REDHORSE = 1;
  GREENHORSE = 2;
  BONUS = 3;
  RED = 4;
  GREEN = 5;

  constructor(stateW, father, operator, depth) {
    this.stateW = stateW;
    this.father = father;
    this.operator = operator;
    this.depth = depth;
    this.optionsMoveRed = 0;
    this.optionsMoveGreen = 0;
    this.countColorsRed = 0;
    this.countColorsGreen = 0;
    this.horsePosRed = [];
    this.horsePosGreen = [];
    this.heuristic = 0; // para el nodo final,  No lo estoy usando
    this.bonus = false;
    this.type = " "; //max or min
    this.weight = -1000; //valor inicial: infinity o -inifinity, si el ultimo le pongo el valor de la heuristica
    this.created = true; //puede crear un hijo
    this.round = 0; //0 es computador, 1 es humano
  }

  getStateW() {
    return JSON.parse(JSON.stringify(this.stateW));
  }

  getRound() {
    return this.round;
  }

  getCreate() {
    return this.created;
  }

  getFather() {
    return this.father;
  }

  getWeight() {
    return this.weight;
  }

  getOperator() {
    return this.operator;
  }

  getDepth() {
    return this.depth;
  }

  getHeuristic() {
    return this.heuristic;
  }

  getHorsePosRed() {
    return this.horsePosRed;
  }

  getHorsePosGreen() {
    return this.horsePosGreen;
  }

  getoptionsMoveRed() {
    return this.optionsMoveRed;
  }

  getoptionsMoveGreen() {
    return this.optionsMoveGreen;
  }

  getBonus() {
    return this.bonus;
  }

  getcountColorsRed() {
    return this.countColorsRed;
  }

  getcountColorsGreen() {
    return this.countColorsGreen;
  }

  getType() {
    return this.type;
  }

  getSumCostHeuristic() {
    return this.sumCostHeuristic;
  }

  setRound(newRound) {
    this.round = newRound;
  }

  setState(newState) {
    this.stateW = newState;
  }

  setType(newType) {
    this.type = newType;
  }

  setBonus(newBonus) {
    this.bonus = newBonus;
  }

  setFather(newFather) {
    this.father = newFather;
  }

  setCreate(newCreated) {
    this.created = newCreated;
  }

  setWeight(newWeight) {
    this.weight = newWeight;
  }

  setOperator(newOperator) {
    this.operator = newOperator;
  }

  setDepth(newDepth) {
    this.depth = newDepth;
  }

  setoptionsMoveRed(newoptionsMoveRed) {
    this.optionsMoveRed = newoptionsMoveRed;
  }

  setoptionsMoveGreen(newoptionsMoveGreen) {
    this.optionsMoveGreen = newoptionsMoveGreen;
  }

  setCountColorsRed(newCountColorsRed) {
    this.countColorsRed = newCountColorsRed;
  }

  setCountColorsGreen(newCountColorsGreen) {
    this.countColorsGreen = newCountColorsGreen;
  }

  setHeuristic(newHeuristic) {
    this.heuristic = newHeuristic;
  }

  sethorsePosRed(newhorsePosRed) {
    this.horsePosRed = newhorsePosRed;
  }

  sethorsePosGreen(newhorsePosGreen) {
    this.horsePosGreen = newhorsePosGreen;
  }

  isGoal() {
    let stateW = this.stateW;
    for (let i = 0; i < 10; i++)
      for (let j = 0; j < 10; j++)
        if (stateW[i][j] == 0 || stateW[i][j] == 3) return false;
    return true;
  }

  calculateHeuristic(sum) {
    return sum;
  }

  searchForHorseRed() {
    let horsePosRed = [-1, -1]; // Mario position [x,y]
    let stateW = this.stateW;

    for (let i = 0; i < 8; i++)
      for (let j = 0; j < 8; j++)
        if (stateW[i][j] == 1) {
          horsePosRed[0] = i;
          horsePosRed[1] = j;
        }

    this.sethorsePosRed(horsePosRed);

    return horsePosRed;
  }

  searchForHorseGreen() {
    let horsePosGreen = [-1, -1]; // Mario position [x,y]
    let stateW = this.stateW;
    for (let i = 0; i < 8; i++)
      for (let j = 0; j < 8; j++)
        if (stateW[i][j] == 2) {
          horsePosGreen[0] = i;
          horsePosGreen[1] = j;
        }

    this.sethorsePosGreen(horsePosGreen);

    return horsePosGreen;
  }

  recreateSolutionWorld() {
    let directions = [];
    let currentNode = this;
    while (currentNode.getOperator() != "first father") {
      directions.append(currentNode.getStateW());
      currentNode = currentNode.getFather();
    }
    return directions;
  }

  oneMovement(posHorse) {
    return [posHorse[0] - 2, posHorse[1] - 1];
  }

  twoMovement(posHorse) {
    return [posHorse[0] - 2, posHorse[1] + 1];
  }

  threeMovement(posHorse) {
    return [posHorse[0] - 1, posHorse[1] + 2];
  }

  fourMovement(posHorse) {
    return [posHorse[0] + 1, posHorse[1] + 2];
  }

  fiveMovement(posHorse) {
    return [posHorse[0] + 2, posHorse[1] + 1];
  }

  sixMovement(posHorse) {
    return [posHorse[0] + 2, posHorse[1] - 1];
  }

  sevenMovement(posHorse) {
    return [posHorse[0] + 1, posHorse[1] - 2];
  }

  eightMovement(posHorse) {
    return [posHorse[0] - 1, posHorse[1] - 2];
  }

  moveRed(posHorse) {
    let iOld = posHorse[0];
    let jOld = posHorse[1];
    let iNew = this.getHorsePosRed()[0];
    let jNew = this.getHorsePosRed()[1];
    this.stateW[iOld][jOld] = 4; //casilla roja
    this.stateW[iNew][jNew] = 1; //caballo rojo

    return this;
  }

  moveGreen(posHorse) {
    let iOld = posHorse[0];
    let jOld = posHorse[1];
    let iNew = this.getHorsePosGreen()[0];
    let jNew = this.getHorsePosGreen()[1];
    this.stateW[iOld][jOld] = 5; //casilla verde
    this.stateW[iNew][jNew] = 2; //caballo verde

    return this;
  }

  paintBonusRed() {
    //si coge bono cambia de color los adyacentes

    if (
      !(this.getHorsePosRed()[0] - 1 < 0) &&
      this.getStateW()[this.getHorsePosRed()[0] - 1][
        this.getHorsePosRed()[1]
      ] == 0
    ) {
      this.stateW[this.getHorsePosRed()[0] - 1][this.getHorsePosRed()[1]] = 4;
    }
    if (
      !(this.getHorsePosRed()[1] + 1 > 7) &&
      this.getStateW()[this.getHorsePosRed()[0]][
        this.getHorsePosRed()[1] + 1
      ] == 0
    ) {
      this.stateW[this.getHorsePosRed()[0]][this.getHorsePosRed()[1] + 1] = 4;
    }

    if (
      !(this.getHorsePosRed()[0] + 1 > 7) &&
      this.getStateW()[this.getHorsePosRed()[0] + 1][
        this.getHorsePosRed()[1]
      ] == 0
    ) {
      this.stateW[this.getHorsePosRed()[0] + 1][this.getHorsePosRed()[1]] = 4;
    }

    if (
      !(this.getHorsePosRed()[1] - 1 < 0) &&
      this.getStateW()[this.getHorsePosRed()[0]][
        this.getHorsePosRed()[1] - 1
      ] == 0
    ) {
      this.stateW[this.getHorsePosRed()[0]][this.getHorsePosRed()[1] - 1] = 4;
    }
  }

  paintBonusGreen() {
    //si coge bono cambia de color los adyacentes

    if (
      !(this.getHorsePosGreen()[0] - 1 < 0) &&
      this.getStateW()[this.getHorsePosGreen()[0] - 1][
        this.getHorsePosGreen()[1]
      ] == 0
    ) {
      this.stateW[this.getHorsePosGreen()[0] - 1][
        this.getHorsePosGreen()[1]
      ] = 5;
    }

    if (
      !(this.getHorsePosGreen()[1] + 1 > 7) &&
      this.getStateW()[this.getHorsePosGreen()[0]][
        this.getHorsePosGreen()[1] + 1
      ] == 0
    ) {
      this.stateW[this.getHorsePosGreen()[0]][
        this.getHorsePosGreen()[1] + 1
      ] = 5;
    }

    if (
      !(this.getHorsePosGreen()[0] + 1 > 7) &&
      this.getStateW()[this.getHorsePosGreen()[0] + 1][
        this.getHorsePosGreen()[1]
      ] == 0
    ) {
      this.stateW[this.getHorsePosGreen()[0] + 1][
        this.getHorsePosGreen()[1]
      ] = 5;
    }

    if (
      !(this.getHorsePosGreen()[1] - 1 < 0) &&
      this.getStateW()[this.getHorsePosGreen()[0]][
        this.getHorsePosGreen()[1] - 1
      ] == 0
    ) {
      this.stateW[this.getHorsePosGreen()[0]][
        this.getHorsePosGreen()[1] - 1
      ] = 5;
    }
  }

  optionsMoveGreenFunc(horsePosGreen) {
    //horsePosGreen es donde ya se movio
    let count = 0;
    let currentNode = this;
    if (
      !(horsePosGreen[0] - 2 < 0) &&
      !(horsePosGreen[1] - 1 < 0) &&
      (currentNode.getStateW()[horsePosGreen[0] - 2][horsePosGreen[1] - 1] ==
        0 ||
        currentNode.getStateW()[horsePosGreen[0] - 2][horsePosGreen[1] - 1] ==
          3)
    ) {
      count++;
    }
    if (
      !(horsePosGreen[0] - 2 < 0) &&
      !(horsePosGreen[1] + 1 > 7) &&
      (currentNode.getStateW()[horsePosGreen[0] - 2][horsePosGreen[1] + 1] ==
        0 ||
        currentNode.getStateW()[horsePosGreen[0] - 2][horsePosGreen[1] + 1] ==
          3)
    ) {
      count++;
    }
    if (
      !(horsePosGreen[0] - 1 < 0) &&
      !(horsePosGreen[1] + 2 > 7) &&
      (currentNode.getStateW()[horsePosGreen[0] - 1][horsePosGreen[1] + 2] ==
        0 ||
        currentNode.getStateW()[horsePosGreen[0] - 1][horsePosGreen[1] + 2] ==
          3)
    ) {
      count++;
    }
    if (
      !(horsePosGreen[0] + 1 > 7) &&
      !(horsePosGreen[1] + 2 > 7) &&
      (currentNode.getStateW()[horsePosGreen[0] + 1][horsePosGreen[1] + 2] ==
        0 ||
        currentNode.getStateW()[horsePosGreen[0] + 1][horsePosGreen[1] + 2] ==
          3)
    ) {
      count++;
    }

    if (
      !(horsePosGreen[0] + 2 > 7) &&
      !(horsePosGreen[1] + 1 > 7) &&
      (currentNode.getStateW()[horsePosGreen[0] + 2][horsePosGreen[1] + 1] ==
        0 ||
        currentNode.getStateW()[horsePosGreen[0] + 2][horsePosGreen[1] + 1] ==
          3)
    ) {
      count++;
    }

    if (
      !(horsePosGreen[0] + 2 > 7) &&
      !(horsePosGreen[1] - 1 < 0) &&
      (currentNode.getStateW()[horsePosGreen[0] + 2][horsePosGreen[1] - 1] ==
        0 ||
        currentNode.getStateW()[horsePosGreen[0] + 2][horsePosGreen[1] - 1] ==
          3)
    ) {
      count++;
    }

    if (
      !(horsePosGreen[0] + 1 > 7) &&
      !(horsePosGreen[1] - 2 < 0) &&
      (currentNode.getStateW()[horsePosGreen[0] + 1][horsePosGreen[1] - 2] ==
        0 ||
        currentNode.getStateW()[horsePosGreen[0] + 1][horsePosGreen[1] - 2] ==
          3)
    ) {
      count++;
    }

    if (
      !(horsePosGreen[0] - 1 < 0) &&
      !(horsePosGreen[1] - 2 < 0) &&
      (currentNode.getStateW()[horsePosGreen[0] - 1][horsePosGreen[1] - 2] ==
        0 ||
        currentNode.getStateW()[horsePosGreen[0] - 1][horsePosGreen[1] - 2] ==
          3)
    ) {
      count++;
    }
    this.setCountColorsGreen(count);
    return count;
  }

  optionsMoveRedFunc(horsePosRed) {
    //horsePosRed es donde ya se movio
    let count = 0;
    let currentNode = this;
    if (
      !(horsePosRed[0] - 2 < 0) &&
      !(horsePosRed[1] - 1 < 0) &&
      (currentNode.getStateW()[horsePosRed[0] - 2][horsePosRed[1] - 1] == 0 ||
        currentNode.getStateW()[horsePosRed[0] - 2][horsePosRed[1] - 1] == 3)
    ) {
      count++;
    }
    if (
      !(horsePosRed[0] - 2 < 0) &&
      !(horsePosRed[1] + 1 > 7) &&
      (currentNode.getStateW()[horsePosRed[0] - 2][horsePosRed[1] + 1] == 0 ||
        currentNode.getStateW()[horsePosRed[0] - 2][horsePosRed[1] + 1] == 3)
    ) {
      count++;
    }
    if (
      !(horsePosRed[0] - 1 < 0) &&
      !(horsePosRed[1] + 2 > 7) &&
      (currentNode.getStateW()[horsePosRed[0] - 1][horsePosRed[1] + 2] == 0 ||
        currentNode.getStateW()[horsePosRed[0] - 1][horsePosRed[1] + 2] == 3)
    ) {
      count++;
    }

    if (
      !(horsePosRed[0] + 1 > 7) &&
      !(horsePosRed[1] + 2 > 7) &&
      (currentNode.getStateW()[horsePosRed[0] + 1][horsePosRed[1] + 2] == 0 ||
        currentNode.getStateW()[horsePosRed[0] + 1][horsePosRed[1] + 2] == 3)
    ) {
      count++;
    }

    if (
      !(horsePosRed[0] + 2 > 7) &&
      !(horsePosRed[1] + 1 > 7) &&
      (currentNode.getStateW()[horsePosRed[0] + 2][horsePosRed[1] + 1] == 0 ||
        currentNode.getStateW()[horsePosRed[0] + 2][horsePosRed[1] + 1] == 3)
    ) {
      count++;
    }

    if (
      !(horsePosRed[0] + 2 > 7) &&
      !(horsePosRed[1] - 1 < 0) &&
      (currentNode.getStateW()[horsePosRed[0] + 2][horsePosRed[1] - 1] == 0 ||
        currentNode.getStateW()[horsePosRed[0] + 2][horsePosRed[1] - 1] == 3)
    ) {
      count++;
    }

    if (
      !(horsePosRed[0] + 1 > 7) &&
      !(horsePosRed[1] - 2 < 0) &&
      (currentNode.getStateW()[horsePosRed[0] + 1][horsePosRed[1] - 2] == 0 ||
        currentNode.getStateW()[horsePosRed[0] + 1][horsePosRed[1] - 2] == 3)
    ) {
      count++;
    }

    if (
      !(horsePosRed[0] - 1 < 0) &&
      !(horsePosRed[1] - 2 < 0) &&
      (currentNode.getStateW()[horsePosRed[0] - 1][horsePosRed[1] - 2] == 0 ||
        currentNode.getStateW()[horsePosRed[0] - 1][horsePosRed[1] - 2] == 3)
    ) {
      count++;
    }
    this.setCountColorsRed(count);
    return count;
  }

  countColorsGreenFunc() {
    //contar cuantas casillas verdes hay despues del movimiento
    let countGreen = 0;
    let stateW = this.stateW;
    for (let i = 0; i < 8; i++)
      for (let j = 0; j < 8; j++)
        if (stateW[i][j] == 5) {
          countGreen++;
        }

    this.setCountColorsGreen(countGreen + 1);
    return countGreen + 1;
  }

  getHeuristicBonus() {
    let currentNode = this;
    let weight = 2;
    let accum = 0;
    while (currentNode != null) {
      if (currentNode.getBonus()) {
        accum += currentNode.getDepth() * weight;
        weight += 2;
      }
      currentNode = currentNode.getFather();
    }
    return accum;
  }

  countColorsRedFunc() {
    //contar cuantas casillas rojas hay despues del movimiento
    let countRed = 0;
    let stateW = this.stateW;
    for (let i = 0; i < 8; i++)
      for (let j = 0; j < 8; j++)
        if (stateW[i][j] == 4) {
          countRed++;
        }

    this.setCountColorsRed(countRed + 1);
    return countRed + 1;
  }
}
