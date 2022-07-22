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
      height: "100%",
      marginVertical: 10,
      paddingVertical: 2,
      marginTop: 35
  },
  text: {
      fontWeight: 'bold',
      fontSize: 15,
      lineHeight: 26,
  },
})

export default Button;
