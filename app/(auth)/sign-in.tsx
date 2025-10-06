import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import { Link, router } from "expo-router";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";

const SignIn = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const submit = async () => {
        if (!form.email || !form.password) {
            return Alert.alert("Error", "Please enter a valid email and password");
        }

        setIsSubmitting(true);

        try {
            // TODO: Replace this mock success with real authentication
            Alert.alert("Success", "User signed in successfully");
            router.replace("/");
        } catch (e) {
            Alert.alert("Error", "Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <View className="bg-white rounded-lg p-5 mt-5 gap-6">
            <CustomInput
                label="Email"
                placeholder="Enter your email"
                value={form.email}
                keyboardType="email-address"
                onChangeText={(text) =>
                    setForm((prev) => ({
                        ...prev,
                        email: text,
                    }))
                }
            />

            <CustomInput
                label="Password"
                placeholder="Enter your password"
                value={form.password}
                secureTextEntry
                onChangeText={(text) =>
                    setForm((prev) => ({
                        ...prev,
                        password: text,
                    }))
                }
            />

            <CustomButton
                title="Sign In"
                isLoading={isSubmitting}
                onPress={submit}
            />

            <View className="flex-row justify-center items-center mt-5 gap-2">
                <Text className="text-gray-500">Don't have an account?</Text>
                <Link href="/sign-up" className="text-primary font-bold">
                    Sign Up
                </Link>
            </View>
        </View>
    );
};

export default SignIn;
