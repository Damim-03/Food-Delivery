import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import { Link, router } from "expo-router";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import { signIn } from "@/lib/appwrite";
import * as Sentry from "@sentry/react-native";

const SignIn = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const submit = async () => {
        const { email, password } = form;

        if (!email || !password) {
            return Alert.alert("Error", "Please enter a valid email and password");
        }

        setIsSubmitting(true);

        try {
            await signIn({ email, password });
            Alert.alert("Success", "User signed in successfully");
            router.replace("/");
        } catch (error: any) {
            console.error(error);
            Alert.alert("Error", error?.message || "Something went wrong");
            Sentry.captureEvent(error);
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
