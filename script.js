let extractedText = "";

async function uploadImage() {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];
  if (!file) {
    alert("ファイルを選択してください");
    return;
  }

  const uploadedImage = document.getElementById("uploadedImage");
  uploadedImage.src = URL.createObjectURL(file);
  document.getElementById("imageContainer").style.display = "block";

  // Tesseract.jsを初期化し、画像からテキストを抽出する
  const {
    data: { text },
  } = await Tesseract.recognize(file);

  extractedText = text;
  const extractedTextElement = document.getElementById("extractedText");
  extractedTextElement.textContent = extractedText;
  extractedTextElement.focus();
  document.getElementById("textContainer").style.display = "block";
}

async function translateText() {
  const apiKey = "3d7e3da4-defa-46ed-9592-4a909a08c449:fx";
  const response = await fetch(
    `https://api-free.deepl.com/v2/translate?auth_key=${apiKey}&text=${encodeURIComponent(
      extractedText
    )}&target_lang=JA`
  );
  const data = await response.json();
  document.getElementById("translatedText").textContent =
    data.translations[0].text;
  document.getElementById("translation").style.display = "block";
}
