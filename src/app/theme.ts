import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true,
}
const theme = extendTheme({ 
  config,
  styles: {
      global : (props: any) => ({
          'body' : {
              overflowX: 'hidden'
          },
          '::-webkit-scrollbar': {
              backgroundColor: 'transparent',
              width: '4px',
              padding: '0',
              margin: '0'
          },
          '::-webkit-scrollbar-thumb': {
              backgroundColor: mode('#41b883', '#6b46c1')(props),
              borderRadius: '25px'
          },
          '::-webkit-scrollbar-corner' : {
              display: 'none'
          },
          '::-webkit-scrollbar-button' :{
              display: 'none'
          }
      })
  } 
})
export default theme