// Signin page
import { View, Text, ScrollView, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '@/constants/images'
import { Image } from 'react-native'
import FormField from '@/components/FormField'
import ButtonComponent from '@/components/CustomButton'
import { Link, router } from 'expo-router'
import { signIn, getCurrentUser } from '@/lib'
import { useGlobalContext } from '@/context/GlobalProvider'

interface FormElements {
  email: string;
  password: string;
}

const signin = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [formElements, setFormElements] = React.useState< FormElements >({
    email: '',
    password: '',
  })
 const [isSubmitted, setIsSubmitted] = React.useState(false)

  const submitForm = async () => {
    if(formElements.email === '' || formElements.password === '') {
      Alert.alert('Error', 'Please fill all the fields');
    }
    setIsSubmitted(true);
    try{
      await signIn(formElements.email,formElements.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLogged(true);

      Alert.alert('Success', 'You\'ve been logged in');
      router.replace('/home');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to sign in');
    } finally {
      setIsSubmitted(false);
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
            Sign in to Aora
          </Text>
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
            title="Sign In"
            handlePress={submitForm}
            containerStyle="w-full mt-7"
            isLoading={isSubmitted}
            />

          <View className='flex-row justify-center pt-5 gap-2'>
            <Text className='text-base text-gray-100 font-pmedium'>
              Don't have an account?
            </Text>
            <Link href='/signup' className='text-lg text-secondary font-psemibold'>
                Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default signin