import React, { useState } from "react";
import { Alert, View } from "react-native";
import { supabase } from "../lib/supabase";
import { Button, Card, TextField, Label, Input } from "heroui-native";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"signIn" | "signUp" | "verifyOtp">("signIn");

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert("Error", error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert("Error", error.message);
      setLoading(false);
      return;
    }

    // If Supabase is configured to send OTP/Confirmation
    if (data.user && !data.session) {
      setMode("verifyOtp");
      Alert.alert("Success", "Please check your email for the verification code.");
    } else if (data.session) {
      // Auto-logged in (confirmed already or confirmation disabled)
      // Navigation will be handled by AuthProvider/Index
    }
    
    setLoading(false);
  }

  async function verifyOtp() {
    setLoading(true);
    const { error } = await supabase.auth.verifyOtp({
      email: email,
      token: otp,
      type: "signup",
    });

    if (error) {
      Alert.alert("Error", error.message);
    }
    setLoading(false);
  }

  if (mode === "verifyOtp") {
    return (
      <View className="flex-1 justify-center p-4 bg-background">
        <Card>
          <Card.Body className="gap-6 p-6">
            <View>
              <Card.Title className="text-3xl font-bold text-center mb-2">Verify OTP</Card.Title>
              <Card.Description className="text-center text-lg">
                Enter the code sent to {email}
              </Card.Description>
            </View>

            <View className="gap-4">
              <TextField>
                <Label>Verification Code</Label>
                <Input
                  onChangeText={(text) => setOtp(text)}
                  value={otp}
                  placeholder="123456"
                  keyboardType="number-pad"
                  autoFocus
                />
              </TextField>
            </View>

            <View className="gap-3 mt-4">
              <Button variant="primary" onPress={verifyOtp} isDisabled={loading}>
                <Button.Label>Verify & Continue</Button.Label>
              </Button>
              <Button variant="ghost" onPress={() => setMode("signUp")} isDisabled={loading}>
                <Button.Label>Back to Sign Up</Button.Label>
              </Button>
            </View>
          </Card.Body>
        </Card>
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center p-4 bg-background">
      <Card>
        <Card.Body className="gap-6 p-6">
          <View>
            <Card.Title className="text-3xl font-bold text-center mb-2">
              {mode === "signIn" ? "Welcome Back" : "Create Account"}
            </Card.Title>
            <Card.Description className="text-center text-lg">
              {mode === "signIn" 
                ? "Sign in to your account" 
                : "Join us and start your journey"}
            </Card.Description>
          </View>
          
          <View className="gap-4">
            <TextField>
              <Label>Email</Label>
              <Input
                onChangeText={(text) => setEmail(text)}
                value={email}
                placeholder="email@address.com"
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </TextField>
            
            <TextField>
              <Label>Password</Label>
              <Input
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry={true}
                placeholder="Password"
                autoCapitalize="none"
              />
            </TextField>
          </View>

          <View className="gap-3 mt-4">
            <Button 
              variant="primary" 
              onPress={mode === "signIn" ? signInWithEmail : signUpWithEmail} 
              isDisabled={loading}
            >
              <Button.Label>{mode === "signIn" ? "Sign In" : "Sign Up"}</Button.Label>
            </Button>
            
            <Button 
              variant="ghost" 
              onPress={() => setMode(mode === "signIn" ? "signUp" : "signIn")} 
              isDisabled={loading}
            >
              <Button.Label>
                {mode === "signIn" ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
              </Button.Label>
            </Button>
          </View>
        </Card.Body>
      </Card>
    </View>
  );
}

