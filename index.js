// index.js - Bot Discord Usagii (Bản tối ưu: Không ảnh phụ, văn phong cực chill)
const http = require('http');

// Mở HTTP server giả lập để Render không bị treo log
const PORT = process.env.PORT || 3000;
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bot Usagii is alive and running 24/7!\n');
}).listen(PORT, () => {
    console.log(`[+] HTTP Server giả lập đang lắng nghe trên cổng ${PORT}`);
});

require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Gắn cứng ID kênh chào mừng của gia đình usagi
const WELCOME_CHANNEL_ID = '1565601086083965019';

client.once('ready', () => {
    console.log(`[+] Fuck yeah! Bot Usagii đã online thành công với tài khoản: ${client.user.tag}`);
});

client.on('guildMemberAdd', async (member) => {
    try {
        console.log(`[+] Phát hiện thành viên mới gia nhập: ${member.user.tag}`);
        
        const channel = member.guild.channels.cache.get(WELCOME_CHANNEL_ID);
        if (!channel) {
            console.error(`[!] Không tìm thấy kênh chào mừng có ID: ${WELCOME_CHANNEL_ID}`);
            return;
        }

        const welcomeEmbed = new EmbedBuilder()
            .setColor('#2f3136')
            .setAuthor({ name: '✨ Gia Đình Usagi ✨', iconURL: member.guild.iconURL({ dynamic: true }) })
            .setTitle('CHÀO MỪNG THÀNH VIÊN MỚI')
            .setDescription(
                `Chào mừng ${member} đến với ngôi nhà chung của bọn mình 🖤\n\n` +
                `🔊 **Noti** — Cập nhật thông báo quan trọng\n` +
                `📌 **Rule** — Đọc và tuân thủ quy tắc\n` +
                `💬 **Main** — Trò chuyện cùng mọi người\n\n` +
                `▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n` +
                `✨ *Chúc bạn có những trải nghiệm thật vui vẻ và thoải mái khi đồng hành cùng server!*`
            )
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 256 }))
            .addFields(
                { name: '📊 Sĩ số hiện tại', value: `\`${member.guild.memberCount}\` thành viên`, inline: true }
            )
            .setTimestamp()
            .setFooter({ text: 'Usagi System • All Rights Reserved', iconURL: member.guild.iconURL() });

        await channel.send({ content: `Này ${member}, điểm danh nhận chỗ ngồi nào!`, embeds: [welcomeEmbed] });
        console.log(`[+] Đã gửi tin nhắn chào mừng thành công cho ${member.user.tag}`);
    } catch (err) {
        console.error('[!] Lỗi khi gửi thông báo chào mừng:', err);
    }
});

client.login(process.env.DISCORD_TOKEN);
