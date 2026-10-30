// index.js
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

client.once('ready', () => {
    console.log(`[+] Fuck yeah! Bot Usagi style chill đã lên sóng: ${client.user.tag}`);
});

client.on('guildMemberAdd', async (member) => {
    try {
        const welcomeChannelId = process.env.WELCOME_CHANNEL_ID;
        if (!welcomeChannelId) return;

        const channel = member.guild.channels.cache.get(welcomeChannelId);
        if (!channel) return;

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
        console.error('[!] Mẹ kiếp lỗi lúc gửi ảnh chào mừng rồi:', err);
    }
});

client.login(process.env.DISCORD_TOKEN);
