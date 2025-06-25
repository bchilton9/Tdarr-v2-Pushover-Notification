// List any npm dependencies which the plugin needs, they will be auto installed when the plugin runs
module.exports.dependencies = [
  'import-fresh',
];

const https = require('https'); // Native Node.js library for HTTP(S) requests

const details = () => ({
  id: 'Tdarr_Plugin_Pushover_Notification', // Unique plugin ID
  Stage: 'Post-processing', // Plugin stage: after all processing
  Name: 'Pushover Notification', // Plugin name
  Type: 'Video', // Plugin type: video transcoding
  Operation: 'Transcode',
  Description: 'Send a Pushover notification when a job is completed.',
  Version: '1.00',
  Tags: 'pushover,notification,video,transcode', // Tags for plugin filtering
  
  Inputs: [
    {
      name: 'pushover_user_key',
      type: 'string',
      defaultValue: '', // User Pushover Key (replace with your key)
      inputUI: {
        type: 'text',
      },
      tooltip: 'Enter your Pushover User Key.',
    },
    {
      name: 'pushover_app_token',
      type: 'string',
      defaultValue: '', // Pushover App Token (replace with your token)
      inputUI: {
        type: 'text',
      },
      tooltip: 'Enter your Pushover App Token.',
    },
  ],
});

// Function to send Pushover notification using native HTTPS
const sendPushoverNotification = (message, pushoverUserKey, pushoverAppToken) => {
  const postData = JSON.stringify({
    token: pushoverAppToken,
    user: pushoverUserKey,
    message: message,
  });

  const options = {
    hostname: 'api.pushover.net',
    port: 443,
    path: '/1/messages.json',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData),
    },
  };

  const req = https.request(options, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      console.log('Pushover notification sent:', data);
    });
  });

  req.on('error', (e) => {
    console.error('Failed to send Pushover notification:', e);
  });

  req.write(postData);
  req.end();
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const plugin = (file, librarySettings, inputs, otherArguments) => {
  const lib = require('../methods/lib')();
  // Load default plugin inputs
  inputs = lib.loadDefaultValues(inputs, details);

  // Extract Pushover credentials from inputs
  const { pushover_user_key, pushover_app_token } = inputs;

  // Assuming the transcoding process has succeeded (this is a placeholder)
  const transcodingSuccess = true; // Replace with actual job success/failure check

const path = require('path');

// For Tdarr v2, use file.file to get the actual file path
const filePath = file.file;
const fileName = filePath ? path.basename(filePath) : 'Unknown file';

// Build message
let message = `Job completed for file: ${fileName}`;
if (!transcodingSuccess) {
  message = `Job failed for file: ${fileName}`;
}

  // Send the Pushover notification
  sendPushoverNotification(message, pushover_user_key, pushover_app_token);

  console.log('Transcode complete. Notification sent!');

  // Optional response if you need to modify the database or return other info
  const response = {
    file,
    removeFromDB: false,
    updateDB: false,
  };

  return response;
};

module.exports.details = details;
module.exports.plugin = plugin;
