// index.js - Bot Discord Usagii (Auto-heal Web Server + Welcome Embed)
const http = require('http');

// 1. Tạo HTTP server siêu nhẹ để lừa Render tưởng đây là Web Service (tránh lỗi treo log)
const PORT = process.env.PORT || 3000;
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bot Usagii is alive and running 24/7!\n');
}).listen(PORT, () => {
    console.log(`[+] HTTP Server giả lập đang lắng nghe trên cổng ${PORT}`);
});

// 2. Khởi động Discord Bot
require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,      // Bắt buộc phải bật cái này ở Discord Developer Portal
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Gắn cứng ID kênh chào mừng của gia đình usagi
const WELCOME_CHANNEL_ID = '1565601086083965019';

client.once('ready', () => {
    console.log(`[+] Fuck yeah! Bot Usagii đã online thành công với tài khoản: ${client.user.tag}`);
});

// Lắng nghe sự kiện thành viên mới gia nhập server
client.on('guildMemberAdd', async (member) => {
    try {
        console.log(`[+] Phát hiện thành viên mới gia nhập: ${member.user.tag}`);
        
        const channel = member.guild.channels.cache.get(WELCOME_CHANNEL_ID);
        if (!channel) {
            console.error(`[!] Mẹ kiếp không tìm thấy kênh chào mừng có ID: ${WELCOME_CHANNEL_ID}`);
            return;
        }

        const customImageUrl = 'https://i.imgur.com/2979FE6.jpg';

        const welcomeEmbed = new EmbedBuilder()
            .setColor('#2f3136')
            .setTitle('✨ CHÀO MỪNG ĐÃ ĐẾN VỚI GIA ĐÌNH USAGI! ✨')
            .setDescription(`Chào mừng ${member} đã chính thức đặt chân vào không gian của gia đình usagi!\n\nKéo ghế ngồi xuống, thả lỏng tinh thần và cùng chill hết nấc với anh em nào bro! 🖤`)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 256 }))
            .setImage(customImageUrl)
            .addFields(
                { name: '📊 Sĩ số hiện tại', value: `\`${member.guild.memberCount}\` thành viên`, inline: true },
                { name: '📌 Nhỏ gọn lưu ý', value: 'Không gian ấm cúng, nhớ tuân thủ luật lệ để chơi lâu dài nha!', inline: true }
            )
            .setTimestamp()
            .setFooter({ text: 'Gia Đình Usagi System', iconURL: member.guild.iconURL() });

        await channel.send({ content: `Này ${member}, điểm danh nhận chỗ ngồi nào!`, embeds: [welcomeEmbed] });
        console.log(`[+] Đã gửi tin nhắn chào mừng thành công cho ${member.user.tag}`);
    } catch (err) {
        console.error('[!] Lỗi cực mạnh khi gửi thông báo chào mừng:', err);
    }
});

// Đăng nhập bot bằng Token bảo mật
client.login(process.env.DISCORD_TOKEN);
