// Simple test script to check if backend is working
const axios = require('axios');

const BACKEND_URL = 'http://localhost:3000/api/v1';

async function testBackend() {
  try {
    console.log('Testing backend connection...');
    
    // Test health endpoint
    const healthResponse = await axios.get(`${BACKEND_URL}/health`);
    console.log('✅ Health check passed:', healthResponse.data);
    
    // Test signup (optional - comment out if user already exists)
    try {
      const signupResponse = await axios.post(`${BACKEND_URL}/signup`, {
        username: 'testuser',
        password: 'testpass'
      });
      console.log('✅ Signup successful:', signupResponse.data);
    } catch (signupError) {
      console.log('ℹ️ Signup failed (user might already exist):', signupError.response?.data?.msg);
    }
    
    // Test signin
    const signinResponse = await axios.post(`${BACKEND_URL}/signin`, {
      username: 'testuser',
      password: 'testpass'
    });
    console.log('✅ Signin successful:', signinResponse.data);
    
    const token = signinResponse.data.token;
    
    // Test content creation
    const contentResponse = await axios.post(`${BACKEND_URL}/content`, {
      title: 'Test YouTube Video',
      link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      type: 'youtube'
    }, {
      headers: { 'Authorization': token }
    });
    console.log('✅ Content creation successful:', contentResponse.data);
    
    console.log('\n🎉 All tests passed! Backend is working correctly.');
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    console.error('Full error:', error);
  }
}

testBackend();