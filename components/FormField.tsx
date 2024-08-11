// Circle form field component
import { View, Text, TextInput, KeyboardTypeOptions, TouchableOpacity } from 'react-native'
import React from 'react'
import icons from '@/constants/icons'
import { Image } from 'react-native'

export interface FormFieldProps {
  title: string;
  value: string;
  handleChangeText: (text: string) => void;
  placeholder: string;
  otherStyle?: string;
  secureTextEntry?: boolean;
  keyboardType?: string;
  icon?: string;
}

const FormField = ({
  title,
  value,
  handleChangeText,
  placeholder,
  otherStyle,
  secureTextEntry,
  keyboardType,
  icon,
}: FormFieldProps) => {
 const [showPassword, setShowPassword] = React.useState(false)

  return (
    <View className={`space-y-2 ${otherStyle}`}>
      <Text className='text-base text-gray-100 font-pmedium'>
        {title}
        </Text>
      <View className='border-2 border-black-200 w-full h-16 px-4 bg-black-100
      rounded-2xl focus:border-secondary flex-row items-center'>
        <TextInput
          className='flex-1 text-base text-white font-pmedium'
          value={value}
          onChangeText={handleChangeText}
          placeholder={placeholder}
          placeholderTextColor={'#7b7b8b'}
          secureTextEntry={title === 'Password' && !showPassword}
          keyboardType={keyboardType as KeyboardTypeOptions}
        />
        {title === 'Password' && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}>
              <Image
                source={showPassword ? icons.eyeHide : icons.eye}
                className='w-6 h-6'
                resizeMode='contain'
              />
            </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField