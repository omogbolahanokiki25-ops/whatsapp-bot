const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process'
        ]
    }
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
    console.log("Scan this QR");
});

client.on('ready', () => {
    console.log("Bot is ready!");
});

client.on('message', msg => {
    if (msg.body.toLowerCase() === "hi") {
        msg.reply("Hello 👋 Bot is working!");
    } else if (msg.body.toLowerCase() === "menu") {
        msg.reply("Menu:\n1. Price\n2. Withdraw\n3. Referral");
    }
});

client.initialize();
