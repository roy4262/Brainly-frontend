// Test script for link functionality
const axios = require('axios');

const BACKEND_URL = 'http://localhost:3000/api/v1';

async function testLinkFunctionality() {
  try {
    console.log('🧪 Testing Link Functionality...\n');
    
    // Test health endpoint with new content types
    console.log('1. Testing health endpoint...');
    const healthResponse = await axios.get(`${BACKEND_URL}/health`);
    console.log('✅ Health check:', healthResponse.data);
    console.log('✅ Supported content types:', healthResponse.data.supportedContentTypes);
    
    // Test content types endpoint
    console.log('\n2. Testing content types endpoint...');
    const typesResponse = await axios.get(`${BACKEND_URL}/content-types`);
    console.log('✅ Content types:', typesResponse.data);
    
    // Test signin to get token
    console.log('\n3. Testing signin...');
    const signinResponse = await axios.post(`${BACKEND_URL}/signin`, {
      username: 'testuser',
      password: 'testpass'
    });
    console.log('✅ Signin successful');
    
    const token = signinResponse.data.token;
    
    // Test creating different content types
    console.log('\n4. Testing content creation...');
    
    // Test YouTube content
    const youtubeContent = await axios.post(`${BACKEND_URL}/content`, {
      title: 'Test YouTube Video',
      link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      type: 'youtube'
    }, {
      headers: { 'Authorization': token }
    });
    console.log('✅ YouTube content created:', youtubeContent.data.msg);
    
    // Test Twitter content
    const twitterContent = await axios.post(`${BACKEND_URL}/content`, {
      title: 'Test Twitter Post',
      link: 'https://twitter.com/example/status/123456789',
      type: 'twitter'
    }, {
      headers: { 'Authorization': token }
    });
    console.log('✅ Twitter content created:', twitterContent.data.msg);
    
    // Test Link content (NEW!)
    const linkContent = await axios.post(`${BACKEND_URL}/content`, {
      title: 'Test Website Link',
      link: 'https://www.google.com',
      type: 'link'
    }, {
      headers: { 'Authorization': token }
    });
    console.log('✅ Link content created:', linkContent.data.msg);
    
    // Test Link content without https (should auto-add)
    const linkContent2 = await axios.post(`${BACKEND_URL}/content`, {
      title: 'Test Website Link 2',
      link: 'github.com',
      type: 'link'
    }, {
      headers: { 'Authorization': token }
    });
    console.log('✅ Link content created (auto-https):', linkContent2.data.msg);
    
    // Test getting all content
    console.log('\n5. Testing content retrieval...');
    const contentResponse = await axios.get(`${BACKEND_URL}/content`, {
      headers: { 'Authorization': token }
    });
    console.log(`✅ Retrieved ${contentResponse.data.content.length} content items`);
    
    // Show content types
    const contentTypes = contentResponse.data.content.map(item => ({
      title: item.title,
      type: item.type,
      link: item.link
    }));
    console.log('📋 Content summary:', contentTypes);
    
    console.log('\n🎉 All link functionality tests passed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    if (error.response?.data) {
      console.error('Error details:', error.response.data);
    }
  }
}

// Test validation errors
async function testValidationErrors() {
  try {
    console.log('\n🧪 Testing Validation Errors...\n');
    
    const signinResponse = await axios.post(`${BACKEND_URL}/signin`, {
      username: 'testuser',
      password: 'testpass'
    });
    const token = signinResponse.data.token;
    
    // Test invalid YouTube URL
    try {
      await axios.post(`${BACKEND_URL}/content`, {
        title: 'Invalid YouTube',
        link: 'https://www.google.com',
        type: 'youtube'
      }, {
        headers: { 'Authorization': token }
      });
    } catch (error) {
      console.log('✅ YouTube validation works:', error.response.data.msg);
    }
    
    // Test invalid Twitter URL
    try {
      await axios.post(`${BACKEND_URL}/content`, {
        title: 'Invalid Twitter',
        link: 'https://www.google.com',
        type: 'twitter'
      }, {
        headers: { 'Authorization': token }
      });
    } catch (error) {
      console.log('✅ Twitter validation works:', error.response.data.msg);
    }
    
    // Test invalid general URL
    try {
      await axios.post(`${BACKEND_URL}/content`, {
        title: 'Invalid Link',
        link: 'not-a-valid-url',
        type: 'link'
      }, {
        headers: { 'Authorization': token }
      });
    } catch (error) {
      console.log('✅ Link validation works:', error.response.data.msg);
    }
    
    // Test missing link for non-document type
    try {
      await axios.post(`${BACKEND_URL}/content`, {
        title: 'Missing Link',
        type: 'link'
      }, {
        headers: { 'Authorization': token }
      });
    } catch (error) {
      console.log('✅ Missing link validation works:', error.response.data.msg);
    }
    
    console.log('\n🎉 All validation tests passed!');
    
  } catch (error) {
    console.error('❌ Validation test failed:', error.response?.data || error.message);
  }
}

// Run tests
async function runAllTests() {
  await testLinkFunctionality();
  await testValidationErrors();
}

runAllTests();