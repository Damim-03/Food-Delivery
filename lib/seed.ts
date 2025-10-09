import { ID } from "react-native-appwrite";
import { appwriteConfig, databases, storage } from "./appwrite";
import dummyData from "./data";

interface Category {
    name: string;
    description: string;
}

interface Customization {
    name: string;
    price: number;
    type: "topping" | "side" | "size" | "crust" | string;
}

interface MenuItem {
    name: string;
    description: string;
    image_url: string;
    price: number;
    rating: number;
    calories: number;
    protein: number;
    category_name: string;
    customizations: string[];
}

interface DummyData {
    categories: Category[];
    customizations: Customization[];
    menu: MenuItem[];
}

const data = dummyData as DummyData;

// 🔹 Delete all documents in a collection
async function clearAll(collectionId: string): Promise<void> {
    console.log(`🧹 Clearing ${collectionId}...`);
    try {
        const list = await databases.listDocuments(
            appwriteConfig.databaseId,
            collectionId
        );

        if (!list.documents.length) return;

        await Promise.all(
            list.documents.map((doc) =>
                databases.deleteDocument(appwriteConfig.databaseId, collectionId, doc.$id)
            )
        );
        console.log(`✅ Cleared ${collectionId}`);
    } catch (error) {
        console.error(`❌ Failed to clear ${collectionId}:`, error);
    }
}

// 🔹 Clear storage
async function clearStorage(): Promise<void> {
    console.log("🧹 Clearing storage...");
    try {
        const list = await storage.listFiles(appwriteConfig.bucketId);

        if (!list.files.length) return;

        await Promise.all(
            list.files.map((file) =>
                storage.deleteFile(appwriteConfig.bucketId, file.$id)
            )
        );
        console.log("✅ Cleared storage");
    } catch (error) {
        console.error("❌ Failed to clear storage:", error);
    }
}

// 🔹 Upload image (React Native compatible)
async function uploadImageToStorage(imageUrl: string): Promise<string> {
    try {
        if (!imageUrl.startsWith("http")) {
            console.warn("⚠️ Skipping invalid image URL:", imageUrl);
            return imageUrl;
        }

        console.log(`⬆️ Uploading: ${imageUrl}`);

        const response = await fetch(imageUrl);
        const blob = await response.blob();

        // 🔸 Create a proper file object Appwrite expects
        const fileObj = {
            name: imageUrl.split("/").pop() || `file-${Date.now()}.jpg`,
            type: blob.type || "image/jpeg",
            size: blob.size,
            uri: imageUrl,
        };

        const file = await storage.createFile(
            appwriteConfig.bucketId,
            ID.unique(),
            fileObj
        );

        // ✅ getFileView returns a URL string
        const fileUrl = storage.getFileView(appwriteConfig.bucketId, file.$id);
        console.log("✅ Uploaded:", fileUrl);
        throw fileUrl;
    } catch (err) {
        console.error("❌ Upload failed:", err);
        return imageUrl;
    }
}

// 🔹 Main seeding
async function seed(): Promise<void> {
    try {
        console.log("🚀 Starting seed process...");

        await Promise.all([
            clearAll(appwriteConfig.categoriesCollectionId),
            clearAll(appwriteConfig.customizationsCollectionId),
            clearAll(appwriteConfig.menuCollectionId),
            clearAll(appwriteConfig.menuCustomizationsCollectionId),
            clearStorage(),
        ]);

        const categoryMap: Record<string, string> = {};
        for (const cat of data.categories) {
            const doc = await databases.createDocument(
                appwriteConfig.databaseId,
                appwriteConfig.categoriesCollectionId,
                ID.unique(),
                cat
            );
            categoryMap[cat.name] = doc.$id;
            console.log(`📦 Category added: ${cat.name}`);
        }

        const customizationMap: Record<string, string> = {};
        for (const cus of data.customizations) {
            const doc = await databases.createDocument(
                appwriteConfig.databaseId,
                appwriteConfig.customizationsCollectionId,
                ID.unique(),
                {
                    name: cus.name,
                    price: cus.price,
                    type: cus.type,
                }
            );
            customizationMap[cus.name] = doc.$id;
            console.log(`⚙️ Customization added: ${cus.name}`);
        }

        for (const item of data.menu) {
            const uploadedImage = await uploadImageToStorage(item.image_url);

            const doc = await databases.createDocument(
                appwriteConfig.databaseId,
                appwriteConfig.menuCollectionId,
                ID.unique(),
                {
                    name: item.name,
                    description: item.description,
                    image_url: uploadedImage,
                    price: item.price,
                    rating: item.rating,
                    calories: item.calories,
                    protein: item.protein,
                    categories: categoryMap[item.category_name],
                }
            );

            console.log(`🍔 Menu item added: ${item.name}`);

            for (const cusName of item.customizations) {
                await databases.createDocument(
                    appwriteConfig.databaseId,
                    appwriteConfig.menuCustomizationsCollectionId,
                    ID.unique(),
                    {
                        menu: doc.$id,
                        customizations: customizationMap[cusName],
                    }
                );
                console.log(`🔗 Linked ${item.name} -> ${cusName}`);
            }
        }

        console.log("✅ Seeding complete!");
    } catch (error: any) {
        console.error("❌ Failed to seed:", error);
        console.log("🔍 Full error:", error.response ?? error);
    }
}

export default seed;
