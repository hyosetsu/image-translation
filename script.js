document
  .getElementById("uploadInput")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async function (e) {
        const imgData = e.target.result.split(",")[1];
        const extractedText = await extractText(imgData);
        const correctedText = await correctText(extractedText);
        const translatedText = await translateText(correctedText);
        displayText(extractedText, translatedText);
      };
      reader.readAsDataURL(file);
    }
  });

async function extractText(imgData) {
  // 画像から文字を抽出する処理を記述する（未実装）
  return "これは抽出されたテキストです。";
}

async function correctText(text) {
  // テキストを訂正する処理を記述する（今回は省略）
  return text;
}

async function translateText(text) {
  // DeepL API を使用してテキストを翻訳する処理を記述する
  const response = await fetch("https://api-free.deepl.com/v2/translate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      auth_key: "3d7e3da4-defa-46ed-9592-4a909a08c449:fx",
      text: text,
      source_lang: "JA",
      target_lang: "EN",
    }),
  });
  const data = await response.json();
  return data.translations[0].text;
}

function displayText(extractedText, translatedText) {
  const extractedTextDiv = document.getElementById("extractedText");
  extractedTextDiv.textContent = `抽出されたテキスト: ${extractedText}`;

  const translatedTextDiv = document.getElementById("translatedText");
  translatedTextDiv.textContent = `翻訳されたテキスト: ${translatedText}`;
}
