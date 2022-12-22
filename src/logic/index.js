world = [
  [1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 0, 1, 1, 0],
  [1, 1, 1, 1, 0, 1, 1, 1],
  [0, 0, 0, 0, 0, 1, 1, 1],
  [2, 1, 1, 1, 0, 0, 0, 0],
  [0, 4, 0, 1, 4, 1, 1, 1],
  [0, 1, 0, 0, 0, 1, 1, 5],
  [0, 1, 1, 0, 5, 1, 1, 1],
];
class Node {
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
    this.optionsMove = 0;
    this.countColorsRed = 0;
    this.countColorsGreen = 0;
    this.horsePosRed = [];
    this.horsePosGreen = [];
    this.heuristic = 0; // The correct value is given only when the greedy algorithm is used
    this.bonus = false;
    this.type = " "; //max or min
  }

  getStateWW() {
    return this.stateW;
  }

  getFather() {
    return this.father;
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

  getStateW() {
    return this.stateW;
  }

  getOptionsMove() {
    return this.optionsMove;
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

  setOperator(newOperator) {
    this.operator = newOperator;
  }

  setDepth(newDepth) {
    this.depth = newDepth;
  }

  setOptionsMove(newOptionsMove) {
    this.optionsMove = newOptionsMove;
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
    stateW = this.stateW;
    for (var i = 0; i < 10; i++)
      for (var j = 0; j < 10; j++)
        if (state[i][j] == 0 || state[i][j] == 3) return false;
    return true;
  }

  calculateHeuristic(sum) {
    return sum;
  }

  searchForHorseRed() {
    var horsePosRed = [-1, -1]; // Mario position [x,y]
    var stateW = this.stateW;

    for (var i = 0; i < 8; i++)
      for (var j = 0; j < 8; j++)
        if (stateW[i][j] == this.REDHORSE) {
          horsePosRed[0] = i;
          horsePosRed[1] = j;
        }

    this.sethorsePosRed(horsePosRed);
    return horsePosRed;
  }

  searchForHorseGreen() {
    var horsePosGreen = [-1, -1]; // Mario position [x,y]
    var stateW = this.stateW;
    for (var i = 0; i < 8; i++)
      for (var j = 0; j < 8; j++)
        if (stateW[i][j] == this.GREENHORSE) {
          horsePosGreen[0] = i;
          horsePosGreen[1] = j;
        }

    this.sethorsePosGreen(horsePosGreen);
    return horsePosGreen;
  }

  recreateSolutionWorld() {
    directions = [];
    currentNode = this;
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

  move(posHorse) {
    iOld = posHorse[0];
    jOld = posHorse[1];
    iNew = this.getHorsePosRed()[0];
    iNew = this.getHorsePosRed()[1];
    this.stateW[iOld][jOld] = this.RED; //casilla roja
    this.stateW[iNew][jNew] = this.REDHORSE; //caballo rojo
    return this;
  }
}

class DepthAlgorithm {
  constructor(world, nivel) {
    this.emptyNode = new Node(null, null, "first father", -1);
    this.firstNode = new Node(world, this.emptyNode, " ", 0);
    this.horsePosRed = this.firstNode.searchForHorseRed();
    this.horsePosGreen = this.firstNode.searchForHorseGreen();
    this.stack = [this.firstNode];
    this.computingTime = "";
    this.nivel = nivel;
  }

  recorrido(arr) {
    num = 0;
    while (arr.lenght != num) {
      arr[o].getStateWW();
      num++;
    }
  }

  start() {
    var stack = this.stack;
    var horsePosRed = this.horsePosRed;
    var horsePosGreen = this.horsePosGreen;
    var currentNode = stack[0];
    var expandedNodes = 0;
    var depth = 0;
    var nivelGame = 0;
    var arrayComplete = [];
    arrayComplete.push(currentNode);
    while (!(nivelGame == this.nivel)) {
      console.log("---");
      if (nivelGame % 2 == 0) {
        console.log(currentNode.getHorsePosRed());
      } else {
        console.log(currentNode.getHorsePosGreen());
      }

      stack.shift();
      expandedNodes += 1;

      //computador juega con el rojo
      //tablero de 8*8, el anterior era e 10*10

      if (nivelGame % 2 == 0) {
        //le toca al computador
        //One

        /*
         
        */
        if (
          !(horsePosRed[0] - 2 < 0) &&
          !(horsePosRed[1] - 1 < 0) &&
          (currentNode.getStateW()[horsePosRed[0] - 2],
          [horsePosRed[1] - 1] == 0 ||
            currentNode.getStateW()[horsePosRed[0] - 2],
          [horsePosRed[1] - 1] == 3)
        ) {
          son = Node(
            currentNode.getStateW(),
            currentNode,
            "one",
            currentNode.getDepth() + 1
          );
          if (
            (currentNode.getStateW()[horsePosRed[0] - 2],
            [horsePosRed[1] - 1] == 3)
          ) {
            //llamar funcion para ver cuantos puedo pintar porque cogi bono
            //poner bonos en True
          }

          one = son.oneMovement(horsePosRed);
          son.sethorsePosRed(one);
          son.move(horsePosRed);

          stack.unshift(son);
          arrayComplete.push(son);
          if (son.getDepth() > depth) {
            depth = son.getDepth();
            console.log(son.getHorsePosRed());
          }
          //Es el ultim nodo entonces le debemos calcula la heuristica
          if (son.getDepth() == this.nivel) {
          }
        }

        //Two
        if (
          !(horsePosRed[0] - 2 < 0) &&
          !(horsePosRed[1] + 1 > 7) &&
          (currentNode.getStateW()[horsePosRed[0] - 2],
          [horsePosRed[1] + 1] == 0 ||
            currentNode.getStateW()[horsePosRed[0] - 2],
          [horsePosRed[1] + 1] == 3)
        ) {
          son = Node(
            currentNode.getStateW(),
            currentNode,
            "two",
            currentNode.getDepth() + 1
          );
          if (
            (currentNode.getStateW()[horsePosRed[0] - 2],
            [horsePosRed[1] + 1] == 3)
          ) {
            //llamar funcion para ver cuantos puedo pintar porque cogi bono
            //poner bonos en True
          }

          two = son.twoMovement(horsePosRed);
          son.sethorsePosRed(two);
          son.move(horsePosRed);

          stack.unshift(son);
          arrayComplete.push(son);
          if (son.getDepth() > depth) {
            depth = son.getDepth();
            console.log(son.getHorsePosRed());
          }
        }

        //Three
        if (
          !(horsePosRed[0] - 1 < 0) &&
          !(horsePosRed[1] + 2 > 7) &&
          (currentNode.getStateW()[horsePosRed[0] - 1],
          [horsePosRed[1] + 2] == 0 ||
            currentNode.getStateW()[horsePosRed[0] - 1],
          [horsePosRed[1] + 2] == 3)
        ) {
          son = Node(
            currentNode.getStateW(),
            currentNode,
            "three",
            currentNode.getDepth() + 1
          );
          if (
            (currentNode.getStateW()[horsePosRed[0] - 1],
            [horsePosRed[1] + 2] == 3)
          ) {
            //llamar funcion para ver cuantos puedo pintar porque cogi bono
            //poner bonos en True
          }

          three = son.threeMovement(horsePosRed);
          son.sethorsePosRed(three);
          son.move(horsePosRed);

          stack.unshift(son);
          arrayComplete.push(son);
          if (son.getDepth() > depth) {
            depth = son.getDepth();
            console.log(son.getHorsePosRed());
          }
        }

        //Four
        if (
          !(horsePosRed[0] + 1 > 7) &&
          !(horsePosRed[1] + 2 > 7) &&
          (currentNode.getStateW()[horsePosRed[0] + 1],
          [horsePosRed[1] + 2] == 0 ||
            currentNode.getStateW()[horsePosRed[0] + 1],
          [horsePosRed[1] + 2] == 3)
        ) {
          son = Node(
            currentNode.getStateW(),
            currentNode,
            "four",
            currentNode.getDepth() + 1
          );
          if (
            (currentNode.getStateW()[horsePosRed[0] + 1],
            [horsePosRed[1] + 2] == 3)
          ) {
            //llamar funcion para ver cuantos puedo pintar porque cogi bono
            //poner bonos en True
          }

          four = son.fourMovement(horsePosRed);
          son.sethorsePosRed(four);
          son.move(horsePosRed);

          stack.unshift(son);
          arrayComplete.push(son);
          if (son.getDepth() > depth) {
            depth = son.getDepth();
            console.log(son.getHorsePosRed());
          }
        }
        //Five
        if (
          !(horsePosRed[0] + 2 > 7) &&
          !(horsePosRed[1] + 1 > 7) &&
          (currentNode.getStateW()[horsePosRed[0] + 2],
          [horsePosRed[1] + 1] == 0 ||
            currentNode.getStateW()[horsePosRed[0] + 2],
          [horsePosRed[1] + 1] == 3)
        ) {
          son = Node(
            currentNode.getStateW(),
            currentNode,
            "five",
            currentNode.getDepth() + 1
          );
          if (
            (currentNode.getStateW()[horsePosRed[0] + 2],
            [horsePosRed[1] + 1] == 3)
          ) {
            //llamar funcion para ver cuantos puedo pintar porque cogi bono
            //poner bonos en True
          }

          five = son.fiveMovement(horsePosRed);
          son.sethorsePosRed(five);
          son.move(horsePosRed);

          stack.unshift(son);
          arrayComplete.push(son);
          if (son.getDepth() > depth) {
            depth = son.getDepth();
            console.log(son.getHorsePosRed());
          }
        }

        //Six
        if (
          !(horsePosRed[0] + 2 > 7) &&
          !(horsePosRed[1] - 1 < 0) &&
          (currentNode.getStateW()[horsePosRed[0] + 2],
          [horsePosRed[1] - 1] == 0 ||
            currentNode.getStateW()[horsePosRed[0] + 2],
          [horsePosRed[1] - 1] == 3)
        ) {
          son = Node(
            currentNode.getStateW(),
            currentNode,
            "six",
            currentNode.getDepth() + 1
          );
          if (
            (currentNode.getStateW()[horsePosRed[0] + 2],
            [horsePosRed[1] - 1] == 3)
          ) {
            //llamar funcion para ver cuantos puedo pintar porque cogi bono
            //poner bonos en True
          }

          six = son.sixMovement(horsePosRed);
          son.sethorsePosRed(six);
          son.move(horsePosRed);

          stack.unshift(son);
          arrayComplete.push(son);
          if (son.getDepth() > depth) {
            depth = son.getDepth();
            console.log(son.getHorsePosRed());
          }
        }
        //Seven
        if (
          !(horsePosRed[0] + 1 > 7) &&
          !(horsePosRed[1] - 2 < 0) &&
          (currentNode.getStateW()[horsePosRed[0] + 1],
          [horsePosRed[1] - 2] == 0 ||
            currentNode.getStateW()[horsePosRed[0] + 1],
          [horsePosRed[1] - 2] == 3)
        ) {
          son = Node(
            currentNode.getStateW(),
            currentNode,
            "seven",
            currentNode.getDepth() + 1
          );
          if (
            (currentNode.getStateW()[horsePosRed[0] + 1],
            [horsePosRed[1] - 2] == 3)
          ) {
            //llamar funcion para ver cuantos puedo pintar porque cogi bono
            //poner bonos en True
          }

          seven = son.sevenMovement(horsePosRed);
          son.sethorsePosRed(seven);
          son.move(horsePosRed);

          stack.unshift(son);
          arrayComplete.push(son);
          if (son.getDepth() > depth) {
            depth = son.getDepth();
            console.log(son.getHorsePosRed());
          }
        }

        //Eight
        if (
          !(horsePosRed[0] - 1 < 0) &&
          !(horsePosRed[1] - 2 < 0) &&
          (currentNode.getStateW()[horsePosRed[0] - 1],
          [horsePosRed[1] - 2] == 0 ||
            currentNode.getStateW()[horsePosRed[0] - 1],
          [horsePosRed[1] - 2] == 3)
        ) {
          son = Node(
            currentNode.getStateW(),
            currentNode,
            "eight",
            currentNode.getDepth() + 1
          );
          if (
            (currentNode.getStateW()[horsePosRed[0] - 1],
            [horsePosRed[1] - 2] == 3)
          ) {
            //llamar funcion para ver cuantos puedo pintar porque cogi bono
            //poner bonos en True
          }

          eight = son.eightMovement(horsePosRed);
          son.sethorsePosRed(eight);
          son.move(horsePosRed);

          stack.unshift(son);
          arrayComplete.push(son);
          if (son.getDepth() > depth) {
            depth = son.getDepth();
            console.log(son.getHorsePosRed());
          }
        }
      } else {
        //le toca al humano
        //One
        if (
          !(horsePosGreen[0] - 2 < 0) &&
          !(horsePosGreen[1] - 1 < 0) &&
          (currentNode.getStateW()[horsePosGreen[0] - 2],
          [horsePosGreen[1] - 1] == 0 ||
            currentNode.getStateW()[horsePosGreen[0] - 2],
          [horsePosGreen[1] - 1] == 3)
        ) {
          son = Node(
            currentNode.getStateW(),
            currentNode,
            "one",
            currentNode.getDepth() + 1
          );
          if (
            (currentNode.getStateW()[horsePosGreen[0] - 2],
            [horsePosGreen[1] - 1] == 3)
          ) {
            //llamar funcion para ver cuantos puedo pintar porque cogi bono
            //poner bonos en True
          }

          one = son.oneMovement(horsePosGreen);
          son.sethorsePosGreen(one);
          son.move(horsePosGreen);

          stack.unshift(son);
          arrayComplete.push(son);
          if (son.getDepth() > depth) {
            depth = son.getDepth();
            console.log(son.getHorsePosGreen());
          }
          //Es el ultim nodo entonces le debemos calcula la heuristica
          if (son.getDepth() == this.nivel) {
          }
        }

        //Two
        if (
          !(horsePosGreen[0] - 2 < 0) &&
          !(horsePosGreen[1] + 1 > 7) &&
          (currentNode.getStateW()[horsePosGreen[0] - 2],
          [horsePosGreen[1] + 1] == 0 ||
            currentNode.getStateW()[horsePosGreen[0] - 2],
          [horsePosGreen[1] + 1] == 3)
        ) {
          son = Node(
            currentNode.getStateW(),
            currentNode,
            "two",
            currentNode.getDepth() + 1
          );
          if (
            (currentNode.getStateW()[horsePosGreen[0] - 2],
            [horsePosGreen[1] + 1] == 3)
          ) {
            //llamar funcion para ver cuantos puedo pintar porque cogi bono
            //poner bonos en True
          }

          two = son.twoMovement(horsePosGreen);
          son.sethorsePosGreen(two);
          son.move(horsePosGreen);

          stack.unshift(son);
          arrayComplete.push(son);
          if (son.getDepth() > depth) {
            depth = son.getDepth();
            console.log(son.getHorsePosGreen());
          }
        }

        //Three
        if (
          !(horsePosGreen[0] - 1 < 0) &&
          !(horsePosGreen[1] + 2 > 7) &&
          (currentNode.getStateW()[horsePosGreen[0] - 1],
          [horsePosGreen[1] + 2] == 0 ||
            currentNode.getStateW()[horsePosGreen[0] - 1],
          [horsePosGreen[1] + 2] == 3)
        ) {
          son = Node(
            currentNode.getStateW(),
            currentNode,
            "three",
            currentNode.getDepth() + 1
          );
          if (
            (currentNode.getStateW()[horsePosGreen[0] - 1],
            [horsePosGreen[1] + 2] == 3)
          ) {
            //llamar funcion para ver cuantos puedo pintar porque cogi bono
            //poner bonos en True
          }

          three = son.threeMovement(horsePosGreen);
          son.sethorsePosGreen(three);
          son.move(horsePosGreen);

          stack.unshift(son);
          arrayComplete.push(son);
          if (son.getDepth() > depth) {
            depth = son.getDepth();
            console.log(son.getHorsePosGreen());
          }
        }

        //Four
        if (
          !(horsePosGreen[0] + 1 > 7) &&
          !(horsePosGreen[1] + 2 > 7) &&
          (currentNode.getStateW()[horsePosGreen[0] + 1],
          [horsePosGreen[1] + 2] == 0 ||
            currentNode.getStateW()[horsePosGreen[0] + 1],
          [horsePosGreen[1] + 2] == 3)
        ) {
          son = Node(
            currentNode.getStateW(),
            currentNode,
            "four",
            currentNode.getDepth() + 1
          );
          if (
            (currentNode.getStateW()[horsePosGreen[0] + 1],
            [horsePosGreen[1] + 2] == 3)
          ) {
            //llamar funcion para ver cuantos puedo pintar porque cogi bono
            //poner bonos en True
          }

          four = son.fourMovement(horsePosGreen);
          son.sethorsePosGreen(four);
          son.move(horsePosGreen);

          stack.unshift(son);
          arrayComplete.push(son);
          if (son.getDepth() > depth) {
            depth = son.getDepth();
            console.log(son.getHorsePosGreen());
          }
        }
        //Five
        if (
          !(horsePosGreen[0] + 2 > 7) &&
          !(horsePosGreen[1] + 1 > 7) &&
          (currentNode.getStateW()[horsePosGreen[0] + 2],
          [horsePosGreen[1] + 1] == 0 ||
            currentNode.getStateW()[horsePosGreen[0] + 2],
          [horsePosGreen[1] + 1] == 3)
        ) {
          son = Node(
            currentNode.getStateW(),
            currentNode,
            "five",
            currentNode.getDepth() + 1
          );
          if (
            (currentNode.getStateW()[horsePosGreen[0] + 2],
            [horsePosGreen[1] + 1] == 3)
          ) {
            //llamar funcion para ver cuantos puedo pintar porque cogi bono
            //poner bonos en True
          }

          five = son.fiveMovement(horsePosGreen);
          son.sethorsePosGreen(five);
          son.move(horsePosGreen);

          stack.unshift(son);
          arrayComplete.push(son);
          if (son.getDepth() > depth) {
            depth = son.getDepth();
            console.log(son.getHorsePosGreen());
          }
        }

        //Six
        if (
          !(horsePosGreen[0] + 2 > 7) &&
          !(horsePosGreen[1] - 1 < 0) &&
          (currentNode.getStateW()[horsePosGreen[0] + 2],
          [horsePosGreen[1] - 1] == 0 ||
            currentNode.getStateW()[horsePosGreen[0] + 2],
          [horsePosGreen[1] - 1] == 3)
        ) {
          son = Node(
            currentNode.getStateW(),
            currentNode,
            "six",
            currentNode.getDepth() + 1
          );
          if (
            (currentNode.getStateW()[horsePosGreen[0] + 2],
            [horsePosGreen[1] - 1] == 3)
          ) {
            //llamar funcion para ver cuantos puedo pintar porque cogi bono
            //poner bonos en True
          }

          six = son.sixMovement(horsePosGreen);
          son.sethorsePosGreen(six);
          son.move(horsePosGreen);

          stack.unshift(son);
          arrayComplete.push(son);
          if (son.getDepth() > depth) {
            depth = son.getDepth();
            console.log(son.getHorsePosGreen());
          }
        }
        //Seven
        if (
          !(horsePosGreen[0] + 1 > 7) &&
          !(horsePosGreen[1] - 2 < 0) &&
          (currentNode.getStateW()[horsePosGreen[0] + 1],
          [horsePosGreen[1] - 2] == 0 ||
            currentNode.getStateW()[horsePosGreen[0] + 1],
          [horsePosGreen[1] - 2] == 3)
        ) {
          son = Node(
            currentNode.getStateW(),
            currentNode,
            "seven",
            currentNode.getDepth() + 1
          );
          if (
            (currentNode.getStateW()[horsePosGreen[0] + 1],
            [horsePosGreen[1] - 2] == 3)
          ) {
            //llamar funcion para ver cuantos puedo pintar porque cogi bono
            //poner bonos en True
          }

          seven = son.sevenMovement(horsePosGreen);
          son.sethorsePosGreen(seven);
          son.move(horsePosGreen);

          stack.unshift(son);
          arrayComplete.push(son);
          if (son.getDepth() > depth) {
            depth = son.getDepth();
            console.log(son.getHorsePosGreen());
          }
        }

        //Eight
        if (
          !(horsePosGreen[0] - 1 < 0) &&
          !(horsePosGreen[1] - 2 < 0) &&
          (currentNode.getStateW()[horsePosGreen[0] - 1],
          [horsePosGreen[1] - 2] == 0 ||
            currentNode.getStateW()[horsePosGreen[0] - 1],
          [horsePosGreen[1] - 2] == 3)
        ) {
          son = Node(
            currentNode.getStateW(),
            currentNode,
            "eight",
            currentNode.getDepth() + 1
          );
          if (
            (currentNode.getStateW()[horsePosGreen[0] - 1],
            [horsePosGreen[1] - 2] == 3)
          ) {
            //llamar funcion para ver cuantos puedo pintar porque cogi bono
            //poner bonos en True
          }

          eight = son.eightMovement(horsePosGreen);
          son.sethorsePosGreen(eight);
          son.move(horsePosGreen);

          stack.unshift(son);
          arrayComplete.push(son);
          if (son.getDepth() > depth) {
            depth = son.getDepth();
            console.log(son.getHorsePosGreen());
          }
        }
      }
    }
    //solution = currentNode.recreateSolutionWorld();
    //solutionWorld = solution.reverse();
    completo = this.recorrido(arrayComplete);
    console.log(completo);
    console.log("exp&&ido", expandedNodes + 1); // Good
    console.log("profundidad", depth);
    //console.log(stack[0].recreateSolution());
    return solutionWorld;
  }
}

const algorithm = new DepthAlgorithm(world, 1);
solution = algorithm.start();
