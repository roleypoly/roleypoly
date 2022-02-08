extern crate dotenv;
extern crate tokio;

use dotenv::dotenv;
use std::env;
use serenity::{
    async_trait,
    model::{
        channel::Message,
        gateway::Ready,
        interactions::{
            message_component::ButtonStyle,
        },
    },
    prelude::*,
    client::bridge::gateway::GatewayIntents
};


struct Handler {
    ui_public_uri : String,
    ui_hostname : String,
}


#[async_trait]
impl EventHandler for Handler {
    async fn message(&self, ctx: Context, msg: Message) {
        // No DMs, bots, or self.
        if msg.is_private() || msg.author.bot {
            return;
        }

        // Ignore messages that don't mention the bot
        if !msg.mentions_me(&ctx).await.unwrap_or(false) {
            return;
        }

        msg.channel_id.send_message(&ctx, |m| {
            m.reference_message(&msg).allowed_mentions(|f| {
                f.replied_user(false)
            });
            
            let guild_url = format!("{}/s/{}", self.ui_public_uri, msg.guild_id.unwrap().0);

            m.embed(|e| {
                e.title(":beginner: Howdy, pick your roles here!");
                e.description("Roleypoly will open in your browser.\n\nIf that's not cool with you, try the `/roleypoly` command!");
                e.url(&guild_url);
                e.color(0x453e3d);
                e
            });

            m.components(|c| {
                c.create_action_row(|r| {
                    r.create_button(|b| {
                        b.style(ButtonStyle::Link);
                        b.url(&guild_url);
                        b.label(format!("Pick your roles on {}", self.ui_hostname));
                        b
                    });
                    r
                });
                c
            });
            m
        }).await.unwrap();
    }

    async fn ready(&self, _: Context, ready: Ready) {
        println!("{} is connected! (shard: {:?})", ready.user.name, ready.shard.unwrap_or_default());
    }
}

#[tokio::main]
async fn main() {
    dotenv().ok();
    let token = env::var("BOT_TOKEN").expect("BOT_TOKEN not set");
    let client_id: u64 = env::var("BOT_CLIENT_ID").expect("BOT_CLIENT_ID not set").parse().unwrap();
    let ui_public_uri = env::var("UI_PUBLIC_URI").expect("UI_PUBLIC_URI not set");
    let ui_hostname = url::Url::parse(&ui_public_uri).unwrap().host_str().unwrap().to_string();

    let mut client =
        Client::builder(&token).application_id(client_id)
        .intents(GatewayIntents::GUILD_MESSAGES)
        .event_handler(Handler {
            ui_public_uri,
            ui_hostname,
        }).await.expect("Err creating client");

    if let Err(why) = client.start_autosharded().await {
        println!("Client error: {:?}", why);
    }
}