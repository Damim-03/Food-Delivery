import "../globals.css";
import {
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

export default function Index() {
    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* FlatList تدير الـ scroll تلقائياً */}
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
                                    {/* الصورة */}
                                    <View className="h-full w-[55%]">
                                        <Image
                                            source={item.image}
                                            className="w-full h-full scale-110"
                                            resizeMode="contain"
                                        />
                                    </View>

                                    {/* النص والآيقونة */}
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
                contentContainerClassName={ "pb-28 px-5"}
                ListHeaderComponent={() => (
                    <View className="flex-row flex-between w-full mt-14 my-5">
                        {/* Deliver To */}
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

                        {/* Cart */}
                        <CartButton />
                    </View>
                )}
            />
        </SafeAreaView>
    );
}
