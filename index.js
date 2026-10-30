// index.js - Bot Discord chào mừng gia đình usagi
const http = require('http');
// Mở một HTTP server giả lập để Render nhận diện đây là Web Service và không bị treo log
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bot Usagii is running!\n');
}).listen(process.env.PORT || 3000);

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

// Gắn cứng ID kênh chào mừng vào đây luôn cho lẹ
const WELCOME_CHANNEL_ID = '1565601086083965019';

client.once('ready', () => {
    console.log(`[+] Fuck yeah! Bot Usagi đã online và sẵn sàng canh kênh: ${client.user.tag}`);
});

client.on('guildMemberAdd', async (member) => {
    try {
        const channel = member.guild.channels.cache.get(WELCOME_CHANNEL_ID);
        if (!channel) {
            console.error('[!] Mẹ kiếp không tìm thấy kênh chào mừng, check lại ID xem nào!');
            return;
        }

        const customImageUrl = 'https://i.imgur.com/2979FE6.jpg';

        const welcomeEmbed = new EmbedBuilder()
            .setColor('#2f3136')
            .setTitle('✨ CHÀO MỪNG ĐÃ ĐẾN VỚI GIA ĐÌNH USAGI! ✨')
            .setDescription(`Chào mừng ${member} đã chính thức đặt chân vào không gian của gia đình usagi[cite: 5]!\n\nKéo ghế ngồi xuống, thả lỏng tinh thần và cùng chill hết nấc với anh em nào bro! 🖤`)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 256 }))
            .setImage(customImageUrl)
            .addFields(
                { name: '📊 Sĩ số hiện tại', value: `\`${member.guild.memberCount}\` thành viên`, inline: true },
                { name: '📌 Nhỏ gọn lưu ý', value: 'Không gian ấm cúng, nhớ tuân thủ luật lệ để chơi lâu dài nha!', inline: true }
            )
            .setTimestamp()
            .setFooter({ text: 'Gia Đình Usagi System', iconURL: member.guild.iconURL() });

        await channel.send({ content: `Này ${member}, điểm danh nhận chỗ ngồi nào!`, embeds: [welcomeEmbed] });
    } catch (err) {
        console.error('[!] Mẹ kiếp lỗi lúc gửi thông báo chào mừng rồi:', err);
    }
});

client.login(process.env.DISCORD_TOKEN);
