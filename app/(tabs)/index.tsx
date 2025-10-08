import "../globals.css";
import {
    Button,
    FlatList,
    Image,
    Pressable,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { images, offers } from "@/constants";
import clsx from "clsx";
import CartButton from "@/components/CartButton";
import * as Sentry from "@sentry/react-native";
import useAuthStore from "@/store/auth.store";

// ✅ Initialize Sentry once before anything else
Sentry.init({
    dsn: "https://ea63b6f7c762c10c58d164fb10e46669@o4510152714485760.ingest.de.sentry.io/4510152717500496",
    tracesSampleRate: 1.0,
    debug: true,
});

export default function Index() {
    const { user } = useAuthStore();

    return (
        <SafeAreaView className="flex-1 bg-white">
            <FlatList
                data={offers}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                    const isEven: boolean = index % 2 === 0;

                    return (
                        <Pressable android_ripple={{ color: "#fffff22" }}>
                            {({ pressed }) => (
                                <View
                                    className={clsx(
                                        "offer-card",
                                        isEven ? "flex-row-reverse" : "flex-row",
                                        pressed && "opacity-80"
                                    )}
                                    style={{ backgroundColor: item.color }}
                                >
                                    <View className="h-full w-[55%]">
                                        <Image
                                            source={item.image}
                                            className="w-full h-full scale-110"
                                            resizeMode="contain"
                                        />
                                    </View>

                                    <View
                                        className={clsx(
                                            "offer-card__info",
                                            isEven ? "pl-10" : "pr-10"
                                        )}
                                    >
                                        <Text className="text-xl font-bold text-white leading-tight">
                                            {item.title}
                                        </Text>
                                        <Image
                                            source={images.arrowRight}
                                            className="size-10 mt-3"
                                            resizeMode="contain"
                                            tintColor="#ffffff"
                                        />
                                    </View>
                                </View>
                            )}
                        </Pressable>
                    );
                }}
                contentContainerClassName="pb-28 px-5"
                ListHeaderComponent={() => (
                    <View className="flex-row flex-between w-full mt-14 my-5">
                        <View>
                            <Text className="text-xs font-bold text-primary">DELIVER TO</Text>
                            <TouchableOpacity className="flex-row items-center mt-0.5">
                                <Text className="font-semibold text-dark-100 mr-1">Croatia</Text>
                                <Image
                                    source={images.arrowDown}
                                    className="w-3 h-3"
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                        </View>

                        <CartButton />
                    </View>
                )}
                ListFooterComponent={() => (
                    <Button
                        title="Try!"
                        onPress={() =>
                            Sentry.captureException(new Error("First error"))
                        }
                    />
                )}
            />
        </SafeAreaView>
    );
}
