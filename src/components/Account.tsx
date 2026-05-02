import { useCallback, useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { supabase } from "../lib/supabase";
import Avatar from "./Avatar";
import { Button, Card, TextField, Label, Input } from "heroui-native";

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
    <View className="flex-1 p-4 bg-background justify-center">
      <Card>
        <Card.Body className="gap-6 p-6">
          <Card.Title className="text-3xl font-cossette-bold text-center mb-2">Profile</Card.Title>
          <Card.Description className="text-center mb-2">Manage your account details</Card.Description>

          <View className="items-center mb-4">
            <Avatar
              size={120}
              url={avatarUrl}
              onUpload={(url: string) => {
                setAvatarUrl(url);
                updateProfile({ username, website, avatar_url: url });
              }}
            />
          </View>
          
          <View className="gap-4">
            <TextField>
              <Label>Email</Label>
              <Input
                value={email ?? ""}
                editable={false}
                selectTextOnFocus={false}
              />
            </TextField>
            
            <TextField>
              <Label>Username</Label>
              <Input
                value={username || ""}
                onChangeText={(text) => setUsername(text)}
              />
            </TextField>
            
            <TextField>
              <Label>Website</Label>
              <Input
                value={website || ""}
                onChangeText={(text) => setWebsite(text)}
              />
            </TextField>
          </View>

          <View className="gap-3 mt-6">
            <Button
              variant="primary"
              onPress={() =>
                updateProfile({ username, website, avatar_url: avatarUrl })
              }
              isDisabled={loading}
            >
              <Button.Label>{loading ? "Loading ..." : "Update Profile"}</Button.Label>
            </Button>
            
            <Button variant="danger-soft" onPress={() => supabase.auth.signOut()}>
              <Button.Label>Sign Out</Button.Label>
            </Button>
          </View>
        </Card.Body>
      </Card>
    </View>
  );
}
