import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import {Header} from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import db from './words'

export default class App extends React.Component {

  constructor(){
    super()
    this.state = {
      text : "",
      isSearchPressed : false,
      word : "",
      lexicalCategory : "",
      examples : [],
      definiton : ""
    }
  }

  getWord = (keyWord) => {
    var searchKeyword = keyWord.toLowerCase();
      if(db[searchKeyword]){
        var word = db[searchKeyword].word
        var definition = db[searchKeyword].definition
        var lexicalCategory = db[searchKeyword].lexicalCategory

        this.setState({
          'word': word,
          'lexicalCategory': lexicalCategory,
          'definiton' : definition
        })

        console.log(this.state)
      } else{
        this.setState({
          "word" : this.state.text,
          "definiton" : "Not Found!"
        })
      }
    }

  render() {
    return (
      <SafeAreaProvider style={styles.container}>
        <Header
        background = {'#FF00FF'}
        centerComponent = {{
          text : 'Pocket Dictionary',
          style : {color:'#FFFF00', fontSize: 22}
        }} />

        <TextInput 
          style={styles.inputBox}
          onChangeText = {(text) => {
            this.setState({
              text : text,
              isSearchPressed : false,
              word : "Loading...",
              lexicalCategory : "",
              examples : [],
              definiton : ""

              })
          }}
        />

        <TouchableOpacity
        style = {styles.buttonStyle}
        onPress = {() => {
          this.setState({isSearchPressed: true})
          this.getWord(this.state.text)}
          }
        > SEARCH</TouchableOpacity>



        <View style={styles.contentView}>
          <Text style={[styles.title, {fontWeight : "bold", color: "#cc7722",}]}>Word: </Text> 
          <Text style={styles.title}> {this.state.isSearchPressed?this.state.word:""} </Text>
        </View>
        <View style={styles.contentView}>
          <Text style={[styles.title, {fontWeight : "bold", color: "#cc7722",}]}>Type: </Text> 
          <Text style={styles.title}> {this.state.lexicalCategory} </Text>
        </View>
        <View style={styles.contentView}>
          <Text style={[styles.title, {fontWeight : "bold", color: "#cc7722",}]}>Definition: </Text> 
          <Text style={styles.title}> {(this.state.definiton)} </Text>
        </View>


      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: '#b8b8b8',
  },
  inputBox : {
    height: 40, 
    borderColor: 'white', 
    borderWidth: 5,
    margin: 20,
    padding : 7
  },
  buttonStyle : {
    backgroundColor: "green",
    borderWidth: 5,
    borderColor: "white",
    marginVertical: 10,
    marginHorizontal: 100,
    textAlign: "center",
    color:"yellow",
    padding: 15,
    fontSize: 24
  },
  title : {
    fontSize : 18,
    marginVertical: 0

  },

  contentView: {
    paddingLeft: 10,
    flexDirection:'row',
    flexWrap:'wrap',
    marginVertical: 10,
    marginLeft:15
},
  
});
