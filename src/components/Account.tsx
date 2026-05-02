import { useCallback, useEffect, useState } from "react";
import { Alert, View, Text } from "react-native";
import { supabase } from "../lib/supabase";
import Avatar from "./Avatar";
import { Button, TextField, Label, Input } from "heroui-native";



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
    <View className="flex-1 px-6 py-8">
      <View className="mb-10 items-center">
        <Text className="text-3xl font-cossette-bold text-foreground text-center">
          Profile
        </Text>
        <Text className="text-muted text-sm text-center mt-1">
          Manage your account details
        </Text>
      </View>

      <View className="items-center mb-10">
        <Avatar
          size={120}
          url={avatarUrl}
          onUpload={(url: string) => {
            setAvatarUrl(url);
            updateProfile({ username, website, avatar_url: url });
          }}
        />
      </View>

      <View className="gap-6 mb-10">
        <TextField>
          <Label className="text-[10px] font-cossette-bold uppercase tracking-widest mb-1 text-muted">Email</Label>
          <Input
            value={email ?? ""}
            editable={false}
            className="bg-gray-50 border-gray-100"
          />
        </TextField>

        <TextField>
          <Label className="text-[10px] font-cossette-bold uppercase tracking-widest mb-1 text-muted">Username</Label>
          <Input
            value={username || ""}
            onChangeText={(text) => setUsername(text)}
            className="bg-gray-50 border-gray-100"
          />
        </TextField>

        <TextField>
          <Label className="text-[10px] font-cossette-bold uppercase tracking-widest mb-1 text-muted">Website</Label>
          <Input
            value={website || ""}
            onChangeText={(text) => setWebsite(text)}
            className="bg-gray-50 border-gray-100"
          />
        </TextField>
      </View>

      <View className="gap-3">
        <Button
          className="bg-primary h-12 rounded-xl"
          onPress={() =>
            updateProfile({ username, website, avatar_url: avatarUrl })
          }
          isDisabled={loading}
        >
          <Button.Label className="text-white font-cossette-bold uppercase tracking-widest text-xs">
            {loading ? "Updating..." : "Update Profile"}
          </Button.Label>
        </Button>

        <Button 
          variant="ghost"
          className="h-12"
          onPress={() => supabase.auth.signOut()}
        >
          <Button.Label className="text-red-500 font-cossette-bold uppercase tracking-widest text-xs">
            Sign Out
          </Button.Label>
        </Button>
      </View>
    </View>
  );
}
