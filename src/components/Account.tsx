import { Button, Input } from "heroui-native";
import { useCallback, useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import { supabase } from "../lib/supabase";
import Avatar from "./Avatar";

export default function Account({
  userId,
  email,
}: {
  userId: string;
  email?: string;
}) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [website, setWebsite] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", userId)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) getProfile();
  }, [userId, getProfile]);

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string;
    website: string;
    avatar_url: string;
  }) {
    try {
      setLoading(true);

      const updates = {
        id: userId,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      };

      let { error } = await supabase.from("profiles").upsert(updates);

      if (error) {
        throw error;
      }
    } catch (error: any) {
      Alert.alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View className="flex-1 px-4 py-6">
      {/* Header */}
      <Text className="text-2xl font-cossette-bold mb-8">Profile</Text>

      {/* Avatar */}
      <View className="items-center mb-8">
        <Avatar
          size={100}
          url={avatarUrl}
          onUpload={(url: string) => {
            setAvatarUrl(url);
            updateProfile({ username, website, avatar_url: url });
          }}
        />
      </View>

      {/* Form */}
      <View className="gap-4 mb-8">
        <View>
          <Text className="text-xs font-semibold text-muted mb-2">Email</Text>
          <Input value={email ?? ""} editable={false} className="bg-gray-100" />
        </View>

        <View>
          <Text className="text-xs font-semibold text-muted mb-2">
            Username
          </Text>
          <Input
            value={username || ""}
            onChangeText={setUsername}
            placeholder="Enter username"
          />
        </View>

        <View>
          <Text className="text-xs font-semibold text-muted mb-2">Website</Text>
          <Input
            value={website || ""}
            onChangeText={setWebsite}
            placeholder="Enter website"
          />
        </View>
      </View>

      {/* Buttons */}
      <View className="gap-2">
        <Button
          className="h-11 rounded-lg"
          onPress={() =>
            updateProfile({ username, website, avatar_url: avatarUrl })
          }
          isDisabled={loading}
        >
          <Button.Label className="text-white font-semibold text-sm">
            {loading ? "Saving..." : "Save Changes"}
          </Button.Label>
        </Button>

        <Button
          variant="ghost"
          className="h-11"
          onPress={() => supabase.auth.signOut()}
        >
          <Button.Label className="text-red-500 font-semibold text-sm">
            Sign Out
          </Button.Label>
        </Button>
      </View>
    </View>
  );
}
