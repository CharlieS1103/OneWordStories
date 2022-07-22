use serde::{Deserialize, Serialize,ser::Serializer};
use std::env;
use reqwest;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    tauri::Builder::default()
    // This is where you pass in your commands
    .invoke_handler(tauri::generate_handler![push_story, create_story,fetch_stories])
    .run(tauri::generate_context!())
    .expect("failed to run app");
    Ok(())
}

#[tauri::command]
async fn push_story() {
  
  println!("Placeholder for push_story");
}
#[tauri::command]
async fn fetch_stories() -> Result<Vec<Story>, Error> {
    let cards = reqwest::get("http://localhost:2567/cards").await?.json::<Vec<Story>>().await?;
    Ok(cards)
}
#[tauri::command]
async fn create_story(story : Story) -> Result<Story, Error> {
  let client = reqwest::Client::new();
  let resp = client.post("http://localhost:2567/cards")
    .json(&story)
    .send().await?;
  let body = resp.text().await?;
  println!("{}", body);
  Ok(story);
}

#[derive(Debug, thiserror::Error)]
pub enum Error {
  #[error(transparent)]
  Io(#[from] std::io::Error),
  #[error(transparent)]
  Bson(#[from] mongodb::error::Error),
  #[error(transparent)]
  BsonDecode(#[from] mongodb::bson::de::Error),
  #[error(transparent)]
  Reqwest(#[from] reqwest::Error),

}

impl Serialize for Error {
  fn serialize<S>(&self, serializer: S) -> std::result::Result<S::Ok, S::Error>
  where
    S: Serializer,
  {
    serializer.serialize_str(self.to_string().as_ref())
  }
}


#[derive(Deserialize, Serialize)]
struct Story{
    title: String,
    body: Vec<String>,
}