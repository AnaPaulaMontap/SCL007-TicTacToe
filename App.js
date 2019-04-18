import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Alert , Button, Text} from 'react-native';
import Cirle from './componentes/circle';
import Cross from './componentes/cross';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      gameState: [
        [0,0,0],
        [0,0,0],
        [0,0,0],
      ],
      playerTurn: 1,
    }

    this.initialGame = this.initialGame.bind(this)
    this.renderSquare = this.renderSquare.bind(this)
    this.squarePress = this.squarePress.bind(this)
  }
    
  componentDidMount(){
    this.initialGame()
  }

  initialGame () {
    this.setState({
      ...this.state,
      gameState: [
        [0,0,0],
        [0,0,0],
        [0,0,0],
      ]
    })
  }

  renderSquare (row, col) {
    
    const value = this.state.gameState[row][col];
    switch (value){
      case 1: return <Cirle/>;
      case -1: return <Cross/>;
      default: return <View/>;
    }

  }

  squarePress (row, col){
    const value = this.state.gameState[row][col]
    if ( value != 0) {return  null;}

    //Jugador 1
    const player = this.state.playerTurn;
    const arr = this.state.gameState.slice();
    arr[row][col] = player;
    this.setState({
      gameState: arr,
    })

    //Jugador 2

    const playerTwo = ( player == 1 ) ? -1 : 1;
    this.setState({
      playerTurn: playerTwo,
    })

    // Ganador
    let winner = this.winner()
    if(winner == 1) { Alert.alert('Ganador Jugador O'); this.initialGame()}
    else if(winner == -1) { Alert.alert('Ganador Jugador X'); this.initialGame()}
  }

  winner () {
    //const numberWin = 3; 
    let sum; 

    //Filas
    for ( let i=0; i<3; i++){
      sum = this.state.gameState[i][0] + this.state.gameState[i][1] + this.state.gameState[i][2]
      if( sum == 3) {return 1}
      else if ( sum == -3) {return -1}
    }

    // Columnas 

    for ( let i=0; i<3; i++){
      sum = this.state.gameState[0][i] + this.state.gameState[1][i] + this.state.gameState[2][i]
      if( sum == 3) {return 1}
      else if ( sum == -3) {return -1}
    }

    // Diagonales

    sum = this.state.gameState[0][0] + this.state.gameState[1][1] + this.state.gameState[2][2]
    if( sum == 3) {return 1}
    else if ( sum == -3) {return -1}

    sum = this.state.gameState[2][0] + this.state.gameState[1][1] + this.state.gameState[0][2]
    if( sum == 3) {return 1}
    else if ( sum == -3) {return -1}    

    // Empate

    return 0;

  }


  render() {

    return (
      <View style={styles.container}>
      <Text style={styles.title}>
          Bienvenidos a Tic Tac Toe
        </Text>
        <View style={{flexDirection:'row'}}>
           <TouchableOpacity onPress={()=> this.squarePress(0,0)} style={styles.gameBorder}>
           {this.renderSquare(0,0)}
           </TouchableOpacity>
           <TouchableOpacity onPress={()=> this.squarePress(0,1)} style={styles.gameBorder}>
           {this.renderSquare(0,1)}
            </TouchableOpacity>
           <TouchableOpacity onPress={()=> this.squarePress(0,2)} style={styles.gameBorder}>
           {this.renderSquare(0,2)}
           </TouchableOpacity>
        </View>
            <View style={{flexDirection:'row'}}>
            <TouchableOpacity onPress={()=> this.squarePress(1,0)} style={styles.gameBorder}>
            {this.renderSquare(1,0)}
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> this.squarePress(1,1)} style={styles.gameBorder}>
            {this.renderSquare(1,1)}
            </TouchableOpacity>
            <TouchableOpacity  onPress={()=> this.squarePress(1,2)} style={styles.gameBorder}>
            {this.renderSquare(1,2)}
            </TouchableOpacity>
        </View>
        <View style={{flexDirection:'row'}}>
            <TouchableOpacity  onPress={()=> this.squarePress(2,0)}style={styles.gameBorder}>
            {this.renderSquare(2,0)}
            </TouchableOpacity>
            <TouchableOpacity  onPress={()=> this.squarePress(2,1)} style={styles.gameBorder}>
            {this.renderSquare(2,1)}
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> this.squarePress(2,2)} style={styles.gameBorder}>
            {this.renderSquare(2,2)}
            </TouchableOpacity>
        </View>
        <View style={styles.newGame}/>
        <Button title="Comenzar Nuevo Juego" onPress={()=> this.initialGame()} ></Button>
      </View>
          )
      
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#F5FCFF',
    justifyContent: 'center'
  },
  title: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 23,
    textAlign: 'center',
    flexDirection: 'row',
    marginBottom: 10,
    padding:10,
  },
  gameBorder: {
    borderWidth: 3,
    width: 120,
    height: 120
  },
  newGame:{
    paddingTop: 10,
  }
})

