# Tdarr Plugin - Pushover Notification

A custom Tdarr v2 plugin that sends a [Pushover](https://pushover.net/) notification when a video processing job completes. The notification includes the filename, and status (success or failure).

## 🔧 Features

- Sends mobile push notifications via Pushover
- Notifies on both success and failure
- Uses native Node.js `https` module (no external HTTP library)

## 🚀 Installation

1. **Enable Custom Plugins** in your Tdarr settings.
2. **Create a new plugin** in the Tdarr UI.
3. Paste the full plugin code into the custom plugin editor.
4. Save the plugin with a name like `Tdarr_Plugin_Pushover_Notification`.

> ✅ You don’t need to install any extra packages manually — the plugin auto-installs its dependencies.

## 🔐 Inputs Required

- `pushover_user_key`: Your personal Pushover User Key.
- `pushover_app_token`: Your application's API Token.

You can get these from your [Pushover dashboard](https://pushover.net/).

## 📤 Notification Example

When a job completes successfully:

```
Job completed for file: example_movie.mkv
Size before: 3.45 GB
Size after: 1.78 GB
```

If the job fails:

```
Job failed for file: example_movie.mkv
```

## 🛠 Customization

The plugin uses the following logic to determine the file name and size:

```js
const fileName = path.basename(file.file); // Tdarr v2
```

You can extend the message to include:

- Transcode duration
- Codec/resolution (from `file.ffProbeData`)
- Priority levels or custom sounds (see [Pushover API docs](https://pushover.net/api))

## 🧪 Testing

To test the plugin:

1. Assign it to a transcode library in Tdarr.
2. Make sure a successful transcode occurs.
3. Check your Pushover app for the notification.

## 🧾 License

This plugin is provided as-is under the MIT License. No affiliation with Pushover or Tdarr.

## 🛠 Built By

[ChilSoft.com](https://chilsoft.com)

## ⚠️ Disclaimer

This site and its contents are provided for informational and educational purposes only.

Use any code, tools, or instructions at your own risk.  
We are **not responsible** for any damage to your device, data loss, or unintended consequences.

Always proceed with care — and make backups.

© **2025 ChilSoft**. All rights reserved.
