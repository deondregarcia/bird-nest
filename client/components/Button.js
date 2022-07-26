import React from 'react'
import { StyleSheet } from 'react-native'
import { Button as ButtonPaper } from 'react-native-paper'
import { theme } from '../core/theme'

const Button = ({ mode, style, ...props }) => {
  return (
    <ButtonPaper
      style={[
        styles.button,
        mode === 'outlined' && { backgroundColor: theme.colors.surface },
        style,
      ]}
      labelStyle={styles.text}
      mode={mode}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  button: {
      width: '100%',
      justifyContent: "space-evenly",
      marginVertical: 10,
      paddingVertical: 2,

     
  },
  text: {
      fontWeight: 'bold',
      fontSize: 15,
      lineHeight: 26
  },
})

export default Button;
