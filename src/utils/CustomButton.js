import React from 'react'
import { 
    Pressable,
    Text,
    StyleSheet
} from 'react-native'
const CustomButton = (props) => {
  
  return (
    <Pressable 
    onPress={props.onPressFunction}
    style={styles.button}
   // android_ripple={{color: '#fff'}}
    >
      <Text style={styles.text}>{props.title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    text: {
        color: '#000',
        fontSize: 18,
        fontStyle: 'mono',
        margin: 10,
        textAlign: 'center',
        fontWeight: 'bold'
    },
      button: {
        backgroundColor: '#006400',
        width: 150,
        height: 50,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        margin: 10,
    },

});

export default CustomButton