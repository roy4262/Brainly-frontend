// Script to add test content for debugging
const axios = require('axios');

const BACKEND_URL = 'http://localhost:3000/api/v1';

async function addTestContent() {
  try {
    console.log('🧪 Adding test content for debugging...\n');
    
    // You'll need to replace this with your actual token
    // Get it from localStorage in your browser after logging in
    const token = 'YOUR_TOKEN_HERE'; // Replace with actual token
    
    const testContent = [
      {
        title: 'Test YouTube Video',
        link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        type: 'youtube'
      },
      {
        title: 'Test Website Link',
        link: 'https://www.google.com',
        type: 'link'
      },
      {
        title: 'Test Document',
        link: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        type: 'document'
      },
      {
        title: 'Test Twitter Post',
        link: 'https://twitter.com/elonmusk/status/1234567890',
        type: 'twitter'
      }
    ];
    
    for (const content of testContent) {
      try {
        const response = await axios.post(`${BACKEND_URL}/content`, content, {
          headers: { 'Authorization': token }
        });
        console.log(`✅ Added ${content.type}: ${content.title}`);
      } catch (error) {
        console.log(`❌ Failed to add ${content.type}: ${error.response?.data?.msg || error.message}`);
      }
    }
    
    console.log('\n🎉 Test content addition complete!');
    console.log('Now try sharing your brain and check if all content types appear.');
    
  } catch (error) {
    console.error('❌ Script failed:', error.message);
    console.log('\n📝 Instructions:');
    console.log('1. Log into your app in the browser');
    console.log('2. Open browser dev tools (F12)');
    console.log('3. Go to Application/Storage > Local Storage');
    console.log('4. Copy the "token" value');
    console.log('5. Replace YOUR_TOKEN_HERE in this script with your token');
    console.log('6. Run this script again');
  }
}

addTestContent();