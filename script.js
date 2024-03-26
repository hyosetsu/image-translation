document
  .getElementById("uploadInput")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const img = new Image();
        img.src = e.target.result;
        img.onload = function () {
          // 画像が読み込まれた後、ここで翻訳の処理を行う
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.width = img.width;
          canvas.height = img.height;
          context.drawImage(img, 0, 0);
          const imageData = context.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
          );
          // ここに画像の文字認識と翻訳の処理を追加する
          // 例えば、Google Cloud Vision APIを使用する場合:
          // https://cloud.google.com/vision/docs/ocr?hl=ja
          // その他の画像認識APIも利用可能
          // 翻訳APIは、Google Cloud Translation APIなどを利用できる
        };
      };
      reader.readAsDataURL(file);
    }
  });
