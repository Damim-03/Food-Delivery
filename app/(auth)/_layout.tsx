import React from "react";
import {
    View,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Dimensions,
    ImageBackground,
    Image
} from "react-native";
import { Slot } from "expo-router";
import CustomButton from "../../components/CustomButton"
import CustomInput from "../../components/CustomInput"
import { images } from "@/constants"; // make sure you import images

export default function _Layout() {
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <ScrollView
                className="bg-white flex-1"
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                {/* Top Graphic */}
                <View
                    className="w-full relative"
                    style={{
                        height: Dimensions.get("screen").height / 2.25,
                    }}
                >
                    <ImageBackground
                        source={images.loginGraphic}
                        className="w-full h-full rounded-b-lg"
                        resizeMode="stretch"
                    />
                    <Image
                        source={images.logo}
                        className={"self-center size-48 absolute -bottom-16 z-10"}
                    />
                </View>

                <Slot />

            </ScrollView>
        </KeyboardAvoidingView>
    );
}
