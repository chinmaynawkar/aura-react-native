// Signup page
import { View, Text, ScrollView, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '@/constants/images'
import { Image } from 'react-native'
import FormField from '@/components/FormField'
import ButtonComponent from '@/components/CustomButton'
import { Link, router } from 'expo-router'
import { createUser } from '@/lib'
import { useGlobalContext } from '@/context/GlobalProvider'

interface FormElements {
  username: string;
  email: string;
  password: string;
}

const signup = () => {
  const { setUser, setIsLogged } = useGlobalContext()
  const [formElements, setFormElements] = React.useState< FormElements >({
    username: '',
    email: '',
    password: '',
  })
 const [isSubmitted, setIsSubmitted] = React.useState(false)


  const submitForm = async() => {
   if(formElements.username === '' || formElements.email === '' || formElements.password === ''){
     Alert.alert('Please fill all the fields')
   }
    setIsSubmitted(true)
   try{
    const result = await createUser(
      formElements.email, 
      formElements.password, 
      formElements.username
    )
    setUser(result)
    setIsLogged(true)

    router.replace('/home')
    } catch(error: any) {
      console.log(error)
      Alert.alert('Error creating account', error.message)
    } finally {
      setIsSubmitted(false)
   }
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full justify-center min-h-[80vh] px-4 my-6'>
          <Image
            source={images.logo}
            resizeMode='contain'
            className='w-[115px] h-[35px]'
          />

          <Text className='text-2xl text-white font-semibold mt-10 font-psemibold'>
            Sign up to Aora
          </Text>
          <FormField
            title='Username'
            value={formElements.username}
            handleChangeText={(text: string) => setFormElements({ ...formElements, username: text })}
            placeholder='Enter your username'
            otherStyle='mt-10'
            keyboardType='default'
            icon='user'
          />
          <FormField
            title='Email'
            value={formElements.email}
            handleChangeText={(text: string) => setFormElements({ ...formElements, email: text })}
            placeholder='Enter your email'
            otherStyle='mt-7'
            keyboardType='email-address'
            icon='email'
          />
          <FormField
            title='Password'
            value={formElements.password}
            handleChangeText={(text: string) => setFormElements({ ...formElements, password: text })}
            placeholder='Enter your password'
            otherStyle='mt-7'
            secureTextEntry={true}
            keyboardType='default'
            icon='lock'
          />
          <ButtonComponent
            title="Sign Up"
            handlePress={submitForm}
            containerStyle="w-full mt-7"
            isLoading={isSubmitted}
            />

          <View className='flex-row justify-center pt-5 gap-2'>
            <Text className='text-base text-gray-100 font-pmedium'>
              Already have an account?
            </Text>
            <Link href='/signin' className='text-lg text-secondary font-psemibold'>
                Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default signup