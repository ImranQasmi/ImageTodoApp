import React, { Component } from 'react'
import Camera from './Camera';


// import React from 'react';
import Note from './Note';
import {
     StyleSheet,
     Text, 
     View,
     TextInput,
     ScrollView,
     TouchableOpacity 
    } from 'react-native';

export default class Main extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            noteArray: [],
            photoArray: [],
            noteText : '',
            openCamera: false,
        }
    }

    handleCapturePhoto = (uri) =>{

      var d = new Date();
      this.state.photoArray.push({
          'date': d.getFullYear() +
          '-' + (d.getMonth() + 1) +
          '-' + d.getDate(),
          'uri' : uri,
      });

      this.setState({photoArray : this.state.photoArray, openCamera: false});

    }

    handleOpenCamera = () =>{
      this.setState({openCamera: true})
    }
    render() {
      console.log("photoArray", this.state.photoArray);
        let notes = this.state.photoArray.map((val , key) =>{
            return <Note key={key} keyval ={key} val={val}
                    deleteMethod={ ()=> this.deleteNote(key)}/>
        });

        const { openCamera } = this.state;

      
        return (
            <View style={styles.container}>
              {
                openCamera ? <Camera handleCapturePhoto={this.handleCapturePhoto}/>
              :
              <View style={styles.container}>
                <View style={styles.header}>
                      <Text style={styles.headerText}>TODO LIST</Text>
                  </View>

                  <ScrollView style={styles.scrollContainer}>
                      {notes}
                  </ScrollView>

                  {/* <View style={styles.footer}>
                      <TextInput
                        style={styles.textInput}
                        onChangeText={(noteText) => this.setState({noteText})}
                        value={this.state.noteText}
                        placeholder="input"
                        placeholderTextColo="white"
                        underlineColorAndroid="transparent">
                      </TextInput>
                  </View> */}

                  <TouchableOpacity onPress={this.handleOpenCamera} style={styles.addButton}>
                      <Text style={styles.addButtonText}>+</Text>
                  </TouchableOpacity>
              </View>
            }
          </View>
        )
    }

    addNote(){
        
        if(this.state.noteText){
            var d = new Date();
            this.state.noteArray.push({
                'date': d.getFullYear() +
                '-' + (d.getMonth() + 1) +
                '-' + d.getDate(),
                'note' : this.state.photoArray,
            });

            this.setState({photoArray : this.state.photoArray})
            this.setState({noteText : ''});
        }
    }

    deleteNote(key){
        this.state.photoArray.splice(key,1);
        this.setState({ photoArray : this.state.photoArray})
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    header: {
      paddingTop : 30,  
      backgroundColor: "#E91E63",
      alignItems: "center",
      justifyContent: "center",
      borderBottomWidth: 10,
      borderBottomColor: "#ddd",
    },
    headerText: {
      color: "white",
      fontSize: 30,
      padding: 26
    },
    scrollContainer: {
      flex: 1,
      marginBottom: 100
    },
    footer: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 10
    },
    textInput: {
      alignSelf: "stretch",
      color: "#fff",
      padding: 20,
      backgroundColor: "#252525",
      borderTopWidth: 2,
      borderTopColor: "#ededed"
    },
    addButton: {
      position: "absolute",
      zIndex: 11,
      right: 20,
      bottom: 10,
      backgroundColor: "#e91e63",
      width: 90,
      height: 90,
      borderRadius: 59,
      alignItems: "center",
      justifyContent: "center",
      elevation: 8
    },
    addButtonText: {
      color: "#fff",
      fontSize: 24
    }
  });