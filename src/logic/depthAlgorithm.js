import { Node } from "./node.js";
export class DepthAlgorithm {
  constructor(world, nivel) {
    this.emptyNode = new Node(null, null, "first father", -1);
    this.firstNode = new Node(world, this.emptyNode, " ", 0);
    this.horsePosRed = this.firstNode.searchForHorseRed();
    this.horsePosGreen = this.firstNode.searchForHorseGreen();
    this.stack = [this.firstNode];
    this.firstNode.setType("max");
    this.firstNode.setWeight(-1000);
    this.computingTime = "";
    this.nivel = nivel;
  }

  recorrido(arr) {
    let num = 0;
    let state = [];
    do {
      if (arr[num].getDepth() == 4) {
        state.push(arr[num].getWeight());
      }

      num++;
    } while (arr.length - 1 != num - 1);
    return state;
  }

  finalMove(arrayDepthOne, result) {
    for (let i = 0; i <= arrayDepthOne.length; i++) {
      if (arrayDepthOne[i].getWeight() == result) {
        return arrayDepthOne[i].getStateW();
      }
    }
  }

  decisionMinMax(array) {
    let num = 0;
    let depthOne = [];
    let max = 0;
    let index = 0;
    let arrayCopy = array;
    let arrDepth = [];
    // console.log("length ", arrayCopy.length);
    while (arrayCopy.length != 0) {
      console.log("arrayCopy length: ", arrayCopy.length);
      arrDepth = [];
      arrayCopy.map((node) => arrDepth.push(node.getDepth()));
      max = Math.max(...arrDepth);
      index = arrayCopy.findIndex((node) => node.getDepth() == max);
      // console.log("depth ", arrDepth);
      // console.log("max ", max);
      // console.log(arrayCopy[num].getDepth());

      if (arrayCopy[index].getDepth() != -1) {
        if (arrayCopy[index].getDepth() == max) {
          if (arrayCopy[index].getFather().getType() == "min") {
            if (
              arrayCopy[index].getFather().getWeight() >
              arrayCopy[index].getWeight()
            ) {
              arrayCopy[index]
                .getFather()
                .setWeight(arrayCopy[index].getWeight());
            }
          } else {
            if (
              arrayCopy[index].getFather().getWeight() <
              arrayCopy[index].getWeight()
            ) {
              arrayCopy[index]
                .getFather()
                .setWeight(arrayCopy[index].getWeight());
            }
          }
          if (arrayCopy[index].getDepth() == 1) {
            depthOne.push(arrayCopy[index]);
          }
          if (arrayCopy[index].getDepth() == 0) {
            return [arrayCopy[index].getWeight(), depthOne];
          }
          arrayCopy.splice(index, 1);
        }
        // console.log("length ", arrayCopy.length);
        // console.log("num ", num);
      }
    }

    return [arrayCopy[index].getWeight(), depthOne];
  }

  start() {
    let stack = this.stack;
    let horsePosRed = this.horsePosRed;
    let horsePosGreen = this.horsePosGreen;
    let currentNode = stack[0];
    let expandedNodes = 0;
    let depth = 0;
    let nivelGame = 0;
    let arrayComplete = [];
    arrayComplete.push(currentNode);

    while (stack.length != 0) {
      // //// console.log("---");
      if (nivelGame % 2 == 0) {
        ////// console.log(currentNode.getHorsePosRed());
      } else {
        ////// console.log(currentNode.getHorsePosGreen()());
      }

      stack.shift();
      expandedNodes += 1;

      //computador juega con el rojo
      //tablero de 8*8, el anterior era e 10*10
      horsePosGreen = currentNode.searchForHorseGreen();
      horsePosRed = currentNode.searchForHorseRed();

      if (currentNode.getRound() == 0) {
        //One
        // console.log("aqui si");
        if (
          !(horsePosRed[0] - 2 < 0) &&
          !(horsePosRed[1] - 1 < 0) &&
          (currentNode.getStateW()[horsePosRed[0] - 2][horsePosRed[1] - 1] ==
            0 ||
            currentNode.getStateW()[horsePosRed[0] - 2][horsePosRed[1] - 1] ==
              3) &&
          currentNode.getCreate()
        ) {
          let son = new Node(
            currentNode.getStateW(),
            currentNode,
            "one",
            currentNode.getDepth() + 1
          );

          let one = son.oneMovement(horsePosRed);
          son.sethorsePosRed(one);
          son.moveRed(horsePosRed);

          if (
            currentNode.getStateW()[horsePosRed[0] - 2][horsePosRed[1] - 1] == 3
          ) {
            //llamar funcion para ver cuantos puedo pintar porque cogi bono
            //poner bonos en True
            son.paintBonusRed();
            son.setBonus(true);
          }

          son.setType("min");
          son.setWeight(1000);

          if (son.getDepth() > depth) {
            depth = son.getDepth();
            //// console.log(son.getHorsePosRed()());
          }
          //Es el ultim nodo entonces le debemos calcula la heuristica//peso
          son.searchForHorseGreen();
          // console.log("son estado", son.getStateW());
          // console.log("padre estado", currentNode.getStateW());

          if (
            son.getDepth() == this.nivel ||
            son.optionsMoveGreenFunc(son.getHorsePosGreen()) == 0
          ) {
            let moveComputer = 0;
            let moveHuman = 0;
            let colorHuman = 0;
            let colorComputer = 0;
            let bonus = 0;
            let optionMoveHuman = 0;
            let goal = 0;
            moveComputer = son.optionsMoveRedFunc(son.getHorsePosRed()); //opciones de movimiento del computador
            moveHuman = son.optionsMoveGreenFunc(son.getHorsePosGreen()); //opciones de movimiento del humano
            colorComputer = son.countColorsRedFunc(); //casillas pintadas del computador
            colorHuman = son.countColorsGreenFunc(); //casillas pintadas del humano
            //falta si cogio bono dependiendo de la profundidad sume mas
            bonus = son.getHeuristicBonus();
            // console.log("Bonus heuristic: ", bonus);
            if (
              son.optionsMoveGreenFunc(son.getHorsePosGreen()) == 0 &&
              son.optionsMoveRedFunc(son.getHorsePosRed()) != 0
            ) {
              optionMoveHuman = 12; // se le suma mas porque el humano se quedo sin movimientos
            }
            if (son.isEndMove() && colorComputer > colorHuman) {
              //gano computador
              goal = 100;
            }
            son.setWeight(
              moveComputer -
                moveHuman +
                (colorComputer - colorHuman) +
                bonus +
                optionMoveHuman +
                goal
            );
            // console.log("op compu", moveComputer);
            // console.log("op human", moveHuman);
            // console.log("color C", colorComputer);
            // console.log("color H", colorHuman);

            son.setCreate(false); //ya no se crean mas nodos, este es el ultimo
          }
          son.setRound(1);
          stack.unshift(son);
          arrayComplete.push(son);
        }

        //Two
        if (
          !(horsePosRed[0] - 2 < 0) &&
          !(horsePosRed[1] + 1 > 7) &&
          (currentNode.getStateW()[horsePosRed[0] - 2][horsePosRed[1] + 1] ==
            0 ||
            currentNode.getStateW()[horsePosRed[0] - 2][horsePosRed[1] + 1] ==
              3) &&
          currentNode.getCreate()
        ) {
          let son = new Node(
            currentNode.getStateW(),
            currentNode,
            "two",
            currentNode.getDepth() + 1
          );

          let two = son.twoMovement(horsePosRed);
          son.sethorsePosRed(two);
          son.moveRed(horsePosRed);

          if (
            currentNode.getStateW()[horsePosRed[0] - 2][horsePosRed[1] + 1] == 3
          ) {
            //llamar funcion para ver cuantos puedo pintar porque cogi bono
            //poner bonos en True
            son.paintBonusRed();
            son.setBonus(true);
          }

          son.setType("min");
          son.setWeight(1000);

          if (son.getDepth() > depth) {
            depth = son.getDepth();
            //// console.log(son.getHorsePosRed()());
          }
          //Es el ultim nodo entonces le debemos calcula la heuristica
          son.searchForHorseGreen();
          // console.log("son estado", son.getStateW());
          // console.log("padre estado", currentNode.getStateW());
          if (
            son.getDepth() == this.nivel ||
            son.optionsMoveGreenFunc(son.getHorsePosGreen()) == 0
          ) {
            let moveComputer = 0;
            let moveHuman = 0;
            let colorHuman = 0;
            let colorComputer = 0;
            let bonus = 0;
            let optionMoveHuman = 0;
            let goal = 0;
            moveComputer = son.optionsMoveRedFunc(son.getHorsePosRed()); //opciones de movimiento del computador
            moveHuman = son.optionsMoveGreenFunc(son.getHorsePosGreen()); //opciones de movimiento del humano
            colorComputer = son.countColorsRedFunc(); //casillas pintadas del computador
            colorHuman = son.countColorsGreenFunc(); //casillas pintadas del humano
            //falta si cogio bono dependiendo de la profundidad sume mas
            bonus = son.getHeuristicBonus();
            // console.log("Bonus heuristic: ", bonus);
            if (
              son.optionsMoveGreenFunc(son.getHorsePosGreen()) == 0 &&
              son.optionsMoveRedFunc(son.getHorsePosRed()) != 0
            ) {
              optionMoveHuman = 12; // se le suma mas porque el humano se quedo sin movimientos
            }
            if (son.isEndMove() && colorComputer > colorHuman) {
              //gano computador
              goal = 100;
            }
            son.setWeight(
              moveComputer -
                moveHuman +
                (colorComputer - colorHuman) +
                bonus +
                optionMoveHuman +
                goal
            );
            // console.log("op compu", moveComputer);
            // console.log("op human", moveHuman);
            // console.log("color C", colorComputer);
            // console.log("color H", colorHuman);

            son.setCreate(false);
          }
          son.setRound(1);
          stack.unshift(son);
          arrayComplete.push(son);
        }

        //Three
        if (
          !(horsePosRed[0] - 1 < 0) &&
          !(horsePosRed[1] + 2 > 7) &&
          (currentNode.getStateW()[horsePosRed[0] - 1][horsePosRed[1] + 2] ==
            0 ||
            currentNode.getStateW()[horsePosRed[0] - 1][horsePosRed[1] + 2] ==
              3) &&
          currentNode.getCreate()
        ) {
          let son = new Node(
            currentNode.getStateW(),
            currentNode,
            "three",
            currentNode.getDepth() + 1
          );

          let three = son.threeMovement(horsePosRed);
          son.sethorsePosRed(three);
          son.moveRed(horsePosRed);

          if (
            currentNode.getStateW()[horsePosRed[0] - 1][horsePosRed[1] + 2] == 3
          ) {
            //llamar funcion para ver cuantos puedo pintar porque cogi bono
            //poner bonos en True
            son.paintBonusRed();
            son.setBonus(true);
          }

          son.setType("min");
          son.setWeight(1000);

          if (son.getDepth() > depth) {
            depth = son.getDepth();
            //// console.log(son.getHorsePosRed()());
          }
          //Es el ultim nodo entonces le debemos calcula la heuristica
          son.searchForHorseGreen();
          // console.log("son estado", son.getStateW());
          // console.log("padre estado", currentNode.getStateW());
          if (
            son.getDepth() == this.nivel ||
            son.optionsMoveGreenFunc(son.getHorsePosGreen()) == 0
          ) {
            let moveComputer = 0;
            let moveHuman = 0;
            let colorHuman = 0;
            let colorComputer = 0;
            let bonus = 0;
            let optionMoveHuman = 0;
            let goal = 0;
            moveComputer = son.optionsMoveRedFunc(son.getHorsePosRed()); //opciones de movimiento del computador
            moveHuman = son.optionsMoveGreenFunc(son.getHorsePosGreen()); //opciones de movimiento del humano
            colorComputer = son.countColorsRedFunc(); //casillas pintadas del computador
            colorHuman = son.countColorsGreenFunc(); //casillas pintadas del humano
            //falta si cogio bono dependiendo de la profundidad sume mas
            bonus = son.getHeuristicBonus();
            // console.log("Bonus heuristic: ", bonus);
            if (
              son.optionsMoveGreenFunc(son.getHorsePosGreen()) == 0 &&
              son.optionsMoveRedFunc(son.getHorsePosRed()) != 0
            ) {
              optionMoveHuman = 12; // se le suma mas porque el humano se quedo sin movimientos
            }
            if (son.isEndMove() && colorComputer > colorHuman) {
              //gano computador
              goal = 100;
            }
            son.setWeight(
              moveComputer -
                moveHuman +
                (colorComputer - colorHuman) +
                bonus +
                optionMoveHuman +
                goal
            );
            // console.log("op compu", moveComputer);
            // console.log("op human", moveHuman);
            // console.log("color C", colorComputer);
            // console.log("color H", colorHuman);

            son.setCreate(false);
          }
          son.setRound(1);
          stack.unshift(son);
          arrayComplete.push(son);
        }

        //Four
        if (
          !(horsePosRed[0] + 1 > 7) &&
          !(horsePosRed[1] + 2 > 7) &&
          (currentNode.getStateW()[horsePosRed[0] + 1][horsePosRed[1] + 2] ==
            0 ||
            currentNode.getStateW()[horsePosRed[0] + 1][horsePosRed[1] + 2] ==
              3) &&
          currentNode.getCreate()
        ) {
          let son = new Node(
            currentNode.getStateW(),
            currentNode,
            "four",
            currentNode.getDepth() + 1
          );

          let four = son.fourMovement(horsePosRed);
          son.sethorsePosRed(four);
          son.moveRed(horsePosRed);

          if (
            currentNode.getStateW()[horsePosRed[0] + 1][horsePosRed[1] + 2] == 3
          ) {
            //llamar funcion para ver cuantos puedo pintar porque cogi bono
            //poner bonos en True
            son.paintBonusRed();
            son.setBonus(true);
          }

          son.setType("min");
          son.setWeight(1000);

          if (son.getDepth() > depth) {
            depth = son.getDepth();
            //// console.log(son.getHorsePosRed()());
          }
          //Es el ultim nodo entonces le debemos calcula la heuristica
          son.searchForHorseGreen();
          // console.log("son estado", son.getStateW());
          // console.log("padre estado", currentNode.getStateW());
          if (
            son.getDepth() == this.nivel ||
            son.optionsMoveGreenFunc(son.getHorsePosGreen()) == 0
          ) {
            let moveComputer = 0;
            let moveHuman = 0;
            let colorHuman = 0;
            let colorComputer = 0;
            let bonus = 0;
            let optionMoveHuman = 0;
            let goal = 0;
            moveComputer = son.optionsMoveRedFunc(son.getHorsePosRed()); //opciones de movimiento del computador
            moveHuman = son.optionsMoveGreenFunc(son.getHorsePosGreen()); //opciones de movimiento del humano
            colorComputer = son.countColorsRedFunc(); //casillas pintadas del computador
            colorHuman = son.countColorsGreenFunc(); //casillas pintadas del humano
            //falta si cogio bono dependiendo de la profundidad sume mas
            bonus = son.getHeuristicBonus();
            // console.log("Bonus heuristic: ", bonus);
            if (
              son.optionsMoveGreenFunc(son.getHorsePosGreen()) == 0 &&
              son.optionsMoveRedFunc(son.getHorsePosRed()) != 0
            ) {
              optionMoveHuman = 12; // se le suma mas porque el humano se quedo sin movimientos
            }
            if (son.isEndMove() && colorComputer > colorHuman) {
              //gano computador
              goal = 100;
            }
            son.setWeight(
              moveComputer -
                moveHuman +
                (colorComputer - colorHuman) +
                bonus +
                optionMoveHuman +
                goal
            );
            son.setCreate(false);
          }
          son.setRound(1);
          stack.unshift(son);
          arrayComplete.push(son);
        }
        //Five
        if (
          !(horsePosRed[0] + 2 > 7) &&
          !(horsePosRed[1] + 1 > 7) &&
          (currentNode.getStateW()[horsePosRed[0] + 2][horsePosRed[1] + 1] ==
            0 ||
            currentNode.getStateW()[horsePosRed[0] + 2][horsePosRed[1] + 1] ==
              3) &&
          currentNode.getCreate()
        ) {
          let son = new Node(
            currentNode.getStateW(),
            currentNode,
            "five",
            currentNode.getDepth() + 1
          );

          let five = son.fiveMovement(horsePosRed);
          son.sethorsePosRed(five);
          son.moveRed(horsePosRed);

          if (
            currentNode.getStateW()[horsePosRed[0] + 2][horsePosRed[1] + 1] == 3
          ) {
            //llamar funcion para ver cuantos puedo pintar porque cogi bono
            //poner bonos en True
            son.paintBonusRed();
            son.setBonus(true);
          }

          son.setType("min");
          son.setWeight(1000);

          if (son.getDepth() > depth) {
            depth = son.getDepth();
            //// console.log(son.getHorsePosRed()());
          }
          //Es el ultim nodo entonces le debemos calcula la heuristica
          son.searchForHorseGreen();
          // console.log("son estado", son.getStateW());
          // console.log("padre estado", currentNode.getStateW());
          if (
            son.getDepth() == this.nivel ||
            son.optionsMoveGreenFunc(son.getHorsePosGreen()) == 0
          ) {
            let moveComputer = 0;
            let moveHuman = 0;
            let colorHuman = 0;
            let colorComputer = 0;
            let bonus = 0;
            let optionMoveHuman = 0;
            let goal = 0;
            moveComputer = son.optionsMoveRedFunc(son.getHorsePosRed()); //opciones de movimiento del computador
            moveHuman = son.optionsMoveGreenFunc(son.getHorsePosGreen()); //opciones de movimiento del humano
            colorComputer = son.countColorsRedFunc(); //casillas pintadas del computador
            colorHuman = son.countColorsGreenFunc(); //casillas pintadas del humano
            //falta si cogio bono dependiendo de la profundidad sume mas
            bonus = son.getHeuristicBonus();
            // console.log("Bonus heuristic: ", bonus);
            if (
              son.optionsMoveGreenFunc(son.getHorsePosGreen()) == 0 &&
              son.optionsMoveRedFunc(son.getHorsePosRed()) != 0
            ) {
              optionMoveHuman = 12; // se le suma mas porque el humano se quedo sin movimientos
            }
            if (son.isEndMove() && colorComputer > colorHuman) {
              //gano computador
              goal = 100;
            }
            son.setWeight(
              moveComputer -
                moveHuman +
                (colorComputer - colorHuman) +
                bonus +
                optionMoveHuman +
                goal
            );
            // console.log("op compu", moveComputer);
            // console.log("op human", moveHuman);
            // console.log("color C", colorComputer);
            // console.log("color H", colorHuman);
            son.setCreate(false);
          }
          son.setRound(1);
          stack.unshift(son);
          arrayComplete.push(son);
        }

        //Six
        if (
          !(horsePosRed[0] + 2 > 7) &&
          !(horsePosRed[1] - 1 < 0) &&
          (currentNode.getStateW()[horsePosRed[0] + 2][horsePosRed[1] - 1] ==
            0 ||
            currentNode.getStateW()[horsePosRed[0] + 2][horsePosRed[1] - 1] ==
              3) &&
          currentNode.getCreate()
        ) {
          let son = new Node(
            currentNode.getStateW(),
            currentNode,
            "six",
            currentNode.getDepth() + 1
          );

          let six = son.sixMovement(horsePosRed);
          son.sethorsePosRed(six);
          son.moveRed(horsePosRed);

          if (
            currentNode.getStateW()[horsePosRed[0] + 2][horsePosRed[1] - 1] == 3
          ) {
            //llamar funcion para ver cuantos puedo pintar porque cogi bono
            //poner bonos en True
            son.paintBonusRed();
            son.setBonus(true);
          }

          son.setType("min");
          son.setWeight(1000);

          if (son.getDepth() > depth) {
            depth = son.getDepth();
            //// console.log(son.getHorsePosRed()());
          }
          //Es el ultim nodo entonces le debemos calcula la heuristica
          son.searchForHorseGreen();
          // console.log("son estado", son.getStateW());
          // console.log("padre estado", currentNode.getStateW());
          if (
            son.getDepth() == this.nivel ||
            son.optionsMoveGreenFunc(son.getHorsePosGreen()) == 0
          ) {
            let moveComputer = 0;
            let moveHuman = 0;
            let colorHuman = 0;
            let colorComputer = 0;
            let bonus = 0;
            let optionMoveHuman = 0;
            let goal = 0;
            moveComputer = son.optionsMoveRedFunc(son.getHorsePosRed()); //opciones de movimiento del computador
            moveHuman = son.optionsMoveGreenFunc(son.getHorsePosGreen()); //opciones de movimiento del humano
            colorComputer = son.countColorsRedFunc(); //casillas pintadas del computador
            colorHuman = son.countColorsGreenFunc(); //casillas pintadas del humano
            //falta si cogio bono dependiendo de la profundidad sume mas
            bonus = son.getHeuristicBonus();
            // console.log("Bonus heuristic: ", bonus);
            if (
              son.optionsMoveGreenFunc(son.getHorsePosGreen()) == 0 &&
              son.optionsMoveRedFunc(son.getHorsePosRed()) != 0
            ) {
              optionMoveHuman = 12; // se le suma mas porque el humano se quedo sin movimientos
            }
            if (son.isEndMove() && colorComputer > colorHuman) {
              //gano computador
              goal = 100;
            }
            son.setWeight(
              moveComputer -
                moveHuman +
                (colorComputer - colorHuman) +
                bonus +
                optionMoveHuman +
                goal
            );
            // console.log("op compu", moveComputer);
            // console.log("op human", moveHuman);
            // console.log("color C", colorComputer);
            // console.log("color H", colorHuman);
            son.setCreate(false);
          }
          son.setRound(1);
          stack.unshift(son);
          arrayComplete.push(son);
        }
        //Seven
        if (
          !(horsePosRed[0] + 1 > 7) &&
          !(horsePosRed[1] - 2 < 0) &&
          (currentNode.getStateW()[horsePosRed[0] + 1][horsePosRed[1] - 2] ==
            0 ||
            currentNode.getStateW()[horsePosRed[0] + 1][horsePosRed[1] - 2] ==
              3) &&
          currentNode.getCreate()
        ) {
          let son = new Node(
            currentNode.getStateW(),
            currentNode,
            "seven",
            currentNode.getDepth() + 1
          );

          let seven = son.sevenMovement(horsePosRed);
          son.sethorsePosRed(seven);
          son.moveRed(horsePosRed);

          if (
            currentNode.getStateW()[horsePosRed[0] + 1][horsePosRed[1] - 2] == 3
          ) {
            //llamar funcion para ver cuantos puedo pintar porque cogi bono
            //poner bonos en True
            son.paintBonusRed();
            son.setBonus(true);
          }

          son.setType("min");
          son.setWeight(1000);

          if (son.getDepth() > depth) {
            depth = son.getDepth();
            //// console.log(son.getHorsePosRed()());
          }
          //Es el ultim nodo entonces le debemos calcula la heuristica
          son.searchForHorseGreen();
          // console.log("son estado", son.getStateW());
          // console.log("padre estado", currentNode.getStateW());
          if (
            son.getDepth() == this.nivel ||
            son.optionsMoveGreenFunc(son.getHorsePosGreen()) == 0
          ) {
            let moveComputer = 0;
            let moveHuman = 0;
            let colorHuman = 0;
            let colorComputer = 0;
            let bonus = 0;
            let optionMoveHuman = 0;
            let goal = 0;
            moveComputer = son.optionsMoveRedFunc(son.getHorsePosRed()); //opciones de movimiento del computador
            moveHuman = son.optionsMoveGreenFunc(son.getHorsePosGreen()); //opciones de movimiento del humano
            colorComputer = son.countColorsRedFunc(); //casillas pintadas del computador
            colorHuman = son.countColorsGreenFunc(); //casillas pintadas del humano
            //falta si cogio bono dependiendo de la profundidad sume mas
            bonus = son.getHeuristicBonus();
            // console.log("Bonus heuristic: ", bonus);
            if (
              son.optionsMoveGreenFunc(son.getHorsePosGreen()) == 0 &&
              son.optionsMoveRedFunc(son.getHorsePosRed()) != 0
            ) {
              optionMoveHuman = 12; // se le suma mas porque el humano se quedo sin movimientos
            }
            if (son.isEndMove() && colorComputer > colorHuman) {
              //gano computador
              goal = 100;
            }
            son.setWeight(
              moveComputer -
                moveHuman +
                (colorComputer - colorHuman) +
                bonus +
                optionMoveHuman +
                goal
            );
            // console.log("op compu", moveComputer);
            // console.log("op human", moveHuman);
            // console.log("color C", colorComputer);
            // console.log("color H", colorHuman);
            son.setCreate(false);
          }
          son.setRound(1);
          stack.unshift(son);
          arrayComplete.push(son);
        }

        //Eight
        if (
          !(horsePosRed[0] - 1 < 0) &&
          !(horsePosRed[1] - 2 < 0) &&
          (currentNode.getStateW()[horsePosRed[0] - 1][horsePosRed[1] - 2] ==
            0 ||
            currentNode.getStateW()[horsePosRed[0] - 1][horsePosRed[1] - 2] ==
              3) &&
          currentNode.getCreate()
        ) {
          let son = new Node(
            currentNode.getStateW(),
            currentNode,
            "eight",
            currentNode.getDepth() + 1
          );

          let eight = son.eightMovement(horsePosRed);
          son.sethorsePosRed(eight);
          son.moveRed(horsePosRed);

          if (
            currentNode.getStateW()[horsePosRed[0] - 1][horsePosRed[1] - 2] == 3
          ) {
            //llamar funcion para ver cuantos puedo pintar porque cogi bono
            //poner bonos en True
            son.paintBonusRed();
            son.setBonus(true);
          }

          son.setType("min");
          son.setWeight(1000);

          if (son.getDepth() > depth) {
            depth = son.getDepth();
            //// console.log(son.getHorsePosRed()());
          }
          //Es el ultim nodo entonces le debemos calcula la heuristica
          son.searchForHorseGreen();
          // console.log("son estado", son.getStateW());
          // console.log("padre estado", currentNode.getStateW());
          if (
            son.getDepth() == this.nivel ||
            son.optionsMoveGreenFunc(son.getHorsePosGreen()) == 0
          ) {
            let moveComputer = 0;
            let moveHuman = 0;
            let colorHuman = 0;
            let colorComputer = 0;
            let bonus = 0;
            let optionMoveHuman = 0;
            let goal = 0;
            moveComputer = son.optionsMoveRedFunc(son.getHorsePosRed()); //opciones de movimiento del computador
            moveHuman = son.optionsMoveGreenFunc(son.getHorsePosGreen()); //opciones de movimiento del humano
            colorComputer = son.countColorsRedFunc(); //casillas pintadas del computador
            colorHuman = son.countColorsGreenFunc(); //casillas pintadas del humano
            //falta si cogio bono dependiendo de la profundidad sume mas
            bonus = son.getHeuristicBonus();
            // console.log("Bonus heuristic: ", bonus);
            if (
              son.optionsMoveGreenFunc(son.getHorsePosGreen()) == 0 &&
              son.optionsMoveRedFunc(son.getHorsePosRed()) != 0
            ) {
              optionMoveHuman = 12; // se le suma mas porque el humano se quedo sin movimientos
            }
            if (son.isEndMove() && colorComputer > colorHuman) {
              //gano computador
              goal = 100;
            }
            son.setWeight(
              moveComputer -
                moveHuman +
                (colorComputer - colorHuman) +
                bonus +
                optionMoveHuman +
                goal
            );
            // console.log("op compu", moveComputer);
            // console.log("op human", moveHuman);
            // console.log("color C", colorComputer);
            // console.log("color H", colorHuman);
            son.setCreate(false);
          }
          son.setRound(1);
          stack.unshift(son);
          arrayComplete.push(son);
        }
      } else {
        //le toca al humano
        //One
        // console.log("aqui no");
        if (
          !(horsePosGreen[0] - 2 < 0) &&
          !(horsePosGreen[1] - 1 < 0) &&
          (currentNode.getStateW()[horsePosGreen[0] - 2][
            horsePosGreen[1] - 1
          ] == 0 ||
            currentNode.getStateW()[horsePosGreen[0] - 2][
              horsePosGreen[1] - 1
            ] == 3) &&
          currentNode.getCreate()
        ) {
          let son = new Node(
            currentNode.getStateW(),
            currentNode,
            "one",
            currentNode.getDepth() + 1
          );

          let one = son.oneMovement(horsePosGreen);
          son.sethorsePosGreen(one);
          son.moveGreen(horsePosGreen);

          if (
            currentNode.getStateW()[horsePosGreen[0] - 2][
              horsePosGreen[1] - 1
            ] == 3
          ) {
            //llamar funcion para ver cuantos puedo pintar porque cogi bono
            son.paintBonusGreen();
          }

          son.setType("max");
          son.setWeight(-1000);

          if (son.getDepth() > depth) {
            depth = son.getDepth();
            //// console.log(son.getHorsePosGreen()());
          }
          //Es el ultim nodo entonces le debemos calcula la heuristica
          if (son.getDepth() == this.nivel) {
          }
          //Es el ultim nodo entonces le debemos calcula la heuristica
          son.searchForHorseRed();
          // console.log("son estado", son.getStateW());
          // console.log("padre estado", currentNode.getStateW());
          if (
            son.getDepth() == this.nivel ||
            son.optionsMoveRedFunc(son.getHorsePosRed()) == 0
          ) {
            let moveComputer = 0;
            let moveHuman = 0;
            let colorHuman = 0;
            let colorComputer = 0;
            let bonus = 0;
            let optionMoveComputer = 0;
            let goalH = 0;
            moveComputer = son.optionsMoveRedFunc(son.getHorsePosRed()); //opciones de movimiento del computador
            moveHuman = son.optionsMoveGreenFunc(son.getHorsePosGreen()); //opciones de movimiento del humano
            colorComputer = son.countColorsRedFunc(); //casillas pintadas del computador
            colorHuman = son.countColorsGreenFunc(); //casillas pintadas del humano
            //falta si cogio bono dependiendo de la profundidad sume mas
            bonus = son.getHeuristicBonus();
            // console.log("Bonus heuristic: ", bonus);
            if (
              son.optionsMoveRedFunc(son.getHorsePosRed()) == 0 &&
              son.optionsMoveGreenFunc(son.getHorsePosGreen()) != 0
            ) {
              optionMoveComputer = 6;
            }
            if (son.isEndMove() && colorHuman > colorComputer) {
              //gano humano
              goalH = 100;
            }
            son.setWeight(
              moveComputer -
                moveHuman +
                (colorComputer - colorHuman) +
                bonus -
                optionMoveComputer -
                goalH
            );
            // console.log("op compu", moveComputer);
            // console.log("op human", moveHuman);
            // console.log("color C", colorComputer);
            // console.log("color H", colorHuman);
            son.setCreate(false);
          }
          son.setRound(0);
          stack.unshift(son);
          arrayComplete.push(son);
        }

        //Two
        if (
          !(horsePosGreen[0] - 2 < 0) &&
          !(horsePosGreen[1] + 1 > 7) &&
          (currentNode.getStateW()[horsePosGreen[0] - 2][
            horsePosGreen[1] + 1
          ] == 0 ||
            currentNode.getStateW()[horsePosGreen[0] - 2][
              horsePosGreen[1] + 1
            ] == 3) &&
          currentNode.getCreate()
        ) {
          let son = new Node(
            currentNode.getStateW(),
            currentNode,
            "two",
            currentNode.getDepth() + 1
          );

          let two = son.twoMovement(horsePosGreen);
          son.sethorsePosGreen(two);
          son.moveGreen(horsePosGreen);

          if (
            currentNode.getStateW()[horsePosGreen[0] - 2][
              horsePosGreen[1] + 1
            ] == 3
          ) {
            //llamar funcion para ver cuantos puedo pintar porque cogi bono
            son.paintBonusGreen();
          }

          son.setType("max");
          son.setWeight(-1000);

          if (son.getDepth() > depth) {
            depth = son.getDepth();
            //// console.log(son.getHorsePosGreen()());
          }
          //Es el ultim nodo entonces le debemos calcula la heuristica
          son.searchForHorseRed();
          // console.log("son estado", son.getStateW());
          // console.log("padre estado", currentNode.getStateW());
          if (
            son.getDepth() == this.nivel ||
            son.optionsMoveRedFunc(son.getHorsePosRed()) == 0
          ) {
            let moveComputer = 0;
            let moveHuman = 0;
            let colorHuman = 0;
            let colorComputer = 0;
            let bonus = 0;
            let optionMoveComputer = 0;
            let goalH = 0;
            moveComputer = son.optionsMoveRedFunc(son.getHorsePosRed()); //opciones de movimiento del computador
            moveHuman = son.optionsMoveGreenFunc(son.getHorsePosGreen()); //opciones de movimiento del humano
            colorComputer = son.countColorsRedFunc(); //casillas pintadas del computador
            colorHuman = son.countColorsGreenFunc(); //casillas pintadas del humano
            //falta si cogio bono dependiendo de la profundidad sume mas
            bonus = son.getHeuristicBonus();
            // console.log("Bonus heuristic: ", bonus);
            if (
              son.optionsMoveRedFunc(son.getHorsePosRed()) == 0 &&
              son.optionsMoveGreenFunc(son.getHorsePosGreen()) != 0
            ) {
              optionMoveComputer = 6;
            }
            if (son.isEndMove() && colorHuman > colorComputer) {
              //gano humano
              goalH = 100;
            }
            son.setWeight(
              moveComputer -
                moveHuman +
                (colorComputer - colorHuman) +
                bonus -
                optionMoveComputer -
                goalH
            );
            // console.log("op compu", moveComputer);
            // console.log("op human", moveHuman);
            // console.log("color C", colorComputer);
            // console.log("color H", colorHuman);
            son.setCreate(false);
          }
          son.setRound(0);
          stack.unshift(son);
          arrayComplete.push(son);
        }

        //Three
        if (
          !(horsePosGreen[0] - 1 < 0) &&
          !(horsePosGreen[1] + 2 > 7) &&
          (currentNode.getStateW()[horsePosGreen[0] - 1][
            horsePosGreen[1] + 2
          ] == 0 ||
            currentNode.getStateW()[horsePosGreen[0] - 1][
              horsePosGreen[1] + 2
            ] == 3) &&
          currentNode.getCreate()
        ) {
          let son = new Node(
            currentNode.getStateW(),
            currentNode,
            "three",
            currentNode.getDepth() + 1
          );

          let three = son.threeMovement(horsePosGreen);
          son.sethorsePosGreen(three);
          son.moveGreen(horsePosGreen);

          if (
            currentNode.getStateW()[horsePosGreen[0] - 1][
              horsePosGreen[1] + 2
            ] == 3
          ) {
            //llamar funcion para ver cuantos puedo pintar porque cogi bono
            son.paintBonusGreen();
          }

          son.setType("max");
          son.setWeight(-1000);

          if (son.getDepth() > depth) {
            depth = son.getDepth();
            //// console.log(son.getHorsePosGreen()());
          }
          //Es el ultim nodo entonces le debemos calcula la heuristica
          son.searchForHorseRed();
          // console.log("son estado", son.getStateW());
          // console.log("padre estado", currentNode.getStateW());
          if (
            son.getDepth() == this.nivel ||
            son.optionsMoveRedFunc(son.getHorsePosRed()) == 0
          ) {
            let moveComputer = 0;
            let moveHuman = 0;
            let colorHuman = 0;
            let colorComputer = 0;
            let bonus = 0;
            let optionMoveComputer = 0;
            let goalH = 0;
            moveComputer = son.optionsMoveRedFunc(son.getHorsePosRed()); //opciones de movimiento del computador
            moveHuman = son.optionsMoveGreenFunc(son.getHorsePosGreen()); //opciones de movimiento del humano
            colorComputer = son.countColorsRedFunc(); //casillas pintadas del computador
            colorHuman = son.countColorsGreenFunc(); //casillas pintadas del humano
            //falta si cogio bono dependiendo de la profundidad sume mas
            bonus = son.getHeuristicBonus();
            // console.log("Bonus heuristic: ", bonus);
            if (
              son.optionsMoveRedFunc(son.getHorsePosRed()) == 0 &&
              son.optionsMoveGreenFunc(son.getHorsePosGreen()) != 0
            ) {
              optionMoveComputer = 6;
            }
            if (son.isEndMove() && colorHuman > colorComputer) {
              //gano humano
              goalH = 100;
            }
            son.setWeight(
              moveComputer -
                moveHuman +
                (colorComputer - colorHuman) +
                bonus -
                optionMoveComputer -
                goalH
            );
            // console.log("op compu", moveComputer);
            // console.log("op human", moveHuman);
            // console.log("color C", colorComputer);
            // console.log("color H", colorHuman);
            son.setCreate(false);
          }
          son.setRound(0);
          stack.unshift(son);
          arrayComplete.push(son);
        }

        //Four
        if (
          !(horsePosGreen[0] + 1 > 7) &&
          !(horsePosGreen[1] + 2 > 7) &&
          (currentNode.getStateW()[horsePosGreen[0] + 1][
            horsePosGreen[1] + 2
          ] == 0 ||
            currentNode.getStateW()[horsePosGreen[0] + 1][
              horsePosGreen[1] + 2
            ] == 3) &&
          currentNode.getCreate()
        ) {
          let son = new Node(
            currentNode.getStateW(),
            currentNode,
            "four",
            currentNode.getDepth() + 1
          );

          let four = son.fourMovement(horsePosGreen);
          son.sethorsePosGreen(four);
          son.moveGreen(horsePosGreen);

          if (
            currentNode.getStateW()[horsePosGreen[0] + 1][
              horsePosGreen[1] + 2
            ] == 3
          ) {
            //llamar funcion para ver cuantos puedo pintar porque cogi bono
            son.paintBonusGreen();
          }

          son.setType("max");
          son.setWeight(-1000);

          if (son.getDepth() > depth) {
            depth = son.getDepth();
            //// console.log(son.getHorsePosGreen()());
          }
          //Es el ultim nodo entonces le debemos calcula la heuristica
          son.searchForHorseRed();
          // console.log("son estado", son.getStateW());
          // console.log("padre estado", currentNode.getStateW());
          if (
            son.getDepth() == this.nivel ||
            son.optionsMoveRedFunc(son.getHorsePosRed()) == 0
          ) {
            let moveComputer = 0;
            let moveHuman = 0;
            let colorHuman = 0;
            let colorComputer = 0;
            let bonus = 0;
            let optionMoveComputer = 0;
            let goalH = 0;
            moveComputer = son.optionsMoveRedFunc(son.getHorsePosRed()); //opciones de movimiento del computador
            moveHuman = son.optionsMoveGreenFunc(son.getHorsePosGreen()); //opciones de movimiento del humano
            colorComputer = son.countColorsRedFunc(); //casillas pintadas del computador
            colorHuman = son.countColorsGreenFunc(); //casillas pintadas del humano
            //falta si cogio bono dependiendo de la profundidad sume mas
            bonus = son.getHeuristicBonus();
            // console.log("Bonus heuristic: ", bonus);
            if (
              son.optionsMoveRedFunc(son.getHorsePosRed()) == 0 &&
              son.optionsMoveGreenFunc(son.getHorsePosGreen()) != 0
            ) {
              optionMoveComputer = 6;
            }
            if (son.isEndMove() && colorHuman > colorComputer) {
              //gano humano
              goalH = 100;
            }
            son.setWeight(
              moveComputer -
                moveHuman +
                (colorComputer - colorHuman) +
                bonus -
                optionMoveComputer -
                goalH
            );
            // console.log("op compu", moveComputer);
            // console.log("op human", moveHuman);
            // console.log("color C", colorComputer);
            // console.log("color H", colorHuman);
            son.setCreate(false);
          }
          son.setRound(0);
          stack.unshift(son);
          arrayComplete.push(son);
        }
        //Five
        if (
          !(horsePosGreen[0] + 2 > 7) &&
          !(horsePosGreen[1] + 1 > 7) &&
          (currentNode.getStateW()[horsePosGreen[0] + 2][
            horsePosGreen[1] + 1
          ] == 0 ||
            currentNode.getStateW()[horsePosGreen[0] + 2][
              horsePosGreen[1] + 1
            ] == 3) &&
          currentNode.getCreate()
        ) {
          let son = new Node(
            currentNode.getStateW(),
            currentNode,
            "five",
            currentNode.getDepth() + 1
          );

          let five = son.fiveMovement(horsePosGreen);
          son.sethorsePosGreen(five);
          son.moveGreen(horsePosGreen);

          if (
            currentNode.getStateW()[horsePosGreen[0] + 2][
              horsePosGreen[1] + 1
            ] == 3
          ) {
            //llamar funcion para ver cuantos puedo pintar porque cogi bono
            son.paintBonusGreen();
          }

          son.setType("max");
          son.setWeight(-1000);

          if (son.getDepth() > depth) {
            depth = son.getDepth();
            //// console.log(son.getHorsePosGreen()());
          }
          //Es el ultim nodo entonces le debemos calcula la heuristica
          son.searchForHorseRed();
          // console.log("son estado", son.getStateW());
          // console.log("padre estado", currentNode.getStateW());
          if (
            son.getDepth() == this.nivel ||
            son.optionsMoveRedFunc(son.getHorsePosRed()) == 0
          ) {
            let moveComputer = 0;
            let moveHuman = 0;
            let colorHuman = 0;
            let colorComputer = 0;
            let bonus = 0;
            let optionMoveComputer = 0;
            let goalH = 0;
            moveComputer = son.optionsMoveRedFunc(son.getHorsePosRed()); //opciones de movimiento del computador
            moveHuman = son.optionsMoveGreenFunc(son.getHorsePosGreen()); //opciones de movimiento del humano
            colorComputer = son.countColorsRedFunc(); //casillas pintadas del computador
            colorHuman = son.countColorsGreenFunc(); //casillas pintadas del humano
            //falta si cogio bono dependiendo de la profundidad sume mas
            bonus = son.getHeuristicBonus();
            // console.log("Bonus heuristic: ", bonus);
            if (
              son.optionsMoveRedFunc(son.getHorsePosRed()) == 0 &&
              son.optionsMoveGreenFunc(son.getHorsePosGreen()) != 0
            ) {
              optionMoveComputer = 6;
            }
            if (son.isEndMove() && colorHuman > colorComputer) {
              //gano humano
              goalH = 100;
            }
            son.setWeight(
              moveComputer -
                moveHuman +
                (colorComputer - colorHuman) +
                bonus -
                optionMoveComputer -
                goalH
            );
            // console.log("op compu", moveComputer);
            // console.log("op human", moveHuman);
            // console.log("color C", colorComputer);
            // console.log("color H", colorHuman);
            son.setCreate(false);
          }
          son.setRound(0);
          stack.unshift(son);
          arrayComplete.push(son);
        }

        //Six
        if (
          !(horsePosGreen[0] + 2 > 7) &&
          !(horsePosGreen[1] - 1 < 0) &&
          (currentNode.getStateW()[horsePosGreen[0] + 2][
            horsePosGreen[1] - 1
          ] == 0 ||
            currentNode.getStateW()[horsePosGreen[0] + 2][
              horsePosGreen[1] - 1
            ] == 3) &&
          currentNode.getCreate()
        ) {
          let son = new Node(
            currentNode.getStateW(),
            currentNode,
            "six",
            currentNode.getDepth() + 1
          );

          let six = son.sixMovement(horsePosGreen);
          son.sethorsePosGreen(six);
          son.moveGreen(horsePosGreen);

          if (
            (currentNode.getStateW()[horsePosGreen[0] + 2],
            [horsePosGreen[1] - 1] == 3)
          ) {
            //llamar funcion para ver cuantos puedo pintar porque cogi bono
            son.paintBonusGreen();
          }

          son.setType("max");
          son.setWeight(-1000);

          if (son.getDepth() > depth) {
            depth = son.getDepth();
            //// console.log(son.getHorsePosGreen()());
          }
          //Es el ultim nodo entonces le debemos calcula la heuristica
          son.searchForHorseRed();
          // console.log("son estado", son.getStateW());
          // console.log("padre estado", currentNode.getStateW());
          if (
            son.getDepth() == this.nivel ||
            son.optionsMoveRedFunc(son.getHorsePosRed()) == 0
          ) {
            let moveComputer = 0;
            let moveHuman = 0;
            let colorHuman = 0;
            let colorComputer = 0;
            let bonus = 0;
            let optionMoveComputer = 0;
            let goalH = 0;
            moveComputer = son.optionsMoveRedFunc(son.getHorsePosRed()); //opciones de movimiento del computador
            moveHuman = son.optionsMoveGreenFunc(son.getHorsePosGreen()); //opciones de movimiento del humano
            colorComputer = son.countColorsRedFunc(); //casillas pintadas del computador
            colorHuman = son.countColorsGreenFunc(); //casillas pintadas del humano
            //falta si cogio bono dependiendo de la profundidad sume mas
            bonus = son.getHeuristicBonus();
            // console.log("Bonus heuristic: ", bonus);
            if (
              son.optionsMoveRedFunc(son.getHorsePosRed()) == 0 &&
              son.optionsMoveGreenFunc(son.getHorsePosGreen()) != 0
            ) {
              optionMoveComputer = 6;
            }
            if (son.isEndMove() && colorHuman > colorComputer) {
              //gano humano
              goalH = 100;
            }
            son.setWeight(
              moveComputer -
                moveHuman +
                (colorComputer - colorHuman) +
                bonus -
                optionMoveComputer -
                goalH
            );
            // console.log("op compu", moveComputer);
            // console.log("op human", moveHuman);
            // console.log("color C", colorComputer);
            // console.log("color H", colorHuman);
            son.setCreate(false);
          }
          son.setRound(0);
          stack.unshift(son);
          arrayComplete.push(son);
        }
        //Seven
        if (
          !(horsePosGreen[0] + 1 > 7) &&
          !(horsePosGreen[1] - 2 < 0) &&
          (currentNode.getStateW()[horsePosGreen[0] + 1][
            horsePosGreen[1] - 2
          ] == 0 ||
            currentNode.getStateW()[horsePosGreen[0] + 1][
              horsePosGreen[1] - 2
            ] == 3) &&
          currentNode.getCreate()
        ) {
          let son = new Node(
            currentNode.getStateW(),
            currentNode,
            "seven",
            currentNode.getDepth() + 1
          );

          let seven = son.sevenMovement(horsePosGreen);
          son.sethorsePosGreen(seven);
          son.moveGreen(horsePosGreen);

          if (
            currentNode.getStateW()[horsePosGreen[0] + 1][
              horsePosGreen[1] - 2
            ] == 3
          ) {
            //llamar funcion para ver cuantos puedo pintar porque cogi bono
            son.paintBonusGreen();
          }

          son.setType("max");
          son.setWeight(-1000);

          if (son.getDepth() > depth) {
            depth = son.getDepth();
            //// console.log(son.getHorsePosGreen()());
          }
          //Es el ultim nodo entonces le debemos calcula la heuristica
          son.searchForHorseRed();
          // console.log("son estado", son.getStateW());
          // console.log("padre estado", currentNode.getStateW());
          if (
            son.getDepth() == this.nivel ||
            son.optionsMoveRedFunc(son.getHorsePosRed()) == 0
          ) {
            let moveComputer = 0;
            let moveHuman = 0;
            let colorHuman = 0;
            let colorComputer = 0;
            let bonus = 0;
            let optionMoveComputer = 0;
            let goalH = 0;
            moveComputer = son.optionsMoveRedFunc(son.getHorsePosRed()); //opciones de movimiento del computador
            moveHuman = son.optionsMoveGreenFunc(son.getHorsePosGreen()); //opciones de movimiento del humano
            colorComputer = son.countColorsRedFunc(); //casillas pintadas del computador
            colorHuman = son.countColorsGreenFunc(); //casillas pintadas del humano
            //falta si cogio bono dependiendo de la profundidad sume mas
            bonus = son.getHeuristicBonus();
            // console.log("Bonus heuristic: ", bonus);
            if (
              son.optionsMoveRedFunc(son.getHorsePosRed()) == 0 &&
              son.optionsMoveGreenFunc(son.getHorsePosGreen()) != 0
            ) {
              optionMoveComputer = 6;
            }
            if (son.isEndMove() && colorHuman > colorComputer) {
              //gano humano
              goalH = 100;
            }
            son.setWeight(
              moveComputer -
                moveHuman +
                (colorComputer - colorHuman) +
                bonus -
                optionMoveComputer -
                goalH
            );
            // console.log("op compu", moveComputer);
            // console.log("op human", moveHuman);
            // console.log("color C", colorComputer);
            // console.log("color H", colorHuman);
            son.setCreate(false);
          }
          son.setRound(0);
          stack.unshift(son);
          arrayComplete.push(son);
        }

        //Eight
        if (
          !(horsePosGreen[0] - 1 < 0) &&
          !(horsePosGreen[1] - 2 < 0) &&
          (currentNode.getStateW()[horsePosGreen[0] - 1][
            horsePosGreen[1] - 2
          ] == 0 ||
            currentNode.getStateW()[horsePosGreen[0] - 1][
              horsePosGreen[1] - 2
            ] == 3) &&
          currentNode.getCreate()
        ) {
          let son = new Node(
            currentNode.getStateW(),
            currentNode,
            "eight",
            currentNode.getDepth() + 1
          );

          let eight = son.eightMovement(horsePosGreen);
          son.sethorsePosGreen(eight);
          son.moveGreen(horsePosGreen);

          if (
            currentNode.getStateW()[horsePosGreen[0] - 1][
              horsePosGreen[1] - 2
            ] == 3
          ) {
            //llamar funcion para ver cuantos puedo pintar porque cogi bono
            son.paintBonusGreen();
          }

          son.setType("max");
          son.setWeight(-1000);

          if (son.getDepth() > depth) {
            depth = son.getDepth();
            //// console.log(son.getHorsePosGreen()());
          }
          //Es el ultim nodo entonces le debemos calcula la heuristica
          son.searchForHorseRed();
          // console.log("son estado", son.getStateW());
          // console.log("padre estado", currentNode.getStateW());
          if (
            son.getDepth() == this.nivel ||
            son.optionsMoveRedFunc(son.getHorsePosRed()) == 0
          ) {
            let moveComputer = 0;
            let moveHuman = 0;
            let colorHuman = 0;
            let colorComputer = 0;
            let bonus = 0;
            let optionMoveComputer = 0;
            let goalH = 0;
            moveComputer = son.optionsMoveRedFunc(son.getHorsePosRed()); //opciones de movimiento del computador
            moveHuman = son.optionsMoveGreenFunc(son.getHorsePosGreen()); //opciones de movimiento del humano
            colorComputer = son.countColorsRedFunc(); //casillas pintadas del computador
            colorHuman = son.countColorsGreenFunc(); //casillas pintadas del humano
            //falta si cogio bono dependiendo de la profundidad sume mas
            bonus = son.getHeuristicBonus();
            // console.log("Bonus heuristic: ", bonus);
            if (
              son.optionsMoveRedFunc(son.getHorsePosRed()) == 0 &&
              son.optionsMoveGreenFunc(son.getHorsePosGreen()) != 0
            ) {
              optionMoveComputer = 6;
            }
            if (son.isEndMove() && colorHuman > colorComputer) {
              //gano humano
              goalH = 100;
            }
            son.setWeight(
              moveComputer -
                moveHuman +
                (colorComputer - colorHuman) +
                bonus -
                optionMoveComputer -
                goalH
            );
            // console.log("op compu", moveComputer);
            // console.log("op human", moveHuman);
            // console.log("color C", colorComputer);
            // console.log("color H", colorHuman);
            son.setCreate(false);
          }
          son.setRound(0);
          stack.unshift(son);
          arrayComplete.push(son);
        }
      }
      currentNode = stack[0];
      nivelGame++;
    }
    //Aquí
    console.log("Inicia decisionMinMax: ");
    console.log("len arrayComplete: ", arrayComplete.length);
    let resultado = this.decisionMinMax(arrayComplete.reverse());
    console.log("Termina decisionMinMax");
    console.log("Inicia finalMove");
    return this.finalMove(resultado[1], resultado[0]);
  }
}
