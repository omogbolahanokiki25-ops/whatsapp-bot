
const { Client, LocalAuth, Buttons } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
    console.log('Scan the QR code above with WhatsApp');
});

client.on('ready', () => {
    console.log('Bot is ready!');
});

client.on('message', async message => {
    const msg = message.body.toLowerCase();

    if (msg === "hi" || msg === "hello" || msg === "menu") {

        const buttons = new Buttons(
            "Welcome 👋 Choose an option below:",
            [
                { body: "💰 Price" },
                { body: "📤 Withdraw" },
                { body: "👥 Referral" },
                { body: "📞 Contact" }
            ],
            "WhatsApp Bot",
            "Tap a button"
        );

        client.sendMessage(message.from, buttons);
    }

    else if (msg.includes("price")) {
        message.reply("💰 Price List:\n₦5,000 - Basic\n₦10,000 - Premium\n₦15,000 - VIP");
    }

    else if (msg.includes("withdraw")) {
        message.reply("📤 Withdrawal takes 24 hours. You need 3 referrals.");
    }

    else if (msg.includes("referral")) {
        message.reply("👥 Invite 3 users to unlock withdrawal.");
    }

    else if (msg.includes("contact")) {
        message.reply("📞 Contact: +234XXXXXXXXXX");
    }

    else {
        message.reply("Type 'menu' to see options.");
    }
});

client.initialize();
