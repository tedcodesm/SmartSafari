import { View, Text ,TextInput,TouchableOpacity} from 'react-native'
import React from 'react'

const LoginScreen = () => {
  return (
    <View className="flex-1 items-center justify-start w-full bg-[#87CEEB]">
        <View className=" flex w-full h-56  rounded-lg">
            <Text className="text-2xl font-bold text-center mt-4">Login</Text>
        </View>
        <View className="bg-white flex-1 w-full rounded-t-lg p-4">
            <Text className="text-2xl font-bold font-serif text-center mt-4">Welcome Back</Text>
            <View className="mt-4">
                <Text className="text-lg">Email:</Text>
                <TextInput className="border border-gray-300 p-2 rounded-lg" placeholder="Enter your email" />
            </View>
            <View className="mt-4">
                <Text className="text-lg">Password:</Text>
                <TextInput className="border border-gray-300 p-2 rounded-lg" placeholder="Enter your password" secureTextEntry />
            </View>
            <TouchableOpacity className="bg-blue-500 p-2 rounded-lg mt-4">
                <Text className="text-white text-lg text-center">Login</Text>
            </TouchableOpacity>
            <TouchableOpacity className="mt-4">
                <Text className="text-blue-500 text-center"> <Text className="font-bold text-black mr-4">Don't have an account?</Text> Sign Up</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default LoginScreen