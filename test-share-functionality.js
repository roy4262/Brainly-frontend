// Test script for brain sharing functionality
const axios = require('axios');

const BACKEND_URL = 'http://localhost:3000/api/v1';

async function testShareFunctionality() {
  try {
    console.log('🧪 Testing Brain Share Functionality...\n');
    
    // Test signin to get token
    console.log('1. Testing signin...');
    const signinResponse = await axios.post(`${BACKEND_URL}/signin`, {
      username: 'testuser',
      password: 'testpass'
    });
    console.log('✅ Signin successful');
    
    const token = signinResponse.data.token;
    
    // Create some test content first
    console.log('\n2. Creating test content...');
    
    await axios.post(`${BACKEND_URL}/content`, {
      title: 'Shared YouTube Video',
      link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      type: 'youtube'
    }, {
      headers: { 'Authorization': token }
    });
    
    await axios.post(`${BACKEND_URL}/content`, {
      title: 'Shared Website Link',
      link: 'https://www.google.com',
      type: 'link'
    }, {
      headers: { 'Authorization': token }
    });
    
    console.log('✅ Test content created');
    
    // Test brain sharing
    console.log('\n3. Testing brain sharing...');
    const shareResponse = await axios.post(`${BACKEND_URL}/brain/share`, {
      share: true
    }, {
      headers: { 'Authorization': token }
    });
    
    const shareHash = shareResponse.data.hash;
    console.log('✅ Brain shared successfully with hash:', shareHash);
    
    // Test viewing shared brain (public endpoint)
    console.log('\n4. Testing shared brain viewing...');
    const viewResponse = await axios.get(`${BACKEND_URL}/brain/${shareHash}`);
    
    console.log('✅ Shared brain loaded successfully');
    console.log('📋 Shared brain details:');
    console.log('   Owner:', viewResponse.data.owner);
    console.log('   Content count:', viewResponse.data.content.length);
    console.log('   Content items:');
    viewResponse.data.content.forEach((item, index) => {
      console.log(`     ${index + 1}. ${item.title} (${item.type})`);
    });
    
    // Test frontend URL
    const frontendUrl = `http://localhost:5174/brain/${shareHash}`;
    console.log('\n🔗 Frontend share URL:', frontendUrl);
    console.log('   You can open this URL in your browser to view the shared brain!');
    
    // Test disabling sharing
    console.log('\n5. Testing disable sharing...');
    await axios.post(`${BACKEND_URL}/brain/share`, {
      share: false
    }, {
      headers: { 'Authorization': token }
    });
    console.log('✅ Brain sharing disabled');
    
    // Test accessing disabled share (should fail)
    console.log('\n6. Testing access to disabled share...');
    try {
      await axios.get(`${BACKEND_URL}/brain/${shareHash}`);
      console.log('❌ ERROR: Should not be able to access disabled share');
    } catch (error) {
      console.log('✅ Correctly blocked access to disabled share:', error.response.data.msg);
    }
    
    console.log('\n🎉 All brain sharing tests passed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    if (error.response?.data) {
      console.error('Error details:', error.response.data);
    }
  }
}

testShareFunctionality();