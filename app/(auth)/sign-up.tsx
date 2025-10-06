import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import { Link, router } from "expo-router";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";

const SignUp = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const submit = async () => {
        if (!form.name || !form.email || !form.password) {
            return Alert.alert("Error", "Please fill in all fields correctly");
        }

        setIsSubmitting(true);

        try {
            // TODO: Replace this mock success with real sign-up logic (API call)
            Alert.alert("Success", "User signed up successfully");
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
                label="Full Name"
                placeholder="Enter your full name"
                value={form.name}
                onChangeText={(text) =>
                    setForm((prev) => ({
                        ...prev,
                        name: text,
                    }))
                }
            />

            <CustomInput
                label="Email"
                placeholder="Enter your email"
                keyboardType="email-address"
                value={form.email}
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
                secureTextEntry
                value={form.password}
                onChangeText={(text) =>
                    setForm((prev) => ({
                        ...prev,
                        password: text,
                    }))
                }
            />

            <CustomButton
                title="Sign Up"
                isLoading={isSubmitting}
                onPress={submit}
            />

            <View className="flex-row justify-center items-center mt-5 gap-2">
                <Text className="text-gray-500">Already have an account?</Text>
                <Link href="/sign-in" className="text-primary font-bold">
                    Sign In
                </Link>
            </View>
        </View>
    );
};

export default SignUp;
