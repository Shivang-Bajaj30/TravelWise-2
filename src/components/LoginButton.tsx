import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
// import { tw } from 'nativewind'; // Uncomment when Tailwind/nativewind is installed

const LoginButton = () => {
  const [showPopup, setShowPopup] = useState(false);
  // Placeholder for authentication state
  const isAuthenticated = false;

  // Placeholder sign-in logic
  const handleSignIn = () => {
    setShowPopup(true);
  };

  // Don't render if user is already authenticated
  if (isAuthenticated) {
    return null;
  }

  return (
    <View>
      <TouchableOpacity /* className="login-button" tw="bg-green-600 rounded px-6 py-3 mt-2" */ onPress={handleSignIn} style={{backgroundColor:'#27ae60', borderRadius:5, paddingVertical:12, alignItems:'center', marginTop:10}}>
        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Sign In</Text>
      </TouchableOpacity>
      <Modal visible={showPopup} transparent animationType="fade">
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 30, alignItems: 'center', width: 300 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>Sign in to TravelWise</Text>
            <Text style={{ fontSize: 16, color: '#888', marginBottom: 20 }}>Google Sign-In is not available in this demo.</Text>
            <TouchableOpacity onPress={() => setShowPopup(false)} style={{ position: 'absolute', top: 10, right: 10 }}>
              <Text style={{ fontSize: 22 }}>✕</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LoginButton; 